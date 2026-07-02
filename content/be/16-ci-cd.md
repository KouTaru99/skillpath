# CI/CD (Continuous Integration / Continuous Delivery)

**Định nghĩa.** **CI** (tích hợp liên tục): mỗi lần đẩy code, một quy trình tự động build, test, kiểm tra chất lượng — bắt lỗi ngay. **CD** (chuyển giao liên tục): tự động đóng gói và đưa code lên môi trường. Một Back-end dev phải đọc/sửa được pipeline phần của mình.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu pipeline là gì, đọc được kết quả một lần chạy (fail ở bước nào).

**Ví dụ thực tế — pipeline Java/Spring Boot đơn giản (GitHub Actions).**
```yaml
name: ci
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '17', distribution: 'temurin' }
      - run: ./gradlew test        # chạy toàn bộ unit test
      - run: ./gradlew build       # build ra file .jar
```
Pipeline đỏ ở bước `test` → mở log, đọc test nào fail, sửa rồi đẩy lại — không phải chỉ chạy `./gradlew build` trên máy mình rồi coi là xong.

**Vì sao là mức ①:** hiểu và đọc được pipeline cơ bản — chưa tự cấu hình hay tối ưu pipeline.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** tự thêm/sửa bước cho pipeline (cache dependency, build image Docker, deploy).

**Ví dụ thực tế — cache dependency + build & push Docker image.**
```yaml
      - uses: actions/setup-java@v4
        with: { java-version: '17', distribution: 'temurin', cache: 'gradle' }   # cache → build nhanh hơn
      - run: ./gradlew test build
      - run: docker build -t registry.internal/order-service:${{ github.sha }} .
      - run: docker push registry.internal/order-service:${{ github.sha }}
```
Bạn tự thêm bước build/push image Docker sau khi test xanh — ghim tag theo commit SHA để biết chính xác image nào ứng với commit nào.

**Vì sao là mức ②:** vận hành và điều chỉnh pipeline phần mình phụ trách — không chỉ đọc kết quả.

## ▸ Senior·V2 — ③ Thành thạo
**Khác Ex·V2:** sử dụng thành thạo CI/CD ở mức chuẩn hoá — pipeline dùng chung cho nhiều service, gate chất lượng (coverage, security scan).

**Ví dụ thực tế — pipeline dùng chung (reusable workflow) cho nhiều service Java.**
```yaml
# .github/workflows/java-service-ci.yml — 1 chuẩn, nhiều service cùng gọi
on: { workflow_call: {} }
jobs:
  build:
    steps:
      - run: ./gradlew test build
      - run: ./gradlew jacocoTestCoverageVerification   # chặn nếu coverage tụt
      - run: trivy image ${{ github.repository }}         # quét lỗ hổng bảo mật image
```
```yaml
# order-service/.github/workflows/ci.yml — mỗi service chỉ cần gọi lại
jobs:
  ci:
    uses: ./.github/workflows/java-service-ci.yml
```
Mỗi service vẫn tự chủ repo, nhưng chuẩn chất lượng (test/coverage/security scan) là MỘT, không mỗi nơi làm một kiểu.

**Vì sao là mức ③:** bạn nâng chất lượng CI/CD ở tầm nhiều service, không chỉ dự án đang làm.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác Senior·V2:** thiết kế chiến lược **deploy an toàn ở quy mô sản xuất thật** — triển khai dần thay vì đổi toàn bộ một lúc.

**Ví dụ thực tế — canary release cho bản service mới, giảm rủi ro khi lên production.**
```yaml
deploy-canary:
  steps:
    - run: deploy new-version --traffic 5%     # chỉ 5% traffic thấy bản mới
    - run: sleep 600 && check-error-rate        # theo dõi 10 phút
    - run: |
        if [ "$ERROR_RATE_INCREASED" = "true" ]; then rollback; exit 1; fi
    - run: deploy new-version --traffic 100%
```
Nếu bản mới có bug ẩn, chỉ 5% người dùng bị ảnh hưởng và hệ thống tự lùi lại — thay vì cả hệ thống cùng gặp lỗi rồi mới biết.

**Vì sao là mức ④:** bạn thiết kế được quy trình triển khai giảm thiểu rủi ro ở quy mô thật — mức cao nhất của kỹ năng này.
