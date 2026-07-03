# Giải đáp, trao đổi thắc mắc nghiệp vụ với đội dự án

**Định nghĩa.** Trong lúc code, Dev/Tester luôn phát sinh câu hỏi nghiệp vụ ("trường hợp X thì xử lý sao?") — BA là người trả lời nhanh, đúng, và nhất quán, tránh mỗi người hiểu 1 kiểu.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Trả lời được câu hỏi nghiệp vụ đơn giản, đúng với tài liệu đã chốt.

**Ví dụ thực tế.** Dev hỏi: "Nếu cảnh báo đã được đánh dấu 'đã xử lý' rồi mà vẫn phát sinh cảnh báo mới từ cùng IP đó, có tính là 1 sự cố mới không?" — bạn tra lại PTYC, trả lời đúng theo tài liệu đã chốt: có, vì mỗi lần phát hiện là 1 bản ghi độc lập trừ khi trong cùng cửa sổ tương quan 5 phút.

**Vì sao là mức ①:** trả lời đúng và nhanh dựa trên tài liệu có sẵn, chưa cần tự quyết định khi tài liệu chưa nói tới.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** xử lý được câu hỏi mà **tài liệu chưa nói rõ** — tự quyết định hợp lý dựa trên hiểu nghiệp vụ, không đùn đẩy hay để Dev tự đoán.

**Ví dụ thực tế.** Dev hỏi 1 case tài liệu chưa đề cập: "Nếu 2 cảnh báo mức Cao xảy ra CÙNG lúc từ 2 IP khác nhau nhưng cùng loại tấn công, có nên gộp thành 1 sự cố không?" — Bạn không có sẵn câu trả lời trong tài liệu, nhưng dựa hiểu nghiệp vụ (mục tiêu là giúp đội vận hành không bị ngợp thông tin trùng lặp), bạn quyết định: gộp nếu cùng loại tấn công trong 1 phút, và cập nhật ngay vào tài liệu để lần sau không ai phải hỏi lại.

**Vì sao là mức ②:** tự tin ra quyết định hợp lý khi tài liệu chưa phủ hết, và chủ động cập nhật tài liệu để tránh hỏi lại.
