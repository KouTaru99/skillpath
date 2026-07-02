# Giám sát & chẩn đoán hiệu năng hệ thống (APM)

**Định nghĩa.** Khác [Capacity sizing](/fe/ky-nang/22-capacity-sizing) (ước tính TRƯỚC bằng load test giả lập) và [Phân tích log/debug](/fe/ky-nang/14-phan-tich-log-debug) (điều tra một lỗi cụ thể đã xảy ra), đây là dùng công cụ **APM** (Application Performance Monitoring — Grafana, Datadog, New Relic...) để **giám sát liên tục** hệ thống đang chạy thật ở production, phát hiện vấn đề hiệu năng đang âm thầm diễn ra trước khi người dùng phàn nàn.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc được dashboard APM cơ bản (latency, throughput, tỷ lệ lỗi theo thời gian thực) để nhận biết hệ thống đang có vấn đề hiệu năng ở đâu.

**Ví dụ thực tế — đọc dashboard phát hiện service chậm dần vào một khung giờ cố định.**
```
Dashboard APM — p95 latency của order-service theo giờ trong ngày:
08h-11h: ~120ms (bình thường)
11h-13h: ~120ms → 900ms → 2100ms (tăng dần rồi tụt lại)
13h-17h: ~130ms (bình thường trở lại)
```
Bạn đọc ra: vấn đề lặp lại đúng khung giờ trưa — khớp với giờ cao điểm đặt hàng (nhiều người đặt đồ ăn giờ nghỉ trưa). Đây là dữ kiện quan trọng để đội xử lý: không phải bug ngẫu nhiên, mà là **hệ thống chưa đủ sức chịu tải ở giờ cao điểm** — hướng điều tra tiếp theo (query chậm? thiếu instance? connection pool cạn?) khác hẳn nếu nghĩ đây là lỗi code ngẫu nhiên.

**Vì sao là mức ①:** bạn đọc đúng dashboard để khoanh vùng thời điểm/phạm vi vấn đề hiệu năng — chưa tự thiết lập được hệ thống giám sát hay đào sâu tìm nguyên nhân gốc.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự **đào sâu tìm nguyên nhân gốc** bằng công cụ APM (không chỉ khoanh vùng thời điểm), lần từ triệu chứng tới nguyên nhân kỹ thuật cụ thể.

**Ví dụ thực tế — đào sâu từ "chậm giờ trưa" (đã khoanh ở mốc V1) tới nguyên nhân gốc.**
```
APM cho thấy chi tiết hơn: trong khung giờ chậm, phần lớn thời gian request nằm ở
bước "chờ lấy connection từ database connection pool" (không phải ở code xử lý
hay query chậm) — connection pool có 20 connection, giờ cao điểm có 60 request
đồng thời cần connection → 40 request phải xếp hàng chờ.

Nguyên nhân gốc: connection pool size (20) được cấu hình từ lúc hệ thống mới ra mắt,
chưa từng điều chỉnh khi lượng người dùng tăng lên.
```
APM không chỉ cho biết "chậm ở đâu" mà còn cho biết **chậm vì lý do gì trong nội bộ** (connection pool, GC pause, I/O chờ...) — bạn dùng thông tin chi tiết này để sửa đúng chỗ (tăng pool size) thay vì đoán mò tối ưu code không liên quan.

**Vì sao là mức ②:** bạn tự đào sâu tới nguyên nhân kỹ thuật cụ thể bằng công cụ giám sát — không chỉ khoanh vùng thời điểm/phạm vi bề mặt.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** thiết lập hệ thống giám sát **chủ động cảnh báo trước khi sự cố xảy ra** cho toàn đơn vị (không chỉ điều tra khi đã có vấn đề) — chuyển từ phản ứng sang phòng ngừa.

**Ví dụ thực tế — thiết lập cảnh báo tự động dựa trên xu hướng, không chỉ ngưỡng cố định.**
```
Cảnh báo cũ (ngưỡng cố định): báo động khi latency > 2000ms
  → Nhược điểm: khi đã báo thì người dùng ĐÃ chịu ảnh hưởng rồi.

Cảnh báo mới (dựa trên xu hướng): báo động khi connection pool usage tăng liên tục
  qua 3 lần đo (70% → 80% → 90%), TRƯỚC KHI chạm ngưỡng nguy hiểm (connection cạn kiệt)
  → Đội được cảnh báo và tăng pool size TRƯỚC KHI người dùng bị ảnh hưởng.
```
Bạn thiết lập chuẩn giám sát cho toàn đơn vị dựa trên **xu hướng thay đổi** (đang tiến gần tới giới hạn) thay vì chỉ báo khi đã vượt ngưỡng — biến APM từ công cụ điều tra sau sự cố thành công cụ phòng ngừa trước sự cố.

**Vì sao là mức ④:** bạn thiết kế được hệ thống giám sát mang tính phòng ngừa cho cả đơn vị — mức cao nhất, chuyển từ "chẩn đoán khi có bệnh" sang "phát hiện sớm trước khi bệnh phát".
