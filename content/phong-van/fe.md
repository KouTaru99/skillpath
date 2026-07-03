# Lab phỏng vấn — Dev Front-end

> Đây không phải đề cương ôn tập — là **kịch bản thoại thật** của các buổi phỏng vấn, viết theo đúng vùng năng lực bạn đang ở. Từ Entry đến Experienced·V2, mỗi vùng mô phỏng **1 buổi phỏng vấn trọn vẹn** (đúng nhịp thật: làm quen → kỹ thuật → case thực chiến → hành vi → bạn hỏi ngược). Từ Experienced·V3 trở lên, một buổi phỏng vấn thật thường **tách thành nhiều vòng riêng** (loop phỏng vấn) — nên mỗi vùng có 3 lab, mỗi lab mô phỏng đúng 1 vòng: **kỹ thuật sâu**, **case thiết kế**, **hành vi & lãnh đạo**.

---

## Entry

### Lab — Phỏng vấn thực tập sinh / fresher

**Bối cảnh:** phỏng vấn vị trí thực tập sinh/fresher Front-end tại một công ty outsource cỡ nhỏ. Hình thức online, 30 phút. Người phỏng vấn: **chị Thảo**, dev FE 2 năm kinh nghiệm, phỏng vấn ứng viên **Nam** — sinh viên mới ra trường.

**Thảo:** Chào Nam, chị Thảo đây. Mình nói chuyện khoảng 30 phút thôi, thoải mái nhé. Em giới thiệu nhanh về đồ án/dự án gần nhất em làm được không?

**Nam:** Dạ chào chị. Em làm đồ án tốt nghiệp là một trang quản lý thư viện, dùng HTML/CSS/JavaScript thuần, có gọi API do bạn em làm backend.

**Thảo:** Ok. Giả sử em cần làm một danh sách sách hiển thị dạng lưới, co giãn được theo màn hình máy tính và điện thoại, em làm bằng cách nào?

**Nam:** Dạ em dùng CSS Grid hoặc Flexbox ạ, với Grid thì em set `grid-template-columns` rồi dùng media query để đổi số cột theo kích thước màn hình.

**Thảo:** Được. Vậy nếu chị yêu cầu thêm: khi màn hình nhỏ hơn 600px thì chuyển sang 1 cột, em viết đoạn CSS đó như thế nào?

**Nam:** Dạ, em viết:
```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
}
```

**Thảo:** Tốt. Chuyển sang câu khác — em có biết Angular không? Nếu chưa làm dự án thật thì học qua chưa?

**Nam:** Dạ em có học qua ở trường một chút ạ, em biết là mình khai báo component bằng decorator `@Component`, binding dữ liệu ra template bằng `{{ }}`, và bắt sự kiện bằng `(click)="..."`.

**Thảo:** Đúng rồi. Vậy `{{ }}` với `[property]="..."` khác nhau chỗ nào, em có biết không?

**Nam:** [suy nghĩ] Dạ... em nghĩ `{{ }}` là để hiển thị text ra ngoài, còn `[property]` là gán giá trị vào một thuộc tính của thẻ HTML hoặc component con, đúng không ạ?

**Thảo:** Đúng ý rồi, diễn đạt vậy là ổn. Giờ chị hỏi một câu về lập trình hướng đối tượng — em hiểu "kế thừa" (inheritance) nghĩa là gì?

**Nam:** Dạ là một class có thể dùng lại thuộc tính và phương thức của class cha, mà không cần viết lại, ạ. Ví dụ class `Dog` kế thừa từ class `Animal` thì `Dog` tự có phương thức `eat()` của `Animal` luôn.

**Thảo:** Chuẩn. Giờ mình làm một bài nhỏ nhé, chị share màn hình.

[Thảo chia sẻ đoạn code]

```javascript
function getTotalPrice(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}
```

**Thảo:** Đoạn này tính tổng giá tiền của danh sách sản phẩm, nhưng đang chạy bị lỗi `NaN`. Em xem giúp chị vì sao nhé.

**Nam:** [đọc một lúc] Dạ, em thấy điều kiện vòng lặp là `i <= items.length`, nhưng mảng thì chỉ số chạy từ `0` đến `items.length - 1` thôi ạ. Nên khi `i = items.length`, `items[i]` sẽ là `undefined`, và `undefined.price` sẽ lỗi hoặc ra `NaN`.

**Thảo:** Đúng rồi, vậy sửa thế nào?

**Nam:** Dạ đổi thành `i < items.length` ạ.

**Thảo:** Tốt. Nếu là thực tế, em có cách nào kiểm tra xem code mình vừa sửa chạy đúng chưa, ngoài cách chạy thử bằng mắt không?

**Nam:** Dạ em nghĩ có thể `console.log` giá trị `total` ra để xem, hoặc dùng debugger của trình duyệt để đặt breakpoint xem từng bước ạ. Em nghe nói còn có unit test nữa nhưng em chưa được học kỹ.

**Thảo:** Không sao, biết hướng vậy là được với vị trí fresher rồi. Hai câu cuối nhé — em có biết Scrum hay Agile là gì không?

**Nam:** Dạ em học sơ qua, em hiểu là thay vì làm xong hết cả dự án rồi mới cho khách xem, mình chia nhỏ ra làm từng đợt ngắn (sprint), làm xong một phần thì cho xem và điều chỉnh luôn, đỡ bị sai hướng quá xa.

**Thảo:** Ừ, đúng ý chính rồi. Cuối cùng, kể chị nghe một lần em tự học thêm một thứ gì đó ngoài chương trình ở trường.

**Nam:** Dạ, hồi làm đồ án em thấy code CSS của em bị lặp lại rất nhiều giữa các trang, em có lên mạng tìm hiểu và tự học Sass để viết biến và có thể tái sử dụng style, mất khoảng 2 tối để làm quen rồi áp dụng lại vào đồ án.

**Thảo:** Tốt đó. Cảm ơn Nam, em có câu gì muốn hỏi chị không?

**Nam:** Dạ, nếu được nhận thì bên mình có ai hướng dẫn trực tiếp cho thực tập sinh không ạ?

**Thảo:** Có, mỗi bạn intern sẽ có 1 anh/chị mentor kèm riêng. Cảm ơn em, hẹn phản hồi sớm nhé.

**Góc nhìn người chấm:** ở Entry, interviewer không kỳ vọng trả lời hoàn hảo — tín hiệu quan trọng nhất là (1) **diễn đạt được lý do**, không chỉ đúng/sai, (2) **biết giới hạn của mình** (Nam thành thật nói "em chưa được học kỹ" thay vì bịa), (3) có **tinh thần tự học** cụ thể (ví dụ Sass, không chỉ nói chung chung "em thích học hỏi").

---

## Experienced · Vùng 1

### Lab — Phỏng vấn Dev Front-end, tuyển chính thức sau thời gian thử việc/thực tập

**Bối cảnh:** ứng viên **Trang** đã có khoảng 6-9 tháng kinh nghiệm, phỏng vấn vào vị trí chính thức tại một công ty sản phẩm. Người phỏng vấn: **anh Đức**, Dev FE lâu năm trong team. Online, 45 phút.

**Đức:** Chào Trang, anh Đức đây. Em kể sơ về công việc 6 tháng vừa rồi được không?

**Trang:** Dạ em làm ở một startup nhỏ, chủ yếu code UI theo thiết kế Figma, có gọi API, dùng Angular.

**Đức:** Ok. Câu đầu tiên — em từng làm màn hình nào cần chú ý tới UX không, ví dụ như trạng thái loading, trạng thái lỗi?

**Trang:** Dạ có ạ, em làm màn danh sách đơn hàng, lúc tải dữ liệu em có hiện skeleton loading thay vì để trắng trơn, và nếu API lỗi thì hiện thông báo kèm nút "Thử lại".

**Đức:** Tốt, vậy quyết định "hiện skeleton thay vì spinner" là do em tự nghĩ ra hay theo yêu cầu thiết kế?

**Trang:** Dạ ban đầu thiết kế chỉ ghi "loading" chung chung, em chủ động đề xuất dùng skeleton vì em thấy nó đỡ giật hơn khi nội dung tải xong.

**Đức:** Ok, chủ động vậy là tốt. Chuyển qua RESTful API — em gọi API bằng cách nào trong Angular, và biết những HTTP method nào?

**Trang:** Dạ em dùng `HttpClient`, các method em hay dùng là `GET` để lấy dữ liệu, `POST` để tạo mới, `PUT` để cập nhật toàn bộ, và `DELETE` để xoá. Em cũng biết `PATCH` nhưng ít dùng hơn.

**Đức:** `PUT` với `PATCH` khác nhau thế nào?

