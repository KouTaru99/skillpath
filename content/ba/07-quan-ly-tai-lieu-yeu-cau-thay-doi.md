# Cập nhật, quản lý & lưu trữ tài liệu/yêu cầu thay đổi theo quy trình

**Định nghĩa.** Yêu cầu luôn thay đổi giữa dự án — BA phải có kỷ luật **cập nhật tài liệu ngay khi có thay đổi** và **quản lý lịch sử thay đổi** (ai đề xuất, khi nào, ảnh hưởng gì), tránh tình trạng tài liệu cũ và thực tế code lệch nhau mà không ai biết.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Cập nhật tài liệu đúng, kịp thời khi có thay đổi nhỏ.

**Ví dụ thực tế.** Khách hàng đổi ngưỡng "5 lần đăng nhập sai" thành "3 lần" — bạn cập nhật ngay vào PTYC, ghi rõ ngày đổi và người yêu cầu, thông báo cho Dev/Tester biết để không dùng nhầm số cũ.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** quản lý được **yêu cầu thay đổi phức tạp hơn** — đánh giá ảnh hưởng của thay đổi trước khi áp dụng, không chỉ ghi lại đơn thuần.

**Ví dụ thực tế.** Khách hàng đề xuất thay đổi lớn: gộp 2 màn hình "Danh sách cảnh báo" và "Danh sách sự cố" thành 1 màn duy nhất, giữa lúc Dev đã code xong 80% cả 2 màn theo thiết kế cũ. Bạn không chỉ ghi nhận yêu cầu mà phân tích ảnh hưởng: cần sửa lại bao nhiêu, rủi ro trễ tiến độ ra sao, và đề xuất phương án — áp dụng ngay hay dời sang phiên bản sau — trước khi trình khách hàng quyết định.

**Vì sao là mức ②:** đánh giá được tác động của thay đổi trước khi để nó ảnh hưởng tới dự án, không chỉ làm thư ký ghi chép.
