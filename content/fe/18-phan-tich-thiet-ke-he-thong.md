# Phân tích & thiết kế hệ thống

**Định nghĩa.** Biến một bài toán nghiệp vụ ("khách muốn xem và huỷ đơn hàng gần đây") thành: **các thành phần cần có** (màn hình, API, service, dữ liệu) và **quan hệ giữa chúng** (thành phần nào gọi thành phần nào, dữ liệu chảy theo chiều nào) — *trước khi* ai đó viết dòng code đầu tiên. Khác với việc code một chức năng đơn lẻ: ở đây bạn nhìn **toàn bộ bức tranh** trước, để phát hiện chỗ thiếu hoặc mâu thuẫn sớm, lúc sửa còn rẻ.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc một yêu cầu nghiệp vụ rõ ràng và phác thảo được thành phần + quan hệ ở mức cơ bản (component nào gọi API nào, dữ liệu ai kiểm tra) — dưới sự review của người có kinh nghiệm hơn (Senior khác hoặc SA), chưa tự chốt thiết kế.

**Tình huống thực tế — yêu cầu "Cho phép khách xem & huỷ đơn hàng gần đây trong 24h".**

Bạn phác thảo thành phần & luồng gọi trước khi code:
```
[Trang "Đơn của tôi"] ──gọi──> [API GET /orders/recent]
        │
        └──gọi──> [API POST /orders/{id}/cancel]
                        │
                        └──kiểm tra──> [Order.createdAt trong 24h?
                                        (service kiểm tra, KHÔNG phải FE)]
```

Từ sơ đồ này bạn chốt được một điểm dễ bỏ sót: **FE disable nút "Huỷ" nếu quá 24h chỉ là UX** (đỡ người dùng bấm rồi nhận lỗi) — điều kiện *thật* phải nằm ở service, vì FE có thể bị bỏ qua (gọi thẳng API bằng Postman). Nếu không phác thảo trước, dễ chỉ code phần FE và tưởng thế là đủ.

**Vì sao là mức ①:** bạn phác thảo được thành phần & quan hệ cho bài toán rõ ràng, biết phân việc "ai kiểm tra cái gì" — nhưng cần người có kinh nghiệm review lại thiết kế, chưa tự xử lý bài toán mơ hồ hoặc có nhiều service liên quan.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự chốt thiết kế cho bài toán **có nhiều service liên quan**, không cần người khác duyệt lại từng bước — dù bài toán chưa mô tả đầy đủ.

**Tình huống thực tế — yêu cầu mơ hồ "Thêm thông báo khi đơn hàng đổi trạng thái".** Đề bài không nói rõ ai gửi thông báo, gửi qua kênh gì. Bạn tự đặt câu hỏi và tự quyết định thiết kế (không cần chờ SA):
```
order-service (đổi trạng thái) ──phát sự kiện──> [Message queue]
                                                        │
                                          notification-service (lắng nghe, gửi email/push)
```
Bạn tự quyết: **không** để `order-service` gọi thẳng API gửi email (sẽ khoá 2 service vào nhau, và nếu gửi email chậm sẽ làm chậm luôn việc đổi trạng thái đơn) — mà tách qua message queue để hai việc độc lập.

**Vì sao là mức ②:** bạn tự chốt được thiết kế hợp lý cho bài toán có nhiều thành phần, dựa trên nguyên tắc (tách rời, không chặn nhau) chứ không chỉ làm theo mẫu có sẵn.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** viết được **tài liệu thiết kế đầy đủ** (kiến trúc + chi tiết) để nhiều người khác triển khai theo, không chỉ tự mình hiểu thiết kế đó.

**Ví dụ thực tế — mục lục một tài liệu thiết kế cho tính năng "Thông báo đổi trạng thái đơn" giao cho 2 team triển khai.**
```
1. Bối cảnh & mục tiêu — vì sao cần, ai dùng
2. Kiến trúc tổng thể — sơ đồ thành phần (order-service, message queue, notification-service)
3. Chi tiết từng thành phần
   - Hợp đồng sự kiện: OrderStatusChanged { orderId, oldStatus, newStatus, timestamp }
   - notification-service: quy tắc lọc (chỉ gửi khi chuyển sang "đã giao"/"đã huỷ")
4. Ràng buộc phi chức năng — độ trễ tối đa 5 giây, không mất sự kiện nếu service down
5. Rủi ro & phương án dự phòng — nếu message queue quá tải thì sao
```
Tài liệu đủ chi tiết để team A (order-service) và team B (notification-service) triển khai song song mà không cần hỏi lại nhau liên tục — hợp đồng (mục 3) là điểm neo chung.

**Vì sao là mức ③:** bạn viết được thiết kế thành tài liệu người khác dùng được để triển khai độc lập — không chỉ tự chốt thiết kế trong đầu mình.

## ▸ Specialist·V1 — ④ Chuyên sâu
**Khác Senior·V3:** thiết kế ở quy mô **nhiều sản phẩm/nhiều đơn vị dùng chung**, không chỉ một tính năng cho 2 team — trở thành **kiến trúc tham chiếu** (reference architecture) cho cả tổ chức.

**Ví dụ thực tế — thiết kế "khung thông báo" dùng chung cho mọi sản phẩm của công ty, không chỉ một tính năng.** Thay vì mỗi sản phẩm (bán hàng, chăm sóc khách hàng, nội bộ) tự xây lại luồng gửi thông báo riêng, bạn thiết kế một kiến trúc dùng chung:
```
[Bất kỳ sản phẩm nào] ──phát sự kiện chuẩn──> [Notification Platform]
                                                      │
                                          ├─ Email · SMS · Push · In-app
                                          └─ Cấu hình theo sản phẩm (template, tần suất, kênh ưu tiên)
```
Bạn định nghĩa **hợp đồng sự kiện chuẩn** mà mọi sản phẩm phải tuân theo để dùng chung nền tảng này — không phải thiết kế cho một tính năng cụ thể, mà cho **mọi tính năng thông báo trong tương lai** của toàn công ty.

**Vì sao là mức ④:** bạn thiết kế được kiến trúc ở tầm **tổ chức**, được nhiều sản phẩm khác nhau dùng lại — mức cao nhất của kỹ năng này trong toàn thang FE.