**Trang:** [ngập ngừng] Dạ... em nhớ là `PUT` thì cập nhật toàn bộ resource, còn `PATCH` là chỉ cập nhật một phần thôi ạ, nhưng thực tế em ít khi được dùng `PATCH` nên không chắc lắm.

**Đức:** Không sao, hiểu đúng ý chính là được. Giờ nói tới component dùng chung — em có bao giờ tự làm một component tái sử dụng chưa, ví dụ một cái button hay modal dùng ở nhiều chỗ?

**Trang:** Dạ em có làm một component `AppButton` dùng chung, cho phép truyền vào `loading` để tự hiện spinner khi đang xử lý, với `variant` để đổi màu primary/danger.

**Đức:** Được, vậy giờ mình làm một bài nhỏ. Anh share màn hình nhé.

[Đức mở một component]

```typescript
@Component({
  selector: 'app-price-tag',
  template: `<span>{{ price }} đ</span>`,
})
export class PriceTagComponent {
  @Input() price: number;
}
```

**Đức:** Component này hiện giá tiền, nhưng đang hiện số thô kiểu "1500000 đ" thay vì "1.500.000 đ". Em sửa được không?

**Trang:** Dạ được ạ, em dùng pipe `number` có sẵn của Angular.
```html
<span>{{ price | number }} đ</span>
```

**Đức:** Ừ, đúng hướng. Còn nếu muốn hiện luôn ký hiệu tiền tệ VND chuẩn, có cách nào gọn hơn không?

**Trang:** Dạ Angular có pipe `currency` ạ, mình có thể set `{{ price | currency:'VND' }}`, nhưng em nhớ mặc định nó ra hơi khác định dạng Việt Nam một chút, chắc phải tuỳ chỉnh thêm.

**Đức:** Đúng, em nói đúng luôn — mặc định `currency:'VND'` ra `₫1,500,000.00` chứ không đẹp như mình muốn, nên nhiều team tự viết pipe riêng. Ok, chuyển sang câu hành vi. Kể anh nghe một lần em nhận feedback không hài lòng về code hoặc UI em làm.

**Trang:** Dạ, có lần em làm xong một màn hình, lúc review thì tech lead nói là em đặt tên biến/hàm chưa rõ nghĩa, ví dụ em đặt `data1`, `data2`. Lúc đầu em hơi chột dạ nhưng anh ấy giải thích là code người khác đọc phải hiểu ngay không cần hỏi lại. Em sửa lại theo tên có nghĩa hơn như `orderList`, `orderTotal`, và từ đó em có thói quen đặt tên kỹ hơn ngay từ lúc viết, không để "sửa sau".

**Đức:** Tốt. Cuối cùng, em có câu gì hỏi anh không?

**Trang:** Dạ, bên mình review code có theo checklist cụ thể nào không hay tuỳ người review ạ?

**Đức:** Có checklist chung, nhưng mỗi reviewer vẫn có góc nhìn riêng thêm vào. Cảm ơn Trang nhé.

**Góc nhìn người chấm:** Trang thể hiện đúng tầm Ex·V1 — biết dùng công cụ (pipe, HttpClient) và **thành thật khi không chắc** (PATCH) thay vì đoán liều; đặc biệt có tín hiệu tốt về việc **chủ động cải thiện UX** dù thiết kế không yêu cầu, và biết tiếp nhận feedback để đổi thói quen chứ không chỉ sửa một lần cho qua chuyện.

---

## Experienced · Vùng 2

### Lab — Phỏng vấn thăng cấp lên Experienced

**Bối cảnh:** ứng viên **Mai** đang ở vùng Experienced·V2 (~1.5–2 năm kinh nghiệm Angular), phỏng vấn tại một công ty sản phẩm cỡ vừa. Online, 55 phút. Người phỏng vấn: **anh Huy**, Tech Lead. Chưa có vòng system design (thực tế vòng này chỉ bắt đầu rõ từ Senior).

**Huy:** Chào Mai, anh Huy đây, Tech Lead của team Platform bên anh. Hôm nay mình nói chuyện khoảng 55 phút thôi, không căng thẳng đâu, cứ coi như trao đổi công việc bình thường nhé. Mai giới thiệu nhanh cho anh dự án gần nhất em đang làm được không?

**Mai:** Dạ vâng ạ. Em đang làm ở một sản phẩm quản lý đơn hàng, dùng Angular, team em khoảng 6 người. Em phụ trách chính mảng thông báo và một số component dùng chung cho cả 3 module trong app.

**Huy:** Ok, "component dùng chung cho 3 module" — nghe hay đấy, lát nữa mình quay lại chỗ này. Giờ anh hỏi vài câu kỹ thuật trước nhé.

Câu đầu tiên: component của em đang gọi API, giữa chừng user thao tác thì server trả về lỗi 401. Em xử lý thế nào?

**Mai:** Dạ, 401 là do token hết hạn đúng không ạ? Em sẽ bắt lỗi đó và hiện thông báo cho user biết là phiên đăng nhập đã hết hạn, yêu cầu đăng nhập lại ạ.

**Huy:** Ừ, đúng hướng. Nhưng nếu cứ mỗi lần 401 là bung thông báo ngay, user đang nhập dở một cái form dài thì sao?

**Mai:** À... [dừng lại suy nghĩ] Thì dữ liệu form sẽ mất ạ, vì mình điều hướng sang trang login luôn.

**Huy:** Đúng vậy. Vậy có cách nào tốt hơn không?

**Mai:** Dạ có thể trước khi bung lỗi ra, mình thử refresh token trước xem có lấy được token mới không. Nếu refresh cũng fail thì mới thật sự bung ra cho user đăng nhập lại.

**Huy:** Chính xác. Vậy trong Angular, chỗ nào là nơi hợp lý để làm việc "thử refresh trước khi bung lỗi" đó, mà không phải sửa từng chỗ gọi API?

**Mai:** Dạ, `HttpInterceptor` ạ. Mình bắt response lỗi ở tầng interceptor, nếu là 401 thì gọi API refresh token, xong rồi replay lại request cũ.

**Huy:** Tốt. Còn phân biệt 401 với 403 thì sao, xử lý có giống nhau không?

**Mai:** Dạ khác ạ. 401 là chưa xác thực hoặc hết hạn, còn 403 là đã xác thực rồi nhưng không đủ quyền — cái này refresh token cũng không giải quyết được, phải báo luôn cho user là không có quyền.

**Huy:** Ok, rõ ràng. Chuyển sang câu khác — bên anh gần đây có viết test nhiều hơn cho phần service gọi API. Em có hay viết unit test cho mấy chỗ gọi HTTP không?

**Mai:** Dạ em cũng có viết, nhưng em thấy hơi bối rối chỗ là — nếu viết test mà lại gọi API thật thì test sẽ chậm và phụ thuộc mạng đúng không ạ?

**Huy:** Đúng, nên thường thì sao?

**Mai:** Dạ mình sẽ giả lập, em nhớ Angular có cái gì đó tên là... `HttpTestingController` thì phải ạ. Nó cho phép mình chặn request lại và tự trả về response giả, không cần đụng tới mạng thật.

**Huy:** Chuẩn luôn. Em phân biệt được giữa test kiểu này với test tích hợp (integration test) không?

**Mai:** Dạ, em hiểu là unit test thì mock hết mọi thứ xung quanh, chỉ test đúng logic của mình thôi. Còn integration test thì để nhiều phần thật chạy chung với nhau hơn, gần với thực tế hơn nhưng cũng chậm hơn.

**Huy:** Được. Anh nghe nói team em sắp tách một phần dashboard ra chạy độc lập, kiểu microfrontend — em hiểu khái niệm đó là gì không?

**Mai:** Dạ em mới nghe qua thôi ạ, chưa làm thật bao giờ. Em hiểu đại khái là thay vì cả app là một khối, mình tách ra thành nhiều app nhỏ độc lập, mỗi team tự làm tự deploy phần của mình, rồi ghép lại cho người dùng thấy như một trang duy nhất.

**Huy:** Ừ, ý tưởng cơ bản vậy là đủ rồi, ở mức của em chưa cần biết sâu công cụ làm việc đó. Em có biết công nghệ nào hay dùng để làm chuyện ghép đó không, dù chỉ là nghe tên thôi?

**Mai:** Dạ em từng nghe tên Module Federation của Webpack ạ, nhưng em chưa đọc kỹ.

**Huy:** Ok không sao, biết tên là được rồi. Giờ mình làm một bài thực hành nhỏ nhé, anh share màn hình.

[Huy chia sẻ màn hình, mở một component có sẵn trong codebase mẫu]

**Huy:** Đây là component `NotificationBadge`, đang dùng chung ở 3 màn hình. Bug report là: khi số lượng thông báo về 0, cái badge đáng lẽ phải ẩn đi thì lại không ẩn. Em xem code rồi tìm giúp anh chỗ sai nhé.

