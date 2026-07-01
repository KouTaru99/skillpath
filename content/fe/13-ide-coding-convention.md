# IDE & Coding Convention

**Định nghĩa.** **IDE** (Integrated Development Environment — môi trường lập trình tích hợp, vd VS Code, WebStorm) là công cụ viết code có hỗ trợ gợi ý, gỡ lỗi, refactor. **Coding convention** là bộ quy ước viết code thống nhất trong đội: cách đặt tên, format, cấu trúc thư mục, quy tắc commit. Hai thứ này tưởng nhỏ nhưng quyết định **tốc độ và sự đồng nhất** của cả đội: code đọc như một người viết thì review nhanh, bàn giao dễ, ít cãi nhau về dấu cách. Thường được tự động hoá bằng ESLint (bắt lỗi/chuẩn) + Prettier (format).

## ▸ Entry — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Dùng tốt IDE (gợi ý, đi tới định nghĩa, refactor đổi tên, gỡ lỗi bằng breakpoint) và **tuân thủ** coding convention của đội — code bạn nộp đã đúng format, đúng tên, không cần ai sửa tay.

**Ví dụ thực tế — dùng IDE & tuân convention.** Bạn dùng các thao tác tăng tốc:
```
- F12 / Ctrl+Click: đi tới định nghĩa hàm/biến.
- F2: đổi tên biến an toàn trên toàn dự án (rename symbol).
- Breakpoint + Watch: dừng đúng dòng, xem giá trị biến thay vì rải console.log.
```
Và cấu hình tự áp convention khi lưu file:
```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }
}
```
Bạn theo đúng quy ước đặt tên đội đề ra (vd `camelCase` cho biến, `PascalCase` cho component).

**Vì sao là mức ②:** bạn dùng công cụ thành thạo và tuân thủ chuẩn ổn định.

## ▸ Ex·V1 — ② Biết làm (giữ mức, mở rộng phạm vi)
**Khác Entry:** vẫn "biết làm" nhưng chủ động hơn — cấu hình ESLint/Prettier cho dự án, viết commit message rõ ràng, và dùng các tính năng IDE nâng cao (multi-cursor, snippet, tích hợp Git).

**Ví dụ thực tế — dựng "hàng rào" tự động cho cả đội.** Bạn thiết lập để code không đạt chuẩn không lọt vào nhánh chính:
```jsonc
// .eslintrc — bật quy tắc bắt lỗi thường gặp
{ "extends": ["eslint:recommended", "plugin:react-hooks/recommended"],
  "rules": { "no-unused-vars": "warn", "eqeqeq": "error" } }
```
```bash
# pre-commit hook: chạy lint trước khi commit
npx lint-staged   # chỉ lint file đang commit
```
Và viết commit theo quy ước Conventional Commits để lịch sử đọc được:
```
feat(order): thêm bộ lọc theo trạng thái đơn
fix(auth): sửa token không tự refresh khi hết hạn
```

**Vì sao vẫn là ②:** bạn thiết lập được nề nếp cho dự án, nhưng chưa ở mức đặt chuẩn cho nhiều đội.

## ▸ Ex·V2 — ③ Thành thạo
**Khác V1:** bạn **đặt và duy trì convention cho cả dự án/đội** — chọn rule có lý do, cân bằng giữa nghiêm và thực dụng, và hướng dẫn người mới.

**Ví dụ thực tế — chuẩn hoá một codebase nhiều người.** Bạn thống nhất cấu trúc thư mục, đặt rule import có thứ tự, cấm pattern dễ gây lỗi, và tự động hoá toàn bộ trong CI:
```
- Cấu trúc: features/<tên>/ gồm components, hooks, api, types — mọi người theo một khuôn.
- Rule: cấm import vòng, bắt buộc key trong list, cảnh báo any (TS).
- CI chặn merge nếu lint/format fail → chuẩn được thực thi, không phụ thuộc nhắc nhở.
```
Bạn giải thích *vì sao* mỗi rule tồn tại để đội đồng thuận, thay vì áp đặt.

**Vì sao là mức ③:** bạn biến convention thành tài sản chung giúp cả đội đi nhanh và đều.
