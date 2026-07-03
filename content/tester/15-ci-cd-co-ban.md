# CI/CD cơ bản

**Định nghĩa.** **CI/CD** (Continuous Integration/Continuous Deployment) là quy trình tự động build, test, và triển khai code mỗi khi có thay đổi, thay vì làm thủ công. Khác với Dev, Tester **không cần vận hành pipeline** — chỉ cần hiểu đủ để biết bản build mình đang test tới từ đâu, và có thể tự động hoá 1 phần việc kiểm thử lặp lại vào pipeline.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu được các bước cơ bản của pipeline CI/CD: code được build tự động, chạy test tự động, rồi mới deploy — đủ để đọc log khi pipeline fail và biết lỗi đó liên quan tới bước nào.

**Ví dụ thực tế.** Bản build mới của hệ thống giám sát an ninh mạng deploy lên staging thất bại. Bạn xem log CI/CD, thấy fail ở bước "run unit tests" chứ không phải bước build hay deploy — bạn báo đúng cho dev biết vấn đề nằm ở code logic bị lỗi test, không phải do cấu hình deploy, tránh đổ nhầm việc cho đội vận hành.

**Vì sao là mức ①:** hiểu đủ để đọc tín hiệu từ pipeline và định vị đúng vấn đề, chưa cần tự cấu hình hay vận hành pipeline (đó là việc của DevOps/Dev).