```typescript
@Component({
  selector: 'app-notification-badge',
  template: `<span class="badge" *ngIf="count">{{ count }}</span>`,
})
export class NotificationBadgeComponent {
  @Input() count: number = 0;
}
```

**Mai:** [đọc code một lúc] Dạ anh ơi, cho em hỏi — bug này là badge KHÔNG ẩn khi count về 0, đúng không ạ? Vì em nhìn `*ngIf="count"` thì thấy khi `count = 0`, JavaScript coi 0 là falsy, nên `*ngIf` phải ẩn nó đi mới đúng chứ ạ. Có khi nào bug thật sự nằm ở chỗ khác, ví dụ nơi gọi component này đang không truyền đúng giá trị `count`?

**Huy:** Câu hỏi tốt. Đúng là em cần làm rõ trước khi sửa. Giả sử anh xác nhận với em là: đúng, giá trị `count` được truyền vào đúng là `0`, nhưng cái span vẫn hiện ra trên UI thật.

**Mai:** Dạ vậy thì... với `*ngIf="count"` mà count = 0 thì đúng ra Angular phải ẩn mới đúng logic ạ, nên nếu vẫn hiện thì em nghi là có chỗ khác đang override, hoặc là bản build cũ chưa cập nhật, hoặc... à, hay là input đang nhận string "0" chứ không phải number 0? Vì chuỗi "0" thì lại là truthy trong JavaScript.

**Huy:** Đúng rồi đó! Chính là chỗ đó — component cha đang truyền `[count]="orderCount"` nhưng `orderCount` lại được lấy ra từ một API trả về kiểu string. Vậy giờ em sửa thế nào?

**Mai:** Dạ em sẽ không dựa vào tính truthy/falsy của JavaScript nữa cho chắc ăn, mà so sánh tường minh luôn.

```typescript
template: `<span class="badge" *ngIf="count > 0">{{ count }}</span>`,
```

Nhưng như vậy thì nếu input vẫn lỡ nhận string "0", `"0" > 0` vẫn ra `false` đúng không ạ, em nghĩ vậy là an toàn hơn.

**Huy:** Tốt, cách nghĩ đó ổn. Giờ viết cho anh một test để lỗi này không tái diễn được không?

**Mai:** Dạ được ạ.

```typescript
it('ẩn badge khi count = 0', () => {
  fixture.componentInstance.count = 0;
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.badge')).toBeNull();
});
```

Em nghĩ nên viết thêm một test nữa cho trường hợp count là chuỗi "0" luôn, vì đó chính là nguyên nhân thật của bug.

**Huy:** Anh thích điểm đó — em test đúng cái vừa gây lỗi thật, chứ không chỉ test cho có. Ok, mình chuyển sang phần cuối, anh hỏi hai câu không thuộc chuyên môn code.

Kể cho anh nghe một lần em phát hiện ra bug do chính mình gây ra, sau khi code đã lên production rồi ấy.

**Mai:** Dạ có ạ. Cách đây khoảng 2 tháng em có sửa một chỗ format tiền tệ, em test trên máy thấy ổn nên merge. Hai ngày sau bên support báo là có khách hàng thấy số tiền hiển thị sai ở một màn hình khác mà em không để ý là nó dùng chung hàm format đó.

Em vào xem log lỗi thì không thấy exception gì cả, vì đây là lỗi hiển thị sai chứ không phải crash. Em phải hỏi lại bên support xem cụ thể số nào bị sai, rồi so sánh với dữ liệu gốc mới tìm ra là em đã đổi cách làm tròn số nhưng quên là màn hình kia cần giữ nguyên 2 số thập phân.

Em sửa lại, và lần này em có viết thêm test cho cả 2 màn hình cùng dùng chung hàm đó, chứ không chỉ test chỗ em đang sửa. Sau vụ đó em cũng rút kinh nghiệm là trước khi sửa một hàm dùng chung, phải chủ động tìm hết những chỗ đang gọi tới nó, chứ không chỉ tin vào chỗ mình đang nhìn thấy trước mắt.

**Huy:** Cảm ơn Mai, câu trả lời rõ ràng. Câu cuối — kể một lần em phải tự học một công nghệ hoặc thư viện mới để hoàn thành task đúng hạn.

**Mai:** Dạ, hồi đầu năm em được giao viết export dữ liệu ra file Excel, mà trước giờ em chưa làm bao giờ. Em có 3 ngày để làm xong.

Em đọc thử tài liệu chính thức của thư viện `xlsx` trước, làm theo ví dụ cơ bản của họ chạy thử được luôn trong buổi sáng. Đến chiều em gặp vấn đề là dữ liệu tiếng Việt có dấu bị lỗi font khi mở bằng Excel, em tra trong phần Issues trên GitHub của thư viện thì thấy có người gặp y hệt, họ nói phải thêm BOM (byte order mark) vào đầu file.

Em thử áp dụng thì hết lỗi. Em không hỏi đồng nghiệp ngay từ đầu vì thấy đây là lỗi khá cụ thể có thể tự tra được, nhưng nếu sau nửa ngày mà vẫn bí thì chắc em sẽ hỏi anh trưởng nhóm.

**Huy:** Ổn. Giờ tới lượt em hỏi anh, có câu gì muốn hỏi không?

**Mai:** Dạ em muốn hỏi, team mình quy định coverage test tối thiểu là bao nhiêu ạ, hay là chấm theo mức độ ý nghĩa của test hơn là theo phần trăm?

**Huy:** Bên anh không ép theo % cứng, chủ yếu nhìn vào việc coverage không được tụt so với trước khi merge, và ưu tiên test đúng chỗ hay lỗi. Còn gì nữa không?

**Mai:** Dạ, component dùng chung như cái badge lúc nãy, khi nhiều team cùng dùng thì team mình quản lý version của nó thế nào ạ, để tránh một team sửa mà làm vỡ chỗ khác?

**Huy:** Câu hỏi tốt, để anh trả lời chi tiết hơn ở buổi tiếp theo nếu em qua vòng này nhé. Cảm ơn Mai, hẹn gặp lại.

**Góc nhìn người chấm:** tín hiệu quan trọng nhất của cả buổi là Mai **hỏi lại để làm rõ bug trước khi sửa** thay vì đoán bừa, và **viết test đúng nguyên nhân gốc** chứ không chỉ test cho có. Với 2 kỹ năng mới của vùng này (Unit test, Microfrontends), Mai trả lời đúng mức ① kỳ vọng — không cố tỏ ra biết nhiều hơn thật, đây cũng là một tín hiệu tốt (biết lượng sức mình).

---

## Experienced · Vùng 3

> Đỉnh của Experienced — vẫn CHƯA có vòng system design (kỹ năng "Phân tích & thiết kế hệ thống" chỉ xuất hiện từ Senior). Ứng viên **Khoa** (~3 năm kinh nghiệm) phỏng vấn xác nhận lên vùng cao nhất Experienced tại một công ty sản phẩm. Người phỏng vấn: **chị Yến**, Senior Dev FE. Buổi phỏng vấn thật tách thành 3 vòng riêng, cách nhau vài ngày — dưới đây là kịch bản của cả 3 vòng.

### Lab 1 — Vòng kỹ thuật sâu (~25 phút)

**Yến:** Chào Khoa, chị Yến đây. Vòng này mình đi sâu kỹ thuật thôi nhé, khoảng 25 phút. Em cho chị hỏi trước — app của em có bị tình trạng giật/lag khi danh sách dài không?

**Khoa:** Dạ có ạ, bên em có một màn hình hiển thị danh sách giao dịch, lúc nhiều hơn 500 dòng thì cuộn hơi giật.

**Yến:** Em xử lý bằng cách nào?

**Khoa:** Dạ em dùng CDK Virtual Scroll của Angular, chỉ render những dòng đang nằm trong viewport thôi, chứ không render hết 500 dòng ra DOM cùng lúc.

**Yến:** Tốt. Ngoài chuyện DOM, em có biết `ChangeDetectionStrategy.OnPush` giúp gì trong trường hợp danh sách dài không?

**Khoa:** Dạ có, mặc định Angular sẽ chạy change detection cho toàn bộ cây component mỗi khi có sự kiện, kể cả khi dữ liệu component đó không đổi. Với `OnPush`, Angular chỉ chạy lại khi tham chiếu của `@Input` thay đổi, nên với danh sách dài mà mỗi dòng là 1 component riêng, dùng `OnPush` sẽ giảm được rất nhiều lượt kiểm tra thừa.

**Yến:** Chuẩn. Vậy nếu em dùng `OnPush` mà lại `push()` trực tiếp vào mảng đang bind, chuyện gì xảy ra?

