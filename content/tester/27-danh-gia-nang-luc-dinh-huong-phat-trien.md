# Đánh giá năng lực, định hướng phát triển đội ngũ

**Định nghĩa.** Specialist Tester **đánh giá năng lực chuyên môn của các kiểm thử viên khác** — nhận ra điểm mạnh/yếu kiến thức-kỹ năng của từng người, từ đó định hướng phát triển cho cá nhân lẫn cả đơn vị. Đánh giá tốt phải **khách quan và có tiêu chí** (không cảm tính), và luôn kèm **định hướng** (không chỉ chấm điểm mà chỉ đường đi tiếp).

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đánh giá năng lực của một vài cá nhân cụ thể khi được yêu cầu — nhận xét cụ thể, có dẫn chứng, kèm gợi ý phát triển.

**Tình huống thực tế — đánh giá một Senior đang cân nhắc thăng cấp.** Quản lý nhờ bạn cho ý kiến chuyên môn. Bạn không nói chung chung "khá" mà đánh giá theo mảng, có dẫn chứng:

```
ĐÁNH GIÁ NĂNG LỰC — Tester X (xét thăng Senior→Specialist)

  Mảng                | Mức  | Dẫn chứng cụ thể
  --------------------|------|------------------------------
  Test chức năng      | Mạnh | thiết kế case chặt, ít lọt bug
  Test tự động hoá    | Mạnh | tự dựng bộ Postman + Selenium tốt
  Test bảo mật        | Yếu  | phiên test bảo mật vừa rồi bỏ sót
                      |      | ngõ export — chưa có tư duy "mọi
                      |      | ngõ ra dữ liệu"
  Dẫn dắt chuyên môn  | TB   | review tốt nhưng chưa dạy được
                      |      | cách tư duy cho người khác

  GỢI Ý PHÁT TRIỂN: mạnh kỹ thuật nhưng bảo mật là lỗ hổng rõ —
  với đơn vị ATTT, đây là mảng phải bù trước khi lên Specialist.
  Đề xuất: giao dẫn 1 mảng test bảo mật + kèm 3 tháng.
```

**Vì sao là mức ①:** đánh giá cá nhân có tiêu chí và dẫn chứng, kèm định hướng; chưa hệ thống hoá cho nhiều người.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** đánh giá **có hệ thống cho nhiều người** bằng bộ tiêu chí chuẩn, kèm lộ trình phát triển riêng từng người.

**Tình huống thực tế — xây khung năng lực và đánh giá cả nhóm 8 người.** Bạn chuẩn hoá việc đánh giá để công bằng và so sánh được:

```
KHUNG NĂNG LỰC TESTER (bạn xây) — 8 người × 5 mảng

  Mảng: Chức năng · Hiệu năng · Bảo mật · Tự động hoá · Dẫn dắt
  Thang: 1 Nhập môn → 4 Chuyên gia

  MA TRẬN NĂNG LỰC NHÓM (ví dụ trích):
           Chức | HN | BM | TĐH | Dẫn
  Hà        4   | 2  | 2  | 3   | 2   → mạnh chức năng, yếu HN+BM
  Minh      3   | 4  | 2  | 2   | 1   → chuyên gia hiệu năng
  Lan       3   | 1  | 4  | 2   | 3   → chuyên gia bảo mật
  ...
  → NHÌN CẢ NHÓM: bảo mật chỉ 1 người mạnh (Lan) = RỦI RO tập
    trung; hiệu năng cũng chỉ 1 (Minh).

  LỘ TRÌNH RIÊNG:
  - Hà: học bảo mật (Lan kèm) — vừa phát triển Hà vừa giảm rủi ro
    "chỉ 1 người biết bảo mật"
  - Minh: học dẫn dắt (điểm yếu nhất) để tiến Senior
```

Khác V1: đánh giá thành **công cụ quản lý năng lực** (ma trận lộ ra rủi ro tập trung, ghép cặp kèm nhau), không chỉ chấm từng người rời rạc.

**Vì sao là mức ②:** đánh giá hệ thống + lộ trình cá nhân hoá cho cả nhóm, đọc được rủi ro năng lực tập thể; chưa ở tầm định hướng chiến lược đơn vị.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** định hướng năng lực ở tầm **cả đơn vị theo chiến lược tương lai** — quyết định đơn vị cần đầu tư/tuyển năng lực gì trước khi nó thành điểm nghẽn.

**Tình huống thực tế — nhìn trước lỗ hổng năng lực khi sản phẩm sắp mở rộng gấp 5.** Bạn nối đánh giá năng lực với kế hoạch kinh doanh của đơn vị:

```
PHÂN TÍCH NĂNG LỰC CHIẾN LƯỢC — Đơn vị ANM, tầm nhìn 18 tháng

  BỐI CẢNH: các sản phẩm giám sát dự kiến mở rộng quy mô ×5
            (thêm khách hàng, thêm tải).

  ĐỐI CHIẾU VỚI MA TRẬN NĂNG LỰC HIỆN TẠI:
  → Test hiệu năng ở QUY MÔ LỚN: chỉ 1 người (Minh) mạnh, mà đây
    chính là mảng ×5 tải sẽ cần nhất → ĐIỂM NGHẼN sắp tới.
  → Test bảo mật: đủ hiện tại nhưng mở rộng = bề mặt tấn công tăng
    → cần thêm 1 chuyên gia.

  ĐỀ XUẤT CHIẾN LƯỢC (trước khi thành nghẽn):
  1. Đào tạo: 2 người học chuyên sâu hiệu năng (Minh kèm + khoá
     ngoài) — bắt đầu NGAY, vì lên tay cần 6-9 tháng.
  2. Tuyển: 1 chuyên gia bảo mật có kinh nghiệm quy mô lớn.
  3. Công cụ: đầu tư hạ tầng test tải mô phỏng ×5 (hiện chưa có).

  → Chuẩn bị năng lực TRƯỚC nhu cầu 6-9 tháng, không đợi tới lúc
    ×5 tải mới cuống.
```

Mức ④ là khi đánh giá năng lực không còn nhìn hiện tại mà **nhìn về nhu cầu tương lai của tổ chức** — biến việc "chấm điểm người" thành việc "hoạch định năng lực chiến lược".

**Vì sao là mức ④:** định hướng năng lực cả đơn vị gắn với chiến lược tương lai, nhìn trước điểm nghẽn để chuẩn bị sớm — đỉnh của kỹ năng: từ đánh giá cá nhân lên hoạch định năng lực tổ chức. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
