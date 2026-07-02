# Giám sát & chẩn đoán hiệu năng hệ thống (APM)

**Định nghĩa.** Khác [Định cỡ hiệu năng](/be/ky-nang/20-capacity-sizing) (ước tính trước bằng load test) và [Phân tích log/debug](/be/ky-nang/14-phan-tich-log-debug) (điều tra một lỗi cụ thể), đây là dùng công cụ **APM** (Grafana, Datadog, New Relic) để giám sát liên tục hệ thống production, phát hiện vấn đề hiệu năng đang âm thầm diễn ra.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc được dashboard APM cơ bản để nhận biết hệ thống có vấn đề hiệu năng ở đâu.

**Ví dụ thực tế — đọc dashboard phát hiện service chậm dần đúng khung giờ.**
```
Dashboard APM — p95 latency của order-service theo giờ:
08h-11h: ~120ms (bình thường)
11h-13h: ~120ms → 900ms → 2100ms (giờ cao điểm đặt hàng)
```
Bạn đọc ra: vấn đề lặp lại đúng khung giờ trưa — dữ kiện quan trọng để đội điều tra đúng hướng (chưa đủ sức chịu tải giờ cao điểm), không phải bug ngẫu nhiên.

**Vì sao là mức ①:** đọc đúng dashboard để khoanh vùng thời điểm/phạm vi — chưa tự thiết lập hệ thống giám sát hay đào sâu nguyên nhân gốc.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự đào sâu tìm nguyên nhân gốc bằng APM — lần từ triệu chứng tới nguyên nhân kỹ thuật cụ thể.

**Ví dụ thực tế — đào sâu từ "chậm giờ trưa" tới nguyên nhân gốc.** APM cho thấy phần lớn thời gian request nằm ở bước "chờ connection pool" (không phải query chậm) — pool có 20 connection, giờ cao điểm có 60 request cần connection. Nguyên nhân gốc: pool size được cấu hình từ lúc mới ra mắt, chưa từng điều chỉnh khi người dùng tăng.

**Vì sao là mức ②:** bạn tự đào sâu tới nguyên nhân kỹ thuật cụ thể bằng công cụ giám sát.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** thiết lập hệ thống giám sát **chủ động cảnh báo trước khi sự cố xảy ra** cho toàn đơn vị — chuyển từ phản ứng sang phòng ngừa.

**Ví dụ thực tế — cảnh báo dựa trên xu hướng thay đổi, không chỉ ngưỡng cố định.** Thay vì chỉ báo khi latency vượt 2000ms (khi đó người dùng đã bị ảnh hưởng), bạn thiết lập cảnh báo khi connection pool usage tăng liên tục (70%→80%→90%) — đội được cảnh báo và tăng pool size TRƯỚC KHI người dùng bị ảnh hưởng.

**Vì sao là mức ④:** bạn thiết kế được hệ thống giám sát mang tính phòng ngừa cho cả đơn vị.
