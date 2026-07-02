# Remote debug

**Định nghĩa.** Gắn debugger từ máy dev vào một tiến trình JVM đang **chạy ở nơi khác** (server staging/test) qua cổng debug từ xa — dùng khi lỗi chỉ xảy ra ở môi trường đó (dữ liệu thật, cấu hình thật) mà không tái hiện được ở máy mình.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Bật remote debug cho một service Java và gắn debugger từ IDE vào để xem giá trị biến trên môi trường thật.

**Ví dụ thực tế — bật remote debug cho service chạy trên server staging.**
```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar
```
```
IntelliJ → Run → Edit Configurations → Remote JVM Debug
  Host: staging.internal.cty.com   Port: 5005
```
Bạn đặt breakpoint trong IDE như bình thường, nhưng chương trình đang chạy thật ở server staging (không phải máy mình) — dừng đúng chỗ, xem đúng dữ liệu thật đang gây lỗi mà môi trường dev không có.

**Vì sao là mức ①:** bật và dùng được remote debug cho ca đơn giản — chưa xử lý các ràng buộc bảo mật/hiệu năng khi debug trên môi trường nhạy cảm (production).

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** hiểu đúng ràng buộc khi remote debug trên môi trường nhạy cảm — vì sao KHÔNG nên bật debug port trên production.

**Ví dụ thực tế — vì sao remote debug chỉ nên bật ở staging, không bật ở production.** Đặt breakpoint trên production sẽ **dừng cả tiến trình đang phục vụ người dùng thật** cho tới khi bạn tiếp tục (Continue) — hàng nghìn request khác có thể bị treo chờ trong lúc đó. Ngoài ra, cổng debug (`5005`) mở ra ngoài là một lỗ hổng bảo mật nếu không giới hạn IP truy cập. Bạn chỉ bật remote debug ở staging/test, không bao giờ ở production.

**Vì sao là mức ②:** bạn hiểu đúng ràng buộc và rủi ro khi dùng remote debug — không chỉ biết bật/tắt tính năng.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** debug từ xa được cả trường hợp **nhiều instance** cùng chạy sau load balancer — biết chính xác request lỗi rơi vào instance nào trước khi gắn debugger.

**Ví dụ thực tế — xác định đúng instance trước khi remote debug.** Service chạy 3 instance sau load balancer. Bạn không thể đoán request lỗi rơi vào instance nào — cần trước tiên tra log/APM để biết instance cụ thể (theo hostname/IP trong log), rồi mới gắn remote debug đúng instance đó. Gắn debug vào SAI instance sẽ chờ mãi không bao giờ dừng vì request lỗi không đi qua nó.

**Vì sao là mức ③:** bạn debug từ xa hiệu quả ngay cả khi hệ thống chạy nhiều instance song song.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** đặt ra chính sách remote debug an toàn cho toàn đơn vị — khi nào được phép, ai được cấp quyền, giới hạn thời gian.

**Ví dụ thực tế — chính sách remote debug áp dụng mọi service.** Chỉ mở port debug qua VPN nội bộ (không public), tự động đóng port sau 1 giờ nếu quên tắt, ghi log mọi lần bật debug (ai, khi nào, service nào) để audit sau này.

**Vì sao là mức ④:** bạn đặt được chuẩn an toàn cho công cụ mạnh nhưng rủi ro cao này ở tầm toàn đơn vị.
