# Kỹ thuật phân tích nghiệp vụ & mô hình hoá (UML/Use case/BPMN)

**Định nghĩa.** Bộ công cụ tư duy để **chuyển yêu cầu nghiệp vụ mơ hồ thành mô hình rõ ràng** mà cả BA, Dev, khách hàng đều hiểu giống nhau. **Use case** mô tả ai (actor — vai tương tác với hệ thống) làm gì với hệ thống. **BPMN** (Business Process Model and Notation — ký hiệu mô hình hoá quy trình nghiệp vụ) vẽ luồng quy trình từng bước, có rẽ nhánh. **UML** (Unified Modeling Language — ngôn ngữ mô hình hoá thống nhất) là bộ ký hiệu chuẩn để mô hình hoá hệ thống (class diagram, sequence diagram...). **Mô hình dữ liệu quan hệ** thể hiện các thực thể (entity) và quan hệ giữa chúng. Vì sao phải mô hình hoá thay vì viết văn xuôi: một đoạn văn 10 dòng mỗi người đọc hiểu một kiểu, còn một sơ đồ ký hiệu chuẩn chỉ có một cách đọc.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu mô hình người khác vẽ, và tự vẽ được use case/BPMN đơn giản cho 1 chức năng theo hướng dẫn của BA senior.

**Tình huống thực tế — vẽ use case đầu tiên cho module cảnh báo.** Bạn mới vào dự án hệ thống giám sát an ninh mạng nội bộ, được giao vẽ use case cho màn hình cảnh báo. Bạn xác định actor và liệt kê hành động:

```
Actor: Quản trị viên an ninh (người trực giám sát)
  ├── UC-01: Xem danh sách cảnh báo (lọc theo mức độ, thời gian)
  ├── UC-02: Xem chi tiết một cảnh báo (IP nguồn, log liên quan)
  ├── UC-03: Đánh dấu cảnh báo đã xử lý (bắt buộc nhập ghi chú)
  └── UC-04: Export danh sách cảnh báo ra Excel

Actor: Hệ thống phát hiện xâm nhập (IDS — nguồn sinh cảnh báo, actor "máy")
  └── UC-05: Đẩy cảnh báo mới vào hệ thống (qua API)
```

Điểm đáng giá nhất không phải ký hiệu đẹp — mà là bạn nhận ra **IDS cũng là một actor** (actor không nhất thiết là người): nhờ vậy đội Dev thấy ngay cần thiết kế API tiếp nhận, không chỉ màn hình cho người dùng.

**Vì sao là mức ①:** vẽ đúng ký hiệu cho ca đơn giản theo mẫu, biết xác định đủ actor; chưa cần tự chọn kỹ thuật mô hình hoá phù hợp cho bài toán phức tạp.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** tự chọn và vẽ được mô hình cho quy trình có **rẽ nhánh, leo thang xử lý (escalation)**, và dùng được mô hình dữ liệu quan hệ để nói chuyện với Dev về cấu trúc dữ liệu.

**Tình huống thực tế 1 — BPMN cho luồng xử lý cảnh báo có leo thang.** Khách hàng mô tả bằng lời: "cảnh báo nghiêm trọng thì phải báo ngay, không ai xử lý thì báo lên trưởng ca". Bạn chuyển thành BPMN với gateway (điểm rẽ nhánh) rõ ràng:

```
[IDS phát hiện] → (Gateway: mức độ?)
   ├─ Thấp        → Ghi log, gộp vào báo cáo ngày              → Kết thúc
   ├─ Trung bình  → Tạo cảnh báo trên dashboard                → Kết thúc
   └─ Cao         → Tạo cảnh báo + gửi email/SMS ca trực
                    → (Gateway: 15 phút có người nhận xử lý?)
                       ├─ Có    → Chuyển trạng thái "Đang xử lý"
                       └─ Không → Escalate: gọi tự động trưởng ca
                                  + đánh dấu "Quá hạn phản ứng"
```

Vẽ xong, khách hàng nhìn vào và tự phát hiện: "à, thiếu trường hợp trực ca nghỉ phép" — đó chính là giá trị của mô hình: **lộ ra lỗ hổng nghiệp vụ trước khi code**, không phải sau khi go-live.

**Tình huống thực tế 2 — mô hình dữ liệu quan hệ để chốt tranh cãi với Dev.** Tranh cãi nổ ra trong team: "cảnh báo" và "sự cố" là một hay hai khái niệm? Bạn vẽ mô hình quan hệ để chốt:

```
[CẢNH BÁO]  nhiều ──── 1  [SỰ CỐ]   nhiều ──── 1  [NGƯỜI XỬ LÝ]
 - id, ip_nguồn            - id, tiêu đề           - id, họ tên, ca trực
 - mức độ, thời điểm       - trạng thái
 - id sự cố (khoá ngoại)   - id người xử lý

Quy tắc nghiệp vụ: nhiều cảnh báo cùng loại tấn công trong cửa sổ 5 phút
→ gộp về 1 sự cố (tránh đội vận hành bị ngợp 500 dòng cho 1 đợt quét cổng).
```

Từ đây Dev thiết kế bảng đúng ngay từ đầu, Tester viết case kiểm tra logic gộp — cả team dùng chung một bức tranh.

**Vì sao là mức ②:** tự thiết kế mô hình cho quy trình có logic rẽ nhánh và **chọn đúng loại mô hình cho từng mục đích** (BPMN cho luồng, mô hình quan hệ cho dữ liệu) — không chỉ chép theo mẫu có sẵn.
