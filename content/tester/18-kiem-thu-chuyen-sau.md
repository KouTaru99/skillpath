# Kiểm thử chuyên sâu theo mảng (hiệu năng/bảo mật/thiết bị)

**Định nghĩa.** Ngoài kiểm thử chức năng thông thường, một số mảng đòi hỏi kỹ thuật & công cụ chuyên biệt: **kiểm thử hiệu năng** (performance — hệ thống chịu tải bao nhiêu, phản hồi nhanh chậm ra sao); **kiểm thử bảo mật** (security — tìm lỗ hổng có thể bị khai thác); **kiểm thử thiết bị** (device — với hệ thống có phần cứng/IoT đi kèm). Ở Senior, bạn thành thạo *quy trình & công cụ* các mảng này; lên Specialist mới là *chuyên gia* thật sự của một mảng (xem trang "Kiểm thử chuyên sâu ở mức chuyên gia").

## ▸ Senior·V1 — ③ Thành thạo
**Ở mức này bạn làm chủ được gì.** Tự thực hiện độc lập kiểm thử chuyên sâu (không cần hướng dẫn từng bước) — chọn đúng công cụ, thiết kế kịch bản tải/tấn công, đọc và diễn giải được kết quả.

**Tình huống thực tế 1 — kiểm thử hiệu năng "Tương quan cảnh báo" bằng JMeter.** Yêu cầu: gộp cảnh báo phải xong trong 5 giây kể cả khi tải cao. Bạn tự thiết kế kịch bản tải và đọc kết quả:

```
KỊCH BẢN TẢI (JMeter) — mô phỏng đợt tấn công diện rộng
  - Đổ 1000 cảnh báo trong 10 giây (100 cảnh báo/giây)
  - Đo: thời gian tương quan xong · tỉ lệ gộp ĐÚNG khi tải cao

KẾT QUẢ ĐỌC ĐƯỢC:
  100 cb/s  → tương quan trung bình 2.1s  ✓ (< 5s)
  200 cb/s  → tương quan trung bình 4.8s  ⚠️ (sát ngưỡng)
  300 cb/s  → tương quan 9s + 2% cảnh báo GỘP SAI  ✗
             → BUG hiệu năng: dưới tải cao, cửa sổ tương quan
               bị trượt → gộp nhầm/sót. Không lộ khi test tải thấp.

  → Báo cáo kèm ngưỡng chịu tải thật (an toàn tới ~200 cb/s),
    để sản phẩm biết giới hạn trước khi khách gặp đợt tấn công thật.
```

**Tình huống thực tế 2 — kiểm thử bảo mật cơ bản, tự chủ.** Bạn tự chạy một lượt kiểm tra bảo mật trên các ô input của sản phẩm: thử các payload XSS (`<script>alert(1)</script>`) và SQL injection phổ biến, kiểm tra hệ thống có escape/tham số hoá đúng không; thử gọi API nhạy cảm khi thiếu quyền (kiểm tra trả 403, không rò dữ liệu). Không cần chuyên gia bảo mật cầm tay — bạn tự làm được vòng kiểm tra nền.

**Vì sao là mức ③:** thực hiện độc lập cả thiết kế lẫn diễn giải kết quả kiểm thử chuyên sâu; ở Specialist mới đẩy lên mức **chuyên gia** một mảng (tự xây phương pháp, tư vấn cho nhiều dự án — xem trang Specialist tương ứng).
