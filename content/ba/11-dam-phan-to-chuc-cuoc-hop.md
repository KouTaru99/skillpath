# Kỹ năng đàm phán & tổ chức cuộc họp

**Định nghĩa.** BA thường phải **tổ chức cuộc họp hiệu quả** (agenda rõ, đi đúng trọng tâm, chốt được hành động cụ thể có người chịu trách nhiệm) và **đàm phán** khi các bên có yêu cầu xung đột (khách hàng muốn nhiều tính năng, Dev nói không kịp; hai phòng ban muốn hai luồng ngược nhau). Nguyên tắc đàm phán lõi của BA: đưa các bên rời khỏi **lập trường** ("tôi muốn X") về **lợi ích gốc** ("tôi cần giải quyết việc gì") — lập trường thường xung đột, lợi ích gốc thường dung hoà được.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tổ chức một buổi họp có chuẩn bị: agenda gửi trước, điều phối đúng trọng tâm, biên bản có việc-người-hạn rõ ràng.

**Tình huống thực tế — buổi khảo sát yêu cầu "Export báo cáo" không lạc đề.** Trước họp một ngày, bạn gửi agenda để ai nấy đến với sự chuẩn bị:

```
AGENDA — Khảo sát yêu cầu Export báo cáo (45 phút, thứ 4 14:00)
  Mục tiêu: chốt được 3 câu — báo cáo gồm gì, kỳ xuất, định dạng.
  1. (10') Đội An ninh mô tả báo cáo đang làm tay hiện nay
  2. (20') Hỏi đáp: nội dung cột, kỳ xuất (ngày/tuần), người nhận
  3. (10') Xem 2 mẫu báo cáo BA phác sẵn — chọn 1
  4. (5')  Chốt việc tiếp theo

BIÊN BẢN (gửi trong ngày):
  Đã chốt: xuất tuần, theo mẫu B, thêm cột "thời gian phản ứng".
  Việc tiếp: BA viết PTYC (hạn thứ 6) · anh Tuấn gửi mẫu logo (thứ 5).
  Chưa chốt (hẹn buổi sau): có gửi tự động qua email không.
```

Hai chi tiết ăn tiền: **phác sẵn 2 mẫu để chọn** (chọn giữa 2 thứ cụ thể nhanh hơn mô tả từ số 0), và mục **"chưa chốt" ghi riêng** — minh bạch cái còn treo thay vì để nó trôi.

**Vì sao là mức ①:** điều phối tốt một buổi họp có mục tiêu rõ; chưa phải dàn xếp xung đột lợi ích thật giữa các bên.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** đàm phán được khi có **xung đột lợi ích thật** — biết đào lợi ích gốc của từng bên và thiết kế phương án cả hai chấp nhận, thay vì để hai bên mặc cả tay đôi.

**Tình huống thực tế — khách đòi 5 tính năng, Dev nói kịp 3.** Cuộc họp sprint planning căng: khách hàng "cả 5 cái đều gấp", trưởng nhóm Dev "chỉ kịp 3, chọn đi". Hai bên nhìn nhau. Bạn điều phối bằng cách đổi câu hỏi:

```
THAY VÌ HỎI: "Chọn 3 trong 5 cái nào?"  (mặc cả lập trường — bế tắc)
BẠN HỎI:     "Từng tính năng GIẢI QUYẾT việc gì, và điều gì xảy ra
              nếu nó trễ 2 tuần?"        (đào lợi ích gốc)

KẾT QUẢ ĐÀO ĐƯỢC:
  F1 Lọc cảnh báo giả      → mỗi ngày tốn 2h lọc tay      → trễ = đau NGAY
  F2 Báo cáo tuần tự động  → đang làm tay 30phút/tuần     → trễ = chịu được
  F3 Phân quyền phòng ban  → ĐỢT THANH TRA giữa tháng sau → có DEADLINE CỨNG
  F4 Bản đồ IP tấn công    → "nhìn cho trực quan"          → nice-to-have
  F5 Tích hợp lịch trực    → F1 cần nó để báo đúng người   → RÀNG BUỘC KỸ THUẬT

PHƯƠNG ÁN BẠN ĐỀ XUẤT:
  Sprint này: F1 + F5 (đi cùng nhau) + F3 (deadline thanh tra).
  F2 làm dạng "nửa tự động" (nút export mẫu có sẵn — 0.5 ngày) đỡ đau
  tạm; F4 vào backlog. Khách gật, Dev gật — không ai phải "thua".
```

Mấu chốt: F3 tưởng "ít gấp" hoá ra có deadline cứng duy nhất, F2 tưởng "gấp" hoá ra có giải pháp tạm rẻ. Thông tin đó chỉ lộ ra khi hỏi về **lợi ích gốc và hậu quả**, không bao giờ lộ khi hỏi "chọn cái nào".

**Vì sao là mức ②:** dàn xếp được xung đột thực bằng kỹ thuật đàm phán có phương pháp (lập trường → lợi ích gốc → phương án ai cũng sống được) — không chỉ điều phối họp suôn sẻ khi các bên vốn đã đồng thuận.
