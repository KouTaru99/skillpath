# Khái niệm & nguyên lý kiểm thử

**Định nghĩa.** Bộ từ vựng nền tảng của nghề kiểm thử: **test case** (1 trường hợp kiểm thử cụ thể: input → kết quả mong đợi), **test suite** (tập hợp nhiều test case liên quan), **test data** (dữ liệu dùng để test). Phân biệt **bug/fault/defect** (lỗi trong sản phẩm, các từ gần nghĩa hay dùng thay nhau) với **failure** (biểu hiện lỗi ra bên ngoài khi chạy). **Bug Life Cycle** là vòng đời 1 lỗi đi qua các trạng thái: New → Assigned → Fixed → Retest → Closed (hoặc Reopen nếu fix chưa đúng).

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nói đúng thuật ngữ, viết được 1 test case đơn giản theo mẫu, và biết bug đi qua vòng đời nào khi report.

**Ví dụ thực tế.** Test case cho chức năng đăng nhập hệ thống giám sát:

| ID | Bước thực hiện | Dữ liệu test | Kết quả mong đợi |
|---|---|---|---|
| TC01 | Nhập sai mật khẩu 5 lần liên tiếp | user: `admin`, pass: `sai123` × 5 | Hệ thống khoá tài khoản 15 phút, hiện thông báo rõ ràng |

Khi chạy thấy tài khoản KHÔNG bị khoá, bạn report bug với trạng thái **New**, đội dev nhận và chuyển **Assigned**, sửa xong chuyển **Fixed**, bạn **Retest** lại đúng bước TC01, thấy đúng thì chuyển **Closed** — nếu vẫn sai thì **Reopen**, không tự ý đóng bug khi chưa test lại.

**Vì sao là mức ①:** dùng đúng thuật ngữ và quy trình cơ bản, chưa cần thiết kế bộ test case phức tạp (đó là kỹ năng "Kỹ thuật thiết kế kiểm thử" riêng).
