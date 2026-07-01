# RESTful API (tích hợp Back-end)

**Định nghĩa.** **API** là "hợp đồng" để hai phần mềm nói chuyện. **REST** là phong cách thiết kế API qua HTTP: mỗi *tài nguyên* có URL, thao tác bằng **method** (`GET` đọc, `POST` tạo, `PUT/PATCH` sửa, `DELETE` xoá) + **status code** chuẩn (2xx ok, 4xx lỗi client, 5xx lỗi server). Trang này cho thấy **cả hai đầu**: Angular gọi API (`HttpClient`) và phía server trả gì (**Java/Spring Boot**) — để hiểu đúng hợp đồng.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu method/URL/status code, gọi CRUD cơ bản bằng `HttpClient`, đọc kết quả, xử lý nhánh thành công/lỗi.

**Ví dụ thực tế — CRUD một tài nguyên (Angular).**
```typescript
this.http.get<User[]>('/api/users');                          // GET 200
this.http.post<User>('/api/users', { name, email });          // POST 201
this.http.delete<void>(`/api/users/${id}`);                   // DELETE 204
```
Phía server (Spring Boot) — để hiểu 201/204 từ đâu ra:
```java
@PostMapping("/api/users")
public ResponseEntity<User> create(@RequestBody UserDto dto) {
  User saved = service.create(dto);
  return ResponseEntity.status(HttpStatus.CREATED).body(saved);   // 201
}
```

**Vì sao là mức ①:** gọi đúng và đọc kết quả, chưa xử lý lỗi/đồng bộ bài bản.

## ▸ Ex·V2 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** Xử lý **đầy đủ vòng đời request** — phân loại lỗi theo status, gửi token, phân trang/lọc qua query param, đồng bộ UI với kết quả.

**Ví dụ 1 — gọi API có xác thực + phân trang + phân loại lỗi (Angular).**
```typescript
getOrders(page = 1, status?: string): Observable<Page<Order>> {
  let params = new HttpParams().set('page', page);
  if (status) params = params.set('status', status);
  return this.http.get<Page<Order>>('/api/orders', { params }).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) { this.auth.logout(); }
      if (e.status === 403) return throwError('Không có quyền');
      return throwError('Lỗi máy chủ, thử lại sau');
    }),
  );
}
```

**Ví dụ 2 — server phân trang (Spring) để FE hiểu shape trả về.**
```java
@GetMapping("/api/orders")
public Page<Order> list(@RequestParam(defaultValue = "1") int page,
                        @RequestParam(required = false) String status) {
  return service.find(status, PageRequest.of(page - 1, 20));   // { content, totalElements, ... }
}
```

**Vì sao là mức ②:** tích hợp API đúng bài, chủ động với lỗi và xác thực.

## ▸ Ex·V3 — ② Biết làm (mở rộng phạm vi)
**Khác V2:** ở **quy mô tích hợp nhiều API** — gọi song song, gộp/biến đổi dữ liệu, chống race, đặt lớp API dùng chung.

**Ví dụ 1 — dashboard gọi nhiều API song song (`forkJoin`).**
```typescript
forkJoin({
  summary: this.http.get<Summary>('/api/summary'),
  chart:   this.http.get<Chart>('/api/chart'),
  alerts:  this.http.get<Alert[]>('/api/alerts'),
}).subscribe(({ summary, chart, alerts }) => this.render(summary, chart, alerts));
// nhanh hơn nhiều so với gọi tuần tự chờ nhau
```

**Ví dụ 2 — retry có backoff cho lỗi mạng chập chờn.**
```typescript
this.http.get('/api/report').pipe(
  retry({ count: 3, delay: (_, i) => timer(500 * 2 ** i) }),   // thử lại 3 lần, giãn dần
);
```

**Ví dụ 3 — chống N+1 ở tầng API (đối thoại với backend).** Màn hiện 50 đơn rồi lặp 50 lần gọi `/users/{id}` lấy tên khách → 51 request. Bạn đề xuất backend cho `GET /orders?expand=customer` hoặc `GET /users?ids=1,2,3` để lấy lô một lần.

**Vì sao vẫn là ②:** tích hợp vững ở quy mô thật, chưa tới mức thiết kế chuẩn giao tiếp cấp hệ thống.
