# Lập trình an toàn (Secure Coding)

**Định nghĩa.** Viết code phòng ngừa lỗ hổng bảo mật ngay từ khâu lập trình. Tham chiếu phổ biến là **OWASP Top 10** (injection, hỏng xác thực/phân quyền, lộ dữ liệu nhạy cảm...). Ở phía Back-end, trọng tâm: chống **SQL injection**, **hash mật khẩu** đúng cách (không lưu plain text), không lộ **secret** (connection string, API key) trong code/log. Với công ty an ninh mạng, đây là kỹ năng bắt buộc xuyên suốt mọi level.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Biết các lỗ hổng phổ biến, không hardcode secret trong code, dùng tham số hoá câu SQL (không nối chuỗi trực tiếp), hash mật khẩu thay vì lưu plain text.

**Ví dụ thực tế — chống SQL injection + hash mật khẩu (Java/Spring).**
```java
// ❌ NGUY HIỂM: nối chuỗi trực tiếp → kẻ xấu truyền username = "' OR '1'='1" là vào được
String sql = "SELECT * FROM users WHERE username = '" + username + "'";

// ✅ AN TOÀN: tham số hoá (JPA/Spring Data tự làm điều này khi dùng đúng cách)
@Query("SELECT u FROM User u WHERE u.username = :username")
User findByUsername(@Param("username") String username);
```
```java
// ❌ NGUY HIỂM: lưu mật khẩu dạng thường
user.setPassword(rawPassword);

// ✅ AN TOÀN: hash bằng BCrypt trước khi lưu — dù lộ DB, mật khẩu vẫn không đọc được
user.setPassword(passwordEncoder.encode(rawPassword));
```

**Vì sao là mức ①:** nhận ra rủi ro và tránh lỗi cơ bản, chưa áp dụng nhất quán toàn luồng.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Áp dụng nhất quán trong mọi API — kiểm quyền ở backend (không tin FE), validate input đầy đủ, không lộ thông tin nhạy cảm qua thông báo lỗi.

**Ví dụ thực tế — kiểm quyền ở backend, không chỉ dựa vào FE ẩn nút.**
```java
@DeleteMapping("/api/orders/{id}")
public void deleteOrder(@PathVariable Long id, Authentication auth) {
  Order order = orderRepository.findById(id).orElseThrow();
  if (!order.getCustomerId().equals(getCurrentUserId(auth))) {
    throw new AccessDeniedException("Không có quyền xoá đơn của người khác");
  }
  orderRepository.delete(order);
}
```
Dù FE có ẩn nút "Xoá" khi không phải chủ đơn, backend vẫn PHẢI tự kiểm — vì ai đó có thể gọi thẳng API bằng Postman, bỏ qua giao diện.

**Vì sao là mức ②:** bảo mật thành thói quen trong từng API, không chỉ tránh lỗi rõ ràng.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V1:** nắm vững lập trình an toàn ở tầm hệ thống — đề xuất và triển khai giải pháp bảo mật, không chỉ tự phòng thủ trong code của mình.

**Ví dụ thực tế — đề xuất rate limiting để chống brute-force đăng nhập.** Bạn nhận thấy API `/api/login` không giới hạn số lần thử — kẻ xấu có thể dò mật khẩu bằng cách gọi liên tục. Bạn đề xuất và triển khai:
```java
@RateLimiter(name = "login", fallbackMethod = "loginFallback")
@PostMapping("/api/login")
public TokenResponse login(@RequestBody LoginRequest req) { ... }

public TokenResponse loginFallback(LoginRequest req, Throwable t) {
  throw new TooManyRequestsException("Thử lại sau ít phút");
}
```
Giới hạn số lần gọi `/api/login` từ cùng một IP trong một khoảng thời gian — chặn kiểu tấn công dò mật khẩu hàng loạt, một lớp phòng thủ mà từng API riêng lẻ không tự có.

**Vì sao là mức ③:** bạn chủ động đề xuất giải pháp bảo mật ở tầm hệ thống — không chỉ viết code an toàn cho phần việc của mình.

## ▸ Senior·V3 — ④ Chuyên sâu
**Khác Ex·V3:** đánh giá rủi ro bảo mật **trước khi code** (threat modeling) ngay từ khâu thiết kế, không chỉ review sau khi đã có code.

**Ví dụ thực tế — threat modeling cho API "chia sẻ đơn hàng qua link công khai".** Trước khi ai viết dòng code nào, bạn đặt câu hỏi phòng thủ: Link có đoán được không (nếu dùng `orderId=123` tuần tự → kẻ xấu dò hết đơn người khác, cần đổi sang token ngẫu nhiên)? Link có hết hạn không? Ai xem link có thấy thông tin nhạy cảm (địa chỉ đầy đủ) không? Ba câu hỏi này được đặt ra khi sửa còn rẻ — phát hiện muộn (sau khi đã có schema, dữ liệu thật) sẽ tốn công hơn nhiều.

**Vì sao là mức ④:** bạn chủ động đánh giá rủi ro bảo mật ở khâu thiết kế — mức phòng thủ sâu nhất, rẻ nhất.
