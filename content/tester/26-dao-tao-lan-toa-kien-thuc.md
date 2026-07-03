# Đào tạo, lan toả kiến thức chuyên sâu

**Định nghĩa.** Khác hướng dẫn 1-1 ở Senior, Specialist Tester **đào tạo và lan toả kiến thức/công nghệ mới cho toàn công ty** — không chỉ trong một dự án/team. Ở tầm này, giá trị không nằm ở việc bạn giỏi, mà ở việc bạn **nhân cái giỏi đó ra** thành năng lực của nhiều người, nhiều đơn vị.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tổ chức buổi chia sẻ kiến thức cho phạm vi rộng hơn một team — dùng case thật của đơn vị làm chất liệu.

**Tình huống thực tế — chia sẻ "kiểm thử bảo mật cơ bản" cho toàn bộ Tester của đơn vị.** Bạn mở buổi cho cả đơn vị An ninh mạng (không chỉ team mình), lấy case thật làm ví dụ:

```
BUỔI CHIA SẺ — "Kiểm thử bảo mật cơ bản" (toàn Tester đơn vị)

  Chất liệu: 3 lỗ hổng THẬT từng lọt lưới trong các dự án (ẩn tên):
    - Rò dữ liệu qua ngõ export (phân quyền chỉ chặn ở UI)
    - 500 lộ stack trace + cấu trúc bảng
    - Cho phép đa phiên đăng nhập không cảnh báo

  Cách trình bày: mỗi lỗ hổng → "nếu là em, em test kiểu gì để bắt
  được nó?" (cho mọi người thử) → rồi lật cách nó đã lọt lưới.

  → Người nghe từ nhiều team mang về áp dụng ngay cho dự án họ.
```

**Vì sao là mức ①:** lan toả được ở phạm vi đơn vị bằng chất liệu thật; chưa xây thành chương trình đào tạo có hệ thống.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** đào tạo **bài bản** — có tài liệu, lộ trình, thực hành, kiểm tra — không chỉ một buổi chia sẻ đơn lẻ.

**Tình huống thực tế — khoá đào tạo 3 buổi cho Tester mới của đơn vị.** Bạn đóng gói kiến thức thành khoá học nhân bản được:

```
KHOÁ "Kiểm thử hệ thống giám sát ANM" — 3 buổi (Tester mới đơn vị)

  Buổi 1  Nền: nghiệp vụ ANM + đọc/phản biện yêu cầu
          → Bài tập: mổ 1 spec thật, tìm case thiếu
  Buổi 2  Kỹ thuật: thiết kế test case + SQL kiểm chứng + đọc HTTP
          → Thực hành trên DỮ LIỆU GIẢ LẬP (bản sao ẩn danh của
            sản phẩm thật) — làm thật, không chỉ nghe
  Buổi 3  Bảo mật cơ bản: injection, phân quyền, rò dữ liệu
          → Bài tập: tự tấn công 1 form, viết bug report chuẩn

  ĐÁNH GIÁ CUỐI KHOÁ: 1 bài test thật (cho spec + sản phẩm mẫu,
  yêu cầu thiết kế bộ case + tìm ≥3 bug đã cài sẵn) → đo được
  người học đã đạt chuẩn chưa, không chỉ "đã nghe".

  → Tài liệu + bài tập đóng gói lại → khoá CHẠY LẠI được cho mọi
    đợt tuyển sau, không phụ thuộc mình đứng lớp.
```

Khác V1 ở chỗ: có **kiểm tra đầu ra đo được** và tài liệu nhân bản — đào tạo thành sản phẩm tái dùng, không phải sự kiện một lần.

**Vì sao là mức ②:** xây được chương trình đào tạo bài bản có đánh giá, nhân bản được; chưa ở tầm nguồn tri thức tham chiếu toàn công ty.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** lan toả ở quy mô **toàn công ty**, trở thành **nguồn tham chiếu chuyên môn** mà các đơn vị khác tìm tới khi cần.

**Tình huống thực tế — đại diện đơn vị lan toả chuẩn kiểm thử ATTT ra toàn công ty.** Uy tín của bạn vượt khỏi đơn vị:

```
VAI TRÒ Ở TẦM CÔNG TY:
  - Trình bày tại hội thảo kỹ thuật nội bộ TOÀN công ty về "Kiểm
    thử sản phẩm có yếu tố an ninh" — người nghe từ mọi đơn vị,
    kể cả các đơn vị không chuyên ATTT nhưng sản phẩm có phần bảo mật.
  - Viết tài liệu CHUẨN "Kiểm thử bảo mật cho sản phẩm phần mềm"
    → các đơn vị khác tham chiếu khi làm sản phẩm chạm bảo mật,
    dù họ không có chuyên gia ATTT.
  - Trở thành đầu mối: đơn vị khác gặp bài toán kiểm thử an ninh
    khó → tìm tới bạn tư vấn.

  → Kiến thức của đơn vị An ninh mạng (vốn đặc thù) được lan ra
    nâng mặt bằng bảo mật của cả công ty — một người thành nhân
    của nhiều đơn vị.
```

Mức ④ là khi ảnh hưởng vượt ranh giới đơn vị: bạn không còn đào tạo người trong nhà, mà trở thành **hạ tầng tri thức** cho cả công ty ở mảng chuyên môn của mình.

**Vì sao là mức ④:** lan toả kiến thức tới quy mô toàn công ty và trở thành nguồn tham chiếu chuyên môn được tìm tới — đỉnh của "lan toả": kiến thức cá nhân thành tài sản chung của tổ chức. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
