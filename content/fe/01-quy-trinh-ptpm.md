# Quy trình phát triển phần mềm (Agile / Scrum)

**Định nghĩa.** **Agile** là nhóm phương pháp phát triển phần mềm theo kiểu *lặp – tăng tiến* (iterative & incremental): chia việc thành chu kỳ ngắn, giao giá trị sớm, lấy phản hồi liên tục và thích ứng thay đổi thay vì làm một mạch theo kế hoạch cứng. **Scrum** là khung Agile phổ biến nhất: **Sprint** (chu kỳ 1–4 tuần), ba **vai** (Product Owner giữ giá trị sản phẩm, Scrum Master gỡ rào quy trình, Development Team thực thi), bốn **sự kiện** (Sprint Planning, Daily Standup, Sprint Review, Retrospective), ba **tạo phẩm** (Product Backlog, Sprint Backlog, Increment). Với một dev, đây là "luật chơi" của đội — không nắm thì code đúng vẫn lệch nhịp.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu mình đang ở đâu trong Sprint, nhận và cập nhật task trên board (Jira), tham gia Daily đúng cách, hiểu Definition of Done.

**Ví dụ thực tế — một ngày trong Sprint.** Bạn nhận task "Dựng form đổi mật khẩu", kéo thẻ `To Do → In Progress`. Trong Daily báo đúng 3 ý:
```
- Hôm qua: dựng xong UI form đổi mật khẩu.
- Hôm nay: nối API /change-password, thêm validation.
- Vướng: chưa rõ thông báo lỗi khi mật khẩu cũ sai → cần hỏi PO.
```
Task chỉ sang `Done` khi đạt Definition of Done (code + self-test + review), không phải khi "chạy trên máy mình".

**Vì sao là mức ①:** theo được nhịp đội và quy ước, chưa tự chẻ việc hay ước lượng.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Tự chẻ một yêu cầu thành task nhỏ, ước lượng được, viết/hiểu tiêu chí nghiệm thu để biết khi nào việc thực sự xong.

**Ví dụ thực tế — chẻ một User Story.** Story: *"Là người dùng, tôi muốn đặt lại mật khẩu khi quên."* Bạn chẻ + ước lượng:
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

**Vì sao là mức ②:** tự chia & ước lượng việc của mình, ít lệ thuộc hướng dẫn.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** chủ động ở phạm vi đội — đóng góp trong Backlog Refinement, phát hiện sớm rủi ro tiến độ, nêu cải tiến trong Retrospective.

**Ví dụ 1 — chặn story mơ hồ ở Refinement.** Đọc story "Xuất báo cáo" bạn hỏi PO ngay: *"Xuất PDF hay Excel? Giới hạn bao nhiêu dòng? Lọc theo ngày không?"* — chặn việc làm xong rồi mới biết sai.

**Ví dụ 2 — Retro có đề xuất cụ thể.**
```
Vấn đề: review code dồn 2 ngày cuối Sprint → nghẽn.
Đề xuất: review trong ngày, mỗi PR < 400 dòng để review nhanh.
Kết quả kỳ vọng: giảm task "In Review" tồn cuối Sprint.
```

**Vì sao vẫn là ②:** vận hành tốt trong quy trình + đóng góp cải tiến, chưa ở mức dẫn dắt.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** vận dụng linh hoạt best practice vào dự án thật, dẫn dắt các buổi Scrum, nhận diện/chữa anti-pattern (scope creep, Daily lan man, story quá to).

**Ví dụ 1 — đọc burndown để cứu Sprint sớm.** Giữa Sprint, đường thực tế nằm trên đường lý tưởng → bạn cảnh báo và cùng PO cắt scope story ưu tiên thấp thay vì để trễ vào ngày cuối; đặt **WIP limit** để đội không ôm quá nhiều task dở dang.

**Ví dụ 2 — chẩn một Daily "hỏng".** Daily kéo 40 phút thành họp báo cáo. Bạn chỉnh: timebox 15 phút, mỗi người chỉ nói 3 ý, mọi thảo luận sâu tách ra "parking lot" sau Daily → Daily về đúng mục đích đồng bộ nhanh.

**Ví dụ 3 — chẻ story quá to (đúng nguyên tắc INVEST).** Story "Làm trang quản trị" quá lớn → bạn chẻ theo lát giá trị mỏng (vertical slice): "xem danh sách" → "thêm mới" → "sửa/xoá", mỗi lát tự giao được giá trị trong 1 Sprint.

**Vì sao là mức ③:** không chỉ tuân thủ mà điều chỉnh quy trình cho hợp dự án và nâng cả đội.
