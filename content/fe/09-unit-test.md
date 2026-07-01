# Unit Test

**Định nghĩa.** **Unit test** là các bài kiểm thử tự động cho từng *đơn vị* nhỏ của code (một hàm, một component) — chạy độc lập, nhanh, khẳng định "với đầu vào X thì đầu ra phải là Y". Mục đích: bắt lỗi sớm, cho phép sửa/refactor mà không sợ vỡ ngầm, và làm tài liệu sống về ý đồ của code. Mẫu phổ biến là **AAA** (Arrange – Act – Assert: chuẩn bị – thực thi – khẳng định). Ở FE thường dùng Jest/Vitest + Testing Library.

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu unit test là gì và viết được test cho hàm thuần/component đơn giản theo hướng dẫn, biết chạy và đọc kết quả pass/fail.

**Ví dụ thực tế — test một hàm thuần.** Hàm tính giá sau giảm:
```js
export function finalPrice(price, discountPercent) {
  return Math.round(price * (1 - discountPercent / 100));
}
```
Test theo AAA:
```js
import { finalPrice } from './price';

test('giảm 20% của 100000 còn 80000', () => {
  // Arrange + Act
  const result = finalPrice(100000, 20);
  // Assert
  expect(result).toBe(80000);
});

test('giảm 0% giữ nguyên giá', () => {
  expect(finalPrice(50000, 0)).toBe(50000);
});
```
Bạn biết chọn vài ca tiêu biểu (giá trị thường + biên) thay vì test bừa.

**Vì sao là mức ①:** viết được test cơ bản theo mẫu, nhưng chưa test logic phức tạp hay tương tác.

## ▸ Ex·V3 — ② Biết làm
**Khác V2:** thiết kế code **để test được**, viết test cho component có tương tác và bất đồng bộ, dùng **mock** đúng chỗ, và quan tâm độ phủ ý nghĩa (không chạy theo % một cách máy móc).

**Ví dụ thực tế — test component có gọi API (mock).** Component hiện danh sách lấy từ API; bạn mock fetch để test không phụ thuộc mạng:
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

test('hiển thị danh sách user sau khi tải xong', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, name: 'An' }, { id: 2, name: 'Bình' }],
  });

  render(<UserList />);

  expect(screen.getByText(/đang tải/i)).toBeInTheDocument();   // trạng thái loading
  await waitFor(() => expect(screen.getByText('An')).toBeInTheDocument());
  expect(screen.getByText('Bình')).toBeInTheDocument();
});

test('hiện lỗi khi API thất bại', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
  render(<UserList />);
  await waitFor(() => expect(screen.getByText(/không tải được/i)).toBeInTheDocument());
});
```
Bạn test cả nhánh thành công lẫn nhánh lỗi — vì lỗi thường là chỗ hay vỡ nhất. Bạn cũng tách logic ra hàm thuần để dễ test, thay vì nhồi hết vào component.

**Vì sao là mức ②:** bạn dùng test như công cụ thật để giữ chất lượng, không chỉ viết cho có.
