# UX/UI cơ bản

**Định nghĩa.** **UI** (User Interface) là phần nhìn–chạm: bố cục, màu, chữ, khoảng cách, trạng thái nút. **UX** (User Experience) là *cảm nhận tổng thể* khi dùng: dễ hiểu không, mất mấy bước, có bị lạc/khó chịu không. Với một Front-end dev, không cần là designer, nhưng phải hiểu đủ để **hiện thực thiết kế đúng ý đồ** và **phối hợp với Designer** qua một ngôn ngữ chung (Design System, spacing, state). Trong company skill, đây thuộc nhóm *Web GUI Design* và *Human Factors Engineering* (kỹ thuật yếu tố con người).

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiện thực đúng các trạng thái của giao diện (không chỉ "trạng thái đẹp"), tuân theo token của Design System (màu, spacing, font), và biết các nguyên tắc cơ bản: phản hồi tức thì, vùng chạm đủ lớn, tương phản đủ đọc.

**Ví dụ thực tế — đủ 4 trạng thái của một danh sách.** Người mới hay chỉ làm trạng thái "có dữ liệu". Đủ UX cơ bản là:
```jsx
if (loading) return <Skeleton rows={5} />;     // đang tải → skeleton, không để trắng
if (error)   return <ErrorBox onRetry={reload} />; // lỗi → có nút thử lại
if (items.length === 0) return <Empty hint="Chưa có đơn hàng nào" />; // rỗng → gợi ý
return <OrderList items={items} />;            // có dữ liệu
```
Và dùng token thay vì số tự chế, để khớp Design System:
```css
.btn { padding: var(--space-2) var(--space-4); border-radius: var(--radius); background: var(--brand); }
```

**Vì sao là mức ①:** bạn làm giao diện "dùng được" đúng chuẩn thiết kế, nhưng chưa tự đánh giá/đề xuất cải tiến trải nghiệm.

## ▸ Ex·V2 — ① Nhập môn (mở rộng phạm vi)
**Khác V1:** vẫn mức nhập môn nhưng áp ở **luồng nhiều bước** — đảm bảo trải nghiệm liền mạch qua các màn, và phối hợp chặt hơn với Designer khi thiết kế chưa phủ hết tình huống.

**Ví dụ thực tế — luồng thanh toán không bỏ rơi người dùng.** Khi hiện thực luồng 3 bước (giỏ hàng → địa chỉ → thanh toán), bạn bổ sung những thứ thiết kế tĩnh hay thiếu:
```
- Chỉ báo bước hiện tại (1/3, 2/3, 3/3) để người dùng không lạc.
- Giữ lại dữ liệu khi quay lại bước trước (không bắt nhập lại).
- Nút "Thanh toán" khoá + hiện loading khi đang xử lý để tránh bấm 2 lần.
- Thông báo lỗi đặt NGAY cạnh ô sai, không gom một cục trên đầu.
```
Bạn chủ động hỏi Designer: *"Bước 2 khi địa chỉ trống thì hiện gì?"* thay vì tự đoán.

**Vì sao vẫn là ①:** bạn xử lý tốt trải nghiệm trong phạm vi được giao, chưa tới mức định hình UX cho sản phẩm.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** bạn **tự đánh giá và đề xuất cải tiến UX** dựa trên nguyên tắc khả dụng (usability), không chỉ chờ Designer; biết cân nhắc accessibility và hành vi người dùng.

**Ví dụ thực tế — phát hiện và sửa điểm gây bỏ cuộc.** Quan sát số liệu thấy nhiều người rời ở form đăng ký, bạn đề xuất:
```
- Gộp 12 trường thành 3 nhóm có tiêu đề → bớt cảm giác "dài".
- Validate ngay khi rời ô (onBlur), báo lỗi cụ thể "Email chưa đúng định dạng".
- Hiện/ẩn mật khẩu + yêu cầu độ mạnh trực quan thay vì báo lỗi sau khi submit.
- Thêm nhãn aria + focus đúng thứ tự tab cho người dùng bàn phím/đọc màn hình.
```
Bạn trình bày đề xuất kèm lý do khả dụng để thuyết phục Designer/PO.

**Vì sao là mức ②:** bạn không chỉ hiện thực mà còn góp phần nâng chất lượng trải nghiệm.
