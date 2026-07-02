# Đảm bảo yêu cầu phi chức năng hệ thống (NFR)

**Định nghĩa.** **NFR** (Non-Functional Requirements) là yêu cầu về cách hệ thống vận hành, khác yêu cầu nghiệp vụ: Scalability, Security, Adaptability, Compatibility, Manageability, Availability. Một API "đúng chức năng" vẫn có thể thất bại nếu không đạt NFR — trả đúng kết quả nhưng mất 10 giây vẫn coi là hỏng.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Xác định và viết ra được NFR cụ thể, đo được cho một tính năng/module.

**Ví dụ thực tế — viết NFR cụ thể cho API tìm kiếm đơn hàng.**
```
✅ Cụ thể, đo được:
- Performance: p95 < 500ms với 1 triệu đơn hàng.
- Scalability: chịu 200 request/giây đồng thời mà latency không tăng quá 20%.
- Availability: nếu service tìm kiếm lỗi, trang vẫn tải được, không sập cả trang.
```
Yêu cầu đo được giúp team biết chính xác khi nào tính năng "đạt" — không tranh cãi cảm tính.

**Vì sao là mức ①:** viết được NFR cụ thể cho một tính năng — chưa chịu trách nhiệm đảm bảo NFR cho cả hệ thống lớn.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** chịu trách nhiệm đảm bảo NFR cho cả hệ thống, xử lý khi NFR của các tính năng khác nhau mâu thuẫn.

**Ví dụ thực tế — cân bằng NFR mâu thuẫn giữa "lịch sử giao dịch" (Compatibility — giữ đầy đủ dữ liệu cũ) và "tìm kiếm nhanh" (Performance — dữ liệu càng gọn càng tốt).** Bạn tách trách nhiệm: dữ liệu đầy đủ lưu kho riêng (không tối ưu tốc độ), dữ liệu phục vụ tìm kiếm chỉ giữ bản tóm tắt gần đây, đồng bộ định kỳ — cả hai NFR cùng đạt được.

**Vì sao là mức ②:** bạn cân bằng được NFR mâu thuẫn giữa nhiều tính năng trong cùng hệ thống.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** đặt ra bộ chuẩn NFR mặc định cho mọi hệ thống mới của đơn vị.

**Ví dụ thực tế — chuẩn NFR tối thiểu bắt buộc cho mọi hệ thống mới.**
```
- Availability: 99.5%, có kế hoạch backup rõ ràng.
- Security: qua review bảo mật cơ bản, kiểm quyền ở backend.
- Manageability: có log có cấu trúc + tích hợp APM.
Hệ thống có nhu cầu đặc biệt (vd thanh toán cần 99.99%) thì NÂNG chuẩn lên, không bao giờ thấp hơn.
```
Đội phát triển hệ thống mới bắt đầu từ chuẩn chung rồi điều chỉnh, thay vì tự nghĩ lại từ đầu và có nguy cơ bỏ sót.

**Vì sao là mức ④:** bạn đặt ra chuẩn NFR nền tảng cho toàn đơn vị — mức cao nhất của kỹ năng này.
