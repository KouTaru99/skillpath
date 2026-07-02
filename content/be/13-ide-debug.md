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

## ▸ Senior·V1 — ③ Thành thạo
**Khác V2:** đọc được **thread dump** (ảnh chụp trạng thái mọi luồng tại một thời điểm) để chẩn đoán service bị treo — công cụ mà breakpoint thường không dùng được (vì service đang treo thật ở production, không thể gắn debugger vào).

**Ví dụ thực tế — dùng thread dump tìm luồng đang chờ deadlock.**
```bash
jstack <pid> > thread-dump.txt
```
```
"pool-1-thread-3" waiting to lock 0x000000076b... (account1)
    which is held by "pool-1-thread-7"
"pool-1-thread-7" waiting to lock 0x000000076c... (account2)
    which is held by "pool-1-thread-3"

Found 1 deadlock.
```
Bạn đọc thread dump thấy rõ 2 luồng đang chờ khoá của nhau (kinh điển deadlock) — thông tin mà không thể thấy được nếu chỉ gắn breakpoint (service đã treo cứng, không đứng ở một dòng code cụ thể để bạn dừng lại).

**Vì sao là mức ③:** bạn chẩn đoán được lỗi ở tầng đa luồng bằng công cụ chuyên biệt — không chỉ debug từng dòng code tuần tự.
