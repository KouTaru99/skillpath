# Tình huống thực chiến — Dev Front-end (KHUÔN MẪU, chờ PO duyệt)

> Phần này đặt ở CUỐI role: tổng hợp ≥50 tình huống khó/issue/bug thật + cách gỡ, nhóm theo chủ đề.
> Nguồn: kinh nghiệm + tra cứu StackOverflow / GitHub Issues / Reddit / tài liệu chính thức.
> Content-model mỗi tình huống: Gặp khi · Triệu chứng · Nguyên nhân · Cách xử (có code) · Nguồn.

## Nhóm: Change detection & RxJS

### 1. `ExpressionChangedAfterItHasBeenCheckedError` (NG0100)
- **Gặp khi:** đổi giá trị binding trong `ngAfterViewInit`, hoặc dùng getter trả giá trị khác nhau mỗi lần gọi, hoặc component con sửa dữ liệu của cha.
- **Triệu chứng:** app chạy được nhưng console đỏ lỗi này (chỉ ở dev mode); đôi khi view nhấp nháy.
- **Nguyên nhân:** Angular chạy thêm một lần kiểm tra sau change detection ở dev mode; nếu giá trị binding đã đổi giữa hai lần kiểm → báo lỗi để cảnh báo dữ liệu "đổi sau khi đã vẽ".
- **Cách xử:** đặt giá trị khởi tạo ở `ngOnInit`/constructor thay vì `ngAfterViewInit`; nếu buộc đổi sau khi view dựng, hoãn một nhịp:
```typescript
constructor(private cdr: ChangeDetectorRef) {}
ngAfterViewInit() {
  Promise.resolve().then(() => { this.title = 'Đã tải xong'; this.cdr.detectChanges(); });
}
```
- *Nguồn: [angular.dev/errors/NG0100](https://angular.dev/errors/NG0100) · [blog.angular-university.io](https://blog.angular-university.io/angular-debugging/)*

### 2. Rò bộ nhớ do quên `unsubscribe` Observable
- **Gặp khi:** `subscribe()` thủ công trong component (vd `valueChanges`, `interval`, `route.params`) mà không huỷ khi component bị gỡ.
- **Triệu chứng:** dùng app lâu càng chậm; điều hướng qua lại một màn nhiều lần thì callback chạy nhiều lần chồng nhau.
- **Nguyên nhân:** subscription vẫn sống sau khi component destroy → giữ tham chiếu, không được thu hồi.
- **Cách xử:** ưu tiên `async` pipe (Angular tự huỷ). Nếu buộc subscribe tay, dùng `takeUntil`:
```typescript
private destroy$ = new Subject<void>();
ngOnInit() {
  this.search.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(...);
}
ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
```
- *Nguồn: kinh nghiệm phổ biến, SO "angular unsubscribe best practice".*

## Nhóm: Dependency Injection

### 3. `NullInjectorError: No provider for XxxService`
- **Gặp khi:** inject một service nhưng chưa đăng ký provider, hoặc đăng ký sai module.
- **Triệu chứng:** app crash trắng màn, console: `NullInjectorError: No provider for HttpClient!` (hoặc service của bạn).
- **Nguyên nhân:** Angular DI không tìm thấy provider cho token trong cây injector.
- **Cách xử:** với service của mình dùng `@Injectable({ providedIn: 'root' })`; với `HttpClient` phải `import { HttpClientModule }` vào `AppModule`:
```typescript
@NgModule({ imports: [HttpClientModule] })
export class AppModule {}
```
- *Nguồn: SO "NullInjectorError No provider for HttpClient".*

## Nhóm: HTTP & tích hợp API

### 4. CORS bị chặn khi gọi API lúc dev
- **Gặp khi:** Angular chạy `localhost:4200` gọi API `localhost:3000` → khác origin.
- **Triệu chứng:** console: `blocked by CORS policy: No 'Access-Control-Allow-Origin'`; request không tới được server dù backend chạy.
- **Nguyên nhân:** trình duyệt chặn request cross-origin khi server không trả header CORS.
- **Cách xử (dev):** dùng proxy của Angular CLI để request đi cùng origin — tạo `proxy.conf.json`:
```json
{ "/api": { "target": "http://localhost:3000", "secure": false } }
```
Rồi `ng serve --proxy-config proxy.conf.json`, và gọi `/api/...` thay vì URL đầy đủ. *(Production thì cấu hình CORS ở server, không dùng proxy này.)*
- *Nguồn: [samjulien.com](https://www.samjulien.com/proxy-angular-cli-cors/) · [syncfusion blog](https://www.syncfusion.com/blogs/post/resolve-cors-errors-angular-proxy)*

## Nhóm: Hiệu năng

### 5. `*ngFor` giật/lag với danh sách lớn
- **Gặp khi:** render danh sách hàng nghìn dòng, hoặc list cập nhật liên tục.
- **Triệu chứng:** cuộn giật, gõ/lọc chậm; DevTools thấy layout/paint tốn thời gian.
- **Nguyên nhân:** thiếu `trackBy` → mỗi lần dữ liệu đổi Angular dựng lại toàn bộ DOM; và render hết cả nghìn dòng cùng lúc.
- **Cách xử:** thêm `trackBy` để tái dùng DOM; với danh sách rất lớn dùng CDK Virtual Scroll (chỉ render phần thấy):
```html
<cdk-virtual-scroll-viewport itemSize="48" class="viewport">
  <div *cdkVirtualFor="let row of rows; trackBy: trackById">{{ row.name }}</div>
</cdk-virtual-scroll-viewport>
```
- *Nguồn: Angular CDK docs, SO "angular ngFor performance large list".*

---

## Đề xuất tổ chức 50 tình huống (nhóm chủ đề)
1. Change detection & RxJS · 2. Dependency Injection & module · 3. HTTP & tích hợp API · 4. Forms & validation · 5. Routing & lazy load · 6. CSS/layout & responsive · 7. TypeScript & build · 8. Hiệu năng · 9. Trình duyệt & môi trường · 10. Git & quy trình.
Mỗi nhóm ~5 tình huống → đủ ≥50.
