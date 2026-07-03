# CI/CD cơ bản

**Định nghĩa.** **CI/CD** (Continuous Integration / Continuous Deployment — tích hợp & triển khai liên tục) là quy trình tự động build, chạy test, và triển khai code mỗi khi có thay đổi, thay vì làm thủ công. Khác Dev, Tester **không vận hành pipeline** — chỉ cần hiểu đủ để biết bản build mình đang test tới từ đâu, đọc được log khi pipeline fail, và (mức cao hơn) gắn test tự động của mình vào pipeline. Với Tester, CI/CD xuất hiện muộn (từ Senior) đúng vì trước đó công việc chưa chạm tới nó.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu các bước cơ bản của pipeline (build → test → deploy), đọc được log khi fail và định vị đúng lỗi thuộc bước nào — để báo đúng người, không đổ nhầm việc.

**Tình huống thực tế — pipeline staging fail, bạn đọc log định vị đúng chỗ.** Build mới của hệ thống giám sát an ninh mạng lên staging thất bại. Thay vì báo chung chung "deploy hỏng rồi", bạn mở log CI/CD đọc:

```
PIPELINE #482 — FAILED
  ✓ Stage 1: Checkout code          (12s)
  ✓ Stage 2: Build                  (1m 40s)
  ✗ Stage 3: Run unit tests         (FAILED)
        FAIL  AlertCorrelationTest.shouldMergeWithin5Min
        expected 1 incident but found 2
  ⊘ Stage 4: Deploy to staging      (SKIPPED — không chạy vì stage 3 fail)

BẠN ĐỌC RA:
  - Fail ở "run unit tests", KHÔNG phải build hay deploy.
  - Test fail là AlertCorrelationTest → lỗi LOGIC gộp cảnh báo,
    không phải lỗi cấu hình hạ tầng.
  → Báo cho DEV (lỗi code logic), KHÔNG báo DevOps (không phải
    lỗi deploy). Kèm luôn tên test + thông điệp fail để dev vào thẳng.
```

Giá trị của mức này: đọc đúng tín hiệu pipeline giúp gửi vấn đề tới **đúng người ngay từ đầu** — tránh vòng vo "deploy hỏng → DevOps kiểm tra → hoá ra lỗi code → chuyển lại Dev" mất nửa ngày.

**Vì sao là mức ①:** hiểu đủ để đọc tín hiệu pipeline và định vị đúng vấn đề; chưa cần tự cấu hình/vận hành pipeline (việc của Dev/DevOps) — với Tester đây đã là đủ cho vai trò phối hợp.
