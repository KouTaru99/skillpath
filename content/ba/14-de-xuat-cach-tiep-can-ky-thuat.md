# Đề xuất cách tiếp cận & kỹ thuật phân tích phù hợp dự án

**Định nghĩa.** Không phải dự án nào cũng cần cùng 1 kỹ thuật phân tích — Senior BA biết **chọn đúng công cụ cho đúng bài toán** (khi nào dùng BPMN, khi nào chỉ cần use case đơn giản, khi nào cần mô hình dữ liệu chi tiết).

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đề xuất được cách tiếp cận cho 1 dự án cụ thể khi được hỏi.

**Ví dụ thực tế.** Dự án nhỏ chỉ thêm 1 tính năng đơn giản vào hệ thống giám sát — bạn đề xuất chỉ cần viết PTYC ngắn gọn kèm vài use case, không cần vẽ BPMN đầy đủ vì luồng nghiệp vụ không phức tạp, tránh làm tài liệu nặng nề không cần thiết.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự quyết định cách tiếp cận cho dự án phức tạp hơn, có nhiều lựa chọn kỹ thuật khác nhau.

**Ví dụ thực tế.** Dự án xây mới toàn bộ module "Tương quan cảnh báo đa nguồn" (nhiều luồng dữ liệu, nhiều rẽ nhánh xử lý) — bạn tự quyết định kết hợp: BPMN cho luồng xử lý tổng thể, mô hình dữ liệu quan hệ chi tiết cho cách lưu trữ tương quan, và use case riêng cho từng vai trò người dùng khác nhau — chọn đúng tổ hợp kỹ thuật cho bài toán phức tạp.

**Vì sao là mức ②:** tự tin phối hợp nhiều kỹ thuật phân tích cho bài toán phức tạp, không chỉ áp dụng 1 kỹ thuật đơn lẻ theo thói quen.
