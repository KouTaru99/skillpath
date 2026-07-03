# Xây dựng chiến lược kiểm thử cho đơn vị

**Định nghĩa.** Thay vì lập kế hoạch kiểm thử cho một dự án, Specialist Tester xây **chiến lược kiểm thử áp dụng chung** cho nhiều dự án/sản phẩm trong đơn vị, và liên tục tối ưu theo thực tiễn. Phân biệt: *kế hoạch* trả lời "dự án này test thế nào"; *chiến lược* trả lời "cả đơn vị test theo nguyên tắc gì, chuẩn gì, công cụ gì" — sống qua nhiều dự án, không chết theo một sprint.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đề xuất một phần của chiến lược chung, phạm vi hẹp nhưng áp cho nhiều dự án.

**Tình huống thực tế — chuẩn hoá ngưỡng coverage tối thiểu.** Bạn nhận ra mỗi dự án tự đặt một ngưỡng độ phủ test khác nhau (dự án này 40%, dự án kia 80%), gây bất nhất. Bạn đề xuất một mảnh chuẩn chung:

```
ĐỀ XUẤT CHUẨN — Ngưỡng coverage tối thiểu (áp mọi SP giám sát)

  Loại code                        | Coverage tối thiểu
  ---------------------------------|--------------------
  Logic lõi (phát hiện, tương quan | ≥ 80% (chạm an ninh
  cảnh báo, phân quyền)            |        — không thoả hiệp)
  Xử lý dữ liệu, API               | ≥ 70%
  Giao diện, cấu hình              | ≥ 50% (rủi ro thấp hơn)

  LÝ DO PHÂN TẦNG: không cào bằng 1 con số cho mọi loại code —
  phần chạm an ninh phải phủ cao hơn phần hiển thị.
```

**Vì sao là mức ①:** đóng góp một mảnh chuẩn có lý lẽ áp cho nhiều dự án; chưa xây được cả mảng chiến lược hoàn chỉnh.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** xây **một mảng chiến lược hoàn chỉnh** áp dụng thực tế cho nhiều dự án — không chỉ một chuẩn lẻ mà cả quy trình + công cụ + cách thực thi.

**Tình huống thực tế — chiến lược kiểm thử bảo mật chung cho mọi sản phẩm ATTT.** Bạn xây trọn một mảng (bảo mật) và triển khai thật:

```
CHIẾN LƯỢC KIỂM THỬ BẢO MẬT — áp cho 3 SP ATTT đang chạy

  1. CHECKLIST TỐI THIỂU (mọi SP phải qua trước release)
     ☐ Test injection: SQL / XSS / command trên mọi ô input
     ☐ Test phân quyền: mọi vai × mọi ngõ ra dữ liệu (UI/API/export)
     ☐ Test xác thực: 401 vs 403 đúng; session hết hạn xử lý đúng
     ☐ Test rò dữ liệu: lỗi 500 không lộ cấu trúc DB/stack trace
  2. CÔNG CỤ HỖ TRỢ
     Bộ script tự động chạy phần injection (tái dùng across dự án)
     → mỗi dự án không phải viết lại từ đầu.
  3. CÁCH THỰC THI
     Gắn checklist thành "cổng" trong quy trình release; SP không
     qua checklist bảo mật → không được duyệt release.

  KẾT QUẢ: 3 sản phẩm dùng chung 1 chuẩn + 1 bộ script → Tester
  hỗ trợ chéo được, chất lượng bảo mật đồng đều.
```

**Vì sao là mức ②:** xây trọn một mảng chiến lược (quy trình + công cụ + cổng thực thi) áp thực tế nhiều dự án; chưa làm chủ toàn bộ chiến lược đơn vị.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** làm chủ **toàn bộ chiến lược kiểm thử của đơn vị** và có **cơ chế tối ưu liên tục** — chiến lược sống, cập nhật theo sự cố thực tế, không viết một lần rồi để đó.

**Tình huống thực tế — vận hành chiến lược kiểm thử toàn đơn vị như một hệ thống sống.** Bạn sở hữu và tiến hoá toàn bộ chiến lược:

```
CHIẾN LƯỢC KIỂM THỬ ĐƠN VỊ AN NINH MẠNG (bạn làm chủ)

  BAO GỒM   Quy trình test theo vòng đời · chuẩn coverage phân tầng
            · checklist bảo mật · bộ công cụ chuẩn · tiêu chí cổng
            release · chuẩn báo cáo bug.

  CƠ CHẾ TỐI ƯU LIÊN TỤC (điều làm nên mức ④):
  - Mỗi quý: rà mọi sự cố lọt ra production trong quý → hỏi
    "chiến lược HIỆN TẠI có bắt được nó không? Nếu không, thiếu gì?"
  - Ví dụ thật: 1 sự cố rò dữ liệu qua API export lọt lưới → phát
    hiện checklist thiếu mục "phân quyền trên ngõ EXPORT" → bổ sung
    vào chuẩn → mọi dự án từ đó bắt buộc test ngõ này.
  - Chiến lược có phiên bản (v1→v2→...), mỗi thay đổi truy được
    nguồn gốc từ một bài học thật.

  → Chiến lược không phải tài liệu chết mà là hệ thống HỌC từ
    chính các sự cố của đơn vị.
```

Mức ④ khác hẳn ở "cơ chế học": chiến lược tự vá lỗ hổng của chính nó sau mỗi sự cố — mỗi bug lọt lưới trở thành một dòng mới trong chuẩn, để không lặp lại.

**Vì sao là mức ④:** làm chủ trọn chiến lược đơn vị và thiết kế nó thành hệ thống tự tiến hoá theo thực tiễn — đỉnh của vai trò: không phải viết chiến lược giỏi nhất, mà làm nó sống và tự cải thiện. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
