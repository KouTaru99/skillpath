# Lập trình an toàn (Secure Coding)

**Định nghĩa.** Viết code phòng ngừa lỗ hổng bảo mật ngay từ khâu lập trình. Tham chiếu phổ biến là **OWASP Top 10** (injection, XSS, hỏng xác thực/phân quyền, lộ dữ liệu nhạy cảm...). Ở phía Front-end với Angular, trọng tâm: chống **XSS**, xử lý **token** an toàn, dùng đúng cơ chế **CSRF/sanitization** Angular cung cấp, và không lộ **secret**. Với công ty an ninh mạng, đây là kỹ năng bắt buộc xuyên suốt mọi level.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Biết các lỗ hổng phổ biến, không hardcode secret trong code FE, và hiểu Angular **tự escape** dữ liệu trong template — đừng phá cơ chế đó.

**Ví dụ thực tế — Angular tự chống XSS, chỉ hỏng khi bạn ép bỏ qua.**
```typescript
// ✅ AN TOÀN: interpolation tự escape, <script> của kẻ xấu thành text vô hại
@Component({ template: `<div>{{ user.bio }}</div>` })

// ❌ NGUY HIỂM: bypassSecurityTrustHtml tắt lá chắn → XSS trở lại
this.safeBio = this.sanitizer.bypassSecurityTrustHtml(user.bio);
```
Quy tắc nhập môn: mặc định để Angular escape; chỉ đụng `bypassSecurityTrust*` khi thật hiểu và dữ liệu đã sạch.

**Vì sao là mức ①:** nhận ra rủi ro và tránh lỗi cơ bản, chưa áp dụng nhất quán toàn luồng.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Áp dụng nhất quán — dùng `DomSanitizer.sanitize()` khi buộc render HTML người dùng, hiểu đánh đổi nơi lưu token, không đưa dữ liệu nhạy cảm lên URL.

**Ví dụ thực tế — render rich text an toàn + lưu token.**
```typescript
// Làm sạch HTML trước khi bind [innerHTML]
const clean = this.sanitizer.sanitize(SecurityContext.HTML, richHtml);
```
Đánh đổi nơi lưu token:
```
localStorage : tiện, nhưng JS đọc được → dính XSS là mất token.
httpOnly cookie: JS không đọc được (an toàn hơn XSS), nhưng phải chống CSRF.
```
```typescript
// ❌ token trên URL → bị log ở server/proxy/lịch sử
this.http.get(`/api/profile?token=${token}`);
// ✅ token trong header
this.http.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
```

**Vì sao là mức ②:** bảo mật thành thói quen trong từng task.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** rà soát **toàn luồng** — bật cơ chế CSRF của Angular, hiểu CSP cơ bản, không log dữ liệu nhạy cảm.

**Ví dụ 1 — bật chống CSRF sẵn có của Angular.** Angular `HttpClientXsrfModule` tự đọc cookie XSRF-TOKEN và gắn header cho request không phải GET:
```typescript
imports: [ HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }) ]
```
Backend chỉ cần set cookie và kiểm header khớp — chặn request giả từ site khác.

**Ví dụ 2 — không rò dữ liệu qua log.** Interceptor log request để debug nhưng lỡ in cả body chứa mật khẩu. Bạn lọc field nhạy cảm trước khi log, và tắt log chi tiết ở production.

**Vì sao vẫn là ②:** rà soát tốt toàn luồng, chưa ở mức thiết kế phòng thủ / review cho team.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** chủ động **đề xuất giải pháp bảo mật**, thiết kế chống tấn công, **review code bắt lỗ hổng** cho người khác.

**Ví dụ 1 — bắt open redirect khi review.**
```typescript
// ❌ chuyển hướng theo tham số người dùng → dụ tới site lừa đảo
window.location.href = params['returnUrl'];
// ✅ whitelist đường dẫn nội bộ
const allowed = ['/dashboard', '/profile', '/orders'];
this.router.navigateByUrl(allowed.includes(url) ? url : '/dashboard');
```

**Ví dụ 2 — chặn truy cập route bằng guard + hiểu giới hạn của nó.**
```typescript
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  canActivate(): boolean { return this.auth.hasRole('admin'); }
}
```
Bạn nhấn với team: guard chỉ chặn UI — **API vẫn phải tự kiểm quyền**, vì kẻ xấu gọi thẳng API không qua router.

**Ví dụ 3 — thiết lập Content Security Policy.** Đề xuất header CSP để trình duyệt chỉ chạy script từ nguồn tin cậy, chặn inline script lạ — một lớp phòng thủ nữa cho XSS, ghi vào checklist trước khi lên production.

**Vì sao là mức ③:** bảo vệ cả sản phẩm chứ không chỉ code của mình, nâng chuẩn an toàn cho đội.

## ▸ Senior·V3 — ④ Chuyên sâu
**Khác Ex·V3:** không chỉ review bắt lỗ hổng đã có mà **đánh giá rủi ro trước khi code** (threat modeling) cho tính năng mới, ngay từ khâu thiết kế.

**Ví dụ thực tế — threat modeling nhanh cho tính năng "chia sẻ đơn hàng qua link công khai".** Trước khi ai viết dòng code nào, bạn đặt câu hỏi phòng thủ:
```
- Link công khai có đoán được không? (nếu dùng orderId=123 tuần tự → kẻ xấu dò hết đơn của người khác)
  → đổi sang token ngẫu nhiên dài, không đoán được.
- Link có hết hạn không? (nếu không, lộ vĩnh viễn dù đơn đã xong từ lâu)
  → đặt thời hạn hết hạn (vd 7 ngày).
- Ai xem được link có thấy thông tin nhạy cảm không? (địa chỉ, số điện thoại đầy đủ)
  → ẩn bớt phần nhạy cảm ở bản xem công khai.
```
Ba câu hỏi này được đặt ra **trước khi code**, khi sửa vẫn còn rẻ — nếu để tới lúc review mới phát hiện `orderId` tuần tự bị lộ, sửa đã tốn công hơn nhiều (đổi cả schema, migrate dữ liệu cũ).

**Vì sao là mức ④:** bạn chủ động đánh giá rủi ro bảo mật ở khâu thiết kế, trước khi có code để review — mức phòng thủ sâu nhất, rẻ nhất.
