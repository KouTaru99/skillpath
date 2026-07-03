# Xây dựng chiến lược kiểm thử cho đơn vị

**Định nghĩa.** Thay vì chỉ lập kế hoạch kiểm thử cho 1 dự án, Specialist Tester xây dựng **chiến lược kiểm thử áp dụng chung** cho nhiều dự án/sản phẩm trong đơn vị, và liên tục tối ưu, cập nhật theo thực tiễn.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đề xuất 1 phần của chiến lược kiểm thử chung, phạm vi hẹp.

**Ví dụ thực tế.** Bạn đề xuất chuẩn chung về **ngưỡng coverage tối thiểu** cho các test tự động hoá của mọi sản phẩm giám sát an ninh mạng trong đơn vị — thay vì mỗi dự án tự quyết định ngưỡng khác nhau.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** xây dựng được **1 mảng chiến lược hoàn chỉnh**, áp dụng thực tế cho nhiều dự án.

**Ví dụ thực tế.** Bạn xây dựng chiến lược kiểm thử bảo mật chung: mọi sản phẩm ATTT của đơn vị trước khi release phải qua checklist kiểm thử bảo mật tối thiểu (SQL injection, XSS, kiểm tra quyền truy cập), kèm công cụ hỗ trợ tự động hoá phần checklist đó — áp dụng thực tế cho 3 sản phẩm đang chạy song song.

## ▸ Specialist·V3 — ④ Chuyên gia
**Khác V2:** xây dựng chiến lược kiểm thử **toàn diện cho cả đơn vị**, và có cơ chế liên tục tối ưu, cập nhật theo điều kiện thực tiễn.

**Ví dụ thực tế.** Bạn là người xây dựng và làm chủ toàn bộ chiến lược kiểm thử của đơn vị An ninh mạng: từ quy trình, công cụ, chuẩn coverage, tới chuẩn bảo mật — có cơ chế đánh giá lại mỗi quý dựa trên các sự cố thực tế đã xảy ra, liên tục cập nhật chiến lược thay vì viết 1 lần rồi để đó.

**Vì sao tăng dần ①→④:** từ đề xuất 1 phần, tới xây 1 mảng hoàn chỉnh, tới làm chủ toàn bộ chiến lược có cơ chế tối ưu liên tục.
