# KHUÔN TRANG KỸ NĂNG (mẫu v2 — định nghĩa + ví dụ chi tiết có code) — chờ PO duyệt

> Kiến trúc: TRANG KỸ NĂNG làm gốc + TRANG VÙNG làm checklist. Cùng sinh từ 1 map.
> Đây KHÔNG phải kênh lộ trình. Đây là kênh ĐỊNH NGHĨA + VÍ DỤ THỰC TẾ chi tiết (cách làm, cách code).
> Mỗi mốc vùng: (1) ở mức này làm chủ được gì — (2) ví dụ thực tế có code + giải thích — (3) vì sao là mức đó.

---

# HTML / CSS / JavaScript

**Định nghĩa.** Bộ ba ngôn ngữ nền của web, tách bạch theo nguyên tắc *separation of concerns* (tách mối quan tâm): **HTML** lo *cấu trúc & ngữ nghĩa* tài liệu, **CSS** lo *trình bày* (bố cục, màu, responsive, animation), **JavaScript** là *ngôn ngữ lập trình* chạy trong trình duyệt — thao tác DOM, xử lý sự kiện, giao tiếp mạng. Là kỹ năng gốc: mọi framework FE (React/Vue/Angular) đều biên dịch xuống ba thứ này, không vững gốc thì lên framework chỉ "biết gọi mà không hiểu máy chạy gì".

## ▸ Entry — ② Biết làm

**Ở mức này bạn làm chủ được gì.** Dựng một màn hình hoàn chỉnh từ bản thiết kế (Figma) mà không cần kèm: viết HTML **semantic** (đúng thẻ theo ý nghĩa, không lạm dụng `<div>`), bố cục bằng **Flexbox/Grid** + **responsive** qua media query, dùng **JavaScript thuần** bắt sự kiện, gọi API bằng `fetch`, cập nhật DOM. Hiểu box model, luồng tài liệu, vòng đời một request bất đồng bộ.

**Ví dụ thực tế — màn "Danh sách thông báo".**
Đề bài: hiển thị danh sách thông báo từ API; mỗi item có tiêu đề, thời gian, trạng thái đọc/chưa đọc; bấm "Đánh dấu đã đọc" thì cập nhật ngay trên giao diện.

HTML semantic:
```html
<main class="notif">
  <h1>Thông báo</h1>
  <ul id="notif-list" class="notif__list" aria-live="polite"></ul>
</main>
```
`aria-live="polite"` để trình đọc màn hình (screen reader) thông báo khi danh sách cập nhật — một thói quen a11y cơ bản.

CSS responsive bằng Grid:
```css
.notif__list { display: grid; gap: 12px; list-style: none; padding: 0; }
.notif__item {
  display: grid;
  grid-template-columns: 1fr auto;   /* nội dung co giãn | nút cố định */
  align-items: center;
  gap: 8px 16px;
  padding: 12px 16px;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
}
.notif__item[data-read="false"] { background: #eef4ff; }  /* chưa đọc nổi bật */
@media (max-width: 600px) {
  .notif__item { grid-template-columns: 1fr; }  /* mobile: xếp dọc */
}
```

JavaScript thuần — tải, render, đánh dấu đã đọc:
```js
const listEl = document.getElementById('notif-list');

async function loadNotifications() {
  try {
    const res = await fetch('/api/notifications');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    render(await res.json());
  } catch (err) {
    listEl.innerHTML = '<li>Không tải được thông báo.</li>';
    console.error(err);
  }
}

function render(items) {
  listEl.innerHTML = items.map(n => `
    <li class="notif__item" data-read="${n.read}" data-id="${n.id}">
      <div>
        <strong>${n.title}</strong>
        <div class="notif__time">${new Date(n.createdAt).toLocaleString('vi-VN')}</div>
      </div>
      ${n.read ? '' : '<button class="notif__btn">Đánh dấu đã đọc</button>'}
    </li>`).join('');
}

// Event delegation: gắn 1 listener trên <ul> thay vì mỗi nút
listEl.addEventListener('click', async (e) => {
  const btn = e.target.closest('.notif__btn');
  if (!btn) return;
  const li = btn.closest('.notif__item');
  await fetch(`/api/notifications/${li.dataset.id}/read`, { method: 'POST' });
  li.dataset.read = 'true';   // cập nhật giao diện ngay
  btn.remove();
});
```
Hai điểm đắt giá ở ví dụ này: **event delegation** (một listener cho cả danh sách, item render thêm vẫn chạy, đỡ rò bộ nhớ) và **cập nhật lạc quan** (đổi UI ngay sau khi gọi API, không chờ tải lại).

**Vì sao là mức ②:** bạn ghép đúng 3 lớp, code chạy được, có xử lý lỗi cơ bản — nhưng chưa cần tối ưu khi danh sách rất lớn hay tách module tái dùng (việc của vùng trên).

## ▸ Ex·V1 — ③ Thành thạo

**Khác Entry:** không chỉ "chạy được" mà **sạch, tái dùng, bền** — đóng gói state bằng closure/module, đặt tên theo quy ước, chạy ổn đa trình duyệt, có a11y, biết tối ưu nhẹ (debounce, lazy-load).

**Ví dụ thực tế — "Bộ lọc sản phẩm" có ô tìm kiếm debounce.**
Đề bài: lọc theo tên + danh mục; gõ tới đâu lọc tới đó nhưng không chạy hàm lọc mỗi phím (tốn, giật).

Hàm `debounce` tái dùng (đóng gói bằng closure):
```js
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

Module quản state lọc — state riêng tư, không rò ra global:
```js
import { debounce } from './debounce.js';

