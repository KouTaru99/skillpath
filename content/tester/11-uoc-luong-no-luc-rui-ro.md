# Ước lượng nỗ lực & rủi ro kiểm thử

**Định nghĩa.** Trước khi bắt tay test, Tester cần trả lời được: "việc này mất bao lâu?" (ước lượng nỗ lực) và "cái gì có thể khiến việc test không kịp/không đủ?" (xác định rủi ro) — để báo sớm thay vì im lặng tới hạn mới biết không kịp.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Ước lượng được nỗ lực và nhận diện rủi ro cho **task được giao** (phạm vi cá nhân, 1 chức năng cụ thể).

**Ví dụ thực tế.** Được giao test tính năng "Export báo cáo cảnh báo ra PDF" của hệ thống giám sát, bạn ước lượng cần 1.5 ngày (viết kịch bản 0.5 ngày, test các trường hợp dữ liệu ít/nhiều/rỗng 0.5 ngày, test định dạng PDF trên nhiều trình duyệt 0.5 ngày). Bạn nhận ra rủi ro: chưa có dữ liệu mẫu đủ lớn (hàng nghìn cảnh báo) để test hiệu năng export — báo với team để chuẩn bị dữ liệu trước, tránh tới lúc test mới phát hiện thiếu.

**Vì sao là mức ①:** ước lượng và nhận diện rủi ro đúng cho phạm vi công việc của chính mình.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** ước lượng và xây kế hoạch cho **phạm vi rộng hơn** — cả 1 tính năng lớn hoặc 1 phần dự án, không chỉ 1 task cá nhân.

**Ví dụ thực tế.** Cả sprint có 4 tính năng liên quan tới module "Cảnh báo tự động", bạn được giao lập kế hoạch kiểm thử cho toàn bộ module đó: ước lượng tổng 6 ngày test cho cả team 2 Tester, xác định rủi ro lớn nhất là 2 tính năng phụ thuộc lẫn nhau (tương quan cảnh báo phải xong trước thì mới test được dashboard tổng hợp) — đề xuất thứ tự ưu tiên test để không bị tắc nghẽn giữa chừng.

**Vì sao là mức ②:** ước lượng và quản lý rủi ro ở phạm vi nhiều task/nhiều người, không chỉ việc của riêng mình.
