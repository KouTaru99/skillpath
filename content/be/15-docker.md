# Docker (đóng gói ứng dụng)

**Định nghĩa.** **Docker** đóng gói ứng dụng cùng mọi thứ nó cần (mã, runtime, thư viện, cấu hình) vào một **image** — chạy lên thành **container** giống hệt nhau ở mọi máy. Giải quyết bệnh *"máy em chạy được mà"*. Với Back-end, Docker thường dùng để đóng gói service Java cùng JVM cần thiết.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu nguyên lý image vs container, build/run image, expose port.

**Ví dụ thực tế — đóng gói một service Spring Boot.**
```dockerfile
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/order-service.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```
```bash
docker build -t order-service .          # tạo image (khuôn bất biến)
docker run -p 8080:8080 order-service    # chạy container (thực thể), map port 8080
```
Bạn hiểu `EXPOSE 8080` khai báo container sẽ lắng nghe cổng nào, và `-p 8080:8080` khi `run` là ánh xạ cổng đó ra máy thật để gọi được từ bên ngoài.

**Vì sao là mức ①:** đóng gói và chạy được một service đơn giản — chưa tối ưu image (multi-stage) hay dùng docker compose cho nhiều service.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** viết Dockerfile **multi-stage** (image gọn hơn) và chạy nhiều service cùng lúc bằng **docker compose**.

**Ví dụ 1 — multi-stage: build bằng Gradle, chạy chỉ với JRE (không kéo theo cả bộ build).**
```dockerfile
FROM gradle:8-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build -x test

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/build/libs/order-service.jar app.jar
CMD ["java", "-jar", "app.jar"]
```

**Ví dụ 2 — chạy service + CSDL bằng một lệnh khi dev.**
```yaml
# docker-compose.yml
services:
  api: { build: ., ports: ["8080:8080"] }
  db:  { image: postgres:16, environment: { POSTGRES_PASSWORD: dev } }
```

**Vì sao là mức ②:** đóng gói gọn (multi-stage) và chạy được môi trường nhiều dịch vụ — không chỉ đóng gói đơn giản 1 service.
