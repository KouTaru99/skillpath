# Cập nhật, quản lý & lưu trữ tài liệu/yêu cầu thay đổi theo quy trình

**Định nghĩa.** Yêu cầu luôn thay đổi giữa dự án — BA phải có kỷ luật **cập nhật tài liệu ngay khi có thay đổi** và **quản lý lịch sử thay đổi** (change log — ai đề xuất, khi nào, ảnh hưởng gì), tránh tình trạng tài liệu nói một đằng, code chạy một nẻo mà không ai biết bản nào đúng. Nguyên tắc vàng: tài liệu chỉ có giá trị khi nó là **nguồn sự thật duy nhất** — một tài liệu lệch thực tế còn nguy hiểm hơn không có tài liệu, vì người đọc tin nhầm.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Cập nhật tài liệu đúng và kịp thời khi có thay đổi nhỏ, có ghi vết ai-đổi-gì-khi-nào, và báo cho đúng người bị ảnh hưởng.

**Tình huống thực tế — một con số đổi, ba việc phải làm.** Khách hàng nhắn qua chat: "đổi ngưỡng 5 lần đăng nhập sai thành 3 lần nhé". Nhiều BA mới sẽ chỉ trả lời "dạ vâng" — còn bạn làm đủ ba việc trong ngày:

```
1. SỬA TÀI LIỆU   PTYC GP-007: N mặc định 5 → 3.
2. GHI VẾT        Bảng lịch sử thay đổi cuối tài liệu:
   | v1.2 | 03/07 | Đổi N mặc định 5→3 | A.Tuấn (email 03/07) |
   (kèm link email — lời nhắn chat được bạn xin xác nhận lại
    qua email vì thay đổi liên quan chính sách bảo mật)
3. BÁO ĐÚNG NGƯỜI Nhắn kênh chung + tag Dev đang code GP-007 và Tester
   đang viết case: "N đổi 5→3, tài liệu đã cập nhật v1.2".
```

Chi tiết "xin xác nhận email" cứu bạn 2 tháng sau: khách hàng khác trong chính đội đó thắc mắc "ai cho đổi thành 3?" — bạn mở đúng dòng change log kèm link email, câu chuyện kết thúc trong 1 phút thay vì thành cuộc điều tra.

**Vì sao là mức ①:** giữ được kỷ luật cập nhật-ghi vết-thông báo cho thay đổi nhỏ; chưa cần đánh giá tác động cho thay đổi lớn.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** với **yêu cầu thay đổi lớn**, biết đánh giá tác động (impact analysis) trước khi để nó chảy vào dự án — trả lời được "đổi cái này thì đụng những gì, tốn bao nhiêu, có đáng không".

**Tình huống thực tế — khách đòi gộp 2 màn hình khi Dev đã code xong 80%.** Giữa sprint, khách hàng đề xuất: gộp màn "Danh sách cảnh báo" và "Danh sách sự cố" thành 1 màn duy nhất. Bạn không chuyển thẳng cho Dev ("khách bảo đổi thì đổi"), cũng không từ chối thay khách — mà làm bản đánh giá tác động một trang:

```
ĐÁNH GIÁ TÁC ĐỘNG — Yêu cầu thay đổi CR-011 (gộp 2 màn hình)

PHẠM VI ẢNH HƯỞNG
  - FE: đập 2 màn đã xong 80%, làm lại màn mới có tab/bộ lọc hợp nhất
  - BE: thêm API trộn 2 nguồn dữ liệu + phân trang chung
  - Tài liệu: 2 PTYC + 6 test case phải viết lại
CHI PHÍ ƯỚC TÍNH   +8 ngày công, sprint hiện tại trễ ~1 tuần
LÝ DO KHÁCH MUỐN   Trực ca phải mở 2 tab, hay bỏ sót sự cố mới
                   (nhu cầu gốc: NHÌN 1 CHỖ, không nhất thiết GỘP MÀN)
PHƯƠNG ÁN
  A. Gộp màn như đề xuất          — 8 ngày, trễ sprint
  B. Thêm badge đếm sự cố mới +   — 1.5 ngày, đúng nhu cầu gốc
     phím tắt chuyển nhanh 2 màn
  C. Dời gộp màn sang phiên bản 2 — 0 ngày sprint này
ĐỀ XUẤT: B trước, đo lại sau 1 tháng; nếu vẫn bất tiện → A ở bản 2.
```

Khách hàng chọn B — vì bạn đào ra **nhu cầu gốc** ("nhìn 1 chỗ") thay vì thực hiện nguyên văn giải pháp khách tự nghĩ ("gộp màn"). Tiết kiệm 6.5 ngày công và sprint không trễ.

**Vì sao là mức ②:** biến yêu cầu thay đổi thành quyết định có cân nhắc chi phí/lợi ích với nhiều phương án — làm người gác cổng tác động, không phải thư ký ghi chép.
