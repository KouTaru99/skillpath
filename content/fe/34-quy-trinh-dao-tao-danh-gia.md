# Xây quy trình đào tạo & đánh giá đội ngũ

**Định nghĩa.** Khác [mentor](/fe/ky-nang/29-mentor) (dẫn dắt trực tiếp một vài người), đây là xây **quy trình chính thức** áp dụng cho cả đơn vị: lộ trình đào tạo theo từng level (Entry/Experienced/Senior...), tiêu chí đánh giá năng lực rõ ràng để ai cũng biết mình đang ở đâu và cần học gì tiếp — bản chất chính là thứ career-path/khung năng lực mà trang này đang mô phỏng.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đóng góp một phần cụ thể vào quy trình đánh giá năng lực đã có sẵn của đơn vị — không tự xây quy trình từ đầu.

**Ví dụ thực tế — đóng góp tiêu chí đánh giá cho một kỹ năng cụ thể vào bộ khung năng lực chung.** Đơn vị đang xây bộ tiêu chí đánh giá level Dev Front-end nhưng thiếu phần "Microfrontends" (kỹ năng mới, chưa ai viết tiêu chí rõ). Bạn được giao viết phần này:
```
Microfrontends — tiêu chí đạt Senior:
[ ] Đã tự thiết lập được pipeline deploy độc lập cho ít nhất 1 mảnh microfrontend
[ ] Giải thích được đánh đổi giữa Module Federation share-singleton vs cô lập runtime
[ ] Từng viết hoặc review contract test giữa shell và remote

Bằng chứng chấp nhận: link PR pipeline + 1 buổi trình bày ngắn cho team
```
Bạn viết tiêu chí **quan sát được** (có bằng chứng cụ thể, không chỉ "hiểu rõ Microfrontends" chung chung) — để người đánh giá và người được đánh giá đều thống nhất khi nào là "đạt".

**Vì sao là mức ①:** bạn đóng góp được một phần cụ thể, quan sát được vào khung có sẵn — chưa tự thiết kế toàn bộ quy trình đào tạo/đánh giá cho cả đơn vị.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự thiết kế **lộ trình đào tạo trọn vẹn cho một level** (không chỉ đóng góp tiêu chí cho một kỹ năng), gồm cả nội dung học và cách đánh giá.

**Ví dụ thực tế — thiết kế lộ trình đào tạo trọn vẹn từ Experienced lên Senior.**
```
Lộ trình 6 tháng Experienced → Senior (Dev Front-end):
Tháng 1-2: Kiến trúc & thiết kế hệ thống — học qua việc thực (shadow 1 buổi thiết kế
           thật với Senior khác, sau đó tự phác thảo 1 thiết kế nhỏ có review)
Tháng 3-4: Quản lý & lãnh đạo kỹ thuật — bắt đầu mentor 1 bạn Entry, có Senior khác
           quan sát và góp ý cách mentor
Tháng 5-6: Tự chủ 1 tính năng vừa từ thiết kế tới triển khai, review bởi 2 Senior

Đánh giá cuối lộ trình: dựa trên sản phẩm thật đã làm (thiết kế nào, mentor ai,
tính năng nào) — không phải bài kiểm tra lý thuyết.
```
Bạn thiết kế lộ trình gắn với **công việc thật** (không phải khoá học tách biệt) — học qua làm, đánh giá qua sản phẩm thật đã tạo ra.

**Vì sao là mức ②:** bạn tự thiết kế được một lộ trình đào tạo trọn vẹn cho một level cụ thể — không chỉ đóng góp một phần vào khung có sẵn.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** thiết kế khung năng lực cho **toàn bộ các level** (Entry đến Specialist), và xây cơ chế để khung đó tự cập nhật theo thời gian — không chỉ một lộ trình cho một chặng chuyển cấp.

**Ví dụ thực tế — khung năng lực trọn đời nghề, tự cập nhật khi có kỹ năng mới xuất hiện.**
```
Khung năng lực Dev Front-end (Entry → Specialist), review định kỳ mỗi 6 tháng:
- Mỗi lần công nghệ mới đủ chín (như Signals ở ví dụ mốc trước) → thêm vào khung
  ở level phù hợp, không đợi tới khi khung đã lỗi thời mới sửa toàn bộ.
- Mỗi Senior/Specialist khi thấy kỹ năng mình đang làm chưa có trong khung
  → có kênh đề xuất bổ sung (như tiêu chí Microfrontends ở mốc Specialist·V1).
- Khung được version hoá (v1, v2...) để biết ai được đánh giá theo tiêu chí nào,
  tránh tranh cãi "sao lúc em lên Senior không cần cái này".
```
Đây chính là bản chất của trang SkillPath này — một khung năng lực sống, được cập nhật liên tục thay vì viết một lần rồi để đó nhiều năm.

**Vì sao là mức ④:** bạn thiết kế được cơ chế đào tạo/đánh giá cho toàn bộ vòng đời nghề nghiệp, có khả năng tự cập nhật — mức cao nhất, không chỉ một lộ trình cho một chặng cụ thể.
