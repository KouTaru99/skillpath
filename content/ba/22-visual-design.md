# Visual design của sản phẩm/ứng dụng

**Định nghĩa.** Khác prototype (bố cục/luồng tương tác), **visual design** (thiết kế thị giác) là phần "nhìn" thật sự: màu sắc, **typography** (chữ: font, cỡ, độ đậm), khoảng cách, biểu tượng, tương phản. Kỹ năng mới ở Specialist, đi kèm việc đã thành thạo prototype — career-path yêu cầu "thành thạo xây dựng prototype VÀ visual design". Với sản phẩm giám sát an ninh, visual design không phải chuyện đẹp-xấu: **màu sai chỗ có thể làm người trực bỏ sót một cuộc tấn công thật.**

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Góp ý hình ảnh cho từng màn hình dựa trên nguyên tắc thị giác cơ bản (tương phản, phân cấp, nhất quán) — nói được *vì sao* chứ không chỉ "nhìn chưa ổn".

**Tình huống thực tế — góp ý dashboard bằng nguyên tắc, không bằng cảm tính.** Review bản thiết kế dashboard mới, bạn ghi nhận xét có căn cứ:

```
GÓP Ý VISUAL — Dashboard v2 (theo nguyên tắc, kèm lý do)

1. TƯƠNG PHẢN   Đỏ cảnh báo "Cao" đang là đỏ nhạt trên nền xám nhạt
   → độ tương phản thấp, liếc nhanh dễ sót. Đề xuất: đỏ đậm
   + nền dòng nhuộm nhẹ (người trực quét bằng ngoại vi mắt,
   không đọc từng dòng).
2. PHÂN CẤP     Số "tổng cảnh báo hôm nay" (ít quan trọng) đang TO
   THỊ GIÁC     bằng số "đang chờ xử lý" (quan trọng nhất).
   → cái người trực cần thấy đầu tiên phải to/đậm nhất.
3. MÀU CÓ NGHĨA Biểu đồ tròn đang dùng đỏ-cam-xanh cho "phân bố
   theo phòng ban" — nhưng đỏ/cam đã mang nghĩa mức độ nghiêm
   trọng ở nơi khác → người dùng sẽ đọc nhầm "phòng đỏ = nguy
   hiểm". Đổi sang dải màu trung tính.
```

Góp ý số 3 là loại lỗi designer thuần (không hiểu nghiệp vụ) hay mắc — và BA hiểu cả hai phía là người bắt tốt nhất.

**Vì sao là mức ①:** góp ý từng màn có nguyên tắc và lý do nghiệp vụ; chưa đặt ra chuẩn hình ảnh chung cho cả sản phẩm.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** xây được **bộ quy chuẩn hình ảnh nhất quán cho cả sản phẩm** — không góp ý từng màn nữa mà đặt luật để mọi màn tự đúng.

**Tình huống thực tế — bộ quy chuẩn thị giác cho toàn hệ thống giám sát.** Sản phẩm đã 30+ màn hình, 3 Dev FE thay nhau làm — mỗi màn một kiểu nút, ba kiểu bảng. Bạn xây quy chuẩn một trang:

```
QUY CHUẨN THỊ GIÁC — Hệ thống giám sát ANM (v1)

MÀU NGỮ NGHĨA (cấm dùng sai chỗ)
  Đỏ #C0341D    = CHỈ mức Cao / hành động nguy hiểm
  Cam #D97706   = CHỈ mức Trung bình
  Xám #6B7280   = mức Thấp / phụ trợ
  Xanh #2563EB  = hành động chính, link — KHÔNG dùng cho trạng thái
CHỮ
  3 cỡ duy nhất: 22 tiêu đề màn / 15 nội dung / 13 phụ chú.
  Số liệu dùng font đều nét (tabular) — cột số thẳng hàng.
BẢNG DỮ LIỆU (linh hồn của sản phẩm giám sát)
  Mức độ luôn là CỘT ĐẦU, có màu; dòng chưa đọc in đậm;
  hover nhuộm nhẹ; không kẻ ô dọc (nhiễu thị giác).
BIỂU TƯỢNG  1 bộ icon duy nhất (Material) — cấm trộn bộ khác.
KIỂM TRA    Mọi màn mới trước khi merge: chụp cạnh 1 màn cũ —
            nhìn như CÙNG MỘT sản phẩm chưa?
```

Quý sau, màn hình mới của cả 3 Dev tự nhất quán mà không cần bạn review từng cái — quy chuẩn tốt là quy chuẩn **tự thi hành**.

**Vì sao là mức ②:** chuẩn hoá thị giác cấp sản phẩm với màu mang ngữ nghĩa nghiệp vụ; giá trị nằm ở tính nhất quán hệ thống, không phải sửa đẹp từng màn.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** làm chủ trọn gói **prototype + visual design đạt chất lượng bàn giao** — tự tay ra thiết kế hoàn chỉnh Dev code thẳng được, không cần designer chuyên trách; và biết giới hạn của chính mình để gọi designer đúng lúc.

**Tình huống thực tế — một mình "gánh" thiết kế module báo cáo cho lãnh đạo trong 2 tuần.** Dự án nhỏ, không ngân sách designer, deadline gấp: module "Báo cáo ATTT hằng quý cho ban lãnh đạo". Bạn tự làm trọn trên Figma:

```
QUY TRÌNH 1 NGƯỜI CỦA BẠN (5 ngày làm việc)
  N1     Phỏng vấn nhanh 2 người nhận báo cáo: họ đọc gì đầu tiên?
         (trả lời: "quý này có ổn không" — 1 câu, không phải 20 biểu đồ)
  N2     Wireframe 3 màn: Tổng quan 1 trang / Xu hướng / Chi tiết
         theo yêu cầu — duyệt nhanh qua chat, sửa 2 vòng.
  N3-4   Visual hoàn chỉnh theo đúng quy chuẩn v1 (màu ngữ nghĩa,
         3 cỡ chữ) + trạng thái đủ: loading / rỗng / lỗi / in ra giấy
         (báo cáo lãnh đạo hay bị IN — designer thường quên state này,
         bạn không quên vì hiểu nghiệp vụ).
  N5     Đóng gói bàn giao: file Figma đặt tên lớp gọn gàng, spacing
         theo lưới 8px, chú thích tương tác từng thành phần — Dev FE
         code không phải hỏi lại lần nào.
```

Đáng nói nhất là phần bạn **không** làm: màn "bản đồ tấn công thời gian thực" (đồ hoạ động phức tạp) bạn chủ động đề xuất thuê designer freelance 3 ngày — vì biết nó vượt tay nghề mình, và cái giá của đồ hoạ động xấu là sản phẩm trông "đồ chơi" trước mặt lãnh đạo. Chuyên sâu thật sự bao gồm **biết chính xác biên giới năng lực của mình**.

**Vì sao là mức ④:** trọn gói từ khảo sát → prototype → visual → bàn giao đạt chuẩn code-thẳng, cộng với sự tỉnh táo biết lúc nào cần chuyên gia khác — mức làm chủ hoàn toàn, không phải "biết mọi thứ". (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
