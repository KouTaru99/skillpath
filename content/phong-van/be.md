# Lab phỏng vấn — Dev Back-end

> Kịch bản thoại thật, viết theo đúng vùng năng lực bạn đang ở, ví dụ minh hoạ bằng Java/Spring Boot. Từ Entry đến Experienced·V2, mỗi vùng mô phỏng **1 buổi phỏng vấn trọn vẹn**. Từ Experienced·V3 trở lên, buổi phỏng vấn thật tách thành nhiều vòng riêng — mỗi vùng có 3 lab: **kỹ thuật sâu**, **case thiết kế**, **hành vi & lãnh đạo**.

---

## Entry

### Lab — Phỏng vấn thực tập sinh / fresher

**Bối cảnh:** phỏng vấn vị trí thực tập sinh/fresher Back-end (Java) tại một công ty phần mềm cỡ nhỏ. Online, 30 phút. Người phỏng vấn: **anh Sơn**, Dev BE 2 năm kinh nghiệm, ứng viên **Bảo** — mới ra trường.

**Sơn:** Chào Bảo, anh Sơn đây. Em kể sơ về đồ án/dự án gần nhất em làm được không?

**Bảo:** Dạ em làm đồ án quản lý sinh viên, viết bằng Java, có kết nối CSDL MySQL, chưa dùng Spring Boot mà làm thuần JDBC thôi ạ.

**Sơn:** Ok, không sao. Em hiểu "lớp" (class) và "đối tượng" (object) khác nhau chỗ nào?

**Bảo:** Dạ, class là bản thiết kế/khuôn mẫu, còn object là một thực thể cụ thể được tạo ra từ class đó. Ví dụ class `SinhVien` định nghĩa có tên, mã số; mỗi object là 1 sinh viên cụ thể như "Nguyễn Văn A, mã 001".

**Sơn:** Tốt. Em viết câu lệnh SQL để lấy danh sách sinh viên có điểm trung bình trên 8 như thế nào?

**Bảo:** Dạ, `SELECT * FROM sinh_vien WHERE diem_tb > 8;`

**Sơn:** Được. Giờ mình làm một bài nhỏ, anh chia sẻ màn hình nhé.

```java
public class Calculator {
    public int divide(int a, int b) {
        return a / b;
    }
}
```

**Sơn:** Đoạn này chạy bị crash khi gọi `divide(10, 0)`. Em biết vì sao và sửa thế nào không?

**Bảo:** [suy nghĩ] Dạ, chia cho 0 với số nguyên sẽ ném ra lỗi `ArithmeticException` ạ. Em sẽ kiểm tra `b` trước khi chia, nếu `b == 0` thì báo lỗi rõ ràng thay vì để chương trình crash đột ngột.

```java
public int divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Không thể chia cho 0");
    }
    return a / b;
}
```

**Sơn:** Tốt, biết ném lỗi có ý nghĩa thay vì để crash mù mờ. Em có biết debug bằng cách nào ngoài in ra màn hình không?

**Bảo:** Dạ em có dùng breakpoint trong IntelliJ, đặt điểm dừng rồi xem giá trị biến lúc đó, chạy từng dòng một.

**Sơn:** Ok. Hai câu cuối — em biết Git cơ bản chưa?

**Bảo:** Dạ em biết `git add`, `git commit`, `git push`, `git pull` để đồng bộ code với GitHub, hồi làm đồ án nhóm em có dùng để tránh ghi đè code của nhau.

**Sơn:** Được. Cuối cùng, kể anh nghe một lần em tự học thêm gì đó ngoài chương trình học.

**Bảo:** Dạ, làm đồ án em thấy viết JDBC thuần phải tự đóng mở connection rất dễ quên, em có tìm hiểu thử một chút về JPA/Hibernate qua video hướng dẫn, thấy nó tự động hoá việc đó nhưng em chưa áp dụng thật vào đồ án vì thời gian không kịp.

**Sơn:** Tốt, biết được hướng đi xa hơn dù chưa áp dụng. Cảm ơn Bảo.

**Góc nhìn người chấm:** ở Entry, tín hiệu quan trọng là **hiểu bản chất lỗi trước khi sửa** (Bảo giải thích đúng nguyên nhân `ArithmeticException` thay vì chỉ đoán cách fix), và có ý thức tự học công nghệ liên quan dù chưa áp dụng thực tế.

---

## Experienced · Vùng 1

### Lab — Phỏng vấn Dev Back-end, tuyển chính thức

**Bối cảnh:** ứng viên **Tuấn** (~6-9 tháng kinh nghiệm) phỏng vấn vào vị trí chính thức. Người phỏng vấn: **chị Hạnh**, Dev BE lâu năm. Online, 45 phút.

**Hạnh:** Chào Tuấn, chị Hạnh đây. Em code Spring Boot được bao lâu rồi?

**Tuấn:** Dạ em làm Spring Boot khoảng 6 tháng, chủ yếu viết REST API cho một hệ thống quản lý kho hàng.

**Hạnh:** Em phân biệt `@Controller` và `@RestController` thế nào?

**Tuấn:** Dạ `@RestController` là kết hợp của `@Controller` và `@ResponseBody`, nghĩa là mọi method trong class đó mặc định trả về dữ liệu (thường là JSON) thẳng vào response body, chứ không trả về tên view như `@Controller` thường dùng cho render HTML.

