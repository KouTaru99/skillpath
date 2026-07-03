# Các loại kiểm thử

**Định nghĩa.** Phân loại theo **mục đích**: **kiểm thử chức năng** (functional — chạy đúng nghiệp vụ không); **kiểm thử xác nhận** (confirmation — bug vừa fix đã hết chưa) và **kiểm thử hồi quy** (regression — sửa chỗ này có làm vỡ chỗ khác không); **smoke test** (test nhanh các luồng chính xác nhận bản build "chạy được" trước khi test sâu). Mức cao hơn: **kiểm thử phi chức năng** (hiệu năng, bảo mật, tải...), **kiểm thử thăm dò** (exploratory — không theo kịch bản, chủ động khám phá) và **kiểm thử đoán lỗi** (error guessing — dựa kinh nghiệm nhắm chỗ hay lỗi).

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Phân biệt và thực hiện đúng kiểm thử chức năng, xác nhận/hồi quy và smoke test — biết dùng loại nào ở thời điểm nào.

**Tình huống thực tế — một buổi sáng nhận build mới của hệ thống giám sát.** Trình tự bạn làm phản ánh đúng vai trò từng loại test:

```
09:00  Build v2.4 vừa lên môi trường test.
       → SMOKE TEST trước (10 phút, các luồng xương sống):
         ☑ đăng nhập được   ☑ dashboard load   ☑ danh sách cảnh báo hiện
         ☑ tạo được 1 cảnh báo thử
         → cả 4 pass → build "sống", đáng để test sâu.
         (Nếu 1 cái fail → báo ngay, KHÔNG test sâu trên build hỏng
          — đỡ tốn công viết bug cho thứ sẽ được build lại)

10:00  Dev báo đã fix BUG-207 (khoá tài khoản).
       → KIỂM THỬ XÁC NHẬN: chạy lại đúng TC01 → giờ khoá đúng ✓
       → KIỂM THỬ HỒI QUY: chạy thêm 3 case liên quan đăng nhập
         (đăng nhập đúng vẫn vào được? reset đếm khi đăng nhập đúng?
          đổi mật khẩu vẫn hoạt động?) — chắc chắn fix không làm vỡ
         luồng đăng nhập khác.
```

Điểm Junior hay bỏ: sau khi xác nhận bug đã fix, **vẫn phải hồi quy vùng lân cận** — fix một chỗ làm vỡ chỗ khác là bug phổ biến nhất trong nghề.

**Vì sao là mức ①:** áp dụng đúng loại kiểm thử cơ bản theo tình huống; chưa chủ động tìm lỗi ngoài kịch bản.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** thành thạo thêm kiểm thử phi chức năng, thăm dò, đoán lỗi — và quan trọng nhất, biết **khi nào dùng loại nào** và dùng kinh nghiệm nhắm trúng chỗ dễ vỡ.

**Tình huống thực tế 1 — kiểm thử thăm dò phát hiện lỗ hổng ngoài spec.** Sau khi chạy hết kịch bản có sẵn cho module đăng nhập, bạn dành 30 phút **thăm dò** với tâm thế "kẻ tấn công/người dùng phá phách":

```
PHIÊN THĂM DÒ (không kịch bản — ghi lại phát hiện):
  - Đăng nhập cùng lúc 2 trình duyệt cùng tài khoản → CẢ HAI đều vào
    được. Spec không cấm, nhưng hệ thống AN NINH mà cho đa phiên
    không cảnh báo? → nêu vấn đề: có nên chặn/cảnh báo multi-session?
  - Bấm nút "Đăng nhập" liên tục thật nhanh (double-submit) → tạo 2
    request → bộ đếm sai lần nhảy 2 đơn vị/lần bấm → có thể khoá oan
    ở lần bấm thứ 3. → BUG thật.
```

**Tình huống thực tế 2 — đoán lỗi có căn cứ (nguyên lý "lỗi tụ đàn").** Module xử lý cảnh báo tuần trước đã có 3 bug quanh việc gộp cảnh báo. Theo nguyên lý lỗi tụ đàn, bạn không rời khu vực đó mà đào sâu thêm — thử "3 cảnh báo Cao xảy ra trong cùng 1 giây" (biên hiếm gặp) và phát hiện dashboard sắp xếp sai thứ tự. Kinh nghiệm mách: chỗ đã lắm lỗi thường còn lỗi.

**Vì sao là mức ②:** chủ động tìm lỗi ngoài kịch bản viết sẵn, biết chọn loại kiểm thử và nhắm chỗ dễ vỡ bằng nguyên lý nghề — không chỉ chạy đúng những gì được giao.
