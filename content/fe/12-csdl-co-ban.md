# Cơ sở dữ liệu cơ bản, web server & microservices

**Định nghĩa.** Ba khái niệm phía sau giao diện mà một FE dev cần hiểu đủ để phối hợp:
- **Cơ sở dữ liệu (CSDL)**: nơi lưu dữ liệu lâu dài. **SQL** (MySQL, PostgreSQL) lưu dạng bảng có quan hệ; **NoSQL** (MongoDB) lưu dạng tài liệu linh hoạt.
- **Web server / server ứng dụng**: nhận request HTTP và trả response (ví dụ Spring Boot chạy trên JVM).
- **Microservices**: chia hệ thống thành nhiều dịch vụ nhỏ, mỗi dịch vụ lo một nghiệp vụ.

FE không thiết kế CSDL, nhưng hiểu các thứ này giúp biết dữ liệu từ đâu ra, vì sao API có dạng đó. Ví dụ phía server dùng **Java/Spring**.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu khác biệt SQL vs NoSQL, biết dữ liệu API phản ánh cấu trúc lưu trữ, hình dung request đi từ trình duyệt tới dịch vụ nào.

**Ví dụ thực tế — entity phía server quyết định shape JSON FE nhận.**
```java
@Entity
public class Order {
  @Id @GeneratedValue Long id;
  String status;
  @ManyToOne User customer;         // quan hệ → JSON có object customer lồng
  @OneToMany(mappedBy = "order") List<OrderItem> items;   // → JSON có mảng items
}
```
Bạn đọc entity này là hình dung được API `GET /orders/1` trả `{ id, status, customer:{...}, items:[...] }` — nên FE map thẳng ra UI.

**Vì sao là mức ①:** hiểu khái niệm đủ để làm việc với dữ liệu, chưa đi sâu hiệu năng.

## ▸ Ex·V2 — ① Nhập môn (mở rộng phạm vi)
**Khác V1:** nối được bức tranh **nhiều dịch vụ** — một màn có thể gọi nhiều microservice, và vì sao đôi khi cùng một thứ đến từ hai nguồn.

**Ví dụ thực tế — một trang, nhiều dịch vụ.**
```
GET /order-service/orders/123      → thông tin đơn (chỉ lưu userId, sku)
GET /user-service/users/45         → tên, địa chỉ khách
GET /product-service/products?ids=A1,B3 → tên/ảnh sản phẩm
```
Mỗi service sở hữu dữ liệu riêng (đơn hàng chỉ lưu `userId`, `sku` chứ không lưu sẵn tên) → FE phải gọi thêm để ghép, nên nên gọi song song hoặc nhờ API gateway tổng hợp.

**Vì sao vẫn là ①:** ghép được bức tranh hệ thống ở mức hiểu.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** biết **định cỡ sơ bộ hiệu năng** dựa trên cách dữ liệu được lưu/truy vấn, đối thoại có trọng lượng với Back-end.

**Ví dụ 1 — phát hiện và đề xuất sửa N+1 ở tầng truy vấn.** Trang hiện 50 đơn, backend lặp 50 lần query lấy customer → chậm.
```java
// ❌ N+1: mỗi order lại query customer
// ✅ join sẵn bằng fetch trong JPQL
@Query("SELECT o FROM Order o JOIN FETCH o.customer WHERE o.status = :st")
List<Order> findByStatusWithCustomer(String st);
```
Bạn nêu vấn đề bằng ngôn ngữ backend hiểu (N+1, JOIN FETCH, batch).

**Ví dụ 2 — vì sao thêm index giúp query nhanh.** Màn tìm đơn theo mã KH chậm dần khi dữ liệu lớn. Bạn hiểu: cột lọc thường xuyên nên có **index** (như mục lục sách) để DB không quét cả bảng — và trao đổi với backend để thêm.
```sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
```

**Vì sao là mức ②:** không chỉ tiêu thụ API mà còn góp phần làm nó hiệu quả.
