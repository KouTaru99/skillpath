# Phân task cho thành viên dự án

**Định nghĩa.** Chẻ một tính năng/nhiệm vụ lớn thành các phần việc nhỏ hơn, giao đúng người đúng năng lực, đảm bảo các phần không chồng chéo hay chặn nhau, theo dõi tiến độ từng phần.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Chẻ được một tính năng có độ phức tạp vừa phải thành task con hợp lý, giao cho 2–3 người mà không bị chồng lấn.

**Tình huống thực tế — tính năng "API quản lý kho hàng cho admin".**
```
[BE] API list + filter tồn kho (phân trang)   → giao Dev A (mạnh về query CSDL)
[BE] API nhập/xuất kho + cập nhật số lượng     → giao Dev B, chốt schema TRƯỚC
[QA] Kịch bản test: nhập/xuất đồng thời cùng 1 sản phẩm (race condition) → giao sớm
```
Điểm mấu chốt: chốt **schema dữ liệu trước** để 2 việc chạy song song không chặn nhau.

**Vì sao là mức ①:** chẻ và giao được việc rõ ràng cho tính năng vừa phải — chưa xử lý xung đột năng lực/lịch phức tạp.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** xử lý được khi phân task gặp xung đột thật — người giỏi nhất đang bận việc khác.

**Tình huống thực tế — người duy nhất hiểu module thanh toán đang nghỉ phép, mà tính năng mới lại động vào đó.** Bạn tách việc: giao phần không đụng module thanh toán cho người khác làm trước, phần tích hợp thật dời lại; nhờ người sắp nghỉ để lại ghi chú ngắn về chỗ dễ vỡ trước khi nghỉ.

**Vì sao là mức ②:** bạn xử lý được tình huống phân task có ràng buộc thực tế, không chỉ khi mọi thứ thuận lợi.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** phân task khi phần việc phụ thuộc nhiều team khác nhau (không chỉ trong một team), phải điều phối lịch của các team không chung quản lý trực tiếp.

**Tình huống thực tế — tính năng cần 3 team độc lập (BE, DevOps, QA) cùng hoàn thành đúng hạn.** Bạn xác định điểm phụ thuộc rõ ràng (BE cần DevOps xong hạ tầng trước ngày X), trao đổi trực tiếp với lead team khác để chốt mốc, và có phương án dự phòng nếu team kia trễ (mock trước, tích hợp sau).

**Vì sao là mức ③:** bạn điều phối được phần việc phụ thuộc xuyên nhiều team độc lập.
