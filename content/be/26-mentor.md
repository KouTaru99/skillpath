# Hướng dẫn, đào tạo Dev BE cấp thấp hơn (mentor)

**Định nghĩa.** Giúp một dev cấp thấp hơn tự tiến bộ — không trả lời hộ hay code hộ, mà dẫn dắt để họ tự tìm ra câu trả lời.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hướng dẫn 1-1 theo tình huống phát sinh khi một bạn Entry hỏi hoặc bị stuck.

**Tình huống thực tế — bạn Entry báo "API trả về null dù dữ liệu có trong CSDL".**
```
Mentor: "Em query bằng câu lệnh nào — có join bảng nào không?"
Bạn:    "Dạ em dùng findById thôi."
Mentor: "findById tìm theo khoá chính. Em có chắc ID em truyền vào đúng
         với ID thật trong bảng không? Thử log giá trị ID trước khi query xem."
Bạn:    "À, em bị lệch — ID em lấy từ request là String nhưng CSDL là Long,
         so sánh ngầm ra sai!"
```
Bạn ấy tự tìm ra nguyên nhân (lỗi kiểu dữ liệu) thay vì được đưa đáp án ngay — lần sau gặp lỗi tương tự tự nhận ra được.

**Vì sao là mức ①:** hướng dẫn hiệu quả trong tình huống 1-1 phát sinh tự nhiên — chưa tự thiết kế chương trình đào tạo có cấu trúc.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** chủ động thiết kế lộ trình onboarding cho người mới, không chỉ trả lời khi được hỏi.

**Ví dụ thực tế — kế hoạch 2 tuần đầu cho một bạn Entry mới vào team BE.** Tuần 1: sửa 2-3 bug nhỏ có sẵn, mentor review kỹ từng PR — mục tiêu quen codebase. Tuần 2: nhận 1 API nhỏ trọn vẹn từ đầu đến cuối, mentor chỉ hỗ trợ khi hỏi — mục tiêu tự tin làm việc độc lập.

**Vì sao là mức ②:** bạn chủ động thiết kế được lộ trình học, không chỉ phản ứng khi có câu hỏi.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** mentor được nhiều người cùng lúc với năng lực khác nhau, điều chỉnh cách dẫn dắt theo từng người.

**Tình huống thực tế — 3 bạn mới cùng lúc, năng lực khác nhau rõ rệt.** Bạn giao việc khó hơn cho người học nhanh (không nhàm chán), giữ nhịp dễ lâu hơn + khen cụ thể cho người chậm hơn (không mất tự tin), chủ động hỏi thăm bạn ngại hỏi — không dùng một tiêu chuẩn "hoàn thành đúng X tuần" cho tất cả.

**Vì sao là mức ③:** bạn dẫn dắt được nhiều người có năng lực khác nhau cùng lúc.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** mentor được cả Senior khác hướng tới tư duy kiến trúc — khác hẳn dẫn dắt người mới về kỹ thuật cụ thể.

**Tình huống thực tế — một Senior giỏi code nhưng thiết kế còn "cục bộ".** Bạn dẫn dắt bằng câu hỏi tầm cao hơn: "Thiết kế này ổn cho tính năng hiện tại — nhưng nếu 3 tháng nữa có tính năng B cũng cần dữ liệu tương tự, có phải sửa lại từ đầu không?" — giúp Senior đó dần tự đặt câu hỏi phạm vi rộng hơn cho chính mình.

**Vì sao là mức ④:** bạn nâng được tư duy của người cùng cấp cao lên tầm mới — mức mentor sâu nhất.