**Hạnh:** Tốt. Giờ nói về HTTP status code — khi nào em trả về 400 và khi nào trả về 404?

**Tuấn:** Dạ 400 là khi request của client sai định dạng hoặc thiếu dữ liệu bắt buộc, ví dụ thiếu trường `name` khi tạo sản phẩm. Còn 404 là khi request đúng định dạng nhưng tài nguyên được yêu cầu không tồn tại, ví dụ gọi `GET /products/999` mà id 999 không có trong hệ thống.

**Hạnh:** Chuẩn. Em có dùng `@Transactional` chưa, và hiểu nó làm gì không?

**Tuấn:** Dạ có, em đặt `@Transactional` ở method service khi có nhiều thao tác ghi CSDL cần thành công cùng lúc, ví dụ trừ tồn kho và tạo đơn hàng phải cùng thành công hoặc cùng rollback, không để trường hợp trừ tồn kho rồi nhưng tạo đơn hàng lại lỗi.

**Hạnh:** Được, giờ làm 1 bài nhỏ, chị share màn hình.

```java
@GetMapping("/products/{id}")
public Product getProduct(@PathVariable Long id) {
    return productRepository.findById(id).get();
}
```

**Hạnh:** Đoạn này đang bị lỗi 500 khi gọi id không tồn tại, thay vì trả về 404 gọn gàng. Em sửa thế nào?

**Tuấn:** Dạ, `findById` trả về `Optional`, gọi thẳng `.get()` khi rỗng sẽ ném `NoSuchElementException` → Spring mặc định trả 500. Em sẽ xử lý rõ ràng:

```java
@GetMapping("/products/{id}")
public ResponseEntity<Product> getProduct(@PathVariable Long id) {
    return productRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}
```

**Hạnh:** Tốt, xử lý đúng chỗ. Câu hành vi — kể chị nghe một lần em phải tự học điều gì đó để hoàn thành task.

**Tuấn:** Dạ, em được giao viết chức năng gửi email xác nhận đơn hàng, trước giờ em chưa làm. Em đọc doc của Spring Mail, làm theo ví dụ cơ bản chạy được trong buổi sáng, chiều gặp vấn đề là gửi bất đồng bộ bị lỗi vì thiếu cấu hình `@EnableAsync`, em tra Stack Overflow thấy đúng vấn đề và thêm annotation đó thì hết lỗi.

**Hạnh:** Tốt, cảm ơn Tuấn, còn câu hỏi gì cho chị không?

**Tuấn:** Dạ, team mình review code có bắt buộc viết test trước khi merge không ạ?

**Hạnh:** Có, ít nhất test cho service logic. Cảm ơn em.

**Góc nhìn người chấm:** Tuấn hiểu đúng lý do đằng sau mỗi lựa chọn (annotation, status code, transaction) chứ không chỉ nhớ cú pháp — đây là tín hiệu phân biệt Ex·V1 với Entry.

---

## Experienced · Vùng 2

### Lab — Phỏng vấn thăng cấp lên Experienced

**Bối cảnh:** ứng viên **Diệu** (~1.5-2 năm kinh nghiệm) phỏng vấn tại một công ty sản phẩm. Người phỏng vấn: **anh Long**, Tech Lead. Online, 50 phút.

**Long:** Chào Diệu, anh Long đây. API của em có endpoint nào phải gọi đồng thời từ nhiều request cùng lúc, dễ gây tranh chấp dữ liệu không?

**Diệu:** Dạ có ạ, endpoint đặt hàng khi số lượng tồn kho có hạn — nếu 2 người cùng đặt hàng sản phẩm cuối cùng cùng lúc, có nguy cơ cả 2 request đều đọc thấy còn hàng rồi cùng trừ, dẫn tới âm kho.

**Long:** Em xử lý race condition đó thế nào?

**Diệu:** Dạ em dùng khoá lạc quan (`@Version` — optimistic locking) của JPA, nếu 2 transaction cùng sửa 1 dòng thì transaction sau sẽ phát hiện version đã đổi và bị lỗi, em bắt lỗi đó và cho retry hoặc báo hết hàng cho request đến sau.

**Long:** Vì sao chọn optimistic locking thay vì pessimistic locking (khoá bi quan)?

**Diệu:** Dạ vì tình huống tranh chấp thực tế không xảy ra quá thường xuyên (không phải lúc nào cũng có 2 người mua cùng lúc), nên optimistic locking đỡ tốn chi phí khoá liên tục hơn so với pessimistic — pessimistic sẽ khoá dòng dữ liệu đó lại, làm chậm các request khác dù phần lớn thời gian không có tranh chấp thật.

**Long:** Tốt, biết cân đánh đổi. Em viết index cho bảng CSDL dựa trên tiêu chí gì?

**Diệu:** Dạ em index những cột hay dùng trong mệnh đề `WHERE`, `JOIN`, `ORDER BY` với dữ liệu lớn — ví dụ cột `customer_id` trong bảng đơn hàng vì hay query theo khách hàng. Em tránh index bừa vì mỗi index làm chậm thao tác ghi (INSERT/UPDATE phải cập nhật cả index).

**Long:** Được. Giờ làm 1 bài nhỏ.

```java
for (Order order : orders) {
    Customer customer = customerRepository.findById(order.getCustomerId()).get();
    order.setCustomerName(customer.getName());
}
```

