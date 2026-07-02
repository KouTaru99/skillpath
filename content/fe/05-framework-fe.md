# Framework Front-end (Angular)

**Định nghĩa.** Framework Front-end giúp dựng giao diện theo **component** (khối UI đóng gói tái dùng), tự quản lý render khi dữ liệu đổi, thay vì thao tác DOM thủ công. Ví dụ dưới dùng **Angular** — framework nhiều sinh viên và doanh nghiệp Việt Nam đang dùng — đi kèm **TypeScript**, **RxJS** (lập trình bất đồng bộ theo luồng dữ liệu) và **Dependency Injection** (tiêm phụ thuộc). Code minh hoạ theo Angular **v9–v12** (thời NgModule cổ điển, chưa có standalone component hay signals), vì đó là phiên bản phổ biến ở nhiều dự án đang chạy.

## ▸ Entry — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu component, template và **data binding**: hiển thị dữ liệu (`{{ }}`, `[prop]`), bắt sự kiện (`(click)`), lặp danh sách (`*ngFor`), rẽ nhánh (`*ngIf`); truyền dữ liệu cha → con bằng `@Input`, phát sự kiện con → cha bằng `@Output`.

**Ví dụ thực tế — một item thông báo trong hệ thống nội bộ.**
```typescript
// notification-item.component.ts
@Component({
  selector: 'app-notification-item',
  template: `
    <li [class.unread]="!item.read">
      <strong>{{ item.title }}</strong>
      <span class="time">{{ item.createdAt | date: 'short' }}</span>
      <button *ngIf="!item.read" (click)="read.emit(item.id)">Đánh dấu đã đọc</button>
    </li>
  `,
})
export class NotificationItemComponent {
  @Input() item!: Notification;                 // nhận dữ liệu từ component cha
  @Output() read = new EventEmitter<number>();  // phát sự kiện lên cha
}
```
`[class.unread]` gắn class theo điều kiện, `| date` là pipe định dạng, `(click)` bắt sự kiện, `@Output` + `EventEmitter` để cha xử lý logic (component con chỉ "báo lên", không tự gọi API).

**Vì sao là mức ①:** dựng được component hiển thị + tương tác cơ bản, chưa gọi dữ liệu hay quản trạng thái.

## ▸ Ex·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Tách logic ra **service** và tiêm bằng DI; gọi API qua **HttpClient** (trả về `Observable`); dùng **`async` pipe** để tự subscribe/unsubscribe; tối ưu `*ngFor` bằng `trackBy`.

**Ví dụ thực tế — màn danh sách thông báo lấy từ API.**
```typescript
// notification.service.ts
@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>('/api/notifications');
  }
  markRead(id: number): Observable<void> {
    return this.http.post<void>(`/api/notifications/${id}/read`, {});
  }
}
```
```typescript
// notification-list.component.ts
@Component({
  selector: 'app-notification-list',
  template: `
    <ul *ngIf="items$ | async as items; else loading">
      <app-notification-item
        *ngFor="let n of items; trackBy: trackById"
        [item]="n" (read)="onRead(n.id)">
      </app-notification-item>
    </ul>
    <ng-template #loading>Đang tải…</ng-template>
  `,
})
export class NotificationListComponent implements OnInit {
  items$!: Observable<Notification[]>;
  constructor(private service: NotificationService) {}
  ngOnInit() { this.items$ = this.service.getAll(); }
  trackById(_: number, n: Notification) { return n.id; }   // giúp Angular không render lại cả danh sách
  onRead(id: number) { this.service.markRead(id).subscribe(); }
}
```
`async` pipe tự lo vòng đời subscribe (không rò bộ nhớ), `ng-template #loading` cho trạng thái tải, `trackBy` để Angular chỉ cập nhật item đổi thay vì dựng lại toàn danh sách.

**Vì sao là mức ②:** tách service/DI, gọi API đúng luồng Observable, xử lý vòng đời gọn.

## ▸ Ex·V2 — ③ Thành thạo
**Ở mức này bạn làm chủ được gì.** RxJS nâng cao để xử lý luồng phức tạp (`debounceTime`, `switchMap`, `distinctUntilChanged`), tối ưu change detection bằng **`OnPush`**, quản state dùng chung qua service + `BehaviorSubject`, và hiểu khi nào phải tự `unsubscribe` (dùng `takeUntil`).

