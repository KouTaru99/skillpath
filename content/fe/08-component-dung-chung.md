# Component dùng chung (đóng gói & tái sử dụng)

**Định nghĩa.** Component dùng chung là khối UI/logic được **đóng gói để tái sử dụng** nhiều nơi: nút, ô nhập, modal, bảng, hoặc directive/pipe. Mục tiêu **DRY** (Don't Repeat Yourself): viết một lần, dùng nhiều chỗ, sửa một chỗ là cập nhật toàn bộ. Làm tốt thì cả dự án đồng nhất; làm ẩu thì component "dùng chung" đầy ngoại lệ, khó dùng hơn tự viết. Ví dụ theo Angular.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tách khối lặp lại thành component nhận `@Input`, đặt API (tên input) rõ ràng.

**Ví dụ thực tế — nút dùng chung.**
```typescript
@Component({
  selector: 'app-button',
  template: `
    <button [class]="'btn btn--' + variant" [disabled]="loading">
      <app-spinner *ngIf="loading" size="16"></app-spinner>
      <ng-content *ngIf="!loading"></ng-content>
    </button>`,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'danger' = 'primary';   // ràng buộc giá trị, tránh truyền bừa
  @Input() loading = false;
}
// Dùng: <app-button variant="danger" [loading]="deleting">Xoá</app-button>
```
`<ng-content>` cho phép nhét nội dung tuỳ ý vào (content projection).

**Vì sao là mức ①:** tách được component tái dùng đơn giản, chưa lường hết tình huống dùng.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** component **linh hoạt mà nhất quán** — API hợp lý, mặc định tốt, kiểm soát kiểu (TypeScript), a11y, tránh "input bùng nổ".

**Ví dụ 1 — Modal tái dùng đúng cách (Esc để đóng, role dialog).**
```typescript
@Component({ selector: 'app-modal', template: `
  <div class="overlay" (click)="close.emit()">
    <div class="modal" role="dialog" [attr.aria-label]="title" (click)="$event.stopPropagation()">
      <h2>{{ title }}</h2>
      <ng-content></ng-content>
    </div>
  </div>` })
export class ModalComponent {
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @HostListener('document:keydown.escape') onEsc() { this.close.emit(); }
}
```

**Ví dụ 2 — directive dùng chung (highlight khi hover).** Không phải cái gì cũng là component — logic gắn vào phần tử thì dùng directive:
```typescript
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostBinding('style.background') bg = '';
  @HostListener('mouseenter') on() { this.bg = '#fff3bf'; }
  @HostListener('mouseleave') off() { this.bg = ''; }
}
```

**Vì sao là mức ②:** component bền, hợp đồng rõ, người khác dùng không cần đọc mã nguồn.

## ▸ Ex·V3 — ③ Thành thạo
**Khác V2:** xây **bộ component cấp dự án/công ty** — nhất quán Design System, có tài liệu/demo, cân nhắc đánh đổi linh hoạt vs đơn giản.

**Ví dụ 1 — bảng dữ liệu tái dùng với template tuỳ biến cột (ng-template + context).**
```typescript
@Component({ selector: 'app-table', template: `
  <tr *ngFor="let row of rows">
    <td *ngFor="let col of columns">
      <ng-container *ngTemplateOutlet="col.cell || default; context: { $implicit: row }">
      </ng-container>
    </td>
  </tr>` })
export class TableComponent { @Input() rows; @Input() columns; }
// Người dùng tự định nghĩa cách render từng cột → bảng linh hoạt mà không cần 20 input
```

**Ví dụ 2 — pipe dùng chung (định dạng tiền VND).**
```typescript
@Pipe({ name: 'vnd' })
export class VndPipe implements PipeTransform {
  transform(value: number): string { return value.toLocaleString('vi-VN') + '₫'; }
}
// {{ order.total | vnd }} → "1.250.000₫"
```

**Ví dụ 3 — đóng gói thành shared module + tài liệu sống.** Gom vào `SharedModule`, viết demo (Storybook) làm tài liệu, đặt quy ước versioning để team khác nâng cấp an toàn.

**Vì sao là mức ③:** tạo nền tảng dùng chung cho nhiều người, không chỉ cho dự án của mình.
