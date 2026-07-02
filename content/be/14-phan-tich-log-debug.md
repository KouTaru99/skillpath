# Phân tích log & Debug

**Định nghĩa.** **Log** ghi lại những gì hệ thống đang làm — dùng khi không gắn được breakpoint (lỗi chỉ xảy ra trên môi trường thật/production). Khác [IDE & debug code](/be/ky-nang/13-ide-debug) (debug tại máy mình): đây là điều tra qua log khi không có sẵn debugger, hoặc lỗi đã xảy ra rồi.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc log để tìm nguyên nhân lỗi cơ bản, biết log ở mức nào (`INFO`, `WARN`, `ERROR`) và log những gì có ích.

**Ví dụ thực tế — log đủ thông tin để điều tra lỗi mà không cần debug lại.**
```java
@PostMapping("/api/orders")
public Order createOrder(@RequestBody OrderDto dto) {
  log.info("Tạo đơn hàng cho customerId={}", dto.getCustomerId());
  try {
    return orderService.create(dto);
  } catch (Exception e) {
    log.error("Lỗi tạo đơn hàng cho customerId={}: {}", dto.getCustomerId(), e.getMessage(), e);
    throw e;
  }
}
```
Log kèm **ngữ cảnh cụ thể** (`customerId`) giúp bạn tra đúng dòng log khi khách báo lỗi, thay vì log chung chung `"Có lỗi xảy ra"` không biết lỗi ở đơn nào.

**Vì sao là mức ①:** đọc log để tìm lỗi cơ bản — chưa điều tra được lỗi khó (chỉ xảy ra trên một số máy, môi trường thật) hay thiết lập hệ thống log có cấu trúc.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** dùng công cụ phân tích log để tìm nguyên nhân lỗi khó — lỗi chỉ xảy ra trên production, không tái hiện được ở máy dev.

**Ví dụ thực tế — dùng correlation ID để lần lỗi xuyên nhiều lớp code.**
```java
@Component
public class RequestIdFilter implements Filter {
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
    MDC.put("requestId", UUID.randomUUID().toString());   // gắn 1 mã cho mỗi request
    chain.doFilter(req, res);
    MDC.clear();
  }
}
// Mọi dòng log trong cùng request tự động có cùng requestId
```
Khi khách báo lỗi lúc 14h32, bạn tra log theo khung giờ đó, tìm `requestId` của request lỗi, rồi lọc TOÀN BỘ log có cùng `requestId` đó — thấy được đường đi đầy đủ của request qua nhiều lớp code, dù không tái hiện được lỗi trên máy mình.

**Vì sao là mức ②:** bạn điều tra được lỗi khó bằng công cụ phân tích log có cấu trúc — không chỉ đọc log đơn giản trong phạm vi một hàm.

## ▸ Senior·V1 — ③ Thành thạo
**Khác Ex·V3:** dùng công cụ trace/log chuyên biệt cho môi trường **đa luồng** — biết log nào thuộc luồng nào khi nhiều luồng cùng ghi log xen kẽ.

**Ví dụ thực tế — gắn tên luồng vào log để tách đúng luồng khi đọc.**
```java
// Log mặc định không rõ dòng nào thuộc luồng nào khi nhiều luồng chạy song song:
// [INFO] Bắt đầu xử lý đơn 123
// [INFO] Bắt đầu xử lý đơn 456     ← luồng nào đang chạy đơn nào?
// [INFO] Xử lý xong đơn 123

// Cấu hình log kèm tên luồng (%thread trong pattern log):
// [INFO] [pool-1-thread-2] Bắt đầu xử lý đơn 123
// [INFO] [pool-1-thread-5] Bắt đầu xử lý đơn 456
// [INFO] [pool-1-thread-2] Xử lý xong đơn 123
```
Bạn lọc log theo tên luồng để tách đúng trình tự xử lý của TỪNG luồng, thay vì đọc log xen kẽ lẫn lộn giữa nhiều luồng chạy song song.

**Vì sao là mức ③:** bạn điều tra được lỗi trong môi trường đa luồng bằng công cụ log chuyên biệt — không chỉ lần theo 1 request tuần tự.

## ▸ Senior·V2 — ④ Chuyên sâu
**Khác V1:** dùng **correlation ID xuyên nhiều service** để lần lỗi đi qua toàn bộ hành trình phân tán — không chỉ trong một ứng dụng.

**Ví dụ thực tế — một đơn hàng "biến mất" giữa 3 service, lần theo trace id.**
```
FE → order-service   (trace=abc123): tạo đơn OK
order-service → payment-service (trace=abc123): gọi thanh toán — timeout 5s
order-service: coi timeout = thất bại → KHÔNG lưu đơn
payment-service: thực ra đã xử lý thành công, chỉ trả lời chậm
```
Không có `trace=abc123` xuyên suốt (truyền qua header giữa các service), bạn phải đoán mò đơn "biến mất" ở service nào; có nó, bạn lần thẳng ra: bug nằm ở `order-service` xử lý sai khi timeout (không phân biệt "chắc chắn thất bại" với "chưa biết kết quả").

**Vì sao là mức ④:** bạn chẩn đoán được lỗi ở tầm hệ thống phân tán, nơi nguyên nhân và triệu chứng nằm ở hai service khác nhau — mức cao nhất trong thang Senior.
