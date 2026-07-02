# Định cỡ hiệu năng hệ thống (capacity sizing)

**Định nghĩa.** Ước tính **trước** xem hệ thống cần bao nhiêu tài nguyên (CPU, RAM, số instance) để đáp ứng một mức tải kỳ vọng (số người dùng đồng thời, request/giây) — thay vì đoán, hoặc chờ hệ thống sập trong giờ cao điểm rồi mới biết là thiếu. Dữ liệu đầu vào thường đến từ **load test** (công cụ giả lập nhiều người dùng gọi cùng lúc, đo lại thời gian phản hồi và tỷ lệ lỗi).

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu kết quả một bài load test cơ bản (RPS, latency, tỷ lệ lỗi) và nhận ra ngưỡng hệ thống bắt đầu "đuối" — dưới sự hướng dẫn của người có kinh nghiệm hơn, chưa tự đề xuất cấu hình tài nguyên.

**Ví dụ thực tế — đọc kết quả load test để tìm ngưỡng.**
```
$ k6 run --vus 200 --duration 30s load-test.js

     http_req_duration...: avg=120ms  p(95)=310ms   ← 95% request xong dưới 310ms, còn ổn
     http_req_failed......: 0.5%                     ← tỷ lệ lỗi thấp, chấp nhận được

$ k6 run --vus 500 --duration 30s load-test.js

     http_req_duration...: avg=1850ms p(95)=4200ms  ← chậm hẳn — nghẽn ở đâu đó
     http_req_failed......: 12%                       ← 12% request lỗi — vượt ngưỡng chịu tải
```
Từ hai lần chạy, bạn đọc ra: hệ thống chịu tốt ở 200 người dùng đồng thời, nhưng **đuối rõ rệt trước khi chạm 500** — đây là dữ kiện thật để đội đưa ra quyết định (thêm instance, tối ưu query, hay giới hạn số kết nối), thay vì chỉ "cảm thấy chậm".

**Vì sao là mức ①:** bạn đọc và diễn giải đúng số liệu tải để biết ngưỡng hệ thống đang ở đâu — chưa tự tính toán cấu hình tài nguyên cần thêm hay thiết kế bài load test cho hệ thống phức tạp.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự **thiết kế** kịch bản load test sát với hành vi thật của người dùng, và tự đề xuất con số cấu hình cụ thể từ kết quả đo.

**Ví dụ thực tế — kịch bản load test mô phỏng đúng luồng thật, không chỉ "gọi API".**
```javascript
// load-test.js (k6) — mô phỏng ĐÚNG hành vi: xem danh sách rồi mới xem 1 đơn, không phải gọi bừa
export default function () {
  const list = http.get('/api/orders?page=1');
  sleep(1);                                   // người dùng đọc danh sách vài giây
  const id = JSON.parse(list.body).items[0].id;
  http.get(`/api/orders/${id}`);               // rồi mới bấm vào 1 đơn cụ thể
}
```
Từ kết quả (200 người dùng ổn, 500 bắt đầu lỗi — đo ở mốc trước), bạn đề xuất cụ thể: "cần tăng từ 2 lên 4 instance API để chịu 500 người dùng đồng thời với p95 dưới 500ms", kèm số liệu chứng minh — không chỉ nói "cần tăng thêm server".

**Vì sao là mức ②:** bạn tự thiết kế được kịch bản đo sát thực tế và tự đề xuất con số cụ thể, không chỉ đọc kết quả người khác đưa.
