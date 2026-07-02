# Review code (cho người khác)

**Định nghĩa.** Đọc code của người khác trước khi merge để tìm bug, vi phạm convention, hoặc chỗ khó bảo trì — và phản hồi theo cách **người nhận sửa được, không thấy bị công kích**. Khác review code của chính mình (đã có ở mức Entry): ở đây bạn là người thứ hai, phải hiểu ý định của tác giả trước khi phán xét.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review theo checklist có sẵn của team, tìm được lỗi rõ ràng (thiếu xử lý lỗi, sai convention) và viết comment mang tính xây dựng — chưa tự đặt ra chuẩn review mới cho team.

**Ví dụ thực tế — comment review một PR, đúng và đủ lịch sự.**

Code trong PR:
```typescript
getOrders() {
  this.http.get('/api/orders').subscribe(res => this.orders = res);
}
```

Comment review — nêu vấn đề CỤ THỂ + gợi ý sửa, không chỉ chê:
```
🔴 Chưa xử lý nhánh lỗi — nếu API trả 500, subscribe không set gì,
   UI đứng nguyên loading mãi mà không báo gì cho người dùng.

   Gợi ý:
   this.http.get('/api/orders').subscribe({
     next: res => this.orders = res,
     error: () => this.notify.error('Không tải được danh sách đơn'),
   });

🟡 Nit: đặt tên `res` hơi chung, đổi thành `orders` cho rõ nghĩa hơn — không blocking.
```
Hai điểm đắt giá: (1) phân loại mức độ (🔴 phải sửa / 🟡 gợi ý, không bắt buộc) để tác giả biết ưu tiên; (2) đưa **gợi ý cụ thể**, không chỉ nói "sai rồi" — người nhận review đỡ mất công đoán ý.

**Vì sao là mức ①:** bạn review đúng theo chuẩn có sẵn và phản hồi xây dựng — chưa tự đặt chuẩn review mới hay xử lý bất đồng quan điểm kỹ thuật giữa các reviewer.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** xử lý được khi **hai reviewer bất đồng quan điểm** về cùng một đoạn code, và biết khi nào một góp ý là "sở thích cá nhân" chứ không phải vấn đề thật.

**Tình huống thực tế — bất đồng giữa 2 reviewer.** Reviewer A yêu cầu đổi toàn bộ `.subscribe()` sang `async` pipe "vì đó là best practice". Reviewer B phản đối vì đoạn code đó có 3 tầng logic phụ thuộc lẫn nhau, viết bằng `async` pipe sẽ khó đọc hơn, không chỉ đơn thuần rập khuôn. Bạn phân xử: hỏi lại "vấn đề THẬT ở đây là gì — có rò bộ nhớ (`async` pipe giải quyết) hay chỉ là gu viết code?" Nếu code hiện tại đã tự `unsubscribe` đúng cách (dùng `takeUntil`), không có bug, thì đây là khác biệt về phong cách — không đáng chặn merge vì "sở thích".

**Vì sao là mức ②:** bạn phân biệt được góp ý nào là **vấn đề thật** (bug, rủi ro) và góp ý nào chỉ là gu cá nhân — tránh review biến thành tranh cãi vô ích, làm chậm cả team.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** đặt ra **checklist review chuẩn cho cả team**, đúc kết từ những lỗi hay lặp lại — thay vì mỗi lần review lại tự nhớ cần soi gì.

**Ví dụ thực tế — checklist rút ra sau khi 3 PR liên tiếp đều lọt cùng một loại lỗi.** Bạn nhận ra 3 tuần gần đây có 3 PR khác nhau đều bị lọt lỗi race condition do dùng `mergeMap` thay vì `switchMap` cho search — mỗi lần một reviewer khác nhau phát hiện muộn. Thay vì trông chờ trí nhớ từng người, bạn viết thành checklist chính thức của team:
```markdown
## Checklist review PR (FE)
- [ ] Ô tìm kiếm/autocomplete dùng switchMap, không phải mergeMap (tránh race condition)
- [ ] Mọi nút submit có [disabled] khi đang gửi (tránh double-submit)
- [ ] Nhánh lỗi API có xử lý, không chỉ happy path
```
Checklist này gắn vào template PR — reviewer nào cũng thấy, không phụ thuộc vào việc một người nhớ hết mọi cạm bẫy.

**Vì sao là mức ③:** bạn biến kinh nghiệm cá nhân thành **chuẩn chung** cho cả team, giảm phụ thuộc vào trí nhớ hay kinh nghiệm của riêng một reviewer.
