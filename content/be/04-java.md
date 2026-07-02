# Java (ngôn ngữ lập trình)

**Định nghĩa.** Java là ngôn ngữ hướng đối tượng chạy trên **JVM** (Java Virtual Machine — máy ảo giúp cùng một chương trình chạy được trên nhiều hệ điều hành), phổ biến nhất cho Back-end doanh nghiệp tại Việt Nam (bao gồm Viettel/VCS), thường đi kèm framework **Spring Boot**. Trang này minh hoạ bằng Java/Spring Boot xuyên suốt — dù career-path liệt kê thêm C/C++, Python, Go là các lựa chọn khác.

## ▸ Entry — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Viết code Java rõ ràng, nắm nguyên tắc **SOLID** cơ bản, xử lý ngoại lệ (exception) đúng cách, tuân coding convention.

**Ví dụ thực tế — xử lý ngoại lệ đúng cách khi tìm đơn hàng không tồn tại.**
```java
@GetMapping("/api/orders/{id}")
public Order getOrder(@PathVariable Long id) {
  return orderRepository.findById(id)
      .orElseThrow(() -> new OrderNotFoundException("Không tìm thấy đơn hàng: " + id));
}

// ❌ KHÔNG nên: bắt Exception rồi nuốt lỗi, không ai biết chuyện gì xảy ra
try {
  return orderRepository.findById(id).get();
} catch (Exception e) {
  return null;   // caller nhận null, không biết là lỗi hay đơn hàng thật sự rỗng
}
```
`orElseThrow` với exception có tên rõ ràng (`OrderNotFoundException`) giúp lỗi được xử lý đúng chỗ (Spring tự dịch thành HTTP 404 nếu có `@ExceptionHandler`), thay vì nuốt lỗi âm thầm bằng `catch (Exception e)` chung chung.

**Vì sao là mức ②:** viết code rõ ràng, xử lý ngoại lệ có chủ đích — đã đủ để làm task được giao mà không cần người khác chỉnh lại nhiều.

## ▸ Ex·V1 — ③ Thành thạo
**Khác Entry:** thành thạo ngôn ngữ đủ để tự đọc hiểu tài liệu và code các chức năng phức tạp mà không cần hướng dẫn.

**Ví dụ thực tế — dùng Stream API để xử lý dữ liệu gọn, thay vì vòng lặp thủ công.**
```java
// ❌ Vòng lặp thủ công dài dòng
List<String> names = new ArrayList<>();
for (Order o : orders) {
  if (o.getStatus().equals("COMPLETED")) {
    names.add(o.getCustomerName());
  }
}

// ✅ Stream API — ngắn gọn, rõ ý định
List<String> names = orders.stream()
    .filter(o -> o.getStatus().equals("COMPLETED"))
    .map(Order::getCustomerName)
    .collect(Collectors.toList());
```
Bạn dùng đúng tính năng ngôn ngữ (Stream, Optional, generics) để code ngắn gọn và ít lỗi hơn, không chỉ viết được mà viết đúng "chất Java".

**Vì sao là mức ③:** thành thạo ngôn ngữ, code các chức năng có logic phức tạp mà không cần người hướng dẫn.

## ▸ Ex·V3 — ④ Chuyên sâu
**Khác V1:** phân tích và **tối ưu hiệu năng** dựa trên hiểu biết sâu về cách Java thực thi — không chỉ viết code đúng chức năng.

**Ví dụ thực tế — phát hiện và sửa vấn đề tạo object thừa trong vòng lặp nóng (hot loop).**
```java
// ❌ Tạo mới StringBuilder ở mỗi vòng lặp — tốn bộ nhớ, tăng áp lực Garbage Collector
for (Order o : orders) {
  StringBuilder sb = new StringBuilder();   // 10.000 đơn = 10.000 object bị tạo rồi bỏ
  sb.append(o.getId()).append(":").append(o.getStatus());
  results.add(sb.toString());
}

// ✅ Dùng String.format hoặc text block đơn giản, hoặc tái sử dụng builder nếu vòng lặp lớn
for (Order o : orders) {
  results.add(o.getId() + ":" + o.getStatus());   // JVM tự tối ưu nối chuỗi đơn giản
}
```
Với vòng lặp xử lý hàng chục nghìn bản ghi, tạo object thừa liên tục làm Garbage Collector phải dọn dẹp thường xuyên hơn, ảnh hưởng hiệu năng tổng thể — bạn nhận ra và sửa nhờ hiểu cách JVM quản lý bộ nhớ, không chỉ nhờ code chạy đúng.

**Vì sao là mức ④:** bạn hiểu đủ sâu cơ chế thực thi của Java để tối ưu hiệu năng thực chất — mức cao nhất của kỹ năng ngôn ngữ trong thang Entry→Experienced.
