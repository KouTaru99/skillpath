# Khái niệm & nguyên lý kiểm thử

**Định nghĩa.** Bộ từ vựng nền tảng của nghề: **test case** (một trường hợp kiểm thử: các bước + dữ liệu + kết quả mong đợi), **test suite** (tập test case liên quan), **test data** (dữ liệu dùng để test). Phân biệt **bug/defect** (lỗi nằm trong sản phẩm) với **failure** (biểu hiện lỗi lộ ra khi chạy — một bug có thể chưa bao giờ "phát bệnh" nếu không ai chạm đúng chỗ). **Bug Life Cycle** là vòng đời một lỗi: New → Assigned → Fixed → Retest → Closed (hoặc Reopen nếu fix chưa đúng). Kèm các nguyên lý kinh điển: test chỉ chứng minh **có lỗi**, không chứng minh được **hết lỗi**; lỗi thường **tụ đàn** (chỗ đã có bug hay có thêm bug).

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dùng đúng thuật ngữ, viết được test case chuẩn theo mẫu, report bug đủ để dev tái hiện được ngay, và đi đúng vòng đời bug không tắt.

**Tình huống thực tế — từ test case đến một bug report "dev không phải hỏi lại".** Bạn test chức năng khoá tài khoản của hệ thống giám sát an ninh mạng:

```
TEST CASE
  TC01 · Khoá tài khoản sau 5 lần sai mật khẩu
  Bước: đăng nhập sai liên tiếp 5 lần (user: test_qa01 / pass sai)
  Kết quả mong đợi: lần 6 bị chặn, thông báo "tài khoản tạm khoá
  15 phút", có ghi log sự kiện khoá.

CHẠY THẬT → FAIL → BUG REPORT (mẫu bạn luôn theo):
  [BUG-207] Tài khoản không bị khoá sau 5 lần sai mật khẩu
  Môi trường : test-server v2.3.1, Chrome 126
  Bước tái hiện: 1) mở /login  2) nhập test_qa01 + pass sai × 5
                 3) nhập tiếp lần 6 với pass sai
  Kết quả thực tế : lần 6 vẫn cho thử, không thông báo khoá
  Kết quả mong đợi: chặn từ lần 6, khoá 15 phút (spec GP-007 mục 2)
  Mức độ: HIGH — đây là tính năng chống dò mật khẩu
  Đính kèm: video 20s + log console
```

Bug đi vòng đời: bạn tạo **New** → dev **Assigned** → **Fixed** ở build v2.3.2 → bạn **Retest** đúng các bước trên: khoá đúng, nhưng bạn thử thêm "đợi 16 phút đăng nhập đúng" — vẫn bị chặn! Fix thiếu vế mở khoá → **Reopen** kèm bước tái hiện mới. Không tự ý Closed khi chỉ mới hết triệu chứng ban đầu.

**Vì sao là mức ①:** thuật ngữ, mẫu tài liệu và vòng đời bug đều chuẩn — nền móng để mọi kỹ năng kiểm thử khác xây lên; chưa cần thiết kế bộ test phức tạp (kỹ năng "Kỹ thuật thiết kế kiểm thử" riêng).
