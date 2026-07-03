# Xây dựng phương pháp đánh giá hiệu quả tính năng sản phẩm

**Định nghĩa.** Specialist BA xây dựng **phương pháp đo lường** xem một tính năng có thực sự hiệu quả không — mức độ cần thiết, hữu ích, giá trị đem lại cho người dùng. Đây là bước nhảy tư duy quan trọng: từ "đã làm xong đúng yêu cầu" (góc nhìn dự án) sang "**có đáng làm không, có tác dụng thật không**" (góc nhìn sản phẩm). Không có phương pháp đo, roadmap được quyết bằng người nói to nhất; có phương pháp đo, tính năng phải tự chứng minh bằng số.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đề xuất được chỉ số đánh giá đúng bản chất cho một tính năng cụ thể — tránh được bẫy "đo cái dễ đo thay vì cái có nghĩa".

**Tình huống thực tế — chọn chỉ số cho tính năng "Tự động tương quan cảnh báo" vừa ra mắt.** Câu hỏi "tính năng chạy tốt không?" — Dev trả lời bằng uptime, nhưng bạn đề xuất đo bằng thứ nghiệp vụ quan tâm:

```
CHỌN CHỈ SỐ — tính năng Tương quan cảnh báo

MỤC ĐÍCH GỐC của tính năng: giảm ngợp cho người trực
  (500 cảnh báo lẻ → gộp thành vài sự cố)

  Chỉ số ứng viên            | Đánh giá
  ---------------------------|------------------------------------
  Số cảnh báo được gộp/ngày  | ❌ đo HOẠT ĐỘNG, không đo GIÁ TRỊ
                             | (gộp nhiều đâu có nghĩa gộp đúng)
  Uptime của module          | ❌ điều kiện cần, không phải hiệu quả
  ✅ Số ĐẦU VIỆC người trực  | đúng nỗi đau gốc: 480 việc/ngày
     phải chạm mỗi ngày      | trước ra mắt → mục tiêu <150
  ✅ Tỉ lệ gộp SAI (2 sự cố  | đo mặt trái — gộp ẩu còn nguy hiểm
     khác nhau bị dính chùm) | hơn không gộp: mục tiêu <3%
```

Cặp chỉ số "giá trị + mặt trái" là thói quen đáng giá nhất ở mức này: mọi tính năng tự động hoá đều phải đo cả cái nó có thể làm hỏng.

**Vì sao là mức ①:** chọn được chỉ số đo đúng bản chất (kèm chỉ số mặt trái) cho một tính năng; chưa xây khung áp dụng hệ thống cho mọi tính năng.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** xây **khung đánh giá hoàn chỉnh áp cho mọi tính năng** — chỉ số khai báo *trước khi làm*, đo *sau khi ra mắt*, có nhịp báo cáo — chấm dứt kiểu "làm xong là xong".

**Tình huống thực tế — đưa khung "khai số trước, đo số sau" vào quy trình sản phẩm.** Bạn thiết kế khung một trang, gắn thẳng vào biểu mẫu đề xuất tính năng:

```
KHUNG ĐÁNH GIÁ HIỆU QUẢ TÍNH NĂNG (điền TRƯỚC khi được duyệt làm)

1. NỖI ĐAU        Ai đau, đau cỡ nào, số hiện trạng?
   (vd: trực ca mất 2h/ngày lọc cảnh báo giả — đo 2 tuần: TB 118 phút)
2. CHỈ SỐ THÀNH CÔNG  Sau 1 tháng ra mắt, số nào phải đạt bao nhiêu?
   (vd: thời gian lọc tay giảm còn <45 phút/ngày)
3. CHỈ SỐ MẶT TRÁI    Cái gì không được xấu đi?
   (vd: tỉ lệ cảnh báo THẬT bị lọc nhầm <1%)
4. CÁCH ĐO        Số lấy từ đâu, ai đo, đo lúc nào?
   (log hệ thống + khảo sát 4 người trực — tuần 4 sau ra mắt)
5. ĐIỂM XÉT LẠI   Không đạt thì làm gì? (chỉnh tiếp / chấp nhận / gỡ)

NHỊP VẬN HÀNH: review hiệu quả 1 lần/tháng, 30 phút, đi qua mọi
tính năng ra mắt trong 3 tháng gần nhất — công khai cả số đẹp lẫn xấu.
```

Buổi review tháng đầu tiên có khoảnh khắc "đắt": tính năng "bản đồ IP trực quan" (từng được đòi rất hăng) — sau 1 tháng chỉ 2 người mở, tổng 11 lần. Con số ấy không cần ai tranh luận. Từ đó mọi đề xuất tính năng đều tự động nghiêm túc hơn ở mục 1–2, vì ai cũng biết sẽ có ngày bị "đo lại".

**Vì sao là mức ②:** khung đánh giá thành quy trình có nhịp áp cho mọi tính năng — thay đổi được hành vi đề xuất của cả team; không còn đo tuỳ hứng từng tính năng.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** phương pháp trở thành **chuẩn bắt buộc cấp đơn vị, gắn với quyết định đầu tư và khai tử tính năng** — số đo của bạn quyết định tiền và số phận tính năng, nên phương pháp phải chịu được cả sự phản kháng chính trị.

**Tình huống thực tế — khung đánh giá thành "luật" của đơn vị, và lần đầu nó khai tử một tính năng có người đỡ đầu.** Khung của bạn được đưa vào quy chế: tính năng mới phải có hồ sơ 5 mục mới được duyệt ngân sách; tính năng cũ không đạt chỉ số sau 6 tháng vào danh sách xem xét gỡ. Phép thử thật đến ngay quý sau:

```
CA KHÓ: tính năng X do một trưởng phòng đề xuất và bảo trợ —
6 tháng không đạt chỉ số (dùng 5% mức khai báo). Trưởng phòng
phản ứng: "chỉ số đặt sai, tính năng này giá trị dài hạn".

CÁCH KHUNG CỦA BẠN CHỊU ĐƯỢC SỨC ÉP:
- Chỉ số là CHÍNH NGƯỜI ĐỀ XUẤT khai khi xin ngân sách (mục 2
  có chữ ký) — không phải bạn áp đặt sau.
- Quy trình có lối thoát danh dự: cho phép "khai lại chỉ số + gia
  hạn 1 quý" đúng 1 lần, công khai — trưởng phòng chọn lối này.
- Quý sau vẫn không đạt → gỡ theo quy trình, KHÔNG cần một cuộc
  họp căng thẳng nào: luật đã định sẵn từ trước khi có ca cụ thể.

TÁC ĐỘNG SAU 1 NĂM: 3 tính năng bị gỡ, nguồn lực dồn về 2 hướng
có số tốt; tỉ lệ tính năng ra mắt đạt chỉ số tháng-1 tăng 40%→72%
(mọi người khai chỉ số thật hơn vì biết sẽ bị đo).
```

Bài học tầng Specialist nằm ở thiết kế cơ chế: phương pháp đo chỉ sống được ở cấp đơn vị nếu nó **công bằng về thủ tục** (tự khai, có lối thoát, luật định trước ca cụ thể) — vì ở tầm này, kẻ thù của đo lường không phải kỹ thuật mà là chính trị.

**Vì sao là mức ④:** phương pháp gắn thẳng vào quyết định ngân sách và khai tử tính năng cấp đơn vị, được thiết kế đủ vững để chịu sức ép con người — số đo trở thành thể chế, không phải báo cáo tham khảo. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
