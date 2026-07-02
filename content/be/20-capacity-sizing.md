# Định cỡ hiệu năng hệ thống (capacity sizing)

**Định nghĩa.** Ước tính **trước** hệ thống cần bao nhiêu tài nguyên (CPU, RAM, số instance) để đáp ứng tải kỳ vọng — thay vì đoán hoặc chờ sập giờ cao điểm mới biết thiếu. Dữ liệu đầu vào thường từ **load test** (giả lập nhiều người dùng gọi cùng lúc, đo lại thời gian phản hồi/tỷ lệ lỗi).

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu kết quả load test cơ bản, nhận ra ngưỡng hệ thống bắt đầu "đuối".

**Ví dụ thực tế — đọc kết quả load test API tạo đơn hàng.**
```
$ k6 run --vus 200 --duration 30s create-order.js
     http_req_duration: p(95)=280ms   ← ổn
     http_req_failed: 0.3%

$ k6 run --vus 500 --duration 30s create-order.js
     http_req_duration: p(95)=3100ms  ← chậm hẳn
     http_req_failed: 9%              ← vượt ngưỡng
```
Bạn đọc ra: hệ thống chịu tốt 200 người dùng đồng thời, đuối rõ rệt trước 500 — dữ kiện thật để đội quyết định (thêm instance, tối ưu query).

**Vì sao là mức ①:** đọc và diễn giải đúng số liệu tải — chưa tự tính cấu hình tài nguyên cần thêm.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự thiết kế kịch bản load test sát hành vi thật, tự đề xuất con số cấu hình cụ thể.

**Ví dụ thực tế — kịch bản mô phỏng đúng luồng thật (xem danh sách rồi mới xem 1 đơn), không chỉ gọi API bừa.** Từ kết quả đo (200 người dùng ổn, 500 bắt đầu lỗi), bạn đề xuất cụ thể: "tăng từ 2 lên 4 instance API để chịu 500 người dùng đồng thời với p95 dưới 500ms", kèm số liệu chứng minh.

**Vì sao là mức ②:** bạn tự thiết kế được kịch bản đo sát thực tế và tự đề xuất con số cụ thể.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** định cỡ tài nguyên cho **tăng trưởng dài hạn** (6-12 tháng), không chỉ đo tải hiện tại.

**Ví dụ thực tế — kế hoạch định cỡ theo lộ trình tăng trưởng.** Người dùng dự kiến tăng gấp đôi mỗi quý. Bạn lập kế hoạch theo quý: Q1 tăng instance dần theo tải đo được; Q2 cân nhắc thêm cache (Redis) trước khi tăng thêm instance (rẻ hơn, vì phần lớn tải là đọc lặp lại); Q3-Q4 xem xét thêm read replica nếu cache chưa đủ.

**Vì sao là mức ③:** bạn lập kế hoạch tài nguyên trước cho tăng trưởng dự kiến, không chỉ phản ứng khi tải hiện tại có vấn đề.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** định cỡ tài nguyên cho nhiều sản phẩm dùng chung hạ tầng, cân đối ngân sách hạ tầng ở tầm đơn vị.

**Ví dụ thực tế — phân bổ ngân sách khi 3 sản phẩm cùng dùng chung một cụm server.** Thay vì mỗi sản phẩm giữ cố định phần tài nguyên riêng, bạn đề xuất auto-scaling linh hoạt: sản phẩm tải cao vào cuối tháng "mượn" thêm tài nguyên đúng lúc, các ngày còn lại tài nguyên đó phục vụ sản phẩm khác — giảm tổng chi phí đáng kể so với mỗi sản phẩm giữ riêng phần đủ dùng.

**Vì sao là mức ④:** bạn định cỡ và phân bổ tài nguyên ở tầm đơn vị, cân đối cả hiệu năng lẫn chi phí.
