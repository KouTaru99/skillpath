# Xây dựng tài liệu kiểm thử

**Định nghĩa.** Tài liệu kiểm thử gồm 2 tầng: **thiết kế kiểm thử** (test design — chiến lược tổng quát: test cái gì, theo kỹ thuật nào, phạm vi tới đâu) và **kịch bản kiểm thử** (test case/test script — chi tiết từng bước thực hiện, dữ liệu, kết quả mong đợi). Tài liệu tốt giúp: (1) người khác chạy lại được đúng như bạn, (2) không bỏ sót case quan trọng, (3) làm bằng chứng khi báo cáo/nghiệm thu.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết được kịch bản kiểm thử cho 1 chức năng đơn giản, đơn lẻ, theo mẫu có sẵn của team.

**Ví dụ thực tế.** Kịch bản kiểm thử chức năng "Xem chi tiết 1 cảnh báo" của hệ thống giám sát:

| Bước | Thao tác | Kết quả mong đợi |
|---|---|---|
| 1 | Vào danh sách cảnh báo, bấm vào 1 dòng | Mở màn hình chi tiết |
| 2 | Kiểm tra thông tin hiển thị | Đủ: IP nguồn, thời điểm, mức độ, log liên quan |
| 3 | Bấm nút "Đánh dấu đã xử lý" | Trạng thái đổi thành "Đã xử lý", có ghi log ai xử lý lúc nào |

**Vì sao là mức ①:** viết đúng theo mẫu cho ca đơn giản, chưa cần tự thiết kế bộ kịch bản cho ca phức tạp nhiều luồng.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** viết tài liệu kiểm thử **độc lập**, áp dụng kỹ thuật thiết kế phù hợp, cho cả các ca phức tạp hơn — không chỉ chép theo mẫu.

**Ví dụ thực tế.** Tính năng mới "Tự động tương quan nhiều cảnh báo thành 1 sự cố" (nếu 3 cảnh báo liên quan xảy ra trong 5 phút thì gộp thành 1 sự cố, tránh spam). Bạn tự thiết kế bộ kịch bản phức tạp hơn nhiều: test đúng ngưỡng 3 cảnh báo trong 5 phút (gộp), test 2 cảnh báo trong 5 phút (không gộp), test 3 cảnh báo nhưng cách nhau 6 phút (không gộp), test 3 cảnh báo không liên quan xảy ra cùng lúc (không được gộp nhầm) — tự nghĩ ra bộ case này mà không có mẫu sẵn để chép theo.

**Vì sao là mức ②:** tự xây dựng tài liệu cho ca mới hoàn toàn, không có sẵn khuôn để dựa vào.