**Khoa:** Dạ view sẽ không cập nhật, vì tham chiếu mảng không đổi. Phải tạo mảng mới, ví dụ `this.items = [...this.items, newItem]`.

**Yến:** Ok, giờ hỏi về RxJS — em từng dùng `switchMap` chưa, và biết khác `mergeMap` ở chỗ nào không?

**Khoa:** Dạ có ạ. `switchMap` là mỗi khi có giá trị mới từ nguồn, nó huỷ luồng con cũ đang chạy dở rồi mới chạy luồng mới — hợp cho ô tìm kiếm, gõ nhanh thì chỉ kết quả của lần gõ cuối là được nhận. Còn `mergeMap` thì cho các luồng con chạy song song hết, không huỷ luồng nào cả, hợp khi mình cần xử lý tất cả các request chứ không quan tâm thứ tự.

**Yến:** Tốt. Câu cuối vòng này — bên em build và deploy FE như thế nào, có qua CI/CD không?

**Khoa:** Dạ có ạ, tụi em dùng GitLab CI, mỗi khi merge vào nhánh main thì tự động chạy lint, chạy test, build ra thư mục static rồi đóng gói vào một image Docker dùng Nginx để serve, cuối cùng deploy lên server.

**Yến:** Vì sao lại cần Docker cho một app chỉ toàn file tĩnh (HTML/CSS/JS), không phải chỉ cần copy file lên server là được?

**Khoa:** Dạ em nghĩ là để môi trường chạy nhất quán giữa các máy — dù build ở máy CI nào, cấu hình Nginx và cách serve cũng y hệt nhau, không phụ thuộc server đích đã cài sẵn gì. Với lại triển khai lại hay rollback cũng dễ hơn vì chỉ cần đổi version image.

**Yến:** Được, cảm ơn Khoa, hẹn vòng sau.

### Lab 2 — Vòng case thiết kế (~30 phút)

**Yến:** Chào Khoa, vòng này mình làm 1 case thiết kế nhỏ nhé, không phải thiết kế cả hệ thống đâu, ở tầm module thôi. Đề bài: bên chị có tính năng giỏ hàng, hiện đang hiển thị ở 2 chỗ — icon giỏ hàng trên header (hiện số lượng) và trang chi tiết giỏ hàng (hiện danh sách + tổng tiền). Hai chỗ này hiện đang tự gọi API riêng, có lúc bị lệch số liệu. Em thiết kế lại thế nào?

**Khoa:** Dạ, đầu tiên là em sẽ không để 2 component tự gọi API riêng nữa, mà tạo ra một service dùng chung, ví dụ `CartService`, quản lý state giỏ hàng ở một chỗ duy nhất bằng `BehaviorSubject`. Cả icon header và trang chi tiết đều subscribe vào cùng một stream đó qua `async` pipe, nên khi state đổi thì cả hai tự động cập nhật đồng bộ.

**Yến:** Ok, vậy khi user bấm "thêm vào giỏ" ở một trang sản phẩm khác, luồng chạy như thế nào?

**Khoa:** Dạ, trang sản phẩm gọi `cartService.addItem(item)`, hàm này gọi API thêm vào giỏ, khi có response thành công thì cập nhật lại `BehaviorSubject` bằng dữ liệu mới nhất, không phải chỉ cộng thêm ở phía client — vì em muốn tổng tiền/số lượng luôn khớp với server, tránh trường hợp áp dụng khuyến mãi ở server làm lệch số.

**Yến:** Tốt, vậy em có tách `CartService` này ra dùng chung được cho microfrontend nếu sau này team quyết định tách phần giỏ hàng ra chạy độc lập không?

**Khoa:** Dạ em nghĩ về mặt ý tưởng thì service này độc lập với UI nên tách được, nhưng em cũng biết là khi tách thành microfrontend thật thì phải tính thêm việc chia sẻ state đó *giữa* các app độc lập, không chỉ trong 1 app nữa — cái đó em chưa làm thực tế nên chắc cần tìm hiểu thêm khi tới lúc.

**Yến:** Câu trả lời thành thật, tốt. Còn về việc test, em test `CartService` như thế nào?

**Khoa:** Dạ em sẽ mock `HttpClient` để giả lập response API, rồi test các trường hợp: thêm item thành công thì `BehaviorSubject` phát ra giá trị đúng, thêm item lỗi thì state cũ không bị đổi, và test cả trường hợp 2 nơi cùng subscribe có nhận được cùng 1 giá trị mới không.

**Yến:** Được, case này ổn. Hẹn vòng cuối.

### Lab 3 — Vòng hành vi (~20 phút)

**Yến:** Chào Khoa, vòng cuối rồi, mình nói chuyện nhẹ nhàng thôi. Kể chị nghe một lần em có bất đồng ý kiến kỹ thuật với đồng nghiệp, và em xử lý thế nào.

**Khoa:** Dạ có một lần em và một bạn cùng team tranh luận về việc nên dùng NgRx hay chỉ cần service + BehaviorSubject cho một module không quá phức tạp. Bạn kia muốn dùng NgRx cho "chuẩn", còn em thấy module đó chỉ có vài state đơn giản, dùng NgRx sẽ làm code dài dòng không cần thiết.

Tụi em không cãi nhau suông mà cùng liệt kê ra: module này có bao nhiêu state, có cần time-travel debug hay share state phức tạp giữa nhiều nơi không. Sau khi liệt kê thì thấy module đó thật sự đơn giản, cả hai đồng ý dùng service trước, và thống nhất là nếu sau này module phình to thêm state phức tạp thì sẽ refactor sang NgRx lúc đó.

**Yến:** Tốt, cách quyết định dựa trên tiêu chí cụ thể thay vì ai nói to hơn. Câu tiếp — kể một lần em phải làm việc dưới áp lực deadline gấp.

**Khoa:** Dạ, có lần sát ngày demo cho khách thì phát hiện một luồng thanh toán bị lỗi ở một trường hợp hiếm (áp dụng 2 mã giảm giá cùng lúc). Em còn khoảng 4 tiếng trước buổi demo.

Em không cố gắng sửa tổng thể logic áp dụng mã giảm giá ngay, vì rủi ro vỡ thêm chỗ khác. Em khoanh vùng lại đúng điều kiện gây lỗi, vá tạm bằng cách chặn không cho áp 2 mã cùng lúc ở phía UI (kèm thông báo rõ ràng cho user), đồng thời báo ngay cho PM biết đây là giải pháp tạm để không hứa nhầm với khách. Sau demo em mới quay lại sửa gốc rễ logic đó cho đúng.

**Yến:** Quyết định vá tạm có kiểm soát và báo minh bạch — tốt. Câu cuối, em có từng chủ động đề xuất cải tiến quy trình làm việc của team không?

**Khoa:** Dạ có ạ, team em trước đây hay bị trường hợp merge code xong mới phát hiện xung đột với thay đổi của người khác. Em đề xuất thêm bước là trước khi tạo merge request, mỗi người phải rebase lên nhánh main mới nhất và tự chạy lại test ở máy mình, thay vì để CI phát hiện xung đột rồi mới sửa. Sau khi áp dụng, số lần phải sửa xung đột muộn giảm hẳn.

**Yến:** Cảm ơn Khoa, vậy là xong cả 3 vòng. Bên chị sẽ tổng hợp và phản hồi trong tuần này.

**Góc nhìn người chấm (cả 3 vòng):** Khoa thể hiện đúng tầm "đỉnh Experienced" — hiểu sâu cơ chế bên dưới (change detection, RxJS operator) chứ không chỉ biết dùng; ở case thiết kế, biết **giới hạn của giải pháp mình đưa ra** (thành thật nói chưa có kinh nghiệm thực tế với microfrontend) thay vì vẽ ra một giải pháp hoàn hảo giả tạo; ở vòng hành vi, các quyết định (vá tạm có kiểm soát, tranh luận dựa trên tiêu chí) đều **có chủ đích và minh bạch**, đây chính là điều phân biệt Ex·V3 với Ex·V1/V2 — không chỉ làm được việc mà còn ý thức được đánh đổi của quyết định mình đưa ra.

---

## Senior · Vùng 1

> Bắt đầu vùng Senior — lần đầu xuất hiện 2 nhóm kỹ năng hoàn toàn mới: **Kiến trúc & thiết kế giải pháp** và **Quản lý & lãnh đạo kỹ thuật**, cả hai đều ở mức ① (mới đảm nhận). Ứng viên **Linh** (~4 năm kinh nghiệm) phỏng vấn lên Senior tại một công ty sản phẩm. Người phỏng vấn: **anh Quân**, Engineering Manager. 3 vòng riêng.

### Lab 1 — Vòng kỹ thuật sâu

