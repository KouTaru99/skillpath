# SQL & cơ sở dữ liệu sản phẩm

**Định nghĩa.** Tester cần đọc/ghi trực tiếp CSDL để: (1) **chuẩn bị dữ liệu test** không phụ thuộc UI (nhanh hơn nhiều lần), (2) **xác minh dữ liệu lưu đúng** sau thao tác — không chỉ tin những gì UI hiển thị (UI có thể hiện đúng mà DB lưu sai, hoặc ngược lại). 4 câu lệnh nền: `SELECT` (truy vấn), `INSERT` (thêm), `UPDATE` (sửa), `DELETE` (xoá). Nguyên tắc vàng của Tester dùng SQL: **luôn kiểm chứng ở tầng dữ liệu**, vì bug nguy hiểm nhất là loại UI báo "thành công" nhưng DB không lưu.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết câu lệnh SQL cơ bản trên bảng đơn để tạo/sửa/xoá/truy vấn dữ liệu test — và biết dùng nó để kiểm chứng thay vì chỉ tin UI.

**Tình huống thực tế — test khoá tài khoản bằng SQL thay vì bấm tay 5 lần.** Đăng nhập sai 5 lần trên giao diện vừa chậm vừa dễ sai thao tác. Bạn dựng thẳng trạng thái test bằng SQL rồi kiểm chứng kết quả cũng bằng SQL:

```sql
-- 1) DỰNG dữ liệu test: 5 lần đăng nhập sai của cùng 1 IP
INSERT INTO login_attempts (username, ip, success, created_at)
VALUES ('admin', '10.0.0.5', false, NOW()),
       ('admin', '10.0.0.5', false, NOW()),
       ('admin', '10.0.0.5', false, NOW()),
       ('admin', '10.0.0.5', false, NOW()),
       ('admin', '10.0.0.5', false, NOW());

-- 2) KÍCH hệ thống xử lý (hoặc đợi job chạy), rồi KIỂM CHỨNG ở DB:
SELECT username, is_locked, locked_until
FROM accounts
WHERE username = 'admin';
-- Mong đợi: is_locked = true, locked_until = NOW() + 15 phút
```

Điểm ăn tiền của Junior giỏi SQL: khi UI báo "tài khoản đã khoá" mà câu `SELECT` cho thấy `is_locked` vẫn `false`, bạn bắt được một bug mà người chỉ nhìn giao diện sẽ bỏ qua hoàn toàn — UI hiển thị lạc quan còn DB mới là sự thật.

**Vì sao là mức ①:** thao tác đúng trên bảng đơn và biết kiểm chứng bằng dữ liệu; chưa cần truy vấn quan hệ nhiều bảng.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** hiểu **cấu trúc quan hệ nhiều bảng** của sản phẩm, viết được truy vấn nối bảng (JOIN) để kiểm chứng logic mà UI không thể hiện hết.

**Tình huống thực tế — xác minh tính năng "gộp cảnh báo thành sự cố" lưu đúng quan hệ.** UI chỉ hiện "3 cảnh báo → 1 sự cố", nhưng bạn cần chắc quan hệ được lưu đúng ở tầng dữ liệu (nếu sai, báo cáo tuân thủ sau này đếm sai):

```sql
-- Kiểm chứng: mỗi sự cố gộp ĐÚNG số cảnh báo, không sót/không thừa
SELECT i.id            AS su_co,
       i.severity      AS muc_do,
       COUNT(ia.alert_id) AS so_canh_bao_gop
FROM incidents i
JOIN incident_alerts ia ON ia.incident_id = i.id   -- bảng trung gian
WHERE i.created_at > NOW() - INTERVAL '1 hour'
GROUP BY i.id, i.severity
HAVING COUNT(ia.alert_id) <> 3;   -- lọc ra sự cố gộp SAI số lượng
-- Kết quả rỗng = mọi sự cố đều gộp đúng 3 cảnh báo như thiết kế
```

Mệnh đề `HAVING ... <> 3` biến truy vấn thành một "cái bẫy bug": nó chỉ trả về dòng khi có sự cố gộp sai. Đây là tư duy Tester nâng cao — dùng SQL không chỉ để *xem* dữ liệu mà để *lọc thẳng ra chỗ sai*. Một câu SQL kiểm được điều mà 50 lần click UI không chắc bắt nổi.

**Vì sao là mức ②:** truy vấn được quan hệ nhiều bảng đúng bản chất CSDL sản phẩm, và biến SQL thành công cụ săn bug — không chỉ thao tác trên bảng cô lập.
