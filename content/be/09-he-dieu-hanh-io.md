# Hệ điều hành & I/O

**Định nghĩa.** Ứng dụng Back-end chạy trên một hệ điều hành (Windows hoặc phổ biến hơn là **Linux** ở server) — hiểu tổng quan các tầng cơ bản (tiến trình, bộ nhớ, file system) giúp bạn hiểu ứng dụng của mình thực sự đang làm gì bên dưới lớp code. **I/O** (Input/Output) là việc đọc/ghi dữ liệu ra ngoài chương trình — file, mạng, CSDL — luôn chậm hơn nhiều so với tính toán trong bộ nhớ (RAM), nên cần biết khi nào thao tác I/O đang là điểm nghẽn.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm tổng quan kiến trúc hệ điều hành (tiến trình là gì, bộ nhớ được quản lý ra sao ở mức khái niệm), hiểu I/O là thao tác "chậm" cần cẩn thận.

**Ví dụ thực tế — nhận ra I/O là điểm chậm nhất trong một đoạn code.**
```java
public List<String> readLines(String filePath) throws IOException {
  List<String> lines = new ArrayList<>();
  try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
    String line;
    while ((line = reader.readLine()) != null) {
      lines.add(line);   // xử lý trong RAM — rất nhanh
    }
  }   // đọc file (I/O) — chậm hơn xử lý trong RAM hàng nghìn lần
  return lines;
}
```
Bạn hiểu: nếu chương trình chạy chậm, thường không phải vì vòng lặp xử lý dữ liệu trong RAM chậm, mà vì thao tác I/O (đọc file, gọi API, truy vấn CSDL) đang chiếm phần lớn thời gian — nên khi tối ưu, ưu tiên nhìn vào I/O trước.

**Vì sao là mức ①:** nắm khái niệm đủ để hiểu chương trình chạm vào tầng nào của hệ điều hành, chưa tự tối ưu hiệu năng ở tầng này.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** tự xử lý được I/O cơ bản trong code — đọc/ghi file, gọi API bên ngoài — đúng cách (đóng resource, xử lý lỗi).

**Ví dụ thực tế — dùng try-with-resources để tự đóng file, tránh rò rỉ tài nguyên.**
```java
// ❌ Quên đóng file nếu có lỗi giữa chừng → rò rỉ tài nguyên (file handle)
FileReader reader = new FileReader(path);
// ... nếu lỗi ở đây, reader không bao giờ được đóng ...
reader.close();

// ✅ try-with-resources: TỰ ĐỘNG đóng dù có lỗi hay không
try (FileReader reader = new FileReader(path)) {
  // xử lý
}   // Java tự gọi reader.close() ở đây, kể cả khi có exception
```
Bạn hiểu I/O (file, network) là tài nguyên hữu hạn cần đóng đúng cách — quên đóng nhiều lần sẽ làm hệ thống dần cạn tài nguyên (file handle, kết nối) dù mỗi lần chỉ rò một chút.

**Vì sao là mức ②:** tự xử lý I/O đúng cách trong code thật — không chỉ hiểu khái niệm.
