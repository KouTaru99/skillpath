# Đọc hiểu & soi lỗi tài liệu giải pháp hệ thống

**Định nghĩa.** *Tài liệu giải pháp hệ thống* (solution / design document) mô tả cách hệ thống được dựng: kiến trúc tổng thể, luồng nghiệp vụ (sequence/flow), đặc tả API, mô hình dữ liệu, ràng buộc phi chức năng. Kỹ năng gồm hai vế: (1) **đọc hiểu** để code đúng ý người thiết kế, và (2) **soi lỗi** — phát hiện chỗ thiếu, mâu thuẫn, logic sai *trước khi* code, vì sửa trên tài liệu rẻ hơn sửa trên code gấp nhiều lần.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc tài liệu nắm phần việc của mình: màn nào, gọi API nào, tham số gì, hiển thị ra sao; biết hỏi lại khi chưa rõ thay vì đoán.

**Ví dụ thực tế.** Từ sequence diagram đăng nhập + đặc tả API, bạn xác định FE phải làm gì:
```
User → FE → POST /api/login {username, password}
       ← 200 { token, expiresIn }  → FE lưu token, chuyển trang chủ
       ← 401 { message }           → FE hiện lỗi "Sai tài khoản/mật khẩu"
```
Bạn đọc ra: cần form, gọi đúng endpoint, xử lý 2 nhánh 200/401, lưu token cho request sau.

**Vì sao là mức ①:** hiểu đúng để làm đúng, chưa đối chiếu sâu hay phát hiện thiếu sót.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Đọc độc lập, **đối chiếu tài liệu với thực tế** — phát hiện chỗ chưa mô tả (thiếu trạng thái lỗi, thiếu validation, thiếu loading).

**Ví dụ thực tế — bắt lỗ hổng trong API spec.**
```yaml
GET /api/users/{id}:
  responses:
    200: { id, name, email }
    # ❓ Thiếu: 404 khi id không tồn tại?
    # ❓ Thiếu: 401 khi token hết hạn?
```
Bạn nêu ngay: *"Spec chưa có 404 và 401 — FE cần biết để hiển thị 'không tìm thấy' và tự đăng xuất khi token hết hạn."* — tiết kiệm cả buổi debug về sau.

**Vì sao là mức ②:** soi được chỗ thiếu trong phạm vi một API/màn.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** soi lỗi logic **xuyên màn / xuyên luồng** — mâu thuẫn giữa các phần, thứ tự phụ thuộc sai, giả định không đứng vững.

**Ví dụ 1 — mâu thuẫn thứ tự dữ liệu.**
```
Luồng A "Xem giỏ hàng": giả định mỗi sản phẩm đã có discountPrice.
Luồng B "Áp mã giảm giá": chỉ tính discountPrice SAU khi nhập mã.
→ A hiển thị discountPrice khi nó chưa tồn tại (B chạy sau) → sai thứ tự.
```

**Ví dụ 2 — thiếu trạng thái trung gian.** Tài liệu mô tả "bấm Thanh toán → sang trang kết quả", nhưng không nói lúc chờ cổng thanh toán phản hồi thì hiển thị gì. Bạn chỉ ra và đề xuất trạng thái "đang xử lý" + khoá nút chống bấm 2 lần.

**Vì sao vẫn là ②:** bắt lỗi logic liên thông, chưa phản biện cả giải pháp kiến trúc.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** **phản biện giải pháp** và đề xuất thiết kế tốt hơn, đánh giá tác động phi chức năng (hiệu năng, bảo mật, mở rộng).

**Ví dụ 1 — phản biện gọi API tuần tự.** Dashboard gọi 5 API tuần tự, mỗi cái chờ cái trước (~2.5s). Bạn đề xuất gọi **song song** (`forkJoin` trong Angular) đưa về ~0.6s, hoặc gộp thành một endpoint tổng; cân nhắc đánh đổi (gộp khó tái dùng hơn).

**Ví dụ 2 — chỉ ra rủi ro bảo mật trong thiết kế.** Tài liệu để FE nhận `role` từ response rồi tự ẩn/hiện nút "Xoá". Bạn phản biện: ẩn nút chỉ là UX, **backend vẫn phải kiểm quyền** — nếu không, ai gọi thẳng API vẫn xoá được. Đề xuất ghi rõ backend enforce quyền.

**Ví dụ 3 — soi rủi ro hiệu năng từ data model.** Thiết kế trả về danh sách đơn kèm toàn bộ chi tiết từng đơn. Bạn chỉ ra với 1.000 đơn payload sẽ khổng lồ → đề xuất trả tóm tắt + lazy-load chi tiết khi mở.

**Vì sao là mức ③:** không chỉ bắt lỗi mà còn nâng chất lượng chính bản thiết kế.

## ▸ Senior·V2 — ④ Chuyên sâu
**Khác Ex·V3:** soi lỗi ở tầm **liên hệ thống** — mâu thuẫn giữa các service/team khác nhau, không chỉ trong một ứng dụng.

**Ví dụ thực tế — hai hệ thống mâu thuẫn nhau về "ai là nguồn chân lý".** Tài liệu module Đơn hàng ghi: giá sản phẩm lấy trực tiếp từ `order.price` (lưu tại thời điểm đặt). Tài liệu module Khuyến mãi (team khác) lại giả định giá hiển thị luôn là `product.currentPrice` mới nhất. Hai tài liệu không xung đột logic *nội bộ*, nhưng ghép lại thì đơn hàng cũ sẽ hiển thị SAI giá nếu module Khuyến mãi vô tình dùng nhầm nguồn. Bạn chỉ ra mâu thuẫn này ngay ở giai đoạn review liên team, trước khi hai đội code xong mới phát hiện.

**Vì sao là mức ④:** bạn soi được lỗi nằm ở *ranh giới giữa các hệ thống* — nơi mà mỗi tài liệu riêng lẻ đều "đúng", chỉ sai khi ghép lại.