**Long:** Đoạn này chạy đúng nhưng chậm khi danh sách đơn hàng lớn, em thấy vấn đề gì không?

**Diệu:** [đọc một lúc] Dạ đây là vấn đề N+1 query — với mỗi đơn hàng trong vòng lặp, code lại gọi 1 query riêng để lấy khách hàng, nếu có 1000 đơn hàng thì chạy 1000 query riêng lẻ thay vì 1 query gộp.

**Long:** Sửa thế nào?

**Diệu:** Dạ em sẽ lấy hết `customerId` cần thiết trước, gọi 1 lần `findAllById` để lấy tất cả customer về 1 lần, rồi map lại bằng một `Map<Long, Customer>` trong bộ nhớ, thay vì query trong vòng lặp.

**Long:** Chuẩn. Câu hành vi cuối — kể anh nghe một lần em phát hiện bug do mình gây ra sau khi lên production.

**Diệu:** Dạ có lần em sửa logic tính phí vận chuyển, test trên máy với vài đơn hàng mẫu thấy đúng nên merge. Sau đó phát hiện đơn hàng có nhiều sản phẩm từ nhiều kho khác nhau bị tính phí sai, vì em quên xử lý trường hợp đó trong lúc code — bộ test em viết chỉ có case 1 kho. Em sửa lại và bổ sung test case cho đúng tình huống nhiều kho, rút kinh nghiệm là phải liệt kê hết các trường hợp dữ liệu thực tế trước khi viết test, không chỉ test theo happy path.

**Long:** Cảm ơn Diệu, rõ ràng.

**Góc nhìn người chấm:** Diệu cho tín hiệu tốt về **cân nhắc đánh đổi kỹ thuật có lý do** (optimistic vs pessimistic locking) và **nhận diện đúng vấn đề hiệu năng kinh điển** (N+1 query) — đây là mức kỳ vọng chính xác ở Ex·V2 khi CSDL đã lên mức ③.

---

## Experienced · Vùng 3

> Đỉnh của Experienced — Java và CSDL đã chạm ④ (2 kỹ năng lõi nhất của BE), chưa có vòng system design (bắt đầu rõ từ Senior). Ứng viên **Vinh** (~3 năm) phỏng vấn xác nhận lên vùng cao nhất Experienced. Người phỏng vấn: **chị Thu**, Senior Dev BE. 3 vòng riêng.

### Lab 1 — Vòng kỹ thuật sâu

**Thu:** Chào Vinh, chị Thu đây. Em hiểu `ExecutorService` và thread pool dùng để làm gì trong Java không?

**Vinh:** Dạ, thay vì tự tạo `Thread` mới cho mỗi tác vụ (tốn chi phí tạo/huỷ thread), `ExecutorService` quản lý một nhóm thread có sẵn, tái sử dụng cho nhiều tác vụ, mình chỉ submit task vào và nó tự phân phối cho thread rảnh.

**Thu:** Em từng gặp deadlock chưa, nó xảy ra khi nào?

**Vinh:** Dạ, deadlock xảy ra khi 2 thread cùng chờ khoá (lock) mà thread kia đang giữ — ví dụ thread A giữ khoá 1 và chờ khoá 2, còn thread B giữ khoá 2 và chờ khoá 1, cả hai chờ nhau mãi mãi. Cách phòng tránh phổ biến là luôn lấy khoá theo 1 thứ tự cố định ở mọi nơi trong code.

**Thu:** Tốt. Em từng dùng `EXPLAIN` để phân tích query chậm chưa?

**Vinh:** Dạ có, em dùng `EXPLAIN ANALYZE` trong PostgreSQL để xem query có dùng đúng index không hay đang full table scan, từ đó quyết định có cần thêm index hay viết lại query.

**Thu:** Em phân biệt clustered và non-clustered index thế nào?

**Vinh:** Dạ clustered index quyết định thứ tự vật lý dữ liệu được lưu trên đĩa theo cột đó (mỗi bảng chỉ có 1 clustered index, thường là primary key), còn non-clustered index là một cấu trúc riêng trỏ ngược lại tới dòng dữ liệu gốc, một bảng có thể có nhiều non-clustered index.

**Thu:** Chuẩn. Cảm ơn Vinh.

### Lab 2 — Vòng case thiết kế

**Thu:** Case nhỏ ở tầm module thôi, chưa phải cả hệ thống. Team đang có 1 API lấy danh sách đơn hàng kèm chi tiết sản phẩm, đang chậm dần khi dữ liệu lớn lên. Em thiết kế lại thế nào?

**Vinh:** Dạ đầu tiên em sẽ profile để biết chậm ở tầng nào — CSDL hay xử lý ở code. Nếu do CSDL, em xem lại index cho các cột filter/sort, và cân nhắc phân trang (pagination) thay vì trả hết dữ liệu 1 lần — nhiều API kiểu này hay bị lỗi trả về toàn bộ hàng chục nghìn dòng cùng lúc.

**Thu:** Giả sử đã có pagination và index rồi, vẫn còn chậm vì mỗi đơn hàng cần join với bảng sản phẩm và bảng khách hàng, em tính sao?

