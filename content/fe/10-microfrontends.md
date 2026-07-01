# Microfrontends

**Định nghĩa.** **Microfrontends** là kiến trúc chia một ứng dụng Front-end lớn thành nhiều phần nhỏ độc lập, mỗi phần do một đội sở hữu, **phát triển – build – triển khai riêng**, rồi ghép lại thành một app người dùng thấy liền mạch. Là cách áp tư tưởng microservices sang Front-end: đổi lấy khả năng nhiều đội làm song song không giẫm chân nhau, chấp nhận thêm độ phức tạp khi tích hợp. Với Angular thường dùng **Module Federation** (qua `@angular-architects/module-federation`).

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu microfrontends là gì, vì sao cần, cách ghép cơ bản; biết một app con phải tự chứa, không phụ thuộc ngầm app khác.

**Ví dụ thực tế — app shell nạp app con "orders" khi vào route (Angular Module Federation).**
```typescript
// app con "orders" khai báo phần phơi ra (webpack.config.js)
new ModuleFederationPlugin({
  name: 'orders',
  exposes: { './Module': './src/app/orders/orders.module.ts' },
});
```
```typescript
// shell nạp app con qua route lazy (loadRemoteModule)
{
  path: 'orders',
  loadChildren: () =>
    loadRemoteModule({ remoteName: 'orders', exposedModule: './Module' })
      .then((m) => m.OrdersModule),
}
```
Mỗi app con deploy riêng; shell chỉ trỏ tới bản mới nhất.

**Vì sao là mức ①:** nắm khái niệm và ghép theo mẫu, chưa xử lý vấn đề khó (chia sẻ state, version thư viện).

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** xử lý các bài toán thực — **chia sẻ dependency** để tránh tải trùng, **giao tiếp giữa app con**, giữ nhất quán giao diện/phiên đăng nhập.

**Ví dụ 1 — chia sẻ Angular core để tránh mỗi app con tự tải một bản (nặng, dễ xung đột).**
```typescript
new ModuleFederationPlugin({
  name: 'orders',
  shared: {
    '@angular/core':   { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
    rxjs:              { singleton: true },
  },
});
```
`singleton: true` để cả shell và app con dùng chung một bản Angular — hai bản Angular chạy song song sẽ lỗi khó hiểu.

**Ví dụ 2 — giao tiếp lỏng giữa app con qua sự kiện, không gọi thẳng vào nhau.**
```typescript
// app "cart" phát sự kiện khi thêm hàng
window.dispatchEvent(new CustomEvent('cart:add', { detail: { id, qty } }));
// app "header" lắng nghe cập nhật badge — hai app không phụ thuộc cứng
window.addEventListener('cart:add', (e: any) => this.updateBadge(e.detail));
```
Bạn nhận ra: gọi thẳng service của app khác sẽ khoá chặt hai app; dùng sự kiện giữ chúng độc lập.

**Vì sao là mức ②:** vận hành được kiến trúc này ở mức thực chiến, giải quyết các đánh đổi cốt lõi.
