# [DRAFT v2 — chờ PO duyệt] Lab phỏng vấn — Dev Front-end · Experienced · Vùng 2

> Kịch bản thoại thật của 1 buổi phỏng vấn ~55 phút (online, chia sẻ màn hình). Nhân vật: **Anh Huy** — Tech Lead, người phỏng vấn · **Mai** — ứng viên, đang ở vùng Experienced·V2 (~1.5–2 năm kinh nghiệm Angular). Không có vòng system design (thực tế chỉ bắt đầu rõ từ Senior).

---

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

---

## Sau buổi phỏng vấn — góc nhìn người chấm (rubric)

| Tiêu chí | Mai làm được gì trong buổi này |
|---|---|
| Kỹ thuật | Trả lời đúng bản chất 401 vs 403, biết `HttpInterceptor`, biết ý tưởng `HttpTestingController` và microfrontend ở đúng mức ① — không cố tỏ ra biết nhiều hơn thật |
| Giải quyết vấn đề | **Hỏi lại để làm rõ bug trước khi sửa** thay vì đoán bừa — đây là tín hiệu quan trọng nhất của cả buổi |
| Giao tiếp | Nói ra suy nghĩ trong lúc debug ("em nghi là...", "có khi nào..."), không im lặng gõ code |
| Tự kiểm chứng | Viết test đúng nguyên nhân gốc (string "0"), không chỉ test cho có |
| STAR | Cả 2 câu đều có Action cụ thể và Result kèm bài học rút ra — không chỉ kể lể Situation |

**Lỗi Mai đã KHÔNG mắc phải (những gì ứng viên khác hay sai ở vùng Ex·V2):**
- Sửa case ngay không hỏi lại → nhiều ứng viên đoán bừa, sửa sai chỗ.
- Nói quá nhiều thuật ngữ nâng cao ở câu Microfrontend trong khi mức ① chỉ cần hiểu ý tưởng — Mai trả lời đúng mức, không cố phô.
- Trả lời STAR chỉ có Situation dài dòng thiếu Action — lỗi phổ biến nhất theo dữ liệu thực tế các buổi phỏng vấn.

## Nguồn tham khảo dùng để thiết kế khuôn
- [Tech Interview Handbook — coding interview rubrics](https://www.techinterviewhandbook.org/coding-interview-rubrics/)
- [MIT Career Advising — STAR method](https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/)
- [MindX — 3 vòng phỏng vấn lập trình viên](https://mindx.edu.vn/blog/3-vong-phong-van-lap-trinh-vien)
- [Metaview — interview rubrics](https://www.metaview.ai/resources/blog/interview-rubrics)
