# CI/CD (Continuous Integration / Continuous Delivery)

**Định nghĩa.** **CI** (tích hợp liên tục): mỗi lần đẩy code, một quy trình tự động build, lint, test — bắt lỗi ngay. **CD** (chuyển giao/triển khai liên tục): tự động đóng gói và đưa code đã kiểm tra lên môi trường. Mục tiêu: mỗi thay đổi đi từ máy dev tới người dùng **nhanh, đều, ít lỗi tay**. Công cụ phổ biến: GitHub Actions, GitLab CI, Jenkins. Một FE dev phải đọc/sửa được pipeline phần của mình. Ví dụ dùng app Angular.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu pipeline là gì, đọc được kết quả một lần chạy (fail ở bước nào), biết thay đổi phải qua các cổng (build → test → deploy).

**Ví dụ thực tế — pipeline Angular đơn giản (GitHub Actions).**
```yaml
name: ci
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --watch=false --browsers=ChromeHeadless
      - run: npm run build -- --configuration production
```
Pipeline đỏ ở bước `test` → mở log bước đó, đọc test nào fail, sửa rồi đẩy lại.

**Vì sao là mức ①:** hiểu và đọc được pipeline, chưa tự cấu hình.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** **tự thêm/sửa bước** cho phần FE, dùng cache để build nhanh, hiểu tách môi trường (preview/staging/production).

**Ví dụ 1 — cache dependency + deploy preview mỗi PR.**
```yaml
      - uses: actions/setup-node@v4
        with: { node-version: 18, cache: 'npm' }   # cache → build nhanh hơn
      - run: npm ci
      - run: npm run lint && npm test -- --watch=false --browsers=ChromeHeadless
      - run: npm run build -- --configuration production
  deploy-preview:
    needs: build              # chỉ chạy khi build xanh
    if: github.ref != 'refs/heads/main'
    steps: [ { run: ./deploy.sh preview } ]   # mỗi PR có 1 bản preview để review thật
```

**Ví dụ 2 — build theo môi trường (Angular file replacements).** `environment.prod.ts` trỏ API production; CI build với `--configuration production` để Angular tự thay file môi trường — không hardcode URL.

**Vì sao là mức ②:** vận hành và điều chỉnh pipeline phần mình phụ trách.

## ▸ Ex·V3 — ② Biết làm (mở rộng phạm vi)
**Khác V2:** ở **quy mô & độ tin cậy cao hơn** — tối ưu thời gian pipeline, thêm cổng chất lượng (coverage, kích thước bundle), chuẩn bị đường lùi (rollback).

**Ví dụ 1 — cổng chất lượng chặn hồi quy ngầm.**
```yaml
      - run: npm test -- --code-coverage --watch=false   # chặn nếu coverage tụt
      - run: npm run build -- --configuration production
      - run: npx bundlesize                              # chặn nếu bundle phình quá ngưỡng
```
Angular bundle dễ phình khi lỡ import cả thư viện lớn → cổng bundlesize bắt sớm.

**Ví dụ 2 — deploy an toàn có đường lùi.**
```bash
deploy release-$SHA && switch-traffic release-$SHA
# nếu lỗi: switch-traffic release-$PREV   (quay lại trong vài giây)
```
Bạn nghĩ tới "khi deploy hỏng thì sao" ngay từ đầu, không chỉ "khi mọi thứ chạy tốt".

**Vì sao vẫn là ②:** vận hành CI/CD vững ở quy mô thật, chưa tới thiết kế hạ tầng triển khai toàn hệ thống.
