# Kiểm thử API & công cụ tự động hoá

**Định nghĩa.** Thay vì test qua giao diện (chậm, dễ bỏ sót), Tester dùng công cụ gọi thẳng API (như Postman) để kiểm chứng logic backend độc lập với UI, và dùng **công cụ/framework tự động hoá có sẵn** (Selenium/Playwright cho web, Appium cho mobile, JMeter cho hiệu năng) để chạy lại hàng loạt test case mà không cần thao tác tay mỗi lần.

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dùng được công cụ gọi API có sẵn (Postman) để test 1 endpoint, dưới sự hướng dẫn hoặc theo mẫu.

**Ví dụ thực tế.** Test API `POST /api/alerts` (tạo cảnh báo thủ công, dùng cho mục đích diễn tập) bằng Postman: gửi body `{"severity": "high", "source_ip": "192.168.1.1"}`, kiểm tra response trả về 201 (created) kèm đúng `id` mới sinh ra. Thử thêm case thiếu trường bắt buộc `severity`, xác nhận API trả về 400 với message lỗi rõ ràng, không phải 500.

**Vì sao là mức ①:** dùng đúng công cụ có sẵn cho ca đơn giản theo hướng dẫn, chưa cần tự xây bộ test tự động chạy lặp lại.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** biết dùng công cụ/framework hỗ trợ **tự động hoá** — không chỉ test thủ công từng lần mà thiết lập để chạy lại được nhiều lần.

**Ví dụ thực tế.** Bạn gom các API test thủ công ở V2 thành 1 **Postman Collection** kèm assertion tự động (kiểm tra status code + trường dữ liệu bằng script), chạy lại toàn bộ collection này mỗi khi có bản build mới — thay vì test tay lại từng API. Với phần giao diện, bạn viết 1 kịch bản Selenium đơn giản: tự động đăng nhập, vào danh sách cảnh báo, kiểm tra có hiển thị đúng số lượng cảnh báo mới — chạy lại được nhiều lần mà không cần thao tác tay.

**Vì sao là mức ②:** biết dùng công cụ tự động hoá có sẵn để tăng tốc việc kiểm thử lặp lại, dù chưa cần tự thiết kế framework tự động hoá từ đầu (đó là việc của cấp cao hơn).
