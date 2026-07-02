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