**Quân:** Chào Linh, anh Quân đây. Vòng này mình đi kỹ thuật khoảng 25 phút nhé. Bên em có dùng thư viện quản lý state kiểu NgRx/Redux chưa?

**Linh:** Dạ em mới bắt đầu học và áp dụng thử ở 1 module nhỏ thôi ạ, chưa dùng ở quy mô lớn.

**Quân:** Không sao, em hiểu vì sao module đó cần NgRx mà không chỉ dùng service + BehaviorSubject như trước không?

**Linh:** Dạ, module đó có nhiều component ở xa nhau trong cây component cùng cần đọc và sửa chung 1 state phức tạp, với luồng cập nhật qua nhiều bước (gọi API, rồi tính toán lại, rồi đồng bộ ngược). Em thấy nếu chỉ dùng service thì rất khó truy vết ai đã đổi state lúc nào, còn NgRx bắt buộc mọi thay đổi đi qua action → reducer nên dễ debug bằng Redux DevTools hơn.

**Quân:** Tốt. Em có review code cho ai chưa, hay mới toàn được người khác review?

**Linh:** Dạ em có review vài merge request nhỏ của bạn cùng team gần đây ạ, nhưng em cũng mới bắt đầu, chưa có kinh nghiệm nhiều.

**Quân:** Ừ, ở vùng này chị/anh không kỳ vọng em thành thạo review ngay. Em thường chú ý gì nhất khi review?

**Linh:** Dạ em ưu tiên xem logic có đúng không, có test kèm theo không, và tên biến/hàm có rõ nghĩa không — em chưa dám góp ý sâu về kiến trúc vì em thấy mình chưa đủ kinh nghiệm để chắc chắn.

**Quân:** Câu trả lời thành thật, tốt. Cuối vòng — em từng viết test cho một NgRx effect (side-effect bất đồng bộ) chưa?

**Linh:** Dạ em có thử, em `dispatch` một action giả, mock service trả về dữ liệu giả, rồi kiểm tra effect có dispatch đúng action success không. Em thấy hơi rối lúc đầu vì effect là stream, nhưng làm quen dần thì ổn.

**Quân:** Được, cảm ơn Linh.

### Lab 2 — Vòng case thiết kế

**Quân:** Vòng này mình bàn 1 case thiết kế nhỏ, đúng tầm mới-bắt-đầu-làm-kiến-trúc thôi nhé. Team em sắp làm 1 module hoàn toàn mới: "Quản lý phiếu bảo hành". Em sẽ tổ chức code (thư mục, luồng dữ liệu) cho module này thế nào?

**Linh:** Dạ, em sẽ tách theo tính năng thay vì theo loại file — nghĩa là một thư mục `warranty/` gồm cả component, service, model của riêng module đó, chứ không gom hết component vào 1 thư mục `components/` chung. Về luồng dữ liệu, em định dùng service + BehaviorSubject trước vì module mới chưa biết độ phức tạp thật sự, nếu sau này thấy cần thì mới chuyển sang NgRx.

**Quân:** Vì sao không dùng NgRx ngay từ đầu cho "chuẩn"?

**Linh:** Dạ em nghĩ dùng NgRx ngay khi chưa rõ độ phức tạp sẽ làm chậm tốc độ phát triển ban đầu không cần thiết — thêm boilerplate cho những state đơn giản. Em muốn bắt đầu đơn giản rồi refactor khi có tín hiệu thật sự cần.

**Quân:** Anh đồng ý với hướng đó. Còn nếu module này cần chia sẻ 1 phần dữ liệu (ví dụ danh sách khách hàng) với module khác đã có sẵn, em sẽ làm sao để tránh gọi API trùng lặp?

**Linh:** Dạ em sẽ tạo 1 service dùng chung ở tầng cao hơn (`shared/` hoặc `core/`), cache lại kết quả gọi API khách hàng đó, để cả 2 module cùng dùng chung 1 service thay vì mỗi module tự gọi.

**Quân:** Tốt, hướng đi hợp lý cho mức bắt đầu này.

### Lab 3 — Vòng hành vi & lãnh đạo

**Quân:** Vòng cuối. Kể anh nghe lần đầu em phân task cho một bạn khác trong team.

**Linh:** Dạ, gần đây em được giao chia nhỏ 1 tính năng cho em và 1 bạn mới vào team cùng làm. Em có xem trước năng lực bạn đó (bạn giỏi CSS/UI hơn) nên em giao phần UI/style, còn em nhận phần logic gọi API phức tạp hơn. Em cũng note rõ ràng trong ticket để bạn không bị mơ hồ về yêu cầu.

**Quân:** Tốt, biết cân theo năng lực người nhận việc. Còn việc mentor thì sao, em từng hướng dẫn ai chưa?

**Linh:** Dạ em mới chỉ giúp trả lời câu hỏi khi bạn junior hỏi trực tiếp, chưa chủ động đứng ra kèm cặp bài bản. Em nghĩ đây là điều em cần học thêm khi lên Senior.

**Quân:** Nhận thức vậy là đúng hướng rồi. Cảm ơn Linh.

**Góc nhìn người chấm (Senior·V1):** ở vùng khởi đầu Senior, tín hiệu quan trọng nhất KHÔNG phải là "đã giỏi kiến trúc/lãnh đạo" mà là **nhận thức đúng ranh giới năng lực hiện tại** (Linh thẳng thắn nói "chưa đủ kinh nghiệm để chắc chắn" khi review code, "chưa chủ động mentor bài bản") — đây chính là dấu hiệu sẵn sàng học, khác với ứng viên cố tỏ ra đã vững kiến trúc dù chưa có kinh nghiệm thật.

---

## Senior · Vùng 2

> Đã có vài tháng ở vai trò Senior. Ứng viên **Đạt** phỏng vấn chuyển công ty ở vùng Senior·V2. Người phỏng vấn: **chị Ngọc**, Engineering Manager.

### Lab 1 — Vòng kỹ thuật sâu

**Ngọc:** Chào Đạt, chị Ngọc đây. Em từng gặp vấn đề hiệu năng nghiêm trọng nào chưa, mức độ phải điều tra sâu ấy?

**Đạt:** Dạ có ạ, có lần trang chủ load chậm hẳn sau một bản deploy. Em dùng Chrome DevTools tab Performance để ghi lại, thấy có 1 hàm tính toán chạy trên main thread mất gần 800ms, block luôn việc render.

**Ngọc:** Em xử lý thế nào?

**Đạt:** Dạ hàm đó là xử lý và sắp xếp một mảng dữ liệu lớn ở phía client. Em chuyển phần tính toán đó sang Web Worker để không chặn main thread, và về sau đề xuất chuyển việc sắp xếp/lọc đó xuống server luôn vì dữ liệu càng lớn thì client càng không nên gánh.

**Ngọc:** Tốt, biết dùng đúng công cụ đo trước khi đoán. Em có kinh nghiệm nào về testing NgRx effect phức tạp hơn, ví dụ có nhiều action phụ thuộc nhau không?

**Đạt:** Dạ có, em test bằng cách dùng `hot`/marble testing của RxJS để mô phỏng thời điểm các action xảy ra, đảm bảo effect xử lý đúng thứ tự dù các luồng bất đồng bộ khác nhau.

**Ngọc:** Ổn. Em từng phải giúp debug 1 vấn đề khó ở tầng microfrontend host-remote chưa?

**Đạt:** Dạ có, có lần app remote load được nhưng bị lỗi style vỡ do 2 app dùng version Angular Material khác nhau, CSS đè lên nhau. Em phải cô lập CSS bằng cách thêm prefix riêng cho từng remote.

**Ngọc:** Đúng vấn đề thường gặp của microfrontend. Cảm ơn Đạt.

### Lab 2 — Vòng case thiết kế

**Ngọc:** Case này lớn hơn chút. Team đang có 1 module cũ viết theo kiểu "một component to ôm hết logic", giờ cần refactor để dễ mở rộng. Em thiết kế lại thế nào, và em phản biện gì nếu team muốn viết lại từ đầu (rewrite) thay vì refactor dần?

**Đạt:** Dạ em sẽ không đề xuất viết lại từ đầu, vì rủi ro cao — mất thời gian dài không ra tính năng mới, dễ phát sinh bug mới ở chỗ tưởng đã chạy ổn. Em sẽ refactor dần theo hướng "strangler" — tách từng phần nhỏ logic ra service/component con, có test bao quanh trước khi tách, làm tới đâu chắc tới đó, giữ app luôn chạy được trong suốt quá trình.

**Ngọc:** Nếu sếp vẫn muốn viết lại vì "code cũ quá xấu", em phản biện thế nào?