**Vinh:** Dạ em sẽ xem việc join đó có đang bị N+1 không, đảm bảo dùng 1 câu query với JOIN tường minh hoặc dùng `@EntityGraph`/fetch join của JPA để lấy hết trong 1 lần thay vì lazy-load từng cái riêng lẻ. Nếu dữ liệu sản phẩm/khách hàng ít thay đổi, em cũng cân nhắc thêm cache ở tầng ứng dụng (ví dụ Redis) cho những dữ liệu tra cứu nhiều nhưng ít đổi.

**Thu:** Em có nghĩ tới việc tách endpoint này ra một service riêng (microservice) không?

**Vinh:** Dạ ở quy mô hiện tại em nghĩ chưa cần thiết — vấn đề chính là tối ưu query/cache, chưa phải vấn đề về ranh giới nghiệp vụ hay đội ngũ cần tách riêng. Tách service sớm khi chưa thật sự cần sẽ tạo thêm độ phức tạp vận hành không đáng có.

**Thu:** Đúng, quyết định đúng lúc.

### Lab 3 — Vòng hành vi

**Thu:** Kể chị nghe một lần em phải làm việc dưới áp lực deadline gấp.

**Vinh:** Dạ có lần phát hiện lỗi bảo mật nhỏ (một endpoint quên kiểm tra quyền) chỉ 1 ngày trước khi release lớn. Em không sửa vội theo cách đầu tiên nghĩ ra, mà khoanh vùng đúng những endpoint bị ảnh hưởng, thêm kiểm tra quyền tối thiểu cần thiết, viết test cho đúng case đó, và báo ngay cho lead biết mức độ ảnh hưởng thay vì tự âm thầm sửa và im lặng.

**Thu:** Tốt, minh bạch và có kiểm soát. Em từng đề xuất cải tiến quy trình team chưa?

**Vinh:** Dạ có, team em trước hay bị trường hợp merge xong mới phát hiện thiếu migration script CSDL đồng bộ. Em đề xuất thêm bước bắt buộc: mọi merge request có thay đổi entity phải kèm file migration tương ứng, kiểm tra tự động trong CI, từ đó giảm hẳn tình trạng thiếu đồng bộ.

**Thu:** Cảm ơn Vinh, hẹn phản hồi sớm.

**Góc nhìn người chấm (cả 3 vòng):** Vinh hiểu sâu cơ chế bên dưới (thread pool, deadlock, loại index) chứ không chỉ biết dùng API; ở case thiết kế biết **giới hạn phạm vi giải pháp phù hợp quy mô** (không đề xuất tách microservice khi chưa cần); ở vòng hành vi, xử lý sự cố bảo mật có kiểm soát và minh bạch — đúng tầm "đỉnh Experienced".

---

## Senior · Vùng 1

> Bắt đầu vùng Senior — 2 nhóm mới **Kiến trúc & thiết kế giải pháp** và **Quản lý & lãnh đạo kỹ thuật**, cùng 2 kỹ năng BE-riêng: **Remote debug** và **Container Orchestration & Cloud Native**. Ứng viên **Trâm** (~4 năm) phỏng vấn lên Senior. Người phỏng vấn: **anh Phúc**, Engineering Manager.

### Lab 1 — Vòng kỹ thuật sâu

**Phúc:** Chào Trâm, anh Phúc đây. Em từng phải debug một lỗi chỉ xảy ra ở môi trường server, không tái hiện được ở máy local chưa?

**Trâm:** Dạ có, có lần một job chạy nền bị treo chỉ ở production, không tái hiện được ở local. Em dùng remote debug — kết nối IDE trực tiếp vào JVM đang chạy ở server qua cổng debug đã bật sẵn, đặt breakpoint để xem trạng thái thật của luồng lúc đó, thay vì đoán mò qua log.

**Phúc:** Tốt. Em biết gì về container orchestration, ví dụ Kubernetes?

**Trâm:** Dạ em mới tìm hiểu ở mức khái niệm — hiểu là khi có nhiều container Docker chạy trên nhiều máy, Kubernetes giúp tự động triển khai, scale, và khởi động lại container nếu nó bị crash, thay vì phải quản lý thủ công từng container. Em chưa trực tiếp vận hành cụm Kubernetes thật.

**Phúc:** Không sao, biết ý tưởng ở mức bắt đầu là đủ cho vùng này. Em có review code cho ai chưa?

**Trâm:** Dạ em mới review vài merge request nhỏ, tập trung xem logic đúng không và có test kèm theo không, chưa dám góp ý sâu về kiến trúc.

**Phúc:** Ổn, cảm ơn Trâm.

### Lab 2 — Vòng case thiết kế

**Phúc:** Case ở mức bắt đầu làm kiến trúc: team sắp làm 1 module hoàn toàn mới "Quản lý khuyến mãi". Em tổ chức package/luồng dữ liệu thế nào?

**Trâm:** Dạ em tách theo tính năng — package `promotion` riêng gồm controller/service/repository/entity của module đó, không gộp chung vào các package `controller`/`service` dùng chung của cả dự án. Về giao tiếp với module đơn hàng đã có sẵn, em sẽ định nghĩa 1 interface rõ ràng (ví dụ `PromotionService.applyDiscount(...)`) để module đơn hàng gọi qua, tránh 2 module đọc thẳng vào bảng CSDL của nhau.

**Phúc:** Vì sao tránh đọc thẳng CSDL của nhau?

**Trâm:** Dạ vì nếu module khuyến mãi sau này đổi cấu trúc bảng, sẽ làm vỡ module đơn hàng nếu nó đọc trực tiếp. Qua interface/service, module khuyến mãi có thể tự do đổi bên trong miễn là giữ đúng hợp đồng (contract) đã thống nhất.

