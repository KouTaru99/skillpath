# Component dùng chung (đóng gói & tái sử dụng)

**Định nghĩa.** Component dùng chung là những khối UI/logic được **đóng gói để tái sử dụng** nhiều nơi: nút, ô nhập, modal, bảng, hoặc hook logic. Mục tiêu là **DRY** (Don't Repeat Yourself — không lặp lại): viết một lần, dùng nhiều chỗ, sửa một chỗ là cập nhật toàn bộ. Làm tốt thì cả dự án (và cả công ty) đồng nhất về giao diện và hành vi; làm ẩu thì component "dùng chung" lại đầy ngoại lệ, khó dùng hơn tự viết mới. Đây là kỹ năng phân biệt rõ dev biết code với dev xây nền cho đội.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tách một khối lặp lại thành component nhận `props`, biết đặt API (tên prop) đơn giản và rõ ràng.

**Ví dụ thực tế — nút dùng chung.**
```jsx
function Button({ variant = 'primary', loading = false, children, ...rest }) {
  return (
    <button className={`btn btn--${variant}`} disabled={loading} {...rest}>
      {loading ? <Spinner size={16} /> : children}
    </button>
  );
}
// Dùng: <Button variant="danger" onClick={remove}>Xoá</Button>
```
`...rest` cho phép truyền thẳng `onClick`, `type`... mà không cần khai báo lại từng cái.

**Vì sao là mức ①:** tách được component tái dùng đơn giản, nhưng chưa lường hết tình huống dùng.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** thiết kế component **linh hoạt mà vẫn nhất quán** — API hợp lý, có giá trị mặc định, kiểm soát kiểu dữ liệu (TypeScript/PropTypes), xử lý accessibility, và tránh "prop bùng nổ".

**Ví dụ thực tế — Modal tái dùng đúng cách.**
```tsx
interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';     // ràng buộc giá trị, tránh truyền bừa
}

function Modal({ open, title, onClose, children, size = 'md' }: ModalProps) {
  useEffect(() => {                                  // Esc để đóng — a11y
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className={`modal modal--${size}`} role="dialog" aria-label={title}
           onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
```
Bạn lo cả `role="dialog"`, đóng bằng Esc, chặn click lan ra overlay — những thứ khiến component thực sự "dùng được chung".

**Vì sao là mức ②:** component bền, có hợp đồng rõ, người khác dùng không cần đọc mã nguồn.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** xây **bộ component cấp dự án/công ty** — nhất quán theo Design System, có tài liệu/demo, kiểm soát phiên bản, và cân nhắc đánh đổi giữa linh hoạt và đơn giản.

**Ví dụ thực tế — component theo token + composition.** Thay vì nhồi 20 prop, bạn thiết kế theo *composition* (ghép khối) để vừa linh hoạt vừa gọn:
```jsx
<Card>
  <Card.Header>Đơn hàng #1234</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer><Button>Chi tiết</Button></Card.Footer>
</Card>
```
Bạn gắn component vào token Design System (màu/spacing lấy từ biến chung), viết trang demo (Storybook) làm tài liệu sống, và đặt quy ước versioning để các team khác nâng cấp an toàn.

**Vì sao là mức ③:** bạn tạo ra nền tảng dùng chung cho nhiều người, không chỉ cho dự án của mình.
