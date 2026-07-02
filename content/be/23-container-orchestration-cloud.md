# Container Orchestration & Cloud Native

**Định nghĩa.** **Container Orchestration** (Kubernetes) điều phối nhiều container tự động — tự khởi động lại container chết, tự nhân bản khi tải tăng, tự phân phối traffic — khác hẳn tự `docker run` từng container thủ công. **Cloud Native App** là ứng dụng thiết kế để chạy tốt trên cloud: **stateless** (không giữ trạng thái riêng trong tiến trình, dễ nhân bản), dễ scale ngang. **IaaS/PaaS/SaaS** là các mức độ "thuê sẵn" hạ tầng cloud (từ thuê máy trần đến dùng phần mềm sẵn có).

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu vì sao cần orchestration thay vì chạy container thủ công, hiểu khái niệm stateless.

**Ví dụ thực tế — vì sao service phải "stateless" để orchestration hoạt động tốt.**
```java
// ❌ Giữ trạng thái trong bộ nhớ của chính tiến trình — nếu Kubernetes khởi động
// lại container này (hoặc chuyển sang container khác), dữ liệu mất, request
// tiếp theo (có thể vào container khác) không thấy giỏ hàng cũ.
Map<String, Cart> cartInMemory = new HashMap<>();

// ✅ Lưu trạng thái ở nơi NGOÀI tiến trình (Redis, CSDL) — container nào xử lý
// request cũng đọc được cùng dữ liệu, chết container này không mất gì.
cartRepository.save(cart);  // lưu vào Redis/CSDL, không giữ trong RAM của service
```
Bạn hiểu: Kubernetes có thể tự khởi động lại container bất cứ lúc nào (để cân bằng tải hoặc khi container lỗi) — nếu service giữ trạng thái trong bộ nhớ riêng, dữ liệu đó biến mất mà không ai biết.

**Vì sao là mức ①:** hiểu khái niệm nền tảng để thiết kế service chạy tốt trong môi trường orchestration — chưa tự cấu hình hay vận hành cụm Kubernetes thật.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự cấu hình được **health check** để orchestration biết container còn sống hay đã "treo".

**Ví dụ thực tế — endpoint health check để Kubernetes tự khởi động lại container hỏng.**
```java
@GetMapping("/actuator/health")
public ResponseEntity<String> health() {
  return dbIsReachable() ? ResponseEntity.ok("UP") : ResponseEntity.status(503).build();
}
```
```yaml
livenessProbe:
  httpGet: { path: /actuator/health, port: 8080 }
  periodSeconds: 10   # Kubernetes gọi endpoint này mỗi 10s, tự restart nếu liên tục lỗi
```
Không có health check, orchestration không biết container đã "treo" (còn tiến trình, không còn xử lý được gì) — vẫn coi là khoẻ mạnh và tiếp tục gửi traffic vào.

**Vì sao là mức ②:** bạn tự cấu hình được cơ chế orchestration tự phát hiện container hỏng — không chỉ hiểu khái niệm stateless.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** phân biệt và chọn đúng mô hình Cloud (IaaS/PaaS/SaaS) cho từng nhu cầu triển khai, hiểu Cloud Native App.

**Ví dụ thực tế — chọn IaaS vs PaaS khi triển khai.**
```
IaaS (thuê máy ảo trần — vd EC2): tự cài OS/runtime, kiểm soát nhiều, tự quản lý nhiều.
PaaS (chỉ đẩy jar lên — vd Google App Engine): ít việc quản lý, đổi lại ít tuỳ biến hạ tầng.
```
Đây là đánh đổi giữa kiểm soát và tiện lợi — không cái nào "tốt hơn" tuyệt đối, chọn theo năng lực đội vận hành và yêu cầu tuỳ biến của dự án.

**Vì sao là mức ③:** bạn chọn đúng mô hình triển khai cloud theo bối cảnh dự án, không chỉ vận hành container đơn lẻ.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** chịu trách nhiệm chiến lược container/cloud cho toàn đơn vị — chuẩn hoá base image, chính sách scaling chung.

**Ví dụ thực tế — golden base image dùng chung cho mọi service Java.** Thay vì mỗi service tự chọn base image riêng, bạn đặt chuẩn `company-jre-base` (đã cấu hình security, healthcheck, user non-root) — mọi service kế thừa từ đó, tự động nhận bản vá bảo mật khi image gốc cập nhật.

**Vì sao là mức ④:** bạn đặt chuẩn container/cloud cho toàn đơn vị, không chỉ chọn đúng mô hình cho một dự án.