**Phúc:** Tốt, tư duy ranh giới module rõ ràng dù chưa tách microservice thật.

### Lab 3 — Vòng hành vi & lãnh đạo

**Phúc:** Kể anh nghe lần đầu em phân task cho một bạn khác.

**Trâm:** Dạ em được giao chia việc module khuyến mãi trên cho em và 1 bạn mới. Em nhận phần logic tính toán phức tạp hơn, giao bạn đó phần CRUD cơ bản kèm ghi chú rõ ràng trong ticket, vì bạn đó mới quen codebase.

**Phúc:** Em mentor ai chưa?

**Trâm:** Dạ em mới dừng ở mức trả lời câu hỏi khi được hỏi trực tiếp, chưa chủ động đứng ra kèm cặp bài bản — em nghĩ đây là điều cần học thêm.

**Phúc:** Nhận thức đúng hướng. Cảm ơn Trâm.

**Góc nhìn người chấm (Senior·V1):** giống tinh thần chung của vùng khởi đầu Senior — tín hiệu quan trọng là **biết ranh giới năng lực hiện tại** (thành thật về Kubernetes, về mentor) hơn là cố tỏ ra đã vững.

---

## Senior · Vùng 2

> Ứng viên **Đông** phỏng vấn chuyển việc ở vùng Senior·V2. Người phỏng vấn: **chị My**, Engineering Manager.

### Lab 1 — Vòng kỹ thuật sâu

**My:** Chào Đông, chị My đây. Em từng viết load test hoặc performance test cho API chưa?

**Đông:** Dạ có, em dùng JMeter mô phỏng nhiều request đồng thời vào 1 endpoint hay bị nghi ngờ chậm, đo được throughput và độ trễ ở các mức tải khác nhau, từ đó biết được ngưỡng chịu tải thực tế trước khi triển khai thật.

**My:** Tốt. Pipeline CI/CD của team em có những bước gì?

**Đông:** Dạ gồm: build, chạy unit test, chạy static analysis (SonarQube) để bắt code smell/lỗ hổng cơ bản, build image Docker, rồi deploy tự động lên môi trường staging; deploy production cần duyệt thủ công thêm 1 bước.

**My:** Em có kinh nghiệm gì về container orchestration nâng cao hơn không?

**Đông:** Dạ em có tự vận hành thử 1 cụm Kubernetes nhỏ ở môi trường học, hiểu về Pod, Service, Deployment, và cách cấu hình health check để Kubernetes tự khởi động lại container lỗi — nhưng ở công ty hiện tại team em vẫn triển khai bằng Docker Compose đơn giản hơn, chưa dùng Kubernetes thật cho production.

**My:** Cảm ơn Đông, câu trả lời rõ ràng.

### Lab 2 — Vòng case thiết kế

**My:** Case lớn hơn: hệ thống hiện tại là 1 monolith đang phình to, đội ngũ đông lên gây khó phối hợp deploy. Em thiết kế hướng đi thế nào, và phản biện gì nếu ai đó muốn tách hết thành microservices ngay lập tức?

**Đông:** Dạ em sẽ không tách hết cùng lúc — rủi ro rất cao. Em xác định trước ranh giới nghiệp vụ nào độc lập rõ ràng nhất và ít phụ thuộc dữ liệu chéo nhất (ví dụ module thông báo/email), tách module đó ra service riêng trước làm thí điểm, có đo lường lợi ích thực tế (dễ deploy riêng, dễ scale riêng) trước khi tách tiếp phần khác.

**My:** Nếu team háo hức muốn tách hết vì "microservices là chuẩn hiện đại", em nói gì?

**Đông:** Dạ em sẽ chỉ ra chi phí thật: mỗi service tách ra thêm độ phức tạp vận hành (network call thay vì gọi hàm trực tiếp, cần theo dõi phân tán, cần xử lý lỗi mạng), và nếu ranh giới nghiệp vụ chọn sai sẽ phải gọi qua lại giữa các service liên tục — tệ hơn cả để chung trong monolith. Tách nên đi theo nhu cầu thật (đội nào cần deploy độc lập, phần nào cần scale riêng), không phải theo trào lưu.

**My:** Phản biện có cơ sở, tốt.

### Lab 3 — Vòng hành vi & lãnh đạo

**My:** Kể chị nghe một lần em mentor một bạn chưa tiến bộ như mong đợi.

**Đông:** Dạ có 1 bạn hay viết code chạy được nhưng không xử lý exception rõ ràng, dễ để lộ lỗi hệ thống ra ngoài. Em giải thích vài lần nhưng bạn vẫn quên. Em đổi cách — tạo hẳn 1 checklist review kèm ví dụ cụ thể trước/sau, để bạn tự đối chiếu trước khi gửi review thay vì chỉ nghe giải thích miệng, và bạn cải thiện rõ rệt sau đó.

**My:** Em tổ chức seminar chưa?

**Đông:** Dạ em tổ chức 1 buổi chia sẻ về N+1 query sau khi team gặp sự cố hiệu năng liên quan, dùng chính case thật của team làm ví dụ nên mọi người dễ liên hệ hơn là lý thuyết suông.

**My:** Cảm ơn Đông.

