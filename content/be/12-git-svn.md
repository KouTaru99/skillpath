# Git/SVN

**Định nghĩa.** Công cụ quản lý phiên bản mã nguồn — ghi lại lịch sử thay đổi, cho phép nhiều người cùng sửa code mà không ghi đè lẫn nhau. **Git** phổ biến nhất hiện nay (phân tán — mỗi máy có bản sao đầy đủ lịch sử); **SVN** cũ hơn (tập trung — một server giữ lịch sử chính).

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dùng được các lệnh Git cơ bản: commit, push, pull — theo đúng quy trình của team.

**Ví dụ thực tế — vòng lặp làm việc cơ bản mỗi ngày.**
```bash
git pull                          # lấy code mới nhất từ team trước khi bắt đầu
# ... sửa code ...
git add src/OrderService.java
git commit -m "Thêm API lấy đơn hàng theo trạng thái"
git push                          # đẩy thay đổi lên để team khác thấy
```
Bạn commit với message rõ ràng (nói được "làm gì", không phải "fix bug" chung chung), và luôn `pull` trước khi bắt đầu để tránh code của mình dựa trên bản cũ.

**Vì sao là mức ①:** dùng đúng lệnh cơ bản trong quy trình đơn giản (1 nhánh) — chưa xử lý xung đột merge hay làm việc với nhiều nhánh song song.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** thành thạo chia nhánh (branch) và merge, xử lý được xung đột (conflict) đơn giản.

**Ví dụ thực tế — làm việc trên nhánh riêng rồi merge vào nhánh chính.**
```bash
git checkout -b feature/order-discount    # tạo nhánh riêng cho tính năng
# ... code + commit ...
git checkout main
git merge feature/order-discount          # gộp lại vào nhánh chính
```
```
# Nếu có conflict (2 người cùng sửa 1 dòng), Git đánh dấu:
<<<<<<< HEAD
double total = price * 0.9;
=======
double total = price - discount;
>>>>>>> feature/order-discount
```
Bạn tự đọc và chọn giữ phần đúng (hoặc gộp cả 2 ý), xoá các dấu `<<<<<<<`/`=======`/`>>>>>>>`, rồi commit lại — không hoảng khi thấy conflict.

**Vì sao là mức ②:** làm việc được với nhiều nhánh song song, tự xử lý xung đột đơn giản — chưa dùng kỹ thuật nâng cao (rebase, cherry-pick).

## ▸ Specialist·V1 — ③ Thành thạo
**Khác Ex·V1:** thành thạo version control nâng cao — merge phức tạp, **rebase**, xem **reflog**, **cherry-pick**, dùng **patch**.

**Ví dụ thực tế — cherry-pick một fix khẩn cấp sang nhánh release mà không mang theo các commit khác.**
```bash
git log feature/big-refactor --oneline   # tìm commit fix cụ thể, vd a1b2c3d
git checkout release/v2.1
git cherry-pick a1b2c3d                   # chỉ lấy đúng 1 commit đó, không mang cả nhánh
```
```bash
# Lỡ tay reset nhầm, mất commit? reflog vẫn giữ lịch sử thao tác (không phải lịch sử code)
git reflog                                # thấy được cả commit "đã mất" trước khi reset
git reset --hard HEAD@{2}                 # khôi phục lại
```
Bạn dùng `reflog` như "lưới an toàn" cuối cùng khi thao tác Git sai — Git hiếm khi thực sự XOÁ dữ liệu ngay, chỉ là bạn chưa biết cách tìm lại.

**Vì sao là mức ③:** bạn dùng thành thạo các công cụ Git nâng cao để xử lý tình huống phức tạp — không chỉ merge/conflict cơ bản.
