# Thiết kế luồng dữ liệu hệ thống (DFD)

**Định nghĩa.** **DFD** (Data Flow Diagram) mô tả **dữ liệu di chuyển thế nào** giữa các thành phần hệ thống — khác BPMN (mô tả quy trình nghiệp vụ), DFD tập trung vào luồng dữ liệu: nguồn nào, xử lý ở đâu, lưu ở đâu, đi tới đâu.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Vẽ được DFD đơn giản cho 1 luồng xử lý dữ liệu.

**Ví dụ thực tế.** DFD cho luồng "Phát hiện cảnh báo": dữ liệu log thô → module Phân tích (xử lý, đối chiếu ngưỡng) → nếu vượt ngưỡng thì ghi vào CSDL `alerts` → module Gửi thông báo đọc từ đó → gửi email/Slack. Vẽ rõ dữ liệu đi qua những đâu, giúp Dev hiểu kiến trúc luồng dữ liệu trước khi code.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** vẽ DFD cho hệ thống có **nhiều nguồn dữ liệu và nhiều tầng xử lý** hơn.

**Ví dụ thực tế.** DFD cho toàn bộ hệ thống giám sát: dữ liệu vào từ nhiều nguồn (log server, log firewall, log ứng dụng) → tầng chuẩn hoá dữ liệu → tầng phân tích/tương quan → tầng lưu trữ (phân tách theo mức độ nhạy cảm) → tầng hiển thị/cảnh báo. Thể hiện được bức tranh tổng thể nhiều tầng, giúp cả team hình dung kiến trúc dữ liệu chung.

**Vì sao là mức ②:** thiết kế được DFD ở quy mô hệ thống phức tạp nhiều tầng, không chỉ 1 luồng đơn giản.
