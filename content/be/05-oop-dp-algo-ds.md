# OOP / Design Pattern / Algorithm / Data Structure

**Định nghĩa.** Bốn nền tảng khoa học máy tính dùng chung cho mọi dev:
- **OOP**: tổ chức code quanh *đối tượng* với đóng gói (encapsulation), kế thừa (inheritance), đa hình.
- **Design Pattern**: lời giải mẫu cho bài toán thiết kế lặp lại (Creational: Singleton, Factory; Structural: Adapter).
- **Algorithm**: cách giải + đánh giá chi phí (độ phức tạp — Big-O).
- **Data Structure**: cách tổ chức dữ liệu (kiểu cơ bản, mảng...) — chọn đúng thì nhanh & gọn.

Ở Back-end (Java) chúng không hàn lâm: chọn đúng cấu trúc và pattern quyết định service chạy nhanh, dễ bảo trì hay không.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu class/method/encapsulation/inheritance; pattern đơn giản (Singleton, Factory, Adapter); đánh giá độ phức tạp cơ bản (O(n) vs O(n²)); cài đặt được thuật toán sắp xếp/tìm kiếm cơ bản.

**Ví dụ thực tế — Singleton cho một service dùng chung (Spring tự làm điều này).**
```java
@Service   // Spring mặc định tạo DUY NHẤT 1 instance của service này (singleton) trong toàn ứng dụng
public class EmailService {
  public void send(String to, String subject) { /* ... */ }
}
```
Bạn không cần tự viết pattern Singleton thủ công (private constructor + static instance) — Spring's `@Service`/`@Component` đã áp dụng sẵn nguyên lý này, hiểu bản chất giúp bạn biết vì sao inject cùng 1 service ở nhiều nơi vẫn dùng chung 1 instance.

**Ví dụ 2 — độ phức tạp: tránh vòng lặp lồng nhau không cần thiết.**
```java
// ❌ O(n*m): với mỗi order lại duyệt lại toàn bộ user
for (Order o : orders) {
  for (User u : users) { if (u.getId().equals(o.getUserId())) o.setUserName(u.getName()); }
}
// ✅ O(n+m): dựng Map tra cứu O(1)
Map<Long, String> nameById = users.stream().collect(Collectors.toMap(User::getId, User::getName));
orders.forEach(o -> o.setUserName(nameById.get(o.getUserId())));
```

**Vì sao là mức ①:** nắm khái niệm, chọn đúng cấu trúc/pattern cơ bản cho bài toán đơn giản.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** tự thiết kế class hướng đối tượng, implement được pattern cơ bản (không chỉ nhận diện), dùng đúng cấu trúc dữ liệu (Array, ArrayList, Map) vào task thực tế.

**Ví dụ thực tế — implement Factory pattern cho việc tạo thông báo theo kênh khác nhau.**
```java
interface Notifier { void send(String to, String message); }

class EmailNotifier implements Notifier {
  public void send(String to, String message) { /* gửi email */ }
}
class SmsNotifier implements Notifier { /* ... */ }

class NotifierFactory {
  static Notifier create(String channel) {
    return switch (channel) {
      case "EMAIL" -> new EmailNotifier();
      case "SMS" -> new SmsNotifier();
      default -> throw new IllegalArgumentException("Kênh không hỗ trợ: " + channel);
    };
  }
}
```
Bạn tự implement pattern (Factory) để thêm kênh mới (vd Zalo) chỉ cần thêm 1 class + 1 case, không sửa code gọi.

**Vì sao là mức ②:** tự thiết kế và implement được pattern cơ bản cho bài toán thực tế, không chỉ nhận diện pattern có sẵn.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V1:** hiểu chuyên sâu hơn — implement được pattern nâng cao hơn (Builder, Prototype, Bridge, Decorator, Facade, Proxy), nhận biết giải thuật cây/đồ thị/chia-để-trị, đánh giá space-time tradeoff của cấu trúc dữ liệu.

**Ví dụ thực tế — Builder pattern cho object có nhiều tham số tuỳ chọn.**
```java
Order order = Order.builder()
    .customerId(42L)
    .items(items)
    .discountCode("SALE10")   // tham số tuỳ chọn — có thể bỏ qua
    .build();
```
Thay vì constructor với 10 tham số (dễ truyền nhầm thứ tự, khó đọc), Builder cho phép set từng phần rõ ràng theo tên, bỏ qua tham số không cần.

**Ví dụ 2 — nhận biết bài toán cần giải thuật chia-để-trị.** Tìm 2 sản phẩm trong danh sách đã sắp xếp có tổng giá đúng bằng ngân sách khách đưa ra — bạn nhận ra đây là bài toán "two pointers" (O(n)) thay vì so từng cặp (O(n²)).

**Vì sao là mức ③:** bạn vận dụng được pattern và giải thuật ở mức nâng cao hơn, đánh giá đúng đánh đổi — không chỉ implement pattern cơ bản.
