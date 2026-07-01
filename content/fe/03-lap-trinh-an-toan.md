# Lập trình an toàn (Secure Coding)

**Định nghĩa.** Viết code có phòng ngừa lỗ hổng bảo mật ngay từ khâu lập trình, thay vì vá sau khi bị tấn công. Tham chiếu phổ biến là **OWASP Top 10** (mười nhóm lỗ hổng web nguy hiểm nhất: injection, XSS, hỏng xác thực/phân quyền, lộ dữ liệu nhạy cảm...). Ở phía Front-end, trọng tâm gồm: chống **XSS** (Cross-Site Scripting — chèn mã độc qua dữ liệu hiển thị), xử lý **token** an toàn, **validate** đầu vào, không lộ **secret**, và hiểu **CSRF/CORS/CSP**. Với một công ty an ninh mạng, đây là kỹ năng bắt buộc xuyên suốt mọi level.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Biết các lỗ hổng phổ biến là gì, không hardcode secret trong code FE, và escape dữ liệu khi hiển thị để tránh XSS cơ bản.

**Ví dụ thực tế — XSS qua `innerHTML`.** Hiển thị tiểu sử do người dùng tự nhập:
```js
// ❌ XẤU: chèn thẳng HTML từ dữ liệu người dùng → kẻ xấu nhập <img src=x onerror=alert(1)>
el.innerHTML = user.bio;

// ✅ TỐT: render dạng text, trình duyệt không thực thi thẻ
el.textContent = user.bio;
```
Bạn cũng biết không viết `const API_KEY = "sk-..."` trong code FE (mọi thứ gửi xuống trình duyệt đều xem được).

**Vì sao là mức ①:** nhận ra rủi ro và tránh lỗi cơ bản, nhưng chưa áp dụng nhất quán toàn luồng.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** áp dụng nhất quán — validate đầu vào ở FE, hiểu đánh đổi khi lưu token, và dùng thư viện sanitize đúng cách khi buộc phải render HTML.

**Ví dụ thực tế — render rich text an toàn + lưu token.** Khi buộc hiển thị HTML (vd nội dung soạn thảo), dùng DOMPurify thay vì tin dữ liệu:
```js
import DOMPurify from 'dompurify';
el.innerHTML = DOMPurify.sanitize(richHtml);  // loại bỏ <script>, onerror, javascript:...
```
Và hiểu đánh đổi nơi lưu token:
```
localStorage : tiện, nhưng JS đọc được → nếu dính XSS là mất token.
httpOnly cookie: JS không đọc được (an toàn hơn XSS), nhưng phải chống CSRF.
```
Bạn chọn có lý do, không chọn theo thói quen.

**Vì sao là mức ②:** bảo mật trở thành thói quen trong từng task, không chỉ biết khi được nhắc.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** nắm vững và rà soát **toàn luồng** — hiểu CSRF/CORS, Content Security Policy (CSP) cơ bản, và nguyên tắc không log/không đưa dữ liệu nhạy cảm ra nơi không an toàn.

**Ví dụ thực tế — CSRF & lộ token qua URL.** Bạn cấu hình request đính kèm CSRF token và tránh đưa thông tin nhạy cảm vào URL (vì URL bị log ở server, proxy, lịch sử trình duyệt):
```js
// ❌ token trên URL → bị log khắp nơi
fetch(`/api/profile?token=${token}`);

// ✅ token trong header, dữ liệu nhạy cảm trong body
fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
```
Bạn cũng đọc được một CSP header cơ bản và hiểu nó chặn script lạ thế nào.

**Vì sao vẫn là ②:** rà soát tốt toàn luồng, nhưng chưa ở mức thiết kế phòng thủ / review cho team.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** chủ động **đề xuất giải pháp bảo mật**, thiết kế chống tấn công, và **review code bắt lỗ hổng** cho người khác.

**Ví dụ thực tế — bắt lỗi open redirect khi review.** Trong PR của đồng đội, bạn thấy:
```js
// ❌ chuyển hướng theo tham số người dùng → kẻ xấu dụ tới site lừa đảo
window.location = params.get('returnUrl');
```
Bạn chỉ ra lỗ hổng *open redirect* và đề xuất whitelist:
```js
const allowed = ['/dashboard', '/profile', '/orders'];
const target = params.get('returnUrl');
window.location = allowed.includes(target) ? target : '/dashboard';
```
Bạn còn đề xuất bổ sung quy ước "mọi redirect phải qua whitelist" vào checklist review của team.

**Vì sao là mức ③:** bạn bảo vệ được cả sản phẩm chứ không chỉ code của mình, và nâng chuẩn an toàn cho đội.
