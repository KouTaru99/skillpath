# Database design & query, query tuning

**Định nghĩa.** Khác với [CSDL cơ bản](/fe/ky-nang/12-csdl-co-ban) (hiểu khái niệm đủ để phối hợp với Back-end), đây là **tự tay** thiết kế & tối ưu: **database design** — vẽ bảng, chọn khoá chính/ngoại, chuẩn hoá dữ liệu (tránh trùng lặp gây lệch); **query tuning** — đọc **execution plan** (`EXPLAIN`) để biết một câu SQL đang chạy nhanh hay đang quét cả bảng, rồi sửa (thêm index, viết lại query).

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc và góp ý được một schema đơn giản (khoá chính/ngoại, tránh trùng lặp dữ liệu rõ ràng), dùng `EXPLAIN` để nhận ra một query đang quét toàn bảng — dù chưa tự viết lại tối ưu.

**Ví dụ 1 — góp ý một schema có trùng lặp dễ lệch dữ liệu.**
```sql
-- ❌ tên khách hàng lưu lặp lại ở mỗi đơn hàng — sửa tên khách phải sửa N dòng, dễ lệch
CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_name TEXT, total NUMERIC);

-- ✅ tách bảng, tham chiếu bằng khoá ngoại — sửa tên khách chỉ sửa 1 dòng
CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INT REFERENCES customers(id), total NUMERIC);
```

**Ví dụ 2 — đọc `EXPLAIN` để nhận ra quét toàn bảng.**
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
-- Seq Scan on orders (cost=0.00..1850.00 rows=1 width=64)   ← quét TOÀN BỘ bảng để tìm 1 dòng
--                                                              → dấu hiệu thiếu index
```
Bạn nhận ra `Seq Scan` trên bảng lớn với điều kiện lọc theo 1 cột là dấu hiệu cần index — dù việc tự viết `CREATE INDEX` và đo lại có thể vẫn cần người có kinh nghiệm hơn xác nhận.

**Vì sao là mức ①:** bạn đọc được thiết kế & execution plan ở mức cơ bản, phát hiện được vấn đề rõ ràng — chưa tự thiết kế schema phức tạp hay tối ưu query nặng một mình.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự thiết kế schema cho một module vừa phải, và tự tay thêm index/viết lại query — không chỉ phát hiện vấn đề mà tự sửa.

**Ví dụ thực tế — tự thêm index và kiểm chứng lại bằng số đo.**
```sql
-- Trước: 1850ms, Seq Scan (đã phát hiện ở mốc V1)
CREATE INDEX idx_orders_customer ON orders(customer_id);

EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
-- Index Scan using idx_orders_customer (cost=0.29..8.31 rows=1 width=64)
--   Execution Time: 0.045 ms                         ← từ 1850ms xuống 0.045ms
```
Bạn không chỉ nói "cần index" mà tự thêm, tự đo trước/sau để chứng minh, và cân nhắc đánh đổi (mỗi index thêm làm chậm `INSERT`/`UPDATE` một chút — không thêm index bừa vào mọi cột).

**Vì sao là mức ②:** bạn tự thiết kế & tối ưu được, có số đo chứng minh, không chỉ nêu vấn đề để người khác sửa.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** thiết kế schema cho **cả một module nghiệp vụ** ngay từ đầu (không chỉ sửa schema có sẵn), cân nhắc trước các đánh đổi chuẩn hoá.

**Ví dụ thực tế — thiết kế schema cho module "Đánh giá sản phẩm" từ đầu, cân nhắc chuẩn hoá vs hiệu năng đọc.**
```sql
-- Chuẩn hoá đầy đủ: điểm trung bình tính lại mỗi lần đọc — ĐÚNG nhưng chậm khi nhiều review
CREATE TABLE reviews (id SERIAL PRIMARY KEY, product_id INT, rating INT, comment TEXT);
-- SELECT AVG(rating) FROM reviews WHERE product_id = ?  -- quét hết review mỗi lần trang sản phẩm tải

-- Thêm cột phi chuẩn hoá có chủ đích: lưu sẵn điểm trung bình trên bảng products
ALTER TABLE products ADD COLUMN avg_rating NUMERIC(2,1) DEFAULT 0;
-- cập nhật avg_rating mỗi khi có review mới (trigger hoặc code service) — đọc nhanh, ghi tốn thêm chút
```
Bạn cố ý phá chuẩn hoá 3NF ở đúng một chỗ (lưu `avg_rating` trùng lặp với dữ liệu tính được từ `reviews`) — vì trang sản phẩm được đọc hàng nghìn lần nhưng review chỉ được ghi thỉnh thoảng, đánh đổi này đúng hướng.

**Vì sao là mức ③:** bạn thiết kế schema mới cho cả module, biết khi nào NÊN phá chuẩn hoá có chủ đích vì lý do hiệu năng — không chỉ tuân thủ nguyên tắc chuẩn hoá một cách máy móc.

## ▸ Specialist·V1 — ④ Chuyên sâu
**Khác Senior·V3:** ra quyết định khi một bảng đã **vượt quá khả năng của một CSDL đơn**, không chỉ tối ưu trong phạm vi một máy.

**Ví dụ thực tế — bảng `orders` phình tới hàng trăm triệu dòng, tối ưu index không còn đủ.** Đến một quy mô nhất định, thêm index hay viết lại query không còn giải quyết được — index cũng chậm dần vì bảng quá lớn để giữ gọn trong bộ nhớ. Bạn đánh giá và đề xuất hướng đi tiếp theo:
```
Phương án 1 — Partitioning theo thời gian: chia bảng orders thành orders_2026_01,
  orders_2026_02,... Query thường chỉ lọc theo tháng gần đây → chỉ quét 1 phân vùng nhỏ.

Phương án 2 — Archival: đơn hàng cũ hơn 2 năm chuyển sang bảng/kho lưu trữ riêng
  (đọc chậm hơn nhưng hiếm khi cần), giữ bảng chính gọn cho truy vấn hàng ngày.

Đề xuất: bắt đầu bằng Partitioning (rẻ hơn, không đổi kiến trúc lưu trữ) — CHỈ cân nhắc
sharding sang nhiều CSDL vật lý khi cả một partition cũng đã quá lớn cho một máy.
```
Bạn không nhảy thẳng lên giải pháp phức tạp nhất (sharding nhiều CSDL) khi giải pháp đơn giản hơn (partitioning) đã đủ giải quyết vấn đề hiện tại.

**Vì sao là mức ④:** bạn ra được quyết định kiến trúc dữ liệu ở quy mô vượt ngoài một CSDL đơn, cân nhắc đúng mức độ phức tạp cần thiết — không giải quyết vấn đề nhỏ bằng công cụ quá lớn.
