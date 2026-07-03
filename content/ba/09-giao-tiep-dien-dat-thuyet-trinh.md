# Giao tiếp, diễn đạt & thuyết trình

**Định nghĩa.** BA là cầu nối giữa khách hàng (nói ngôn ngữ nghiệp vụ) và Dev (nói ngôn ngữ kỹ thuật) — kỹ năng giao tiếp/diễn đạt quyết định thông tin có bị "tam sao thất bản" qua mỗi lần truyền đạt hay không. Ba biểu hiện cụ thể của người diễn đạt tốt: nói bằng **ví dụ đời thật** thay vì thuật ngữ; **cấu trúc trước chi tiết sau** (kết luận → lý do → chi tiết); và **đổi ngôn ngữ theo người nghe** — cùng một nội dung, nói với Dev khác nói với lãnh đạo.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Diễn đạt rõ ràng yêu cầu cho nhóm nhỏ (đội dự án), dùng ví dụ cụ thể để mọi người hình dung giống nhau — không gây hiểu nhầm.

**Tình huống thực tế — trình bày yêu cầu "Cảnh báo tự động" ở buổi kick-off.** Thay vì đọc PTYC từng dòng (cả phòng ngủ gật), bạn mở đầu bằng một ví dụ ai cũng biết:

```
CÁCH NÓI GÂY HIỂU NHẦM (đọc tài liệu):
  "Hệ thống thực hiện tương quan sự kiện đa nguồn và phát sinh
   cảnh báo theo ngưỡng cấu hình động..."

CÁCH BẠN NÓI (ví dụ trước, thuật ngữ sau):
  "Giống thẻ tín dụng bị quẹt bất thường thì ngân hàng gọi ngay:
   hệ thống mình canh log 24/7, thấy dấu hiệu lạ — ví dụ một máy
   tính 2h sáng tự nhiên gửi 10GB ra nước ngoài — thì báo động.
   Trong tài liệu, phần 'thấy dấu hiệu lạ' gọi là tương quan sự
   kiện, phần 'báo động' là luồng cảnh báo — giờ mình đi từng phần."
```

Sau buổi đó, Dev BE nói lại đúng ý bạn cho một bạn vắng họp — thông tin truyền qua một lớp mà không méo, đó là thước đo thật của diễn đạt rõ.

**Vì sao là mức ①:** truyền đạt chính xác trong phạm vi đội dự án bằng ví dụ tốt; chưa cần điều chỉnh linh hoạt cho nhiều loại khán giả khác nhau.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** thuyết trình cho **khán giả đa dạng** (khách hàng, lãnh đạo, kỹ thuật) — biết cắt cùng một nội dung thành các "phiên bản" khác nhau theo mối quan tâm của từng người nghe.

**Tình huống thực tế — một giải pháp, hai bài trình bày trong cùng tuần.** Giải pháp "Phân quyền xem cảnh báo" cần trình cho 2 nhóm. Bạn chuẩn bị 2 phiên bản từ cùng một tài liệu:

```
VỚI ĐỘI DEV (45 phút, đi sâu):
  - Mô hình 3 vai + bảng ma trận quyền từng màn hình
  - Luồng kiểm tra quyền: đăng nhập → token chứa vai → API lọc
    dữ liệu theo nhóm tài sản
  - 15 phút Q&A về case biên: user thuộc 2 phòng ban thì sao?

VỚI LÃNH ĐẠO KHÁCH HÀNG (10 phút, đi đúng mối quan tâm):
  - Slide 1: "Ai thấy gì" — 1 hình 3 vòng tròn, 0 thuật ngữ
  - Slide 2: Rủi ro giải quyết được: nhân viên thường không còn
    thấy log nhạy cảm (đúng nỗi lo họ nêu buổi khảo sát)
  - Slide 3: Cần lãnh đạo quyết 1 việc: ai là người gán nhóm
    tài sản → xin chốt luôn trong họp
```

Điểm quan trọng nhất của bản lãnh đạo: **kết thúc bằng một quyết định cần họ đưa ra** — lãnh đạo không đến họp để nghe kể, họ đến để quyết. Buổi 10 phút chốt được điều mà 3 email trước đó không chốt nổi.

**Vì sao là mức ②:** chủ động thiết kế nội dung theo từng đối tượng nghe và mục tiêu của buổi nói (thông báo ≠ xin quyết định) — không dùng một bài trình bày cho mọi người.
