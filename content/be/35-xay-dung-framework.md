# Xây dựng framework/nền tảng dùng chung

**Định nghĩa.** Khác đóng góp một service đơn lẻ, đây là xây **cả một framework/nền tảng nội bộ** — bộ công cụ giúp cả đơn vị phát triển nhanh hơn và đóng gói sản phẩm nhất quán hơn.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đóng góp một phần cụ thể cho framework/công cụ nội bộ đã có sẵn.

**Ví dụ thực tế — thêm một module vào starter kit Spring Boot nội bộ.** Đơn vị có sẵn `company-spring-boot-starter` giúp dựng service mới (đã cấu hình sẵn logging chuẩn, health check, security headers). Bạn được giao thêm module tự động cấu hình kết nối message queue theo chuẩn công ty — mọi service mới chỉ cần thêm dependency là có sẵn cấu hình đúng, không phải tự viết lại.

**Vì sao là mức ①:** đóng góp được một phần rõ ràng vào nền tảng dùng chung đã tồn tại — chưa tự khởi tạo hay chịu trách nhiệm kiến trúc toàn bộ framework mới.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự khởi tạo một framework/công cụ nội bộ mới từ đầu, giải quyết nhu cầu chung chưa ai xây.

**Ví dụ thực tế — tự khởi tạo bộ công cụ kiểm tra contract API tự động.** Đơn vị chưa có công cụ tự động kiểm tra 2 service có "hiểu đúng" hợp đồng API của nhau trước khi deploy. Bạn khởi tạo package mới, tích hợp vào CI của mọi service — xác định nhu cầu chưa ai giải quyết và là người chịu trách nhiệm duy trì ban đầu.

**Vì sao là mức ②:** bạn tự khởi tạo được công cụ/framework hoàn toàn mới giải quyết nhu cầu chung.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** xây framework/nền tảng ở quy mô thay đổi cách cả đơn vị phát triển và đóng gói sản phẩm.

**Ví dụ thực tế — nền tảng "service factory" giúp ra mắt service mới nhanh gấp nhiều lần.** Bạn dẫn dắt xây một bộ khởi tạo đóng gói sẵn các khối dùng chung đã kiểm chứng (auth, logging, health check, message queue config) — `npx create-service-from-platform my-service` sinh sẵn mọi hạ tầng chuẩn, đội chỉ cần code phần nghiệp vụ riêng. Thời gian ra mắt service mới giảm từ vài tuần xuống vài ngày.

**Vì sao là mức ④:** bạn xây được nền tảng thay đổi tốc độ phát triển của cả đơn vị.
