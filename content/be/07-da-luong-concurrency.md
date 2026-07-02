# Lập trình đa luồng (multithreading/concurrency)

**Định nghĩa.** Một chương trình có thể chạy **nhiều luồng (thread)** song song để tận dụng CPU nhiều nhân, hoặc để không "đứng hình" khi chờ việc chậm (đọc file, gọi mạng). **Đồng bộ (sync)** nghĩa là chờ xong việc này mới làm việc kia; **bất đồng bộ (async)** nghĩa là giao việc rồi làm tiếp, xong thì được báo lại. Khi nhiều luồng cùng đụng vào một dữ liệu chung, cần **lock** (khoá) để tránh hai luồng ghi đè lẫn nhau.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu khái niệm thread, vòng đời thread (mới tạo → chạy → chờ → kết thúc), phân biệt sync/async, hiểu vì sao cần lock khi nhiều luồng cùng sửa 1 biến.

**Ví dụ thực tế — race condition khi không có lock (Java).**
```java
// ❌ Hai luồng cùng gọi increment() có thể "giẫm" lên nhau, mất 1 lần cộng
class Counter {
  private int count = 0;
  public void increment() { count++; }   // đọc-cộng-ghi KHÔNG phải 1 thao tác nguyên tử
}

// ✅ Đồng bộ hoá (synchronized) — chỉ 1 luồng được vào tại một thời điểm
class SafeCounter {
  private int count = 0;
  public synchronized void increment() { count++; }
}
```
Nếu 2 luồng cùng gọi `increment()` không có `synchronized`, cả hai có thể đọc cùng giá trị cũ rồi cùng ghi lại — kết quả cộng 2 lần nhưng số chỉ tăng 1. `synchronized` đảm bảo chỉ một luồng thao tác tại một thời điểm.

**Vì sao là mức ①:** hiểu khái niệm và nhận diện được vấn đề cơ bản (race condition) — chưa xử lý bài toán đa luồng phức tạp hay tối ưu hiệu năng.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** xử lý được **concurrency** ở mức ứng dụng thật — dùng **connection pool** (bể kết nối CSDL dùng chung, tránh mở/đóng kết nối liên tục quá tốn kém).

**Ví dụ thực tế — connection pool cho kết nối CSDL (HikariCP, mặc định trong Spring Boot).**
```yaml
# application.yml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20   # tối đa 20 kết nối CSDL dùng chung cho mọi request
```
Không có connection pool, mỗi request tự mở một kết nối CSDL mới rồi đóng lại — rất tốn tài nguyên khi có nhiều request cùng lúc. Pool giữ sẵn một số kết nối, request nào cần thì "mượn" rồi trả lại, không phải mở mới mỗi lần.

**Vì sao là mức ②:** hiểu và cấu hình được cơ chế quản lý tài nguyên dùng chung giữa nhiều luồng — không chỉ hiểu khái niệm lock cơ bản.

## ▸ Ex·V2 — ③ Thành thạo
**Khác V1:** phân tích và xử lý được các vấn đề đa luồng khó (deadlock, hiệu năng) — không chỉ dùng đúng công cụ có sẵn.

**Ví dụ thực tế — deadlock khi 2 luồng khoá chéo nhau.**
```java
// Luồng A: khoá account1 trước, rồi account2
synchronized (account1) {
  synchronized (account2) { transfer(account1, account2); }
}
// Luồng B: khoá account2 trước, rồi account1 — NGƯỢC THỨ TỰ với luồng A
synchronized (account2) {
  synchronized (account1) { transfer(account2, account1); }   // ← DEADLOCK nếu chạy đồng thời với A
}
```
Nếu luồng A giữ `account1` chờ `account2`, còn luồng B giữ `account2` chờ `account1` — cả hai chờ nhau mãi mãi (deadlock). Bạn sửa bằng cách **luôn khoá theo một thứ tự cố định** (ví dụ luôn khoá account có ID nhỏ hơn trước) ở mọi luồng, loại bỏ khả năng chờ chéo.

**Vì sao là mức ③:** bạn phân tích và phòng tránh được các lỗi đa luồng khó (deadlock) — không chỉ dùng đúng cơ chế đồng bộ có sẵn.

## ▸ Senior·V2 — ④ Chuyên sâu
**Khác Ex·V2:** tối ưu **cấu hình** đa luồng dựa trên đo đạc thật, không đoán mò — chọn đúng số luồng cho đúng loại tác vụ.

**Ví dụ thực tế — chọn sai kích thước thread pool làm CPU nhàn rỗi dù "đang bận".**
```java
// ❌ Dùng chung 1 pool cố định cho cả tác vụ CPU-bound (tính toán) lẫn I/O-bound (gọi API ngoài)
ExecutorService pool = Executors.newFixedThreadPool(10);
```
Tác vụ **I/O-bound** (gọi API/CSDL) phần lớn thời gian là CHỜ, không tốn CPU — pool nhỏ khiến nhiều luồng phải xếp hàng dù CPU đang rảnh. Tác vụ **CPU-bound** (tính toán nặng) thì số luồng vượt quá số nhân CPU thực tế chỉ gây tranh chấp (context switching), không nhanh hơn. Bạn tách 2 pool riêng, đo bằng công cụ giám sát để chỉnh đúng kích thước theo loại tác vụ và số nhân CPU thật của server, thay vì chọn một con số "cảm thấy hợp lý".

**Vì sao là mức ④:** bạn tối ưu cấu hình đa luồng dựa trên đo đạc và hiểu bản chất tác vụ — mức cao nhất của kỹ năng này trong thang Senior.
