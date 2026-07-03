# Hỗ trợ nghiệm thu sản phẩm/hệ thống với khách hàng

**Định nghĩa.** Khi sản phẩm hoàn thành, BA hỗ trợ AM/PM (Account Manager — người quản lý quan hệ khách hàng / Project Manager — quản lý dự án) trong buổi **nghiệm thu** (acceptance — khách hàng xác nhận chính thức sản phẩm đạt yêu cầu để thanh toán/đóng dự án). Vai của BA: là người **nắm yêu cầu gốc rõ nhất phòng họp** — chuẩn bị bảng đối chiếu yêu cầu ↔ kết quả, demo, và giải thích khi khách thắc mắc. Nghiệm thu suôn sẻ hay bế tắc phụ thuộc phần lớn vào khâu chuẩn bị của BA.

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Chuẩn bị bộ tài liệu đối chiếu yêu cầu–kết quả cho buổi nghiệm thu, demo theo kịch bản, và giải thích rõ khi khách hàng hỏi.

**Tình huống thực tế — chuẩn bị nghiệm thu module "Cảnh báo tự động".** Một tuần trước buổi nghiệm thu, bạn dựng bảng đối chiếu từng dòng yêu cầu trong PTYC đã ký:

```
BẢNG ĐỐI CHIẾU NGHIỆM THU — Module Cảnh báo tự động

  # | Yêu cầu (PTYC đã ký)            | Kết quả  | Cách chứng minh
 ---|---------------------------------|----------|--------------------
  1 | Cảnh báo Cao gửi email + SMS    | ✅ Đạt   | Demo bắn thử 1 cảnh
    | trong 30 giây                   |          | báo giả lập, bấm giờ
  2 | Gộp cảnh báo cùng loại trong    | ✅ Đạt   | Demo bắn 20 cảnh báo
    | cửa sổ 5 phút                   |          | → hiện 1 sự cố
  3 | Export báo cáo tuần định dạng   | ✅ Đạt   | Mở file mẫu đã export
    | theo mẫu nội bộ                 |          |
  4 | Tích hợp lịch trực ca           | ⚠️ Đạt   | Demo + LƯU Ý: lịch
    |                                 | một phần | nghỉ lễ nhập tay
```

Trong buổi demo, khách hàng hỏi: "Sao cảnh báo mức Thấp không gửi email?" — bạn mở đúng mục PTYC đã ký: chỉ Trung bình/Cao gửi email, mức Thấp chỉ ghi log (chính khách chốt để tránh ngợp hộp thư). Thắc mắc đóng ngay tại chỗ, không thành "nghi án thiếu tính năng". Điểm khôn ngoan thứ hai: dòng 4 bạn **chủ động khai báo hạn chế trước** thay vì chờ khách phát hiện — mất 2 phút giải thích, đổi lấy niềm tin cho cả buổi.

**Vì sao là mức ①:** chuẩn bị và hỗ trợ tốt một buổi nghiệm thu cụ thể theo kịch bản; chưa phải tự xử lý khi buổi nghiệm thu phát sinh bất đồng lớn.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** khi buổi nghiệm thu phát sinh **bất đồng** (khách cho rằng thiếu tính năng, kết quả không như kỳ vọng), bạn giữ được buổi họp không bế tắc và tìm ra hướng xử lý các bên chấp nhận.

**Tình huống thực tế — khách nói "thiếu tính năng" dù PTYC đã ký không có.** Giữa buổi nghiệm thu, trưởng đội An ninh mạng nói: "Tôi tưởng hệ thống tự chặn IP tấn công chứ? Chỉ cảnh báo thôi thì thiếu." Không khí căng — AM nhìn sang bạn. Cách bạn xử lý:

```
1. KHÔNG ĐÔI CO ĐÚNG/SAI TRƯỚC MẶT KHÁCH
   Không nói "anh ký PTYC rồi" (đúng nhưng đẩy khách vào thế mất mặt).
2. TÁCH SỰ VIỆC KHỎI CẢM XÚC
   "Em xác nhận lại: nhu cầu tự chặn IP là có thật và quan trọng.
    Trong phạm vi đã ký (mục 2.1) hệ thống dừng ở cảnh báo — vì lúc
    khảo sát mình thống nhất chưa cho hệ thống tự can thiệp mạng,
    sợ chặn nhầm IP nội bộ. Biên bản ngày 15/03 có ghi lý do này."
3. CHUYỂN BẤT ĐỒNG THÀNH VIỆC LÀM TIẾP
   Đề xuất tại chỗ: nghiệm thu phạm vi đã ký hôm nay; nhu cầu "tự
   chặn IP" ghi nhận thành yêu cầu giai đoạn 2, kèm buổi khảo sát
   riêng về rủi ro chặn nhầm. Khách đồng ý ký nghiệm thu.
```

Mấu chốt: nhờ mục 5 "câu hỏi đã chốt" trong PTYC và biên bản có ghi **lý do** loại tính năng này ra từ đầu (không chỉ ghi "không làm"), bạn có bằng chứng thuyết phục mà không cần thắng-thua với khách.

**Vì sao là mức ②:** xử lý được bất đồng thật trong nghiệm thu — giữ quan hệ, giữ tiến độ ký, và biến tranh cãi thành phạm vi giai đoạn sau; không chỉ chạy đúng kịch bản khi mọi thứ suôn sẻ.
