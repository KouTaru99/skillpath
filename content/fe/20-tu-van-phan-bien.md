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

## ▸ Specialist·V1 — ③ Thành thạo
**Khác Senior·V3:** phối hợp và phản biện trực tiếp với **SA (Solution Architect)** hoặc bên thứ ba (đối tác, vendor) về giải pháp kiến trúc — không chỉ phản biện nội bộ trong team.

**Tình huống thực tế — phản biện đề xuất kiến trúc từ một vendor bên ngoài.** Một vendor đề xuất tích hợp SDK của họ bằng cách nhúng trực tiếp iframe của họ vào mọi trang sản phẩm, kèm quyền truy cập rộng vào dữ liệu người dùng "để tiện tối ưu trải nghiệm". Bạn phản biện với SA và vendor:
```
- iframe của bên thứ ba trên MỌI trang = mở rộng đáng kể bề mặt tấn công (attack surface),
  nếu vendor bị xâm nhập, ảnh hưởng lan sang toàn bộ sản phẩm.
- Quyền truy cập dữ liệu "rộng" không rõ phạm vi — vi phạm nguyên tắc least privilege.
- Đề xuất thay thế: chỉ nhúng ở trang cần thiết, giới hạn quyền truy cập dữ liệu
  theo từng trường cụ thể (không "toàn bộ"), và có hợp đồng xử lý dữ liệu rõ ràng.
```
Bạn đứng ở vị trí bảo vệ lợi ích kỹ thuật/an toàn của đơn vị khi làm việc với bên ngoài, không chỉ đồng ý theo đề xuất có sẵn vì "vendor là chuyên gia".

**Vì sao là mức ③:** bạn phản biện được ở tầm hợp tác với SA/bên thứ ba, đại diện tiếng nói kỹ thuật của đơn vị — không chỉ phản biện trong phạm vi nội bộ team.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V1:** phản biện được cả **chiến lược công nghệ dài hạn** của đơn vị (không chỉ một giải pháp/dự án cụ thể), dựa trên xu hướng ngành và rủi ro dài hạn.

**Ví dụ thực tế — phản biện đề xuất "chuyển toàn bộ hệ thống sang kiến trúc serverless" từ lãnh đạo.** Lãnh đạo đơn vị, sau khi nghe hội thảo, đề xuất chuyển toàn bộ hệ thống sang serverless "để tiết kiệm chi phí và hiện đại hoá". Bạn phản biện dựa trên phân tích thực tế:
```
- Serverless tiết kiệm chi phí THẬT khi tải không đều (nhiều lúc gần như 0 request) —
  nhưng hệ thống hiện tại có tải ổn định 24/7, nên chi phí serverless có thể CAO HƠN
  hạ tầng hiện tại, không phải thấp hơn.
- Chi phí chuyển đổi: toàn bộ team cần học lại mô hình mới, thời gian ước tính 6-9 tháng,
  trong lúc đó vẫn phải maintain hệ thống cũ song song.
- Đề xuất: chỉ áp dụng serverless cho các tác vụ tải không đều thật sự (xử lý ảnh, export
  báo cáo định kỳ) — KHÔNG chuyển toàn bộ hệ thống lõi đang chạy ổn định.
```
Bạn phản biện dựa trên dữ kiện cụ thể của chính hệ thống, không phải xu hướng chung của ngành — dù đề xuất đến từ lãnh đạo.

**Vì sao là mức ④:** bạn phản biện được ở tầm **chiến lược công nghệ dài hạn**, đủ tự tin và có dữ kiện để nói ngược một đề xuất từ cấp lãnh đạo khi cần — mức cao nhất của kỹ năng tư vấn/phản biện.
