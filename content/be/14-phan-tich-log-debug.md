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
