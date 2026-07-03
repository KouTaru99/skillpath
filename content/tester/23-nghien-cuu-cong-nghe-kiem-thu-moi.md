# Nghiên cứu công nghệ/kỹ thuật kiểm thử mới (R&D)

**Định nghĩa.** Ở Specialist, Tester chuyển từ "làm giỏi kiểm thử" sang **người dẫn dắt cả đơn vị về công nghệ/kỹ thuật kiểm thử** — tự nghiên cứu độc lập (không cần ai giao đề bài), mang công nghệ mới về áp dụng *trước khi* nó thành chuẩn ngành. Bản lĩnh R&D thật sự nằm ở chỗ **phân biệt công nghệ đáng đầu tư với công nghệ chỉ hào nhoáng** — thử thật, đo thật, rồi mới khuyến nghị.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tự tìm hiểu một công nghệ/kỹ thuật kiểm thử mới ngoài phạm vi việc hàng ngày, thử ở quy mô nhỏ để đánh giá tiềm năng.

**Tình huống thực tế — thử kỹ thuật sinh test case bằng AI trên module Phân tích log.** Bạn nghe về **kiểm thử dựa trên AI** (dùng mô hình học máy đọc log sản phẩm để tự gợi ý test case) và tự đánh giá thay vì tin quảng cáo:

```
NGHIÊN CỨU NHỎ (tự làm, ngoài giờ dự án):
  Câu hỏi: công cụ AI sinh test case từ log có gợi ý được case
           mà con người bỏ sót không?
  Phạm vi thử: module "Phân tích log" — 1 tuần log thật
  Cách đánh giá: so bộ case AI gợi ý với bộ case team đang có
  Ghi nhận ban đầu: AI gợi ý 3 case lạ (dựa mẫu log bất thường
    hiếm gặp) — nhưng cũng đẻ ra 10 case rác trùng lặp.
  → Kết luận sơ bộ: CÓ tiềm năng nhưng cần lọc; đáng thử tiếp
    ở quy mô lớn hơn trước khi kết luận.
```

**Vì sao là mức ①:** tự khởi xướng nghiên cứu và đánh giá tiềm năng ở quy mô nhỏ; chưa có kết quả đo lường đủ để khuyến nghị.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** áp dụng thử nghiệm **có kết quả đo lường được**, đủ số liệu để nói công nghệ này đáng hay không — dù chưa nhân rộng.

**Tình huống thực tế — thử nghiệm có đối chứng trên 3 tháng log thật.** Bạn nâng nghiên cứu nhỏ thành thử nghiệm có phương pháp:

```
THỬ NGHIỆM CÓ ĐO LƯỜNG — Công cụ sinh test case từ log (3 tháng)

  Thiết kế: chạy công cụ trên log 3 tháng → lọc case hợp lệ →
            bổ sung vào bộ test → đo trong 1 sprint

  KẾT QUẢ ĐO ĐƯỢC:
  - Công cụ gợi ý 5 case MỚI hợp lệ mà team chưa từng nghĩ tới
    (đều dựa trên chuỗi hành vi log thật hiếm gặp)
  - 2/5 case này bắt được bug thật khi đưa vào test
  - Tỉ lệ phát hiện lỗi của bộ test tăng ~8%
  - CHI PHÍ: cần 1 người lọc case rác ~2h/tuần (AI đẻ nhiều case
    vô nghĩa) — chưa tự động lọc được

  KẾT LUẬN: có giá trị THẬT (đo được) nhưng cần giải quyết khâu
  lọc rác trước khi nhân rộng.
```

Khác V1 ở chỗ: mọi phát biểu đều có **con số** (8%, 2/5, 2h/tuần) — R&D nghiêm túc là đo được, không phải "cảm thấy hữu ích".

**Vì sao là mức ②:** thử nghiệm có phương pháp và số liệu đủ để quyết định; chưa ở tầm khuyến nghị chính thức cho cả đơn vị.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** nghiên cứu **độc lập hoàn toàn** và đủ uy tín để **khuyến nghị áp dụng rộng cho cả đơn vị** kèm lộ trình + chi phí/lợi ích — trở thành người mang công nghệ mới vào thực tế công ty.

**Tình huống thực tế — đề xuất chính thức áp dụng công cụ sinh test case cho cả đơn vị.** Sau khi giải quyết được khâu lọc rác (viết bộ lọc tự động), bạn viết đề xuất cấp đơn vị:

```
ĐỀ XUẤT ÁP DỤNG — Sinh test case từ log cho toàn bộ SP giám sát

BẰNG CHỨNG      Thử nghiệm 3 tháng: +8% phát hiện lỗi, 2 bug thật
                bắt thêm; sau khi thêm bộ lọc tự động, chi phí lọc
                tay giảm từ 2h → 15 phút/tuần.
PHẠM VI ÁP DỤNG 4 sản phẩm giám sát (đều có log dồi dào — phù hợp
                nhất với kỹ thuật này).
LỘ TRÌNH        Quý 1: áp 1 sản phẩm làm mẫu + đào tạo 2 người.
                Quý 2: nhân ra 3 sản phẩm còn lại.
CHI PHÍ/LỢI ÍCH Chi phí: license + ~10 ngày công tích hợp/sản phẩm.
                Lợi ích: +8% phát hiện lỗi sớm ≈ giảm X bug lọt
                production/năm (quy ra chi phí sự cố tránh được).
RANH GIỚI       KHÔNG áp cho sản phẩm ít log (không đủ dữ liệu cho
TRUNG THỰC      AI học) — chỉ rõ nơi công nghệ này KHÔNG hợp.
```

Dòng "ranh giới trung thực" (nói rõ chỗ công nghệ không hợp) là thứ làm đề xuất đáng tin — R&D ở tầm chuyên gia không phải bán công nghệ, mà chỉ đúng chỗ nên và không nên dùng.

**Vì sao là mức ④:** nghiên cứu độc lập tới mức đủ thẩm quyền định hướng công nghệ cho cả đơn vị, với bằng chứng đo được và cả sự trung thực về giới hạn — trở thành người đầu tiên đưa công nghệ mới vào thực tế. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
