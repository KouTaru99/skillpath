# Phân tích & xây dựng giải pháp nghiệp vụ tổng thể, toàn trình, liên thông hệ thống

**Định nghĩa.** Khác biệt lớn nhất giữa Specialist và Senior: Senior làm dự án có **phạm vi đã xác định**, Specialist làm bài toán có **phạm vi chưa xác định** — phải tự phân tích và xây dựng giải pháp **tổng thể** (nhiều hệ thống), **toàn trình** (end-to-end — từ đầu tới cuối luồng nghiệp vụ, không dừng ở ranh giới một hệ thống), **liên thông** (các hệ thống nói chuyện được với nhau). Đây là vùng làm việc mà câu hỏi khó nhất không phải "làm thế nào" mà là "bài toán thật sự là gì".

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tham gia phân tích một phần của bài toán liên thông — nắm được các vấn đề đặc thù của tích hợp nhiều hệ thống (khớp dữ liệu, ai là nguồn sự thật, lệch nhịp cập nhật).

**Tình huống thực tế — phân tích phần giao tiếp giữa hệ thống giám sát và hệ thống quản lý tài sản.** Công ty muốn: cảnh báo hiện rõ "thuộc thiết bị nào, ai quản lý" — dữ liệu này nằm bên hệ thống quản lý tài sản CNTT. Bạn phụ trách phân tích điểm nối:

```
PHÂN TÍCH ĐIỂM TÍCH HỢP — Giám sát ↔ Quản lý tài sản

KHỚP DỮ LIỆU BẰNG GÌ?  Cảnh báo có IP; tài sản có IP + mã thiết bị.
  → Khớp bằng IP. NHƯNG: IP cấp động (DHCP) đổi theo ngày!
  → Phải khớp bằng IP + THỜI ĐIỂM (tài sản nào giữ IP đó LÚC cảnh
    báo xảy ra) — chi tiết này quyết định cả thiết kế tích hợp.
AI LÀ NGUỒN SỰ THẬT?   Tên người quản lý thiết bị: lấy bên tài sản,
  KHÔNG lưu bản sao bên giám sát (tránh 2 nơi 2 tên khác nhau).
LỆCH NHỊP?             Tài sản cập nhật 1 lần/ngày — cảnh báo cần
  real-time → chấp nhận độ trễ 1 ngày cho thông tin "ai quản lý",
  ghi rõ vào tài liệu để không ai kỳ vọng nhầm.
```

Phát hiện "IP động" là loại vấn đề chỉ lộ ra khi phân tích tích hợp thật — trên giấy, "khớp bằng IP" nghe hiển nhiên đúng.

**Vì sao là mức ①:** phân tích chắc một phần của bài toán liên thông với các câu hỏi đặc thù tích hợp; chưa chủ trì cả luồng xuyên hệ thống.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** **chủ trì cả một luồng nghiệp vụ xuyên nhiều hệ thống** — vẽ được bức tranh toàn trình, chốt điểm tích hợp, và thiết kế cả kịch bản "một hệ thống trục trặc thì luồng sống sao".

**Tình huống thực tế — chủ trì luồng "phát hiện → xử lý → báo cáo tuân thủ" xuyên 3 hệ thống.** Yêu cầu từ ban ATTT: mọi sự cố phải chảy tự động vào báo cáo tuân thủ quý, không ai phải gõ lại. Bạn chủ trì thiết kế toàn trình:

```
LUỒNG TOÀN TRÌNH (3 hệ thống)

[GIÁM SÁT]──sự cố đóng──▶[QL TÀI SẢN]──gắn thiết bị/đơn vị──▶[BC TUÂN THỦ]
                          (làm giàu dữ liệu)                  (tổng hợp quý)

QUYẾT ĐỊNH CHỐT (những câu không hệ thống đơn lẻ nào trả lời được):
1. KHI NÀO đẩy dữ liệu? Sự cố ĐÓNG mới đẩy (đang mở còn đổi) —
   nhưng báo cáo quý cần cả "sự cố mở kéo dài" → thêm luồng phụ:
   sự cố mở >30 ngày cũng đẩy, gắn nhãn "chưa đóng".
2. HỆ THỐNG GIỮA (tài sản) SẬP thì sao? Không được chặn luồng:
   sự cố xếp hàng đợi (queue), tự đẩy lại khi tài sản sống dậy;
   quá 48h → báo động cho quản trị, sự cố đẩy thẳng sang báo cáo
   với trường thiết bị = "chưa làm giàu" (có còn hơn mất).
3. SỬA LẠI SỰ CỐ ĐÃ ĐẨY? Cho phép trong 7 ngày — sau đó khoá
   (báo cáo tuân thủ đã chốt kỳ không được đổi số liệu ngầm).
```

