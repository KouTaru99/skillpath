# Kiến thức chuyên ngành ATTT

**Định nghĩa.** Với Tester làm mảng **An toàn thông tin (ATTT)**, cần hiểu các khái niệm nền: **web attacks** (SQL injection — chèn lệnh SQL độc; XSS — chèn script chạy trên trình duyệt nạn nhân; CSRF — giả mạo yêu cầu), **log collector/processor** (hệ thu thập & xử lý log để phát hiện bất thường), **malware/exploit** (mã độc & cách khai thác lỗ hổng), **network protocols** dùng trong giám sát (Syslog, SNMP...). Hiểu ATTT giúp Tester test đúng *ý nghĩa* của tính năng bảo mật, không chỉ test bề mặt.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm khái niệm ATTT nền tảng liên quan mảng sản phẩm, đủ để hiểu **vì sao** một tính năng bảo mật tồn tại và tự tạo được ca test tấn công đơn giản.

**Tình huống thực tế — test tính năng "Phát hiện SQL Injection" bằng cách tự đóng vai kẻ tấn công.** Bạn hiểu bản chất SQL injection (chèn lệnh SQL vào ô nhập để lừa hệ thống trả dữ liệu ngoài ý muốn), nên test được cả hai mặt: hệ thống có *phát hiện* tấn công không, và bản thân hệ thống có *bị dính* không:

```
TEST 1 — Hệ thống giám sát có PHÁT HIỆN & cảnh báo tấn công?
  Giả lập truy vấn tấn công vào 1 dịch vụ được giám sát:
    ô tìm kiếm nhận:  ' OR '1'='1
    hoặc:             '; DROP TABLE users; --
  → Mong đợi: hệ thống SINH cảnh báo "nghi ngờ SQL injection"
    với IP nguồn + payload. Nếu im lặng → BUG: bỏ sót tấn công.

TEST 2 — Bản thân hệ thống giám sát có BỊ DÍNH không? (đừng quên!)
  Nhập cùng payload vào chính ô tìm kiếm cảnh báo của sản phẩm:
  → Mong đợi: kết quả rỗng/an toàn (input được tham số hoá/escape),
    KHÔNG trả về toàn bộ bảng hay báo lỗi SQL lộ cấu trúc DB.
  → Sản phẩm an ninh mà tự dính SQL injection là lỗi nhục nhất.
```

Điểm Senior: hiểu ATTT đủ để test **cả hai vai** — sản phẩm phát hiện tấn công tốt, nhưng bản thân nó cũng phải kháng được chính loại tấn công đó. Junior thường chỉ test vế 1.

**Vì sao là mức ①:** hiểu khái niệm nền đủ để test có ý nghĩa trong bối cảnh ATTT và tự dựng ca tấn công cơ bản; chưa cần phân tích mã độc/khai thác lỗ hổng chuyên sâu (việc của chuyên gia bảo mật — kỹ năng "Kiểm thử chuyên sâu" riêng).
