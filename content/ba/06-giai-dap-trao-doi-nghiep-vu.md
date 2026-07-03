# Giải đáp, trao đổi thắc mắc nghiệp vụ với đội dự án

**Định nghĩa.** Trong lúc code, Dev/Tester luôn phát sinh câu hỏi nghiệp vụ ("trường hợp X thì xử lý sao?") — BA là người trả lời **nhanh, đúng, và nhất quán**, tránh mỗi người hiểu một kiểu rồi code ra ba phiên bản nghiệp vụ khác nhau. Kỹ năng này nghe đơn giản nhưng là "nhịp tim" hằng ngày của BA: mỗi câu trả lời chậm 1 ngày là Dev ngồi chờ hoặc tự đoán — cả hai đều đắt.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Trả lời đúng và nhanh các câu hỏi nghiệp vụ đã có trong tài liệu; biết trả lời ở kênh chung để cả team cùng thấy.

**Tình huống thực tế — câu hỏi lặp của Dev và thói quen trả lời đúng chỗ.** Dev hỏi riêng qua chat: "Cảnh báo đã đánh dấu 'đã xử lý' rồi mà IP đó lại sinh cảnh báo mới thì tính là sự cố mới không?" Bạn tra PTYC và trả lời — nhưng ở **kênh chung của dự án**, không phải chat riêng:

```
[#du-an-giam-sat] BA: Trả lời câu hỏi của Dev về cảnh báo lặp:
  Theo PTYC-014 mục 4.2: mỗi lần phát hiện là 1 bản ghi độc lập,
  TRỪ khi nằm trong cửa sổ tương quan 5 phút với sự cố đang mở
  → khi đó gộp vào sự cố cũ.
  Case của em: cảnh báo cũ đã đóng → tạo SỰ CỐ MỚI, có link
  "liên quan" trỏ về sự cố cũ (mục 4.3).
```

Trả lời kênh chung + trích đúng mục tài liệu = Tester cũng thấy, không ai hỏi lại lần hai, và ai muốn kiểm chứng đều tra được nguồn.

**Vì sao là mức ①:** trả lời đúng dựa trên tài liệu có sẵn và đúng kênh; chưa cần tự ra quyết định khi tài liệu chưa phủ tới.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** xử lý được câu hỏi mà **tài liệu chưa nói rõ** — tự ra quyết định hợp lý dựa trên hiểu nghiệp vụ, chốt nhanh với khách hàng khi cần, và luôn cập nhật ngược lại tài liệu.

**Tình huống thực tế 1 — quyết ngay ca tài liệu chưa phủ, không để Dev chờ.** Dev hỏi: "2 cảnh báo mức Cao CÙNG lúc từ 2 IP khác nhau nhưng cùng loại tấn công — gộp thành 1 sự cố không?" Tài liệu không có câu trả lời. Bạn xử lý theo 3 bước trong vòng một buổi sáng:

```
1. TỰ PHÂN TÍCH   Mục tiêu gộp là chống ngợp thông tin trùng. 2 IP cùng
                  loại tấn công cùng lúc = khả năng cao là 1 chiến dịch
                  (tấn công phân tán) → GỘP có lợi cho điều tra.
2. QUYẾT + BÁO    Quyết: gộp nếu cùng loại tấn công trong cửa sổ 1 phút.
                  Nhắn khách hàng xác nhận (họ đồng ý trong 30 phút —
                  vì bạn đưa sẵn lý lẽ, họ chỉ cần gật).
3. CẬP NHẬT NGAY  Thêm mục 4.4 vào PTYC + báo kênh chung. Câu hỏi này
                  không bao giờ được hỏi lại.
```

**Tình huống thực tế 2 — phát hiện 2 người nhận 2 câu trả lời khác nhau.** Tester phát hiện: Dev A code "mức Trung bình gửi email", Dev B hiểu "chỉ mức Cao gửi email" — hoá ra 2 tháng trước 2 người nhận câu trả lời miệng khác nhau từ 2 buổi họp khác nhau. Bạn không xử lý kiểu "ai đúng ai sai" mà: tra lại biên bản chốt gần nhất (mức Cao mới gửi), công bố một câu trả lời chuẩn ở kênh chung, và rà lại toàn bộ chỗ code đã lỡ làm theo bản hiểu sai để tạo bug ticket. Sau vụ này bạn đặt lệ mới cho chính mình: **mọi câu trả lời nghiệp vụ qua lời nói đều phải chốt lại bằng chữ trong ngày.**

**Vì sao là mức ②:** tự tin ra quyết định hợp lý khi tài liệu chưa phủ, xử lý được cả hậu quả của thông tin không nhất quán trong team — và luôn đóng vòng lặp bằng cách cập nhật tài liệu.
