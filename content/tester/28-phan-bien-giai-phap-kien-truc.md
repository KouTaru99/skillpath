# Phản biện giải pháp nghiệp vụ & kiến trúc hệ thống

**Định nghĩa.** Kỹ năng mới ở Specialist, thuộc nhóm **Kiến trúc & thiết kế giải pháp** — Tester ở mức này không chỉ phản biện đặc tả (như Experienced) mà đủ tầm **phản biện cả giải pháp nghiệp vụ và kiến trúc hệ thống**, ngang hàng góc nhìn kiến trúc sư/BA. Lợi thế riêng của Tester khi phản biện kiến trúc: bạn là người **nghĩ theo cách hệ thống sẽ hỏng** — trong khi kiến trúc sư thiết kế cho lúc chạy đúng, bạn soi lúc chạy sai.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Phản biện một phần giải pháp cụ thể khi tham gia review — chỉ ra lỗ hổng có hệ quả rõ, không chỉ "nên làm khác".

**Tình huống thực tế — phản biện giải pháp phân quyền chỉ chặn ở một tầng.** Trong buổi review giải pháp "Phân quyền xem cảnh báo theo phòng ban", bạn chỉ ra lỗ hổng bằng tư duy "kẻ tấn công đi đường vòng":

```
GIẢI PHÁP ĐỀ XUẤT: kiểm tra quyền ở tầng API (khi gọi /alerts).

PHẢN BIỆN CỦA BẠN:
  Quyền chỉ chặn ở API danh sách — nhưng dữ liệu cảnh báo còn ra
  bằng NGÕ KHÁC: chức năng EXPORT báo cáo gọi API khác (/reports)
  KHÔNG áp cùng bộ lọc quyền.
  → Hệ quả: user thường không XEM được cảnh báo mức Cao trên màn,
    nhưng bấm Export là lấy được TOÀN BỘ ra Excel. Phân quyền UI
    thành vô nghĩa — dữ liệu lộ qua cửa sau.

  ĐỀ XUẤT: quyền phải áp ở TẦNG DỮ LIỆU (mọi ngõ ra đọc chung 1
  bộ lọc quyền), không áp rời từng API.
```

**Vì sao là mức ①:** phản biện một điểm giải pháp có dẫn chứng hệ quả và đề xuất thay thế; chưa ở tầm phản biện cả kiến trúc.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** phản biện được **kiến trúc tổng thể** — nhìn rủi ro ở tầng thiết kế hệ thống, không chỉ một giải pháp tính năng.

**Tình huống thực tế — phản biện kiến trúc lưu trữ log tập trung không phân tầng.** Bạn soi kiến trúc chung của hệ thống bằng góc "nếu chỗ này bị xâm nhập thì sao":

```
KIẾN TRÚC HIỆN TẠI: toàn bộ log (nhạy cảm + không nhạy cảm) lưu
  chung 1 CSDL trung tâm, cùng một mức bảo vệ.

PHẢN BIỆN TẦM KIẾN TRÚC:
  - Rủi ro "một điểm vỡ, mất tất cả": nếu CSDL bị xâm nhập, toàn
    bộ log LỘ CÙNG LÚC — kể cả log an ninh nhạy cảm nhất.
  - Trái nguyên tắc "giảm thiểu bán kính thiệt hại" (blast radius):
    dữ liệu nhạy cảm nên được cô lập, để một lỗ hổng không kéo đổ
    tất cả.
  - Còn vi phạm quy định: log nhạy cảm đòi kiểm soát truy cập +
    ghi vết RIÊNG, gộp chung rất khó chứng minh khi audit.

  ĐỀ XUẤT: phân tầng lưu trữ theo mức nhạy cảm — log nhạy cảm ở
  kho riêng, quyền chặt hơn, ghi vết riêng. Chi phí thiết kế tăng
  nhưng đổi lấy giảm rủi ro thảm hoạ.
```

Đây là phản biện ở tầng kiến trúc thật: không chỉ ra một bug, mà chỉ ra một **quyết định thiết kế nền** tạo rủi ro hệ thống.

**Vì sao là mức ②:** phản biện được kiến trúc tổng thể bằng nguyên lý thiết kế (blast radius, cô lập dữ liệu nhạy cảm); chưa có quyền quyết định trong các buổi phản biện lớn.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** có **tiếng nói quyết định** trong các buổi phản biện kiến trúc lớn của đơn vị — phản biện của bạn có thể khiến cả kiến trúc phải làm lại trước khi được duyệt.

**Tình huống thực tế — quyền phủ quyết trong hội đồng kiến trúc sản phẩm mới.** Đơn vị làm sản phẩm giám sát thế hệ mới, bạn là một trong những người có tiếng nói quyết định về mặt chất lượng/an ninh:

```
BỐI CẢNH: hội đồng duyệt kiến trúc sản phẩm mới. Bạn ngồi ngang
  hàng kiến trúc sư, có quyền chặn nếu thấy rủi ro nghiêm trọng.

BẠN PHÁT HIỆN + PHẢN BIỆN QUYẾT ĐỊNH:
  Kiến trúc mới dùng 1 hàng đợi (message queue) chung cho cả cảnh
  báo khẩn cấp lẫn log thường. Bạn phản biện có sức nặng:
  "Lúc bị tấn công diện rộng, log thường bùng nổ sẽ làm NGHẼN hàng
   đợi → cảnh báo KHẨN CẤP bị kẹt phía sau hàng nghìn log thường
   → hệ thống an ninh tê liệt ĐÚNG LÚC bị tấn công. Đây là lỗi
   thiết kế nền, không phải bug sửa sau được. Đề nghị TÁCH luồng
   cảnh báo khẩn ra hàng đợi ưu tiên riêng TRƯỚC KHI duyệt."

KẾT QUẢ: kiến trúc được sửa (tách luồng ưu tiên) trước khi triển
  khai — một lỗ hổng thảm hoạ bị chặn ở khâu thiết kế, chi phí
  gần như bằng 0 so với phát hiện sau khi đã xây.
```

Ở mức này bạn không "góp ý được ghi nhận" — phản biện của bạn là **cổng chặn**: đủ uy tín và đúng đắn để dừng cả một kiến trúc sai trước khi nó thành hiện thực.

**Vì sao là mức ④:** phản biện kiến trúc với quyền quyết định thật ở tầm đơn vị, chặn được lỗi thiết kế nền — đỉnh của kỹ năng: tiếng nói chất lượng ngang hàng và có sức nặng như kiến trúc sư. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
