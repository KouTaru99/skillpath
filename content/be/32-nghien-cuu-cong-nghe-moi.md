# Nghiên cứu & phát triển công nghệ mới (R&D)

**Định nghĩa.** Chủ động tìm hiểu công nghệ/xu hướng mới, đánh giá khách quan khả năng áp dụng vào giải pháp thực tế của đơn vị — dám kết luận "không nên dùng" nếu bằng chứng cho thấy vậy.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tự tìm hiểu một công nghệ mới, làm PoC nhỏ để đánh giá, trình bày kết quả khách quan.

**Ví dụ thực tế — PoC đánh giá Virtual Threads (Java 21+) có nên thay Thread pool truyền thống không.**
```
Đã làm: viết lại 1 API xử lý nhiều request I/O-bound bằng Virtual Threads, đo:
- Throughput: xử lý được nhiều request đồng thời hơn hẳn (Virtual Thread rẻ hơn nhiều).
- Hạn chế: code dùng synchronized cũ có thể "ghim" virtual thread vào carrier
  thread thật, mất một phần lợi ích — cần rà lại code cũ trước khi áp dụng đại trà.

Kết luận: tiềm năng tốt cho service I/O-bound nặng, nhưng CẦN rà code cũ trước.
Chưa áp dụng đại trà ngay.
```
Bạn trình bày trung thực cả điểm được lẫn rủi ro cần xử lý trước.

**Vì sao là mức ①:** tự nghiên cứu và đánh giá khách quan một công nghệ cụ thể qua PoC — chưa dẫn dắt chiến lược áp dụng cho nhiều dự án.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** dẫn dắt việc áp dụng thử nghiệm có kiểm soát cho công nghệ đã qua PoC, trước khi nhân rộng.

**Ví dụ thực tế — áp dụng thử Virtual Threads cho một service thật, phạm vi giới hạn.** Bước 1: áp dụng cho đúng 1 service ít quan trọng, dễ revert. Bước 2: thu thập phản hồi thật từ dev đã dùng. Bước 3: dựa trên phản hồi thật, quyết định mở rộng hay dừng ở mức thử nghiệm.

**Vì sao là mức ②:** bạn dẫn dắt được việc đưa công nghệ mới vào dùng thật có kiểm soát.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** tự phát triển một công nghệ/công cụ riêng khi không có sẵn giải pháp phù hợp trên thị trường.

**Ví dụ thực tế — tự phát triển công cụ kiểm tra tương thích ngược giữa các phiên bản API nội bộ.** Các công cụ có sẵn trên thị trường thiết kế cho API công khai, không phù hợp quy ước nội bộ của công ty. Bạn dẫn dắt xây một công cụ nhỏ, chuyên biệt: so sánh 2 file OpenAPI spec, tự phát hiện breaking change theo đúng quy ước công ty, chạy như một bước CI.

**Vì sao là mức ④:** bạn tự phát triển được công nghệ/công cụ mới khi thị trường chưa có giải pháp phù hợp.
