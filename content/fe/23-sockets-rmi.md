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

## ▸ Specialist·V2 — ③ Thành thạo
**Khác V1:** hiểu vấn đề khi hệ thống có **nhiều server cùng xử lý WebSocket** — một vấn đề chỉ lộ ra khi hệ thống có tải cao, cần scale nhiều instance.

**Ví dụ thực tế — thông báo không tới khi có 2 server, vì client và người gửi không cùng kết nối vào 1 server.** Hệ thống chạy 2 instance API để chịu tải cao hơn. Client A kết nối WebSocket vào server 1. Khi có sự kiện cần báo cho client A, nhưng code xử lý sự kiện đó lại chạy trên server 2 — server 2 không biết client A đang giữ kết nối ở server 1, nên không gửi được gì. Bạn nhận diện đây là vấn đề cần một **backplane** (kênh trung gian, ví dụ Redis Pub/Sub) để mọi server đều biết và chuyển tiếp được tin nhắn cho đúng client, bất kể client đang kết nối vào server nào.

**Vì sao là mức ③:** bạn hiểu được giới hạn của WebSocket khi hệ thống scale ra nhiều server — vấn đề chỉ xuất hiện ở quy mô thật, không thấy được khi chỉ chạy 1 server lúc code/test.
