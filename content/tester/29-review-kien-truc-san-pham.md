# Review kiến trúc sản phẩm, phát hiện rủi ro hệ thống

**Định nghĩa.** Kỹ năng mới ở Specialist, thuộc nhóm **Kiến trúc & thiết kế giải pháp** — Tester **chủ động review kiến trúc sản phẩm** (không đợi ai yêu cầu) để phát hiện điểm yếu/rủi ro trước khi nó gây sự cố thật. Khác "phản biện kiến trúc" (phản ứng lại một đề xuất trong buổi review), kỹ năng này là **chủ động đi soi** kiến trúc đang chạy để tìm bom nổ chậm — tư duy "cái gì sẽ hỏng, khi nào, hậu quả ra sao".

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review một phần kiến trúc cụ thể, tìm ra điểm yếu rõ ràng có thể gây sự cố.

**Tình huống thực tế — soi module lưu trữ log dài hạn, phát hiện bom hẹn giờ.** Không ai giao, nhưng bạn chủ động review thiết kế module "Lưu trữ log dài hạn":

```
REVIEW MODULE "Lưu trữ log dài hạn" (bạn tự soi)

  PHÁT HIỆN: thiết kế KHÔNG có cơ chế xoay vòng log (log rotation)
  — log cứ ghi thêm mãi, không xoá/nén log cũ.

  DỰ BÁO HẬU QUẢ (bom hẹn giờ):
  - Sản phẩm chạy ~8 tháng với tải hiện tại → ổ đĩa đầy
  - Ổ đĩa đầy → hệ thống KHÔNG ghi được log mới → có thể SẬP
    cả module giám sát → mù hoàn toàn ĐÚNG LÚC cần nhất
  - Đây không phải "bug hiện tại" (giờ chạy vẫn ổn) mà là rủi ro
    CHẮC CHẮN xảy ra theo thời gian → dễ bị bỏ qua vì "giờ vẫn chạy tốt".

  ĐỀ XUẤT: thêm cơ chế xoay vòng (nén log >30 ngày, xoá/chuyển kho
  log >12 tháng theo quy định lưu vết) + cảnh báo khi đĩa >80%.
```

Giá trị đặc trưng: bạn bắt được rủi ro **chưa phát bệnh** — thứ mà test chức năng thông thường (chạy giờ vẫn pass) không bao giờ lộ ra.

**Vì sao là mức ①:** review một phần kiến trúc, tìm ra điểm yếu rõ có dự báo hậu quả; chưa review cả kiến trúc với các rủi ro liên quan nhau.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** review **toàn bộ kiến trúc một sản phẩm**, tìm ra các rủi ro **liên quan dây chuyền** — nơi một điểm yếu kéo theo hậu quả ở chỗ khác.

**Tình huống thực tế — soi toàn kiến trúc, lần ra chuỗi rủi ro "mất log âm thầm".** Review cả hệ thống giám sát, bạn không dừng ở từng module mà lần theo dây chuyền:

```
CHUỖI RỦI RO PHÁT HIỆN KHI REVIEW TOÀN KIẾN TRÚC:

  Module thu thập log KHÔNG có cơ chế retry khi mất kết nối tạm
           │
           ▼
  Mạng chập chờn vài giây → log trong khoảng đó MẤT (không thử lại)
           │
           ▼
  Cảnh báo lẽ ra sinh từ log đó → KHÔNG BAO GIỜ sinh
           │
           ▼
  NGUY HIỂM NHẤT: chính log ghi nhận "đã mất kết nối" cũng mất
  theo → KHÔNG AI BIẾT là đã bỏ sót → "mù mà không biết mình mù"

  ĐÁNH GIÁ: đây là rủi ro tệ nhất trong các loại — không phải
  "hệ thống báo lỗi" mà "hệ thống im lặng khi đã hỏng". Với sản
  phẩm an ninh, bỏ sót âm thầm = có thể bỏ lọt cả một cuộc tấn công.

  ĐỀ XUẤT: (1) thêm retry + buffer ở module thu thập; (2) cơ chế
  "heartbeat" phát hiện mất log (đếm log kỳ vọng vs thực nhận).
```

Khác V1: nhìn được **liên kết giữa các điểm yếu** — một thiếu sót nhỏ (không retry) khuếch đại thành rủi ro thảm hoạ (mù âm thầm) qua chuỗi phụ thuộc.

**Vì sao là mức ②:** review toàn kiến trúc một sản phẩm, lần ra chuỗi rủi ro dây chuyền; chưa thiết lập quy trình review cho nhiều sản phẩm.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** review kiến trúc ở tầm **nhiều sản phẩm/toàn đơn vị**, và **thiết lập quy trình review định kỳ** thay vì làm một lần — biến việc soi rủi ro thành cơ chế phòng ngừa có hệ thống.

**Tình huống thực tế — dựng quy trình review kiến trúc định kỳ, bắt rủi ro lặp lại trước khi nổ.** Bạn thể chế hoá việc review để không phụ thuộc "lúc nào rảnh thì soi":

```
QUY TRÌNH REVIEW KIẾN TRÚC ĐỊNH KỲ (bạn thiết lập — toàn đơn vị)

  NHỊP: mỗi 6 tháng, mọi sản phẩm giám sát ANM đều được review
        kiến trúc — KHÔNG đợi có sự cố mới soi.

  DÙNG CHUNG "SỔ RỦI RO ĐIỂN HÌNH" (tích luỹ từ các lần review):
    - thiếu log rotation → đầy đĩa
    - thiếu retry → mất log âm thầm
    - hàng đợi chung → cảnh báo khẩn bị nghẽn
    - quyền áp rời từng API → rò qua ngõ export
    → mỗi sản phẩm review đều RÀ LẠI cả sổ này.

  GIÁ TRỊ THẬT (ví dụ vừa xảy ra):
  Review định kỳ sản phẩm B → phát hiện nó ĐANG lặp lại đúng lỗi
  "thiếu retry → mất log" mà sản phẩm A từng dính → sửa TRƯỚC khi
  B gặp sự cố thật. Bài học của A cứu được B.

  → Rủi ro không còn được phát hiện NGẪU NHIÊN (lúc ai đó tình cờ
    soi) mà CÓ HỆ THỐNG, và bài học một sản phẩm bảo vệ tất cả.
```

Mức ④ là khi việc review vượt khỏi cá nhân bạn: nó thành **quy trình + sổ tri thức chung** khiến mỗi bài học của một sản phẩm tự động bảo vệ mọi sản phẩm còn lại.

**Vì sao là mức ④:** thiết lập cơ chế review kiến trúc định kỳ toàn đơn vị với sổ rủi ro tích luỹ — chuyển từ "tự đi soi giỏi" sang "hệ thống phòng ngừa rủi ro tự học", đỉnh của kỹ năng review. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
