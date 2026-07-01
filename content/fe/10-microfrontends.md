# Microfrontends

**Định nghĩa.** **Microfrontends** là kiến trúc chia một ứng dụng Front-end lớn thành nhiều phần nhỏ độc lập, mỗi phần do một đội sở hữu, **phát triển – build – triển khai riêng**, rồi ghép lại thành một app người dùng thấy là liền mạch. Đây là cách áp tư tưởng microservices (đã quen ở Back-end) sang Front-end: đổi lấy khả năng nhiều đội làm song song không giẫm chân nhau, chấp nhận thêm độ phức tạp khi tích hợp. Thường gặp ở hệ thống lớn; không phải mặc định cho mọi dự án.

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu microfrontends là gì, vì sao cần, và các cách ghép cơ bản (route-based, hoặc Module Federation); biết một app con phải tự chứa và không phụ thuộc ngầm app khác.

**Ví dụ thực tế — ghép theo route + Module Federation (Webpack 5).** App "shell" tải app con khi vào route tương ứng:
```js
// webpack.config.js của app con "orders" — phơi ra để app khác dùng
new ModuleFederationPlugin({
  name: 'orders',
  filename: 'remoteEntry.js',
  exposes: { './OrdersApp': './src/OrdersApp' },
});
```
```jsx
// app shell — nạp app con như một remote component
const OrdersApp = lazy(() => import('orders/OrdersApp'));
<Route path="/orders" element={<Suspense fallback={<Spinner/>}><OrdersApp/></Suspense>} />
```
Bạn hiểu mỗi app con có thể deploy riêng, shell chỉ trỏ tới `remoteEntry.js` mới nhất.

**Vì sao là mức ①:** nắm khái niệm và ghép được theo mẫu, nhưng chưa xử lý các vấn đề khó (chia sẻ state, version thư viện).

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** xử lý được các bài toán thực của microfrontends — **chia sẻ dependency** để tránh tải trùng, **giao tiếp giữa các app con**, và giữ nhất quán giao diện/phiên đăng nhập.

**Ví dụ thực tế — chia sẻ thư viện & giao tiếp qua sự kiện.** Tránh mỗi app con tự tải một bản React (nặng, dễ xung đột):
```js
new ModuleFederationPlugin({
  name: 'orders',
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },        // dùng chung 1 bản React
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
});
```
Giao tiếp lỏng giữa các app con qua sự kiện, không gọi thẳng vào nhau:
```js
// app "cart" phát sự kiện khi thêm hàng
window.dispatchEvent(new CustomEvent('cart:add', { detail: { id, qty } }));
// app "header" lắng nghe để cập nhật số lượng trên icon giỏ
window.addEventListener('cart:add', e => updateBadge(e.detail));
```
Bạn nhận ra `singleton: true` để tránh hai bản React đập nhau, và dùng sự kiện để các app con không phụ thuộc cứng vào nhau.

**Vì sao là mức ②:** bạn vận hành được kiến trúc này ở mức thực chiến, giải quyết các đánh đổi cốt lõi của nó.
