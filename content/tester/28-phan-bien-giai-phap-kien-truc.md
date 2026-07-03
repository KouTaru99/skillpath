# Phản biện giải pháp nghiệp vụ & kiến trúc hệ thống

**Định nghĩa.** Đây là kỹ năng mới hoàn toàn ở Specialist, thuộc nhóm **Kiến trúc & thiết kế giải pháp** — Tester ở mức này không chỉ phản biện đặc tả (như ở Experienced) mà đủ tầm để **phản biện cả giải pháp nghiệp vụ và kiến trúc hệ thống**, ngang hàng góc nhìn kiến trúc sư/BA.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đưa ra phản biện về 1 phần giải pháp cụ thể khi tham gia review.

**Ví dụ thực tế.** Trong buổi review giải pháp cho tính năng mới "Phân quyền xem cảnh báo theo phòng ban", bạn phản biện: giải pháp đề xuất chỉ kiểm tra quyền ở tầng API nhưng không kiểm tra ở tầng export báo cáo — nghĩa là user có thể export ra file rồi xem được dữ liệu ngoài quyền hạn, dù giao diện đã chặn đúng.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** phản biện được cả **kiến trúc tổng thể**, không chỉ 1 giải pháp cụ thể.

**Ví dụ thực tế.** Bạn phản biện kiến trúc chung của hệ thống giám sát: toàn bộ log được lưu ở 1 CSDL trung tâm, không phân tách theo mức độ nhạy cảm — bạn chỉ ra rủi ro là nếu CSDL bị xâm nhập, toàn bộ log (kể cả log không nhạy cảm) đều bị lộ cùng lúc, đề xuất kiến trúc nên phân tách theo mức độ nhạy cảm dữ liệu.

## ▸ Specialist·V3 — ④ Chuyên gia
**Khác V2:** trở thành người có **tiếng nói quyết định** trong các buổi phản biện kiến trúc lớn của đơn vị, không chỉ đóng góp ý kiến.

**Ví dụ thực tế.** Bạn là 1 trong những người có quyền phủ quyết khi đơn vị quyết định kiến trúc bảo mật cho sản phẩm mới — ý kiến phản biện của bạn về 1 lỗ hổng thiết kế có thể khiến cả kiến trúc phải làm lại trước khi được duyệt triển khai.

**Vì sao tăng dần ①→④:** từ phản biện 1 giải pháp, tới phản biện cả kiến trúc, tới có quyền quyết định trong các buổi phản biện lớn.
