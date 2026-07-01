# Framework Front-end (React / Angular / Vue)

**Định nghĩa.** Framework/thư viện Front-end giúp dựng giao diện theo **component** (khối UI đóng gói tái dùng), tự động **quản lý render** khi dữ liệu đổi (qua virtual DOM hoặc reactivity) thay vì thao tác DOM thủ công. Tư tưởng chung cho cả ba — **component, props (dữ liệu truyền vào), state (trạng thái nội bộ), vòng đời (lifecycle)** — nên hiểu sâu một cái thì chuyển cái khác nhanh. Ví dụ dưới dùng **React** (phổ biến nhất ở VN), nhưng nguyên lý áp dụng cho Vue/Angular.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu component nhận `props` và giữ `state`; dựng component đơn giản, render danh sách, bắt sự kiện.

**Ví dụ thực tế — component thông báo.**
```jsx
function NotificationItem({ item, onRead }) {     // props: item, onRead
  return (
    <li className={item.read ? 'read' : 'unread'}>
      <strong>{item.title}</strong>
      {!item.read && <button onClick={() => onRead(item.id)}>Đã đọc</button>}
    </li>
  );
}

function NotificationList({ items, onRead }) {
  return <ul>{items.map(n => <NotificationItem key={n.id} item={n} onRead={onRead} />)}</ul>;
}
```
Bạn hiểu `key` để React phân biệt item, và dữ liệu chảy một chiều cha → con qua props.

**Vì sao là mức ①:** dựng được UI bằng component, nhưng chưa quản state phức tạp hay tối ưu.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** dùng tốt **hooks** (`useState`, `useEffect`), gọi API, quản state cục bộ, tách component tái dùng, làm controlled form.

**Ví dụ thực tế — custom hook `useFetch`.** Đóng gói logic tải dữ liệu để mọi màn dùng lại:
```jsx
function useFetch(url) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let alive = true;
    fetch(url)
      .then(r => r.json())
      .then(d => alive && setState({ loading: false, data: d, error: null }))
      .catch(e => alive && setState({ loading: false, data: null, error: e }));
    return () => { alive = false; };   // cleanup: tránh setState sau khi component unmount
  }, [url]);
  return state;
}
```
Cờ `alive` + hàm cleanup là chi tiết "biết làm" — chặn lỗi cập nhật state trên component đã gỡ.

**Vì sao là mức ②:** đóng gói logic tái dùng, quản vòng đời dữ liệu đúng.

## ▸ Ex·V2 — ③ Thành thạo
**Khác V1:** **tối ưu render** — hiểu reconciliation (React so sánh và cập nhật phần đổi), tránh re-render thừa bằng `useMemo`/`useCallback`/`React.memo`, và quản state phức tạp bằng Context/reducer.

**Ví dụ thực tế — chặn tính lại danh sách lọc mỗi lần render.**
```jsx
const visible = useMemo(
  () => products.filter(p => p.name.toLowerCase().includes(kw.toLowerCase())),
  [products, kw]                       // chỉ tính lại khi products hoặc kw đổi
);

const ProductCard = React.memo(function ProductCard({ p }) {  // không re-render nếu p không đổi
  return <div className="card">{p.name}</div>;
});
```
Bạn nhận ra khi nào `useMemo` đáng dùng (tính toán nặng / danh sách lớn) và khi nào là tối ưu thừa.

**Vì sao là mức ③:** làm chủ cơ chế render, app mượt ở quy mô thật.

## ▸ Ex·V3 — ③ Thành thạo (mở rộng phạm vi)
**Khác V2:** cùng mức nhưng áp ở **kiến trúc app lớn** — chia layer, tách route theo `lazy`/code-splitting, bọc lỗi bằng Error Boundary, và **đặt convention component** cho cả team.

**Ví dụ thực tế — chia tải theo route + chặn sập toàn trang.**
```jsx
const Dashboard = lazy(() => import('./Dashboard'));   // chỉ tải khi vào route này

<ErrorBoundary fallback={<ErrorPage/>}>
  <Suspense fallback={<Spinner/>}>
    <Dashboard/>
  </Suspense>
</ErrorBoundary>
```
Bạn còn đánh giá đánh đổi giữa các giải pháp quản state (Context vs Redux vs Zustand) theo quy mô dự án, và viết hướng dẫn cấu trúc thư mục/component để cả team theo.

**Vì sao vẫn là ③:** bạn áp năng lực "thành thạo" lên tầm hệ thống và đội ngũ, không chỉ một màn.
