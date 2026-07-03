# Các mức độ kiểm thử

**Định nghĩa.** Phân loại theo **phạm vi hệ thống được test**, từ nhỏ tới lớn: **kiểm thử thành phần** (component/unit — test riêng 1 module/hàm, cô lập); **kiểm thử tích hợp** (integration — test khi các thành phần ghép lại, ví dụ module cảnh báo có gọi đúng module gửi email không); **kiểm thử hệ thống** (system — test toàn bộ hệ thống hoàn chỉnh như người dùng thật); **kiểm thử chấp nhận** (acceptance — người dùng cuối/khách hàng xác nhận đáp ứng đúng nhu cầu trước nghiệm thu). Bốn mức là bốn tầng lưới lọc bug khác nhau — bug lọt tầng dưới thì tầng trên bắt, nhưng càng lên cao càng đắt để sửa.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Phân biệt đúng 4 mức, biết mình đang test ở mức nào trong từng giai đoạn, và hiểu mỗi mức bắt được loại bug gì mà mức khác dễ bỏ sót.

**Tình huống thực tế — một tính năng đi qua đủ 4 tầng lưới.** Tính năng "Phát hiện đăng nhập bất thường → gửi cảnh báo" của hệ thống giám sát được test ở cả 4 mức, mỗi mức một loại bug:

```
MỨC              AI LÀM   VÍ DỤ CỤ THỂ + BUG MỨC ĐÓ BẮT ĐƯỢC

Thành phần       Dev      Unit test hàm đếm số lần sai. Bắt bug: đếm
(component)               sai khi mật khẩu có ký tự đặc biệt.
                         → cô lập, chưa cần hệ thống chạy.

Tích hợp         Tester   Giả lập 5 lần sai → module cảnh báo có nhận
(integration)            đúng tín hiệu + GỌI đúng module gửi email?
                         Bắt bug: cảnh báo sinh ra nhưng gọi nhầm
                         hàm gửi (email đi tới địa chỉ rỗng).

Hệ thống         Tester   Đăng nhập sai thật 5 lần từ trình duyệt trên
(system)                 môi trường staging → email cảnh báo có THỰC
                         SỰ tới hộp thư quản trị? Bắt bug: email vào
                         thùng spam vì thiếu cấu hình.

Chấp nhận        Phòng    Đại diện An ninh mạng tự thao tác + ký xác
(acceptance)     An ninh  nhận. Bắt "bug kỳ vọng": chạy đúng spec
                         nhưng nội dung email khó đọc lúc khẩn cấp.
```

Nhìn bảng này thấy rõ: bug "email vào spam" (mức hệ thống) không cách nào lộ ở mức tích hợp — vì tích hợp chỉ kiểm tra *có gọi đúng hàm gửi không*, không kiểm tra *email có tới thật không*.

**Vì sao là mức ①:** nhận diện đúng mức mình đang test và hiểu vai trò từng tầng; chưa cần tự thiết kế chiến lược phối hợp các mức (việc của Senior khi xây kế hoạch kiểm thử tổng thể).
