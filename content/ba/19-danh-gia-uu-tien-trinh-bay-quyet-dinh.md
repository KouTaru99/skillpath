# Đánh giá ưu tiên yêu cầu & trình bày thông tin hỗ trợ ra quyết định

**Định nghĩa.** Khi có nhiều yêu cầu cùng lúc, Senior BA phải **đánh giá và sắp xếp độ ưu tiên** có phương pháp, rồi **trình bày thông tin đủ rõ để người có quyền quyết định được nhanh** — thay vì đưa danh sách hỗn độn hoặc (tệ hơn) tự quyết thay cấp trên. Nghề này có một chân lý: người ra quyết định không thiếu quyết đoán — họ thiếu **thông tin được cấu trúc đúng**. BA giỏi là người nấu thông tin tới độ "chín" vừa đủ để quyết.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Sắp xếp ưu tiên một danh sách yêu cầu theo tiêu chí rõ ràng, nhất quán — giải thích được vì sao cái này đứng trên cái kia.

**Tình huống thực tế — xếp ưu tiên 6 yêu cầu cho sprint kế.** PM đưa 6 yêu cầu, hỏi "làm cái nào trước?". Bạn không xếp theo cảm giác mà công bố tiêu chí trước, xếp sau:

```
TIÊU CHÍ (công bố trước khi xếp — chống cãi nhau về sau):
  T1. Ảnh hưởng tới năng lực PHÁT HIỆN/PHẢN ỨNG tấn công (cao nhất)
  T2. Có deadline cứng bên ngoài không (thanh tra, quy định)
  T3. Số người hưởng lợi × tần suất dùng

KẾT QUẢ XẾP:
  1. Lọc cảnh báo giả          (T1: tăng phát hiện thật — chuông
                                đang bị nhờn vì 70% giả)
  2. Phân quyền phòng ban      (T2: đợt thanh tra 15/08)
  3. Tích hợp lịch trực        (T1 gián tiếp: báo đúng người trực)
  4. Báo cáo tuần tự động      (T3: 4 người × 1 lần/tuần)
  5. Bản đồ IP trực quan       (T3 thấp: đẹp nhưng không đổi hành vi)
  6. Đổi màu giao diện         (không chạm tiêu chí nào)
```

PM nhìn 1 phút là duyệt — vì mỗi vị trí có lý do bám tiêu chí, không phải "em thấy nên thế".

**Vì sao là mức ①:** xếp ưu tiên nhất quán theo tiêu chí công khai cho một danh sách cụ thể; chưa phải trình bày đánh đổi đa chiều cho cấp ra quyết định cao hơn.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** trình bày để người quyết **tự thấy được đánh đổi** — bạn không bán một đáp án, bạn bày bàn cờ đủ thông tin kèm khuyến nghị, và chuẩn bị sẵn cho câu hỏi "nếu... thì sao".

**Tình huống thực tế — trình ban lãnh đạo chọn hướng đầu tư quý.** Ban lãnh đạo phải chọn giữa 3 hướng lớn cho quý tới (chỉ đủ nguồn lực làm 1). Bạn trình một trang duy nhất:

```
BẢNG QUYẾT ĐỊNH — 1 trong 3 hướng đầu tư quý IV

              A. Lọc cảnh báo   B. Mở rộng cho     C. Tự động chặn
                 giả (TI)          cty thành viên     IP (SOAR mini)
Giải quyết    trực ca mất       2 cty con đang     rút ngắn phản ứng
nỗi đau       2h/ngày lọc tay   không có giám sát  từ phút → giây
Công sức      3 tuần            8 tuần             5 tuần
Rủi ro chính  phụ thuộc nguồn   hạ tầng phải nâng  chặn nhầm IP đối
              TI ngoài (thấp)   trước (đội hạ tầng tác (đã xảy ra
                                đang kẹt dự án X)  1 lần năm nay)
Nếu HOÃN      vẫn sống như nay  cty con tiếp tục   vẫn sống, phản ứng
1 quý         (đau nhưng quen)  "mù" — rủi ro tăng chậm như hiện tại
KHUYẾN NGHỊ   ✅ A trước (nhanh, rủi ro thấp, giảm tải người) —
              B quý sau khi đội hạ tầng rảnh — C cần A xong trước
              (chặn tự động trên nền cảnh báo 70% giả là tự sát)
```

Chi tiết đắt nhất: dòng "Nếu HOÃN 1 quý" — người quyết luôn cân nhắc *chi phí của việc không làm*, nhưng hiếm ai bày sẵn cho họ. Và dòng khuyến nghị chỉ ra **quan hệ phụ thuộc** giữa C và A (chặn tự động cần cảnh báo sạch trước) — thứ mà bảng điểm số đơn thuần không nói được. Lãnh đạo quyết trong 20 phút, chọn đúng A→B→C.

**Vì sao là mức ②:** cấu trúc thông tin đa chiều (nỗi đau, công sức, rủi ro, chi phí trì hoãn, phụ thuộc) để người quyết tự thấy bàn cờ và quyết nhanh, có khuyến nghị nhưng không áp đặt — trình bày trở thành công cụ ra quyết định, không phải báo cáo liệt kê.
