# Công cụ quản lý lỗi & yêu cầu thay đổi

**Định nghĩa.** Công cụ (Jira, Redmine, Azure DevOps) để **report bug** theo chuẩn (mô tả, bước tái hiện, kết quả mong đợi/thực tế, mức độ, môi trường) và theo dõi **vòng đời xử lý**; đồng thời quản lý **yêu cầu thay đổi** (change request) phát sinh — ai đề xuất, ảnh hưởng gì, đã duyệt chưa. Một bug report tốt là "món quà cho dev": đủ thông tin để họ tái hiện và sửa mà không phải hỏi lại lần nào — bug mô tả kém là lý do phổ biến khiến bug bị trả về "không tái hiện được".

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Report một bug rõ ràng, đủ thông tin để dev tái hiện được ngay — và biết đặt mức độ đúng để việc quan trọng không bị chìm.

**Tình huống thực tế — một bug report chuẩn "dev không phải hỏi lại".** Bạn phát hiện cảnh báo Cao không gửi email dù cấu hình đã bật:

```
[BUG-311] Cảnh báo mức "Cao" không gửi email dù cấu hình đã bật

Mức độ    : HIGH — ảnh hưởng chức năng cốt lõi của sản phẩm an ninh
Môi trường: Staging v2.5.0 · Chrome 128 · tài khoản qa_test01

Điều kiện đầu:
  - Settings → bật "Gửi email cho cảnh báo mức Cao" · email đích: đã cấu hình

Bước tái hiện:
  1. Vào Settings, xác nhận công tắc "Email mức Cao" = BẬT
  2. Tạo cảnh báo Cao (đăng nhập sai 5 lần từ 1 IP)
  3. Kiểm tra hộp thư quản trị viên + kiểm tra bảng email_log (SQL)

Kết quả mong đợi: email tới hộp thư trong ≤5 giây; email_log có 1 dòng "sent"
Kết quả thực tế : sau 5 phút không có email; email_log KHÔNG có dòng nào
                  (→ gợi ý: lỗi ở khâu SINH email, không phải khâu GỬI)

Đính kèm: video 30s · ảnh cấu hình · truy vấn email_log
```

Hai chi tiết nâng chất lượng report: **kiểm chứng thêm ở tầng DB** (email_log rỗng) khoanh vùng nguyên nhân giúp dev — lỗi ở khâu sinh email chứ không phải khâu gửi; và **mức độ có lý do** ("cốt lõi sản phẩm an ninh") để triage không hạ nhầm ưu tiên.

**Vì sao là mức ①:** report đủ để người khác tái hiện và xử lý không cần dò hỏi — kỹ năng nền tảng nhất của nghề, level nào cũng phải làm tốt; đây là chuẩn tối thiểu, không phải đỉnh cao.
