# Nắm vững nghiệp vụ trong mảng sản phẩm liên quan

**Định nghĩa.** BA giỏi không chỉ biết kỹ thuật phân tích mà phải **hiểu sâu nghiệp vụ thật** của lĩnh vực sản phẩm — hiểu đúng "tại sao" đằng sau mỗi yêu cầu, không chỉ ghi lại "cái gì" khách hàng nói. Với sản phẩm giám sát an ninh mạng, nghĩa là hiểu đội vận hành an ninh làm việc thế nào theo ca, quy trình phản ứng sự cố ra sao, khái niệm nào là sống còn (thời gian phát hiện, thời gian phản ứng) — chứ không chỉ thuộc tên màn hình.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm được bức tranh nghiệp vụ cơ bản của sản phẩm: ai dùng, dùng để làm gì, khái niệm cốt lõi nghĩa là gì trong đời thật.

**Tình huống thực tế — tuần đầu vào dự án, bạn tự dựng "bản đồ nghiệp vụ".** Thay vì chỉ đọc tài liệu cũ, bạn xin ngồi quan sát 1 buổi trực của đội An ninh mạng và ghi lại:

```
NGƯỜI DÙNG THẬT     Đội vận hành an ninh, trực 3 ca/ngày, mỗi ca 2 người.
VIỆC HỌ LÀM         Nhìn dashboard → thấy cảnh báo → điều tra log
                    → xác nhận thật/giả → xử lý hoặc leo thang.
KHÁI NIỆM SỐNG CÒN  - "Cảnh báo giả" (false positive): chiếm ~70% số cảnh
                      báo — nỗi đau lớn nhất của đội.
                    - Thời gian phản ứng: cam kết nội bộ 15 phút với mức Cao.
ĐIỀU BẤT NGỜ        Ca đêm chỉ 1 người trực — mọi thiết kế "cần 2 người
                    xác nhận" đều bất khả thi vào ban đêm.
```

Chi tiết "ca đêm chỉ 1 người" về sau cứu cả một tính năng: khi có yêu cầu "xử lý cảnh báo Cao cần người thứ hai phê duyệt", bạn là người chỉ ra nó sẽ chết vào ban đêm.

**Vì sao là mức ①:** nắm đúng bức tranh và khái niệm cốt lõi từ quan sát thật; chưa đủ sâu để tự phản biện yêu cầu của chính khách hàng.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** hiểu đủ sâu để **tự phát hiện khi yêu cầu của khách hàng chưa đúng bản chất nghiệp vụ** — nghe một câu yêu cầu là hình dung được nó chạy trong ca trực thật sẽ vướng gì.

**Tình huống thực tế 1 — soi ra lỗ hổng vận hành trong một yêu cầu "nghe hợp lý".** Khách hàng yêu cầu: "cảnh báo mức Cao thì gửi email". Bạn hình dung ca trực thật và hỏi lại:

```
Yêu cầu gốc:  "Cảnh báo Cao → gửi email cho đội vận hành"

Câu hỏi từ hiểu nghiệp vụ:
  1. Ca đêm ai đọc email? (2h sáng không ai mở hộp thư)
     → cần kênh SMS/gọi tự động cho mức Cao ngoài giờ.
  2. Một đợt quét cổng sinh 500 cảnh báo Cao trong 10 phút
     → gửi 500 email? Hộp thư thành thùng rác, cảnh báo thật bị chìm.
     → cần gộp: tối đa 1 email/5 phút cho cùng loại tấn công.
  3. Email gửi cho "đội" hay cho "người trực ca hiện tại"?
     → cần tích hợp lịch trực để gửi đúng người.
```

Ba câu hỏi này khách hàng đều chưa nghĩ tới — và cả ba đều đến từ việc hiểu ca trực vận hành thật, không phải từ kỹ thuật.

**Tình huống thực tế 2 — bắt được yêu cầu mô tả sai bản chất.** Khách hàng nói "cho tôi tính năng xoá cảnh báo giả". Bạn hiểu nghiệp vụ đủ để nhận ra: đội an ninh **không bao giờ được xoá** dữ liệu cảnh báo (yêu cầu lưu vết phục vụ điều tra sau này) — cái họ thật sự cần là *đánh dấu* "cảnh báo giả" để ẩn khỏi màn hình chính nhưng vẫn truy vết được. Bạn đề xuất lại đúng bản chất: trạng thái "false positive" + bộ lọc, thay vì nút xoá. Khách hàng đồng ý ngay — và tránh được một vi phạm quy định lưu vết mà chính họ cũng quên.

**Vì sao là mức ②:** chủ động phát hiện thiếu sót/sai bản chất trong chính yêu cầu của khách hàng nhờ hiểu nghiệp vụ vận hành thật — không chỉ ghi chép trung thành lời khách nói.
