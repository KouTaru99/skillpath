# Thư viện quản lý State (Redux/NgRx/NgXS/Akita)

**Định nghĩa.** Khi một state (giỏ hàng, thông tin đăng nhập, bộ lọc) cần hiển thị/đồng bộ ở **nhiều component không liên quan trực tiếp** (header, trang chi tiết, trang thanh toán), truyền qua `@Input`/`@Output` từng tầng ("prop drilling") trở nên rối và dễ lệch. **Thư viện quản lý State** (Redux cho React; **NgRx**, NgXS, Akita cho Angular) giải quyết bằng một **store tập trung, chỉ đọc từ bên ngoài**: mọi thay đổi phải đi qua một **action** (mô tả "chuyện gì xảy ra"), một **reducer** tính state mới (hàm thuần, không side-effect), và side-effect (gọi API) tách riêng ở **effect**. Component chỉ **đọc** qua **selector** và **phát action**, không tự sửa state.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu vì sao cần store tập trung, đọc được luồng action → reducer → selector đã có sẵn trong dự án, dùng store đúng cách (phát action, đọc qua selector) mà không tự ý sửa state trực tiếp.

**Ví dụ thực tế — badge giỏ hàng đồng bộ ở khắp nơi (NgRx).**

Action mô tả sự kiện, không mô tả cách xử lý:
```typescript
export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ productId: string; qty: number }>(),
  },
});
```

Reducer — hàm thuần, nhận state cũ + action, trả state mới:
```typescript
export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { productId, qty }) => ({
    ...state,
    items: [...state.items, { productId, qty }],
  })),
);
```

Selector — nơi DUY NHẤT component được đọc state ra:
```typescript
export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
);
```

Component chỉ phát action và đọc selector — không tự sửa state:
```typescript
@Component({ selector: 'app-cart-badge', template: `<span>{{ count$ | async }}</span>` })
export class CartBadgeComponent {
  count$ = this.store.select(selectCartCount);   // header đọc từ đây
  constructor(private store: Store) {}
}

// ở trang sản phẩm, khi bấm "Thêm vào giỏ":
this.store.dispatch(CartActions.addItem({ productId: 'A1', qty: 1 }));
// badge ở header tự cập nhật — không cần header và trang sản phẩm biết về nhau
```

**Vì sao là mức ①:** bạn dùng đúng store đã có sẵn trong dự án (phát action, đọc selector), chưa tự thiết kế store mới hay xử lý state phức tạp có side-effect (effect) — đó là việc của các mốc sau.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** tự thiết kế store cho một module mới, và xử lý **side-effect** (gọi API) đúng chỗ bằng **effect** thay vì gọi thẳng trong component.

**Ví dụ thực tế — effect gọi API khi action được phát, tách khỏi component hoàn toàn.**
```typescript
@Injectable()
export class CartEffects {
  addItem$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.addItem),
    mergeMap(({ productId, qty }) => this.api.addToCart(productId, qty).pipe(
      map((cart) => CartActions.addItemSuccess({ cart })),
      catchError((err) => of(CartActions.addItemFailure({ error: err.message }))),
    )),
  ));
  constructor(private actions$: Actions, private api: CartApi) {}
}
```
Component chỉ `dispatch(CartActions.addItem(...))` — không biết và không cần biết có gọi API hay không, effect lo hết phần side-effect + lỗi.

**Vì sao là mức ②:** bạn tự thiết kế được luồng state có side-effect cho một module, không chỉ dùng store người khác đã dựng sẵn.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** đặt ra **chuẩn tổ chức store cho cả ứng dụng lớn** (nhiều module, nhiều team cùng đóng góp state), không chỉ một module đơn lẻ.

**Ví dụ thực tế — chia store theo "feature state" thay vì một store khổng lồ dùng chung.**
```typescript
// ❌ một root reducer khổng lồ, mọi team đều sửa vào cùng 1 file → xung đột merge liên tục
// ✅ mỗi feature module tự đăng ký state của mình (lazy-loaded)
@NgModule({
  imports: [StoreModule.forFeature('orders', ordersReducer)],   // team Orders tự quản state của mình
})
export class OrdersModule {}
```
Mỗi team quản lý phần state của module mình, chỉ những gì thật sự dùng chung (thông tin đăng nhập, giỏ hàng) mới đặt ở root store — giảm xung đột khi nhiều người cùng sửa store, và state của module nào chỉ tải khi module đó được tải (đỡ nặng ứng dụng ban đầu).

**Vì sao là mức ③:** bạn đặt được chuẩn tổ chức state ở quy mô nhiều team cùng làm, không chỉ tự thiết kế tốt cho phần việc của mình.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác Senior·V3:** đặt ra **hướng dẫn lựa chọn công cụ quản lý State cho toàn đơn vị** (không chỉ tổ chức tốt trong một app) — khi nào bắt buộc dùng NgRx, khi nào service đơn giản là đủ.

**Ví dụ thực tế — hướng dẫn chọn công cụ, áp dụng cho mọi dự án mới của đơn vị.**
```
Hướng dẫn chọn state management (áp dụng khi khởi tạo dự án mới):

- State đơn giản, ít luồng phụ thuộc chéo (< 3 màn hình chia sẻ state)
  → Service + BehaviorSubject. KHÔNG bắt buộc NgRx — tránh boilerplate thừa.

- State phức tạp, nhiều team cùng đóng góp, cần time-travel debug khi lỗi khó tái hiện
  → NgRx bắt buộc, theo chuẩn "feature state" đã thiết lập.

- Ngoại lệ: nếu team dưới 3 người và dự án dự kiến < 6 tháng → luôn chọn phương án đơn giản
  trước, dù state có phức tạp, vì chi phí học NgRx không đáng cho dự án ngắn hạn.
```
Bạn không áp một công cụ "chuẩn" cho mọi dự án — mà đặt ra **tiêu chí quyết định** để mọi team tự áp dụng đúng theo bối cảnh của họ, giảm việc mỗi dự án mới lại tranh cãi lại từ đầu.

**Vì sao là mức ④:** bạn đặt ra được chuẩn quyết định công nghệ ở tầm **toàn đơn vị**, không chỉ tổ chức tốt trong phạm vi một ứng dụng.
