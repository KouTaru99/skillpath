# Phân tích & thiết kế hệ thống

**Định nghĩa.** Biến một bài toán nghiệp vụ thành: **các thành phần cần có** (service, API, bảng dữ liệu) và **quan hệ giữa chúng** (thành phần nào gọi thành phần nào, dữ liệu chảy theo chiều nào) — *trước khi* viết dòng code đầu tiên. Nhìn toàn bộ bức tranh trước giúp phát hiện chỗ thiếu/mâu thuẫn sớm, lúc sửa còn rẻ.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc một yêu cầu nghiệp vụ rõ ràng và phác thảo được thành phần + quan hệ ở mức cơ bản — dưới sự review của người có kinh nghiệm hơn.

**Tình huống thực tế — yêu cầu "Gửi thông báo khi đơn hàng chuyển sang trạng thái đã giao".**
```
[order-service] ──đổi trạng thái──> [phát sự kiện OrderDelivered]
                                            │
                                  [notification-service lắng nghe] ──> gửi email/SMS
```
Bạn phác thảo trước khi code, chốt được điểm quan trọng: `order-service` **không** gọi thẳng API gửi email (khoá 2 service vào nhau, chậm email làm chậm luôn việc đổi trạng thái) — mà tách qua sự kiện.

**Vì sao là mức ①:** phác thảo được thành phần & quan hệ cho bài toán rõ ràng — cần người có kinh nghiệm review lại, chưa tự xử lý bài toán mơ hồ hoặc nhiều service liên quan.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự chốt thiết kế cho bài toán **có nhiều service liên quan**, không cần người khác duyệt lại từng bước.

**Tình huống thực tế — yêu cầu mơ hồ "Cảnh báo khi tồn kho thấp".** Đề bài không nói rõ ai kiểm tra ngưỡng, gửi cảnh báo qua đâu. Bạn tự quyết định thiết kế: `inventory-service` tự kiểm tra ngưỡng mỗi khi tồn kho thay đổi, phát sự kiện `LowStockDetected` — không để `inventory-service` gọi thẳng API gửi email (khoá 2 service, và nếu gửi email chậm sẽ ảnh hưởng luồng cập nhật tồn kho chính).

**Vì sao là mức ②:** bạn tự chốt được thiết kế hợp lý cho bài toán có nhiều thành phần, dựa trên nguyên tắc (tách rời, không chặn nhau).

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** viết được tài liệu thiết kế đầy đủ (kiến trúc + chi tiết) để nhiều người triển khai theo, không chỉ tự mình hiểu.

**Ví dụ thực tế — mục lục tài liệu thiết kế "Cảnh báo tồn kho thấp" giao cho 2 team.**
```
1. Bối cảnh & mục tiêu
2. Kiến trúc tổng thể — sơ đồ inventory-service → queue → notification-service
3. Hợp đồng sự kiện: LowStockDetected { productId, currentStock, threshold }
4. Ràng buộc phi chức năng — độ trễ tối đa 5 giây
5. Rủi ro & phương án dự phòng
```
Tài liệu đủ chi tiết để 2 team triển khai song song mà không cần hỏi lại nhau liên tục.

**Vì sao là mức ③:** bạn viết được thiết kế thành tài liệu người khác dùng được để triển khai độc lập.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác Senior·V3:** thiết kế ở quy mô nhiều sản phẩm/đơn vị dùng chung, trở thành kiến trúc tham chiếu cho cả tổ chức.

**Ví dụ thực tế — thiết kế "nền tảng thông báo" dùng chung cho mọi sản phẩm công ty.** Thay vì mỗi sản phẩm tự xây lại luồng gửi thông báo, bạn thiết kế kiến trúc dùng chung với hợp đồng sự kiện chuẩn mà mọi sản phẩm phải tuân theo — thiết kế cho MỌI tính năng thông báo trong tương lai, không phải một tính năng cụ thể.

**Vì sao là mức ④:** bạn thiết kế được kiến trúc ở tầm tổ chức, được nhiều sản phẩm khác nhau dùng lại — mức cao nhất của kỹ năng này.
