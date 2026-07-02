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

## ▸ Specialist·V1 — ③ Thành thạo
**Khác Senior·V3:** trình bày được cho **quy mô lớn hơn nhiều** (nhiều phòng ban, hoặc bên ngoài đơn vị) — về công nghệ mới hoặc kết quả nghiên cứu (R&D), không chỉ chia sẻ nội bộ nhóm nhỏ.

**Ví dụ thực tế — trình bày kết quả PoC công nghệ mới cho toàn bộ các phòng ban kỹ thuật.** Sau khi làm PoC đánh giá một công nghệ mới (ở kỹ năng "Nghiên cứu công nghệ mới"), bạn trình bày kết quả không chỉ cho team mình mà cho đại diện nhiều phòng ban khác nhau cùng quan tâm — vì kết luận PoC ảnh hưởng tới quyết định công nghệ chung. Bạn điều chỉnh cách trình bày: ít chi tiết code hơn, nhiều hơn về **tác động** (ai bị ảnh hưởng, chi phí chuyển đổi, mốc thời gian) — vì khán giả đa dạng vai trò hơn, không phải toàn dev cùng chuyên môn.

**Vì sao là mức ③:** bạn trình bày hiệu quả cho khán giả đa dạng, quy mô lớn hơn hẳn nhóm nhỏ — điều chỉnh nội dung theo đối tượng nghe, không chỉ lặp lại format cũ ở quy mô lớn hơn.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V1:** xây dựng được **văn hoá chia sẻ tri thức ở tầm toàn công ty** (không chỉ một chuỗi sự kiện của một phòng ban) — nhiều phòng ban tự tổ chức được, không cần bạn đứng ra mỗi lần.

**Ví dụ thực tế — nhân rộng mô hình "Tech Talk" từ một phòng ban ra toàn công ty.** Mô hình "Tech Talk Friday" bạn khởi động ở phòng Front-end (mốc Senior) chạy tốt sau nhiều tháng. Bạn tổng hợp thành một **playbook** (mô hình + checklist tổ chức + mẫu form đăng ký đề tài) và chia sẻ cho các phòng ban khác (Back-end, QA, DevOps) tự áp dụng theo cách của họ — không cần bạn trực tiếp tổ chức cho từng phòng. Sau 1 năm, công ty có 4 chuỗi Tech Talk độc lập ở 4 phòng ban, đều bắt nguồn từ một mô hình chung.

**Vì sao là mức ④:** bạn tạo ra được ảnh hưởng ở tầm **toàn công ty** thông qua việc nhân rộng mô hình cho người khác tự vận hành — mức cao nhất, không còn giới hạn trong một phòng ban hay một chuỗi sự kiện bạn trực tiếp đứng ra.
