# Giao thức mạng (HTTP/HTTPS)

**Định nghĩa.** Hầu hết hệ thống web giao tiếp qua giao thức **HTTP** (không mã hoá) hoặc **HTTPS** (HTTP + mã hoá TLS). Hiểu **method** (GET đọc dữ liệu, POST tạo mới, PUT/PATCH sửa, DELETE xoá), **status code** (200 thành công, 400 lỗi phía client, 401/403 lỗi xác thực/quyền, 404 không tìm thấy, 500 lỗi phía server), và **header** (thông tin đi kèm request/response, ví dụ `Content-Type`, `Authorization`) giúp Tester hiểu được **API đang thực sự trả về gì**, không chỉ nhìn giao diện.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu được request/response cơ bản qua tab Network của trình duyệt, phân biệt được các status code phổ biến.

**Ví dụ thực tế.** Test tính năng "Đánh dấu cảnh báo đã xử lý" trên hệ thống giám sát, bạn mở tab Network khi bấm nút, thấy request `PUT /api/alerts/123/resolve` trả về **200** kèm dữ liệu cảnh báo đã cập nhật — xác nhận đúng. Khi thử với 1 cảnh báo không tồn tại (`/api/alerts/99999/resolve`), bạn thấy trả về **404**, đúng như kỳ vọng thay vì **500** (lỗi server không kiểm soát). Nếu vô tình gọi API khi chưa đăng nhập, bạn kiểm tra thấy đúng **401** (chưa xác thực) chứ không phải **403** (đã xác thực nhưng thiếu quyền) — hai mã dễ nhầm nhưng ý nghĩa khác hẳn.

**Vì sao là mức ①:** đọc hiểu và phân biệt đúng các tín hiệu HTTP cơ bản để kiểm chứng API, chưa cần tự thiết kế kịch bản kiểm thử API chuyên sâu (đó là kỹ năng "Kiểm thử API & tự động hoá" riêng).
