# Microfrontends

**Định nghĩa.** **Microfrontends (MFE)** là kiến trúc chia một ứng dụng Front-end lớn thành nhiều mảnh **build & deploy độc lập**, rồi **ghép lại lúc chạy (runtime)** thành một trang người dùng thấy liền mạch. Mỗi mảnh do một đội sở hữu, **có thể khác framework/version** (Angular 12 · React · Angular 15…). Điều làm nên microfrontend **không phải** số lượng repo, mà là: *mỗi mảnh deploy độc lập + ghép lúc runtime*.

**Đừng lẫn với monorepo.** Đây là hai trục **vuông góc**, không phải một:
- **Monorepo / poly-repo** = câu hỏi *"code nằm ở đâu"* (một repo nhiều app, hay mỗi app một repo). Chuyện **build-time / tổ chức mã**.
- **Microfrontend** = câu hỏi *"các mảnh deploy & ghép thế nào"*. Chuyện **runtime / kiến trúc**.

Bạn có thể monorepo mà mỗi app vẫn deploy riêng (là microfrontend), hoặc poly-repo (cũng microfrontend). Nên **đừng đo microfrontend bằng số repo**.

```
┌────────────────────────────────────────────────────┐
│  Trình duyệt — người dùng thấy 1 trang liền mạch     │
│  ┌──────────────────────────────────────────────┐   │
│  │  SHELL (host) — router nạp MFE theo route       │  │
│  └─────┬─────────────┬─────────────┬────────────┘   │
│        │             │             │                │
│  ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼──────┐         │
│  │ Sản phẩm  │ │ Giỏ hàng  │ │ Tài khoản  │         │
│  │ Angular12 │ │ React     │ │ Angular15  │         │
│  │ Team A    │ │ Team B    │ │ Team C     │         │
│  └─────┬─────┘ └─────┬─────┘ └─────┬──────┘         │
│        └─────────────┴─────────────┘                │
│              Event bus (chia sẻ state)              │
└────────────────────────────────────────────────────┘
 Mỗi MFE: repo riêng · build riêng · deploy riêng · URL riêng
```

**Các kiểu ghép (khác nhau ở "đa framework/version được tới đâu"):**

| Kiểu tích hợp | Đa framework/version? | Đánh đổi |
|---|---|---|
| Web Components / iframe / **single-spa** (cô lập runtime) | ✅ thoải mái | mỗi mảnh tự mang runtime → tải trùng, nặng hơn |
| **Webpack Module Federation** + `shared: singleton` | ⚠️ buộc **cùng/tương thích version** framework | nhẹ (dùng chung 1 bản), nhưng lệ thuộc version |
| Module Federation **không** share framework | ✅ đa version | mỗi mảnh tự bundle → tải trùng |

Và **router không phải kênh giao tiếp duy nhất**: router lo *điều hướng* (ghép mảnh theo URL); còn chia sẻ *state/dữ liệu* (đăng nhập, giỏ hàng) thì cần thêm **event bus / custom event / shared state**.

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu microfrontend là gì, **phân biệt với monorepo**, biết các kiểu ghép, và một mảnh phải **tự chứa** (không phụ thuộc ngầm mảnh khác).

**Cấu trúc thư mục — hai cách để cùng ra một kiến trúc microfrontend:**
```
# Cách A — poly-repo (mỗi MFE một repo, độc lập nhất)
shell-app/         → repo Host: router trỏ tới từng MFE
products-mfe/      → repo Team A (Angular 12), tự CI/CD lên products.cty.com
cart-mfe/          → repo Team B (React)
account-mfe/       → repo Team C (Angular 15)

# Cách B — monorepo (Nx) — VẪN là microfrontend
my-workspace/
  apps/  shell/  products/  cart/  account/   ← mỗi app vẫn build & deploy RIÊNG
  libs/  shared-ui/  shared-auth/             ← code dùng chung (lợi thế monorepo)
```

**Ví dụ ghép cơ bản (Angular 12+ / Webpack 5, dùng `@angular-architects/module-federation`).** Mảnh "products" phơi module ra:
```javascript
// products-mfe/webpack.config.js
new ModuleFederationPlugin({
  name: 'products',
  filename: 'remoteEntry.js',                 // shell sẽ tải file này
  exposes: { './Module': './src/app/products/products.module.ts' },
});
```
Shell nạp mảnh đó theo route — **điểm mấu chốt là URL `remoteEntry`** (nơi mảnh đang deploy):
```typescript
{
  path: 'products',
  loadChildren: () => loadRemoteModule({
    type: 'module',
    remoteEntry: 'https://products.cty.com/remoteEntry.js',   // ← mảnh "ở" đâu
    exposedModule: './Module',
  }).then(m => m.ProductsModule),
}
```

**Vì sao là mức ①:** nắm khái niệm và ghép được theo mẫu, chưa xử vấn đề khó (chia sẻ dependency, đa framework, giao tiếp).

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** **chọn đúng kiểu tích hợp** theo nhu cầu và xử các bài toán thực — chia sẻ dependency (kèm đánh đổi version), giao tiếp giữa mảnh, giữ nhất quán đăng nhập/giao diện.

**Ví dụ 1 — cùng stack Angular: Module Federation share singleton (nhẹ, nhưng ràng version).**
```javascript
shared: {
  '@angular/core':   { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
  '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
  rxjs:              { singleton: true },
}
```
`singleton: true` để shell và các mảnh **dùng chung một bản Angular** (đỡ tải trùng, tránh hai bản Angular đập nhau). **Đánh đổi:** các mảnh phải cùng/tương thích major version — đây chính là lý do "MF share singleton" **không** cho đa version tự do.

**Ví dụ 2 — cần đa framework/version thật (Angular + React): đừng share, hãy cô lập.**
Khi các mảnh khác framework, bỏ share framework (mỗi mảnh tự bundle), hoặc gói mảnh thành **Web Component** để shell nhúng như thẻ HTML thường:
```html
<!-- shell nhúng mảnh React như custom element, không cần biết nó viết bằng gì -->
<cart-widget user-id="42"></cart-widget>
```
Trả giá: tải trùng runtime; đổi lại các mảnh thực sự độc lập công nghệ (đúng lời hứa gốc của microfrontend). Công cụ phổ biến cho hướng này: **single-spa**.

**Ví dụ 3 — giao tiếp giữa mảnh qua event bus (không gọi thẳng vào nhau).**
```typescript
// mảnh "cart" phát sự kiện khi thêm hàng
window.dispatchEvent(new CustomEvent('cart:add', { detail: { id, qty } }));
// mảnh "header" lắng nghe để cập nhật badge — hai mảnh không phụ thuộc cứng
window.addEventListener('cart:add', (e: any) => this.updateBadge(e.detail));
```
Router điều hướng giữa các mảnh; event bus lo chia sẻ state (giỏ hàng, phiên đăng nhập). Gọi thẳng service của mảnh khác sẽ khoá chặt chúng lại — mất tính độc lập.

**Vì sao là mức ②:** chọn được kiểu tích hợp hợp bối cảnh và giải quyết các đánh đổi cốt lõi (version, đa framework, giao tiếp) — không đóng khung microfrontend vào một cách duy nhất.

---
*Nguồn: [martinfowler.com — Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) · [micro-frontends.org](https://micro-frontends.org/) · [single-spa](https://single-spa.js.org/) · [webpack — Module Federation](https://webpack.js.org/concepts/module-federation/) · [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation)*
