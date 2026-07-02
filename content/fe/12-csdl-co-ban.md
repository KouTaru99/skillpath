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

## ▸ Senior·V1 — ③ Thành thạo
**Khác Ex·V3:** không chỉ tối ưu một câu query mà nhận ra khi **ranh giới dữ liệu giữa các service bị phá** — nguyên tắc "database per service" của microservices, và biết đề xuất sửa khi thiết kế đang vi phạm.

**Ví dụ — phát hiện anti-pattern "shared database".**
```
❌ order-service VÀ shipping-service CÙNG đọc thẳng bảng `orders` của nhau
   → đổi schema ở order-service làm sập shipping-service, hai team khoá chặt vào nhau

✅ shipping-service lưu bản sao rút gọn (orderId, address) qua sự kiện
   OrderCreated → shipping-service tự cập nhật bản sao của mình
   → mỗi service tự chủ dữ liệu, đổi schema nội bộ không ảnh hưởng service khác
```
Bạn nêu vấn đề này khi review tài liệu thiết kế, trước khi nó thành nợ kỹ thuật khó gỡ.

**Vì sao là mức ③:** bạn đọc được thiết kế dữ liệu ở tầm **quan hệ giữa các service**, không chỉ tầm một câu query.

## ▸ Senior·V3 — ④ Chuyên sâu
**Khác Senior·V1:** đề xuất được **cách đồng bộ dữ liệu** giữa các service đã tách đúng ranh giới (không chỉ phát hiện ranh giới bị phá).

**Ví dụ thực tế — đồng bộ bản sao dữ liệu qua sự kiện (event-driven), thay vì gọi API chờ nhau.** Từ vấn đề đã nêu ở Senior·V1 (`shipping-service` cần bản sao địa chỉ từ `order-service`), bạn đề xuất cụ thể cách đồng bộ:
```
order-service: khi tạo đơn → phát sự kiện OrderCreated { orderId, address } lên message queue
shipping-service: lắng nghe OrderCreated → tự lưu bản sao (orderId, address) vào CSDL riêng
```
Khác với việc `shipping-service` gọi API sang `order-service` mỗi lần cần địa chỉ (chậm hơn, và nếu `order-service` đang bảo trì thì `shipping-service` cũng bị ảnh hưởng theo) — đồng bộ qua sự kiện giúp `shipping-service` luôn có sẵn dữ liệu cục bộ, đọc nhanh, và **không phụ thuộc runtime** vào service kia còn sống hay không.

**Vì sao là mức ④:** bạn không chỉ chỉ ra vấn đề mà **thiết kế được giải pháp** đồng bộ dữ liệu giữa các service, cân nhắc đúng đánh đổi (độ trễ đồng bộ nhỏ, đổi lấy tính độc lập).