**Đạt:** Dạ em sẽ đưa ra dữ liệu cụ thể thay vì cãi cảm tính — ví dụ chi phí thời gian ước tính của rewrite so với refactor dần, và rủi ro về việc dừng phát triển tính năng mới trong lúc rewrite. Em cũng sẽ đề xuất thử refactor 1 phần nhỏ trước làm bằng chứng, nếu hiệu quả thì team sẽ tự tin hơn với hướng refactor dần thay vì cần rewrite toàn bộ.

**Ngọc:** Tốt, phản biện dựa trên rủi ro cụ thể chứ không chỉ nói suông. Em có dùng sơ đồ gì để trình bày thiết kế lại module đó cho cả team hiểu không?

**Đạt:** Dạ em vẽ một sơ đồ UML đơn giản kiểu component diagram, thể hiện các component/service mới sẽ tách ra và quan hệ gọi nhau, để cả team dễ hình dung trước khi bắt tay code.

### Lab 3 — Vòng hành vi & lãnh đạo

**Ngọc:** Kể chị nghe một lần em mentor một bạn đang gặp khó khăn, và bạn đó vẫn chưa tiến bộ như em mong đợi.

**Đạt:** Dạ có một bạn junior trong team hay viết code chạy được nhưng không để ý coding convention và ít viết test. Em đã ngồi review kỹ và giải thích lý do 2-3 lần đầu, nhưng bạn vẫn lặp lại. Em nhận ra ngồi giải thích miệng không hiệu quả bằng việc cho bạn tự đọc code convention document của team và làm 1 bài tập nhỏ có sẵn checklist để tự chấm trước khi gửi review. Sau đó bạn tiến bộ rõ rệt hơn.

**Ngọc:** Tốt, biết điều chỉnh cách mentor khi cách cũ chưa hiệu quả. Em từng tổ chức 1 buổi seminar chia sẻ công nghệ chưa?

**Đạt:** Dạ em có tổ chức 1 buổi chia sẻ về Web Worker cho cả team sau vụ tối ưu hiệu năng lúc nãy, chuẩn bị slide có ví dụ thực tế từ chính bug đó luôn, mọi người phản hồi dễ hiểu hơn là chỉ đọc tài liệu suông.

**Ngọc:** Cảm ơn Đạt, hẹn gặp lại.

**Góc nhìn người chấm (Senior·V2):** Đạt cho thấy sự trưởng thành rõ so với V1 — biết **phản biện có dữ liệu** thay vì chỉ nêu ý kiến (rewrite vs refactor), và biết **điều chỉnh phương pháp mentor** khi cách cũ không hiệu quả thay vì lặp lại y hệt. Đây là tín hiệu phân biệt quan trọng: Senior không chỉ "biết nhiều hơn" mà biết **thích ứng cách truyền đạt** cho từng người.

---

## Senior · Vùng 3

> Đỉnh của Senior — phần lớn kỹ năng lõi đã chạm ④. Ứng viên **Hải** phỏng vấn ở vùng cao nhất Senior, chuẩn bị các câu hỏi tiệm cận Specialist. Người phỏng vấn: **anh Bình**, Head of Engineering.

### Lab 1 — Vòng kỹ thuật sâu

**Bình:** Chào Hải, anh Bình đây. Em từng phải chịu trách nhiệm về chất lượng kỹ thuật của cả 1 sản phẩm chưa, không chỉ 1 module?

**Hải:** Dạ có ạ, em phụ trách kỹ thuật chính cho cả mảng FE của sản phẩm hiện tại, khoảng 4 người trong team.

**Bình:** Em có chiến lược gì để đảm bảo chất lượng đồng đều khi nhiều người cùng code, không phải kiểu "ai code kiểu người đó"?

**Hải:** Dạ em thiết lập ESLint + Prettier bắt buộc qua CI, checklist review chung cho cả team (không chỉ dựa cảm tính người review), và quy định ngưỡng coverage test không được tụt khi merge. Ngoài ra, những quyết định kiến trúc lớn (như chọn thư viện mới) đều phải viết một tài liệu ngắn nêu lý do và đánh đổi, để cả team cùng hiểu chứ không chỉ một người quyết.

**Bình:** Tốt. Em từng phải làm việc trực tiếp với hiệu năng ở quy mô lớn, kiểu hàng chục nghìn user cùng lúc chưa?

**Hải:** Dạ ở mức FE, em chưa trực tiếp xử lý quy mô đó (đó là phần chủ yếu của BE/hạ tầng), nhưng em có kinh nghiệm về việc giảm bundle size, lazy-load module theo route, và dùng CDN cache static asset để giảm tải cho server gốc khi lượng truy cập tăng.

**Bình:** Câu trả lời trung thực và đúng phạm vi trách nhiệm FE, tốt. Cảm ơn Hải.

### Lab 2 — Vòng case thiết kế

**Bình:** Case này lớn: công ty đang có 3 sản phẩm khác nhau, mỗi cái tự viết design system riêng, gây trùng lặp công sức và không đồng nhất UI. Em thiết kế giải pháp thế nào?

**Hải:** Dạ em sẽ đề xuất tách 1 thư viện design system dùng chung, publish dưới dạng package nội bộ (npm private registry), có version rõ ràng để mỗi sản phẩm chủ động chọn thời điểm nâng cấp, tránh ép buộc breaking change đột ngột.

**Bình:** Nếu 1 team phản đối vì "sản phẩm của tụi tôi có yêu cầu UI đặc thù, dùng chung sẽ bó buộc", em phản biện hoặc điều chỉnh thế nào?

**Hải:** Dạ em sẽ không ép tất cả phải giống hệt nhau — thiết kế package cho phép override qua theme/token (màu, spacing) thay vì cứng hoá style, để phần khung/hành vi dùng chung nhưng phần nhìn có thể tuỳ biến theo từng sản phẩm. Nếu team đó có nhu cầu đặc thù thật sự không thể theme hoá được, em sẽ chấp nhận họ tự viết riêng phần đó, không ép dùng chung bằng mọi giá.

**Bình:** Cân bằng hợp lý giữa chuẩn hoá và linh hoạt. Em trình bày quyết định này cho các team khác bằng hình thức nào?

**Hải:** Dạ em sẽ viết 1 tài liệu ngắn kiểu ADR (architecture decision record) — nêu bối cảnh, các lựa chọn đã cân nhắc, quyết định cuối và lý do — để sau này ai hỏi "sao lại chọn cách này" đều có tài liệu tham chiếu, không phải hỏi lại người quyết định.

### Lab 3 — Vòng hành vi & lãnh đạo

**Bình:** Kể anh nghe một lần em phải đứng ra hoà giải bất đồng giữa 2 thành viên trong team, không phải bất đồng của chính em.

**Hải:** Dạ có lần 2 bạn trong team tranh cãi khá căng về cách đặt tên convention, việc nhỏ nhưng kéo dài nhiều ngày trong các merge request. Em không đứng về phe nào, mà tổ chức 1 buổi ngắn để cả 2 trình bày lý do, rồi cùng chốt 1 quy tắc chung viết hẳn vào coding convention document, để lần sau không phải tranh cãi lại từ đầu mỗi lần review.

**Bình:** Tốt, xử lý bằng cách tạo ra quy tắc chung thay vì phân xử ai đúng ai sai. Em có kinh nghiệm tham gia phỏng vấn tuyển dụng chưa?

**Hải:** Dạ em có tham gia vòng kỹ thuật cho vài ứng viên Junior/Middle, chủ yếu hỏi về nền tảng và cho làm 1 bài code nhỏ, tập trung xem cách ứng viên tư duy hơn là đúng/sai tuyệt đối.

**Bình:** Cảm ơn Hải, cảm ơn em đã dành thời gian.

**Góc nhìn người chấm (Senior·V3):** Hải cho thấy tư duy hệ thống ở cấp cao — giải pháp design-system dùng token thay vì ép đồng nhất cứng nhắc là điển hình cho việc **cân bằng chuẩn hoá và linh hoạt**; xử lý mâu thuẫn bằng cách **tạo quy tắc chung** thay vì phân xử đúng/sai cho thấy tư duy lãnh đạo trưởng thành. Đồng thời Hải vẫn giữ **trung thực về ranh giới trách nhiệm FE** (không nhận vơ kinh nghiệm hạ tầng quy mô lớn mà mình chưa thực sự làm).

---

## Specialist · Vùng 1

> Bước vào Specialist — từ "chuyên gia kỹ thuật" sang **người ra quyết định công nghệ cấp đơn vị**. Kỹ năng cứng (code, kiến trúc, lãnh đạo nhóm) đã gần như trần thang; cái mới là nhóm **Chiến lược & quản trị công nghệ**. Ứng viên **Phương** phỏng vấn cho vị trí Principal Engineer/Head of Frontend. Người phỏng vấn: **anh Tùng**, Director of Engineering.

