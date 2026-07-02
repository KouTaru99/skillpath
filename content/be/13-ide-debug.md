# IDE & debug code

**Định nghĩa.** Sử dụng thành thạo một IDE (IntelliJ IDEA, Eclipse, VS Code) và biết **debug** — gắn breakpoint để dừng chương trình đúng chỗ, xem giá trị biến tại thời điểm đó, thay vì đoán lỗi qua `System.out.println` rải rác.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đặt breakpoint, chạy debug, xem giá trị biến, bước qua từng dòng (step over/into) để tìm lỗi cơ bản.

**Ví dụ thực tế — debug một API trả sai kết quả.**
```java
public Order getOrder(Long id) {
  Order order = orderRepository.findById(id).orElse(null);
  return order;   // ← đặt breakpoint tại đây
}
```
Bạn đặt breakpoint ngay dòng `return`, chạy debug, xem giá trị `order` có đúng `id` mong muốn không, có `null` bất ngờ không — thay vì đoán mò hoặc thêm hàng loạt `println` rồi xoá đi.

**Vì sao là mức ①:** debug được lỗi đơn giản trong phạm vi một hàm, chưa xử lý lỗi phức tạp (đa luồng, môi trường production).

## ▸ Ex·V2 — ② Biết làm
**Khác Entry:** dùng được **breakpoint điều kiện** (chỉ dừng khi thoả điều kiện cụ thể) và **watch expression** (theo dõi giá trị mà không cần dừng liên tục) — cần thiết khi lỗi chỉ xảy ra ở một ca cụ thể giữa hàng nghìn lần gọi.

**Ví dụ thực tế — breakpoint điều kiện để bắt đúng ca lỗi hiếm.** Hàm xử lý 10.000 đơn hàng, nhưng chỉ đơn `id = 4821` bị lỗi. Thay vì dừng ở mọi lần lặp rồi bấm Continue 4820 lần, bạn đặt breakpoint điều kiện:
```
Điều kiện breakpoint (IntelliJ): order.getId() == 4821L
```
Debugger chỉ dừng đúng lần lặp đó — tiết kiệm hàng chục phút so với dừng thủ công từng vòng lặp.

**Vì sao là mức ②:** dùng được kỹ thuật debug nâng cao để bắt đúng ca lỗi cụ thể trong dữ liệu lớn — không chỉ debug hàm đơn giản.
