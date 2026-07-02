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

## ▸ Specialist·V1 — ③ Thành thạo
**Khác V2:** định cỡ tài nguyên cho **tăng trưởng dài hạn** (6-12 tháng tới), không chỉ đo tải hiện tại — lập kế hoạch trước khi cần, không phải phản ứng khi đã quá tải.

**Ví dụ thực tế — kế hoạch định cỡ tài nguyên theo lộ trình tăng trưởng người dùng.**
```
Hiện tại: 500 người dùng đồng thời cao điểm, 4 instance API đủ dùng (đo ở mốc trước).
Dự báo kinh doanh: người dùng tăng gấp đôi mỗi quý trong 1 năm tới (chiến dịch marketing lớn).

Kế hoạch định cỡ theo quý (không đợi tới lúc sập mới tăng):
Q1: 500 → 1.000 người dùng — cần 6-8 instance (tăng dần, giám sát p95 để tinh chỉnh)
Q2: 1.000 → 2.000 — bắt đầu cân nhắc thêm cache (Redis) trước khi tăng thêm instance
    (rẻ hơn tăng instance, vì phần lớn tải là đọc lặp lại danh sách sản phẩm phổ biến)
Q3-Q4: 2.000 → 4.000 — nếu cache không đủ, xem xét thêm database read replica
```
Bạn định cỡ THEO XU HƯỚNG kinh doanh, không chỉ theo tải hiện tại — tránh tình trạng đội hạ tầng luôn "chạy theo sau" mỗi khi tải tăng đột ngột.

**Vì sao là mức ③:** bạn lập kế hoạch tài nguyên **trước** cho tăng trưởng dự kiến, không chỉ phản ứng khi tải hiện tại có vấn đề.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V1:** định cỡ tài nguyên cho **nhiều sản phẩm dùng chung hạ tầng** cùng lúc, cân đối ngân sách hạ tầng ở tầm đơn vị — không chỉ một sản phẩm riêng lẻ.

**Ví dụ thực tế — phân bổ ngân sách hạ tầng khi 3 sản phẩm cùng dùng chung một cụm server.**
```
3 sản phẩm chia sẻ chung 1 cụm hạ tầng (để tiết kiệm chi phí vận hành):
- Sản phẩm A: tải ổn định quanh năm, cần 4 instance cố định.
- Sản phẩm B: tải tăng vọt cuối tháng (chốt lương), cần 8 instance trong 3 ngày/tháng.
- Sản phẩm C: tải thấp, dùng chung tài nguyên dư của A/B là đủ.

Đề xuất: cấp phát tài nguyên linh hoạt (auto-scaling) thay vì mỗi sản phẩm giữ cố định
phần riêng — B chỉ "mượn" thêm instance vào đúng 3 ngày cuối tháng, những ngày còn lại
tài nguyên đó phục vụ C. Tổng chi phí giảm ~30% so với mỗi sản phẩm giữ riêng phần đủ dùng.
```
Bạn nhìn bài toán định cỡ ở tầm **chia sẻ tài nguyên giữa nhiều sản phẩm**, tối ưu ngân sách chung thay vì mỗi sản phẩm tối ưu riêng lẻ.

**Vì sao là mức ④:** bạn định cỡ và phân bổ tài nguyên ở tầm đơn vị (nhiều sản phẩm), cân đối cả hiệu năng lẫn chi phí — mức cao nhất của kỹ năng này.
