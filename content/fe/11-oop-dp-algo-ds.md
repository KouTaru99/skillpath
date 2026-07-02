# OOP / Design Pattern / Algorithm / Data Structure

**Định nghĩa.** Bốn nền tảng khoa học máy tính dùng chung cho mọi dev:
- **OOP**: tổ chức code quanh *đối tượng* với đóng gói, kế thừa, đa hình.
- **Design Pattern**: lời giải mẫu cho bài toán thiết kế lặp lại (Singleton, Factory, Observer...).
- **Algorithm**: cách giải + đánh giá chi phí (Big-O).
- **Data Structure**: cách tổ chức dữ liệu (mảng, Map, cây...) — chọn đúng thì nhanh & gọn.

Ở FE (TypeScript/Angular) chúng không hàn lâm: chọn đúng cấu trúc và pattern quyết định code dễ bảo trì và chạy nhanh không.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu class/interface, đóng gói; pattern đơn giản; độ phức tạp cơ bản (O(n) vs O(n²)); cấu trúc thường dùng (array, `Map`).

**Ví dụ thực tế — chọn `Map` thay vì lặp lồng nhau.**
```typescript
// ❌ O(n*m): với mỗi đơn quét lại toàn bộ user
orders.forEach(o => o.userName = users.find(u => u.id === o.userId)!.name);
// ✅ O(n+m): dựng Map tra cứu O(1)
const nameById = new Map(users.map(u => [u.id, u.name]));
orders.forEach(o => o.userName = nameById.get(o.userId));
```

**Vì sao là mức ①:** nắm khái niệm, chọn đúng cấu trúc cơ bản.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** áp OOP/pattern vào code thật để tách trách nhiệm; đọc được độ phức tạp để tránh code chậm ngầm.

**Ví dụ thực tế — Strategy pattern cho nhiều cách sắp xếp (thay vì if/else dài).**
```typescript
type Sorter = (a: Order, b: Order) => number;
const sorters: Record<string, Sorter> = {
  newest: (a, b) => b.createdAt - a.createdAt,
  price:  (a, b) => a.total - b.total,
  name:   (a, b) => a.name.localeCompare(b.name),
};
this.visible = [...orders].sort(sorters[this.sortKey]);   // đổi cách sắp = đổi key, không sửa if
```

**Vì sao là mức ②:** vận dụng pattern để code sạch và đúng chi phí.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** dùng cấu trúc/giải thuật cho bài toán FE thực tế — cây, đệ quy, gom nhóm — và biết đánh đổi.

**Ví dụ thực tế — dựng cây danh mục nhiều cấp từ dữ liệu phẳng.**
```typescript
// dữ liệu phẳng có parentId → dựng cây O(n) bằng Map thay vì lọc lặp O(n²)
function buildTree(items: Cat[]): Cat[] {
  const byId = new Map(items.map(i => [i.id, { ...i, children: [] as Cat[] }]));
  const roots: Cat[] = [];
  byId.forEach(node => {
    node.parentId ? byId.get(node.parentId)?.children.push(node) : roots.push(node);
  });
  return roots;
}
```
Bạn nhận ra cách lọc lặp là O(n²) và biết khi nào nên đổi sang dựng Map một lần cho O(n).

**Vì sao vẫn là ②:** xử lý tốt bài toán cấu trúc vừa, chưa tới tối ưu/giải thuật nâng cao.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** nắm pattern ở mức kiến trúc, nhận diện và tối ưu điểm nghẽn giải thuật, chọn cấu trúc tối ưu có cân nhắc đánh đổi.

**Ví dụ 1 — tối ưu autocomplete 50.000 mục.** Lọc bằng `includes` mỗi phím quá chậm. Bạn đánh giá phương án:
```
- Index theo tiền tố / cấu trúc Trie → tra cứu nhanh hơn nhiều.
- Đánh đổi: Trie tốn bộ nhớ + dựng trước; hợp khi dữ liệu ổn định, truy vấn nhiều.
- Dữ liệu đổi liên tục → để server lo (full-text search) thay vì gánh ở client.
```

**Ví dụ 2 — memo hoá phép tính nặng lặp lại.**
```typescript
const cache = new Map<string, Result>();
function compute(key: string): Result {
  if (cache.has(key)) return cache.get(key)!;   // đổi thời gian lấy bộ nhớ (time–space tradeoff)
  const r = heavyCompute(key);
  cache.set(key, r);
  return r;
}
```

**Vì sao là mức ③:** dùng nền tảng CS để ra quyết định kiến trúc, không chỉ giải bài.

## ▸ Senior·V3 — ④ Chuyên sâu
**Khác Ex·V3:** áp pattern ở **tầm kiến trúc** (nhiều module/nhiều nhà cung cấp), không chỉ trong phạm vi một class.

**Ví dụ thực tế — Adapter pattern để gộp 3 SDK thanh toán khác nhau sau một hợp đồng chung.** Dự án cần tích hợp 3 cổng thanh toán (Momo, VNPay, ZaloPay), mỗi SDK có API khác hẳn nhau. Nếu gọi trực tiếp từng SDK ở khắp nơi trong code, đổi/thêm cổng thanh toán sẽ phải sửa nhiều chỗ.
```typescript
interface PaymentGateway {                          // hợp đồng chung
  charge(amount: number, orderId: string): Promise<PaymentResult>;
}

class MomoAdapter implements PaymentGateway {
  async charge(amount: number, orderId: string) {
    const res = await momoSdk.createPayment({ amount, orderId, ...momoSpecificFields });
    return { success: res.resultCode === 0, transactionId: res.transId };  // dịch response riêng của Momo về chung
  }
}
// ZaloPayAdapter, VnPayAdapter tương tự — mỗi cái "dịch" SDK riêng về cùng 1 hợp đồng

function checkout(gateway: PaymentGateway, amount: number, orderId: string) {
  return gateway.charge(amount, orderId);   // phần còn lại của app KHÔNG cần biết đang dùng SDK nào
}
```
Thêm cổng thanh toán thứ 4 chỉ cần viết thêm một Adapter, không phải sửa code checkout đang chạy.

**Vì sao là mức ④:** bạn dùng design pattern để giải quyết bài toán **kiến trúc thật** (nhiều nhà cung cấp, dễ mở rộng) — không chỉ áp dụng pattern trong phạm vi một class hay một tính năng.
