# SQL & cơ sở dữ liệu sản phẩm

**Định nghĩa.** Tester cần đọc/ghi trực tiếp CSDL để: (1) chuẩn bị dữ liệu test mà không phụ thuộc hoàn toàn vào UI (nhanh hơn nhiều), (2) xác minh dữ liệu thực sự được lưu đúng sau khi thao tác, không chỉ tin vào những gì UI hiển thị. 4 câu lệnh nền tảng: `SELECT` (truy vấn), `INSERT` (thêm), `UPDATE` (sửa), `DELETE` (xoá) — trên các bảng đơn (chưa cần JOIN nhiều bảng).

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết được câu lệnh SQL cơ bản trên 1 bảng đơn để tạo/sửa/xoá/truy vấn dữ liệu test.

**Ví dụ thực tế.** Bảng `login_attempts` (lưu các lần đăng nhập) của hệ thống giám sát an ninh mạng. Để test tính năng khoá tài khoản sau 5 lần sai, thay vì đăng nhập sai bằng tay 5 lần trên UI (chậm), bạn tự chèn thẳng dữ liệu test:
```sql
INSERT INTO login_attempts (username, ip, success, created_at)
VALUES ('admin', '10.0.0.5', false, NOW()), ('admin', '10.0.0.5', false, NOW()), ...;
```
Sau khi hệ thống chạy xử lý, bạn `SELECT` lại bảng `accounts` để xác minh cột `is_locked` đã đổi thành `true` — kiểm chứng bằng dữ liệu thật, không chỉ tin giao diện.

**Vì sao là mức ①:** thao tác đúng trên 1 bảng đơn, chưa cần hiểu quan hệ giữa nhiều bảng (JOIN) hay tối ưu truy vấn.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** có kiến thức **nâng cao hơn về SQL/hệ CSDL** mà sản phẩm dùng — đủ để viết truy vấn kiểm tra dữ liệu liên quan giữa nhiều bảng, không chỉ 1 bảng đơn.

**Ví dụ thực tế.** Để xác minh tính năng "Tự động tương quan cảnh báo thành sự cố" lưu đúng quan hệ, bạn viết truy vấn nối bảng `alerts` (cảnh báo) với bảng `incidents` (sự cố) qua bảng trung gian `incident_alerts`:
```sql
SELECT i.id, i.severity, COUNT(ia.alert_id) AS so_canh_bao
FROM incidents i
JOIN incident_alerts ia ON ia.incident_id = i.id
WHERE i.created_at > NOW() - INTERVAL '1 hour'
GROUP BY i.id, i.severity;
```
Truy vấn này xác minh mỗi sự cố thực sự gộp đúng số cảnh báo liên quan, thứ không thể kiểm tra chỉ bằng cách nhìn UI.

**Vì sao là mức ②:** hiểu và truy vấn được quan hệ giữa nhiều bảng, đúng bản chất CSDL của sản phẩm chứ không chỉ 1 bảng cô lập.
