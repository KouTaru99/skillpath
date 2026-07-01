# Docker (đóng gói ứng dụng)

**Định nghĩa.** **Docker** đóng gói ứng dụng cùng mọi thứ nó cần (mã, runtime, thư viện, cấu hình) vào một **image** — chạy lên thành **container** giống hệt nhau ở mọi máy. Giải quyết bệnh kinh điển *"máy em chạy được mà"*: vì môi trường được đóng gói cùng code. Khác máy ảo ở chỗ container nhẹ, dùng chung nhân hệ điều hành nên khởi động trong vài giây. Với FE, Docker thường dùng để build và phục vụ ứng dụng tĩnh một cách nhất quán giữa dev/CI/production.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu image vs container, đọc/viết một `Dockerfile` cơ bản, và build/run/expose port một ứng dụng FE.

**Ví dụ thực tế — đóng gói một app FE.**
```dockerfile
FROM node:20-alpine          # ảnh nền có sẵn Node
WORKDIR /app
COPY package*.json ./
RUN npm ci                    # cài dependency
COPY . .
RUN npm run build             # build ra thư mục dist/
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]   # phục vụ bản build
```
```bash
docker build -t my-fe .          # tạo image
docker run -p 3000:3000 my-fe    # chạy container, ánh xạ port ra máy
```
Bạn hiểu image là "khuôn" bất biến, container là "thực thể" đang chạy từ khuôn đó.

**Vì sao là mức ①:** đóng gói và chạy được, chưa tối ưu image hay nhiều dịch vụ.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** viết `Dockerfile` **tối ưu** (multi-stage để image nhỏ, tận dụng cache layer), và dùng `docker compose` để chạy nhiều dịch vụ cùng nhau khi dev.

**Ví dụ thực tế — multi-stage build + compose.** Tách pha build và pha chạy để image production gọn (chỉ chứa file tĩnh + Nginx, không kéo theo Node):
```dockerfile
# Pha 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Pha 2: chỉ lấy kết quả build, phục vụ bằng Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```
Chạy cả FE + API + DB khi dev bằng một lệnh:
```yaml
# docker-compose.yml
services:
  web: { build: ., ports: ["8080:80"] }
  api: { image: my-api, ports: ["3000:3000"] }
  db:  { image: postgres:16, environment: { POSTGRES_PASSWORD: dev } }
```
Bạn hiểu thứ tự lệnh trong Dockerfile ảnh hưởng cache (copy `package.json` trước, cài dependency, rồi mới copy code → đổi code không phải cài lại từ đầu).

**Vì sao là mức ②:** bạn đóng gói gọn, đúng chuẩn, chạy được môi trường nhiều dịch vụ.

## ▸ Ex·V3 — ② Biết làm (mở rộng phạm vi)
**Khác V2:** vẫn "biết làm" nhưng quan tâm **kích thước, bảo mật và tích hợp CI/CD** — image nhỏ và sạch, không nhúng secret, chạy bằng user không phải root.

**Ví dụ thực tế — image production an toàn & nhẹ.**
```dockerfile
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN addgroup -S app && adduser -S app -G app   # tạo user thường
USER app                                        # không chạy bằng root → an toàn hơn
# secret KHÔNG đặt trong image — truyền lúc chạy qua biến môi trường / secret manager
```
Bạn dùng `.dockerignore` để không copy `node_modules`/`.env` vào image, ghim phiên bản base image để build lặp lại được, và để CI tự build–đẩy image lên registry.

**Vì sao vẫn là ②:** bạn đóng gói tốt và an toàn ở mức thực chiến, chưa tới mức thiết kế nền tảng container cho tổ chức (việc gắn với Senior/Specialist).
