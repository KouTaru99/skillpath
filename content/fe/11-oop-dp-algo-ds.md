# OOP / Design Pattern / Algorithm / Data Structure

**Định nghĩa.** Bốn nền tảng khoa học máy tính dùng chung cho mọi dev:
- **OOP** (Object-Oriented Programming): tổ chức code quanh *đối tượng* với đóng gói (encapsulation), kế thừa (inheritance), đa hình (polymorphism).
- **Design Pattern**: lời giải mẫu cho các bài toán thiết kế lặp lại (Singleton, Factory, Observer...).
- **Algorithm**: cách giải một bài toán và đánh giá chi phí (độ phức tạp Big-O).
- **Data Structure**: cách tổ chức dữ liệu (mảng, map, stack, cây...) — chọn đúng cấu trúc thì thuật toán nhanh và gọn.

Ở FE chúng không "hàn lâm": chọn đúng cấu trúc dữ liệu và pattern quyết định code có dễ bảo trì và chạy nhanh không.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu khái niệm cơ bản: class/object, đóng gói; pattern đơn giản (Singleton, Factory); độ phức tạp cơ bản (O(n) vs O(n²)); và cấu trúc thường dùng (array, object/map).

**Ví dụ thực tế — chọn `Map` thay vì lặp lồng nhau.** Cần ghép tên user vào mỗi đơn hàng:
```js
// ❌ O(n*m): với mỗi đơn, quét lại toàn bộ user
orders.forEach(o => { o.userName = users.find(u => u.id === o.userId).name; });

// ✅ O(n+m): dựng map tra cứu O(1)
const userById = new Map(users.map(u => [u.id, u.name]));
orders.forEach(o => { o.userName = userById.get(o.userId); });
```
Bạn nhận ra vì sao cách hai nhanh hơn hẳn khi dữ liệu lớn.

**Vì sao là mức ①:** nắm khái niệm và chọn đúng cấu trúc cơ bản, chưa thiết kế phức tạp.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** áp dụng OOP/pattern vào code thật để tách bạch trách nhiệm, và đọc được độ phức tạp để tránh code chậm ngầm.

**Ví dụ thực tế — pattern Observer cho trạng thái dùng chung.**
```js
class Store {                       // đóng gói state + thông báo khi đổi
  #state; #listeners = new Set();
  constructor(initial) { this.#state = initial; }
  get() { return this.#state; }
  set(next) { this.#state = next; this.#listeners.forEach(fn => fn(next)); }
  subscribe(fn) { this.#listeners.add(fn); return () => this.#listeners.delete(fn); }
}
const cart = new Store({ items: [] });
const unsub = cart.subscribe(s => renderBadge(s.items.length));  // tự cập nhật khi giỏ đổi
```
Bạn dùng `#field` để đóng gói thật (private), và Observer để các phần UI tự phản ứng khi state đổi.

**Vì sao là mức ②:** vận dụng pattern/OOP để code sạch và đúng chi phí.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** dùng cấu trúc/giải thuật cho bài toán FE thực tế hơn — cây (tree), đệ quy, gom nhóm — và biết đánh đổi bộ nhớ/thời gian.

**Ví dụ thực tế — render cây danh mục nhiều cấp.** Dữ liệu phẳng có `parentId`, dựng cây rồi render đệ quy:
```js
function buildTree(items, parentId = null) {
  return items
    .filter(i => i.parentId === parentId)
    .map(i => ({ ...i, children: buildTree(items, i.parentId === null ? i.id : i.id) }));
}
// đệ quy theo cấp; với cây sâu lớn, cân nhắc dựng map cha→con (O(n)) thay vì lọc lặp.
```
Bạn nhận ra cách lọc lặp là O(n²) và biết khi nào nên đổi sang dựng map một lần cho O(n).

**Vì sao vẫn là ②:** xử lý tốt bài toán cấu trúc vừa, chưa tới mức tối ưu/giải thuật nâng cao.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** nắm pattern ở mức kiến trúc (chuyển High-level design sang thiết kế class/module), nhận diện và tối ưu điểm nghẽn giải thuật, chọn cấu trúc dữ liệu tối ưu có cân nhắc đánh đổi.

**Ví dụ thực tế — tối ưu tìm kiếm gợi ý (autocomplete).** Lọc 50.000 mục bằng `includes` mỗi phím gõ quá chậm; bạn đề xuất và đánh giá phương án:
```
- Map/index theo tiền tố, hoặc cấu trúc Trie → tra cứu nhanh hơn nhiều.
- Đánh đổi: Trie tốn bộ nhớ + dựng trước; hợp khi tập dữ liệu ổn định, truy vấn nhiều.
- Nếu dữ liệu đổi liên tục → để server lo (full-text search) thay vì gánh ở client.
```
Bạn ra quyết định dựa trên Big-O *và* bối cảnh, rồi hướng dẫn lại đội.

**Vì sao là mức ③:** bạn dùng nền tảng CS để ra quyết định kiến trúc, không chỉ giải bài.
