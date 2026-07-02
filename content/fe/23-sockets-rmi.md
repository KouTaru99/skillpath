# Lập trình giao tiếp mạng (Sockets, RMI)

**Định nghĩa.** **Socket** là giao tiếp mạng cấp thấp qua TCP/UDP — hai máy mở một **kết nối** rồi gửi/nhận dữ liệu qua lại, khác hẳn HTTP thông thường (mỗi request tự mở rồi đóng kết nối ngay). **RMI** (Remote Method Invocation, phổ biến ở Java) cho phép gọi hàm trên máy khác gần như gọi hàm cục bộ — khái niệm ít khi FE chạm trực tiếp, nhưng cần hiểu để đối thoại với Back-end Java. Với Front-end, hiện thân thật của "lập trình socket" chính là **WebSocket**: kết nối luôn mở, hai chiều, dùng cho real-time (chat, thông báo trực tiếp) — khác HTTP là bạn không phải hỏi lại "có gì mới không", server tự đẩy dữ liệu khi có.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu khác biệt HTTP (request–response, đóng kết nối ngay) và WebSocket (kết nối luôn mở, hai chiều), dùng WebSocket API cơ bản để nhận cập nhật real-time.

**Ví dụ thực tế — thông báo đơn hàng đổi trạng thái, đẩy trực tiếp không cần tải lại (Angular).**
```typescript
@Injectable({ providedIn: 'root' })
export class OrderSocketService {
  private socket$ = webSocket<{ orderId: string; status: string }>('wss://api.cty.com/ws/orders');

  // server CHỦ ĐỘNG đẩy tin khi đơn đổi trạng thái — FE không phải hỏi lại (poll)
  updates$: Observable<{ orderId: string; status: string }> = this.socket$.asObservable();
}
```
```typescript
// component chỉ subscribe, không cần setInterval gọi lại API mỗi vài giây
this.orderSocket.updates$.subscribe(({ orderId, status }) => {
  this.toast.info(`Đơn ${orderId} đã chuyển sang "${status}"`);
});
```
Nếu dùng HTTP thông thường, muốn "real-time" phải **poll** (gọi API lặp lại mỗi vài giây để hỏi "có gì mới chưa") — tốn tài nguyên và vẫn trễ vài giây. WebSocket giữ kết nối mở, server đẩy tin ngay khi có, không cần hỏi.

**Vì sao là mức ①:** bạn dùng được kết nối real-time cho trường hợp đơn giản (một luồng cập nhật) — chưa xử lý các vấn đề khó hơn (mất kết nối, reconnect, nhiều kênh cùng lúc).

## ▸ Senior·V3 — ② Biết làm
**Khác V1:** xử lý được **mất kết nối và tự kết nối lại** — vấn đề thật của WebSocket mà ví dụ cơ bản ở V1 chưa chạm tới.

**Ví dụ thực tế — tự động reconnect khi mất mạng, không để người dùng phải tự tải lại trang.**
```typescript
function connectWithRetry(url: string, onMessage: (data: any) => void, retryDelay = 2000) {
  const socket = new WebSocket(url);
  socket.onmessage = (e) => onMessage(JSON.parse(e.data));
  socket.onclose = () => {
    console.warn('Mất kết nối real-time, thử lại sau', retryDelay, 'ms');
    setTimeout(() => connectWithRetry(url, onMessage, Math.min(retryDelay * 2, 30000)), retryDelay);
    // tăng dần thời gian chờ (exponential backoff) — tránh dội hàng loạt request khi server đang quá tải
  };
}
```
Không có cơ chế này, người dùng ngồi trong quán cà phê wifi chập chờn sẽ mất thông báo real-time mà không hề biết, tưởng ứng dụng vẫn hoạt động bình thường.

**Vì sao là mức ②:** bạn xử lý được vấn đề thật của kết nối real-time trong môi trường mạng không ổn định — không chỉ code cho trường hợp mạng luôn tốt.
