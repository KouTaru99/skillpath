# Kiến thức chuyên ngành ATTT

**Định nghĩa.** Với Tester làm việc trong mảng An toàn thông tin (ATTT), cần hiểu các khái niệm nền tảng: **web attacks** (SQL injection, XSS, CSRF...), **log collector/processor** (hệ thống thu thập và xử lý log để phát hiện bất thường), **malware/exploit** (mã độc và cách khai thác lỗ hổng), **network protocols** (giao thức mạng dùng trong giám sát: SNMP, Syslog...), và bối cảnh viễn thông (telecommunication) nếu sản phẩm phục vụ hạ tầng viễn thông.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm được kiến thức cơ bản về các khái niệm ATTT liên quan tới mảng sản phẩm mình test, đủ để hiểu **vì sao** 1 tính năng bảo mật tồn tại.

**Ví dụ thực tế.** Test tính năng "Phát hiện SQL Injection" của hệ thống giám sát an ninh mạng — bạn hiểu khái niệm cơ bản: kẻ tấn công chèn câu lệnh SQL độc hại vào input (ví dụ ô tìm kiếm) để lấy trộm dữ liệu ngoài ý muốn của ứng dụng. Nhờ hiểu khái niệm này, bạn biết cách tự tạo dữ liệu test giả lập tấn công đơn giản (ví dụ nhập `' OR '1'='1` vào ô tìm kiếm) để xác nhận hệ thống có phát hiện và cảnh báo đúng không, thay vì chỉ test các input "sạch" thông thường.

**Vì sao là mức ①:** hiểu khái niệm nền tảng đủ để test có ý nghĩa trong bối cảnh ATTT, chưa cần tự phát hiện/phân tích mã độc chuyên sâu (đó là việc của chuyên gia bảo mật).
