# Xây dựng tài liệu chỉ tiêu kỹ thuật dự án/sản phẩm

**Định nghĩa.** **Chỉ tiêu kỹ thuật** (technical specification ở tầm dự án/sản phẩm) là tài liệu tổng hợp các ràng buộc phi chức năng (hiệu năng, khả năng mở rộng, bảo mật ở mức nghiệp vụ) mà giải pháp phải đáp ứng — khác PTYC (mô tả 1 tính năng), tài liệu này bao quát cả sản phẩm.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tham gia đóng góp 1 phần cho tài liệu chỉ tiêu kỹ thuật, dưới sự dẫn dắt của người khác.

**Ví dụ thực tế.** Bạn đóng góp phần "yêu cầu nghiệp vụ về thời gian phản hồi" trong tài liệu chỉ tiêu kỹ thuật của hệ thống giám sát: cảnh báo mức Cao phải tới tay người dùng trong 5 giây, dashboard phải load trong 2 giây — dựa trên hiểu biết nghiệp vụ về mức độ khẩn cấp cần thiết.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** chủ trì xây dựng **toàn bộ phần chỉ tiêu liên quan tới nghiệp vụ** cho 1 sản phẩm, không chỉ đóng góp 1 phần.

**Ví dụ thực tế.** Bạn chủ trì viết phần chỉ tiêu nghiệp vụ trong tài liệu kỹ thuật tổng thể của sản phẩm giám sát: số lượng cảnh báo tối đa cần xử lý đồng thời (dựa trên quy mô hệ thống thực tế của công ty), yêu cầu về khả năng mở rộng khi số lượng nguồn log tăng gấp đôi, yêu cầu bảo mật dữ liệu log theo phân loại nhạy cảm — tất cả xuất phát từ hiểu biết nghiệp vụ thực tế, không phải chỉ tiêu kỹ thuật thuần tuý do Dev tự đặt ra.

**Vì sao là mức ②:** chủ trì cả mảng chỉ tiêu nghiệp vụ cho sản phẩm, không chỉ đóng góp từng phần nhỏ.
