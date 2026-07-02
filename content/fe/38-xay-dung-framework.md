# Xây dựng framework/nền tảng dùng chung

**Định nghĩa.** Khác [Component dùng chung](/fe/ky-nang/08-component-dung-chung) (đóng gói một khối UI/logic tái dùng), đây là xây **cả một framework/nền tảng nội bộ** — bộ công cụ giúp cả đơn vị phát triển nhanh hơn và đóng gói sản phẩm nhất quán hơn, không phải một component đơn lẻ.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đóng góp một phần cụ thể cho framework/công cụ nội bộ đã có sẵn — không tự khởi tạo một framework mới từ đầu.

**Ví dụ thực tế — thêm một lệnh vào CLI scaffold nội bộ của công ty.** Đơn vị có sẵn CLI `create-fe-app` giúp dựng khung dự án mới (đã cấu hình sẵn ESLint, CI/CD template, base image Docker...). Bạn được giao thêm tính năng: khi ai đó chạy `create-fe-app my-app --with-auth`, CLI tự sinh sẵn module đăng nhập theo chuẩn công ty (đã tích hợp `@company/auth-kit` — thư viện xây ở mức Senior) thay vì để mỗi dự án mới tự cấu hình lại từ đầu:
```bash
npx create-fe-app my-app --with-auth
# tự sinh: cấu trúc thư mục chuẩn + AuthModule đã cấu hình sẵn + .env.example
```
Bạn đóng góp một tính năng cụ thể vào framework nội bộ đã có, giúp mọi dự án mới tiết kiệm được vài ngày cấu hình lặp lại.

**Vì sao là mức ①:** bạn đóng góp được một phần rõ ràng vào nền tảng dùng chung đã tồn tại — chưa tự khởi tạo hay chịu trách nhiệm kiến trúc toàn bộ một framework mới.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự khởi tạo được **một framework/công cụ nội bộ mới** từ đầu (không chỉ thêm tính năng vào cái có sẵn), giải quyết một nhu cầu chung mà chưa ai xây.

**Ví dụ thực tế — tự khởi tạo bộ công cụ kiểm tra accessibility tự động cho mọi dự án.** Đơn vị chưa có công cụ kiểm tra a11y (khả năng tiếp cận) tự động — mỗi dự án tự kiểm bằng tay, hay bỏ sót. Bạn khởi tạo một package nội bộ mới:
```typescript
// @company/a11y-check — package mới, chưa từng tồn tại trước đó
export function checkA11y(page: Page): A11yReport {
  // kiểm tra: contrast màu, alt text ảnh, aria-label nút icon-only, tab order...
  return { errors, warnings };
}
```
```yaml
# tích hợp vào CI của mọi dự án FE
- run: npx @company/a11y-check --url http://localhost:4200
```
Bạn xác định nhu cầu chưa ai giải quyết, tự thiết kế kiến trúc gói công cụ (kiểm gì, báo lỗi ra sao, tích hợp CI thế nào), và là người chịu trách nhiệm duy trì nó ban đầu.

**Vì sao là mức ②:** bạn tự khởi tạo được một công cụ/framework hoàn toàn mới giải quyết nhu cầu chung — không chỉ đóng góp vào cái đã tồn tại.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** xây framework/nền tảng ở quy mô **thay đổi cách cả đơn vị phát triển và đóng gói sản phẩm** (không chỉ một công cụ hỗ trợ) — đúng nghĩa "framework phục vụ phát triển nhanh và đóng gói sản phẩm" mà PDF nhấn mạnh.

**Ví dụ thực tế — nền tảng "product factory" giúp ra mắt sản phẩm mới nhanh gấp nhiều lần.** Đơn vị thường mất 2-3 tháng để dựng một sản phẩm mới từ đầu (auth, thanh toán, thông báo... đều làm lại). Bạn dẫn dắt xây một nền tảng gồm các khối dùng chung đã kiểm chứng (auth-kit, notification platform, design system — đều là tài sản đã xây ở các mốc trước), đóng gói thành một bộ khởi tạo:
```bash
npx create-product-from-platform my-new-product
# Sinh sẵn: auth hoàn chỉnh + thông báo + UI theo design system + CI/CD chuẩn
# Đội chỉ cần code phần NGHIỆP VỤ RIÊNG của sản phẩm mới
```
Thời gian ra mắt sản phẩm mới giảm từ 2-3 tháng xuống còn 2-3 tuần, vì phần "hạ tầng chung" đã có sẵn và đã được kiểm chứng qua nhiều sản phẩm trước.

**Vì sao là mức ④:** bạn xây được nền tảng thay đổi tốc độ phát triển của cả đơn vị — mức cao nhất, đúng bản chất Specialist là người tạo ra đòn bẩy cho nhiều đội khác, không chỉ giải quyết vấn đề của riêng mình.
