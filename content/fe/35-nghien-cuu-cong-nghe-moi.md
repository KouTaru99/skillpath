# Nghiên cứu & phát triển công nghệ mới (R&D)

**Định nghĩa.** Chủ động tìm hiểu công nghệ/xu hướng mới, đánh giá **khách quan** khả năng áp dụng vào giải pháp thực tế của đơn vị — không chờ ai giao việc mà tự nghiên cứu, và quan trọng không kém: dám kết luận "không nên dùng" nếu bằng chứng cho thấy vậy, thay vì cố biện minh cho công nghệ mình đã bỏ công tìm hiểu.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tự tìm hiểu một công nghệ mới, làm một **proof-of-concept (PoC)** nhỏ để đánh giá có đáng áp dụng không, và trình bày kết quả khách quan — kể cả khi kết luận là "chưa nên dùng".

**Ví dụ thực tế — PoC đánh giá Signals (Angular) có nên thay RxJS cho quản lý state đơn giản không.**
```
Mục tiêu PoC: so sánh Signals vs RxJS BehaviorSubject cho state đơn giản (giỏ hàng).

Đã làm: viết lại CartStore bằng Signals, đo:
- Boilerplate: Signals ít code hơn ~30% cho state đơn giản.
- Học curve: team đã quen RxJS, cần ~1 tuần làm quen Signals.
- Hạn chế: Signals CHƯA thay được RxJS cho luồng phức tạp (debounce, switchMap)
  — vẫn cần RxJS cho phần đó, nên dự án sẽ phải dùng CẢ HAI song song.

Kết luận: PoC cho thấy lợi ích (ít boilerplate) không đủ bù chi phí (2 cách quản lý
state cùng lúc trong 1 dự án, dễ gây lẫn lộn). Đề xuất: CHƯA áp dụng đại trà,
theo dõi thêm khi Angular hỗ trợ Signals đầy đủ hơn cho luồng phức tạp.
```
Bạn trình bày trung thực cả điểm được lẫn chưa được — không "bán" công nghệ mới chỉ vì đã bỏ công tìm hiểu nó.

**Vì sao là mức ①:** bạn tự nghiên cứu và đánh giá khách quan được một công nghệ cụ thể qua PoC — chưa tự dẫn dắt cả một chiến lược áp dụng công nghệ mới cho nhiều dự án.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** dẫn dắt được việc **áp dụng thử nghiệm có kiểm soát** cho một công nghệ đã qua PoC (không dừng ở đánh giá, mà đưa vào dùng thật ở phạm vi nhỏ trước khi nhân rộng).

**Ví dụ thực tế — áp dụng thử Signals (đã PoC ở mốc V1) cho một tính năng thật, phạm vi giới hạn.**
```
Bước 1 (1 tháng): áp dụng Signals cho ĐÚNG 1 tính năng nhỏ, không quan trọng
  (trang cài đặt cá nhân) — nếu có vấn đề, ảnh hưởng thấp, dễ revert.
Bước 2: thu thập phản hồi thật từ 2 dev đã dùng — tốc độ code, dễ debug không,
  có xung đột gì với phần RxJS còn lại không.
Bước 3: dựa trên phản hồi thật (không phải cảm tính), quyết định mở rộng phạm vi
  áp dụng hay dừng lại ở mức thử nghiệm.
```
Bạn kiểm soát rủi ro bằng cách áp dụng ở phạm vi nhỏ, có thể revert trước — không nhảy thẳng từ PoC sang áp dụng toàn bộ dự án.

**Vì sao là mức ②:** bạn dẫn dắt được việc đưa công nghệ mới vào dùng thật một cách có kiểm soát — không chỉ dừng ở đánh giá lý thuyết qua PoC.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** **tự phát triển** một công nghệ/công cụ riêng khi không có sẵn giải pháp phù hợp trên thị trường — đúng nghĩa "R&D", không chỉ đánh giá công nghệ có sẵn.

**Ví dụ thực tế — tự phát triển công cụ nội bộ vì giải pháp có sẵn trên thị trường không phù hợp.** Đơn vị cần một công cụ kiểm tra tương thích ngược (backward compatibility) giữa các phiên bản API nội bộ trước khi release — các công cụ có sẵn trên thị trường đều thiết kế cho API công khai (public API), không phù hợp với quy ước đặt tên và cấu trúc nội bộ riêng của công ty. Bạn dẫn dắt xây một công cụ nhỏ, chuyên biệt:
```
Công cụ tự phát triển: so sánh 2 file OpenAPI spec (version cũ vs mới),
tự động phát hiện breaking change (xoá field, đổi kiểu dữ liệu, đổi field bắt buộc)
theo đúng quy ước đặt tên/cấu trúc mà công ty đang dùng — chạy như một bước trong CI.
```
Bạn không cố "uốn" một công cụ ngoài không phù hợp cho vừa nhu cầu — mà nhận ra khoảng trống thật sự và tự xây giải pháp mới, dù nhỏ.

**Vì sao là mức ④:** bạn tự phát triển được công nghệ/công cụ mới khi thị trường chưa có giải pháp phù hợp — đúng bản chất "phát triển riêng 1 công nghệ mới" mà career-path Specialist nhấn mạnh.
