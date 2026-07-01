# RESTful API (tích hợp Back-end)

**Định nghĩa.** **API** (Application Programming Interface) là "hợp đồng" để hai phần mềm nói chuyện. **REST** là một phong cách thiết kế API qua HTTP: mỗi *tài nguyên* (resource) có một URL, và ta thao tác bằng các **HTTP method** — `GET` (đọc), `POST` (tạo), `PUT/PATCH` (sửa), `DELETE` (xoá) — kèm **status code** chuẩn (2xx thành công, 4xx lỗi do client, 5xx lỗi server). Với Front-end, đây là cầu nối: hiểu đúng hợp đồng API thì mới gọi đúng, xử lý lỗi đúng và hiển thị đúng.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu method/URL/status code, gọi được CRUD cơ bản và đọc kết quả JSON, xử lý nhánh thành công/lỗi.

**Ví dụ thực tế — CRUD một tài nguyên.**
```js
// Đọc danh sách
const users = await fetch('/api/users').then(r => r.json());          // GET 200

// Tạo mới
const created = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'An', email: 'an@vcs.com' }),
}).then(r => r.json());                                                // POST 201

// Xoá
const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });     // DELETE 204
if (res.status === 204) removeRow(id);
```
Bạn đọc được ý nghĩa 201 (đã tạo), 204 (thành công, không có nội dung trả về).

**Vì sao là mức ①:** gọi đúng và đọc kết quả, nhưng chưa xử lý lỗi/đồng bộ ở mức bài bản.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** xử lý **đầy đủ vòng đời một request** — phân biệt loại lỗi theo status, gửi token xác thực, xử lý phân trang/lọc qua query param, và đồng bộ trạng thái UI với kết quả.

**Ví dụ thực tế — gọi API có xác thực, phân trang và phân loại lỗi.**
```js
async function getOrders({ page = 1, status, token }) {
  const qs = new URLSearchParams({ page, ...(status && { status }) });
  const res = await fetch(`/api/orders?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) { logout(); return; }           // hết phiên
  if (res.status === 403) throw new Error('Không có quyền');
  if (!res.ok) throw new Error('Lỗi máy chủ, thử lại sau');
  return res.json();   // { items, total, page }
}
```
Bạn dùng `URLSearchParams` để dựng query an toàn, và mỗi nhánh status có cách xử lý riêng đúng nghĩa.

**Vì sao là mức ②:** bạn tích hợp API đúng bài, chủ động với lỗi và xác thực.

## ▸ Ex·V3 — ② Biết làm (mở rộng phạm vi)
**Khác V2:** vẫn "biết làm" nhưng ở **quy mô tích hợp nhiều API** — gọi song song, gộp/biến đổi dữ liệu, xử lý race condition, và đặt một lớp API dùng chung cho cả app.

**Ví dụ thực tế — dashboard gọi nhiều API song song + chống race.**
```js
// Gọi song song thay vì tuần tự → nhanh hơn nhiều
const [summary, chart, alerts] = await Promise.all([
  api('/summary'), api('/chart'), api('/alerts'),
]);

// Chống race: ô tìm kiếm gõ nhanh, chỉ giữ kết quả của request mới nhất
let reqId = 0;
async function search(kw) {
  const id = ++reqId;
  const data = await api(`/search?q=${kw}`);
  if (id === reqId) render(data);   // bỏ qua kết quả của request cũ về muộn
}
```
Bạn nhận ra rủi ro kết quả cũ về sau ghi đè kết quả mới — một bug tinh vi — và xử lý gọn bằng cờ `reqId`.

**Vì sao vẫn là ②:** bạn tích hợp vững ở quy mô thật, chưa tới mức thiết kế chuẩn giao tiếp cấp hệ thống.
