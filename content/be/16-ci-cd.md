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