### Lab 1 — Vòng kỹ thuật & chiến lược công nghệ

**Tùng:** Chào Phương, anh Tùng đây. Ở vị trí này mình sẽ nói nhiều hơn về cách em ra quyết định công nghệ, không chỉ code. Em có quy trình gì để đánh giá một công nghệ/thư viện mới trước khi đưa vào dùng thật chưa?

**Phương:** Dạ có ạ. Em thường làm theo 3 bước: (1) prototype nhỏ để kiểm chứng công nghệ đó giải quyết đúng vấn đề, (2) đánh giá chi phí vận hành lâu dài — độ phổ biến, cộng đồng, tần suất breaking change, không chỉ nhìn tính năng lúc demo, (3) thử nghiệm ở 1 module không quan trọng trước khi áp dụng rộng, để giới hạn rủi ro nếu chọn sai.

**Tùng:** Tốt. Em có cách nào để giám sát hiệu năng hệ thống ở production một cách chủ động, chứ không đợi user báo cáo?

**Phương:** Dạ em thiết lập công cụ APM (application performance monitoring) để theo dõi Core Web Vitals thực tế của người dùng (real user monitoring), đặt ngưỡng cảnh báo tự động khi các chỉ số như LCP hay lỗi JS tăng bất thường sau mỗi lần deploy, thay vì chỉ nhìn số liệu trung bình một lần mỗi tháng.

**Tùng:** Được. Câu cuối vòng này — bên em đảm bảo yêu cầu phi chức năng (như khả năng mở rộng, bảo mật) ở tầng FE bằng cách nào?

**Phương:** Dạ em đưa các yêu cầu đó thành checklist bắt buộc trong quy trình review kiến trúc trước khi 1 tính năng lớn được duyệt — ví dụ tính năng nào cũng phải trả lời được "nếu traffic tăng gấp 10 thì phần nào vỡ trước", chứ không để tới lúc gặp sự cố mới nghĩ tới.

### Lab 2 — Vòng case chiến lược công nghệ

**Tùng:** Case này: ban lãnh đạo đang cân nhắc dùng React cho sản phẩm mới, trong khi toàn bộ hệ thống hiện tại dùng Angular. Với vai trò sở hữu Tech Stack của đơn vị, em tư vấn thế nào?

**Phương:** Dạ em sẽ không quyết định dựa trên cảm tính "framework nào hot hơn". Em sẽ đặt câu hỏi trước: sản phẩm mới có cần dùng chung người/component với hệ thống Angular hiện tại không, đội ngũ hiện tại có kỹ năng React sẵn hay phải đào tạo lại, và chi phí vận hành 2 stack song song (tuyển dụng, tài liệu nội bộ, thư viện dùng chung) là bao nhiêu.

**Tùng:** Giả sử câu trả lời là: sản phẩm mới độc lập hoàn toàn, không chia sẻ component, nhưng đội chưa ai biết React. Em quyết định thế nào?

**Phương:** Dạ nếu độc lập hoàn toàn thì rủi ro kỹ thuật thấp hơn, nhưng em vẫn cân nhắc thêm: nếu đây là quyết định một lần cho 1 sản phẩm nhỏ, có thể chấp nhận thử React để đội có thêm kinh nghiệm đa dạng. Nhưng nếu xu hướng là "mỗi sản phẩm mới lại chọn 1 framework khác nhau", em sẽ phản đối, vì về lâu dài chi phí vận hành nhiều stack song song sẽ vượt xa lợi ích của việc "mỗi đội tự chọn cái mình thích". Em sẽ đề xuất: nếu quyết định dùng React, thì đó phải là quyết định chiến lược cho **các sản phẩm mới về sau nói chung**, không phải ngoại lệ một lần.

**Tùng:** Câu trả lời cho thấy em nhìn ở tầm đơn vị chứ không chỉ 1 sản phẩm, tốt.

### Lab 3 — Vòng hành vi, đào tạo & tuyển dụng

**Tùng:** Em từng xây một quy trình đào tạo hoặc đánh giá bài bản cho cả đội chưa, không chỉ mentor 1-1?

**Phương:** Dạ em có xây một lộ trình onboarding chuẩn cho FE dev mới vào — tuần đầu đọc tài liệu kiến trúc + làm 1 bug nhỏ có hướng dẫn, tuần 2 làm 1 tính năng nhỏ có review sát sao, sau đó đánh giá theo checklist năng lực rõ ràng thay vì cảm tính "thấy ổn là được".

**Tùng:** Em tham gia phỏng vấn tuyển dụng ở mức nào rồi?

**Phương:** Dạ em mới bắt đầu tham gia vòng kỹ thuật cho vị trí Senior trở xuống, chưa được giao quyết định cuối cùng cho vị trí cấp cao — em nghĩ đó là điều em cần tích luỹ thêm.

**Tùng:** Cảm ơn Phương, câu trả lời rõ ràng và biết rõ giới hạn hiện tại của mình.

**Góc nhìn người chấm (Specialist·V1):** khác biệt lớn nhất so với Senior là Phương **nhìn quyết định công nghệ ở tầm đơn vị/nhiều sản phẩm**, không chỉ tầm 1 team (ví dụ case React vs Angular — không quyết định cảm tính mà tính chi phí vận hành dài hạn toàn đơn vị). Vẫn giữ tín hiệu tốt về **thành thật giới hạn năng lực** (tuyển dụng cấp cao) dù đã ở vị trí cao.

---

## Specialist · Vùng 2

> Đã đảm nhận vai trò chiến lược công nghệ được một thời gian. Ứng viên **Vy** phỏng vấn chuyển sang một tập đoàn công nghệ lớn hơn, vị trí Head of Frontend. Người phỏng vấn: **chị Hương**, CTO.

### Lab 1 — Vòng kỹ thuật & giám sát hệ thống

**Hương:** Chào Vy, chị Hương đây. Em kể chị nghe cách em xây dựng hệ thống giám sát hiệu năng (APM) bài bản cho toàn bộ các sản phẩm FE của đơn vị, không chỉ 1 sản phẩm?

**Vy:** Dạ, em chuẩn hoá 1 bộ dashboard chung — mọi sản phẩm đều báo cáo Core Web Vitals, tỷ lệ lỗi JS, thời gian phản hồi API vào cùng 1 hệ thống giám sát trung tâm, thay vì mỗi team tự chọn công cụ riêng. Nhờ vậy khi có sự cố, em có thể so sánh sản phẩm nào đang lệch chuẩn so với các sản phẩm khác, phát hiện vấn đề hệ thống thay vì chỉ vấn đề cục bộ.

**Hương:** Tốt, có tầm nhìn toàn đơn vị. Em có ví dụ nào về việc dùng framework/nền tảng dùng chung mà em xây dựng giúp tăng tốc độ phát triển của các team khác không?

**Vy:** Dạ em xây một bộ CLI nội bộ để scaffold nhanh 1 module mới (tự sinh cấu trúc thư mục, file test mẫu, đăng ký route) theo đúng chuẩn kiến trúc của công ty, giảm thời gian setup ban đầu cho dev mới từ nửa ngày xuống vài phút, và đảm bảo mọi module mới đều tuân thủ chuẩn ngay từ đầu chứ không phải sửa lại sau.

**Hương:** Rất thực tế. Em đảm bảo yêu cầu phi chức năng ở mức nào rồi — có case cụ thể không?

**Vy:** Dạ có, khi 1 sản phẩm chuẩn bị mở rộng sang thị trường khác, em yêu cầu review NFR về khả năng đa ngôn ngữ (i18n) và khả năng chịu tải khi traffic tăng đột biến trước khi launch, không đợi launch xong mới phát hiện thiếu.

### Lab 2 — Vòng case xây dựng nền tảng dùng chung

**Hương:** Case: công ty có 5 sản phẩm, mỗi cái tự implement lại tính năng xác thực người dùng (login/logout/refresh token) theo cách hơi khác nhau, gây khó bảo trì và có sản phẩm còn lỗi bảo mật cũ chưa vá. Em xây dựng giải pháp nền tảng dùng chung thế nào?

**Vy:** Dạ em sẽ tách logic xác thực thành 1 package dùng chung (tương tự SDK nội bộ), đóng gói sẵn interceptor xử lý token, cơ chế refresh, và các pattern bảo mật đã được duyệt (như HttpOnly cookie thay vì lưu token ở localStorage nếu áp dụng được). Việc quan trọng nhất là đảm bảo khi phát hiện lỗ hổng bảo mật, chỉ cần vá 1 chỗ và nâng version package, thay vì phải sửa 5 lần ở 5 sản phẩm.

**Hương:** Nếu 1 sản phẩm cũ dùng kiến trúc quá khác, không thể áp package mới ngay, em xử lý sao?

