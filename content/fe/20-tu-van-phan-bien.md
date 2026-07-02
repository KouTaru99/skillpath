# Tư vấn & phản biện giải pháp phát triển phần mềm

**Định nghĩa.** Đưa ý kiến chuyên môn khi dự án đang cân nhắc một quyết định kỹ thuật hoặc quy trình — có lý lẽ và dẫn chứng, không chỉ "em thấy nên...". Khác [Đọc hiểu & soi lỗi tài liệu giải pháp](/fe/ky-nang/02-doc-hieu-tai-lieu-giai-phap) (phản biện một tài liệu đã viết ra): ở đây bạn tư vấn cho một **quyết định** — có thể còn đang bàn, chưa thành tài liệu.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Được hỏi ý kiến về một quyết định kỹ thuật trong phạm vi mình rành, đưa ra ý kiến có phân tích đánh đổi rõ ràng thay vì cảm tính.

**Tình huống thực tế — được hỏi "nên chọn NgRx hay chỉ dùng service + BehaviorSubject?" cho dự án mới.**

Bạn không trả lời cảm tính "NgRx xịn hơn" — mà phân tích theo bối cảnh cụ thể của dự án:
```
Dự án: 4 người, thời hạn 2 tháng, state không quá phức tạp (giỏ hàng + user).

→ NgRx: chuẩn hoá tốt, dễ mở rộng về sau, NHƯNG boilerplate nhiều
  (action/reducer/effect/selector cho từng thứ nhỏ) — chậm tiến độ ban đầu.

→ Service + BehaviorSubject: nhanh viết, đủ dùng cho state không quá phức tạp,
  NHƯNG nếu dự án phình to sau này, khó mở rộng bằng NgRx.

Đề xuất: dùng Service + BehaviorSubject cho giai đoạn này (khớp deadline + độ phức
tạp hiện tại) — và ghi chú trong tài liệu: "khi state phức tạp hơn (nhiều luồng phụ
thuộc chéo), cân nhắc chuyển sang NgRx".
```

**Vì sao là mức ①:** bạn tư vấn có lý lẽ dựa trên bối cảnh dự án (thời gian, quy mô, độ phức tạp) thay vì chọn công nghệ vì nó "hot" — nhưng còn giới hạn trong phạm vi kỹ thuật mình rành, chưa tư vấn được các quyết định liên quan tới kiến trúc toàn hệ thống.

## ▸ Senior·V3 — ② Biết làm
**Khác V1:** chủ động **phản biện** một quyết định kiến trúc đã được đề xuất (không chỉ được hỏi mới góp ý), kể cả khi ý kiến ngược với số đông.

**Tình huống thực tế — team định tách một tính năng nhỏ thành microservice riêng, bạn phản biện.** Cuộc họp đang thống nhất tách "tính năng đánh giá sản phẩm" (review) thành một service riêng vì "microservice là chuẩn hiện đại". Bạn chủ động nêu phản biện:
```
- Tính năng review hiện chỉ ~500 dòng code, 1 người maintain, không có nhu cầu scale riêng.
- Tách ra sẽ phải thêm: CI/CD riêng, DB riêng, network call thêm giữa 2 service,
  cơ chế đồng bộ dữ liệu — chi phí vận hành TĂNG mà chưa có lợi ích rõ ràng.
- Đề xuất: giữ trong monolith, tách module rõ ràng bên trong (package riêng) —
  tách thật thành service khi có nhu cầu scale độc lập hoặc team riêng phụ trách.
```
Bạn không phản đối vì "ngại thay đổi", mà đưa lý lẽ cụ thể về chi phí/lợi ích — và team đổi quyết định nhờ phản biện có căn cứ.

**Vì sao là mức ②:** bạn chủ động phản biện quyết định kiến trúc bằng lý lẽ cụ thể, kể cả khi phải nói ngược số đông — không chỉ góp ý khi được hỏi.
