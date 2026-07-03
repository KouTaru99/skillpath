# Đọc hiểu, phân tích & phản biện yêu cầu nghiệp vụ

**Định nghĩa.** Trước khi viết được 1 kịch bản kiểm thử tốt, Tester phải đọc hiểu đúng **tài liệu yêu cầu nghiệp vụ** (specs, user story, tài liệu giải pháp) — biết chức năng này để làm gì, ai dùng, ràng buộc nào áp dụng. Ở mức cao hơn, Tester không chỉ đọc mà còn **phản biện** — chỉ ra chỗ mô tả mơ hồ, thiếu case, hoặc mâu thuẫn logic trước khi bắt tay viết test, tránh việc "test đúng theo tài liệu sai".

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu được tài liệu mô tả 1 chức năng đơn giản, đơn lẻ — biết chức năng làm gì, input/output là gì.

**Ví dụ thực tế.** Tài liệu mô tả chức năng "Xem danh sách cảnh báo" của hệ thống giám sát an ninh mạng: hiển thị danh sách cảnh báo theo thời gian giảm dần, mỗi dòng có mức độ nghiêm trọng (Thấp/Trung bình/Cao), nguồn IP, thời điểm. Bạn đọc và tóm tắt lại đúng ý được, không hiểu sai chỗ nào.

**Vì sao là mức ①:** đọc hiểu đúng, chưa cần phát hiện lỗi logic trong tài liệu.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** có khả năng **phân tích và phản biện** đặc tả — chủ động đặt câu hỏi khi thấy mô tả chưa rõ, hoặc chỉ ra case bị bỏ sót.

**Ví dụ thực tế.** Đọc tài liệu "Gửi cảnh báo đăng nhập bất thường", bạn nhận ra tài liệu không nói rõ: nếu 5 lần đăng nhập sai đến từ **các IP khác nhau** nhưng cùng 1 tài khoản thì có tính là bất thường không, hay chỉ tính khi cùng 1 IP? Bạn phản hồi lại BA/PM để làm rõ trước khi viết kịch bản test, thay vì tự đoán rồi test sai hướng, đến lúc phát hiện lại phải làm lại từ đầu.

**Vì sao là mức ②:** chủ động phát hiện lỗ hổng trong đặc tả trước khi nó biến thành bug thật ở sản phẩm.
