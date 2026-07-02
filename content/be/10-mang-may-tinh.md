# Mạng máy tính (giao thức, mã hoá, đa kết nối)

**Định nghĩa.** Kiến thức nền về cách máy tính giao tiếp qua mạng: **giao thức** (TCP đảm bảo thứ tự & không mất gói, UDP nhanh hơn nhưng không đảm bảo), **mã hoá/giải mã** (TLS/HTTPS mã hoá dữ liệu trên đường truyền, chống nghe lén), và xử lý **đa kết nối** (server phục vụ nhiều client cùng lúc).

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu HTTP request/response cơ bản, biết HTTPS mã hoá dữ liệu trên đường truyền, phân biệt TCP và UDP.

**Ví dụ thực tế — vì sao API luôn dùng HTTPS chứ không phải HTTP.**
```
HTTP (không mã hoá):  Client --"password=123456"--> Server
                       ↑ ai đó trên cùng mạng WiFi có thể đọc được nguyên văn

HTTPS (có TLS):        Client --[dữ liệu đã mã hoá]--> Server
                       ↑ dù bị chặn giữa đường, dữ liệu đọc ra là vô nghĩa
```
Bạn hiểu vì sao mọi API xử lý đăng nhập/thanh toán bắt buộc phải qua HTTPS — không phải "để trông chuyên nghiệp" mà để dữ liệu nhạy cảm không bị đọc trộm trên đường truyền.

**Vì sao là mức ①:** hiểu khái niệm nền tảng để giao tiếp mạng an toàn — chưa tự cấu hình hay xử lý các vấn đề mạng phức tạp (đa kết nối hiệu năng cao).

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** hiểu cách xử lý **đa kết nối** và **dữ liệu tần suất cao** — server phải phục vụ nhiều client cùng lúc mà không "nghẽn".

**Ví dụ thực tế — vì sao một server xử lý được hàng nghìn kết nối cùng lúc.** Mỗi request HTTP tới server không nhất thiết chiếm một luồng (thread) suốt thời gian xử lý — Spring Boot dùng một **thread pool** (bể luồng) giới hạn số luồng, mỗi luồng phục vụ xong 1 request thì được tái sử dụng cho request tiếp theo:
```yaml
server:
  tomcat:
    threads:
      max: 200   # tối đa 200 luồng xử lý request đồng thời
```
Bạn hiểu vì sao không cấu hình `max` quá lớn tuỳ tiện — mỗi luồng tốn bộ nhớ, và CSDL phía sau cũng có giới hạn kết nối (connection pool) riêng, tăng luồng vô tội vạ không giúp xử lý nhanh hơn nếu CSDL đã là điểm nghẽn.

**Vì sao là mức ②:** hiểu được cơ chế xử lý nhiều kết nối đồng thời ở tầng server — không chỉ hiểu giao thức mạng cơ bản.
