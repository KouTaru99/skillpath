# Đọc hiểu & soi lỗi tài liệu giải pháp hệ thống

**Định nghĩa.** *Tài liệu giải pháp hệ thống* (solution / design document) mô tả cách một hệ thống được dựng: kiến trúc tổng thể, luồng nghiệp vụ (sequence/flow), đặc tả API, mô hình dữ liệu (data model), và ràng buộc phi chức năng (hiệu năng, bảo mật...). Kỹ năng này gồm hai vế: (1) **đọc hiểu** để code đúng ý người thiết kế, và (2) **soi lỗi** — chủ động phát hiện chỗ thiếu, mâu thuẫn, hoặc logic sai *trước khi* code, vì sửa trên tài liệu rẻ hơn sửa trên code gấp nhiều lần.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc tài liệu nắm được phần việc của mình: màn hình nào, gọi API nào, tham số gì, hiển thị ra sao; và biết hỏi lại khi chỗ nào chưa rõ thay vì đoán.

**Ví dụ thực tế.** Từ một sequence diagram đăng nhập và đặc tả API, bạn xác định FE phải làm gì:
```
Sequence: User → FE → POST /api/login {username, password}
          ← 200 { token, expiresIn }  → FE lưu token, chuyển trang chủ
          ← 401 { message }           → FE hiện lỗi "Sai tài khoản/mật khẩu"
```
Bạn đọc ra: cần một form, gọi đúng endpoint, xử lý 2 nhánh 200/401, và lưu token để dùng cho các request sau.

**Vì sao là mức ①:** hiểu đúng để làm đúng, nhưng chưa đối chiếu sâu hay phát hiện thiếu sót.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** đọc độc lập không cần kèm, và bắt đầu **đối chiếu tài liệu với thực tế** — phát hiện chỗ tài liệu chưa mô tả (thiếu trạng thái lỗi, thiếu validation, thiếu loading).

**Ví dụ thực tế — bắt lỗ hổng trong API spec.** Đọc đặc tả:
```yaml
GET /api/users/{id}:
  responses:
    200: { id, name, email }
    # ❓ Thiếu: 404 khi id không tồn tại?
    # ❓ Thiếu: 401 khi token hết hạn?
```
Bạn nêu ra ngay: *"Spec chưa mô tả 404 và 401 — FE cần biết để hiển thị 'không tìm thấy' và tự động đăng xuất khi token hết hạn. Đề xuất bổ sung."* Đây là phát hiện tiết kiệm cả buổi debug về sau.

**Vì sao là mức ②:** không chỉ làm theo mà còn soi được chỗ thiếu trong phạm vi một API/màn.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** soi lỗi logic **xuyên màn / xuyên luồng** — mâu thuẫn giữa các phần tài liệu, thứ tự phụ thuộc sai, giả định không đứng vững.

**Ví dụ thực tế — mâu thuẫn thứ tự dữ liệu.** Tài liệu mô tả:
```
Luồng A "Xem giỏ hàng": giả định mỗi sản phẩm đã có trường discountPrice.
Luồng B "Áp mã giảm giá": chỉ tính discountPrice SAU khi người dùng nhập mã.
→ Mâu thuẫn: màn giỏ hàng (A) hiển thị discountPrice khi nó chưa được tạo (B chạy sau).
```
Bạn chỉ ra sự phụ thuộc ngược thứ tự này và đề xuất: A hiển thị giá gốc, chỉ hiện discountPrice sau khi B chạy — chặn một bug khó tìm về sau.

**Vì sao vẫn là ②:** bạn bắt được lỗi logic liên thông, nhưng chưa ở mức phản biện cả giải pháp kiến trúc.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** bạn **phản biện giải pháp** và đề xuất thiết kế tốt hơn, đánh giá được tác động phi chức năng (hiệu năng, bảo mật, khả năng mở rộng).

**Ví dụ thực tế — phản biện thiết kế gọi API.** Tài liệu mô tả màn dashboard gọi 5 API tuần tự, mỗi cái chờ cái trước:
```
GET /summary → GET /chart → GET /recent → GET /alerts → GET /tasks   (tổng ~2.5s)
```
Bạn phản biện: 5 API này độc lập, không cần tuần tự → đề xuất gọi **song song** (`Promise.all`) đưa thời gian chờ về ~tối đa của một call (~0.6s), hoặc gộp thành một endpoint `GET /dashboard` để giảm số request. Bạn cân nhắc đánh đổi (gộp endpoint khó tái dùng hơn) và nêu khuyến nghị rõ ràng.

**Vì sao là mức ③:** bạn không chỉ đọc và bắt lỗi mà còn nâng chất lượng chính bản thiết kế.