**Góc nhìn người chấm (Senior·V2):** Đông biết **phản biện có cơ sở chi phí/lợi ích** (microservices) và **điều chỉnh cách mentor khi cách cũ chưa hiệu quả** — đúng mức trưởng thành kỳ vọng ở V2.

---

## Senior · Vùng 3

> Đỉnh Senior. Ứng viên **Hùng** phỏng vấn ở vùng cao nhất Senior. Người phỏng vấn: **anh Việt**, Head of Engineering.

### Lab 1 — Vòng kỹ thuật sâu

**Việt:** Chào Hùng, anh Việt đây. Em chịu trách nhiệm chất lượng kỹ thuật cho cả 1 hệ thống backend chưa?

**Hùng:** Dạ có, em phụ trách chính mảng backend của 1 sản phẩm, khoảng 5 dev.

**Việt:** Em đảm bảo chất lượng đồng đều khi nhiều người cùng code thế nào?

**Hùng:** Dạ em thiết lập static analysis bắt buộc qua CI (SonarQube chặn merge nếu vi phạm ngưỡng), checklist review chung, và quy định coverage test không được tụt. Những quyết định kiến trúc lớn đều viết tài liệu ngắn nêu lý do, để cả team cùng hiểu.

**Việt:** Em có kinh nghiệm điều tra sự cố production nghiêm trọng chưa?

**Hùng:** Dạ có, từng có sự cố memory leak khiến service phải restart định kỳ để không bị crash. Em dùng heap dump phân tích bằng công cụ profiling, tìm ra 1 cache tự viết không có cơ chế giới hạn kích thước (unbounded cache) khiến bộ nhớ tăng dần không bao giờ giải phóng. Em sửa bằng cách giới hạn kích thước cache và thêm TTL (thời gian sống) cho từng entry.

**Việt:** Rất cụ thể, cảm ơn Hùng.

### Lab 2 — Vòng case thiết kế

**Việt:** Case lớn: công ty có 3 sản phẩm backend viết bởi 3 team khác nhau, mỗi cái tự implement riêng việc xác thực (authentication) và mỗi cái một kiểu, có chỗ còn lỗi bảo mật cũ. Em thiết kế giải pháp thế nào?

**Hùng:** Dạ em sẽ tách logic xác thực thành 1 service dùng chung hoặc 1 thư viện nội bộ (tuỳ mức độ sẵn sàng tách service thật), chuẩn hoá theo 1 cơ chế đã được duyệt bảo mật (ví dụ JWT với thời gian sống ngắn + refresh token, lưu đúng cách). Khi có lỗ hổng, chỉ cần vá 1 nơi và các sản phẩm nâng version thay vì sửa 3 lần riêng lẻ.

**Việt:** Nếu 1 team dùng kiến trúc quá khác, chưa migrate ngay được, em xử lý sao?

**Hùng:** Dạ em vá lỗ hổng cụ thể ở sản phẩm đó trước (ngắn hạn, ưu tiên an toàn), đồng thời lên lộ trình migrate dần có deadline rõ ràng (dài hạn), không để "từ từ" kéo dài vô thời hạn.

**Việt:** Cân bằng hợp lý. Em trình bày quyết định này cho các team bằng hình thức nào?

**Hùng:** Dạ em viết tài liệu ngắn kiểu ADR nêu bối cảnh, các lựa chọn đã cân nhắc, quyết định cuối và lý do, để sau này không phải giải thích lại từ đầu.

### Lab 3 — Vòng hành vi & lãnh đạo

**Việt:** Kể anh nghe một lần em hoà giải bất đồng giữa 2 thành viên team.

**Hùng:** Dạ có 2 bạn tranh cãi về việc nên dùng REST hay message queue (bất đồng bộ) cho 1 luồng xử lý. Em tổ chức 1 buổi ngắn để cả 2 trình bày lý do, cùng liệt kê ràng buộc thực tế (có cần phản hồi ngay cho user không, có chấp nhận xử lý trễ vài giây không), từ đó cả 2 tự thống nhất được hướng đi dựa trên tiêu chí cụ thể thay vì ai thuyết phục hơn.

**Việt:** Em tham gia phỏng vấn tuyển dụng chưa?

**Hùng:** Dạ em có tham gia vòng kỹ thuật cho ứng viên Junior/Middle, tập trung xem cách tư duy hơn là chỉ đúng/sai.

**Việt:** Cảm ơn Hùng, cảm ơn em đã dành thời gian.

**Góc nhìn người chấm (Senior·V3):** Hùng cho thấy tư duy hệ thống cấp cao — giải pháp xác thực dùng chung có lộ trình cụ thể, xử lý mâu thuẫn bằng **tiêu chí chung** thay vì phân xử đúng/sai, và kinh nghiệm điều tra sự cố production bằng công cụ đúng (heap dump) chứ không đoán mò.

---

## Specialist · Vùng 1

> Từ "chuyên gia kỹ thuật" sang **người ra quyết định công nghệ cấp đơn vị**. Ứng viên **Yến** phỏng vấn cho vị trí Principal Engineer/Head of Backend. Người phỏng vấn: **anh Kiên**, Director of Engineering.

### Lab 1 — Vòng kỹ thuật & chiến lược công nghệ

**Kiên:** Chào Yến, anh Kiên đây. Em có quy trình gì để đánh giá công nghệ mới trước khi đưa vào dùng thật?

