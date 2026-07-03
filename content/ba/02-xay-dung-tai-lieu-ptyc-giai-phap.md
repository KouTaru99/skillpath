# Xây dựng tài liệu phân tích yêu cầu (PTYC) & giải pháp chi tiết

**Định nghĩa.** **PTYC** (Phân tích yêu cầu) là tài liệu mô tả **yêu cầu nghiệp vụ đã được làm rõ** — khác với yêu cầu thô ban đầu của khách hàng, PTYC đã được BA phân tích, hỏi lại chỗ mơ hồ, và diễn đạt lại đủ chi tiết để Dev code đúng. **Tài liệu giải pháp** đi xa hơn: mô tả chi tiết từng trường dữ liệu, ràng buộc, trường hợp ngoại lệ — là "hợp đồng" giữa BA và Dev.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết được PTYC cho 1 chức năng đơn giản, đơn lẻ.

**Ví dụ thực tế.** PTYC cho chức năng "Xem chi tiết cảnh báo": mô tả các trường hiển thị (IP nguồn, thời điểm, mức độ, log liên quan), nguồn dữ liệu lấy từ đâu, ai được xem — đủ để Dev hiểu và code mà không cần hỏi lại nhiều.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** viết tài liệu giải pháp chi tiết hơn, có ràng buộc và trường hợp ngoại lệ — theo yêu cầu của Trưởng sản phẩm hoặc khách hàng.

**Ví dụ thực tế.** Tài liệu giải pháp cho chức năng "Khoá tài khoản sau N lần đăng nhập sai": mô tả chi tiết trường `N` (cấu hình được, mặc định 5, giá trị hợp lệ 3-10), ràng buộc (không cho khoá tài khoản admin gốc), trường hợp ngoại lệ (nếu tài khoản đã bị khoá thủ công trước đó thì không tự động mở khi qua 15 phút). Đây là mức chi tiết Dev cần để không phải đoán khi code.

**Vì sao là mức ②:** đủ chi tiết để làm "hợp đồng" rõ ràng với Dev, bao quát cả ràng buộc/ngoại lệ chứ không chỉ mô tả happy path.
