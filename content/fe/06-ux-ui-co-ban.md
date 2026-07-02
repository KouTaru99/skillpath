# UX/UI cơ bản

**Định nghĩa.** **UI** (User Interface) là phần nhìn–chạm: bố cục, màu, chữ, khoảng cách, trạng thái. **UX** (User Experience) là *cảm nhận tổng thể* khi dùng: dễ hiểu không, mất mấy bước, có bị lạc không. Một Front-end dev không cần là designer, nhưng phải hiểu đủ để **hiện thực đúng ý đồ thiết kế** và **phối hợp với Designer** qua ngôn ngữ chung (Design System, spacing, state). Ví dụ minh hoạ trong ngữ cảnh Angular.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiện thực đủ **các trạng thái** của giao diện (không chỉ "trạng thái đẹp"), tuân token Design System, nắm nguyên tắc cơ bản: phản hồi tức thì, vùng chạm đủ lớn, tương phản đủ đọc.

**Ví dụ thực tế — đủ 4 trạng thái của một danh sách (Angular).** Người mới hay chỉ làm trạng thái "có dữ liệu":
```html
<ng-container *ngIf="vm$ | async as vm">
  <app-skeleton *ngIf="vm.loading"></app-skeleton>                 <!-- đang tải -->
  <app-error *ngIf="vm.error" (retry)="reload()"></app-error>      <!-- lỗi + thử lại -->
  <app-empty *ngIf="!vm.loading && vm.items.length === 0"          <!-- rỗng + gợi ý -->
             hint="Chưa có đơn hàng nào"></app-empty>
  <app-order-list *ngIf="vm.items.length" [items]="vm.items"></app-order-list>
</ng-container>
```
Và dùng token thay vì số tự chế: `padding: var(--space-2) var(--space-4)` để khớp Design System.

**Vì sao là mức ①:** làm giao diện "dùng được" đúng chuẩn thiết kế, chưa tự đánh giá trải nghiệm.

## ▸ Ex·V2 — ① Nhập môn (mở rộng phạm vi)
**Khác V1:** áp ở **luồng nhiều bước** — trải nghiệm liền mạch qua các màn, phối hợp chặt với Designer khi thiết kế chưa phủ hết tình huống.

**Ví dụ thực tế — luồng thanh toán 3 bước không bỏ rơi người dùng.**
```
- Chỉ báo bước hiện tại (1/3, 2/3, 3/3) để không lạc.
- Giữ dữ liệu khi quay lại bước trước (không bắt nhập lại) — dùng service giữ state.
- Nút "Thanh toán" [disabled]="submitting" + spinner để chống bấm 2 lần.
- Lỗi đặt NGAY cạnh ô sai (mat-error), không gom một cục trên đầu.
```
Bạn chủ động hỏi Designer: *"Bước 2 khi địa chỉ trống hiện gì?"* thay vì tự đoán.

**Vì sao vẫn là ①:** xử lý tốt trải nghiệm trong phạm vi được giao.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** **tự đánh giá và đề xuất cải tiến UX** dựa trên nguyên tắc khả dụng, không chỉ chờ Designer; cân nhắc accessibility và hành vi người dùng.

**Ví dụ 1 — giảm bỏ cuộc ở form dài.** Số liệu cho thấy nhiều người rời form đăng ký. Bạn đề xuất và làm:
```
- Gộp 12 trường thành 3 nhóm có tiêu đề → bớt cảm giác "dài".
- Validate onBlur, báo lỗi cụ thể "Email chưa đúng định dạng" ngay tại ô.
- Ô mật khẩu có nút hiện/ẩn + thanh độ mạnh trực quan.
```

**Ví dụ 2 — accessibility cho người dùng bàn phím/đọc màn hình.** Bạn thêm `aria-label`, thứ tự `tabindex` đúng, focus tự nhảy vào ô lỗi đầu tiên sau khi submit; kiểm bằng cách chỉ dùng phím Tab đi hết form.

**Vì sao là mức ②:** không chỉ hiện thực mà còn nâng chất lượng trải nghiệm.

## ▸ Senior·V2 — ③ Thành thạo
**Khác Ex·V3:** không chỉ tự làm tốt UX cho phần mình mà **điều phối chuẩn UX/UI cho cả team**, đảm bảo mọi màn nhất quán dù nhiều người cùng code.

**Ví dụ thực tế — audit phát hiện 3 kiểu nút "Xoá" khác nhau trong cùng một app.** Bạn rà qua các màn và thấy: màn A dùng nút đỏ + icon thùng rác, màn B dùng chữ "Xoá" thường không cảnh báo, màn C có popup xác nhận còn màn A/B thì không — cùng một hành động nhưng 3 trải nghiệm khác nhau vì mỗi dev tự làm theo ý mình. Bạn chốt lại **một component `DeleteButton` dùng chung** (icon + màu + popup xác nhận cố định) trong Design System, thay thế cả 3 cách cũ, và đặt quy ước: hành động phá huỷ dữ liệu luôn phải qua component này.

**Vì sao là mức ③:** bạn nhìn UX ở tầm **toàn sản phẩm**, chủ động phát hiện và dọn sự thiếu nhất quán trước khi người dùng thật nhận ra.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác Senior·V2:** điều phối chuẩn UX/UI cho **nhiều sản phẩm khác nhau** của cả công ty (không chỉ một sản phẩm) — Design System dùng chung ở tầm tổ chức.

**Ví dụ thực tế — Design System dùng chung cho 5 sản phẩm khác nhau của công ty.** Trước đây mỗi sản phẩm (bán hàng, chăm sóc khách hàng, quản trị nội bộ...) có bộ giao diện riêng — cùng là công ty nhưng người dùng chuyển giữa các sản phẩm thấy như 5 thương hiệu khác nhau. Bạn dẫn dắt xây một Design System dùng chung ở tầm công ty: bảng màu, typography, component cơ bản (button, input, table) thống nhất, đóng gói thành package (`@company/design-system`) để mọi sản phẩm cùng cài về dùng — mỗi sản phẩm vẫn có thể tuỳ biến phần đặc thù, nhưng phần nền tảng (màu thương hiệu, khoảng cách, component cơ bản) là MỘT chuẩn duy nhất.

**Vì sao là mức ④:** bạn tạo ra được sự nhất quán trải nghiệm ở tầm **toàn công ty**, không chỉ một sản phẩm — mức cao nhất của kỹ năng UX/UI trong toàn thang.
