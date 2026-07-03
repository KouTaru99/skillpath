# Giao thức mạng (HTTP/HTTPS)

**Định nghĩa.** Hầu hết hệ thống web giao tiếp qua **HTTP** (không mã hoá) hoặc **HTTPS** (HTTP + mã hoá TLS). Tester cần hiểu: **method** (GET đọc, POST tạo, PUT/PATCH sửa, DELETE xoá), **status code** (200 thành công, 400 lỗi phía client, 401 chưa xác thực, 403 đã xác thực nhưng thiếu quyền, 404 không tìm thấy, 500 lỗi server), và **header** (thông tin kèm request/response: `Content-Type`, `Authorization`...). Hiểu HTTP giúp Tester biết **API thực sự trả về gì** — bắt được cả lớp lỗi mà giao diện đã "che" đi bằng thông báo thân thiện.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu request/response qua tab Network của trình duyệt, phân biệt đúng các status code phổ biến — và nhận ra khi mã trả về "sai loại".

**Tình huống thực tế — soi tab Network khi test "Đánh dấu cảnh báo đã xử lý".** Bạn không chỉ nhìn UI báo "thành công" mà mở Network (F12) đối chiếu tầng HTTP:

```
KỊCH BẢN TEST + TÍN HIỆU HTTP QUAN SÁT ĐƯỢC:

  1. Bấm "Đánh dấu đã xử lý" cảnh báo có thật (id 123)
     → PUT /api/alerts/123/resolve  →  200 OK ✓ (đúng)

  2. Gọi cảnh báo KHÔNG tồn tại (sửa URL thành id 99999)
     → PUT /api/alerts/99999/resolve
     → Mong đợi 404 (không tìm thấy). Thực tế trả 500?
       → BUG: server không xử lý được id lạ, "vỡ" thay vì báo
         lỗi lịch sự → dev cần bắt case này.

  3. Gọi API khi CHƯA đăng nhập (xoá cookie phiên rồi gọi lại)
     → Mong đợi 401 (chưa xác thực). Nếu trả 403 → sai loại:
       401 vs 403 khác nhau — 401 = "anh là ai?", 403 = "biết
       anh rồi nhưng anh không có quyền". Nhầm gây khó cho FE
       xử lý (401 nên đá về trang đăng nhập, 403 thì không).
```

Case 2 là loại bug UI che mất: giao diện chỉ hiện "có lỗi xảy ra", còn tab Network mới lộ ra đó là **500** (lỗi server không kiểm soát) chứ không phải **404** (lỗi được lường trước) — với sản phẩm an ninh, 500 không kiểm soát là điểm dễ bị khai thác.

**Vì sao là mức ①:** đọc và phân biệt đúng tín hiệu HTTP cơ bản để kiểm chứng API sâu hơn UI; chưa cần tự thiết kế bộ kiểm thử API chuyên sâu (kỹ năng "Kiểm thử API & tự động hoá" riêng).
