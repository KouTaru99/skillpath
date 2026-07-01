# CI/CD (Continuous Integration / Continuous Delivery)

**Định nghĩa.** **CI** (Continuous Integration — tích hợp liên tục): mỗi lần đẩy code, một quy trình tự động chạy để build, lint, test — bắt lỗi ngay thay vì để dồn. **CD** (Continuous Delivery/Deployment — chuyển giao/triển khai liên tục): tự động đóng gói và đưa code đã qua kiểm tra lên môi trường (staging/production). Mục tiêu: mỗi thay đổi đi từ máy dev tới người dùng **nhanh, đều, ít lỗi tay**. Công cụ phổ biến: GitHub Actions, GitLab CI, Jenkins. Một FE dev không cần dựng cả hệ thống, nhưng phải đọc/sửa được pipeline phần của mình.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu pipeline là gì, đọc được kết quả một lần chạy (pass/fail và fail ở bước nào), và biết một thay đổi phải qua các cổng (build → test → deploy) trước khi tới người dùng.

**Ví dụ thực tế — đọc một pipeline FE đơn giản (GitHub Actions).**
```yaml
name: ci
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci          # cài dependency
      - run: npm run lint     # kiểm chuẩn code
      - run: npm test         # chạy unit test
      - run: npm run build    # build production
```
Khi pipeline đỏ ở bước `test`, bạn biết mở log bước đó, đọc test nào fail, sửa rồi đẩy lại.

**Vì sao là mức ①:** hiểu và đọc được pipeline, chưa tự cấu hình.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** **tự thêm/sửa bước** trong pipeline cho phần FE, dùng cache để build nhanh, và hiểu cách tách môi trường (preview/staging/production).

**Ví dụ thực tế — thêm cache, chặn merge khi đỏ, và build theo nhánh.**
```yaml
jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }   # cache dependency → build nhanh hơn
      - run: npm ci
      - run: npm run lint && npm test && npm run build
  deploy-preview:
    needs: build            # chỉ chạy khi build xanh
    if: github.ref != 'refs/heads/main'
    steps:
      - run: ./deploy.sh preview   # mỗi PR có 1 bản preview để review thật
```
Bạn cấu hình `needs` để deploy chỉ chạy sau khi build pass, và tạo bản preview cho mỗi PR.

**Vì sao là mức ②:** bạn vận hành và điều chỉnh được pipeline phần mình phụ trách.

## ▸ Ex·V3 — ② Biết làm (mở rộng phạm vi)
**Khác V2:** vẫn "biết làm" nhưng ở **quy mô & độ tin cậy cao hơn** — tối ưu thời gian pipeline, thêm các cổng chất lượng (coverage, kích thước bundle), và chuẩn bị đường lùi (rollback) khi deploy lỗi.

**Ví dụ thực tế — cổng chất lượng & rollback.** Bạn thêm kiểm tra ngăn hồi quy ngầm và phương án quay lui:
```yaml
      - run: npm run build && npx size-limit   # chặn nếu bundle phình quá ngưỡng
      - run: npm test -- --coverage            # chặn nếu coverage tụt dưới mức cam kết
```
```bash
# chiến lược deploy an toàn: giữ bản trước để rollback nhanh
deploy release-$SHA && switch-traffic release-$SHA
# nếu lỗi: switch-traffic release-$PREV   (quay lại trong vài giây)
```
Bạn nghĩ tới "khi deploy hỏng thì sao" ngay từ đầu, không chỉ "khi mọi thứ chạy tốt".

**Vì sao vẫn là ②:** bạn vận hành CI/CD vững ở quy mô thật, chưa tới mức thiết kế hạ tầng triển khai toàn hệ thống.
