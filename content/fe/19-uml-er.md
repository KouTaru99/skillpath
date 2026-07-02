# Công cụ thiết kế UML / ER Diagram

**Định nghĩa.** **UML** (Unified Modeling Language) là bộ ký hiệu chuẩn để vẽ thiết kế hệ thống — phổ biến nhất là **sequence diagram** (ai gọi ai, theo thứ tự thời gian) và **class diagram** (các lớp và quan hệ). **ER Diagram** (Entity-Relationship) mô tả cấu trúc dữ liệu: bảng nào, quan hệ 1-n hay n-n. Giá trị cốt lõi: một bản vẽ chuẩn để **nhiều người đọc và hiểu giống nhau**, thay vì mỗi người tưởng tượng một kiểu qua lời mô tả bằng chữ.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu một sequence diagram/ER diagram có sẵn để nắm thiết kế, và tự vẽ được một sequence diagram đơn giản cho một luồng nghiệp vụ cụ thể để trình bày ý tưởng của mình.

**Ví dụ thực tế — vẽ sequence diagram cho luồng "quên mật khẩu" trước khi trình bày với team.**
```
Người dùng      FE              API                  Email Service
    │            │                │                        │
    │──nhập email──>│              │                        │
    │            │──POST /forgot-password──>│              │
    │            │                │──sinh token, gửi──────>│
    │            │                │<──────────────────────│
    │            │<──200 OK──────│                        │
    │<──"Kiểm tra email"──│       │                        │
```
Bạn vẽ ra trước khi họp, đội đọc một lần là hiểu đúng thứ tự các bước — thay vì bạn phải giải thích lại nhiều lần bằng lời mà mỗi người hiểu một ý khác nhau.

**Vì sao là mức ①:** bạn đọc và vẽ được sơ đồ cho luồng rõ ràng, đơn giản — chưa tự mô hình hoá hệ thống phức tạp có nhiều nhánh rẽ hay nhiều thực thể dữ liệu liên quan.

## ▸ Senior·V3 — ② Biết làm
**Khác V2:** vẽ được ER diagram cho một miền dữ liệu có **nhiều thực thể và quan hệ phức tạp** (1-n, n-n), dùng làm cơ sở để thảo luận thiết kế CSDL với Back-end.

**Ví dụ thực tế — ER diagram cho miền "Đơn hàng" trước khi bàn với Back-end.**
```
[Customer] 1───n [Order] n───n [Product]
                    │
                    1
                    │
                    n
              [OrderStatusHistory]
```
Từ sơ đồ này, bạn đặt đúng câu hỏi với Back-end: quan hệ `Order`–`Product` là n-n nên cần bảng trung gian (`OrderItem`) lưu cả số lượng — không thể để `Order` trực tiếp tham chiếu `Product`. Vẽ trước giúp phát hiện thiếu bảng trung gian *trước khi* ai đó viết migration.

**Vì sao là mức ②:** bạn tự mô hình hoá được miền dữ liệu có nhiều quan hệ, dùng sơ đồ như công cụ thảo luận thiết kế thật — không chỉ minh hoạ luồng đơn giản.

## ▸ Specialist·V1 — ③ Thành thạo
**Khác Senior·V3:** vẽ được **component diagram** cho cả một hệ thống (nhiều service, nhiều lớp) — dùng làm tài liệu kiến trúc chính thức, không chỉ một luồng hay một miền dữ liệu.

**Ví dụ thực tế — component diagram cho toàn hệ thống "Đặt hàng", dùng làm tài liệu onboarding.**
```
┌─────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Web (FE)   │────>│ order-service│────>│ payment-service   │
└─────────────┘     └──────┬───────┘     └──────────────────┘
                            │
                            ▼
                     ┌──────────────┐     ┌──────────────────┐
                     │ Message Queue│────>│ notification-svc  │
                     └──────────────┘     └──────────────────┘
```
Sơ đồ này khác sequence diagram (một luồng cụ thể theo thời gian) — nó cho thấy **toàn bộ hệ thống có gì và kết nối với nhau ra sao**, dùng làm tài liệu chuẩn khi có người mới gia nhập team hoặc khi cần trình bày kiến trúc cho bên ngoài (SA, đối tác).

**Vì sao là mức ③:** bạn tài liệu hoá được kiến trúc của cả hệ thống bằng sơ đồ chuẩn, dùng lâu dài — không chỉ vẽ một luồng cho một cuộc họp cụ thể.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V1:** đặt ra **chuẩn tài liệu kiến trúc cho toàn đơn vị** — mọi hệ thống đều được vẽ và lưu theo cùng một quy ước, không phải mỗi team một kiểu.

**Ví dụ thực tế — chuẩn hoá cách vẽ và lưu trữ sơ đồ kiến trúc cho tất cả sản phẩm.**
```
Chuẩn tài liệu kiến trúc (áp dụng mọi hệ thống của đơn vị):
1. Mỗi hệ thống PHẢI có 1 component diagram cập nhật, lưu trong repo tại /docs/architecture.md
2. Ký hiệu thống nhất: hình chữ nhật = service, mũi tên liền = gọi đồng bộ,
   mũi tên đứt = message queue/bất đồng bộ (tránh mỗi người ký hiệu khác nhau)
3. Review sơ đồ là một phần bắt buộc của quy trình review kiến trúc trước khi triển khai mới
```
Trước khi có chuẩn này, mỗi team tự vẽ sơ đồ theo ý mình (có team dùng UML chuẩn, có team vẽ tay không quy ước) — người mới đọc sơ đồ team khác phải đoán ý nghĩa từng ký hiệu. Chuẩn hoá giúp bất kỳ ai trong đơn vị đọc sơ đồ của bất kỳ hệ thống nào cũng hiểu ngay.

**Vì sao là mức ④:** bạn đặt ra chuẩn tài liệu hoá kiến trúc dùng chung cho toàn đơn vị — mức cao nhất của kỹ năng này, vượt khỏi phạm vi một hệ thống.
