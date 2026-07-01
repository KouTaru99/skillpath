# Tình huống thực chiến — Dev Front-end (Angular)

> 50 issue/bug hay gặp khi làm việc thật + cách gỡ. Gom theo chủ đề. Nguồn: kinh nghiệm + StackOverflow / GitHub Issues / tài liệu chính thức. Bạn tra theo triệu chứng bạn đang gặp.

## 1. Change detection & RxJS

### 1. `ExpressionChangedAfterItHasBeenCheckedError` (NG0100)
**Gặp khi:** đổi giá trị binding trong `ngAfterViewInit`, dùng getter trả giá trị khác nhau mỗi lần, hoặc con sửa dữ liệu của cha.
**Nguyên nhân:** dev mode chạy thêm một lần kiểm tra sau change detection; giá trị đã đổi giữa hai lần → báo lỗi.
**Cách xử:** đặt giá trị khởi tạo ở `ngOnInit`/constructor; nếu buộc đổi sau khi view dựng, hoãn một nhịp: `Promise.resolve().then(() => { this.x = ...; this.cdr.detectChanges(); })`.
*Nguồn: [angular.dev/errors/NG0100](https://angular.dev/errors/NG0100), [blog.angular-university.io](https://blog.angular-university.io/angular-debugging/)*

### 2. Rò bộ nhớ do quên `unsubscribe`
**Gặp khi:** `subscribe()` thủ công (`valueChanges`, `interval`, `route.params`) không huỷ khi component destroy.
**Triệu chứng:** dùng lâu càng chậm; điều hướng qua lại một màn thì callback chạy chồng nhau.
**Cách xử:** ưu tiên `async` pipe (tự huỷ); nếu subscribe tay dùng `takeUntil(this.destroy$)` + `destroy$.next()` trong `ngOnDestroy`.

### 3. View không cập nhật dù dữ liệu đã đổi (OnPush)
**Gặp khi:** component `OnPush` nhưng bạn *sửa tại chỗ* object/array (`arr.push(x)`).
**Nguyên nhân:** OnPush chỉ chạy CD khi tham chiếu input đổi; sửa tại chỗ giữ nguyên tham chiếu.
**Cách xử:** đổi bất biến `this.items = [...this.items, x]`; hoặc `cdr.markForCheck()`.

### 4. `subscribe` lồng nhau gây callback hell + race
**Gặp khi:** trong `subscribe` lại gọi `subscribe` khác (lấy user rồi lấy đơn của user).
**Cách xử:** dùng operator gộp luồng: `switchMap` (huỷ cái cũ), `mergeMap` (chạy song song), `concatMap` (tuần tự). Ví dụ: `userId$.pipe(switchMap(id => api.getOrders(id)))`.

### 5. API bị gọi 2 lần vì subscribe nhiều nơi
**Gặp khi:** dùng `| async` cùng một Observable ở nhiều chỗ trong template.
**Nguyên nhân:** HTTP Observable là *cold* — mỗi subscribe kích một request.
**Cách xử:** `data$ = this.api.get().pipe(shareReplay(1))`; hoặc gán `*ngIf="data$ | async as data"` một lần rồi tái dùng `data`.

## 2. Dependency Injection & module

### 6. `NullInjectorError: No provider for HttpClient`
**Nguyên nhân:** chưa `import HttpClientModule` vào `AppModule`.
**Cách xử:** thêm `HttpClientModule` vào `imports` của module. Service của mình thì `@Injectable({ providedIn: 'root' })`.
*Nguồn: SO "NullInjectorError No provider for HttpClient".*

### 7. Service tưởng singleton nhưng bị tạo nhiều bản
**Gặp khi:** khai `providers: [MyService]` ở component hoặc lazy module.
**Nguyên nhân:** provider ở component/lazy tạo instance riêng theo scope.
**Cách xử:** muốn dùng chung toàn app → `providedIn: 'root'`, bỏ khỏi `providers` của component.

### 8. Circular dependency giữa hai service
**Triệu chứng:** `Cannot instantiate cyclic dependency!`.
**Cách xử:** tách phần dùng chung ra service thứ ba; hoặc dùng `Injector`/`forwardRef` để hoãn resolve.

### 9. `StaticInjectorError` sau khi thêm service dùng service khác
**Nguyên nhân:** thiếu import module cung cấp dependency (vd RouterModule, một thư viện module).
**Cách xử:** đọc token trong lỗi, thêm đúng module vào `imports`.

### 10. Component nhận nhầm instance service
**Gặp khi:** vừa `providedIn:'root'` vừa để trong `providers` component → hai bản.
**Cách xử:** thống nhất một nơi khai báo; state dùng chung phải cùng một instance (root).

## 3. HTTP & tích hợp API

### 11. CORS bị chặn khi dev
**Triệu chứng:** `blocked by CORS policy: No 'Access-Control-Allow-Origin'`.
**Cách xử (dev):** `proxy.conf.json` `{ "/api": { "target": "http://localhost:3000", "secure": false } }` + `ng serve --proxy-config proxy.conf.json`, gọi `/api/...`. Production sửa CORS ở server.
*Nguồn: [samjulien.com](https://www.samjulien.com/proxy-angular-cli-cors/), [Syncfusion](https://www.syncfusion.com/blogs/post/resolve-cors-errors-angular-proxy)*

### 12. Gọi `http.get` mà không thấy request nào
**Nguyên nhân:** Observable *cold* — không `subscribe` thì không chạy.
**Cách xử:** `.subscribe(...)` hoặc dùng `| async` trong template.

### 13. Vòng lặp 401 vô hạn khi refresh token
**Gặp khi:** interceptor bắt 401 gọi refresh, nhưng refresh cũng 401 → lặp.
**Cách xử:** đánh dấu request refresh để bỏ qua interceptor; dùng cờ `isRefreshing` + `filter` chờ token mới.

### 14. Đọc file/blob nhưng nhận `[object Object]`
**Nguyên nhân:** mặc định `responseType: 'json'`.
**Cách xử:** `this.http.get(url, { responseType: 'blob' })` (hoặc `'text'`).

### 15. Interceptor không chạy
**Nguyên nhân:** quên đăng ký, hoặc thiếu `multi: true`, hoặc đăng ký sai module (lazy).
**Cách xử:** `{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }` ở AppModule; nhớ thứ tự interceptor theo thứ tự khai báo.

## 4. Forms & validation

### 16. `ExpressionChanged` khi patch form trong `ngAfterViewInit`
**Cách xử:** patch giá trị form ở `ngOnInit` thay vì sau khi view dựng.

### 17. `valueChanges` chạy cả khi mình `setValue` bằng code
**Cách xử:** `control.setValue(v, { emitEvent: false })` khi cập nhật trình tự, tránh vòng lặp.

### 18. Warning trộn `[(ngModel)]` với Reactive Form
**Triệu chứng:** cảnh báo "It looks like you're using ngModel on the same form field as formControlName".
**Cách xử:** chọn một cách; trong reactive form chỉ dùng `formControlName`.

### 19. Nhập sai nhưng không hiện lỗi
**Nguyên nhân:** điều kiện hiện lỗi chưa xét `touched`/`dirty`.
**Cách xử:** `*ngIf="ctrl.invalid && (ctrl.dirty || ctrl.touched)"`; sau submit thì `form.markAllAsTouched()`.

### 20. Thêm/xoá field động không được
**Cách xử:** dùng `FormArray` + `push(new FormControl())` / `removeAt(i)`; template lặp `*ngFor` trên `formArrayName`.

## 5. Routing & lazy load

### 21. Refresh trang con → 404 sau khi deploy
**Nguyên nhân:** server không biết route SPA, tìm file thật không có.
**Cách xử:** cấu hình server fallback về `index.html` (Nginx `try_files $uri /index.html`).

### 22. Đổi trang nhưng không cuộn lên đầu
**Cách xử:** `RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })`.

### 23. Guard trả `Observable` nhưng vẫn vào được
**Nguyên nhân:** trả Observable chưa hoàn tất/chưa map ra boolean.
**Cách xử:** đảm bảo Observable phát `true/false` và complete; dùng `map(...)`.

### 24. Mất query param khi điều hướng
**Cách xử:** `this.router.navigate([...], { queryParamsHandling: 'merge' })`.

### 25. Lazy module không tải
**Nguyên nhân:** sai đường dẫn/tên trong `loadChildren`.
**Cách xử:** kiểm `import('./x/x.module').then(m => m.XModule)` khớp tên class; kiểm module có `RouterModule.forChild`.

## 6. CSS/layout & responsive

### 26. `z-index` không có tác dụng
**Nguyên nhân:** phần tử chưa có `position` (relative/absolute/fixed) hoặc bị stacking context cha chặn.
**Cách xử:** thêm `position: relative` + `z-index`; kiểm cha có `transform/opacity` tạo context riêng.

### 27. Item flex tràn ra ngoài / không co
**Nguyên nhân:** flex item mặc định `min-width: auto` không co nhỏ hơn nội dung.
**Cách xử:** đặt `min-width: 0` (hoặc `overflow: hidden`) cho item để text `ellipsis` hoạt động.

### 28. `100vh` bị nhảy trên mobile
**Nguyên nhân:** thanh địa chỉ trình duyệt di động làm `100vh` không khớp vùng thấy.
**Cách xử:** dùng `100dvh` (dynamic viewport) hoặc biến JS `--vh`.

### 29. `position: sticky` không dính
**Nguyên nhân:** thiếu ngưỡng (`top`), hoặc tổ tiên có `overflow: hidden/auto`.
**Cách xử:** đặt `top: 0`; bỏ `overflow` ở tổ tiên gần nhất.

### 30. CSS không ăn vào component con
**Nguyên nhân:** Angular ViewEncapsulation giới hạn style theo component.
**Cách xử:** style ở đúng component; nếu buộc xuyên qua, cân nhắc `::ng-deep` (đã deprecated — hạn chế) hoặc biến CSS toàn cục.

## 7. TypeScript & build

### 31. `Property 'x' does not exist on type`
**Cách xử:** khai interface/type cho dữ liệu; ép kiểu response `http.get<User[]>()`.

### 32. `Object is possibly 'null'`
**Nguyên nhân:** strict mode bật.
**Cách xử:** optional chaining `a?.b`, nullish `?? default`, hoặc guard `if (a) {...}`.

### 33. `Cannot find module '@app/...'`
**Nguyên nhân:** path alias chưa cấu hình.
**Cách xử:** thêm `paths` trong `tsconfig.json` (`"@app/*": ["src/app/*"]`).

### 34. Build production lỗi mà `ng serve` thì không
**Nguyên nhân:** production dùng AOT + strict template, bắt lỗi mà JIT dev bỏ qua.
**Cách xử:** chạy `ng build --configuration production` sớm/trong CI; sửa lỗi kiểu trong template.

### 35. `Type 'X' is not assignable to type 'Y'`
**Cách xử:** đọc kỹ union/generic; đừng lạm dụng `any` — dùng `unknown` + thu hẹp kiểu, hoặc sửa type nguồn.

## 8. Hiệu năng

### 36. `*ngFor` danh sách lớn giật
**Cách xử:** thêm `trackBy`; danh sách rất lớn dùng CDK Virtual Scroll (`cdk-virtual-scroll-viewport`).
*Nguồn: Angular CDK docs.*

### 37. Change detection chạy quá nhiều
**Cách xử:** `ChangeDetectionStrategy.OnPush` + `async` pipe; tránh binding hàm nặng trong template.

### 38. Bundle phình to
**Cách xử:** lazy load feature module; phân tích bằng `source-map-explorer dist/**/*.js`; tránh import cả thư viện khi chỉ cần một hàm.

### 39. Ảnh làm chậm tải trang (LCP kém)
**Cách xử:** `loading="lazy"`, nén/đúng kích thước, dùng `srcset`; ưu tiên tải ảnh above-the-fold.

### 40. Hàm trong template chạy mỗi lần CD
**Gặp khi:** `{{ format(item) }}` gọi hàm — chạy lại mỗi change detection.
**Cách xử:** chuyển sang **pure pipe** (chỉ tính lại khi input đổi) hoặc tính sẵn.

## 9. Trình duyệt & môi trường

### 41. Máy khác kéo về chạy lỗi lạ
**Cách xử:** xoá `node_modules` + `package-lock.json` rồi `npm ci`; đảm bảo cùng Node version (`.nvmrc`).

### 42. Chạy Chrome ổn, Safari lỗi
**Gặp khi:** parse ngày `new Date('2024-01-01 10:00')` (Safari không chấp nhận dạng có dấu cách).
**Cách xử:** dùng ISO `2024-01-01T10:00:00`; test trên Safari thật.

### 43. `localStorage` ném lỗi ở chế độ riêng tư
**Cách xử:** bọc `try/catch` khi đọc/ghi; có phương án dự phòng trong bộ nhớ.

### 44. Deploy xong người dùng vẫn thấy bản cũ
**Nguyên nhân:** trình duyệt cache file cũ.
**Cách xử:** Angular build production đã hash tên file; cấu hình `Cache-Control` để `index.html` không cache, còn file hash cache dài.

### 45. Production gọi nhầm API localhost
**Nguyên nhân:** hardcode URL, không dùng environment.
**Cách xử:** đọc URL từ `environment.ts`/`environment.prod.ts` (file replacement) hoặc config runtime; build với `--configuration production`.

## 10. Git & quy trình

### 46. Conflict trong `package-lock.json`
**Cách xử:** đừng sửa tay; lấy một bên rồi `npm install` để regenerate, commit lại.

### 47. Lỡ commit file `.env` / secret
**Cách xử:** **đổi ngay secret** (coi như đã lộ); gỡ khỏi lịch sử (`git filter-repo`/BFG); thêm vào `.gitignore`.

### 48. Rơi vào "detached HEAD"
**Nguyên nhân:** checkout thẳng vào một commit thay vì branch.
**Cách xử:** `git switch -c ten-branch` để giữ việc, hoặc `git switch main` để quay lại.

### 49. Lỡ reset/kéo mất commit
**Cách xử:** `git reflog` tìm commit cũ → `git reset --hard <sha>` hoặc `git cherry-pick` lấy lại.

### 50. Force push đè mất việc người khác
**Cách xử:** dùng `git push --force-with-lease` (chỉ đè nếu remote chưa đổi từ lần fetch cuối); phối hợp trước khi rebase nhánh chung.
