# Quy trình phát triển phần mềm (Agile / Scrum)

**Định nghĩa.** **Agile** là nhóm phương pháp phát triển phần mềm theo kiểu *lặp – tăng tiến* (iterative & incremental): chia việc thành chu kỳ ngắn, giao giá trị sớm, lấy phản hồi liên tục và thích ứng với thay đổi thay vì làm một mạch theo kế hoạch cứng. **Scrum** là khung Agile phổ biến nhất, gồm: **Sprint** (chu kỳ 1–4 tuần), ba **vai** (Product Owner giữ giá trị sản phẩm, Scrum Master gỡ rào quy trình, Development Team thực thi), bốn **sự kiện** (Sprint Planning, Daily Standup, Sprint Review, Retrospective) và ba **tạo phẩm** (Product Backlog, Sprint Backlog, Increment). Với một dev, đây là "luật chơi" của cả đội — không nắm thì làm đúng code vẫn lệch nhịp đội.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu mình đang ở đâu trong một Sprint, biết nhận và cập nhật task trên board (Jira/Trello), tham gia Daily đúng cách, và hiểu thế nào là "xong" (Definition of Done).

**Ví dụ thực tế — một ngày trong Sprint.** Bạn nhận task "Dựng form đổi mật khẩu" từ Sprint Backlog, kéo thẻ `To Do → In Progress`. Trong Daily bạn báo theo đúng 3 ý:
```
- Hôm qua: dựng xong UI form đổi mật khẩu.
- Hôm nay: nối API /change-password, thêm validation.
- Vướng: chưa rõ thông báo lỗi khi mật khẩu cũ sai → cần hỏi PO.
```
Task chỉ kéo sang `Done` khi đạt Definition of Done (code + self-test + review), không phải khi "chạy được trên máy mình".

**Vì sao là mức ①:** bạn theo được nhịp đội và quy ước, nhưng chưa tự chẻ việc hay ước lượng.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** bạn tự chẻ một yêu cầu thành các task nhỏ, ước lượng được, và viết/hiểu tiêu chí nghiệm thu (acceptance criteria) để biết khi nào việc thực sự xong.

**Ví dụ thực tế — chẻ một User Story.** Story: *"Là người dùng, tôi muốn đặt lại mật khẩu khi quên để vào lại tài khoản."* Bạn chẻ và ước lượng:
```
[FE] Form quên mật khẩu + validate email      — 2 point
[BE] API gửi email đặt lại (token 15 phút)     — 3 point
[FE] Trang đặt mật khẩu mới từ link             — 2 point
[QA] Kịch bản test luồng hết hạn token          — 1 point
```
Và viết tiêu chí nghiệm thu dạng Given/When/Then để mọi người hiểu giống nhau:
```gherkin
Scenario: Nhận email đặt lại mật khẩu
  Given người dùng đã đăng ký với email "a@vcs.com"
  When họ gửi yêu cầu quên mật khẩu
  Then hệ thống gửi email chứa link đặt lại có hiệu lực 15 phút
```

**Vì sao là mức ②:** bạn tự chia & ước lượng việc của mình, ít lệ thuộc hướng dẫn.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** vẫn "biết làm" nhưng chủ động hơn ở phạm vi đội — đóng góp trong Backlog Refinement, phát hiện sớm rủi ro tiến độ, và nêu cải tiến trong Retrospective.

**Ví dụ thực tế — Refinement & Retro.** Trong buổi refinement, bạn đọc story "Xuất báo cáo" và phát hiện thiếu ràng buộc → đặt câu hỏi cho PO: *"Báo cáo xuất PDF hay Excel? Giới hạn bao nhiêu dòng? Có cần lọc theo ngày không?"* — chặn việc làm xong rồi mới biết sai. Trong Retro, bạn nêu vấn đề cụ thể kèm đề xuất:
```
Vấn đề: review code dồn cuối Sprint → nghẽn 2 ngày cuối.
Đề xuất: review trong ngày, mỗi PR < 400 dòng để review nhanh.
```

**Vì sao vẫn là ②:** bạn vận hành tốt trong quy trình và đóng góp cải tiến, nhưng chưa ở mức dẫn dắt cả đội.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** bạn vận dụng linh hoạt best practice vào dự án thật, dẫn dắt được các buổi Scrum hiệu quả, và nhận diện/chữa anti-pattern (scope creep, Daily lan man thành báo cáo, story quá to).

**Ví dụ thực tế — dẫn một Sprint khoẻ.** Bạn đặt **WIP limit** (giới hạn số task "In Progress" đồng thời) để đội không ôm dở dang quá nhiều; đọc **burndown chart** giữa Sprint thấy đường thực tế nằm trên đường lý tưởng → cảnh báo sớm và cùng PO cắt bớt scope thay vì để trễ vào ngày cuối; dẫn refinement gọn bằng cách timebox mỗi story 10 phút. Bạn cũng kèm người mới hiểu "vì sao" đằng sau mỗi nghi thức, không chỉ làm theo.

**Vì sao là mức ③:** bạn không chỉ tuân thủ mà điều chỉnh quy trình cho hợp dự án và nâng cả đội.
