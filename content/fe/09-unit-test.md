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

## ▸ Senior·V1 — ③ Thành thạo
**Khác Ex·V3:** không chỉ tự viết test tốt mà **đặt chuẩn test cho cả team** — gate coverage có ý nghĩa trong CI, test cả logic bất đồng bộ phức tạp (effect quản lý state), viết checklist review cho người khác theo.

**Ví dụ 1 — test một NgRx effect (bất đồng bộ + side-effect thật khó test nếu không có kỷ luật).**
```typescript
it('loadOrders effect gọi API và dispatch success', () => {
  actions$ = of(OrdersActions.load());
  apiService.getOrders.and.returnValue(of([{ id: 1 }]));

  effects.loadOrders$.subscribe((action) => {
    expect(action).toEqual(OrdersActions.loadSuccess({ orders: [{ id: 1 }] }));
  });
});
```

**Ví dụ 2 — coverage gate có ý nghĩa trong CI (không chạy theo % máy móc).**
```yaml
# ci: chặn merge nếu coverage TỤT so với trước, không ép 100%
- run: npm run test:coverage
- run: |
    if (( $(coverage_now) < $(coverage_baseline) )); then
      echo "Coverage giảm — chặn merge"; exit 1
    fi
```
Chặn *tụt* thay vì ép một con số cứng — tránh tình trạng đội viết test rỗng (`expect(true).toBe(true)`) chỉ để đạt %.

**Ví dụ 3 — checklist review test cho junior (rút từ lỗi hay gặp).**
```
[ ] Có test nhánh lỗi, không chỉ happy path?
[ ] Mock đúng biên (HTTP/service), không mock cả logic đang muốn kiểm?
[ ] Test có fail đúng lý do khi cố tình phá code không (mutation-check bằng tay)?
```

**Vì sao là mức ③:** bạn làm chủ cả phần khó test (async/state) và nâng chất lượng test của cả đội, không chỉ của riêng mình.

## ▸ Senior·V3 — ④ Chuyên sâu
**Khác Senior·V1:** đặt ra **chiến lược test cho cả dự án** — quyết định tỷ lệ unit/integration/e2e hợp lý (test pyramid), không chỉ viết test tốt cho từng phần.

**Ví dụ thực tế — chẩn một dự án "test nhiều nhưng vẫn hay vỡ ở production".** Dự án có 500 unit test nhưng chỉ test từng hàm riêng lẻ với mock — không có test nào kiểm tra 2-3 phần ghép lại với nhau. Bug thật thường xảy ra ở **ranh giới ghép nối** (component gọi service thật, service gọi API thật) mà unit test kèm mock không bắt được. Bạn đề xuất cơ cấu lại theo **test pyramid**:
```
       /\
      /e2e\        ít (5%) — vài luồng quan trọng nhất (đăng nhập, thanh toán)
     /------\
    /integr. \     vừa (25%) — ghép component thật + service thật (mock chỉ ở biên ngoài, vd API)
   /----------\
  /  unit test \   nhiều (70%) — hàm/logic thuần, chạy nhanh
 /--------------\
```
Không phải viết THÊM test bừa bãi, mà **đổi loại test** — thêm một lớp integration test mỏng để bắt đúng lớp bug đang lọt.

**Vì sao là mức ④:** bạn thiết kế được chiến lược test ở tầm dự án, biết loại test nào bắt đúng loại bug nào — không chỉ viết test nhiều mà viết đúng chỗ.
