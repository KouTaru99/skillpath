# Xây dựng tài liệu phân tích yêu cầu (PTYC) & giải pháp chi tiết

**Định nghĩa.** **PTYC** (Phân tích yêu cầu) là tài liệu mô tả **yêu cầu nghiệp vụ đã được làm rõ** — khác với yêu cầu thô ban đầu của khách hàng, PTYC đã được BA phân tích, hỏi lại chỗ mơ hồ, và diễn đạt lại đủ chi tiết để Dev code đúng. **Tài liệu giải pháp** đi xa hơn: mô tả chi tiết từng trường dữ liệu, ràng buộc, trường hợp ngoại lệ — là "hợp đồng" giữa BA và Dev. Một câu đơn giản để phân biệt: yêu cầu thô nói *"tôi muốn gì"*, PTYC nói *"hệ thống phải làm gì"*, tài liệu giải pháp nói *"làm chính xác như thế nào, kể cả khi mọi thứ không suôn sẻ"*.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết được PTYC cho 1 chức năng đơn giản, đơn lẻ — Dev đọc xong code được mà không phải quay lại hỏi những câu cơ bản.

**Tình huống thực tế — PTYC cho chức năng "Xem chi tiết cảnh báo".** Yêu cầu thô của khách hàng chỉ có một câu: "bấm vào cảnh báo thì xem được chi tiết". Bạn triển khai thành PTYC có cấu trúc:

```
PTYC-014 · Xem chi tiết cảnh báo                    (v1.0 — đã chốt 12/06)

1. Mô tả       Từ danh sách, bấm 1 dòng → mở màn chi tiết cảnh báo.
2. Ai được xem Quản trị viên an ninh; tài khoản "chỉ xem" cũng xem được
               nhưng KHÔNG thấy nút "Đánh dấu đã xử lý".
3. Dữ liệu     - IP nguồn / IP đích, cổng, giao thức
   hiển thị    - Mức độ (Thấp/Trung bình/Cao), thời điểm phát hiện
               - 50 dòng log gần nhất liên quan (lấy từ hệ thống log)
4. Nguồn dữ    API nội bộ của IDS; log lấy theo id cảnh báo.
   liệu
5. Câu hỏi đã  "Log hiển thị bao nhiêu dòng?" → chốt 50, có nút tải thêm.
   chốt        "Xem cảnh báo đã xoá được không?" → không có khái niệm xoá.
```

Mục 5 là thói quen đáng giá nhất ở mức này: **ghi lại cả những câu đã hỏi và câu trả lời đã chốt** — người sau đọc không phải hỏi lại từ đầu.

**Vì sao là mức ①:** mô tả đủ và có cấu trúc cho 1 chức năng đơn lẻ; chưa phải xử lý ràng buộc chéo giữa nhiều chức năng hay các trường hợp ngoại lệ phức tạp.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** viết tài liệu giải pháp chi tiết có **ràng buộc và trường hợp ngoại lệ** — mức chi tiết mà Dev không phải "đoán" bất kỳ chỗ nào, và Tester dùng được luôn làm căn cứ viết test case.

**Tình huống thực tế — tài liệu giải pháp "Khoá tài khoản sau N lần đăng nhập sai".** Nghe thì đơn giản, nhưng bạn viết đủ các lớp mà một dòng yêu cầu thô không bao giờ nói ra:

```
GP-007 · Khoá tài khoản sau N lần đăng nhập sai

THAM SỐ
  N: cấu hình được, mặc định 5, hợp lệ 3–10 (ngoài khoảng → báo lỗi cấu hình)
  Thời gian khoá tạm: 15 phút kể từ lần sai thứ N.

RÀNG BUỘC
  R1. KHÔNG áp dụng cho tài khoản admin gốc (tránh bị khoá toàn hệ thống
      khi kẻ tấn công cố tình nhập sai để "khoá giùm" quản trị viên).
  R2. Đếm số lần sai theo TÀI KHOẢN, không theo IP (tấn công phân tán
      nhiều IP vẫn phải bị chặn).
  R3. Đăng nhập thành công → reset bộ đếm về 0.

NGOẠI LỆ
  E1. Tài khoản đã bị khoá THỦ CÔNG trước đó → hết 15 phút KHÔNG tự mở
      (khoá thủ công chỉ quản trị viên mở được).
  E2. Đổi mật khẩu thành công qua luồng quên mật khẩu → mở khoá + reset đếm.
  E3. Hệ thống không ghi được log khoá → vẫn khoá (ưu tiên an toàn),
      đẩy cảnh báo lỗi ghi log cho quản trị.
```

Ràng buộc R1 chính là chỗ thể hiện "hiểu nghiệp vụ an ninh": nếu thiếu nó, kẻ tấn công có thể lợi dụng chính tính năng bảo vệ để khoá tài khoản quản trị — một dạng tấn công từ chối dịch vụ qua nghiệp vụ.

**Vì sao là mức ②:** tài liệu đủ làm "hợp đồng" — phủ cả ràng buộc và ngoại lệ, Dev không phải đoán, Tester lấy làm căn cứ viết case; không chỉ mô tả happy path (luồng suôn sẻ).
