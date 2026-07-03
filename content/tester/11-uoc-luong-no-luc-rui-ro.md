# Ước lượng nỗ lực & rủi ro kiểm thử

**Định nghĩa.** Trước khi bắt tay test, Tester cần trả lời: "việc này mất bao lâu?" (ước lượng nỗ lực) và "cái gì có thể khiến việc test không kịp/không đủ?" (xác định rủi ro), để **báo sớm thay vì im lặng tới hạn mới biết không kịp**. Ước lượng tốt không phải đoán mò — mà là chia nhỏ công việc thành các phần đo được rồi cộng lại, kèm phần đệm cho việc test-lại sau khi dev fix bug.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Ước lượng nỗ lực và nhận diện rủi ro cho **task được giao** (một chức năng cụ thể) — chia nhỏ được, không phán một con số cảm tính.

**Tình huống thực tế — ước lượng test "Export báo cáo cảnh báo ra PDF".** Thay vì trả lời "chắc 2 ngày", bạn chia nhỏ để con số có cơ sở và lộ ra rủi ro:

```
ƯỚC LƯỢNG — Test Export báo cáo PDF

  Hạng mục                                    | Nỗ lực
  --------------------------------------------|--------
  Viết kịch bản test                          | 0.5 ngày
  Test dữ liệu ít / nhiều / RỖNG              | 0.5 ngày
  Test định dạng PDF trên 3 trình duyệt       | 0.5 ngày
  Test phân quyền (ai được export dữ liệu gì) | 0.5 ngày
  Đệm test-lại sau khi dev fix (~30%)         | 0.5 ngày
  --------------------------------------------|--------
  TỔNG                                        | 2.5 ngày

  RỦI RO ĐÃ NHẬN DIỆN (báo sớm):
  ⚠️ Chưa có dữ liệu mẫu ĐỦ LỚN (hàng nghìn cảnh báo) để test
     hiệu năng export → xin team chuẩn bị TRƯỚC, không thì tới
     lúc test mới phát hiện thiếu, trễ nửa ngày.
  ⚠️ Báo cáo chứa log an ninh nhạy cảm → phân quyền là vùng
     rủi ro cao, đã tách riêng 0.5 ngày (không gộp vào "test chung").
```

Việc tách hẳn dòng "đệm test-lại 30%" là dấu hiệu Tester biết nghề: bug được fix rồi vẫn phải test lại + hồi quy, ước lượng bỏ quên phần này là lý do phổ biến nhất khiến test trễ.

**Vì sao là mức ①:** ước lượng có cơ sở và nhận diện rủi ro đúng cho phạm vi task của chính mình; chưa lập kế hoạch cho nhiều task/nhiều người.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** ước lượng và lập kế hoạch cho **phạm vi rộng — cả một tính năng lớn/một phần dự án nhiều người** — biết xử lý phụ thuộc giữa các phần để không tắc nghẽn.

**Tình huống thực tế — lập kế hoạch test cho cả module "Cảnh báo tự động" (4 tính năng, 2 Tester).** Bạn không chỉ cộng nỗ lực mà phải sắp thứ tự theo phụ thuộc:

```
KẾ HOẠCH TEST MODULE CẢNH BÁO TỰ ĐỘNG (sprint 10 ngày, 2 Tester)

  Tính năng               | Nỗ lực | Phụ thuộc
  ------------------------|--------|---------------------------
  A. Sinh cảnh báo        | 1.5 ng | không — test được ngay
  B. Tương quan → sự cố   | 2 ng   | cần A xong (gộp cái gì?)
  C. Dashboard tổng hợp   | 1.5 ng | cần B xong (đếm sự cố)
  D. Gửi email/SMS        | 1 ng   | cần A xong
  TỔNG                    | 6 ngày công / 2 người = 3 ngày lịch

  RỦI RO LỚN NHẤT = CHUỖI PHỤ THUỘC A→B→C:
  Nếu chờ A xong hẳn mới làm B, B xong mới làm C → nối đuôi,
  1 khâu trễ là cả chuỗi trễ.

  ĐỀ XUẤT SẮP VIỆC (chống tắc nghẽn):
  - Tester 1: A trước (mở khoá cho B,D) → rồi B
  - Tester 2: D song song (chỉ cần A) → rồi hỗ trợ C sau khi B xong
  - Đề nghị dev giao A + B SỚM trong sprint (đầu chuỗi phụ thuộc),
    C giao muộn cũng được (cuối chuỗi).
```

Giá trị của mức này: nhìn ra **chuỗi phụ thuộc A→B→C là điểm gãy tiềm tàng** và chủ động đề xuất thứ tự giao việc cho cả dev lẫn Tester — quản lý rủi ro ở tầm nhiều người, không chỉ ước lượng việc mình.

**Vì sao là mức ②:** ước lượng và điều phối rủi ro ở phạm vi nhiều task/nhiều người có phụ thuộc lẫn nhau, không chỉ tính việc của riêng mình.
