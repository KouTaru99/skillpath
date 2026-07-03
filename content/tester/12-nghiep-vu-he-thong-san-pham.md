# Nghiệp vụ hệ thống của sản phẩm

**Định nghĩa.** Ngoài kỹ thuật kiểm thử, Tester giỏi phải **hiểu nghiệp vụ thật** của sản phẩm mình test — tại sao tính năng này tồn tại, ai dùng, dùng để làm gì. Hiểu nghiệp vụ giúp phát hiện được lỗi logic nghiệp vụ mà kiểm thử máy móc theo tài liệu không bắt được.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm được nghiệp vụ cơ bản của các chức năng mình đang test.

**Ví dụ thực tế.** Bạn hiểu: hệ thống giám sát an ninh mạng nội bộ tồn tại để đội An ninh mạng phát hiện sớm các dấu hiệu tấn công (đăng nhập bất thường, truy cập trái phép, mã độc). Vì vậy khi test tính năng cảnh báo, bạn hiểu **"cảnh báo trễ dù chỉ vài giây" là vấn đề nghiêm trọng** — khác hẳn 1 hệ thống thương mại điện tử nơi chậm vài giây không quá quan trọng. Hiểu nghiệp vụ này giúp bạn ưu tiên đúng: test kỹ độ trễ cảnh báo hơn là test giao diện đẹp.

**Vì sao là mức ①:** hiểu đúng bối cảnh nghiệp vụ để test có trọng tâm, chưa cần hiểu sâu tới mức tự phát hiện bất cập nghiệp vụ.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** **nắm vững** nghiệp vụ đủ để tự nhận ra khi hành vi hệ thống "đúng kỹ thuật nhưng sai nghiệp vụ".

**Ví dụ thực tế.** Test tính năng "Tự động đóng cảnh báo sau 24 giờ nếu không ai xử lý", về mặt kỹ thuật chạy đúng như tài liệu mô tả. Nhưng bạn hiểu nghiệp vụ đủ sâu để nhận ra: nếu cảnh báo mức độ **Cao** (nghi ngờ tấn công thật) bị tự động đóng sau 24 giờ mà chưa ai xử lý, đó là lỗ hổng an ninh nghiêm trọng chứ không đơn thuần là "tính năng chạy đúng". Bạn báo lại: quy tắc tự đóng chỉ nên áp dụng cho cảnh báo mức Thấp/Trung bình, còn mức Cao phải escalate (leo thang) cho quản lý nếu không ai xử lý, chứ không được tự đóng.

**Vì sao là mức ②:** hiểu nghiệp vụ đủ sâu để phát hiện bất cập mà kiểm thử "đúng theo tài liệu" đơn thuần sẽ bỏ lỡ.