**Ví dụ 1 — ô tìm kiếm sản phẩm có gợi ý, chống "kết quả cũ về muộn" (race condition).**
```typescript
@Component({
  selector: 'app-product-search',
  changeDetection: ChangeDetectionStrategy.OnPush,   // chỉ render lại khi input/Observable đổi
  template: `
    <input [formControl]="keyword" placeholder="Tìm sản phẩm…" />
    <app-product-card *ngFor="let p of (results$ | async)" [product]="p"></app-product-card>
  `,
})
export class ProductSearchComponent {
  keyword = new FormControl('');
  results$ = this.keyword.valueChanges.pipe(
    debounceTime(300),          // gom phím: chỉ chạy sau khi ngừng gõ 300ms
    distinctUntilChanged(),     // bỏ qua nếu từ khoá không đổi
    switchMap((kw) => this.api.search(kw)),  // switchMap HUỶ request cũ khi có từ khoá mới → hết race
  );
  constructor(private api: ProductApi) {}
}
```
Điểm cốt lõi: `switchMap` tự huỷ request trước đó, nên kết quả của từ khoá cũ về muộn không ghi đè kết quả mới — lỗi rất hay gặp nếu tự viết bằng `subscribe` lồng nhau.

**Ví dụ 2 — state giỏ hàng dùng chung nhiều màn qua service `BehaviorSubject`.**
```typescript
@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly items$ = new BehaviorSubject<CartItem[]>([]);
  readonly count$ = this.items$.pipe(map((items) => items.length));   // dẫn xuất số lượng
  readonly total$ = this.items$.pipe(
    map((items) => items.reduce((s, i) => s + i.price * i.qty, 0)),
  );

  add(item: CartItem) {
    this.items$.next([...this.items$.value, item]);   // đổi state bất biến → OnPush nhận ra
  }
}
```
Icon giỏ hàng ở header và trang thanh toán cùng subscribe `count$`/`total$` qua `async` pipe — một nguồn state, mọi nơi đồng bộ. Đổi state theo kiểu bất biến (`[...]`) để `OnPush` phát hiện thay đổi.

**Vì sao là mức ③:** bạn làm chủ luồng bất đồng bộ và change detection, xử lý được các bug tinh vi (race, rò bộ nhớ) mà mức dưới hay dính.

## ▸ Ex·V3 — ③ Thành thạo (mở rộng phạm vi — kiến trúc app lớn)
**Ở mức này bạn làm chủ được gì.** Cùng mức "thành thạo" nhưng áp ở **quy mô ứng dụng lớn**: chia module (core/shared/feature), **lazy load** để giảm bundle ban đầu, **HTTP interceptor** xử lý xuyên suốt (token, lỗi), **route guard** chặn truy cập, và đặt convention cho cả team.

**Ví dụ 1 — lazy load module báo cáo (chỉ tải khi vào route đó).**
```typescript
const routes: Routes = [
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) },
  {
    path: 'reports',
    canActivate: [AdminGuard],
    loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
  },
];
```
Module báo cáo nặng (biểu đồ, export) chỉ tải khi người dùng thực sự mở — trang đăng nhập/dashboard nhẹ hơn hẳn.

**Ví dụ 2 — interceptor gắn token & xử lý hết phiên (401) một chỗ cho toàn app.**
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.auth.token}` } });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) this.router.navigate(['/login']);   // hết phiên → về đăng nhập
        return throwError(err);
      }),
    );
  }
}
// Đăng ký trong AppModule:
// providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
```
Mọi request tự động có token, mọi lỗi 401 tự động đưa về đăng nhập — không phải lặp lại logic này ở từng service.

**Ví dụ 3 — cấu trúc module cho team đọc là hiểu.**
```
app/
├── core/        (service dùng toàn app, interceptor, guard — import 1 lần ở AppModule)
├── shared/      (component/pipe/directive dùng lại — import ở nhiều feature module)
└── features/
    ├── orders/  (OrdersModule + routing riêng, lazy load)
    └── reports/ (ReportsModule + routing riêng, lazy load)
```

**Vì sao vẫn là ③:** bạn áp năng lực "thành thạo" lên tầm hệ thống và đội ngũ, không chỉ một màn hình.

## ▸ Senior·V2 — ④ Chuyên sâu
**Khác Ex·V3:** không chỉ tổ chức tốt module *trong* một dự án mà **đóng gói năng lực đó thành thư viện dùng chung cho nhiều dự án** trong công ty.

**Ví dụ thực tế — Angular library nội bộ cho `AuthInterceptor` + `CartStore` (đã viết ở các mốc trước).**
```bash
ng generate library @company/auth-kit
# publish nội bộ: mọi dự án FE trong công ty cài về dùng, không copy-paste lại interceptor
```
```typescript
// dự án khác chỉ cần:
import { AuthInterceptorModule } from '@company/auth-kit';
```
Thay vì mỗi dự án tự viết lại `AuthInterceptor`, tự vá lại bug tương tự — một thư viện trung tâm, sửa một chỗ, mọi dự án nhận bản vá khi nâng version.

**Vì sao là mức ④:** bạn hiểu framework đủ sâu để **trừu tượng hoá** năng lực đã làm chủ thành công cụ dùng lại được ở quy mô công ty, không chỉ giải quyết cho dự án đang chạy.