**Yến:** Dạ em làm prototype nhỏ kiểm chứng đúng vấn đề trước, đánh giá chi phí vận hành lâu dài (cộng đồng, tần suất breaking change), rồi thử ở 1 phần không quan trọng trước khi áp dụng rộng.

**Kiên:** Em có cách giám sát hiệu năng hệ thống chủ động ở production không?

**Yến:** Dạ em thiết lập APM để theo dõi latency, tỷ lệ lỗi, và tài nguyên (CPU/memory) theo thời gian thực, đặt cảnh báo tự động khi vượt ngưỡng sau mỗi lần deploy, thay vì đợi user báo cáo.

**Kiên:** Em đảm bảo yêu cầu phi chức năng (NFR) ở tầng backend bằng cách nào?

**Yến:** Dạ em đưa các yêu cầu như khả năng mở rộng, bảo mật thành checklist bắt buộc trong review kiến trúc trước khi 1 tính năng lớn được duyệt.

### Lab 2 — Vòng case chiến lược công nghệ

**Kiên:** Case: ban lãnh đạo cân nhắc chuyển 1 phần hệ thống sang kiến trúc serverless, trong khi hiện tại toàn bộ chạy trên server truyền thống. Em tư vấn thế nào?

**Yến:** Dạ em sẽ không quyết định theo trào lưu. Em xem xét: phần nào của hệ thống có traffic không đều (phù hợp serverless — trả tiền theo lượt gọi), phần nào chạy liên tục ổn định (server truyền thống vẫn rẻ hơn), và chi phí vận hành thêm 1 kiểu hạ tầng mới (đội ngũ có kỹ năng serverless chưa, công cụ giám sát có hỗ trợ tốt không).

**Kiên:** Giả sử có 1 job xử lý batch dữ liệu ban đêm, ít khi chạy nhưng khi chạy cần nhiều tài nguyên. Em quyết định thế nào?

**Yến:** Dạ đây là ứng viên tốt cho serverless — traffic không đều, chạy ngắn rồi kết thúc, trả tiền theo lượt chạy sẽ rẻ hơn giữ 1 server chạy 24/7 chỉ để phục vụ vài giờ ban đêm.

**Kiên:** Tốt, quyết định dựa trên đặc điểm tải thực tế chứ không cảm tính.

### Lab 3 — Vòng hành vi, đào tạo & tuyển dụng

**Kiên:** Em từng xây quy trình đào tạo bài bản cho cả đội chưa?

**Yến:** Dạ em xây lộ trình onboarding cho BE dev mới — tuần đầu đọc kiến trúc + sửa 1 bug nhỏ có hướng dẫn, tuần 2 làm 1 API nhỏ có review sát, đánh giá theo checklist năng lực rõ ràng.

**Kiên:** Em tham gia tuyển dụng ở mức nào?

**Yến:** Dạ em mới phỏng vấn kỹ thuật cho vị trí Senior trở xuống, chưa được giao quyết định cuối cho vị trí cấp cao.

**Kiên:** Cảm ơn Yến, rõ ràng và biết giới hạn hiện tại.

**Góc nhìn người chấm (Specialist·V1):** Yến nhìn quyết định công nghệ (serverless) dựa trên **đặc điểm tải thực tế và chi phí vận hành dài hạn**, không theo trào lưu — đúng bản chất Specialist.

---

## Specialist · Vùng 2

> Ứng viên **Đạt Anh** phỏng vấn vị trí Head of Backend tại một tập đoàn lớn hơn. Người phỏng vấn: **chị Lan**, CTO.

### Lab 1 — Vòng kỹ thuật & giám sát hệ thống

**Lan:** Chào Đạt Anh, chị Lan đây. Em xây hệ thống giám sát chung cho nhiều sản phẩm backend thế nào?

**Đạt Anh:** Dạ em chuẩn hoá 1 bộ dashboard chung — mọi service báo cáo latency, tỷ lệ lỗi, tài nguyên vào cùng 1 hệ thống giám sát trung tâm, giúp so sánh service nào lệch chuẩn để phát hiện vấn đề hệ thống thay vì chỉ cục bộ.

**Lan:** Em có ví dụ về xây framework/nền tảng dùng chung giúp tăng tốc các team khác không?

**Đạt Anh:** Dạ em xây 1 starter template Spring Boot nội bộ, đã cấu hình sẵn logging chuẩn, health check, kết nối CSDL theo chuẩn bảo mật công ty — dev mới chỉ cần clone và code nghiệp vụ, không phải tự thiết lập lại từ đầu mỗi lần tạo service mới.

**Lan:** Rất thực tế.

### Lab 2 — Vòng case xây dựng nền tảng dùng chung

**Lan:** Case: 5 sản phẩm, mỗi cái tự implement lại xác thực khác nhau, có sản phẩm còn lỗi bảo mật cũ. Em xây giải pháp nền tảng dùng chung thế nào?

**Đạt Anh:** Dạ em tách xác thực thành 1 service/thư viện dùng chung, đóng gói pattern bảo mật đã duyệt. Khi phát hiện lỗ hổng, chỉ vá 1 chỗ và nâng version, không sửa 5 lần.

**Lan:** Nếu 1 sản phẩm cũ không thể áp ngay, em xử lý sao?

**Đạt Anh:** Dạ vá lỗ hổng cụ thể ở sản phẩm đó trước, đồng thời lên lộ trình migrate dần có deadline, không để kéo dài vô thời hạn.

