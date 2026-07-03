# Review tài liệu giải pháp nghiệp vụ

**Định nghĩa.** Senior BA bắt đầu **review tài liệu của BA khác** — đảm bảo chất lượng đồng đều, phát hiện thiếu sót trước khi Dev bắt tay code (sửa ở giai đoạn tài liệu luôn rẻ hơn sửa sau khi đã code).

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review được tài liệu giải pháp của đồng nghiệp, chỉ ra chỗ thiếu case cụ thể.

**Ví dụ thực tế.** Review tài liệu giải pháp "Export báo cáo cảnh báo" của 1 bạn BA khác, bạn phát hiện thiếu mô tả trường hợp: nếu không có cảnh báo nào trong khoảng thời gian chọn thì file export hiển thị gì — góp ý bổ sung trước khi chuyển cho Dev.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** review được cả **tính nhất quán logic nghiệp vụ** giữa nhiều tài liệu liên quan, không chỉ 1 tài liệu riêng lẻ.

**Ví dụ thực tế.** Review đồng thời 2 tài liệu "Phân quyền xem cảnh báo" và "Export báo cáo", bạn phát hiện mâu thuẫn: tài liệu phân quyền quy định user thường không được xem cảnh báo mức Cao, nhưng tài liệu export lại không có logic lọc theo quyền — nghĩa là user có thể export ra và xem được dữ liệu ngoài quyền hạn qua đường vòng. Phát hiện này chỉ có được khi review chéo nhiều tài liệu liên quan tới nhau.

**Vì sao là mức ②:** phát hiện mâu thuẫn logic nghiệp vụ xuyên suốt nhiều tài liệu, không chỉ soát lỗi trong phạm vi 1 tài liệu.
