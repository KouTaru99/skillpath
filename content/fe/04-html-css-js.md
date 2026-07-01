# HTML / CSS / JavaScript

**Định nghĩa.** Bộ ba ngôn ngữ nền của web, tách bạch theo *separation of concerns*: **HTML** lo *cấu trúc & ngữ nghĩa*, **CSS** lo *trình bày* (bố cục, responsive, animation), **JavaScript** là *ngôn ngữ lập trình* chạy trong trình duyệt. Là kỹ năng gốc: mọi framework FE (kể cả Angular) đều biên dịch xuống ba thứ này — không vững gốc thì lên framework chỉ "biết gọi mà không hiểu máy chạy gì". Trang này giữ ví dụ **thuần** (không framework) để đóng đinh nền tảng.

## ▸ Entry — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Dựng màn hình hoàn chỉnh từ Figma không cần kèm: HTML semantic, bố cục Flexbox/Grid + responsive, JS thuần bắt sự kiện, gọi `fetch`, cập nhật DOM.

**Ví dụ thực tế — danh sách thông báo (event delegation + cập nhật lạc quan).**
```js
listEl.addEventListener('click', async (e) => {          // 1 listener cho cả list
  const btn = e.target.closest('.notif__btn');
  if (!btn) return;
  const li = btn.closest('.notif__item');
  await fetch(`/api/notifications/${li.dataset.id}/read`, { method: 'POST' });
  li.dataset.read = 'true';                                // đổi UI ngay, không tải lại
  btn.remove();
});
```
`event delegation` (một listener cho cả danh sách) đỡ rò bộ nhớ và chạy được cả với item render thêm sau.

**Vì sao là mức ②:** ghép đúng 3 lớp, chạy được, xử lý lỗi cơ bản.

## ▸ Ex·V1 — ③ Thành thạo
**Ở mức này bạn làm chủ được gì.** Code sạch/tái dùng, đóng gói bằng closure/module, đặt tên BEM, a11y, tối ưu nhẹ.

**Ví dụ 1 — ô tìm kiếm debounce (closure).**
```js
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}
searchInput.addEventListener('input', debounce((e) => filter(e.target.value), 300));
```

**Ví dụ 2 — accessibility cho dropdown tự làm.** Nhiều bạn quên: dropdown phải điều khiển được bằng bàn phím.
```js
button.setAttribute('aria-expanded', 'false');
button.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { open(); firstItem.focus(); }
  if (e.key === 'Escape') { close(); button.focus(); }
});
```

**Vì sao là mức ③:** tách module dùng lại, tên có hệ thống, quan tâm a11y.

## ▸ Ex·V2 — ③ Thành thạo (mở rộng phạm vi)
**Khác V1:** quy mô lớn & tích hợp thật — dữ liệu nghìn dòng, lớp gọi API dùng chung.

**Ví dụ 1 — `apiClient` có timeout (AbortController).**
```js
export async function apiClient(path, { timeout = 8000, ...opt } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(path, { ...opt, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
  } finally { clearTimeout(id); }
}
```

**Ví dụ 2 — render 1.000 dòng không giật (chỉ dựng phần cần).**
```js
// Thay vì innerHTML 1.000 <li>, dùng DocumentFragment gom 1 lần chèn
const frag = document.createDocumentFragment();
pageRows.forEach(r => { const li = document.createElement('li'); li.textContent = r.name; frag.appendChild(li); });
listEl.replaceChildren(frag);   // 1 lần cập nhật DOM thay vì 1.000 lần
```

**Vì sao vẫn là ③:** áp năng lực ở quy mô thật, tối ưu cập nhật DOM.

## ▸ Ex·V3 — ④ Chuyên sâu
**Ở mức này bạn nắm:** luồng render trình duyệt (parse → DOM/CSSOM → layout → paint → composite), reflow/repaint, đo bằng Performance API, tối ưu Core Web Vitals — và đặt chuẩn cho team.

**Ví dụ 1 — chẩn "layout thrashing".**
```js
// ❌ đọc offsetHeight ngay sau khi ghi style → forced reflow N lần
items.forEach(el => { el.style.height = 'auto'; const h = el.offsetHeight; el.style.height = h + 20 + 'px'; });
// ✅ tách pha đọc / ghi → 1 lần reflow
const hs = items.map(el => el.offsetHeight);
items.forEach((el, i) => { el.style.height = hs[i] + 20 + 'px'; });
```

**Ví dụ 2 — chống nghẽn UI khi xử lý nặng.** Vòng lặp nặng làm treo trình duyệt (không click được). Bạn chia nhỏ bằng `requestIdleCallback` hoặc đẩy sang Web Worker để giữ giao diện mượt:
```js
const worker = new Worker('heavy.js');
worker.postMessage(bigData);
worker.onmessage = (e) => render(e.data);   // tính toán nặng chạy nền, main thread rảnh
```

**Ví dụ 3 — đo để chứng minh, không cảm tính.**
```js
performance.mark('start'); doWork(); performance.mark('end');
performance.measure('work', 'start', 'end');
console.log(performance.getEntriesByName('work')[0].duration, 'ms');
```
Ở mức ④ bạn còn viết quy ước tối ưu thành guideline + bật lint để lỗi không tái diễn.

**Vì sao là mức ④:** hiểu máy chạy để ra quyết định và đặt chuẩn cho cả team.
