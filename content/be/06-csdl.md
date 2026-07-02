# Cơ sở dữ liệu (SQL & NoSQL) — thiết kế & tối ưu

**Định nghĩa.** Khác Front-end (chỉ cần hiểu đủ để phối hợp), Back-end **tự tay thiết kế và tối ưu** CSDL. **SQL** (MySQL, PostgreSQL) lưu dữ liệu dạng bảng có quan hệ, đảm bảo tính toàn vẹn (ràng buộc khoá ngoại, transaction). **NoSQL** (MongoDB, Redis) lưu dạng linh hoạt hơn (tài liệu, key-value), đánh đổi lấy tốc độ/khả năng mở rộng khi dữ liệu không cần quan hệ chặt.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu khác biệt SQL vs NoSQL, thiết kế được bảng đơn giản với khoá chính/khoá ngoại, viết được câu SQL CRUD cơ bản.

**Ví dụ thực tế — thiết kế bảng đơn hàng có quan hệ, dùng JPA (Java).**
```java
@Entity
public class Order {
  @Id @GeneratedValue Long id;
  String status;
  @ManyToOne
  @JoinColumn(name = "customer_id")
  Customer customer;          // khoá ngoại → mỗi đơn thuộc về 1 khách hàng
}
```
```sql
-- Tương đương SQL thuần
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20),
  customer_id INT REFERENCES customers(id)
);
```
Bạn hiểu vì sao dùng khoá ngoại (`customer_id REFERENCES customers(id)`) thay vì lưu lặp lại tên khách hàng ở mỗi đơn — tránh trùng lặp, tránh lệch dữ liệu khi khách đổi tên.

**Vì sao là mức ①:** thiết kế và truy vấn được CSDL cho bài toán đơn giản, chưa tối ưu hiệu năng hay xử lý quy mô lớn.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** thiết kế được **index**, hiểu **partition** cơ bản, tối ưu câu lệnh SQL đơn giản.

**Ví dụ thực tế — thêm index để tăng tốc truy vấn tìm đơn theo khách hàng.**
```sql
-- Trước: quét toàn bảng để tìm đơn của 1 khách hàng — chậm khi bảng lớn
SELECT * FROM orders WHERE customer_id = 42;

-- Thêm index cho cột hay lọc:
CREATE INDEX idx_orders_customer ON orders(customer_id);
```
Bạn hiểu index giống mục lục sách — giúp CSDL tìm nhanh mà không phải đọc hết từng trang (dòng), nhưng cũng biết đánh đổi: mỗi index thêm làm `INSERT`/`UPDATE` chậm đi một chút.

**Vì sao là mức ②:** tự thiết kế index và tối ưu câu lệnh SQL cơ bản — chưa xử lý CSDL ở quy mô lớn hay dùng các kỹ thuật nâng cao (view, stored procedure).

## ▸ Ex·V2 — ③ Thành thạo
**Khác V1:** thiết kế được CSDL đã **chuẩn hoá** (normalize) đúng cách, dùng **view/stored procedure/trigger**, phân biệt được **clustered vs non-clustered index**.

**Ví dụ thực tế — trigger tự động cập nhật tồn kho khi có đơn hàng mới.**
```sql
CREATE TRIGGER trg_update_stock
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products SET stock = stock - NEW.quantity WHERE id = NEW.product_id;
END;
```
Trigger tự chạy mỗi khi có dòng `order_items` mới, đảm bảo tồn kho luôn được cập nhật ngay tại tầng CSDL — không phụ thuộc vào việc code Java có nhớ gọi hàm trừ kho hay không.

**Ví dụ 2 — clustered vs non-clustered index.** Clustered index quyết định **thứ tự vật lý** dữ liệu lưu trên đĩa (mỗi bảng chỉ có 1); non-clustered index là một cấu trúc tra cứu riêng, trỏ ngược về dữ liệu gốc (một bảng có thể có nhiều). Bạn chọn cột làm clustered index (thường là khoá chính) dựa trên cột được truy vấn theo khoảng (range) nhiều nhất.

**Vì sao là mức ③:** bạn thiết kế CSDL đúng chuẩn và dùng được công cụ nâng cao (view/trigger/stored procedure) — không chỉ viết câu lệnh SQL cơ bản.

## ▸ Ex·V3 — ④ Chuyên sâu
**Khác V2:** phân tích/tối ưu hiệu năng dựa trên hiểu biết sâu về CSDL — biết cách dữ liệu được lưu trữ bên trong, cách index được lưu, cách CSDL được nhân bản (mirror/replicate), và **2PC** (Two-Phase Commit — giao thức đảm bảo nhiều CSDL cùng commit hoặc cùng rollback một giao dịch).

**Ví dụ thực tế — đọc execution plan để hiểu CSDL thực sự làm gì bên trong.**
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42 AND status = 'PAID';
-- Index Scan using idx_orders_customer (cost=0.29..8.31 rows=1)
--   Filter: status = 'PAID'::text   ← lọc thêm SAU khi đã dùng index tìm customer_id
```
Bạn nhận ra: index chỉ giúp tìm nhanh theo `customer_id`, còn điều kiện `status = 'PAID'` vẫn phải lọc thêm sau đó (không có index riêng cho nó) — nếu truy vấn này chạy thường xuyên, bạn cân nhắc tạo **composite index** trên cả 2 cột `(customer_id, status)` để CSDL tìm đúng ngay từ đầu, không cần lọc thêm bước sau.

**Vì sao là mức ④:** bạn hiểu đủ sâu cơ chế bên trong CSDL để tối ưu hiệu năng và đảm bảo toàn vẹn dữ liệu ở tình huống phức tạp — mức cao nhất trong thang Entry→Experienced.
