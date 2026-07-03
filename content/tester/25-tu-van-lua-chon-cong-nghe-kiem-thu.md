# Tư vấn lựa chọn công nghệ/công cụ kiểm thử

**Định nghĩa.** Specialist Tester được các dự án tìm tới để **tư vấn chọn công nghệ/công cụ kiểm thử** phù hợp — vai trò như "kiến trúc sư mảng kiểm thử", đảm bảo lựa chọn nhất quán và hợp cảnh, thay vì mỗi dự án tự chọn ngẫu nhiên rồi phân tán kiến thức. Nguyên tắc tư vấn cốt lõi: **công cụ tốt nhất không phải công cụ mạnh nhất, mà công cụ hợp với hạ tầng + kỹ năng sẵn có + khả năng hỗ trợ chéo** của đơn vị.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tư vấn cho một dự án cụ thể khi được hỏi — chọn theo bối cảnh thật, không theo "công cụ đang hot".

**Tình huống thực tế — dự án mới hỏi chọn công cụ tự động hoá test API.** Bạn không đáp "dùng cái xịn nhất" mà tư vấn theo bối cảnh:

```
CÂU HỎI: dự án mới nên dùng gì để tự động hoá test API?

BẠN HỎI LẠI TRƯỚC KHI TƯ VẤN:
  - Đơn vị đã có hạ tầng CI/CD gì? → đã có Jenkins chạy Newman
  - Team quen công cụ nào? → đa số biết Postman
  - Có nhu cầu đặc biệt (tải lớn, mã hoá lạ)? → không

TƯ VẤN: dùng Postman + Newman (chạy collection trong CI).
  LÝ DO: không phải vì nó mạnh nhất — mà vì (1) hạ tầng CI đã hỗ
  trợ sẵn, (2) team đã quen (không tốn thời gian học), (3) khi
  cần người dự án khác hỗ trợ, họ vào được ngay.
  → Chọn công cụ "lạ mà mạnh" ở đây = tự tạo ốc đảo không ai đỡ được.
```

**Vì sao là mức ①:** tư vấn đúng cho một dự án dựa trên bối cảnh thật khi được hỏi; chưa cân nhắc tính nhất quán xuyên nhiều dự án.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tư vấn cho **nhiều dự án cùng lúc**, cân nhắc tính nhất quán toàn cục — đôi khi khuyên một dự án *không* dùng công cụ tối ưu riêng để cả đơn vị đồng bộ.

**Tình huống thực tế — 3 dự án định chọn 3 công cụ test hiệu năng khác nhau.** Mỗi dự án có lý lẽ riêng, nhưng bạn nhìn bức tranh đơn vị:

```
HIỆN TRẠNG: 3 dự án định chọn 3 công cụ test hiệu năng khác nhau
  DA: k6 (dev thích viết bằng JS)
  DB: Gatling (một bạn từng dùng)
  DC: JMeter (quen thuộc)

TƯ VẤN THỐNG NHẤT: cả 3 dùng JMeter.
  ĐÁNH ĐỔI THÀNH THẬT:
  - k6/Gatling có điểm mạnh riêng — chọn JMeter KHÔNG phải vì nó
    tốt nhất từng mặt.
  - NHƯNG: thống nhất 1 công cụ → Tester hỗ trợ chéo được giữa 3
    dự án, kịch bản tải tái dùng được, kiến thức không phân mảnh
    3 hòn đảo, tuyển/đào tạo cũng dễ.
  → Với đơn vị, giá trị của NHẤT QUÁN > lợi ích lẻ của công cụ
    tối ưu riêng từng dự án.
  (Ngoại lệ: nếu 1 dự án có nhu cầu ĐẶC THÙ mà JMeter không đáp
   ứng nổi → mới tách; hiện không dự án nào rơi vào ca đó.)
```

Điểm trưởng thành: dám khuyên một dự án hy sinh tối ưu cục bộ vì lợi ích toàn cục — và nói rõ đánh đổi, kèm ngoại lệ, để lời tư vấn có sức nặng.

**Vì sao là mức ②:** tư vấn cân bằng lợi ích nhiều dự án + tính nhất quán đơn vị; chưa ở tầm ban hành chuẩn quyết định.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** trở thành người **quyết định chuẩn công nghệ kiểm thử cho toàn đơn vị** — chủ động ban hành danh mục công cụ chuẩn, có tiếng nói quyết khi có đề xuất công cụ mới, không chỉ tư vấn khi được hỏi.

**Tình huống thực tế — rà soát và ban hành danh mục công cụ chuẩn.** Bạn chủ động dọn "khu rừng công cụ" mọc rải rác trong đơn vị:

```
DANH MỤC CÔNG CỤ KIỂM THỬ CHUẨN — Đơn vị An ninh mạng (v1)

  Loại kiểm thử        | Công cụ chuẩn | Ghi chú
  ---------------------|---------------|-------------------------
  Test API tự động     | Postman/Newman| tích hợp CI sẵn
  Test UI tự động      | Playwright    | (chuyển dần từ Selenium
                       |               |  — lý do: nhanh, ổn định hơn)
  Test hiệu năng       | JMeter        | kịch bản tải tái dùng chung
  Quản lý test case    | TestRail      | đồng bộ với Jira
  Quản lý bug          | Jira          | chuẩn báo cáo bug đơn vị

  CƠ CHẾ QUYẾT ĐỊNH CÔNG CỤ MỚI:
  - Ai muốn đưa công cụ ngoài danh mục → trình bày: giải quyết
    vấn đề gì danh mục hiện KHÔNG làm được? chi phí chuyển đổi?
  - Bạn là người có tiếng nói quyết định cuối (kèm lý do), tránh
    "khu rừng công cụ" mọc lại.
  - Danh mục rà lại mỗi năm (công nghệ đổi — vd Selenium→Playwright).
```

Ở mức này bạn không đợi được hỏi — bạn **định hình môi trường công cụ** của cả đơn vị và giữ nó không phân mảnh, đồng thời đủ mở để đón công nghệ mới có lý do chính đáng.

**Vì sao là mức ④:** chủ động ban hành và làm chủ chuẩn công nghệ kiểm thử toàn đơn vị, có cơ chế quyết định công cụ mới — từ "tư vấn bị động" lên "định hình chuẩn chủ động". (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
