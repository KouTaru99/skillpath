# Design pattern kiến trúc nâng cao (GoF/EIP)

**Định nghĩa.** Khác [OOP/Design Pattern cơ bản](/fe/ky-nang/11-oop-dp-algo-ds) (pattern ở tầm **class/module** — Strategy, Adapter, Factory), đây là pattern ở tầm **kiến trúc toàn hệ thống**: **architectural pattern** (Layered, Client-server, Master-slave, Pipe-filter, Broker, Event-bus, Model-view-controller, Peer-to-peer) và **Enterprise Integration Pattern** (mẫu giao tiếp chuẩn giữa các hệ thống khác nhau — Message Queue, Publish-Subscribe, Request-Reply). Mỗi pattern có đánh đổi rõ theo các khía cạnh: scalability, maintainability, reliability, availability, extensibility, performance, manageability, security.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nhận diện và gọi đúng tên architectural pattern đang dùng trong hệ thống hiện tại, hiểu ưu/nhược điểm cơ bản của nó.

**Ví dụ thực tế — nhận diện 2 pattern đang chạy trong chính hệ thống mình làm.**
```
Bên trong 1 service (order-service): Layered pattern
  Controller → Service → Repository — mỗi tầng chỉ biết tầng ngay dưới nó.
  Ưu: dễ maintain, mỗi tầng test riêng được. Nhược: thêm tầng = thêm độ trễ nhỏ.

Giữa các service: Event-bus pattern (Publish-Subscribe — 1 kiểu Enterprise Integration Pattern)
  order-service phát sự kiện lên message queue, nhiều service khác tự đăng ký lắng nghe.
  Ưu: thêm service lắng nghe mới không cần sửa order-service (loose coupling).
  Nhược: khó theo dõi luồng chạy (không thấy rõ "ai gọi ai" như gọi API trực tiếp).
```
Bạn gọi đúng tên pattern giúp trao đổi với đồng nghiệp/SA chính xác hơn là mô tả dài dòng — "hệ thống dùng Event-bus giữa các service" truyền đạt nhanh hơn nhiều so với vẽ lại cả luồng.

**Vì sao là mức ①:** bạn nhận diện và gọi tên đúng pattern đang tồn tại — chưa tự chọn pattern phù hợp cho một bài toán mới hay đánh giá đánh đổi sâu giữa các lựa chọn.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự **chọn** architectural pattern phù hợp cho một bài toán mới, có so sánh đánh đổi rõ ràng — không chỉ nhận diện pattern đã tồn tại sẵn.

**Ví dụ thực tế — chọn giữa Broker pattern và Peer-to-peer cho bài toán tích hợp 5 hệ thống nội bộ.** Công ty có 5 hệ thống cần trao đổi dữ liệu qua lại. Bạn so sánh 2 hướng:
```
Peer-to-peer (mỗi hệ thống gọi thẳng hệ thống khác):
  Ưu: đơn giản ban đầu, không cần hạ tầng thêm.
  Nhược: 5 hệ thống → tối đa 20 kết nối tay đôi, thêm hệ thống thứ 6 phải nối thêm 5 đường mới.

Broker pattern (mọi hệ thống chỉ nói chuyện qua 1 broker trung tâm):
  Ưu: mỗi hệ thống chỉ cần biết Broker (5 kết nối thay vì 20), thêm hệ thống mới chỉ nối 1 đường.
  Nhược: Broker trở thành điểm chịu tải/rủi ro tập trung (single point of failure) —
  cần đầu tư làm nó đủ tin cậy.

Đề xuất: Broker pattern — vì công ty đã có kế hoạch thêm hệ thống thứ 6, 7 trong năm tới,
chi phí đầu tư Broker đáng giá hơn nối tay đôi ngày càng phức tạp.
```
Bạn chọn pattern dựa trên **xu hướng phát triển tương lai** (sẽ thêm bao nhiêu hệ thống), không chỉ độ đơn giản hiện tại.

**Vì sao là mức ②:** bạn tự chọn được pattern phù hợp cho bài toán cụ thể, có so sánh đánh đổi — không chỉ nhận diện pattern có sẵn.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** đánh giá pattern theo **đầy đủ các khía cạnh chất lượng hệ thống** (scalability, maintainability, reliability, availability, extensibility, performance, manageability, security) — không chỉ 1-2 khía cạnh nổi bật, và đặt thành chuẩn kiến trúc chính thức.

**Ví dụ thực tế — đánh giá đầy đủ khía cạnh trước khi chốt Broker pattern (từ mốc V2) thành chuẩn chính thức.**
```
Broker pattern — đánh giá đủ 8 khía cạnh trước khi chốt làm chuẩn công ty:
+ Scalability: tốt, thêm hệ thống mới chỉ nối 1 đường tới Broker
+ Extensibility: tốt, dễ thêm loại message mới
+ Maintainability: tốt, logic định tuyến tập trung 1 chỗ
- Availability: RỦI RO — Broker chết thì mọi giao tiếp giữa hệ thống ngừng
  → cần thêm: Broker chạy dạng cluster (nhiều bản sao), không phải 1 instance
- Manageability: cần thêm công cụ giám sát riêng cho Broker (không có sẵn)
- Security: cần xác thực giữa mỗi hệ thống và Broker (không phải ai gọi cũng được)
```
Bạn không chốt pattern chỉ vì nó giải quyết đúng vấn đề trước mắt (kết nối 5 hệ thống) — mà đánh giá đủ các khía cạnh còn thiếu (Availability, Security) và yêu cầu bổ sung trước khi cho phép dùng làm chuẩn chính thức của công ty.

**Vì sao là mức ④:** bạn đánh giá pattern một cách toàn diện theo mọi khía cạnh chất lượng hệ thống, không bỏ sót rủi ro — mức cao nhất, đủ tin cậy để đặt thành chuẩn kiến trúc chính thức.