**Vy:** Dạ em sẽ không ép migrate ngay lập tức toàn bộ — ưu tiên vá lỗ hổng bảo mật cụ thể ở sản phẩm đó trước (ngắn hạn), đồng thời lên lộ trình migrate dần sang package chung (dài hạn), có deadline rõ ràng chứ không để "từ từ tính sau" kéo dài vô thời hạn.

**Hương:** Cân bằng tốt giữa xử lý cấp bách và giải pháp bền vững.

### Lab 3 — Vòng hành vi & quản lý dự án

**Hương:** Em từng phải quản lý một dự án có deadline gấp, liên quan tới nhiều team cùng lúc chưa?

**Vy:** Dạ có, có lần công ty cam kết ra mắt 1 tính năng lớn trước sự kiện của khách hàng, liên quan tới cả 3 team FE của 3 sản phẩm khác nhau cần đồng bộ 1 phần API và UI chung. Em tổ chức 1 buổi lên kế hoạch chung ngay từ đầu, chia rõ phần nào mỗi team làm độc lập, phần nào cần đồng bộ (như format dữ liệu chung), và có buổi check-in ngắn hàng ngày chỉ để phát hiện sớm ai đang bị chặn bởi phần của team khác — không để đến gần deadline mới phát hiện lệch nhau.

**Hương:** Kết quả thế nào?

**Vy:** Dạ ra mắt đúng hạn, có 1 team chậm 1 ngày do đánh giá thiếu độ phức tạp ban đầu, nhưng vì phát hiện sớm qua check-in hàng ngày nên các team khác kịp điều chỉnh phần phụ thuộc, không bị vỡ dây chuyền.

**Hương:** Cảm ơn Vy, rất rõ ràng.

**Góc nhìn người chấm (Specialist·V2):** Vy cho thấy năng lực **xây dựng đòn bẩy cho cả đơn vị** (CLI scaffold, package xác thực dùng chung) thay vì chỉ tự làm tốt việc của mình — đây là bản chất "nền tảng dùng chung" đúng nghĩa Specialist. Case quản lý dự án cũng cho thấy kỹ năng **phát hiện rủi ro sớm qua cơ chế** (check-in hàng ngày) thay vì chỉ hy vọng mọi thứ suôn sẻ.

---

## Specialist · Vùng 3

> Vùng cuối cùng của toàn bộ thang FE (10/10). 8 kỹ năng chiến lược nhảy thẳng lên mức ④ — không còn level nào cao hơn để "để dành". Ứng viên **Nghĩa** phỏng vấn cho vị trí Head of Frontend / Principal Engineer cấp tập đoàn. Người phỏng vấn: **anh Khang**, VP Engineering.

### Lab 1 — Vòng nghiên cứu & phát triển công nghệ (R&D)

**Khang:** Chào Nghĩa, anh Khang đây. Em từng đánh giá và đưa một công nghệ hoàn toàn mới vào production ở quy mô lớn chưa — không phải thử nghiệm nhỏ, mà thật sự thay đổi cách cả đơn vị làm việc?

**Nghĩa:** Dạ có ạ, em từng dẫn dắt việc đánh giá và áp dụng Server-Side Rendering (SSR) cho các sản phẩm cần SEO tốt hơn. Em không quyết định chỉ dựa trên demo đẹp — em lập một bộ tiêu chí đánh giá gồm: tác động tới thời gian build/deploy, chi phí hạ tầng server tăng thêm (SSR cần server chạy JS chứ không chỉ static hosting), độ khó khi debug lỗi chỉ xảy ra ở server-side, và mức độ tương thích với các thư viện third-party hiện tại của team (một số thư viện dùng `window` trực tiếp sẽ vỡ khi render ở server).

**Khang:** Kết quả và bài học là gì?

**Nghĩa:** Dạ áp dụng thành công cho 2 sản phẩm chính, SEO cải thiện rõ rệt. Bài học lớn nhất là chi phí hạ tầng và độ phức tạp vận hành tăng thật sự đáng kể, nên em không áp dụng đại trà cho mọi sản phẩm — chỉ áp dụng cho sản phẩm có nhu cầu SEO cao, sản phẩm nội bộ (admin panel) vẫn giữ nguyên client-side rendering vì không cần thiết.

**Khang:** Quyết định có chọn lọc thay vì áp dụng cực đoan — đúng tinh thần R&D trưởng thành.

### Lab 2 — Vòng case sở hữu Tech Stack & đảm bảo NFR toàn đơn vị

**Khang:** Case lớn nhất: em được giao chuẩn hoá Tech Stack cho toàn bộ 8 sản phẩm FE của tập đoàn, hiện đang dùng 3 framework khác nhau do lịch sử phát triển rời rạc. Em tiếp cận thế nào?

**Nghĩa:** Dạ em sẽ không ép tất cả 8 sản phẩm đổi sang 1 framework ngay — chi phí và rủi ro migrate toàn bộ cùng lúc là quá lớn. Em sẽ: (1) chọn 1 framework chuẩn cho **mọi sản phẩm mới** kể từ thời điểm quyết định — chặn đứng việc phân mảnh thêm, (2) với 3 framework cũ đang chạy, phân loại theo mức độ hoạt động — sản phẩm nào sắp deprecate thì giữ nguyên tới khi ngừng, sản phẩm nào còn phát triển lâu dài thì lên lộ trình migrate dần theo từng phần, không phải big-bang rewrite, (3) trong lúc chuyển tiếp, đảm bảo NFR tối thiểu (bảo mật, khả năng truy cập - accessibility, hiệu năng) là yêu cầu bắt buộc cho MỌI sản phẩm bất kể dùng framework nào — đây là ranh giới không thương lượng dù đang trong giai đoạn chuyển đổi.

**Khang:** Nếu 1 team phản đối kịch liệt vì đã đầu tư rất nhiều vào framework cũ, em xử lý sao?

**Nghĩa:** Dạ em sẽ lắng nghe lý do cụ thể trước — nếu vì lo ngại chính đáng (ví dụ đội chưa có kỹ năng framework mới, hoặc sản phẩm đó có ràng buộc kỹ thuật đặc thù), em sẽ điều chỉnh lộ trình cho team đó dài hơn thay vì áp đặt cứng deadline chung cho tất cả. Nhưng em sẽ minh bạch rằng đây là quyết định chiến lược đã được thông qua ở cấp cao nhất, không phải điều có thể phủ quyết vô thời hạn — chỉ có thể đàm phán *tốc độ*, không đàm phán *hướng đi*.

**Khang:** Đây chính xác là tư duy cần có ở vị trí sở hữu Tech Stack cấp tập đoàn — vừa lắng nghe vừa giữ vững hướng chiến lược.

### Lab 3 — Vòng quản lý dự án & xây dựng đội ngũ cấp đơn vị

**Khang:** Em xây dựng quy trình đào tạo & đánh giá đội ngũ ở quy mô toàn đơn vị (không chỉ 1 team) như thế nào?

**Nghĩa:** Dạ em xây một khung năng lực (competency framework) áp dụng cho tất cả FE dev trong đơn vị, chia theo từng cấp độ rõ ràng, kèm minh chứng cụ thể cho từng mức (không chỉ mô tả chung chung). Mỗi quý, các lead của từng team dùng chung khung này để đánh giá, đảm bảo 1 dev Senior ở team A được đánh giá theo cùng tiêu chuẩn với 1 dev Senior ở team B — tránh tình trạng "senior" nghĩa khác nhau tuỳ team.

**Khang:** Em quản lý dự án ở quy mô nhiều team, nhiều deadline chồng chéo như thế nào?

**Nghĩa:** Dạ em duy trì 1 bức tranh tổng ưu tiên chung (roadmap cấp đơn vị), để khi 1 team báo có 2 việc gấp cùng lúc, quyết định ưu tiên cái nào không dựa trên tiếng nói to nhất trong phòng họp, mà dựa trên mức độ ảnh hưởng đã thống nhất từ trước ở cấp chiến lược.

**Khang:** Cảm ơn Nghĩa, buổi trao đổi rất giá trị.

**Góc nhìn người chấm (Specialist·V3 — đỉnh toàn thang):** Nghĩa thể hiện tư duy ở tầm cao nhất — mọi quyết định (SSR, chuẩn hoá Tech Stack, ưu tiên dự án) đều **có chọn lọc, có lộ trình, và phân biệt rõ cái gì thương lượng được / cái gì là ranh giới cứng** (NFR bắt buộc, hướng chiến lược đã chốt). Đây là điểm khác biệt cốt lõi giữa Specialist và Senior: không chỉ ra quyết định kỹ thuật đúng, mà **thiết kế được cách cả một đơn vị lớn cùng vận hành nhất quán** trong khi vẫn tôn trọng khác biệt hợp lý của từng phần.

