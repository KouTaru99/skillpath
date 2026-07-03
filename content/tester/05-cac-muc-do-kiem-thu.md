# Các mức độ kiểm thử

**Định nghĩa.** Phân loại kiểm thử theo **phạm vi hệ thống được test**, từ nhỏ tới lớn: **kiểm thử thành phần** (component testing — test riêng 1 module/hàm, cô lập khỏi phần còn lại), **kiểm thử tích hợp** (integration — test khi các thành phần ghép lại với nhau, ví dụ module cảnh báo gọi đúng module gửi email không), **kiểm thử hệ thống** (system — test toàn bộ hệ thống hoàn chỉnh như người dùng thật sẽ dùng), **kiểm thử chấp nhận** (acceptance — khách hàng/người dùng cuối xác nhận sản phẩm đáp ứng đúng nhu cầu trước khi nghiệm thu).

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Phân biệt đúng 4 mức độ, biết mình đang test ở mức nào trong từng giai đoạn dự án.

**Ví dụ thực tế.** Module "Phát hiện đăng nhập bất thường" của hệ thống giám sát an ninh mạng được phát triển độc lập trước — dev tự viết **kiểm thử thành phần** (unit test) cho hàm đếm số lần đăng nhập sai. Khi module này được ghép với module "Gửi cảnh báo qua email/Slack", bạn làm **kiểm thử tích hợp**: giả lập 5 lần đăng nhập sai, kiểm tra module cảnh báo có nhận đúng tín hiệu và gọi đúng module gửi thông báo không. Khi cả hệ thống hoàn chỉnh chạy trên môi trường staging, bạn làm **kiểm thử hệ thống**: đăng nhập sai thật 5 lần từ trình duyệt, xác nhận email cảnh báo thực sự tới hộp thư quản trị viên. Cuối cùng, đại diện phòng An ninh mạng (người dùng thực tế) tự tay thao tác và ký xác nhận — đó là **kiểm thử chấp nhận**.

**Vì sao là mức ①:** biết đúng khái niệm và nhận diện được mình đang ở mức nào — chưa cần tự thiết kế chiến lược phối hợp giữa các mức (đó là việc của Senior khi xây kế hoạch kiểm thử tổng thể).
