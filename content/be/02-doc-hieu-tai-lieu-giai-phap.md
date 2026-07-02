# Đọc hiểu & soi lỗi tài liệu giải pháp hệ thống

**Định nghĩa.** *Tài liệu giải pháp hệ thống* (solution/design document) mô tả cách hệ thống được dựng: kiến trúc tổng thể, luồng nghiệp vụ (sequence/flow), đặc tả API, mô hình dữ liệu, ràng buộc phi chức năng. Kỹ năng gồm hai vế: (1) **đọc hiểu** để code đúng ý người thiết kế, và (2) **soi lỗi** — phát hiện chỗ thiếu, mâu thuẫn, logic sai *trước khi* code, vì sửa trên tài liệu rẻ hơn sửa trên code gấp nhiều lần.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc tài liệu nắm phần việc của mình: API nào cần viết, tham số gì, trả về gì, dữ liệu lấy từ bảng nào; biết hỏi lại khi chưa rõ thay vì đoán.

**Ví dụ thực tế.** Từ đặc tả API đăng nhập, bạn xác định BE phải làm gì:
```
POST /api/login {username, password}
  → 200 { token, expiresIn }   nếu đúng tài khoản
  → 401 { message }            nếu sai tài khoản/mật khẩu
```
Bạn đọc ra: cần kiểm tra username tồn tại, so khớp mật khẩu (đã hash), sinh token, xử lý 2 nhánh 200/401 — và hỏi lại nếu tài liệu chưa nói rõ token hết hạn sau bao lâu.

**Vì sao là mức ①:** hiểu đúng để làm đúng, chưa đối chiếu sâu hay phát hiện thiếu sót.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Đọc độc lập, **đối chiếu tài liệu với thực tế** — phát hiện chỗ chưa mô tả (thiếu trạng thái lỗi, thiếu validation).

**Ví dụ thực tế — bắt lỗ hổng trong đặc tả API.**
```yaml
POST /api/orders:
  responses:
    201: { id, status }
    # ❓ Thiếu: 400 khi thiếu trường bắt buộc?
    # ❓ Thiếu: điều gì xảy ra nếu customerId không tồn tại?
```
Bạn nêu ngay: *"Đặc tả chưa có 400 và chưa nói rõ customerId không tồn tại thì trả gì — cần làm rõ trước khi code, không tự đoán."*

**Vì sao là mức ②:** soi được chỗ thiếu trong phạm vi một API cụ thể.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V1:** chủ động tìm ra **lỗi logic ở tầm hệ thống** (không chỉ một API) — mâu thuẫn giữa các luồng nghiệp vụ liên quan nhau.

**Ví dụ thực tế — mâu thuẫn giữa luồng "huỷ đơn" và luồng "hoàn kho".** Tài liệu mô tả luồng A: "Huỷ đơn → đổi status thành CANCELLED". Tài liệu mô tả luồng B (viết bởi người khác): "Hoàn kho khi đơn chuyển sang CANCELLED hoặc RETURNED". Đọc riêng từng luồng đều hợp lý — nhưng bạn nhận ra: nếu một đơn bị huỷ **sau khi đã giao hàng** (trạng thái RETURNED thực chất phải qua bước hoàn hàng vật lý, không tự động), luồng B có thể hoàn kho SAI cho một đơn hàng thực ra khách chưa trả lại. Bạn chỉ ra mâu thuẫn ngầm này trước khi 2 team code xong theo 2 tài liệu riêng biệt.

**Vì sao là mức ③:** bạn soi được lỗi nằm ở *ranh giới giữa các luồng nghiệp vụ*, không chỉ trong một tài liệu đơn lẻ.
