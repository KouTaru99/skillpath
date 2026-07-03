# Kỹ thuật thiết kế kiểm thử

**Định nghĩa.** Cách **chọn ra bộ test case đủ tốt** mà không cần test hết mọi khả năng (bất khả thi). **Kiểm thử hộp đen** (black-box) thiết kế test dựa trên input/output mà không quan tâm code bên trong, gồm các kỹ thuật phổ biến: **phân vùng tương đương** (equivalence partitioning — chia input thành các nhóm có hành vi giống nhau, chỉ cần test đại diện mỗi nhóm) và **phân tích giá trị biên** (boundary value analysis — lỗi hay xảy ra ở giá trị biên, ví dụ đúng ngưỡng cho phép). **Kiểm thử dựa trên kinh nghiệm** dùng trực giác/kinh nghiệm của Tester để đoán chỗ hay lỗi, không theo công thức cứng.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Biết và áp dụng được kỹ thuật hộp đen phổ biến khi có hướng dẫn.

**Ví dụ thực tế.** Tính năng "Khoá tài khoản sau N lần đăng nhập sai" của hệ thống giám sát, với N cấu hình = 5. Áp dụng **phân tích giá trị biên**, bạn test tại các mốc quan trọng: sai lần thứ 4 (chưa khoá), sai lần thứ 5 (đúng ngưỡng, phải khoá), và sai lần thứ 6 (đã khoá từ trước, không cho thử tiếp) — thay vì test tràn lan từ lần 1 đến lần 20.

**Vì sao là mức ①:** áp dụng đúng kỹ thuật khi được hướng dẫn cụ thể, chưa cần tự chọn kỹ thuật phù hợp cho ca lạ.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** áp dụng **thành thạo** cả hộp đen lẫn kiểm thử dựa kinh nghiệm, và biết **tự chọn** kỹ thuật phù hợp với từng loại input.

**Ví dụ thực tế.** Trường dữ liệu "Mức độ nghiêm trọng" của cảnh báo nhận giá trị enum: Thấp/Trung bình/Cao. Bạn dùng **phân vùng tương đương**: chỉ cần test 1 giá trị đại diện mỗi mức (không cần test tất cả input string linh tinh cho enum). Song song, dựa **kinh nghiệm** làm việc với các hệ thống giám sát trước đây, bạn nghi ngờ chỗ dễ lỗi là khi nhiều cảnh báo cùng mức "Cao" xảy ra đồng thời — bạn chủ động test case này dù tài liệu không yêu cầu, và phát hiện dashboard bị lỗi sắp xếp thứ tự khi có từ 3 cảnh báo "Cao" cùng lúc.

**Vì sao là mức ②:** không chỉ áp dụng công thức mà biết chọn đúng công thức, và bổ sung bằng trực giác nghề nghiệp.
