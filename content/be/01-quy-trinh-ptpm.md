# Quy trình phát triển phần mềm (Agile / Scrum)

**Định nghĩa.** **Agile** là nhóm phương pháp phát triển phần mềm theo kiểu *lặp – tăng tiến* (iterative & incremental): chia việc thành chu kỳ ngắn, giao giá trị sớm, lấy phản hồi liên tục thay vì làm một mạch theo kế hoạch cứng. **Scrum** là khung Agile phổ biến nhất: **Sprint** (chu kỳ 1–4 tuần), ba **vai** (Product Owner giữ giá trị sản phẩm, Scrum Master gỡ rào quy trình, Development Team thực thi), bốn **sự kiện** (Sprint Planning, Daily Standup, Sprint Review, Retrospective), ba **tạo phẩm** (Product Backlog, Sprint Backlog, Increment). Với một dev Back-end, đây là "luật chơi" của đội — API đúng logic vẫn lệch nhịp nếu không nắm quy trình.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu mình đang ở đâu trong Sprint, nhận và cập nhật task trên board (Jira), tham gia Daily đúng cách, hiểu Definition of Done.

**Ví dụ thực tế — một ngày trong Sprint.** Bạn nhận task "Viết API lấy danh sách đơn hàng theo trạng thái", kéo thẻ `To Do → In Progress`. Trong Daily báo đúng 3 ý:
```
- Hôm qua: dựng xong entity Order + repository.
- Hôm nay: viết API GET /api/orders?status=..., thêm phân trang.
- Vướng: chưa rõ status "đã huỷ" có tính vào tổng doanh thu không → cần hỏi PO.
```
Task chỉ sang `Done` khi đạt Definition of Done (code + unit test + review), không phải khi "chạy trên máy mình".

**Vì sao là mức ①:** theo được nhịp đội và quy ước, chưa tự chẻ việc hay ước lượng.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Tự chẻ một yêu cầu thành task nhỏ, ước lượng được, viết/hiểu tiêu chí nghiệm thu để biết khi nào việc thực sự xong.

**Ví dụ thực tế — chẻ một User Story.** Story: *"Là hệ thống, cần gửi email xác nhận khi đơn hàng được tạo."* Bạn chẻ + ước lượng:
```
[BE] API tạo đơn hàng, phát sự kiện OrderCreated     — 2 point
[BE] Service lắng nghe sự kiện, gửi email             — 3 point
[QA] Kịch bản test: email gửi đúng nội dung, đúng địa chỉ — 1 point
```
Và viết tiêu chí nghiệm thu dạng Given/When/Then:
```gherkin
Scenario: Gửi email khi tạo đơn hàng thành công
  Given khách hàng đã có email hợp lệ trong hệ thống
  When đơn hàng được tạo thành công
  Then hệ thống gửi email xác nhận trong vòng 1 phút
```

**Vì sao là mức ②:** tự chia & ước lượng việc của mình, ít lệ thuộc hướng dẫn.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V1:** hiểu sâu bản chất Agile/Scrum — vận dụng linh hoạt, nhận diện và chữa anti-pattern (scope creep, story quá to), không chỉ làm đúng thủ tục.

**Ví dụ thực tế — chẻ story quá to theo nguyên tắc INVEST.** Story "Xây API quản lý đơn hàng" quá lớn cho 1 Sprint. Bạn chẻ theo lát giá trị mỏng (vertical slice):
```
Sprint 1: API tạo đơn + xem chi tiết (đủ để demo 1 luồng hoàn chỉnh)
Sprint 2: API cập nhật trạng thái + huỷ đơn
Sprint 3: API tìm kiếm/lọc/phân trang
```
Mỗi lát đều tự giao được giá trị dùng ngay (không phải "phải xong cả 3 lát mới demo được"), thay vì chẻ theo tầng kỹ thuật (Sprint 1: chỉ có Entity, Sprint 2: chỉ có Repository...) khiến không Sprint nào demo được gì cho PO.

**Vì sao là mức ③:** vận dụng nguyên tắc Agile để chẻ việc thông minh, không chỉ tuân thủ hình thức.

## ▸ Senior·V2 — ④ Chuyên sâu
**Khác Ex·V3:** hiểu đủ sâu để **chọn đúng khung quy trình cho từng loại dự án**, không áp Scrum như công thức duy nhất.

**Ví dụ thực tế — đề xuất Kanban cho dự án vận hành/bảo trì hệ thống cũ.** Dự án support-heavy nhận yêu cầu sửa lỗi/nâng cấp nhỏ lẻ tẻ suốt ngày — dồn thành Sprint 2 tuần không hợp lý (việc mới tới liên tục, không đợi được). Bạn đề xuất **Kanban**: không Sprint cố định, giới hạn **WIP** theo cột, đo bằng **lead time** thay vì velocity — khớp bản chất công việc hơn Scrum.

**Vì sao là mức ④:** bạn hiểu quy trình đủ sâu để **chọn** (không chỉ vận hành) khung phù hợp bản chất từng dự án.
