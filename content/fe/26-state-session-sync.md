# State/session synchronization

**Định nghĩa.** Đồng bộ trạng thái đăng nhập/phiên làm việc khi người dùng mở **nhiều tab** cùng lúc hoặc quay lại sau một thời gian — tránh tình trạng đăng xuất ở một tab mà các tab khác vẫn "tưởng" còn đăng nhập, gọi API bằng token đã huỷ.

## ▸ Senior·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đồng bộ trạng thái đăng nhập giữa nhiều tab của cùng một trình duyệt, để đăng xuất ở một tab thì các tab khác tự cập nhật theo.

**Ví dụ thực tế — đăng xuất một tab, các tab khác tự động về trang đăng nhập (Angular).**
```typescript
@Injectable({ providedIn: 'root' })
export class SessionSyncService {
  private channel = new BroadcastChannel('auth-session');   // kênh giao tiếp giữa các tab cùng gốc

  constructor(private router: Router, private auth: AuthService) {
    this.channel.onmessage = (event) => {
      if (event.data === 'logout') {
        this.auth.clearTokenLocally();      // không gọi lại API logout — tab kia đã gọi rồi
        this.router.navigate(['/login']);
      }
    };
  }

  logout() {
    this.auth.clearTokenLocally();
    this.channel.postMessage('logout');     // báo cho MỌI tab khác biết
  }
}
```
Không có cơ chế này, một tab đăng xuất xong, tab bên cạnh vẫn hiển thị giao diện "đã đăng nhập" và tiếp tục gọi API bằng token cũ — nhận toàn lỗi 401 mà người dùng không hiểu vì sao.

**Vì sao là mức ①:** bạn xử lý được đồng bộ trạng thái đăng nhập cơ bản giữa các tab — chưa xử lý các ca phức tạp hơn (đồng bộ dữ liệu nghiệp vụ real-time giữa các tab, xung đột khi hai tab cùng sửa một thứ).

## ▸ Senior·V3 — ② Biết làm
**Khác V1:** xử lý được **xung đột** khi hai tab cùng sửa một dữ liệu nghiệp vụ (không chỉ đồng bộ trạng thái đăng nhập).

**Ví dụ thực tế — hai tab cùng sửa một đơn hàng, tránh ghi đè mất dữ liệu của nhau.** Nhân viên mở đơn hàng #123 ở 2 tab, sửa 2 trường khác nhau ở mỗi tab rồi lưu. Nếu tab nào lưu sau "thắng" hoàn toàn, sửa đổi ở tab lưu trước sẽ bị mất trắng. Bạn xử lý bằng **optimistic locking** (khoá lạc quan) — mỗi lần đọc kèm một phiên bản (`version`), lưu phải khớp đúng phiên bản đó:
```typescript
// tab A đọc đơn với version=5, sửa xong gửi lên kèm version=5
this.http.put(`/api/orders/123`, { ...changes, version: 5 });
// server: nếu version trong DB đã thành 6 (tab B đã lưu trước) → từ chối, báo "dữ liệu đã thay đổi, tải lại"
```
Thay vì âm thầm ghi đè, hệ thống báo rõ cho tab A biết đơn đã bị tab khác sửa trước, để người dùng tải lại và merge thủ công thay vì mất dữ liệu trong im lặng.

**Vì sao là mức ②:** bạn xử lý được xung đột dữ liệu nghiệp vụ thật giữa các phiên làm việc song song — không chỉ đồng bộ trạng thái đăng nhập đơn giản.
