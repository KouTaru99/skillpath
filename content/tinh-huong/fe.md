# Tình huống thực chiến — Dev Front-end (Angular)

> 50 issue/bug hay gặp khi làm việc thật, kèm bối cảnh · triệu chứng · nguyên nhân · cách xử (có code) · **nguồn tra cứu** (StackOverflow / GitHub Issues / tài liệu chính thức). Gom theo chủ đề để bạn tra theo đúng thứ đang gặp.

## 1. Change detection & RxJS

### 1. `ExpressionChangedAfterItHasBeenCheckedError` (NG0100)
**Bối cảnh:** bạn set giá trị hiển thị (vd tiêu đề, cờ loading) trong `ngAfterViewInit`, hoặc bind vào một getter tính toán.
**Triệu chứng:** app chạy được nhưng console đỏ: `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked` — chỉ xuất hiện ở dev mode.
**Nguyên nhân:** ở dev mode Angular chạy change detection **hai lần** liên tiếp để kiểm tra tính nhất quán; nếu giá trị binding đổi giữa hai lần (vì bạn sửa nó *sau* khi view đã dựng), Angular báo lỗi để cảnh báo "dữ liệu đổi sau khi đã vẽ".
**Cách xử:** đặt giá trị khởi tạo ở `ngOnInit`/constructor. Nếu buộc đổi sau khi view dựng, hoãn một nhịp (microtask) để nằm ở chu kỳ CD sau:
```typescript
constructor(private cdr: ChangeDetectorRef) {}
ngAfterViewInit() {
  Promise.resolve().then(() => { this.showBanner = true; this.cdr.detectChanges(); });
}
```
*Nguồn: [angular.dev/errors/NG0100](https://angular.dev/errors/NG0100) · [angular-university.io](https://blog.angular-university.io/angular-debugging/)*

### 2. Rò bộ nhớ do quên `unsubscribe`
**Bối cảnh:** trong component bạn `subscribe()` thủ công một Observable sống lâu — `route.params`, `valueChanges`, `interval`, hoặc một service `BehaviorSubject`.
**Triệu chứng:** vào–ra một màn nhiều lần thì handler chạy chồng nhau (2, 3, 4 lần...); app dùng lâu càng chậm, DevTools > Memory thấy số listener tăng dần.
**Nguyên nhân:** subscription không bị huỷ khi component destroy → giữ tham chiếu tới component cũ, không được thu hồi.
**Cách xử:** ưu tiên `async` pipe (Angular tự huỷ). Nếu buộc subscribe tay, dùng pattern `takeUntil`:
```typescript
private destroy$ = new Subject<void>();
ngOnInit() {
  this.route.params.pipe(takeUntil(this.destroy$)).subscribe(p => this.load(p['id']));
}
ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
```
Lưu ý: đặt `takeUntil` **cuối** chuỗi `pipe` (sau các operator tạo subscription khác) để chắc chắn huỷ hết.
*Nguồn: [dev.to — Avoid Memory Leaks in Angular](https://dev.to/theoklitosbam7/avoid-memory-leaks-in-angular-5gla)*

### 3. `OnPush`: view không cập nhật dù dữ liệu đã đổi
**Bối cảnh:** component đặt `ChangeDetectionStrategy.OnPush`, bạn thêm phần tử vào mảng bằng `this.items.push(x)` rồi thấy màn hình không đổi.
**Triệu chứng:** dữ liệu trong code đúng nhưng template không render item mới.
**Nguyên nhân:** `OnPush` chỉ chạy CD khi **tham chiếu** của `@Input` đổi; `push` sửa mảng tại chỗ nên tham chiếu giữ nguyên → Angular nghĩ "không có gì đổi".
**Cách xử:** cập nhật bất biến (tạo tham chiếu mới), hoặc chủ động đánh dấu:
```typescript
this.items = [...this.items, newItem];   // tham chiếu mới → OnPush nhận ra
// hoặc khi buộc mutate: this.cdr.markForCheck();
```
*Nguồn: [Angular — Skipping component subtrees (OnPush)](https://angular.dev/best-practices/skipping-subtrees)*

### 4. `subscribe` lồng trong `subscribe` (nested subscribe)
**Bối cảnh:** cần lấy user rồi lấy đơn hàng của user đó, bạn viết `getUser().subscribe(u => getOrders(u.id).subscribe(...))`.
**Triệu chứng:** khi giá trị đầu đổi nhanh (đổi bộ lọc liên tục), kết quả cũ về muộn **ghi đè** kết quả mới; code khó đọc, dễ rò subscription.
**Nguyên nhân:** subscribe lồng nhau không huỷ luồng cũ khi có giá trị mới → race condition, và mỗi lần lại tạo chuỗi subscription mới.
**Cách xử:** dùng flattening operator: `switchMap` (huỷ cái cũ — hợp cho tìm kiếm/điều hướng), `concatMap` (tuần tự), `mergeMap` (song song):
```typescript
this.userId$.pipe(
  switchMap(id => this.api.getOrders(id)),   // đổi user → huỷ query đơn cũ, không bị đè
).subscribe(orders => this.orders = orders);
```
*Nguồn: [Angular Training — Anti-pattern: subscription within a subscription](https://www.angulartraining.com/daily-newsletter/anti-pattern-subscription-within-a-subscription/)*

### 5. API bị gọi 2 lần vì dùng `| async` nhiều nơi
**Bối cảnh:** cùng một `data$` (từ `http.get`) được `| async` ở nhiều chỗ trong template (vd vừa hiện loading, vừa hiện danh sách).
**Triệu chứng:** tab Network thấy **hai request giống hệt** cho cùng dữ liệu.
**Nguyên nhân:** Observable từ HttpClient là *cold* — mỗi lần `subscribe` (mỗi `async` pipe là một subscribe) sẽ kích một request mới.
**Cách xử:** cache kết quả bằng `shareReplay(1)`, hoặc subscribe một lần rồi tái dùng bằng `as`:
```typescript
// trong service
data$ = this.http.get<Item[]>('/api/items').pipe(shareReplay(1));
```
```html
<ng-container *ngIf="data$ | async as data">…dùng lại {{ data }} nhiều chỗ…</ng-container>
```
*Nguồn: [angular-university.io — Avoiding duplicate HTTP requests with shareReplay](https://angular-university.io/lesson/reactive-angular-duplicate-http-requests-sharereplay)*

## 2. Dependency Injection & module

### 6. `NullInjectorError: No provider for HttpClient`
**Bối cảnh:** vừa inject `HttpClient` vào một service để gọi API.
**Triệu chứng:** app crash trắng màn, console: `NullInjectorError: No provider for _HttpClient!`.
**Nguyên nhân:** chưa cung cấp provider cho `HttpClient` — Angular không tìm thấy trong cây injector.
**Cách xử:** với app dùng NgModule (v9–12), import `HttpClientModule` vào `AppModule`:
```typescript
import { HttpClientModule } from '@angular/common/http';
@NgModule({ imports: [ BrowserModule, HttpClientModule ] })
export class AppModule {}
```
(Với unit test thì import `HttpClientTestingModule` vào `TestBed`.)
*Nguồn: [Angular Wiki — No provider for HttpClient](https://www.angularjswiki.com/angular/no-provider-for-httpclient/)*

### 7. Service tưởng singleton nhưng bị tạo nhiều bản
**Bối cảnh:** bạn khai `providers: [CartService]` trong `@Component` hoặc trong một lazy module, rồi thấy state không đồng bộ giữa các màn.
**Triệu chứng:** thêm hàng vào giỏ ở màn A, sang màn B thấy giỏ trống.
**Nguyên nhân:** provider khai ở component/lazy module tạo **instance riêng** theo scope đó, không phải bản dùng chung toàn app.
**Cách xử:** muốn dùng chung toàn app → `providedIn: 'root'`, và **bỏ** khỏi `providers` của component:
```typescript
@Injectable({ providedIn: 'root' })
export class CartService {}
```
*Nguồn: [Angular — DI providers & scope](https://angular.dev/guide/di/dependency-injection-providers)*

### 8. `Cannot instantiate cyclic dependency!` (NG0200)
**Bối cảnh:** `UserService` inject `OrderService`, mà `OrderService` lại inject `UserService`.
**Triệu chứng:** console: `NG0200: Circular dependency in DI detected`.
**Nguyên nhân:** để tạo A cần B, để tạo B lại cần A → vòng lặp, DI không giải được.
**Cách xử:** tốt nhất **tách phần dùng chung ra service thứ ba** mà cả hai cùng phụ thuộc; nếu buộc phải giữ vòng, dùng `forwardRef` để hoãn resolve:
```typescript
constructor(@Inject(forwardRef(() => OrderService)) private orders: OrderService) {}
```
*Nguồn: [angular.dev/errors/NG0200](https://angular.dev/errors/NG0200)*

### 9. `StaticInjectorError` sau khi thêm service mới
**Bối cảnh:** service mới của bạn phụ thuộc `Router`/`MatDialog`/một service của thư viện.
**Triệu chứng:** `StaticInjectorError ... No provider for Router!` (hoặc token của thư viện).
**Nguyên nhân:** thiếu import module cung cấp dependency đó (RouterModule, MatDialogModule…).
**Cách xử:** đọc token trong thông báo lỗi → thêm đúng module vào `imports` của module chứa component/service.
*Nguồn: [angular.dev/errors/NG0201 — No provider found](https://angular.dev/errors/NG0201)*

### 10. Hai component nhận nhầm hai instance service khác nhau
**Bối cảnh:** bạn vừa để `@Injectable({ providedIn: 'root' })` vừa thêm service vào `providers` của một component.
**Triệu chứng:** state thay đổi ở component này không phản ánh ở component kia.
**Nguyên nhân:** khai ở `providers` component tạo instance riêng, che mất bản root.
**Cách xử:** thống nhất **một nơi** khai báo; state dùng chung phải cùng một instance (để ở root, gỡ khỏi `providers` component).
*Nguồn: [Angular — Hierarchical injectors](https://angular.dev/guide/di/hierarchical-dependency-injection)*

## 3. HTTP & tích hợp API

### 11. CORS bị chặn khi gọi API lúc dev
**Bối cảnh:** Angular chạy `localhost:4200` gọi API `localhost:3000` (khác origin).
**Triệu chứng:** console: `Access to XMLHttpRequest ... has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header`; request đỏ dù backend vẫn chạy.
**Nguyên nhân:** trình duyệt chặn request cross-origin khi server không trả header CORS.
**Cách xử (dev):** dùng proxy của Angular CLI để request đi cùng origin — tạo `proxy.conf.json`:
```json
{ "/api": { "target": "http://localhost:3000", "secure": false } }
```
rồi `ng serve --proxy-config proxy.conf.json`, gọi `/api/...` thay vì URL đầy đủ. *(Production phải cấu hình CORS ở server, không dùng proxy này.)*
*Nguồn: [samjulien.com — Proxy with Angular CLI to fix CORS](https://www.samjulien.com/proxy-angular-cli-cors/)*

### 12. Gọi `http.get` mà không thấy request nào chạy
**Bối cảnh:** viết `this.http.get('/api/x')` trong `ngOnInit` nhưng Network không có request.
**Triệu chứng:** không có lỗi, chỉ đơn giản là request không được gửi.
**Nguyên nhân:** Observable của HttpClient là **cold** — chỉ chạy khi có người `subscribe`. Không subscribe = "bản thiết kế" request chưa được thực thi.
**Cách xử:** `.subscribe(...)` hoặc dùng `| async` trong template:
```typescript
this.http.get<User[]>('/api/users').subscribe(users => this.users = users);
```
*Nguồn: [Angular — Requesting data with HttpClient](https://angular.dev/guide/http/making-requests) · [GitHub angular/angular#7865](https://github.com/angular/angular/issues/7865)*

### 13. Interceptor refresh token gây vòng lặp 401 vô hạn
**Bối cảnh:** interceptor bắt 401 để gọi API refresh token, nhưng API refresh cũng trả 401.
**Triệu chứng:** hàng loạt request 401 liên tục, app treo/đăng xuất bất thường.
**Nguyên nhân:** request refresh cũng đi qua interceptor → 401 → lại gọi refresh → lặp.
**Cách xử:** (1) bỏ qua interceptor cho chính endpoint refresh/logout; (2) dùng cờ `isRefreshing` + một `Subject` để các request song song **chờ** một lần refresh duy nhất thay vì mỗi cái tự refresh:
```typescript
if (req.url.includes('/auth/refresh')) return next.handle(req);   // không tự bắt 401 ở đây
```
*Nguồn: [Intertech — Handling refresh token with HttpInterceptor](https://www.intertech.com/angular-4-tutorial-handling-refresh-token-with-new-httpinterceptor/)*

### 14. Tải file nhưng nhận `[object Object]` / lỗi parse
**Bối cảnh:** gọi API trả file PDF/CSV (blob) hoặc text thuần.
**Triệu chứng:** Angular ném lỗi parse JSON, hoặc dữ liệu ra `[object Object]`.
**Nguyên nhân:** mặc định HttpClient dùng `responseType: 'json'` nên cố parse mọi response thành JSON.
**Cách xử:** khai đúng `responseType`:
```typescript
this.http.get('/api/report', { responseType: 'blob' });   // hoặc 'text'
```
*Nguồn: [Angular — HttpClient responseType](https://angular.dev/api/common/http/HttpClient)*

### 15. Interceptor viết xong nhưng không chạy
**Bối cảnh:** vừa tạo `AuthInterceptor` để gắn token nhưng request không có header.
**Triệu chứng:** interceptor như bị "bỏ qua".
**Nguyên nhân:** quên đăng ký provider, thiếu `multi: true`, hoặc đăng ký ở lazy module thay vì root.
**Cách xử:** đăng ký ở `AppModule` với `multi: true` (thứ tự chạy theo thứ tự khai báo):
```typescript
providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
```
*Nguồn: [Angular — HTTP interceptors](https://angular.dev/guide/http/interceptors)*

## 4. Forms & validation

### 16. `ExpressionChanged...` khi patch form trong `ngAfterViewInit`
**Bối cảnh:** đổ dữ liệu vào form (patchValue) sau khi view đã dựng.
**Triệu chứng:** lỗi `ExpressionChangedAfterItHasBeenCheckedError` liên quan giá trị control.
**Nguyên nhân:** giống NG0100 — thay đổi giá trị sau khi CD đã kiểm.
**Cách xử:** patch form ở `ngOnInit` thay vì `ngAfterViewInit`.
*Nguồn: [angular.dev/errors/NG0100](https://angular.dev/errors/NG0100)*

### 17. `valueChanges` chạy cả khi tự `patchValue` bằng code → vòng lặp lưu
**Bối cảnh:** bạn subscribe `form.valueChanges` để auto-save, đồng thời dùng `patchValue` để nạp dữ liệu.
**Triệu chứng:** vừa nạp dữ liệu đã kích auto-save → có khi thành vòng lặp lưu vô tận.
**Nguyên nhân:** `patchValue`/`setValue` mặc định phát `valueChanges`.
**Cách xử:** tắt phát sự kiện khi cập nhật bằng code: `patchValue(v, { emitEvent: false })`. Lưu ý với `FormGroup`, control con vẫn có thể tự phát — nếu cần triệt để, patch từng control con với `emitEvent: false`.
*Nguồn: [GitHub angular/angular#52135 — partial ignore of valueChanges](https://github.com/angular/angular/issues/52135)*

### 18. Cảnh báo trộn `[(ngModel)]` với `formControlName`
**Bối cảnh:** đang dùng Reactive Form nhưng vẫn quen tay thêm `[(ngModel)]`.
**Triệu chứng:** console warning: *"It looks like you're using ngModel on the same form field as formControlName"*.
**Nguyên nhân:** trộn hai cơ chế form (template-driven và reactive) trên cùng một field.
**Cách xử:** chọn một; trong reactive form chỉ dùng `formControlName`, bỏ `[(ngModel)]`.
*Nguồn: [Angular — Reactive forms](https://angular.dev/guide/forms/reactive-forms)*

### 19. Nhập sai nhưng không hiện lỗi validation
**Bối cảnh:** đặt validator (vd `Validators.email`) nhưng lỗi không hiển thị khi người dùng bỏ trống/nhập sai.
**Triệu chứng:** form invalid nhưng UI không báo gì; hoặc lỗi hiện ngay khi mới vào trang (khó chịu).
**Nguyên nhân:** thường do điều kiện hiển thị chưa xét `touched`/`dirty`; và sau khi bấm Submit các field chưa "touched".
**Cách xử:**
```html
<mat-error *ngIf="ctrl.invalid && (ctrl.dirty || ctrl.touched)">Email chưa đúng</mat-error>
```
```typescript
onSubmit() { if (this.form.invalid) { this.form.markAllAsTouched(); return; } }
```
*Nguồn: [GitHub angular/material#1633 — don't show errors until touched](https://github.com/angular/material/issues/1633)*

### 20. Thêm/xoá field động không được
**Bối cảnh:** form cho phép thêm nhiều số điện thoại/địa chỉ.
**Triệu chứng:** không biết bind mảng control động thế nào.
**Nguyên nhân:** dùng `FormControl` đơn lẻ không quản được danh sách động.
**Cách xử:** dùng `FormArray`:
```typescript
phones = this.fb.array([]);
addPhone() { this.phones.push(this.fb.control('')); }
removePhone(i: number) { this.phones.removeAt(i); }
```
```html
<div formArrayName="phones"><input *ngFor="let c of phones.controls; let i = index" [formControlName]="i"></div>
```
*Nguồn: [Angular — FormArray / dynamic forms](https://angular.dev/guide/forms/dynamic-forms)*

## 5. Routing & lazy load

### 21. Refresh/mở thẳng route con → 404 sau khi deploy
**Bối cảnh:** app chạy tốt khi bấm chuyển trang, nhưng F5 tại `/orders/123` thì 404.
**Triệu chứng:** `404 Not Found` (hoặc "The requested URL was not found on this server").
**Nguyên nhân:** SPA — server tìm file thật theo URL, không có `/orders/123` nên trả 404. Chỉ Angular router mới biết route đó.
**Cách xử:** cấu hình server fallback mọi route về `index.html`:
```nginx
location / { try_files $uri $uri/ /index.html; }
```
*Nguồn: [GitHub angular/angular#19009 — 404 on route refresh](https://github.com/angular/angular/issues/19009)*

### 22. Đổi trang nhưng không cuộn lên đầu
**Bối cảnh:** từ trang danh sách (đã cuộn xuống) bấm vào chi tiết, trang mới vẫn ở vị trí cuộn cũ.
**Triệu chứng:** vào trang mới đang lơ lửng giữa/cuối.
**Nguyên nhân:** mặc định router **không** đụng vị trí cuộn khi đổi route.
**Cách xử:**
```typescript
RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })
```
*Nguồn: [Angular — InMemoryScrollingOptions](https://angular.dev/api/router/InMemoryScrollingOptions)*

### 23. Guard chạy nhưng vẫn vào được route
**Bối cảnh:** `CanActivate` trả về một `Observable<boolean>` (vd kiểm quyền qua API).
**Triệu chứng:** guard log ra nhưng người dùng vẫn vào được.
**Nguyên nhân:** Observable chưa phát `false`/chưa complete đúng, hoặc quên `return`.
**Cách xử:** đảm bảo trả Observable phát boolean và hoàn tất:
```typescript
canActivate(): Observable<boolean> {
  return this.auth.check().pipe(map(ok => ok || this.router.parseUrl('/login') as any));
}
```
*Nguồn: [Angular — Route guards (CanActivate)](https://angular.dev/guide/routing/common-router-tasks)*

### 24. Mất query param khi điều hướng
**Bối cảnh:** đang ở `/list?page=2&status=open`, navigate sang chi tiết rồi quay lại thì mất filter.
**Triệu chứng:** query param biến mất sau `router.navigate`.
**Nguyên nhân:** mặc định navigate không giữ query param cũ.
**Cách xử:** `this.router.navigate([...], { queryParamsHandling: 'merge' })` (hoặc `'preserve'`).
*Nguồn: [Angular — Router NavigationExtras](https://angular.dev/api/router/NavigationExtras)*

### 25. Lazy module không tải
**Bối cảnh:** khai `loadChildren` cho một feature module.
**Triệu chứng:** vào route lazy thì lỗi hoặc trắng, console báo không tìm thấy module.
**Nguyên nhân:** sai đường dẫn/tên class trong `import(...)`, hoặc module thiếu `RouterModule.forChild`.
**Cách xử:** kiểm khớp tên class và đường dẫn:
```typescript
{ path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
```
*Nguồn: [Angular — Lazy loading feature modules](https://angular.dev/guide/ngmodules/lazy-loading)*

## 6. CSS/layout & responsive

### 26. `z-index` đặt rồi mà không "nổi" lên trên
**Bối cảnh:** đặt `z-index: 999` cho tooltip/dropdown nhưng nó vẫn bị phần tử khác che.
**Triệu chứng:** phần tử có z-index cao vẫn nằm dưới.
**Nguyên nhân:** (1) phần tử chưa có `position` khác `static` → `z-index` không có tác dụng (trừ trong flex/grid); (2) bị "nhốt" trong một **stacking context** của tổ tiên (tổ tiên có `transform`, `opacity < 1`, `filter`...), nên z-index chỉ so trong context đó.
**Cách xử:** thêm `position: relative` + `z-index`; kiểm tổ tiên gần nhất có tạo stacking context không, nếu có thì nâng z-index ở đúng tầng đó.
*Nguồn: [MDN — Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)*

### 27. Item flex tràn ra ngoài, `text-overflow: ellipsis` không ăn
**Bối cảnh:** một hàng flex có text dài, muốn cắt bằng `…` nhưng nó đẩy layout rộng ra.
**Triệu chứng:** text không cắt, item bung rộng hơn cha.
**Nguyên nhân:** flex item mặc định `min-width: auto` = kích thước nội dung tối thiểu, nên không co nhỏ hơn text được.
**Cách xử:** đặt `min-width: 0` cho flex item (và bọc text có `overflow:hidden; text-overflow:ellipsis; white-space:nowrap`):
```css
.flex-item { min-width: 0; }
.flex-item .text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```
*Nguồn: [CSS-Tricks — Flexbox and truncated text](https://css-tricks.com/flexbox-truncated-text/)*

### 28. `100vh` bị nhảy trên điện thoại
**Bối cảnh:** làm màn full-height (hero/màn đăng nhập) bằng `height: 100vh`.
**Triệu chứng:** trên mobile phần dưới bị thanh địa chỉ che, hoặc layout nhảy khi cuộn.
**Nguyên nhân:** `100vh` trên mobile tính theo chiều cao khi thanh địa chỉ **ẩn**, lớn hơn vùng thực thấy lúc đầu.
**Cách xử:** dùng đơn vị viewport động; `svh` an toàn cho phần lớn layout, có fallback `100vh` cho trình duyệt cũ:
```css
.screen { height: 100vh; height: 100svh; }
```
*Nguồn: [CSS-Tricks — The trick to viewport units on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)*

### 29. `position: sticky` không dính
**Bối cảnh:** làm header/cột dính khi cuộn.
**Triệu chứng:** phần tử `sticky` cuộn đi mất như bình thường.
**Nguyên nhân:** thiếu ngưỡng (`top`/`bottom`), hoặc một **tổ tiên** có `overflow: hidden/auto/scroll` khiến sticky "dính" trong khung cuộn đó.
**Cách xử:** đặt `top: 0`; rà bỏ `overflow` không cần thiết ở tổ tiên gần nhất.
*Nguồn: [MDN — position: sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning)*

### 30. CSS không "xuyên" được vào component con
**Bối cảnh:** muốn style một phần tử bên trong component con (hoặc component thư viện như Angular Material).
**Triệu chứng:** viết CSS trong component cha nhưng không ăn vào con.
**Nguyên nhân:** Angular ViewEncapsulation gắn thuộc tính riêng cho mỗi component nên style bị giới hạn phạm vi.
**Cách xử:** ưu tiên **CSS custom properties** (biến CSS không bị encapsulation chặn) hoặc `:host`; hạn chế `::ng-deep` (đã deprecated):
```css
/* cha đặt biến, con dùng — không phá encapsulation */
app-child { --accent: #2f6fb3; }
```
*Nguồn: [Angular — Component styling](https://angular.dev/guide/components/styling) · [Brian Treese — ng-deep alternatives](https://briantree.se/angular-ng-deep-alternatives/)*

## 7. TypeScript & build

### 31. `Property 'x' does not exist on type ...`
**Bối cảnh:** dùng dữ liệu từ API mà chưa khai kiểu.
**Triệu chứng:** đỏ ở IDE/khi build: `Property 'name' does not exist on type 'Object'`.
**Nguyên nhân:** response mặc định kiểu chung, TS không biết có field `name`.
**Cách xử:** khai interface và ép kiểu response:
```typescript
interface User { id: number; name: string; }
this.http.get<User[]>('/api/users');   // giờ TS biết có .name
```
*Nguồn: [Angular — Typed HTTP responses](https://angular.dev/guide/http/making-requests#fetching-json-data)*

### 32. `Object is possibly 'null'`
**Bối cảnh:** truy cập thuộc tính của kết quả có thể null (vd `document.querySelector`, `@ViewChild`).
**Triệu chứng:** lỗi biên dịch khi `strictNullChecks` bật.
**Nguyên nhân:** TS strict mode buộc xử lý trường hợp null.
**Cách xử:** optional chaining + nullish, hoặc guard rõ ràng:
```typescript
const name = user?.profile?.name ?? 'Ẩn danh';
if (this.input) this.input.nativeElement.focus();
```
*Nguồn: [TypeScript Handbook — strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)*

### 33. `Cannot find module '@app/...'`
**Bối cảnh:** dùng path alias cho import gọn.
**Triệu chứng:** `Cannot find module '@app/services/...'`.
**Nguyên nhân:** chưa khai `paths` trong `tsconfig.json`.
**Cách xử:**
```jsonc
"compilerOptions": { "baseUrl": "./", "paths": { "@app/*": ["src/app/*"] } }
```
*Nguồn: [TypeScript — Module resolution / paths](https://www.typescriptlang.org/tsconfig#paths)*

### 34. Build production lỗi mà `ng serve` thì không
**Bối cảnh:** dev chạy êm, chạy `ng build --configuration production` thì đỏ (thường lỗi template).
**Triệu chứng:** lỗi kiểu ở template chỉ xuất hiện khi build prod.
**Nguyên nhân:** production build dùng **AOT + strict template** bắt lỗi mà JIT dev bỏ qua.
**Cách xử:** chạy build production sớm/trong CI để bắt lỗi; sửa binding/kiểu trong template cho khớp.
*Nguồn: [Angular — AOT compilation](https://angular.dev/tools/cli/aot-compiler)*

### 35. `Type 'X' is not assignable to type 'Y'`
**Bối cảnh:** gán giá trị vào biến/tham số có union/generic hẹp hơn.
**Triệu chứng:** lỗi biên dịch không assign được.
**Nguyên nhân:** kiểu nguồn rộng/khác kiểu đích.
**Cách xử:** đọc kỹ union; đừng lạm dụng `any` — dùng `unknown` rồi thu hẹp, hoặc sửa lại type nguồn cho đúng.
*Nguồn: [TypeScript Handbook — Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)*

## 8. Hiệu năng

### 36. `*ngFor` danh sách lớn bị giật
**Bối cảnh:** render bảng/list vài nghìn dòng, hoặc list cập nhật liên tục.
**Triệu chứng:** cuộn giật, gõ/lọc chậm; Performance thấy layout/paint tốn nhiều thời gian.
**Nguyên nhân:** (1) thiếu `trackBy` → mỗi lần dữ liệu đổi Angular dựng lại toàn bộ DOM; (2) render hết cả nghìn dòng cùng lúc.
**Cách xử:** thêm `trackBy`; với danh sách rất lớn dùng CDK Virtual Scroll (chỉ render phần thấy):
```html
<cdk-virtual-scroll-viewport itemSize="48" style="height: 400px">
  <div *cdkVirtualFor="let row of rows; trackBy: trackById">{{ row.name }}</div>
</cdk-virtual-scroll-viewport>
```
*Nguồn: [Angular Material — CDK Scrolling (Virtual scroll)](https://material.angular.io/cdk/scrolling/overview)*

### 37. Change detection chạy quá nhiều
**Bối cảnh:** app phức tạp, thao tác nhỏ cũng thấy chậm.
**Triệu chứng:** DevTools/Angular DevTools thấy nhiều chu kỳ CD không cần thiết.
**Nguyên nhân:** mọi component chạy CD mặc định mỗi sự kiện; nặng nhất khi bind hàm trong template.
**Cách xử:** đặt `ChangeDetectionStrategy.OnPush` + dùng `async` pipe; tránh gọi hàm trong template (xem ca 40).
*Nguồn: [Angular — Skipping component subtrees](https://angular.dev/best-practices/skipping-subtrees)*

### 38. Bundle phình to, tải trang chậm
**Bối cảnh:** app ngày càng nặng, `main.js` lớn.
**Triệu chứng:** thời gian tải đầu tăng; cảnh báo budget khi build.
**Nguyên nhân:** import cả thư viện lớn khi chỉ dùng một hàm; không tách lazy.
**Cách xử:** lazy load feature module; phân tích bằng `source-map-explorer dist/**/*.js` để thấy phần nào nặng; import lẻ (`import { debounce } from 'lodash-es'`).
*Nguồn: [web.dev — Reduce JavaScript payloads with code splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting)*

### 39. Ảnh nặng làm chậm LCP
**Bối cảnh:** trang có ảnh lớn, điểm LCP (Largest Contentful Paint) kém.
**Triệu chứng:** Lighthouse cảnh báo LCP cao; ảnh tải chậm.
**Nguyên nhân:** ảnh không nén, sai kích thước, tải tất cả cùng lúc.
**Cách xử:** `loading="lazy"` cho ảnh dưới màn; nén + đúng kích thước + `srcset`; ưu tiên ảnh above-the-fold. Angular có `NgOptimizedImage` (`ngSrc`).
*Nguồn: [Angular — NgOptimizedImage](https://angular.dev/guide/image-optimization)*

### 40. Gọi hàm trong template chạy lại mỗi lần CD
**Bối cảnh:** template có `{{ formatMoney(item.total) }}` hoặc `*ngIf="isAdmin()"`.
**Triệu chứng:** hàm bị gọi rất nhiều lần (đặt `console.log` trong hàm sẽ thấy), gây chậm.
**Nguyên nhân:** hàm trong template được gọi **mỗi chu kỳ change detection**, dù input không đổi.
**Cách xử:** chuyển sang **pure pipe** (chỉ tính lại khi input đổi), hoặc tính sẵn trong component:
```typescript
@Pipe({ name: 'money' }) export class MoneyPipe implements PipeTransform {
  transform(v: number) { return v.toLocaleString('vi-VN') + '₫'; }
}
// template: {{ item.total | money }}
```
*Nguồn: [Showpad Engineering — Never use function calls in template expressions](https://medium.com/showpad-engineering/why-you-should-never-use-function-calls-in-angular-template-expressions-e1a50f9c0496)*

## 9. Trình duyệt & môi trường

### 41. Máy khác kéo code về chạy lỗi lạ
**Bối cảnh:** đồng đội mới clone repo, hoặc CI báo lỗi mà máy bạn chạy được.
**Triệu chứng:** lỗi module/version kỳ lạ, không tái hiện trên máy bạn.
**Nguyên nhân:** `node_modules` cũ/lệch phiên bản, Node version khác nhau.
**Cách xử:** xoá `node_modules` + cài lại đúng lockfile bằng `npm ci`; đồng bộ Node version (`.nvmrc` + `nvm use`).
*Nguồn: [npm docs — npm ci](https://docs.npmjs.com/cli/v10/commands/npm-ci)*

### 42. Chạy Chrome ổn, Safari báo "Invalid Date"
**Bối cảnh:** parse chuỗi ngày từ API: `new Date('2024-01-01 10:00')`.
**Triệu chứng:** Chrome ra ngày đúng, Safari/Firefox ra `Invalid Date`.
**Nguyên nhân:** Chrome khoan dung định dạng lạ (dấu cách thay `T`); Safari theo ISO 8601 nghiêm ngặt nên từ chối.
**Cách xử:** dùng ISO chuẩn `2024-01-01T10:00:00`; hoặc thay `-` bằng `/` cho dạng ngày; luôn `isNaN(d.getTime())` để bắt lỗi parse.
*Nguồn: [Bugzilla Mozilla #1265136 — new Date behaves differently across browsers](https://bugzilla.mozilla.org/show_bug.cgi?id=1265136)*

### 43. `localStorage` ném lỗi ở chế độ ẩn danh / Safari
**Bối cảnh:** lưu cache/token vào `localStorage`.
**Triệu chứng:** ở private mode (Safari cũ) hoặc khi hết dung lượng: `QuotaExceededError`, app crash.
**Nguyên nhân:** một số môi trường chặn hoặc giới hạn `localStorage`.
**Cách xử:** bọc `try/catch` khi đọc/ghi, có phương án dự phòng trong bộ nhớ:
```typescript
try { localStorage.setItem(k, v); } catch { /* fallback: giữ trong biến/service */ }
```
*Nguồn: [MDN — Window.localStorage (exceptions)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)*

### 44. Deploy xong người dùng vẫn thấy bản cũ
**Bối cảnh:** vừa release bản mới nhưng người dùng phản ánh chưa thấy đổi.
**Triệu chứng:** phải Ctrl+F5 mới thấy bản mới.
**Nguyên nhân:** trình duyệt cache file JS/CSS cũ.
**Cách xử:** Angular production đã hash tên file (`main.abc123.js`) để "cache-bust"; cấu hình server để `index.html` **không cache** còn file có hash cache dài:
```nginx
location = /index.html { add_header Cache-Control "no-cache"; }
location /assets/ { add_header Cache-Control "max-age=31536000, immutable"; }
```
*Nguồn: [web.dev — HTTP caching](https://web.dev/articles/http-cache)*

### 45. Production gọi nhầm API localhost
**Bối cảnh:** hardcode URL API trong service.
**Triệu chứng:** bản production vẫn gọi `localhost:3000`, lỗi kết nối.
**Nguyên nhân:** không dùng file môi trường; URL dev bị build cứng vào bản prod.
**Cách xử:** để URL trong `environment.ts`/`environment.prod.ts` (Angular tự thay khi build với `fileReplacements`), build `--configuration production`:
```typescript
// environment.prod.ts
export const environment = { production: true, apiUrl: 'https://api.congty.com' };
```
*Nguồn: [Angular — Build environments (fileReplacements)](https://angular.dev/tools/cli/environments)*

## 10. Git & quy trình

### 46. Conflict trong `package-lock.json`
**Bối cảnh:** hai người cùng thêm dependency, merge nhánh thì `package-lock.json` conflict hàng trăm dòng.
**Triệu chứng:** conflict marker `<<<<<<<` khắp file lock, sửa tay dễ hỏng.
**Nguyên nhân:** file lock được sinh tự động, không nên sửa tay.
**Cách xử:** lấy `package.json` đã merge đúng, rồi tái sinh lock: xoá lock (hoặc `git checkout --theirs package-lock.json`) → `npm install` → commit lại.
*Nguồn: [npm docs — package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)*

### 47. Lỡ commit file `.env` / secret
**Bối cảnh:** vô tình `git add .` cả file chứa API key/token và đã push.
**Triệu chứng:** secret nằm trong lịch sử repo (kể cả sau khi xoá ở commit sau vẫn còn trong history).
**Nguyên nhân:** git giữ toàn bộ lịch sử; xoá ở commit mới không xoá ở commit cũ.
**Cách xử:** **coi như đã lộ → đổi ngay secret**; gỡ khỏi toàn bộ history bằng `git filter-repo` (hoặc BFG); thêm vào `.gitignore`.
*Nguồn: [GitHub Docs — Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)*

### 48. Rơi vào "detached HEAD"
**Bối cảnh:** `git checkout <sha>` để xem một commit cũ.
**Triệu chứng:** git báo *"You are in 'detached HEAD' state"*; commit mới có nguy cơ "mất".
**Nguyên nhân:** HEAD trỏ thẳng vào một commit thay vì một nhánh.
**Cách xử:** nếu đã lỡ commit và muốn giữ: `git switch -c ten-branch-moi`; nếu chỉ xem xong: `git switch main` để quay lại.
*Nguồn: [Git — Detached HEAD (git-checkout docs)](https://git-scm.com/docs/git-checkout#_detached_head)*

### 49. Lỡ `reset --hard` / rebase làm "mất" commit
**Bối cảnh:** chạy `git reset --hard HEAD~3` rồi nhận ra vừa xoá mất việc.
**Triệu chứng:** commit biến mất khỏi `git log`.
**Nguyên nhân:** commit bị "mồ côi" (orphan) nhưng **chưa bị xoá** khỏi repo (git giữ ~90 ngày).
**Cách xử:** `git reflog` để tìm lại SHA của trạng thái trước → `git reset --hard <sha>` (hoặc `git cherry-pick <sha>`).
*Nguồn: [Graphite — Recovering lost commits with git reflog](https://graphite.com/guides/recovering-lost-commits-git-reflog)*

### 50. Force push đè mất việc người khác
**Bối cảnh:** rebase nhánh rồi `git push --force` lên nhánh chung.
**Triệu chứng:** commit của đồng đội (họ push sau lần fetch của bạn) bị **xoá** khỏi remote.
**Nguyên nhân:** `--force` ghi đè remote vô điều kiện.
**Cách xử:** dùng `git push --force-with-lease` — chỉ đè nếu remote **chưa** có commit mới kể từ lần fetch cuối của bạn; nếu có, git chặn lại để bạn fetch trước.
*Nguồn: [Atlassian — --force considered harmful; understanding --force-with-lease](https://www.atlassian.com/blog/it-teams/force-with-lease)*
