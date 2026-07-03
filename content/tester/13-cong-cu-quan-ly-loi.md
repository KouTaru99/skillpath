# Công cụ quản lý lỗi & yêu cầu thay đổi

**Định nghĩa.** Công cụ (như Jira, Redmine, Azure DevOps) để **report bug** theo chuẩn (mô tả, bước tái hiện, kết quả mong đợi/thực tế, mức độ nghiêm trọng, môi trường) và theo dõi **vòng đời xử lý**, đồng thời quản lý các **yêu cầu thay đổi** (change request) phát sinh giữa dự án — ai đề xuất, ảnh hưởng gì, đã duyệt chưa.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Report được 1 bug rõ ràng, đủ thông tin để dev tái hiện lại được mà không cần hỏi lại nhiều lần.

**Ví dụ thực tế.** Bug report cho hệ thống giám sát an ninh mạng:
- **Tiêu đề:** Cảnh báo mức "Cao" không gửi email dù cấu hình đã bật
- **Bước tái hiện:** 1) Bật cấu hình gửi email cho mức Cao ở Settings → 2) Tạo 1 cảnh báo mức Cao bằng cách đăng nhập sai 5 lần → 3) Kiểm tra hộp thư quản trị viên
- **Kết quả mong đợi:** Nhận được email trong vòng 5 giây
- **Kết quả thực tế:** Không nhận được email sau 5 phút
- **Môi trường:** Staging, Chrome 128, tài khoản `qa_test01`
- **Mức độ:** Cao (ảnh hưởng chức năng cốt lõi của hệ thống an ninh)

**Vì sao là mức ①:** report đủ thông tin để người khác tái hiện và xử lý mà không cần dò hỏi lại — đây là kỹ năng nền tảng nhất của nghề Tester, dù ở level nào cũng cần làm tốt việc này.
