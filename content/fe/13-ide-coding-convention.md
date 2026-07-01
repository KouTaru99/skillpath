# IDE & Coding Convention

**Định nghĩa.** **IDE** (môi trường lập trình tích hợp, vd VS Code, WebStorm) là công cụ viết code có gợi ý, gỡ lỗi, refactor. **Coding convention** là bộ quy ước viết code thống nhất: đặt tên, format, cấu trúc thư mục, quy tắc commit. Hai thứ này quyết định **tốc độ và sự đồng nhất** của đội: code đọc như một người viết thì review nhanh, bàn giao dễ. Thường tự động hoá bằng **ESLint** (bắt lỗi/chuẩn) + **Prettier** (format); Angular có sẵn `ng lint`.

## ▸ Entry — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Dùng tốt IDE (gợi ý, đi tới định nghĩa, refactor đổi tên, gỡ lỗi breakpoint) và **tuân thủ** convention của đội — code nộp đã đúng format/tên, không cần ai sửa tay.

**Ví dụ thực tế — dùng IDE & tự áp convention khi lưu.**
```
- F12 / Ctrl+Click: đi tới định nghĩa.  •  F2: đổi tên biến an toàn toàn dự án.
- Breakpoint + Watch: dừng đúng dòng, xem giá trị thay vì rải console.log.
```
```jsonc
// .vscode/settings.json
{ "editor.formatOnSave": true,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" } }
```
Theo đúng quy ước Angular: component `PascalCase`, file `kebab-case.component.ts`, biến `camelCase`.

**Vì sao là mức ②:** dùng công cụ thành thạo và tuân thủ chuẩn ổn định.

## ▸ Ex·V1 — ② Biết làm (mở rộng phạm vi)
**Khác Entry:** chủ động hơn — cấu hình ESLint/Prettier cho dự án, viết commit message rõ, dùng IDE nâng cao (multi-cursor, snippet, tích hợp Git).

**Ví dụ thực tế — "hàng rào" tự động chặn code bẩn vào nhánh chính.**
```jsonc
// .eslintrc — bật quy tắc hay dính
{ "rules": { "@typescript-eslint/no-unused-vars": "warn", "eqeqeq": "error",
             "@angular-eslint/component-selector": ["error", { "prefix": "app" }] } }
```
```bash
# pre-commit hook (husky + lint-staged): chỉ lint file đang commit
npx lint-staged
```
Commit theo Conventional Commits để lịch sử đọc được:
```
feat(order): thêm bộ lọc theo trạng thái đơn
fix(auth): sửa token không tự refresh khi hết hạn
```

**Vì sao vẫn là ②:** thiết lập nề nếp cho dự án, chưa ở mức đặt chuẩn cho nhiều đội.

## ▸ Ex·V2 — ③ Thành thạo
**Khác V1:** **đặt và duy trì convention cho cả dự án/đội** — chọn rule có lý do, cân bằng nghiêm vs thực dụng, hướng dẫn người mới.

**Ví dụ 1 — chuẩn hoá cấu trúc + rule cho codebase nhiều người.**
```
- Cấu trúc: features/<tên>/ gồm components, services, models — mọi người theo một khuôn.
- Rule: cấm import vòng, cấm 'any' (cảnh báo), bắt trackBy trong *ngFor.
- CI chặn merge nếu lint/format fail → chuẩn được thực thi, không phụ thuộc nhắc nhở.
```

**Ví dụ 2 — snippet/schematic tăng tốc cả đội.** Bạn tạo Angular schematic hoặc snippet sinh sẵn khung component + test theo đúng convention, để người mới không dựng lệch chuẩn ngay từ đầu.

**Vì sao là mức ③:** biến convention thành tài sản chung giúp cả đội đi nhanh và đều.
