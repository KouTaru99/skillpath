# Quản lý nhóm kiểm thử

**Định nghĩa.** Senior Tester bắt đầu vai trò **quản lý chuyên môn** một nhóm kiểm thử — phân việc, kiểm soát tiến độ và chất lượng của thành viên khác, không chỉ tự làm việc mình. Đây là ranh giới nghề nghiệp: từ "làm giỏi việc cá nhân" sang "chịu trách nhiệm về kết quả của người khác" — kỹ năng và áp lực khác hẳn.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tham gia phân việc và theo dõi tiến độ cho vài thành viên, dưới sự giám sát của quản lý cấp trên — biết giao việc theo năng lực và độ khó.

**Tình huống thực tế — chia việc test 3 tính năng cho 2 Junior.** Bạn không chia đều máy móc mà cân độ khó với năng lực từng người:

```
PHÂN VIỆC SPRINT — 3 tính năng, 2 Junior (bạn điều phối)

  Tính năng            | Độ khó | Giao cho | Lý do
  ---------------------|--------|----------|----------------------
  Cảnh báo tự động     | KHÓ    | Hà (kèm  | Hà mạnh nghiệp vụ ANM
  (logic gộp phức tạp) |        | bạn sát) | nhưng ca này khó → bạn
                       |        |          | review sát mỗi ngày
  Export báo cáo PDF   | TB     | Minh     | Minh làm export tốt ở
                       |        |          | sprint trước, quen tay
  Cấu hình hệ thống    | DỄ     | Minh     | ghép cùng Minh cho đủ tải

  THEO DÕI: hỏi tiến độ ở daily, KHÔNG đợi cuối sprint. Hà gặp khó
  ở case biên → bạn ngồi cùng gỡ ngay, không để tắc 2 ngày.
```

**Vì sao là mức ①:** phân việc hợp lý và theo dõi sát cho nhóm nhỏ dưới giám sát cấp trên; chưa tự chịu trách nhiệm toàn bộ chất lượng đầu ra nhóm.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự chủ quản lý nhóm **4-8 người**, chịu trách nhiệm cả **chất lượng đầu ra** (không chỉ tiến độ) — xây cơ chế để chất lượng nhóm ổn định, không phụ thuộc mình soi từng bài.

**Tình huống thực tế — quản lý nhóm 5 Tester cho một đợt release lớn.** Bạn chịu trách nhiệm giải trình nếu chất lượng nhóm có vấn đề, nên không thể chỉ "giao việc rồi chờ":

```
CƠ CHẾ VẬN HÀNH NHÓM 5 TESTER (đợt release lớn)

  1. CHẤT LƯỢNG ĐẦU VÀO
     Mỗi người tự chạy checklist chuẩn + review chéo kịch bản
     TRƯỚC khi thực thi (2 người đọc bài nhau) → bắt lỗi sớm,
     không dồn hết lên bạn.
  2. BÁO CÁO HỢP NHẤT
     1 bảng theo dõi chung (Pass/Fail/Blocked toàn nhóm) thay vì
     5 người báo rời rạc → bạn thấy bức tranh tổng, phát hiện
     module nào đang tắc.
  3. KIỂM SOÁT CHẤT LƯỢNG
     Bạn hậu kiểm xác suất: mỗi ngày đọc kỹ 2-3 bug report ngẫu
     nhiên → giữ chuẩn mô tả bug đồng đều cả nhóm.
  4. CHỊU TRÁCH NHIỆM
     Nếu bug lọt lưới ra production → bạn là người giải trình +
     dẫn buổi rút kinh nghiệm (không đổ cho cá nhân nào).

  KẾT QUẢ: nhóm chạy ổn định kể cả khi bạn bận — vì chất lượng
  nằm trong CƠ CHẾ (review chéo, checklist), không nằm ở việc
  bạn soi từng bài.
```

Bước nhảy V1→V2: V1 giao việc cho người, V2 xây **hệ thống** để nhóm tự giữ chất lượng — và dám đứng ra chịu trách nhiệm cho kết quả chung.

**Vì sao là mức ②:** chịu trách nhiệm về kết quả đầu ra của cả nhóm 4-8 người bằng cơ chế, không chỉ phân việc — đúng ranh giới "quản lý được người khác" mà career-path Senior yêu cầu.
