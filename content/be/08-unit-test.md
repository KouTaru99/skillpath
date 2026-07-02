# Unit Test

**Định nghĩa.** **Unit test** là bài kiểm thử tự động cho từng *đơn vị* nhỏ (một hàm, một service) — chạy độc lập, nhanh, khẳng định "đầu vào X thì đầu ra phải Y". Mục đích: bắt lỗi sớm, cho phép sửa/refactor mà không sợ vỡ ngầm. Mẫu **AAA** (Arrange – Act – Assert). Java dùng **JUnit** (viết test) + **Mockito** (giả lập phụ thuộc).

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết test cho hàm/service đơn giản theo hướng dẫn, biết chạy và đọc kết quả pass/fail.

**Ví dụ thực tế — test một service tính giảm giá.**
```java
class DiscountServiceTest {
  private final DiscountService service = new DiscountService();

  @Test
  void ápDụng10PhầnTrămChoĐơnTrên500K() {
    // Arrange
    double total = 600_000;
    // Act
    double result = service.applyDiscount(total);
    // Assert
    assertEquals(540_000, result);   // giảm 10% cho đơn > 500k
  }

  @Test
  void khôngGiảmGiáChoĐơnDưới500K() {
    assertEquals(300_000, service.applyDiscount(300_000));   // ca biên: không đủ điều kiện
  }
}
```
Bạn chọn vài ca tiêu biểu (giá trị thường + biên) thay vì test bừa.

**Vì sao là mức ①:** viết được test cơ bản theo mẫu AAA, chưa test được service có phụ thuộc (cần mock) hay luồng bất đồng bộ.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** hiểu cách **thiết kế code để test được** — tách phụ thuộc ra ngoài (dependency injection) để có thể mock khi test, thay vì code cứng khó test.

**Ví dụ thực tế — mock một dependency (Mockito) để test service không phụ thuộc CSDL thật.**
```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
  @Mock OrderRepository repository;      // giả lập, không chạm CSDL thật
  @InjectMocks OrderService service;

  @Test
  void trảLỗiKhiKhôngTìmThấyĐơn() {
    when(repository.findById(1L)).thenReturn(Optional.empty());
    assertThrows(OrderNotFoundException.class, () -> service.getOrder(1L));
  }
}
```
Test chạy nhanh (không cần CSDL thật) và ổn định (không phụ thuộc dữ liệu có sẵn) — nhờ `OrderService` nhận `OrderRepository` qua constructor (dependency injection) thay vì tự tạo bên trong.

**Vì sao là mức ②:** thiết kế code để test được và mock đúng phụ thuộc — không chỉ test hàm thuần đơn giản.

## ▸ Senior·V1 — ③ Thành thạo
**Khác Ex·V2:** setup được **integration test** — chạy với CSDL thật (không chỉ mock) để bắt lỗi ở tầng ghép nối mà unit test kèm mock không thấy được.

**Ví dụ thực tế — Testcontainers: chạy test với PostgreSQL thật trong container, tự dọn sau khi xong.**
```java
@Testcontainers
class OrderRepositoryIntegrationTest {
  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

  @Test
  void lưuVàTruyVấnĐơnHàngThậtTrênCSDL() {
    Order saved = orderRepository.save(new Order("PENDING"));
    Optional<Order> found = orderRepository.findById(saved.getId());
    assertTrue(found.isPresent());   // test với query THẬT, không phải mock giả định
  }
}
```
Mock (`OrderRepository` giả) chỉ đảm bảo service gọi đúng hàm, nhưng KHÔNG bắt được lỗi trong câu query JPA thật (vd sai tên cột, sai kiểu dữ liệu). Testcontainers tự dựng CSDL thật trong Docker chỉ cho lúc test, tự dọn dẹp sau khi xong — không cần CSDL cài sẵn trên máy.

**Vì sao là mức ③:** setup được integration test bắt đúng lớp lỗi mà unit test/mock không bắt được — không chỉ test logic thuần.
