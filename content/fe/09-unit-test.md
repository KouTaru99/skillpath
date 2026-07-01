# Unit Test

**Định nghĩa.** **Unit test** là bài kiểm thử tự động cho từng *đơn vị* nhỏ (một hàm, một service, một component) — chạy độc lập, nhanh, khẳng định "đầu vào X thì đầu ra phải Y". Mục đích: bắt lỗi sớm, cho phép sửa/refactor mà không sợ vỡ ngầm, làm tài liệu sống. Mẫu **AAA** (Arrange – Act – Assert). Angular đi kèm **Jasmine** (viết test) + **Karma** (chạy) + **TestBed** (dựng môi trường test cho component/service).

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết test cho hàm thuần/pipe/service đơn giản theo hướng dẫn, biết chạy và đọc kết quả pass/fail.

**Ví dụ thực tế — test một pipe.**
```typescript
describe('VndPipe', () => {
  const pipe = new VndPipe();
  it('định dạng số thành tiền VND', () => {
    expect(pipe.transform(1250000)).toBe('1.250.000₫');   // Arrange+Act+Assert
  });
  it('xử lý số 0', () => {
    expect(pipe.transform(0)).toBe('0₫');                  // ca biên
  });
});
```
Bạn chọn vài ca tiêu biểu (giá trị thường + biên) thay vì test bừa.

**Vì sao là mức ①:** viết được test cơ bản theo mẫu, chưa test tương tác/bất đồng bộ.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** thiết kế code **để test được**, test component có tương tác và HTTP, dùng **mock** đúng chỗ, quan tâm độ phủ ý nghĩa (không chạy theo % máy móc).

**Ví dụ 1 — test service gọi HTTP bằng `HttpTestingController` (không đụng mạng thật).**
```typescript
it('getAll gọi đúng endpoint và trả danh sách', () => {
  const http = TestBed.inject(HttpTestingController);
  let result: User[] | undefined;
  service.getAll().subscribe(r => (result = r));

  const req = http.expectOne('/api/users');
  expect(req.request.method).toBe('GET');
  req.flush([{ id: 1, name: 'An' }]);        // giả lập response

  expect(result?.length).toBe(1);
  http.verify();                              // chắc chắn không có request thừa
});
```

**Ví dụ 2 — test component: hiển thị loading rồi ra dữ liệu (mock service).**
```typescript
it('hiện danh sách sau khi tải xong', () => {
  const svc = jasmine.createSpyObj('NotificationService', ['getAll']);
  svc.getAll.and.returnValue(of([{ id: 1, title: 'A', read: false }]));
  // ... cấu hình TestBed với { provide: NotificationService, useValue: svc }
  fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('A');
});

it('hiện lỗi khi API thất bại', () => {
  svc.getAll.and.returnValue(throwError(() => new Error('500')));
  fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('Không tải được');
});
```
Bạn test cả nhánh lỗi — vì đó là chỗ hay vỡ nhất; và tách logic ra hàm/service thuần để dễ test thay vì nhồi hết vào component.

**Vì sao là mức ②:** dùng test như công cụ thật để giữ chất lượng, không chỉ viết cho có.
