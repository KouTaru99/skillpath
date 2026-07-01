# Phân tích log & Debug

**Định nghĩa.** **Debug** là quá trình tìm và sửa lỗi: tái hiện → khoanh vùng → tìm nguyên nhân gốc → sửa → kiểm chứng. **Log** là các dòng ghi lại những gì hệ thống đang làm, dùng để lần ra nguyên nhân khi không gắn được breakpoint (vd lỗi chỉ xảy ra trên môi trường thật). Kỹ năng này phân biệt dev đoán mò ("thử cái này xem") với dev điều tra có phương pháp. Ở FE, công cụ chính là **DevTools** của trình duyệt (Console, Network, Sources, Performance).

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc được lỗi trên Console, dùng `console.log` và breakpoint để khoanh vùng, xem tab Network để biết request nào fail.

**Ví dụ thực tế — lần một lỗi "trang trắng".** Mở DevTools:
```
1. Console: thấy "TypeError: Cannot read properties of undefined (reading 'name')"
2. Click vào dòng lỗi → tới đúng chỗ: user.name khi user còn undefined (API chưa về).
3. Network: thấy GET /api/user trả 200 nhưng dữ liệu rỗng.
→ Nguyên nhân: render trước khi có dữ liệu. Sửa: thêm điều kiện loading.
```
Bạn biết đọc stack trace để nhảy tới dòng gây lỗi thay vì đọc mò.

**Vì sao là mức ①:** khoanh được vùng lỗi cơ bản, chưa điều tra ca khó.

## ▸ Ex·V1 — ② Biết làm
**Khác Entry:** dùng công cụ phân tích **có phương pháp** để tìm nguyên nhân gốc, không chỉ chữa triệu chứng; dùng breakpoint điều kiện, đọc Network kỹ (headers, payload, timing).

**Ví dụ thực tế — bug "thỉnh thoảng mới xảy ra".** Một nút đôi khi gửi request hai lần. Bạn điều tra:
```
- Network: lọc theo request → thấy 2 POST /submit cách nhau 80ms.
- Breakpoint điều kiện tại handler: dừng chỉ khi gọi lần 2 → thấy double-click.
- Nguyên nhân gốc: không khoá nút khi đang gửi.
- Sửa: disable nút + cờ isSubmitting; kiểm chứng lại không còn request kép.
```
Bạn ghi lại cách tái hiện để chắc chắn đã sửa đúng gốc.

**Vì sao là mức ②:** điều tra có hệ thống, chạm nguyên nhân gốc.

## ▸ Ex·V2 — ② Biết làm (mở rộng phạm vi)
**Khác V1:** dùng **log có cấu trúc** để điều tra lỗi không tái hiện được trên máy mình (chỉ xảy ra ở môi trường thật), và lần lỗi xuyên FE–BE.

**Ví dụ thực tế — lỗi chỉ xảy ra trên production.** Bạn thêm log có ngữ cảnh và dùng correlation id để ghép log FE với BE:
```js
function logError(scope, err, ctx = {}) {
  console.error(JSON.stringify({
    scope, message: err.message, requestId: ctx.requestId,
    url: location.pathname, time: new Date().toISOString(),
  }));
}
// gắn requestId từ header response để tra cùng một request bên BE
```
Nhờ `requestId` chung, bạn tìm đúng dòng log tương ứng ở Back-end và xác định lỗi nằm ở tầng nào.

**Vì sao vẫn là ②:** bạn điều tra được lỗi khó/môi trường thật, chưa tới mức tối ưu hệ thống chẩn đoán.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** dùng được công cụ chuyên sâu cho lỗi phức tạp (rò bộ nhớ, treo/chậm), và **thiết lập hệ thống quan sát** (observability) để cả đội phát hiện lỗi sớm.

**Ví dụ thực tế — chẩn rò bộ nhớ.** App dùng lâu càng chậm; bạn dùng tab Memory:
```
1. Performance/Memory → chụp heap snapshot trước và sau khi mở/đóng màn nhiều lần.
2. So sánh: số listener/đối tượng tăng dần không được giải phóng.
3. Nguyên nhân: addEventListener không cleanup khi unmount → giữ tham chiếu.
4. Sửa: trả hàm cleanup trong useEffect; kiểm chứng heap ổn định lại.
```
Bạn còn tích hợp công cụ thu lỗi (vd Sentry) để lỗi production tự báo về kèm ngữ cảnh, và đặt quy ước log cho cả đội.

**Vì sao là mức ③:** bạn xử được lớp lỗi khó nhất và xây năng lực chẩn đoán cho cả đội.
