# Phân task cho thành viên dự án

**Định nghĩa.** Chẻ một tính năng/nhiệm vụ lớn thành các phần việc nhỏ hơn, **giao đúng người đúng năng lực**, đảm bảo các phần việc không chồng chéo hay chặn nhau (blocking), và có thể theo dõi tiến độ từng phần. Khác [Quy trình PTPM](/fe/ky-nang/01-quy-trinh-ptpm) (tự chẻ việc *của mình*): ở đây bạn chẻ việc *cho người khác*, phải tính cả năng lực và lịch của họ.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Chẻ được một tính năng có độ phức tạp vừa phải thành các task con hợp lý, giao cho 2–3 người trong team mà không bị chồng lấn — dưới sự hỗ trợ của tech lead/PM khi cần quyết định khó.

**Tình huống thực tế — tính năng "Trang quản lý đơn hàng cho admin".**

Bạn chẻ theo ranh giới rõ (mỗi phần có thể làm song song, ít phụ thuộc nhau):
```
[FE] Trang danh sách đơn + bộ lọc theo trạng thái/ngày   → giao Dev A (mạnh về UI bảng dữ liệu)
[FE] Trang chi tiết đơn + nút đổi trạng thái              → giao Dev B (đang rảnh, việc vừa sức)
[BE] API list (phân trang, lọc) + API đổi trạng thái      → phối hợp với Back-end, chốt shape response TRƯỚC khi FE code
[QA] Kịch bản test: đổi trạng thái sai luồng (huỷ đơn đã giao) → giao sớm để QA chuẩn bị song song, không đợi code xong mới bắt đầu viết test case
```
Điểm mấu chốt: chốt **hợp đồng API trước** để 2 việc FE và việc BE chạy song song mà không chặn nhau; và giao việc QA sớm thay vì để cuối mới bắt đầu.

**Vì sao là mức ①:** bạn chẻ và giao được việc rõ ràng, không chồng chéo cho một tính năng vừa phải — chưa tự xử lý khi có xung đột năng lực/lịch phức tạp giữa nhiều người hoặc nhiều team.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** xử lý được khi phân task gặp **xung đột thật** — người giỏi nhất đang bận việc khác, hoặc hai task phụ thuộc chéo nhau.

**Tình huống thực tế — người duy nhất hiểu module thanh toán đang nghỉ phép 1 tuần, mà tính năng mới lại động vào đó.** Thay vì chờ, bạn tách phần việc: giao phần **không đụng module thanh toán** (UI, validate form) cho người khác làm trước; phần tích hợp thật với thanh toán dời lại tuần sau, đồng thời tranh thủ nhờ người sắp nghỉ để lại một đoạn ghi chú ngắn về những chỗ dễ vỡ trong module đó trước khi nghỉ — giảm rủi ro thay vì để cả tính năng đứng im chờ một người.

**Vì sao là mức ②:** bạn xử lý được tình huống phân task có ràng buộc thực tế (người, thời gian), không chỉ chẻ việc khi mọi thứ thuận lợi.
