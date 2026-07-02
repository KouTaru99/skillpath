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
