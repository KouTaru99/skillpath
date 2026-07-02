# Docker (đóng gói ứng dụng)

**Định nghĩa.** **Docker** đóng gói ứng dụng cùng mọi thứ nó cần (mã, runtime, thư viện, cấu hình) vào một **image** — chạy lên thành **container** giống hệt nhau ở mọi máy. Giải quyết bệnh *"máy em chạy được mà"*. Khác máy ảo ở chỗ container nhẹ, dùng chung nhân hệ điều hành nên khởi động vài giây. Với FE, Docker thường dùng để build và phục vụ app tĩnh (vd Angular build ra file tĩnh rồi Nginx serve).

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu image vs container, đọc/viết `Dockerfile` cơ bản, build/run/expose port một app.

**Ví dụ thực tế — đóng gói app Angular (build tĩnh + Nginx).**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build          # ra thư mục dist/<app>/
EXPOSE 4200
CMD ["npx", "http-server", "dist/my-app", "-p", "4200"]
```
```bash
docker build -t my-fe .            # tạo image (khuôn bất biến)
docker run -p 4200:4200 my-fe      # chạy container (thực thể)
```

**Vì sao là mức ①:** đóng gói và chạy được, chưa tối ưu image.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** viết `Dockerfile` **tối ưu** (multi-stage để image nhỏ, tận dụng cache layer), dùng `docker compose` chạy nhiều dịch vụ khi dev.

**Ví dụ 1 — multi-stage: build bằng Node, chạy bằng Nginx (image gọn, không kéo theo Node).**
```dockerfile
# Pha 1: build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Pha 2: chỉ lấy file tĩnh, phục vụ bằng Nginx
FROM nginx:alpine
COPY --from=build /app/dist/my-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf   # cấu hình SPA fallback về index.html
EXPOSE 80
```
Copy `package.json` trước rồi `npm ci`, sau đó mới copy code → đổi code không phải cài lại dependency (tận dụng cache layer).

**Ví dụ 2 — chạy cả FE + API + DB khi dev bằng một lệnh.**
```yaml
# docker-compose.yml
services:
  web: { build: ., ports: ["8080:80"] }
  api: { image: my-spring-api, ports: ["3000:3000"] }
  db:  { image: postgres:16, environment: { POSTGRES_PASSWORD: dev } }
```

**Vì sao là mức ②:** đóng gói gọn, đúng chuẩn, chạy được môi trường nhiều dịch vụ.

## ▸ Ex·V3 — ② Biết làm (mở rộng phạm vi)
**Khác V2:** quan tâm **kích thước, bảo mật và tích hợp CI/CD** — image nhỏ và sạch, không nhúng secret, chạy bằng user không phải root.

**Ví dụ 1 — SPA fallback + không lộ secret.**
```nginx
# nginx.conf — mọi route trả index.html để Angular router xử lý
location / { try_files $uri $uri/ /index.html; }
```
Cấu hình API URL truyền lúc chạy (biến môi trường / file config), **không build cứng secret vào image**.

**Ví dụ 2 — dùng `.dockerignore` + ghim version cho build lặp lại được.**
```
# .dockerignore
node_modules
dist
.git
.env
```
Ghim `node:18-alpine` (không dùng `latest`) để build hôm nay và tháng sau ra giống nhau; để CI tự build–đẩy image lên registry.

**Vì sao vẫn là ②:** đóng gói tốt và an toàn ở mức thực chiến, chưa tới thiết kế nền tảng container cho tổ chức (việc của Senior/Specialist).

## ▸ Senior·V1 — ③ Thành thạo
**Khác Ex·V3:** không chỉ đóng gói an toàn cho *một* app mà đặt ra **base image chuẩn dùng chung cho nhiều dự án**, kèm healthcheck để hạ tầng biết container còn sống hay đã "treo".

**Ví dụ — base image nội bộ (golden image) + healthcheck cho orchestration.**
```dockerfile
# fe-base-image (registry nội bộ) — mọi FE team kế thừa từ đây, không tự chọn base image riêng
FROM nginx:alpine
RUN adduser -D -H appuser && chown -R appuser /usr/share/nginx/html
USER appuser                                   # không chạy container bằng root
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1   # hạ tầng tự phát hiện + restart nếu "treo"
```
```dockerfile
# products-mfe/Dockerfile — team chỉ kế thừa, không tự nghĩ lại phần bảo mật
FROM registry.internal/fe-base-image:1.4
COPY --from=build /app/dist /usr/share/nginx/html
```
Chuẩn hoá base image giúp mọi team tự động thừa hưởng bản vá bảo mật khi image gốc cập nhật, thay vì mỗi repo tự vá một kiểu (hoặc quên vá).

**Vì sao là mức ③:** bạn đặt chuẩn container cho tổ chức, không chỉ đóng gói đúng cho dự án của mình.
