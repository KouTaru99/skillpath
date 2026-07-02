# Design pattern kiến trúc nâng cao (GoF/EIP)

**Định nghĩa.** Khác [OOP/Design Pattern cơ bản](/be/ky-nang/05-oop-dp-algo-ds) (pattern tầm class/module), đây là pattern tầm **kiến trúc toàn hệ thống**: **architectural pattern** (Layered, Client-server, Broker, Event-bus, Peer-to-peer) và **Enterprise Integration Pattern** (mẫu giao tiếp chuẩn giữa các hệ thống — Message Queue, Publish-Subscribe). Mỗi pattern đánh đổi rõ theo scalability, maintainability, reliability, availability, extensibility, performance, security.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nhận diện và gọi đúng tên architectural pattern đang dùng trong hệ thống hiện tại.

**Ví dụ thực tế — nhận diện 2 pattern trong chính hệ thống mình làm.**
```
Bên trong 1 service: Layered pattern (Controller → Service → Repository)
Giữa các service: Event-bus pattern (order-service phát sự kiện lên queue,
  nhiều service khác tự đăng ký lắng nghe — thêm service mới không cần sửa order-service)
```
Gọi đúng tên pattern giúp trao đổi với đồng nghiệp/SA chính xác hơn mô tả dài dòng.

**Vì sao là mức ①:** nhận diện và gọi tên đúng pattern đang tồn tại — chưa tự chọn pattern cho bài toán mới hay đánh giá đánh đổi sâu.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự chọn architectural pattern phù hợp cho bài toán mới, so sánh đánh đổi rõ ràng.

**Ví dụ thực tế — chọn Broker pattern cho bài toán tích hợp 5 hệ thống nội bộ.** So sánh Peer-to-peer (mỗi hệ thống gọi thẳng nhau — đơn giản ban đầu nhưng 5 hệ thống = 20 kết nối tay đôi) với Broker (mọi hệ thống chỉ nói chuyện qua 1 broker trung tâm — thêm hệ thống mới chỉ nối 1 đường, đổi lại Broker là điểm rủi ro tập trung cần đầu tư độ tin cậy). Đề xuất Broker vì công ty có kế hoạch thêm hệ thống trong năm tới.

**Vì sao là mức ②:** bạn tự chọn được pattern phù hợp cho bài toán cụ thể, có so sánh đánh đổi.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** đánh giá pattern theo đầy đủ khía cạnh chất lượng hệ thống (scalability, availability, security...), đặt thành chuẩn kiến trúc chính thức.

**Ví dụ thực tế — đánh giá đủ khía cạnh trước khi chốt Broker pattern thành chuẩn công ty.** Broker tốt về scalability/extensibility, nhưng RỦI RO về availability (Broker chết thì mọi giao tiếp ngừng) — bạn yêu cầu bổ sung: Broker chạy dạng cluster (nhiều bản sao), có công cụ giám sát riêng, có xác thực giữa mỗi hệ thống và Broker trước khi cho phép dùng làm chuẩn chính thức.

**Vì sao là mức ④:** bạn đánh giá pattern toàn diện theo mọi khía cạnh chất lượng, đủ tin cậy để đặt thành chuẩn kiến trúc chính thức.
