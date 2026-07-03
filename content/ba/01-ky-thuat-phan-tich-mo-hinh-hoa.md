# Kỹ thuật phân tích nghiệp vụ & mô hình hoá (UML/Use case/BPMN)

**Định nghĩa.** Bộ công cụ tư duy để **chuyển yêu cầu nghiệp vụ mơ hồ thành mô hình rõ ràng** mà cả BA, Dev, khách hàng đều hiểu giống nhau. **Use case** mô tả ai (actor) làm gì với hệ thống. **BPMN** (Business Process Model and Notation) vẽ luồng quy trình nghiệp vụ từng bước, có rẽ nhánh. **UML** là bộ ký hiệu chuẩn để mô hình hoá hệ thống (class diagram, sequence diagram...). **Mô hình dữ liệu quan hệ** thể hiện các thực thể (entity) và quan hệ giữa chúng.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu và vẽ được use case/BPMN đơn giản cho 1 chức năng, theo hướng dẫn.

**Ví dụ thực tế.** Cho hệ thống giám sát an ninh mạng nội bộ, bạn vẽ Use Case đơn giản: actor "Quản trị viên" thực hiện use case "Xem danh sách cảnh báo", "Đánh dấu cảnh báo đã xử lý" — thể hiện rõ ai tương tác với hệ thống ở mức nào.

**Vì sao là mức ①:** vẽ đúng ký hiệu cho ca đơn giản theo mẫu, chưa cần tự chọn kỹ thuật phù hợp cho bài toán phức tạp.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** tự vẽ được mô hình cho quy trình có rẽ nhánh phức tạp hơn, và bắt đầu dùng mô hình dữ liệu quan hệ.

**Ví dụ thực tế.** Bạn vẽ BPMN cho luồng "Xử lý cảnh báo bất thường": bắt đầu từ hệ thống phát hiện → rẽ nhánh theo mức độ nghiêm trọng (Thấp: tự động ghi log; Cao: gửi cảnh báo ngay + escalate cho quản lý nếu sau 15 phút chưa xử lý). Song song, bạn vẽ mô hình dữ liệu quan hệ đơn giản: thực thể `Cảnh báo` — `Sự cố` — `Người xử lý`, thể hiện rõ 1 sự cố có thể gộp nhiều cảnh báo.

**Vì sao là mức ②:** tự thiết kế mô hình cho quy trình có logic rẽ nhánh, không chỉ chép theo mẫu có sẵn.
