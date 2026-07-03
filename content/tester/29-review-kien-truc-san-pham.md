# Review kiến trúc sản phẩm, phát hiện rủi ro hệ thống

**Định nghĩa.** Kỹ năng mới ở Specialist, cũng thuộc nhóm **Kiến trúc & thiết kế giải pháp** — Tester chủ động **review kiến trúc sản phẩm** (không cần đợi ai yêu cầu) để chủ động phát hiện điểm yếu/rủi ro trước khi nó gây sự cố thật.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review được 1 phần kiến trúc cụ thể, tìm ra điểm yếu rõ ràng.

**Ví dụ thực tế.** Review thiết kế module "Lưu trữ log dài hạn" của hệ thống giám sát, bạn phát hiện thiết kế không có cơ chế xoay vòng (log rotation) — nếu chạy lâu dài, ổ đĩa sẽ đầy và có thể làm sập cả hệ thống giám sát, đúng lúc cần nó nhất.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** review **toàn bộ kiến trúc** của 1 sản phẩm, không chỉ 1 module, tìm ra các rủi ro liên quan tới nhau.

**Ví dụ thực tế.** Review toàn bộ kiến trúc hệ thống giám sát, bạn phát hiện chuỗi rủi ro liên quan: module thu thập log không có cơ chế retry khi mất kết nối tạm thời → dẫn tới mất dữ liệu log trong lúc mạng chập chờn → dẫn tới cảnh báo có thể bị bỏ sót mà không ai biết vì chính log ghi nhận sự cố cũng bị mất theo.

## ▸ Specialist·V3 — ④ Chuyên gia
**Khác V2:** review kiến trúc ở tầm **nhiều sản phẩm/toàn đơn vị**, chủ động thiết lập quy trình review định kỳ thay vì làm 1 lần.

**Ví dụ thực tế.** Bạn thiết lập quy trình review kiến trúc định kỳ mỗi 6 tháng cho tất cả sản phẩm giám sát an ninh mạng trong đơn vị, không đợi có sự cố mới review — nhờ đó phát hiện sớm 1 rủi ro tương tự (thiếu cơ chế retry) đang lặp lại ở 1 sản phẩm khác trước khi nó gây sự cố thật.

**Vì sao tăng dần ①→④:** từ review 1 điểm yếu cụ thể, tới review toàn kiến trúc 1 sản phẩm, tới thiết lập quy trình review định kỳ cho cả đơn vị.
