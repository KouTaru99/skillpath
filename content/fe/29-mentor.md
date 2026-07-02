# Hướng dẫn, đào tạo Dev FE cấp thấp hơn (mentor)

**Định nghĩa.** Giúp một dev cấp thấp hơn (Entry/Junior) tự tiến bộ — không phải trả lời hộ hay code hộ, mà **dẫn dắt để họ tự tìm ra câu trả lời**, để lần sau gặp vấn đề tương tự họ tự xử được, không phải hỏi lại.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hướng dẫn 1-1 theo tình huống phát sinh (khi một bạn Entry hỏi hoặc bị stuck) — chưa tự thiết kế lộ trình đào tạo bài bản cho cả nhóm (việc đó ở mốc sau, cùng với tổ chức seminar).

**Tình huống thực tế — bạn Entry báo "component không cập nhật dù em đã sửa data".**

Cách **không nên**: mở IDE, sửa hộ, gửi lại "đây, sửa xong rồi" — bạn ấy không hiểu tại sao, gặp lại vẫn không tự xử được.

Cách mentor đúng — đặt câu hỏi dẫn dắt thay vì đưa đáp án ngay:
```
Bạn: "Component không cập nhật dù em đã sửa data."

Mentor: "Em sửa data bằng cách nào — gán lại biến mới hay chỉnh trực tiếp
         thuộc tính bên trong nó (push vào mảng cũ chẳng hạn)?"

Bạn:    "À em push thẳng vào mảng cũ ạ."

Mentor: "Angular với OnPush detect thay đổi bằng cách so sánh REFERENCE
         (mảng cũ và mảng mới có phải cùng 1 object không), không phải
         so nội dung bên trong. Push vào mảng cũ thì reference không đổi.
         Vậy nếu muốn Angular nhận ra, em cần làm gì?"

Bạn:    "Tạo mảng mới bằng spread thay vì push trực tiếp ạ!"
```
Bạn ấy tự đi tới câu trả lời (`this.items = [...this.items, newItem]`) — và hiểu được **cơ chế** (so sánh reference), không chỉ nhớ "công thức". Lần sau gặp lỗi tương tự ở chỗ khác, bạn ấy tự nhận ra được.

**Vì sao là mức ①:** bạn hướng dẫn hiệu quả trong các tình huống 1-1 phát sinh tự nhiên — chưa tự thiết kế chương trình đào tạo có cấu trúc cho nhiều người cùng lúc.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** chủ động thiết kế **lộ trình onboarding** cho một người mới, không chỉ trả lời khi họ hỏi.

**Ví dụ thực tế — kế hoạch 2 tuần đầu cho một bạn Entry mới vào team.**
```
Tuần 1: sửa 2-3 bug nhỏ có sẵn (đã gắn nhãn "good first issue"), có mentor review kỹ từng PR
        → mục tiêu: quen codebase, quen quy trình PR/review, chưa cần nhanh
Tuần 2: nhận 1 task nhỏ trọn vẹn (không phải bug) từ đầu đến cuối, mentor chỉ hỗ trợ khi hỏi
        → mục tiêu: tự tin làm việc độc lập, biết lúc nào cần hỏi thay vì đoán
```
Bạn chủ động chuẩn bị việc phù hợp độ khó tăng dần, thay vì để bạn mới tự bơi hoặc nhận việc quá sức ngay tuần đầu.

**Vì sao là mức ②:** bạn chủ động thiết kế được lộ trình học cho một người, không chỉ phản ứng khi có câu hỏi phát sinh.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** mentor được **nhiều người cùng lúc** với năng lực khác nhau, và biết điều chỉnh cách dẫn dắt theo từng người thay vì áp một công thức chung.

**Tình huống thực tế — 3 bạn mới cùng lúc, năng lực khác nhau rõ rệt.** Một bạn học nhanh, chán nếu việc quá dễ; một bạn cần nhiều thời gian hơn, dễ mất tự tin nếu bị so sánh; một bạn giỏi code nhưng ngại hỏi. Bạn không áp cùng một lộ trình cho cả ba:
```
Bạn A (nhanh):  giao việc khó hơn 1 bậc so với chuẩn, review thưa hơn — tự tin, không cần sát sao.
Bạn B (chậm hơn): giữ nhịp việc dễ lâu hơn 1 chút, review dày + khen cụ thể mỗi tiến bộ nhỏ.
Bạn C (ngại hỏi): chủ động hỏi thăm giữa chừng thay vì đợi bạn ấy tự lên tiếng.
```
Bạn theo dõi tiến độ từng người, không dùng một tiêu chuẩn "hoàn thành đúng X tuần" cho tất cả.

**Vì sao là mức ③:** bạn dẫn dắt được nhiều người có năng lực khác nhau cùng lúc, điều chỉnh cách tiếp cận theo từng cá nhân — không chỉ áp dụng một lộ trình cứng cho mọi người.
