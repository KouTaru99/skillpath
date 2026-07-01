# Cơ sở dữ liệu cơ bản, web server & microservices

**Định nghĩa.** Ba khái niệm phía sau giao diện mà một FE dev cần hiểu đủ để phối hợp:
- **Cơ sở dữ liệu (CSDL)**: nơi lưu dữ liệu lâu dài. **SQL** (MySQL, PostgreSQL) lưu dạng bảng có quan hệ; **NoSQL** (MongoDB) lưu dạng tài liệu linh hoạt.
- **Web server**: chương trình nhận request HTTP và trả response (Nginx, hoặc server ứng dụng Node/Java).
- **Microservices**: kiến trúc chia hệ thống thành nhiều dịch vụ nhỏ độc lập, mỗi dịch vụ lo một nghiệp vụ.

FE không thiết kế CSDL, nhưng hiểu các thứ này giúp biết dữ liệu từ đâu ra, vì sao API có dạng đó, và gọi cho đúng.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu khác biệt SQL vs NoSQL ở mức ý niệm, biết dữ liệu API trả về phản ánh cấu trúc lưu trữ, và hình dung request đi từ trình duyệt qua web server tới dịch vụ nào.

**Ví dụ thực tế — đọc hình dạng dữ liệu để render đúng.** API trả về dữ liệu lồng nhau kiểu document (NoSQL):
```json
{
  "id": "order_1",
  "customer": { "name": "An", "phone": "09xx" },
  "items": [ { "sku": "A1", "qty": 2 }, { "sku": "B3", "qty": 1 } ]
}
```
Bạn hiểu vì sao `items` là mảng lồng (đặc trưng document), và FE chỉ cần map thẳng ra UI, không cần "join" như khi dữ liệu nằm ở nhiều bảng SQL.

**Vì sao là mức ①:** hiểu khái niệm đủ để làm việc với dữ liệu, chưa đi sâu hiệu năng/thiết kế.

## ▸ Ex·V2 — ① Nhập môn (mở rộng phạm vi)
**Khác V1:** vẫn nhập môn nhưng nối được bức tranh **nhiều dịch vụ** — hiểu một màn có thể gọi nhiều microservice khác nhau, và vì sao đôi khi cùng một thứ lại đến từ hai nguồn.

**Ví dụ thực tế — một trang, nhiều dịch vụ.** Trang chi tiết đơn hàng:
```
GET /order-service/orders/123     → thông tin đơn
GET /user-service/users/45        → tên, địa chỉ khách
GET /product-service/products?ids=A1,B3 → tên/ảnh sản phẩm
```
Bạn hiểu mỗi service sở hữu dữ liệu riêng (vì sao đơn hàng chỉ lưu `userId`, `sku` chứ không lưu sẵn tên), nên FE phải gọi thêm để ghép — và đó là lý do nên gọi song song hoặc nhờ một API tổng hợp (gateway).

**Vì sao vẫn là ①:** bạn ghép được bức tranh hệ thống ở mức hiểu, chưa tham gia định hình nó.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** biết **định cỡ sơ bộ hiệu năng** dựa trên cách dữ liệu được lưu/truy vấn, và đối thoại có trọng lượng với Back-end về dạng dữ liệu API.

**Ví dụ thực tế — phát hiện và đề xuất sửa vấn đề N+1 ở tầng API.** Trang hiện 50 đơn, mỗi đơn FE lại gọi một API lấy tên khách → 51 request, chậm và nặng:
```
❌ GET /orders        → 50 đơn
   (lặp 50 lần) GET /users/{id}     → vấn đề N+1

✅ Đề xuất BE: GET /orders?expand=customer  → trả kèm tên khách trong 1 lần
   hoặc GET /users?ids=1,2,3...            → lấy lô một lần
```
Bạn nêu vấn đề bằng ngôn ngữ Back-end hiểu (N+1, batch, expand), và hiểu vì sao thêm index ở cột truy vấn nhiều giúp query nhanh.

**Vì sao là mức ②:** bạn không chỉ tiêu thụ API mà còn góp phần làm nó hiệu quả.
