# Tổ chức seminar / chia sẻ công nghệ

**Định nghĩa.** Chuẩn bị và trình bày một buổi chia sẻ kiến thức/công nghệ cho team — giúp kiến thức không chỉ nằm trong đầu một người. Khác [mentor](/fe/ky-nang/29-mentor) (dẫn dắt 1-1 theo tình huống phát sinh): đây là chia sẻ **chủ động, có chuẩn bị**, cho nhiều người cùng lúc.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Chuẩn bị và trình bày được một buổi chia sẻ ngắn (30–45 phút) cho nhóm nhỏ, về một chủ đề kỹ thuật cụ thể mình đã áp dụng thực tế — không phải lý thuyết chưa kiểm chứng.

**Ví dụ thực tế — cấu trúc một buổi chia sẻ "NgRx effect: những lỗi hay gặp" (rút từ kinh nghiệm thật của team).**
```
1. Vấn đề thật gặp phải (5 phút)
   "Tuần trước team mình bị lỗi: effect gọi API 2 lần khi user bấm nút nhanh."

2. Giải thích nguyên nhân + demo trực tiếp (15 phút)
   Live-code tái hiện lỗi, rồi sửa bằng switchMap thay vì mergeMap.

3. Rút ra quy tắc chung để áp dụng tiếp (10 phút)
   "Khi nào dùng switchMap/mergeMap/concatMap" — bảng so sánh ngắn.

4. Hỏi đáp (10 phút)
```
Bắt đầu từ **vấn đề thật của chính team** (không phải "hôm nay nói về RxJS") khiến người nghe thấy ngay liên quan tới công việc của họ, dễ nhớ hơn một buổi lý thuyết chung chung.

**Vì sao là mức ①:** bạn chuẩn bị và trình bày tốt cho nhóm nhỏ về một chủ đề mình nắm chắc — chưa tự tổ chức chuỗi chia sẻ định kỳ hay diễn giả cho quy mô lớn hơn.

## ▸ Senior·V3 — ② Biết làm
**Khác V1:** tổ chức được một **chuỗi chia sẻ định kỳ** cho cả bộ phận (nhiều nhóm), không chỉ một buổi đơn lẻ cho nhóm nhỏ.

**Ví dụ thực tế — khởi động "Tech Talk Friday" hàng tháng cho cả phòng Front-end.**
```
Tháng 1: bạn tự trình bày (mở đầu, làm mẫu format)
Tháng 2: mời 1 dev khác trình bày về việc họ vừa làm — bạn hỗ trợ chuẩn bị slide/nội dung trước
Tháng 3: mở form để mọi người tự đăng ký đề tài muốn chia sẻ
```
Bạn không tự ôm việc trình bày mãi — mục tiêu là xây được **thói quen chia sẻ** lan ra cả phòng, để kiến thức không dồn vào một vài người giỏi nói, mà được nhiều người tự tin đóng góp.

**Vì sao là mức ②:** bạn xây dựng được cơ chế chia sẻ kiến thức bền vững cho cả bộ phận — không chỉ tự mình trình bày tốt một buổi.