Điểm ăn tiền của người chủ trì: quyết định số 2 và 3 — **thiết kế cho lúc trục trặc và cho vòng đời dữ liệu**, thứ mà nếu để từng đội tự làm phần mình, không ai nhận trách nhiệm nghĩ hộ.

**Vì sao là mức ②:** chủ trì trọn luồng xuyên 3 hệ thống với đầy đủ kịch bản lỗi và vòng đời dữ liệu; bài toán tuy lớn nhưng phạm vi vẫn được giao tương đối rõ.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** nhận đề bài **mơ hồ hoàn toàn** từ lãnh đạo — tự định hình phạm vi bài toán (cái gì thuộc, cái gì không), rồi mới xây giải pháp. Năng lực lõi ở đây là **biến một câu nói thành một bài toán giải được**.

**Tình huống thực tế — từ câu "muốn nhìn toàn cảnh an ninh cả công ty" thành lộ trình 18 tháng.** Ban lãnh đạo nói đúng một câu như vậy. Không có danh sách yêu cầu, không có phạm vi. Bạn làm việc mà không ai giao cụ thể được:

```
BƯỚC 1 — ĐỊNH NGHĨA LẠI CÂU HỎI (3 tuần phỏng vấn 8 bên)
  "Toàn cảnh" với mỗi người một nghĩa:
   CEO      = "công ty có đang bị tấn công không, thiệt hại bao nhiêu"
   Ban ATTT = "điểm mù ở đâu, đơn vị nào tuân thủ kém"
   Vận hành = "một màn hình thay vì 5 hệ thống phải mở"
  → Bạn chốt lại thành 3 BÀI TOÁN TÁCH ĐƯỢC, không phải 1:
    (A) bảng điều hành rủi ro cho lãnh đạo, (B) bản đồ phủ giám
    sát cho ban ATTT, (C) màn hợp nhất cho vận hành.

BƯỚC 2 — VẼ RANH GIỚI (quan trọng nhất: cái KHÔNG làm)
  KHÔNG gộp 5 hệ thống làm 1 (đập xây lại = 3 năm + rủi ro chết
  giữa đường). CHỈ xây 1 lớp liên thông đọc dữ liệu từ 5 hệ thống
  hiện có. Ranh giới này trình lãnh đạo duyệt TRƯỚC khi phân tích
  chi tiết — định phạm vi xong mới làm, không vừa làm vừa phình.

BƯỚC 3 — LỘ TRÌNH THEO GIÁ TRỊ
  6 tháng đầu: (C) màn vận hành hợp nhất — đau nhất, thấy ngay.
  6 tháng sau: (B) bản đồ phủ — cần dữ liệu (C) tích luỹ.
  6 tháng cuối: (A) bảng lãnh đạo — cần (B) để số liệu đáng tin.
  (Thứ tự NGƯỢC với mong muốn ban đầu của CEO — bạn thuyết phục
  được: bảng lãnh đạo xây trước sẽ đẹp mà rỗng, vì dữ liệu nền
  chưa sạch. CEO chấp nhận chờ để có số thật.)
```

Mười tám tháng sau hệ thống chạy đủ 3 phần — nhưng khoảnh khắc "Specialist" thật sự là ở Bước 1–2: khi chưa ai nói được mình muốn gì, bạn là người **định hình được bài toán để mọi người cùng muốn một thứ**.

**Vì sao là mức ④:** tự định hình phạm vi từ đề bài một câu, dám chốt cái không-làm, và dẫn lộ trình nhiều pha xuyên tổ chức — đỉnh của nghề phân tích: giải bài toán chưa được ra đề. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
