# Hướng dẫn & review kịch bản kiểm thử

**Định nghĩa.** Thuộc nhóm **Quản lý & lãnh đạo kỹ thuật** — Senior Tester không chỉ tự viết kịch bản tốt mà còn **hướng dẫn và review** cho các Tester level thấp hơn hoặc tương đương, đảm bảo chất lượng kiểm thử đồng đều trong cả team.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review kịch bản kiểm thử của đồng nghiệp, chỉ ra chỗ thiếu case hoặc chưa rõ.

**Ví dụ thực tế.** Bạn review kịch bản kiểm thử tính năng "Xuất báo cáo cảnh báo" của 1 bạn Junior, thấy bộ test chỉ có case dữ liệu bình thường, thiếu case dữ liệu rỗng (không có cảnh báo nào trong khoảng thời gian chọn) và case dữ liệu cực lớn (10.000 cảnh báo). Bạn góp ý bổ sung 2 case này trước khi thực thi.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** không chỉ review từng case mà **hướng dẫn cách tư duy** thiết kế kiểm thử cho người khác, giúp họ tự cải thiện lâu dài.

**Ví dụ thực tế.** Thay vì chỉ nói "thiếu case X, Y", bạn ngồi cùng bạn Junior giải thích nguyên tắc: "mỗi khi có dữ liệu dạng danh sách, luôn hỏi 3 câu: rỗng thì sao, 1 phần tử thì sao, và cực nhiều phần tử thì sao" — để lần sau bạn ấy tự nghĩ ra case tương tự mà không cần bạn chỉ ra từng cái.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** dẫn dắt về chuyên môn/kỹ thuật ở phạm vi rộng hơn — đào tạo kiến thức/kỹ năng/phương pháp cho nhiều Tester hoặc thành viên khác trong team dự án, không chỉ 1-1.

**Ví dụ thực tế.** Bạn tổ chức 1 buổi chia sẻ nội bộ cho cả team dự án (gồm cả Dev) về "Các lỗi thường gặp khi thiết kế test case cho hệ thống giám sát an ninh mạng" — dùng chính các case đã bỏ sót trong dự án làm ví dụ thật, giúp cả Dev hiểu Tester nhìn nhận rủi ro thế nào.

**Vì sao tăng dần ①→③:** từ review từng lỗi cụ thể, tới dạy cách tư duy cho 1 người, tới đào tạo phương pháp cho cả team.
