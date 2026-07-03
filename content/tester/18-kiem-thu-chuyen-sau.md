# Kiểm thử chuyên sâu theo mảng (hiệu năng/bảo mật/thiết bị)

**Định nghĩa.** Ngoài kiểm thử chức năng thông thường, một số mảng đòi hỏi kỹ thuật và công cụ chuyên biệt: **kiểm thử hiệu năng** (performance — hệ thống chịu tải bao nhiêu, phản hồi nhanh chậm thế nào), **kiểm thử bảo mật** (security — tìm lỗ hổng có thể bị khai thác), **kiểm thử thiết bị** (device — với hệ thống có phần cứng/IoT đi kèm).

## ▸ Senior·V1 — ③ Thành thạo
**Ở mức này bạn làm chủ được gì.** Có kiến thức tốt về quy trình/công cụ/phương pháp của các mảng kiểm thử chuyên sâu, đủ để tự thực hiện không cần hướng dẫn.

**Ví dụ thực tế.** Test hiệu năng cho tính năng "Tương quan cảnh báo" của hệ thống giám sát: dùng JMeter mô phỏng 1000 cảnh báo đổ về cùng lúc, đo thời gian xử lý và tương quan có còn đúng trong vòng 5 giây như yêu cầu không, hay bị chậm dần khi tải tăng. Với kiểm thử bảo mật, bạn tự thực hiện kiểm tra cơ bản: thử các payload XSS/SQL injection phổ biến vào các ô input, kiểm tra hệ thống có escape/sanitize đúng không.

**Vì sao là mức ③:** thực hiện độc lập, không cần hướng dẫn từng bước — tới mức Specialist thì đây mới là mảng bạn được xem là **chuyên gia** thật sự (xem ví dụ ở trang Specialist).