### Lab 3 — Vòng hành vi & quản lý dự án

**Lan:** Em quản lý 1 dự án gấp liên quan nhiều team backend chưa?

**Đạt Anh:** Dạ có, ra mắt tính năng lớn cần 3 team backend đồng bộ 1 phần API chung. Em tổ chức lên kế hoạch chung từ đầu, chia rõ phần độc lập/phần cần đồng bộ, và check-in ngắn hàng ngày để phát hiện sớm ai bị chặn bởi team khác.

**Lan:** Kết quả?

**Đạt Anh:** Dạ ra mắt đúng hạn, 1 team chậm 1 ngày nhưng phát hiện sớm nên các team khác kịp điều chỉnh, không vỡ dây chuyền.

**Lan:** Cảm ơn Đạt Anh.

**Góc nhìn người chấm (Specialist·V2):** Đạt Anh xây **đòn bẩy cho cả đơn vị** (starter template, service xác thực dùng chung) và **phát hiện rủi ro sớm qua cơ chế** (check-in hàng ngày) thay vì chỉ hy vọng suôn sẻ.

---

## Specialist · Vùng 3

> Vùng cuối cùng của toàn bộ thang BE (10/10). Ứng viên **Sang** phỏng vấn vị trí Head of Backend/Principal Engineer cấp tập đoàn. Người phỏng vấn: **anh Minh**, VP Engineering.

### Lab 1 — Vòng nghiên cứu & phát triển công nghệ (R&D)

**Minh:** Chào Sang, anh Minh đây. Em từng dẫn dắt đánh giá và áp dụng 1 công nghệ hoàn toàn mới ở quy mô lớn chưa?

**Sang:** Dạ có, em dẫn dắt việc đánh giá chuyển 1 phần hệ thống sang kiến trúc event-driven (dùng message queue) thay vì gọi đồng bộ trực tiếp giữa các service. Em lập tiêu chí: độ phức tạp vận hành thêm (cần theo dõi message, xử lý message trùng/mất), độ trễ chấp nhận được của nghiệp vụ, và khả năng đội ngũ vận hành hệ thống phân tán.

**Minh:** Kết quả và bài học?

**Sang:** Dạ áp dụng thành công cho các luồng không cần phản hồi ngay (như gửi thông báo, đồng bộ dữ liệu báo cáo), nhưng em không áp dụng cho các luồng cần phản hồi tức thì (như xác nhận thanh toán) — bài học là chọn lọc đúng chỗ cần, không áp dụng đại trà vì "công nghệ mới nghe hay".

### Lab 2 — Vòng case sở hữu Tech Stack & đảm bảo NFR toàn đơn vị

**Minh:** Case lớn: chuẩn hoá Tech Stack cho 8 sản phẩm backend của tập đoàn, hiện dùng 3 ngôn ngữ/framework khác nhau. Em tiếp cận thế nào?

**Sang:** Dạ em không ép đổi hết ngay — chi phí và rủi ro quá lớn. Em chọn 1 stack chuẩn cho **mọi sản phẩm mới** từ thời điểm quyết định, phân loại 3 stack cũ theo mức độ hoạt động (sắp deprecate thì giữ nguyên, còn phát triển lâu dài thì lên lộ trình migrate dần), và đảm bảo NFR tối thiểu (bảo mật, khả năng chịu tải) là bắt buộc cho MỌI sản phẩm bất kể stack, không thương lượng.

**Minh:** Nếu 1 team phản đối vì đã đầu tư nhiều vào stack cũ, em xử lý sao?

**Sang:** Dạ em lắng nghe lý do cụ thể, nếu chính đáng thì kéo dài lộ trình cho team đó, nhưng minh bạch rằng đây là quyết định chiến lược cấp cao nhất — chỉ đàm phán được tốc độ, không đàm phán hướng đi.

### Lab 3 — Vòng quản lý dự án & xây dựng đội ngũ cấp đơn vị

**Minh:** Em xây quy trình đào tạo & đánh giá đội ngũ ở quy mô toàn đơn vị thế nào?

**Sang:** Dạ em xây khung năng lực áp dụng cho mọi BE dev trong đơn vị, chia theo cấp độ rõ ràng kèm minh chứng cụ thể, để 1 dev Senior ở team A được đánh giá cùng tiêu chuẩn với team B.

**Minh:** Em quản lý ưu tiên giữa nhiều team, nhiều deadline chồng chéo thế nào?

**Sang:** Dạ em duy trì 1 roadmap ưu tiên cấp đơn vị, để khi có 2 việc gấp cùng lúc, quyết định ưu tiên dựa trên mức độ ảnh hưởng đã thống nhất từ trước, không dựa vào tiếng nói to nhất trong phòng họp.

**Minh:** Cảm ơn Sang, buổi trao đổi rất giá trị.

**Góc nhìn người chấm (Specialist·V3 — đỉnh toàn thang):** Sang thể hiện tư duy tầm cao nhất — mọi quyết định (event-driven, chuẩn hoá Tech Stack, ưu tiên dự án) đều **có chọn lọc, có lộ trình, phân biệt rõ cái gì thương lượng được / cái gì là ranh giới cứng** (NFR bắt buộc, hướng chiến lược đã chốt) — đúng bản chất người **thiết kế cách cả một đơn vị lớn cùng vận hành nhất quán**.
