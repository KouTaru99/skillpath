# Triển khai đa nền tảng hệ điều hành

**Định nghĩa.** Đảm bảo service build/chạy được trên các hệ điều hành khác nhau — máy dev thường Windows/macOS, server production hầu hết **Linux**. "Chạy được trên máy mình" không có nghĩa chạy được ở mọi nơi.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nhận biết và sửa được lỗi "chỉ chạy trên máy mình" do khác biệt HĐH.

**Ví dụ thực tế — đường dẫn file viết tay gãy khi deploy lên Linux.**
```java
// ❌ Windows dùng \, Linux dùng / — nối chuỗi tay sẽ gãy khi đổi HĐH
String path = configDir + "\\application.yml";

// ✅ dùng Paths.get — Java tự chọn đúng ký tự phân cách theo HĐH đang chạy
Path path = Paths.get(configDir, "application.yml");
```
Bạn hiểu vì sao code chạy tốt trên máy Windows của mình nhưng lỗi ngay khi deploy lên server Linux (production) — do nối đường dẫn thủ công thay vì dùng API chuẩn của ngôn ngữ.

**Vì sao là mức ①:** nhận ra và sửa được lớp lỗi phổ biến nhất — chưa thiết lập quy trình/công cụ để cả team tránh lặp lại.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** thiết lập được cơ chế **tự động phát hiện** lỗi đa nền tảng trong CI, để cả team không lặp lại.

**Ví dụ thực tế — CI luôn chạy trên Linux (ubuntu-latest) dù team dev bằng Windows/macOS.** Một lỗi đường dẫn/phân biệt hoa-thường mà máy dev Windows không bao giờ thấy sẽ tự lộ ra trong CI, chặn PR trước khi ai đó merge nhầm — không phụ thuộc vào việc từng dev có cẩn thận hay không.

**Vì sao là mức ②:** bạn thiết lập được cơ chế tự động phát hiện lỗi đa nền tảng cho cả team.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** thiết kế để service triển khai được ở nhiều môi trường hạ tầng khác nhau của khách hàng (on-premise lẫn cloud) — đúng nhiệm vụ "thiết kế đa nền tảng" mà career-path Senior/Specialist nhấn mạnh.

**Ví dụ thực tế — cùng một service chạy được cả on-premise lẫn cloud.** Đóng gói toàn bộ bằng Docker + docker-compose (chạy giống nhau dù trên máy chủ khách hàng hay cloud), cấu hình qua biến môi trường thay vì giả định "luôn có sẵn dịch vụ X của 1 nhà cung cấp cloud cụ thể". Đội triển khai không phải viết lại service cho từng loại khách hàng.

**Vì sao là mức ③:** bạn thiết kế được khả năng tương thích với nhiều môi trường hạ tầng khách hàng khác nhau.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** đặt chuẩn tương thích đa nền tảng cho mọi sản phẩm mới của đơn vị — chính sách bắt buộc ngay từ đầu.

**Ví dụ thực tế — chính sách "đa nền tảng ngay từ đầu" cho mọi dự án mới.** Đóng gói Docker ngay từ Sprint đầu tiên; không hard-code giả định hạ tầng cụ thể; checklist "sẵn sàng đa nền tảng" là mục bắt buộc trong Definition of Done. Khi có khách hàng mới yêu cầu on-premise, sản phẩm đã sẵn sàng từ trước.

**Vì sao là mức ④:** bạn đặt chính sách phòng ngừa cho toàn đơn vị, không chỉ giải quyết khi bài toán đã xuất hiện.
