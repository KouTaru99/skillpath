# Triển khai đa nền tảng hệ điều hành

**Định nghĩa.** Đảm bảo ứng dụng build/chạy/deploy được trên các hệ điều hành khác nhau — máy dev thường là Windows/macOS, nhưng server production hầu hết chạy **Linux**. "Chạy được trên máy mình" không có nghĩa là chạy được ở mọi nơi; khác biệt HĐH (phân biệt hoa/thường tên file, dấu phân cách đường dẫn, xuống dòng) là nguồn bug âm thầm rất hay gặp.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nhận biết và sửa được lỗi "chỉ chạy trên máy mình" do khác biệt HĐH — phổ biến nhất là phân biệt hoa/thường tên file và đường dẫn viết tay.

**Ví dụ thực tế — build chạy OK trên Windows của bạn, nhưng CI (Linux) báo lỗi không tìm thấy file.**
```typescript
// ❌ import sai hoa/thường — Windows/macOS mặc định KHÔNG phân biệt hoa thường tên file
import { UserCard } from './components/UserCard';   // file thật tên: 'components/userCard.tsx'

// ✅ đúng tuyệt đối theo tên file thật — chạy được ở mọi HĐH
import { UserCard } from './components/userCard';
```
Trên Windows, `UserCard` và `userCard` trỏ về cùng một file nên bạn không thấy lỗi khi dev — nhưng **Linux (server CI/production) phân biệt hoa/thường**, cùng một sai lệch đó làm build gãy hẳn. Tương tự với đường dẫn: dùng `path.join(a, b)` thay vì tự nối chuỗi `a + '/' + b` (Windows dùng `\`, không phải `/`).

**Vì sao là mức ①:** bạn nhận ra và sửa được lớp lỗi phổ biến nhất do khác biệt HĐH — chưa tự thiết lập quy trình/công cụ để cả team tránh lặp lại (việc đó ở mốc sau).

## ▸ Senior·V3 — ② Biết làm
**Khác V1:** thiết lập được **công cụ/quy trình chặn lỗi đa nền tảng ngay trong CI**, để cả team không lặp lại lỗi tương tự — không chỉ tự sửa khi gặp.

**Ví dụ thực tế — CI chạy trên Linux dù cả team dev trên Windows/macOS, bắt lỗi trước khi merge.**
```yaml
# CI luôn chạy trên ubuntu-latest — dù 90% team dev bằng Windows/macOS
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci
      - run: npm run build   # lỗi hoa/thường tên file sẽ lộ ra Ở ĐÂY, trước khi merge
```
Bạn chủ động chọn CI chạy trên Linux (dù không ai trong team dev trực tiếp trên Linux) — chính vì đó là môi trường production thật. Một lỗi phân biệt hoa/thường mà máy dev Windows không bao giờ thấy sẽ tự lộ ra trong CI, chặn PR trước khi ai đó merge nhầm.

**Vì sao là mức ②:** bạn thiết lập được cơ chế **tự động phát hiện** lỗi đa nền tảng cho cả team — không chỉ tự mình cẩn thận từng lần.

## ▸ Specialist·V2 — ③ Thành thạo
**Khác V1:** thiết kế để sản phẩm **triển khai được ở nhiều môi trường hạ tầng khác nhau** của khách hàng — không chỉ chạy đúng trên nhiều HĐH máy tính cá nhân.

**Ví dụ thực tế — cùng một sản phẩm phải chạy được cả ở server nội bộ khách hàng (on-premise) lẫn trên cloud.** Một số khách hàng (cơ quan nhà nước, ngân hàng) yêu cầu triển khai trong hạ tầng riêng của họ (on-premise) vì lý do bảo mật/pháp lý, số khác chấp nhận triển khai trên cloud công cộng. Bạn thiết kế để một bộ mã nguồn chạy được cả hai:
```
- Đóng gói toàn bộ bằng Docker + docker-compose — chạy giống nhau dù trên máy chủ
  vật lý của khách hàng hay trên cloud (không phụ thuộc dịch vụ riêng của 1 nhà cung cấp cloud).
- Cấu hình qua biến môi trường (địa chỉ CSDL, dung lượng lưu trữ...) thay vì hard-code
  giả định "luôn có sẵn dịch vụ X của cloud Y".
- Tài liệu triển khai tách riêng 2 phần: "triển khai on-premise" và "triển khai cloud",
  dùng chung một bộ Docker image.
```
Nhờ thiết kế này, đội triển khai không phải viết lại sản phẩm cho từng loại khách hàng — chỉ khác cách vận hành hạ tầng bên dưới.

**Vì sao là mức ③:** bạn thiết kế được khả năng tương thích với nhiều môi trường hạ tầng khách hàng khác nhau — đúng nhiệm vụ "thiết kế đa nền tảng" mà career-path Specialist nhấn mạnh.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** đặt ra **chuẩn tương thích đa nền tảng cho mọi sản phẩm mới** của đơn vị (không chỉ thiết kế cho một sản phẩm cụ thể) — chính sách bắt buộc ngay từ đầu, không phải xử lý sau khi khách hàng yêu cầu.

**Ví dụ thực tế — chính sách "đa nền tảng ngay từ đầu" cho mọi dự án mới.**
```
Chuẩn bắt buộc khi khởi tạo dự án mới (đơn vị áp dụng cho mọi sản phẩm):
1. Đóng gói bằng Docker ngay từ Sprint đầu tiên (không để tới lúc cần deploy mới đóng gói).
2. KHÔNG hard-code giả định hạ tầng cụ thể (tên miền, dịch vụ cloud riêng) — luôn qua
   biến môi trường, kiểm tra bằng cách thử chạy trên 2 môi trường khác nhau trước khi release.
3. Checklist "sẵn sàng đa nền tảng" là một mục bắt buộc trong Definition of Done.
```
Nhờ đặt chuẩn này ngay từ đầu, khi có khách hàng mới yêu cầu triển khai on-premise, đội không phải "thiết kế lại" (như cách làm ở mốc V2) mà sản phẩm đã sẵn sàng từ trước.

**Vì sao là mức ④:** bạn đặt ra được chính sách phòng ngừa cho toàn đơn vị, không chỉ giải quyết bài toán đa nền tảng khi nó đã xuất hiện — mức cao nhất của kỹ năng này.