export function createProductFilter({ products, onChange }) {
  const state = { keyword: '', category: 'all' };

  function apply() {
    const kw = state.keyword.trim().toLowerCase();
    onChange(products.filter(p =>
      (state.category === 'all' || p.category === state.category) &&
      p.name.toLowerCase().includes(kw)
    ));
  }

  return {
    setKeyword: debounce((v) => { state.keyword = v; apply(); }, 300),
    setCategory: (v) => { state.category = v; apply(); },
    init: apply,
  };
}
```

Gắn vào giao diện:
```js
const filter = createProductFilter({ products, onChange: renderProducts });
searchInput.addEventListener('input', e => { showSkeleton(); filter.setKeyword(e.target.value); });
categorySelect.addEventListener('change', e => filter.setCategory(e.target.value));
filter.init();
```

CSS biến + quy ước BEM:
```css
:root { --radius: 8px; --gap: 12px; --brand: #2f6fb3; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* responsive không cần media query */
  gap: var(--gap);
}
.product-card { border: 1px solid #e3e6ea; border-radius: var(--radius); padding: var(--gap); }
.product-card__price { color: var(--brand); font-weight: 500; }
.product-card--skeleton { animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: .5 } }
```
`closure` giữ `state` đóng kín trong module; `debounce` bọc `setKeyword` để chỉ lọc sau khi người dùng ngừng gõ 300ms; `auto-fill + minmax` cho lưới tự xuống dòng theo bề rộng; **BEM** (`block__element--modifier`) giúp cả team đọc class biết ngay vai trò.

**Vì sao là mức ③:** code tách module dùng lại được, tên có hệ thống, xử lý hiệu năng gõ phím — bạn làm chủ chứ không chỉ làm xong.

## ▸ Ex·V2 — ③ Thành thạo (mở rộng phạm vi)

**Khác V1:** cùng "thành thạo" nhưng áp ở **quy mô lớn & tích hợp thật** — dữ liệu hàng nghìn dòng, API có lỗi/timeout, và **chuẩn hoá một lớp gọi API dùng chung** cho cả app (nền cho component cấp dự án).

**Ví dụ thực tế — lớp `apiClient` dùng chung + bảng dữ liệu lớn.**

Lớp gọi API có timeout + lỗi tập trung (`AbortController`):
```js
class ApiError extends Error {
  constructor(status, detail) { super(`API ${status}: ${detail}`); this.status = status; }
}

export async function apiClient(path, { method = 'GET', body, timeout = 8000 } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    if (!res.ok) throw new ApiError(res.status, await res.text().catch(() => ''));
    return res.status === 204 ? null : res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new ApiError(408, 'Request timeout');
    throw err;
  } finally {
    clearTimeout(id);
  }
}
```

Bảng 1.000 dòng — sort + filter + phân trang phía client, chỉ render trang hiện tại:
```js
function createTable({ rows, pageSize = 50 }) {
  let sortKey = 'name', asc = true, page = 1, keyword = '';

  function view() {
    const data = rows
      .filter(r => r.name.toLowerCase().includes(keyword))
      .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (asc ? 1 : -1));
    const start = (page - 1) * pageSize;
    return { slice: data.slice(start, start + pageSize), total: data.length };
  }
  return { view, sortBy: k => { asc = sortKey === k ? !asc : true; sortKey = k; },
           search: kw => { keyword = kw.toLowerCase(); page = 1; },
           goTo: p => { page = p; } };
}
```
Chỉ render `pageSize` dòng mỗi lần → DOM nhẹ dù dữ liệu 1.000 dòng. `apiClient` gom xử lý lỗi/timeout về một chỗ để mọi màn dùng chung; `ApiError` mang theo `status` để UI phản ứng đúng (vd 408 → hiện nút "thử lại").

## ▸ Ex·V3 — ④ Chuyên sâu

**Khác V2:** không chỉ viết tốt mà **hiểu máy chạy thế nào để ra quyết định** — biết vì sao một đoạn code làm trang giật, **đo được, sửa được**, và **đặt chuẩn** để cả team không lặp lỗi.

**Ở mức này bạn nắm:** luồng render của trình duyệt (parse HTML → DOM, parse CSS → CSSOM → render tree → **layout → paint → composite**); biết **reflow/repaint** đắt ở đâu; đo bằng Performance API & DevTools; tối ưu Core Web Vitals (LCP/CLS/INP).

**Ví dụ thực tế — chẩn "layout thrashing".**
Code gây giật (đọc–ghi layout xen kẽ trong vòng lặp ⇒ ép reflow mỗi vòng):
```js
// XẤU: đọc offsetHeight ngay sau khi ghi style → buộc trình duyệt layout lại N lần
items.forEach(el => {
  el.style.height = 'auto';
  const h = el.offsetHeight;          // ĐỌC → forced synchronous reflow
  el.style.height = h + 20 + 'px';    // GHI
});
```
Sửa — tách pha đọc và pha ghi (đọc hết rồi mới ghi → 1 lần reflow):
```js
// TỐT: gộp đọc, rồi gộp ghi
const heights = items.map(el => el.offsetHeight);                 // đọc gộp
items.forEach((el, i) => { el.style.height = heights[i] + 20 + 'px'; }); // ghi gộp
```
Đo để chứng minh, không nói cảm tính:
```js
performance.mark('start');
layoutPass();
performance.mark('end');
performance.measure('layout', 'start', 'end');
console.log(performance.getEntriesByName('layout')[0].duration, 'ms');
```
Đọc `offsetHeight` ngay sau khi ghi `style` buộc trình duyệt tính lại layout đồng bộ giữa chừng; tách read/write hạ từ N reflow xuống 1. Ở mức ④, bạn còn **viết quy ước này thành guideline cho team** và bật lint cảnh báo để lỗi không tái diễn.
