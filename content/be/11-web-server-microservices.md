# Web server / Microservices cơ bản

**Định nghĩa.** **Web server** (Tomcat, Nginx) nhận request HTTP và trả response — Spring Boot có sẵn Tomcat nhúng bên trong nên bạn không cần cài đặt riêng. **Microservices** là kiến trúc chia hệ thống lớn thành nhiều service nhỏ, mỗi service lo một nghiệp vụ, giao tiếp qua API — khác với **monolith** (mọi thứ gộp trong một ứng dụng duy nhất).

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu web server nhận/trả request thế nào, hiểu khái niệm microservices khác monolith ra sao.

**Ví dụ thực tế — một request đi qua web server tới code của bạn.**
```
Client → [Web server: Tomcat nhúng trong Spring Boot] → [Controller của bạn] → Response
```
```java
@RestController
public class OrderController {
  @GetMapping("/api/orders/{id}")     // Tomcat nhận request GET, chuyển tới hàm này
  public Order getOrder(@PathVariable Long id) { ... }
}
```
Bạn hiểu Tomcat (web server) là lớp nhận request đầu tiên, chuyển đúng tới hàm xử lý (`@GetMapping`) dựa trên URL — không cần tự viết code "nghe" cổng mạng.

**Ví dụ 2 — phân biệt monolith vs microservices.**
```
Monolith: 1 ứng dụng Spring Boot xử lý cả đơn hàng, thanh toán, thông báo.
Microservices: order-service, payment-service, notification-service —
               3 ứng dụng độc lập, giao tiếp qua API.
```

**Vì sao là mức ①:** hiểu khái niệm nền tảng — chưa tự thiết kế hay vận hành một hệ microservices thật.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** nắm vững công nghệ/kiến trúc Docker Container, Container Orchestration (điều phối nhiều container), và hiểu các mô hình Cloud (IaaS/PaaS/SaaS, Cloud Native App).

**Ví dụ thực tế — phân biệt IaaS/PaaS khi chọn hạ tầng triển khai.**
```
IaaS (Infrastructure as a Service): thuê máy ảo trần — TỰ cài OS, runtime, mọi thứ.
  Ví dụ: EC2 (AWS). Kiểm soát nhiều, nhưng tự quản lý nhiều việc.

PaaS (Platform as a Service): chỉ cần đẩy code/jar lên, nền tảng tự lo server, scaling.
  Ví dụ: Heroku, Google App Engine. Ít việc quản lý hơn, đổi lại ít tuỳ biến hạ tầng hơn.
```
Bạn hiểu đây là lựa chọn đánh đổi giữa **kiểm soát** và **tiện lợi** — không có cái nào "tốt hơn" tuyệt đối, chọn theo nhu cầu dự án.

**Vì sao là mức ②:** bạn hiểu được các mô hình triển khai và điều phối container ở mức khái niệm vận hành — chưa tự thiết kế một hệ microservices hoàn chỉnh (việc đó ở level Senior).

## ▸ Senior·V1 — ③ Thành thạo
**Khác Ex·V3:** tự thiết kế được **ranh giới service** (service boundary) — mỗi service nên ôm nghiệp vụ gì, và dùng **API Gateway** làm cửa ngõ chung.

**Ví dụ thực tế — vẽ ranh giới service theo nghiệp vụ, không theo tầng kỹ thuật.**
```
❌ Chia theo tầng kỹ thuật: "controller-service", "database-service"
   → mỗi thay đổi nghiệp vụ đều phải sửa cả 2 service, mất ý nghĩa "độc lập".

✅ Chia theo nghiệp vụ: order-service (toàn bộ vòng đời đơn hàng),
   payment-service (toàn bộ vòng đời thanh toán) — mỗi service tự chứa
   đủ logic + dữ liệu cho MỘT nghiệp vụ trọn vẹn.
```
```
Client → [API Gateway] → order-service / payment-service / notification-service
          (1 cửa ngõ duy nhất: xác thực, rate limit, định tuyến — client không
           cần biết có bao nhiêu service phía sau)
```
Bạn hiểu ranh giới đúng (theo nghiệp vụ) giúp mỗi service thay đổi độc lập; API Gateway giúp client không phải gọi trực tiếp từng service riêng lẻ.

**Vì sao là mức ③:** bạn tự thiết kế được ranh giới service hợp lý — không chỉ hiểu khái niệm microservices/container ở mức vận hành.

## ▸ Senior·V2 — ④ Chuyên sâu
**Khác Senior·V1:** xử lý được vấn đề **giao dịch xuyên nhiều service** — khi một nghiệp vụ cần vài service cùng thành công hoặc cùng thất bại, mà không có transaction chung như trong 1 CSDL đơn.

**Ví dụ thực tế — Saga pattern cho nghiệp vụ "đặt hàng" chạm 3 service.**
```
1. order-service: tạo đơn (PENDING)
2. inventory-service: trừ kho — nếu THẤT BẠI → gửi sự kiện huỷ ngược lại bước 1
3. payment-service: trừ tiền — nếu THẤT BẠI → gửi sự kiện hoàn kho (bước 2) + huỷ đơn (bước 1)
```
Không có transaction chung xuyên 3 service (khác với `@Transactional` trong 1 CSDL), bạn thiết kế mỗi bước có **hành động bù trừ** (compensating action) để hoàn tác nếu bước sau thất bại — đây là bản chất Saga pattern, khác hẳn transaction truyền thống.

**Vì sao là mức ④:** bạn xử lý được bài toán toàn vẹn dữ liệu xuyên nhiều service — mức cao nhất của kỹ năng thiết kế microservices trong thang Senior.
