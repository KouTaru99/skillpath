# Lập trình fullstack

**Định nghĩa.** Tự viết được cả Front-end lẫn Back-end cho một tính năng trọn vẹn. Khác [CSDL cơ bản + web server](/fe/ky-nang/12-csdl-co-ban) (đọc hiểu đủ để phối hợp): ở đây bạn **tự tay code** phần Back-end (thường **Java/Spring** theo stack career-path VCS) khi cần — không chỉ đọc hiểu code người khác viết.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tự viết được một API Back-end đơn giản (CRUD) bằng Java/Spring Boot để phục vụ tính năng mình đang làm, khi team Back-end bận hoặc thiếu người — không chỉ đọc hiểu code Back-end.

**Ví dụ thực tế — tự viết API "ghi chú nội bộ cho đơn hàng" (BE team chưa kịp làm).**
```java
@RestController
@RequestMapping("/api/orders/{orderId}/notes")
public class OrderNoteController {

  private final OrderNoteRepository repo;
  public OrderNoteController(OrderNoteRepository repo) { this.repo = repo; }

  @GetMapping
  public List<OrderNote> list(@PathVariable Long orderId) {
    return repo.findByOrderId(orderId);
  }

  @PostMapping
  public ResponseEntity<OrderNote> create(@PathVariable Long orderId, @RequestBody NoteDto dto) {
    OrderNote saved = repo.save(new OrderNote(orderId, dto.content()));
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
  }
}
```
```java
public interface OrderNoteRepository extends JpaRepository<OrderNote, Long> {
  List<OrderNote> findByOrderId(Long orderId);   // Spring Data tự sinh câu query từ tên hàm
}
```
Bạn tự code đủ để tính năng FE của mình có API dùng ngay, thay vì bị chặn (block) chờ Back-end rảnh tay — miễn tính năng đủ đơn giản (CRUD cơ bản, không đụng nghiệp vụ phức tạp hay bảo mật nhạy cảm).

**Vì sao là mức ①:** bạn tự viết được API đơn giản để không bị phụ thuộc hoàn toàn vào Back-end — chưa đảm nhận được phần Back-end phức tạp (giao dịch, bảo mật, hiệu năng) một mình.

## ▸ Senior·V3 — ② Biết làm
**Khác V1:** tự xử lý được phần Back-end có **giao dịch (transaction)** — nhiều bước phải cùng thành công hoặc cùng thất bại, không để dữ liệu lệch nửa chừng.

**Ví dụ thực tế — API "chuyển đơn hàng sang trạng thái đã thanh toán" phải cập nhật 2 bảng cùng lúc.**
```java
@Transactional   // nếu bước 2 lỗi, bước 1 cũng tự động bị huỷ (rollback) — không lệch dữ liệu
public void markAsPaid(Long orderId) {
  Order order = orderRepo.findById(orderId).orElseThrow();
  order.setStatus("PAID");
  orderRepo.save(order);                                    // bước 1

  inventoryRepo.decreaseStock(order.getProductId(), order.getQty());  // bước 2 — trừ kho
}
```
Không có `@Transactional`, nếu bước 2 (trừ kho) lỗi giữa chừng, đơn hàng đã bị đánh dấu "đã thanh toán" nhưng kho chưa trừ — dữ liệu lệch nhau vĩnh viễn. Bạn hiểu và áp dụng đúng ranh giới giao dịch, không chỉ viết CRUD đơn lẻ.

**Vì sao là mức ②:** bạn xử lý đúng các thao tác Back-end nhiều bước cần toàn vẹn dữ liệu — không chỉ viết được API CRUD đơn giản từng bảng riêng lẻ.

## ▸ Specialist·V2 — ③ Thành thạo
**Khác V1:** tự viết được phần **kiểm quyền (authorization)** đúng cách ở Back-end, không chỉ dựa vào FE ẩn nút — nhắc lại đúng nguyên tắc đã học ở [Lập trình an toàn](/fe/ky-nang/03-lap-trinh-an-toan) nhưng lần này tự tay code phần đó.

**Ví dụ thực tế — API "xoá đơn hàng" chỉ admin mới được gọi, kiểm tra Ở BACKEND chứ không chỉ ẩn nút FE.**
```java
@DeleteMapping("/api/orders/{id}")
@PreAuthorize("hasRole('ADMIN')")   // Spring Security tự chặn nếu không phải role ADMIN
public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
  Order order = orderRepo.findById(id).orElseThrow();
  if (!canManage(auth, order)) {
    throw new AccessDeniedException("Không có quyền xoá đơn này");   // kiểm thêm ở mức nghiệp vụ
  }
  orderRepo.delete(order);
  return ResponseEntity.noContent().build();
}
```
Bạn tự viết đủ 2 lớp kiểm quyền: `@PreAuthorize` (kiểm role chung) và kiểm nghiệp vụ cụ thể (`canManage`, ví dụ chỉ được xoá đơn thuộc chi nhánh mình quản lý) — không dừng ở việc ẩn nút "Xoá" phía FE như mức Senior đã cảnh báo.

**Vì sao là mức ③:** bạn tự tay hiện thực được lớp bảo mật Back-end quan trọng nhất (kiểm quyền), không chỉ viết CRUD/transaction — mức cao nhất của kỹ năng fullstack trong thang này.
