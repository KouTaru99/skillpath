# Công cụ thiết kế UML / ER Diagram

**Định nghĩa.** **UML** là bộ ký hiệu chuẩn để vẽ thiết kế hệ thống — phổ biến nhất **sequence diagram** (ai gọi ai, theo thứ tự) và **class diagram**. **ER Diagram** mô tả cấu trúc dữ liệu: bảng nào, quan hệ 1-n hay n-n. Giá trị cốt lõi: một bản vẽ chuẩn để nhiều người đọc và hiểu giống nhau.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu sequence/ER diagram có sẵn, tự vẽ được sequence diagram đơn giản cho một luồng cụ thể.

**Ví dụ thực tế — sequence diagram luồng thanh toán trước khi họp với team.**
```
Client        order-service       payment-service      Bank API
  │──POST /orders──>│                    │                  │
  │                 │──gọi thanh toán──>│                  │
  │                 │                    │──charge()──────>│
  │                 │                    │<──approved──────│
  │                 │<──payment OK───────│                  │
  │<──201 Created───│                    │                  │
```
Vẽ trước giúp cả team đọc một lần là hiểu đúng thứ tự bước, thay vì giải thích lại nhiều lần bằng lời.

**Vì sao là mức ①:** đọc và vẽ được sơ đồ cho luồng rõ ràng — chưa mô hình hoá hệ thống phức tạp nhiều nhánh rẽ.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** vẽ được ER diagram cho miền dữ liệu nhiều thực thể/quan hệ phức tạp, dùng làm cơ sở thảo luận thiết kế.

**Ví dụ thực tế — ER diagram miền "Đơn hàng" trước khi bàn với team khác.**
```
[Customer] 1───n [Order] n───n [Product]
                    │
                    1───n [OrderStatusHistory]
```
Từ sơ đồ, bạn đặt đúng câu hỏi: quan hệ `Order`–`Product` là n-n nên cần bảng trung gian `OrderItem` — phát hiện thiếu bảng trung gian trước khi ai viết migration.

**Vì sao là mức ②:** tự mô hình hoá được miền dữ liệu nhiều quan hệ, dùng sơ đồ như công cụ thảo luận thiết kế thật.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** vẽ component diagram cho cả hệ thống (nhiều service), dùng làm tài liệu kiến trúc chính thức.

**Ví dụ thực tế — component diagram hệ "Đặt hàng" cho tài liệu onboarding.**
```
[Web/API] → [order-service] → [payment-service]
                  │
                  ▼
           [Message Queue] → [notification-service]
```
Khác sequence diagram (một luồng cụ thể), sơ đồ này cho thấy toàn bộ hệ thống có gì và kết nối ra sao — dùng khi có người mới gia nhập team hoặc trình bày kiến trúc cho bên ngoài.

**Vì sao là mức ③:** bạn tài liệu hoá được kiến trúc cả hệ thống bằng sơ đồ chuẩn, dùng lâu dài.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** đặt chuẩn tài liệu kiến trúc cho toàn đơn vị — mọi hệ thống vẽ và lưu theo cùng quy ước.

**Ví dụ thực tế — chuẩn hoá cách vẽ/lưu sơ đồ kiến trúc cho tất cả sản phẩm.** Mỗi hệ thống phải có component diagram cập nhật, lưu trong repo; ký hiệu thống nhất (hình chữ nhật = service, mũi tên đứt = bất đồng bộ); review sơ đồ là bắt buộc trước khi triển khai kiến trúc mới.

**Vì sao là mức ④:** bạn đặt chuẩn tài liệu hoá kiến trúc dùng chung cho toàn đơn vị.
