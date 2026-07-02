# Tư vấn & phản biện giải pháp phát triển phần mềm

**Định nghĩa.** Đưa ý kiến chuyên môn khi dự án đang cân nhắc một quyết định kỹ thuật — có lý lẽ và dẫn chứng, không chỉ "em thấy nên...". Khác [Đọc hiểu & soi lỗi tài liệu giải pháp](/be/ky-nang/02-doc-hieu-tai-lieu-giai-phap) (phản biện tài liệu đã viết): ở đây bạn tư vấn cho một **quyết định** đang bàn.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Được hỏi ý kiến về quyết định kỹ thuật trong phạm vi mình rành, đưa ra phân tích đánh đổi rõ ràng.

**Tình huống thực tế — "nên dùng REST hay message queue cho 2 service giao tiếp?"**
```
Dự án: order-service cần báo cho inventory-service khi có đơn mới, không cần phản hồi ngay.

→ REST: đơn giản, đồng bộ, NHƯNG nếu inventory-service đang down thì order-service
  cũng bị ảnh hưởng (chờ hoặc lỗi).
→ Message queue: order-service phát sự kiện rồi đi tiếp ngay, inventory-service
  xử lý khi rảnh — NHƯNG thêm hạ tầng (queue) phải vận hành.

Đề xuất: message queue — vì bản chất "không cần phản hồi ngay" khớp đúng, và
tách rời để service kia down không ảnh hưởng luồng chính.
```

**Vì sao là mức ①:** tư vấn có lý lẽ dựa trên bối cảnh cụ thể — còn giới hạn trong phạm vi kỹ thuật mình rành.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** chủ động phản biện một quyết định kiến trúc đã được đề xuất, kể cả khi ý kiến ngược số đông.

**Tình huống thực tế — team định tách "tính năng đánh giá sản phẩm" thành microservice riêng vì "microservice là chuẩn hiện đại".** Bạn phản biện: tính năng hiện chỉ ~500 dòng code, 1 người maintain, không có nhu cầu scale riêng — tách ra sẽ thêm chi phí vận hành (CI/CD riêng, DB riêng) mà chưa có lợi ích rõ ràng. Đề xuất giữ trong monolith, tách module rõ ràng bên trong.

**Vì sao là mức ②:** bạn chủ động phản biện bằng lý lẽ cụ thể, kể cả khi phải nói ngược số đông.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** phối hợp và phản biện trực tiếp với SA hoặc bên thứ ba (vendor) về giải pháp kiến trúc.

**Tình huống thực tế — phản biện đề xuất kiến trúc từ một vendor bên ngoài.** Vendor đề xuất tích hợp SDK của họ với quyền truy cập rộng vào dữ liệu người dùng "để tiện tối ưu". Bạn phản biện với SA: quyền "rộng" không rõ phạm vi — vi phạm nguyên tắc least privilege; đề xuất giới hạn quyền theo từng trường cụ thể, kèm hợp đồng xử lý dữ liệu rõ ràng.

**Vì sao là mức ③:** bạn phản biện được ở tầm hợp tác với SA/bên thứ ba, đại diện tiếng nói kỹ thuật của đơn vị.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** phản biện được cả chiến lược công nghệ dài hạn của đơn vị, dựa trên xu hướng ngành và rủi ro dài hạn.

**Ví dụ thực tế — phản biện đề xuất "chuyển toàn bộ hệ thống sang serverless" từ lãnh đạo.** Bạn phân tích: serverless tiết kiệm chi phí khi tải không đều, nhưng hệ thống hiện tại có tải ổn định 24/7 nên chi phí có thể CAO HƠN; chi phí chuyển đổi (học lại, maintain song song) rất lớn. Đề xuất chỉ áp dụng cho tác vụ tải không đều thật sự, không chuyển cả hệ thống lõi.

**Vì sao là mức ④:** bạn phản biện được ở tầm chiến lược công nghệ dài hạn, đủ dữ kiện để nói ngược đề xuất từ cấp lãnh đạo khi cần.
