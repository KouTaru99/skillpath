# Phân tích log & Debug

**Định nghĩa.** **Debug** là quá trình tìm và sửa lỗi: tái hiện → khoanh vùng → tìm nguyên nhân gốc → sửa → kiểm chứng. **Log** ghi lại những gì hệ thống đang làm, dùng khi không gắn được breakpoint (vd lỗi chỉ xảy ra trên môi trường thật). Kỹ năng này phân biệt dev đoán mò với dev điều tra có phương pháp. Công cụ chính: **DevTools** trình duyệt (Console, Network, Sources, Performance) + **Angular DevTools** (xem cây component, change detection).

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc lỗi trên Console, dùng breakpoint khoanh vùng, xem Network biết request nào fail.

**Ví dụ thực tế — lần một lỗi "trang trắng".**
```
1. Console: "TypeError: Cannot read properties of undefined (reading 'name')"
2. Click dòng lỗi → tới đúng chỗ: user.name khi user còn undefined (API chưa về)
3. Network: GET /api/user trả 200 nhưng body rỗng
→ Nguyên nhân: render trước khi có dữ liệu. Sửa: dùng *ngIf hoặc async pipe chờ dữ liệu.
```

**Vì sao là mức ①:** khoanh được vùng lỗi cơ bản, chưa điều tra ca khó.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** tìm nguyên nhân **gốc** có phương pháp, không chỉ chữa triệu chứng; dùng breakpoint điều kiện, đọc Network kỹ.

**Ví dụ thực tế — bug "thỉnh thoảng gửi request 2 lần".**
```
- Network: lọc request → thấy 2 POST /submit cách nhau 80ms.
- Breakpoint điều kiện tại handler → thấy do double-click.
- Nguyên nhân gốc: không khoá nút khi đang gửi.
- Sửa: [disabled]="submitting"; kiểm chứng lại không còn request kép.
```
Bạn ghi cách tái hiện để chắc đã sửa đúng gốc.

**Vì sao là mức ②:** điều tra có hệ thống, chạm nguyên nhân gốc.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** dùng **log có cấu trúc** để điều tra lỗi không tái hiện được trên máy mình (chỉ xảy ra ở production), lần lỗi xuyên FE–BE.

**Ví dụ 1 — log có ngữ cảnh + correlation id để ghép log FE với BE.**
```typescript
logError(scope: string, err: any, ctx: { requestId?: string } = {}) {
  console.error(JSON.stringify({
    scope, message: err?.message, requestId: ctx.requestId,
    url: location.pathname, time: new Date().toISOString(),
  }));
}
// Lấy requestId từ header response để tra cùng request bên backend
```

**Ví dụ 2 — bug chỉ xảy ra trên một số máy.** Lỗi "layout vỡ" chỉ ở một số người. Bạn thu thêm ngữ cảnh (trình duyệt, cỡ màn, zoom) qua log → phát hiện chỉ dính Safari cũ → khoanh đúng nguyên nhân thay vì đoán.

**Vì sao vẫn là ②:** điều tra được lỗi khó/môi trường thật, chưa tới tối ưu hệ thống chẩn đoán.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** dùng công cụ chuyên sâu cho lỗi phức tạp (rò bộ nhớ, treo/chậm) và **thiết lập hệ thống quan sát** (observability) để đội phát hiện lỗi sớm.

**Ví dụ 1 — chẩn rò bộ nhớ trong Angular.** App dùng lâu càng chậm.
```
1. DevTools > Memory: chụp heap snapshot trước/sau khi mở-đóng một màn nhiều lần.
2. So sánh: số subscription/đối tượng tăng dần không giải phóng.
3. Nguyên nhân: subscribe thủ công không unsubscribe khi ngOnDestroy.
4. Sửa: chuyển sang async pipe / takeUntil; kiểm chứng heap ổn định lại.
```

**Ví dụ 2 — tự động thu lỗi production.** Bạn tích hợp một `ErrorHandler` toàn cục đẩy lỗi kèm ngữ cảnh về công cụ (Sentry) để lỗi tự báo về, không phải chờ người dùng phản ánh:
```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(err: any) { reportToSentry(err); console.error(err); }
}
```

**Vì sao là mức ③:** xử được lớp lỗi khó nhất và xây năng lực chẩn đoán cho cả đội.
