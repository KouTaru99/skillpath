# Lab phỏng vấn — Kiểm thử (Tester)

> Đây không phải đề cương ôn tập — là **kịch bản thoại thật** của các buổi phỏng vấn, viết theo đúng vùng năng lực bạn đang ở. Từ Junior đến Experienced·V1, mỗi vùng mô phỏng **1 buổi phỏng vấn trọn vẹn**. Từ Experienced·V2 trở lên, buổi phỏng vấn thật thường **tách thành nhiều vòng riêng** — nên mỗi vùng có 3 lab, mỗi lab mô phỏng đúng 1 vòng: **kỹ thuật sâu**, **case thực chiến**, **hành vi & lãnh đạo**. Bối cảnh xuyên suốt: tuyển Tester cho các sản phẩm **giám sát an ninh mạng nội bộ** — khớp với bối cảnh ví dụ ở các trang kỹ năng.

---

## Junior

### Lab — Phỏng vấn Tester fresher / mới vào nghề

**Bối cảnh:** phỏng vấn vị trí Tester fresher tại một trung tâm sản phẩm an ninh mạng. Online, 30 phút. Người phỏng vấn: **chị Hà**, Test Lead 5 năm kinh nghiệm, phỏng vấn ứng viên **Trang** — mới học xong khoá tester 3 tháng, chưa đi làm chính thức.

**Hà:** Chào Trang, chị Hà đây. Mình nói chuyện thoải mái nhé. Em học kiểm thử ở đâu, và đã thực hành trên sản phẩm nào chưa?

**Trang:** Dạ chào chị. Em học khoá tester cơ bản 3 tháng, đồ án cuối khoá là kiểm thử một trang web bán hàng mẫu ạ — em viết test case cho chức năng đăng ký, đăng nhập và giỏ hàng.

**Hà:** Ok. Vậy em nói chị nghe, một test case gồm những thành phần gì?

**Trang:** Dạ, một test case thường có: mã test case, tiêu đề, điều kiện tiên quyết, các bước thực hiện, dữ liệu kiểm thử, kết quả mong đợi, và kết quả thực tế khi chạy ạ.

**Hà:** Đúng rồi. Giả sử chị đưa em màn hình đăng nhập — chỉ có ô tài khoản, ô mật khẩu, nút Đăng nhập. Em thử liệt kê nhanh vài test case em sẽ viết.

**Trang:** Dạ: đăng nhập đúng tài khoản đúng mật khẩu thì vào được hệ thống; sai mật khẩu thì báo lỗi; bỏ trống tài khoản thì báo bắt buộc nhập; bỏ trống mật khẩu tương tự; nhập mật khẩu sai quá nhiều lần thì... em nghĩ là nên khoá tạm, nhưng cái này phải xem tài liệu yêu cầu có quy định không ạ.

**Hà:** Câu cuối trả lời tốt đó — đúng là phải bám tài liệu yêu cầu chứ không tự đoán. Em có biết kỹ thuật phân vùng tương đương (equivalence partitioning) không?

**Trang:** Dạ có học ạ. Là mình chia dữ liệu đầu vào thành các nhóm mà hệ thống xử lý giống nhau, rồi mỗi nhóm chỉ cần test đại diện 1 giá trị thay vì test hết. Ví dụ ô nhập tuổi cho phép 18–60 thì chia 3 vùng: dưới 18, từ 18 đến 60, trên 60 — mỗi vùng lấy 1 giá trị test.

**Hà:** Được. Thế còn giá trị biên (boundary value)?

**Trang:** Dạ là test thêm các giá trị ở ranh giới các vùng, vì lỗi hay xảy ra ở biên — với ví dụ trên là 17, 18, 60, 61 ạ.

**Hà:** Chuẩn. Giờ sang bug nhé. Em tìm được một lỗi, em báo cáo lỗi đó như thế nào để dev sửa được nhanh nhất?

**Trang:** Dạ em ghi vào công cụ quản lý lỗi — ở khoá học em dùng Jira ạ. Một bug report em ghi: tiêu đề ngắn gọn mô tả lỗi, các bước tái hiện, kết quả thực tế, kết quả mong đợi, môi trường (trình duyệt, phiên bản), và chụp màn hình hoặc quay video kèm theo.

**Hà:** Nếu dev trả lại bảo "máy anh chạy bình thường" thì em làm gì?

**Trang:** [suy nghĩ] Dạ... em sẽ thử tái hiện lại trên máy em xem lỗi còn không, chụp lại video đầy đủ các bước, và ghi rõ hơn môi trường với dữ liệu em dùng. Nếu vẫn tái hiện được thì em nhờ dev xem cùng trực tiếp ạ.

**Hà:** Tốt. Em có biết vòng đời của một bug (Bug Life Cycle) không?

**Trang:** Dạ, bug mới tạo là New, được xác nhận thì Open/Assigned cho dev, dev sửa xong chuyển Fixed, tester test lại — nếu ổn thì Closed, nếu vẫn lỗi thì Reopen ạ.

**Hà:** Ừ. Câu về SQL nhé — sản phẩm bên chị có cơ sở dữ liệu, tester đôi khi phải tự kiểm tra dữ liệu. Em viết được câu lệnh lấy các cảnh báo có mức độ "cao" từ bảng `alerts` không?

**Trang:** Dạ được ạ:

```sql
SELECT * FROM alerts WHERE severity = 'high';
```

**Hà:** Nếu chị muốn đếm xem có bao nhiêu cảnh báo mức cao?

**Trang:** Dạ dùng `SELECT COUNT(*) FROM alerts WHERE severity = 'high';` ạ.

**Hà:** Ok, mức bảng đơn vậy là đủ cho fresher. Hai câu cuối — em hiểu Scrum vận hành thế nào, và tester tham gia vào đâu?

**Trang:** Dạ, team làm việc theo sprint khoảng 2 tuần, có họp daily mỗi sáng, cuối sprint có demo và họp rút kinh nghiệm. Tester tham gia từ lúc đọc yêu cầu để viết test case, chứ không phải đợi dev code xong mới bắt đầu ạ — cái này em được dạy là "test sớm".

**Hà:** Đúng tinh thần rồi. Cuối cùng: vì sao em chọn nghề kiểm thử, giữa lúc nhiều bạn chọn học code?

**Trang:** Dạ em thấy mình có tính cẩn thận, thích "bới" ra chỗ sai, và em thích cảm giác chặn được lỗi trước khi nó đến tay người dùng ạ. Em cũng xác định sẽ học thêm SQL và kiểm thử API để đi xa hơn.

**Hà:** Tốt. Cảm ơn Trang, em có câu hỏi gì cho chị không?

**Trang:** Dạ, sản phẩm bên mình là về an ninh mạng — tester mới như em có được đào tạo thêm về nghiệp vụ đó không ạ?

**Hà:** Có, vào sẽ có người kèm và tài liệu nghiệp vụ riêng. Chào em nhé.

**Góc nhìn người chấm (Junior):** với fresher, tín hiệu quan trọng nhất là **nắm chắc khái niệm lõi** (test case đủ thành phần, phân vùng tương đương + biên nói được ví dụ, Bug Life Cycle) và **phản xạ bám tài liệu yêu cầu thay vì tự đoán** ("phải xem tài liệu có quy định không"). SQL chỉ cần mức bảng đơn. Điểm cộng lớn của Trang: cách xử lý tình huống "máy anh chạy bình thường" — bình tĩnh tái hiện + bổ sung bằng chứng, không đôi co.

---

## Experienced · Vùng 1

### Lab — Phỏng vấn Tester lên chính thức sau giai đoạn Junior

**Bối cảnh:** ứng viên **Minh** (~1,5 năm kinh nghiệm) phỏng vấn vị trí Tester chính thức cho sản phẩm giám sát an ninh mạng nội bộ. Người phỏng vấn: **anh Tuấn**, Senior Tester. 45 phút, một buổi trọn.

**Tuấn:** Chào Minh. Em đang test sản phẩm gì, và mô tả nhanh nghiệp vụ chính của nó?

**Minh:** Dạ em test một hệ thống quản lý tài sản nội bộ ạ. Nghiệp vụ chính là nhập tài sản, cấp phát cho nhân viên, thu hồi và kiểm kê định kỳ. Em nắm được luồng chính và các trạng thái của một tài sản trong hệ thống.

**Tuấn:** Ok. Em phân biệt giúp anh các mức độ kiểm thử: component, integration, system, acceptance — và trong dự án em, em tham gia mức nào?

**Minh:** Dạ. Component test là test từng phần riêng lẻ, thường dev tự làm bằng unit test. Integration test là test các phần ghép lại với nhau — ví dụ màn hình cấp phát gọi đúng API và dữ liệu lưu xuống đúng. System test là test toàn hệ thống từ góc nhìn người dùng cuối, đủ luồng nghiệp vụ. Acceptance là khách hàng hoặc người đại diện nghiệm thu trước khi chấp nhận. Em chủ yếu làm system test, và một phần integration khi kiểm tra API với dữ liệu DB ạ.

**Tuấn:** Được. Sản phẩm bên anh giao tiếp nhiều qua API. Em hiểu gì về HTTP — ví dụ các mã trạng thái hay gặp?

**Minh:** Dạ, `200` là thành công, `201` là tạo mới thành công, `400` là request sai định dạng hoặc thiếu tham số, `401` là chưa xác thực, `403` là không có quyền, `404` không tìm thấy, `500` là lỗi phía server ạ. Khi test em hay để ý: lỗi nghiệp vụ mà trả `500` là dev xử lý thiếu, đúng ra phải trả `4xx` với thông báo rõ.

**Tuấn:** Điểm để ý đó tốt. Giờ một tình huống: anh giao em test chức năng "gán cảnh báo cho cán bộ xử lý" trong 2 ngày. Em ước lượng và báo lại thế nào?

**Minh:** Dạ em sẽ đọc tài liệu yêu cầu trước, đếm sơ các luồng: gán mới, gán lại, gán khi cảnh báo đã đóng, phân quyền ai được gán. Em nhẩm số test case, cộng thời gian chuẩn bị dữ liệu và báo cáo. Nếu em thấy 2 ngày không đủ — ví dụ phát sinh phần phân quyền phức tạp — em sẽ báo sớm với anh kèm lý do, đề xuất hoặc thêm thời gian hoặc ưu tiên luồng chính trước, chứ không im lặng đến hạn mới nói ạ.

**Tuấn:** Ừ, báo sớm là điều anh cần. Làm bài nhỏ nhé, anh share màn hình. Đây là bảng `alerts(id, severity, status, assigned_to, created_at)`. Em viết câu SQL lấy các cảnh báo mức `high` chưa được gán cho ai.

**Minh:** Dạ:

```sql
SELECT id, severity, status, created_at
FROM alerts
WHERE severity = 'high' AND assigned_to IS NULL;
```

Em lưu ý dùng `IS NULL` chứ không phải `= NULL` ạ, vì so sánh với NULL bằng dấu bằng sẽ không ra kết quả.

**Tuấn:** Đúng chỗ hay sai đấy. Câu hành vi cuối: kể anh nghe một lần em phát hiện tài liệu yêu cầu mô tả không rõ và em xử lý thế nào.

**Minh:** Dạ có lần yêu cầu ghi "hệ thống gửi thông báo khi có cảnh báo mới" nhưng không nói gửi cho ai, kênh nào. Em hỏi lại BA trước khi viết test case, và đề nghị bổ sung vào tài liệu để dev với tester hiểu giống nhau. Nếu em cứ tự đoán thì test case của em với code của dev có thể lệch nhau ạ.

**Tuấn:** Tốt. Cảm ơn Minh, em hỏi gì anh không?

**Minh:** Dạ, bên mình tester có được tiếp cận môi trường DB và log để tự kiểm tra dữ liệu không ạ, hay chỉ test qua giao diện?

**Tuấn:** Có tài khoản đọc riêng cho tester — hỏi đúng thứ nghề đấy. Chào em.

**Góc nhìn người chấm (Ex·V1):** khác biệt so với Junior nằm ở **độ chủ động**: hiểu HTTP đủ để nhận xét "lỗi nghiệp vụ trả 500 là sai", biết ước lượng task được giao và **báo sớm khi lệch**, hỏi lại BA khi yêu cầu mơ hồ thay vì tự đoán. SQL thêm được điểm `IS NULL` — đúng mức "nâng lên một bậc" so với bảng đơn thuần tuý.

---

## Experienced · Vùng 2

> Từ vùng này, phỏng vấn tách thành 3 vòng riêng. Ứng viên **Ngân** (~2,5 năm) phỏng vấn Tester cho dòng sản phẩm giám sát an ninh mạng. Người phỏng vấn: **chị Vân**, Test Lead.

### Lab 1 — Vòng kỹ thuật sâu (~25 phút)

**Vân:** Chào Ngân. Em nói chị nghe các kỹ thuật thiết kế test em dùng thành thạo, và khi nào dùng cái nào?

**Ngân:** Dạ, phân vùng tương đương và giá trị biên em dùng hằng ngày cho các ô nhập liệu và tham số API. Bảng quyết định (decision table) em dùng khi chức năng có nhiều điều kiện kết hợp — ví dụ quyền xem cảnh báo phụ thuộc cả vai trò lẫn đơn vị của người dùng, em kẻ bảng để không sót tổ hợp. Chuyển trạng thái (state transition) em dùng cho vòng đời cảnh báo: Mới → Đang xử lý → Đã xử lý → Đóng, test cả các bước chuyển không hợp lệ. Ngoài ra em có dùng error guessing dựa trên kinh nghiệm — ví dụ cứ chỗ nào upload file là em thử file rỗng, file sai định dạng, tên file có ký tự đặc biệt.

**Vân:** Em bắt đầu test API bằng công cụ rồi đúng không? Mô tả cách em test một API.

**Ngân:** Dạ em mới dùng Postman ở mức bắt đầu ạ. Em tạo collection theo chức năng, mỗi request em kiểm tra mã trạng thái, và viết assertion đơn giản kiểm tra nội dung trả về, ví dụ:

```javascript
pm.test("Status 200", () => pm.response.to.have.status(200));
pm.test("Tra ve danh sach canh bao", () => {
  const body = pm.response.json();
  pm.expect(body.items).to.be.an('array');
});
```

Em chưa tự xây framework tự động hoá — mức hiện tại của em là dùng công cụ có sẵn để test nhanh và test lại (regression) các API chính ạ.

**Vân:** Thành thật, tốt. SQL — bảng `alerts` và bảng `users(id, name, unit)`. Lấy danh sách tên cán bộ kèm số cảnh báo đang xử lý của từng người.

**Ngân:** Dạ:

```sql
SELECT u.name, COUNT(a.id) AS dang_xu_ly
FROM users u
JOIN alerts a ON a.assigned_to = u.id
WHERE a.status = 'processing'
GROUP BY u.name;
```

Nếu muốn hiện cả cán bộ không có cảnh báo nào thì đổi `JOIN` thành `LEFT JOIN` và điều kiện status chuyển lên `ON` ạ, vì để ở `WHERE` sẽ loại mất các dòng NULL.

**Vân:** Chuẩn — nhiều bạn 3 năm vẫn sai chỗ đó. Cảm ơn em.

### Lab 2 — Vòng case thực chiến (~20 phút)

**Vân:** Case thật của bên chị: màn hình danh sách cảnh báo có bộ lọc theo mức độ, trạng thái, khoảng thời gian, và ô tìm kiếm theo địa chỉ IP. Dev vừa báo xong. Em test màn này thế nào?

**Ngân:** Dạ, trước hết em đọc lại đặc tả xem từng bộ lọc định nghĩa thế nào — ví dụ khoảng thời gian là theo thời điểm tạo hay thời điểm cập nhật cảnh báo. Em từng gặp tranh cãi đúng chỗ này nên giờ em hỏi trước. Sau đó em chia: test từng bộ lọc riêng; test kết hợp các bộ lọc — chỗ này dùng pairwise thay vì thử hết mọi tổ hợp vì 4 điều kiện nhân lên rất nhiều; test ô tìm IP với dữ liệu hợp lệ, IP không tồn tại, chuỗi không phải IP, và IP dạng IPv6 nếu đặc tả có hỗ trợ. Cuối cùng em kiểm tra phân trang giữ bộ lọc khi chuyển trang — lỗi kinh điển là sang trang 2 thì mất filter.

**Vân:** Nếu đặc tả không nói gì về IPv6 thì em làm gì?

**Ngân:** Dạ em không tự quyết — em hỏi lại BA/PO và ghi thành câu hỏi mở trong tài liệu test. Vì sản phẩm an ninh mạng mà bỏ sót IPv6 có thể là lỗ hổng nghiệp vụ thật, nhưng thêm hỗ trợ IPv6 cũng là quyết định phạm vi, không phải tester tự thêm ạ.

**Vân:** Em phản biện đặc tả bao giờ chưa — kể một lần cụ thể.

**Ngân:** Dạ rồi. Đặc tả ghi "cảnh báo đã đóng thì không cho mở lại". Em phản biện: nếu cán bộ đóng nhầm thì sao? Vận hành thật chắc chắn có thao tác nhầm. Sau khi trao đổi, BA bổ sung luồng "mở lại trong 24 giờ, có ghi log ai mở". Em thấy vai trò tester không chỉ tìm bug trong code, mà tìm cả lỗ hổng trong yêu cầu ạ.

**Vân:** Ví dụ đúng ý chị muốn nghe. Cảm ơn em.

### Lab 3 — Vòng hành vi (~15 phút)

**Vân:** Kể chị nghe lần gần nhất em bị dev từ chối bug với lý do "làm đúng theo đặc tả".

**Ngân:** Dạ có — nút xuất báo cáo cho phép bấm liên tục, mỗi lần bấm sinh một file, người dùng bấm 5 lần ra 5 file trùng nhau. Dev nói đặc tả không cấm. Em không cãi tay đôi mà đưa case này ra buổi trao đổi 3 bên với BA, kèm video thao tác thật. BA đồng ý đây là lỗi trải nghiệm và bổ sung yêu cầu chặn double-click. Em rút ra là: khi bug nằm ở vùng xám của đặc tả thì người phân xử là BA/PO, việc của em là đưa bằng chứng rõ ràng ạ.

**Vân:** Nếu cuối sprint còn 40 test case chưa chạy mà chỉ còn 1 ngày, em làm gì?

**Ngân:** Dạ em ưu tiên theo rủi ro: các luồng chính và phần code mới sửa chạy trước, phần ít thay đổi và mức độ ảnh hưởng thấp em dồn lại sau. Quan trọng là em báo rõ cho lead: những gì đã chạy, những gì chưa và rủi ro của phần chưa chạy — để quyết định release là quyết định có thông tin, chứ em không lặng lẽ bỏ bớt ạ.

**Vân:** Tốt. Cảm ơn Ngân.

**Góc nhìn người chấm (Ex·V2):** tín hiệu đạt vùng này: kỹ thuật thiết kế test **kể được khi-nào-dùng-cái-nào kèm ví dụ thật** (không đọc thuộc định nghĩa), SQL vững JOIN/GROUP BY và hiểu bẫy LEFT JOIN + WHERE, API testing ở mức **dùng công cụ có sẵn** (thành thật không nhận là biết xây framework), và đặc biệt là **phản biện đặc tả có kết quả cụ thể** — đây là ranh giới giữa "chạy test case" và "làm nghề kiểm thử".

---

## Experienced · Vùng 3

> Đỉnh của Experienced. Ứng viên **Phúc** (~3,5 năm) phỏng vấn vùng Ex·V3 — chuẩn bị được giao ước lượng cho cả dự án. Người phỏng vấn: **anh Sơn**, Test Manager.

### Lab 1 — Vòng kỹ thuật sâu (~25 phút)

**Sơn:** Chào Phúc. Em đang tự động hoá kiểm thử đến mức nào rồi?

**Phúc:** Dạ em dùng Postman + Newman chạy bộ regression API theo lịch hằng đêm ạ — khoảng 120 request cho các luồng chính, có assertion về mã trạng thái, schema và một số giá trị nghiệp vụ. Với web UI em dùng Katalon ở mức xây test case từ ghi lại rồi chỉnh — em xác định rõ mức của em là **vận hành và mở rộng bộ test bằng công cụ**, chưa phải người thiết kế framework tự động hoá từ đầu.

**Sơn:** Bộ chạy đêm đó đã bắt được lỗi thật nào chưa?

**Phúc:** Dạ có — một lần dev refactor API danh sách cảnh báo, đổi tên trường `createdAt` thành `created_at` mà không báo. Sáng hôm sau bộ Newman đỏ 14 request do assertion schema, em báo trước khi bản đó lên môi trường staging. Nếu chỉ test tay theo sprint thì lỗi này lọt rất dễ vì giao diện vẫn hiển thị được một phần.

**Sơn:** Ví dụ thuyết phục. SQL nâng cao chút: bảng `alerts` thêm cột `resolved_at`. Tính thời gian xử lý trung bình theo từng mức độ, chỉ tính cảnh báo đã đóng trong tháng này.

**Phúc:** Dạ:

```sql
SELECT severity,
       AVG(resolved_at - created_at) AS avg_xu_ly
FROM alerts
WHERE status = 'closed'
  AND resolved_at >= date_trunc('month', CURRENT_DATE)
GROUP BY severity
ORDER BY severity;
```

Em hay dùng dạng truy vấn này để đối chiếu số liệu báo cáo trên màn hình thống kê với dữ liệu gốc — báo cáo sai công thức là loại bug khó nhìn thấy bằng mắt nhất ạ.

**Sơn:** Đúng nghề. Cảm ơn em.

### Lab 2 — Vòng case thực chiến (~30 phút)

**Sơn:** Case: dự án nâng cấp lớn module phân tích log — 3 tính năng mới, sửa 2 luồng cũ, 6 tuần phát triển. Em là tester chính. Lập kế hoạch kiểm thử và ước lượng cho anh.

**Phúc:** Dạ. Trước hết em đọc tài liệu và họp với BA/dev để nắm phạm vi, rồi em chia theo rủi ro: 2 luồng cũ bị sửa em xếp rủi ro cao nhất vì ảnh hưởng người dùng hiện tại — cần cả test mới lẫn regression quanh vùng sửa. 3 tính năng mới em ước theo độ phức tạp: đếm luồng chính/luồng phụ, nhân với hệ số chuẩn bị dữ liệu — module phân tích log thì dựng dữ liệu log giả lập là phần tốn công nhất, em tách riêng đầu việc này. Em ra con số dạng khoảng, ví dụ 18–22 ngày công, kèm giả định: tài liệu chốt trước khi dev xong, môi trường test có sẵn dữ liệu log mẫu. Giả định vỡ thì con số vỡ, em ghi rõ để anh và PM cùng thấy.

**Sơn:** PM ép xuống còn 12 ngày công thì em trả lời thế nào?

**Phúc:** Dạ em không nhận bừa. Em đưa lại 3 phương án kèm rủi ro: một — giữ đủ phạm vi thì cần đủ 18 ngày; hai — 12 ngày thì em ưu tiên 2 luồng cũ + luồng chính của tính năng mới, phần luồng phụ và test thăm dò cắt lại, rủi ro lọt lỗi ở vùng phụ em ghi rõ; ba — giữ phạm vi và thêm 1 tester hỗ trợ phần chuẩn bị dữ liệu. Quyết định cuối là của PM, nhưng phải quyết trên bảng rủi ro nhìn thấy được ạ.

**Sơn:** Nếu giữa chừng dev trễ 1 tuần mà ngày release không đổi, thời gian test bị bóp — em đã gặp chưa và xử thế nào?

**Phúc:** Dạ gặp rồi. Lần đó em chuyển sang test theo build từng phần thay vì đợi bàn giao trọn gói — dev xong tính năng nào em test ngay tính năng đó, song song viết sẵn test case cho phần chưa xong. Đến hạn, phần tồn duy nhất là báo cáo tổng hợp, em khoanh rõ và release có điều kiện: tính năng đó ẩn đi, phát hành sau 1 tuần. Sản phẩm vẫn ra đúng hẹn mà không mang theo phần chưa test ạ.

**Sơn:** Xử lý trưởng thành đó. Cảm ơn em.

### Lab 3 — Vòng hành vi (~20 phút)

**Sơn:** Em từng hướng dẫn bạn tester mới chưa?

**Phúc:** Dạ có, team em có 1 bạn fresher vào 6 tháng trước. Em cho bạn bắt đầu bằng chạy regression theo test case có sẵn để quen sản phẩm, sau đó mới cho viết test case mới và em review. Em rút được một điều: review test case của người mới thì góp ý theo lỗi-pattern — ví dụ bạn hay viết kết quả mong đợi chung chung kiểu "hệ thống hoạt động đúng" — chỉ một lần kèm ví dụ cụ thể là bạn sửa được cả loạt, hiệu quả hơn sửa từng dòng.

**Sơn:** Mâu thuẫn với dev về mức độ nghiêm trọng của bug — kể một lần.

**Phúc:** Dạ, một bug hiển thị sai số liệu thống kê trên dashboard, dev đánh giá nhẹ vì "chỉ là hiển thị". Em phản biện bằng góc nghiệp vụ: dashboard đó lãnh đạo dùng để quyết định phân bổ cán bộ trực — số sai thì quyết định sai, nên với người dùng đây là lỗi nghiêm trọng. Em đề nghị BA phân xử và bug được nâng mức. Em nghĩ tester phải là người nói được **hậu quả nghiệp vụ** của lỗi, không chỉ hiện tượng kỹ thuật ạ.

**Sơn:** Tốt. Cảm ơn Phúc.

**Góc nhìn người chấm (Ex·V3):** vùng này đòi hỏi **ước lượng ở tầm dự án** — ra số dạng khoảng, kèm giả định, và trả lời được khi bị ép tiến độ bằng **phương án + rủi ro** thay vì nhận bừa hoặc từ chối cứng. API testing lên mức ② nghĩa là bộ tự động hoá **chạy đều và đã bắt được lỗi thật**. Câu "dashboard sai thì quyết định sai" là tín hiệu tư duy nghiệp vụ đạt ② — nói được hậu quả, không dừng ở hiện tượng.

---

## Senior · Vùng 1

> Bắt đầu Senior — lần đầu xuất hiện các nhóm mới: **ATTT & kiểm thử chuyên sâu**, **CI/CD cơ bản**, và **quản lý nhóm** (đều ở mức khởi đầu, riêng kiểm thử chuyên sâu theo mảng yêu cầu ③). Ứng viên **Quỳnh** (~5 năm) phỏng vấn lên Senior tại đơn vị sản phẩm an ninh mạng. Người phỏng vấn: **anh Long**, Test Manager. 3 vòng riêng.

### Lab 1 — Vòng kỹ thuật sâu

**Long:** Chào Quỳnh. Em chọn mảng chuyên sâu nào — hiệu năng, bảo mật hay thiết bị?

**Quỳnh:** Dạ hiệu năng ạ. Em dùng JMeter thành thạo: dựng kịch bản theo hành vi thật — đăng nhập, vào dashboard, lọc cảnh báo — chứ không bắn thẳng một API vô nghĩa. Em phân biệt rõ load test (tải dự kiến), stress test (tìm điểm gãy) và soak test (chạy dài tìm rò rỉ tài nguyên). Lần gần nhất em phát hiện API thống kê tụt từ 200ms xuống 4 giây khi 150 người dùng đồng thời — nguyên nhân là truy vấn thiếu index, em đưa số liệu và execution plan cho dev, sau khi thêm index thì còn 300ms.

**Long:** Em đọc execution plan được luôn?

**Quỳnh:** Dạ ở mức nhận ra `Seq Scan` trên bảng lớn và đề nghị dev xem xét index ạ — em không nhận là người tối ưu DB, nhưng đủ để khoanh vùng nguyên nhân thay vì chỉ báo "chậm".

**Long:** Vậy là đúng vai. CI/CD — em hiểu đến đâu?

**Quỳnh:** Dạ mức cơ bản ạ: em hiểu pipeline gồm build → chạy test tự động → deploy lên môi trường; em đọc được log pipeline để biết bộ test API của em fail ở bước nào, và biết vì sao dev nói "merge là tự chạy test". Em chưa tự cấu hình pipeline — em xác định Senior tester cần hiểu để phối hợp, không cần vận hành nó.

**Long:** Đúng kỳ vọng. Còn kiến thức ATTT — em nói thử về các dạng tấn công web hay gặp mà tester cần biết.

**Quỳnh:** Dạ em mới ở mức nhập môn phần này ạ. Em biết SQL injection — chèn câu lệnh SQL qua ô nhập liệu, XSS — chèn script chạy trên trình duyệt người khác, và CSRF — lừa trình duyệt gửi request thay người dùng. Khi test em có thói quen thử các chuỗi như `' OR 1=1--` hay `<script>alert(1)</script>` vào ô nhập, nhưng kiểm thử bảo mật bài bản với công cụ chuyên dụng thì em chưa làm — em đang học thêm vì sản phẩm đơn vị mình là ATTT.

**Long:** Thành thật, được. Cảm ơn em.

### Lab 2 — Vòng case thực chiến

**Long:** Case: sản phẩm giám sát của mình cạnh tranh với 2 sản phẩm khác trên thị trường. Sếp hỏi em: "chất lượng mình so với đối thủ thế nào?" — em trả lời kiểu gì cho có căn cứ?

**Quỳnh:** Dạ em sẽ không trả lời cảm tính. Em dựng bảng so sánh theo tiêu chí đo được: thời gian phát hiện cảnh báo, tỷ lệ cảnh báo giả (false positive), số bước thao tác cho một tác vụ chính, tài nguyên tiêu thụ trên máy được giám sát. Bên mình thì lấy từ số liệu test thật; đối thủ thì từ tài liệu công bố và dùng thử bản trial nếu có. Chỗ nào không có số thì em ghi "chưa đủ dữ liệu" chứ không đoán. Em từng làm bảng dạng này ở mức sơ bộ cho 1 tính năng, đủ để đội sản phẩm quyết định ưu tiên giảm false positive trước ạ.

**Long:** Nếu em phát hiện luồng xử lý cảnh báo của mình mất 7 bước trong khi đối thủ mất 3, em làm gì tiếp?

**Quỳnh:** Dạ em viết đề xuất cải tiến luồng gửi BA/PO: mô tả hiện trạng 7 bước kèm số liệu thời gian thao tác thật, chỉ ra 2 bước có thể gộp và 1 bước có thể mặc định sẵn. Em mới bắt đầu làm việc đề xuất cải tiến kiểu này — trước đây em dừng ở báo bug, giờ em hiểu Senior phải nhìn được cả chỗ "không sai nhưng chưa tốt" ạ.

**Long:** Đúng hướng. Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Long:** Em đã review kịch bản kiểm thử cho người khác chưa?

**Quỳnh:** Dạ mới bắt đầu ạ — em review test case của 2 bạn junior trong team hiện tại. Em ưu tiên xem độ phủ luồng nghiệp vụ có sót không và kết quả mong đợi có đo được không. Em chưa dám nhận là review sắc — có lần em bỏ lọt một nhánh phân quyền mà bạn tester khác nhìn ra. Em đang tự xây checklist review để đỡ phụ thuộc trí nhớ.

**Long:** Nếu được giao phụ trách nhóm 4 bạn tester, việc đầu tiên em làm là gì?

**Quỳnh:** Dạ em nói chuyện riêng với từng bạn trước — nắm điểm mạnh, điểm muốn phát triển — rồi mới chia việc theo cả năng lực lẫn nguyện vọng. Em chưa quản nhóm chính thức bao giờ, nhưng em từng điều phối 2 bạn trong một đợt release gấp và thấy rõ: chia việc sai người thì mình đi sửa còn mệt hơn tự làm ạ.

**Long:** Nhận thức vậy là đủ cho điểm bắt đầu. Cảm ơn Quỳnh.

**Góc nhìn người chấm (Senior·V1):** khuôn chấm giống Dev lên Senior: mảng chuyên sâu phải **thành thạo thật** (③ — JMeter kể được case có số liệu, đọc được execution plan ở mức khoanh vùng), còn các kỹ năng mới (CI/CD, ATTT, review, quản nhóm) chỉ cần **nhập môn + nhận thức đúng ranh giới** ("chưa tự cấu hình pipeline", "review từng bỏ lọt"). Ứng viên cố tỏ ra giỏi đều các mảng mới lại là tín hiệu xấu.

---

## Senior · Vùng 2

> Đã vững vai Senior. Ứng viên **Dũng** phỏng vấn chuyển đơn vị ở vùng Senior·V2. Người phỏng vấn: **chị Yến**, Trưởng phòng Chất lượng.

### Lab 1 — Vòng kỹ thuật sâu

**Yến:** Chào Dũng. Chị hỏi thẳng mảng rủi ro chất lượng: em đánh giá rủi ro của một bản release thế nào?

**Dũng:** Dạ em làm ma trận rủi ro trước mỗi release: liệt kê các vùng thay đổi, chấm 2 trục — xác suất lỗi (dựa trên độ phức tạp thay đổi và lịch sử lỗi của module đó) và mức ảnh hưởng nghiệp vụ. Vùng nào rơi vào ô cao-cao thì test dày nhất và bắt buộc có người thứ hai kiểm chéo. Em còn theo dõi số liệu sau release: bug lọt ra môi trường thật của 3 bản gần nhất tập trung 70% ở module thu thập log — đó là căn cứ để em đề xuất tái cấu trúc bộ regression, dồn thêm case cho module đó thay vì chia đều.

**Yến:** Có số liệu hậu kiểm là điểm chị thích. ATTT thì sao — em tiến bộ gì so với lúc mới lên Senior?

**Dũng:** Dạ em nắm được các dạng tấn công web chính và đã áp dụng vào việc test hằng ngày — bộ test của em có nhóm case bảo mật cơ bản: thử injection ở các ô tìm kiếm, kiểm tra API có phân quyền theo từng bản ghi không (sửa `id` trên URL xem có xem được cảnh báo của đơn vị khác không), kiểm tra log hệ thống có ghi vết thao tác nhạy cảm không. Em cũng đọc hiểu log ở mức lần theo một phiên tấn công thử nghiệm mà đội pentest bên em mô phỏng ạ.

**Yến:** Tốt. Cảm ơn em.

### Lab 2 — Vòng case thực chiến

**Yến:** Case: em nhận bàn giao một dự án mà quy trình kiểm thử đang rối — test case trùng lặp, regression chạy 5 ngày mới xong, dev kêu tester chặn release. Em cải tổ thế nào?

**Dũng:** Dạ em đo trước khi sửa: đếm bộ test case hiện có, tỷ lệ trùng, thời gian từng nhóm. Rồi em cắt theo 3 lớp — lớp smoke khoảng 30 phút chạy mỗi build, lớp regression lõi 1 ngày cho luồng chính, lớp đầy đủ chỉ chạy trước release lớn. Case trùng em gộp, case 2 năm không bắt được lỗi nào và không thuộc luồng chính em đưa ra khỏi bộ bắt buộc. Phần API lặp đi lặp lại em chuyển dần sang tự động chạy đêm. Mục tiêu em cam kết với dev: phản hồi smoke trong buổi sáng, không để tester thành nút cổ chai ạ. Em làm việc tương tự ở dự án trước, regression từ 4 ngày xuống còn 1,5 ngày.

**Yến:** Dev vẫn phàn nàn "bug chặn release toàn lỗi vặt" thì sao?

**Dũng:** Dạ em tách quyền: tester phân loại mức độ theo tiêu chí viết sẵn — có bảng định nghĩa thế nào là blocker/critical/major kèm ví dụ — còn quyết release hay không khi tồn bug là của hội đồng release gồm PM, dev lead và QA lead. Khi tiêu chí nằm trên giấy thì hết cãi nhau cảm tính ạ.

**Yến:** Được. Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Yến:** Em đang quản mấy bạn, và kể chị một tình huống quản lý khó.

**Dũng:** Dạ em đang phụ trách nhóm 5 bạn. Tình huống khó nhất là một bạn cứng nghề nhưng burn out — chất lượng tụt, hay bỏ sót case. Em không phê bình trước nhóm mà nói chuyện riêng, hoá ra bạn ôm cùng lúc 2 dự án do đợt thiếu người. Em điều chỉnh lại phân bổ, chuyển bớt 1 dự án cho bạn khác kèm 1 tuần bàn giao, và báo lại lead lý do thật thay vì che. Sau 1 tháng bạn ổn lại. Em học được là số liệu chất lượng tụt thường là triệu chứng, nguyên nhân nằm ở phân bổ nguồn lực ạ.

**Yến:** Review kịch bản test của người khác, em làm đến mức nào rồi?

**Dũng:** Dạ giờ em review theo checklist em tự xây — phủ luồng, dữ liệu biên, phân quyền, và phần hay bị bỏ quên nhất là case dữ liệu bẩn từ hệ thống cũ đẩy sang. Em review được cả kịch bản của tester ngang cấp, không chỉ junior — 2 bạn cùng level trong nhóm em đổi chéo kịch bản cho nhau trước mỗi sprint ạ.

**Yến:** Cảm ơn Dũng.

**Góc nhìn người chấm (Senior·V2):** khác V1 rõ nhất ở chỗ mọi câu trả lời đều có **số đo trước–sau** (regression 4 ngày → 1,5 ngày; 70% bug lọt tập trung 1 module) và **cơ chế thay vì cố gắng cá nhân** (bảng tiêu chí mức độ bug, hội đồng release, review chéo). Quản nhóm ② = đã xử lý được tình huống người thật việc thật, biết tìm nguyên nhân dưới triệu chứng.

---

## Senior · Vùng 3

> Đỉnh Senior — rủi ro chất lượng và cải tiến quy trình phải đạt ③, tiệm cận Specialist. Ứng viên **Trâm** phỏng vấn ở vùng cao nhất Senior. Người phỏng vấn: **anh Khoa**, Giám đốc Chất lượng.

### Lab 1 — Vòng kỹ thuật sâu

**Khoa:** Chào Trâm. Câu lớn luôn: em dự báo rủi ro chất lượng của cả một dòng sản phẩm thế nào — không phải một bản release?

**Trâm:** Dạ em nhìn theo xu hướng chứ không theo từng bản ạ. Em duy trì bộ chỉ số theo quý: mật độ bug trên mỗi module, tỷ lệ bug tái mở, thời gian trung bình phát hiện–sửa, và tỷ lệ bug lọt ra môi trường thật. Từ đó em dự báo được kiểu: module phân tích log có mật độ bug tăng 3 quý liên tiếp trong khi khối lượng thay đổi không tăng — dấu hiệu nợ kỹ thuật, em cảnh báo trước cho trưởng dự án kèm đề xuất dành 1 sprint củng cố, trước khi nó thành sự cố với khách hàng. Dự báo đúng 2 lần thì bên phát triển bắt đầu chủ động hỏi số liệu của em trước khi lập kế hoạch quý ạ.

**Khoa:** Đó là vị thế đúng của QA cấp cao. Mảng hiệu năng chuyên sâu của em còn giữ không?

**Trâm:** Dạ còn, em vẫn trực tiếp thiết kế các kịch bản hiệu năng khó — gần nhất là bài toán 500 thiết bị đẩy log đồng thời lúc có sự cố diện rộng, phải giả lập cả trường hợp mạng chập chờn gửi trùng bản tin. Em cũng đào tạo được 2 bạn trong nhóm tự chạy và đọc kết quả JMeter, em chỉ vào ở khâu thiết kế kịch bản và kết luận ạ.

**Khoa:** Cảm ơn em.

### Lab 2 — Vòng case thực chiến

**Khoa:** Case: khách hàng lớn phàn nàn "hệ thống cảnh báo chậm và nhiều cảnh báo giả", đội dự án đổ cho dữ liệu khách bẩn. Giao em vào gỡ. Em làm gì trong 2 tuần đầu?

**Trâm:** Dạ tuần một em đi lấy sự thật: xin trích xuất log và số liệu cảnh báo 1 tháng gần nhất của đúng khách đó, đo phân bố thời gian xử lý và tỷ lệ cảnh báo giả theo từng loại luật phát hiện. Kinh nghiệm của em là "chậm và nhiều cảnh báo giả" thường không đều — sẽ có 2–3 luật cụ thể gây phần lớn cảnh báo giả. Tuần hai em tách bạch trách nhiệm bằng số: phần nào do ngưỡng cấu hình mặc định không hợp môi trường khách — chỉnh được ngay; phần nào do dữ liệu đầu vào khách chưa chuẩn hoá — cần khách phối hợp; phần nào là lỗi sản phẩm thật. Ra bảng 3 cột kèm số liệu thì cuộc họp với khách chuyển từ đổ lỗi sang kế hoạch hành động ạ. Em xử lý một ca gần giống năm ngoái — tỷ lệ cảnh báo giả giảm từ 34% xuống 9% sau khi chỉnh 2 luật và chuẩn hoá 1 nguồn dữ liệu.

**Khoa:** Số cụ thể, tốt. Sau vụ đó em có đề xuất gì thay đổi quy trình không?

**Trâm:** Dạ có — em đề xuất thêm bước "kiểm thử với dữ liệu mô phỏng theo môi trường khách" vào quy trình triển khai: trước khi go-live cho khách mới, chạy bộ luật phát hiện trên mẫu dữ liệu thật của khách trong 1 tuần ở chế độ im lặng, hiệu chỉnh ngưỡng rồi mới bật cảnh báo. Đề xuất này được đưa vào checklist triển khai chuẩn của trung tâm ạ.

**Khoa:** Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Khoa:** Quản lý nhóm — tình huống khó nhất em từng xử là gì?

**Trâm:** Dạ, hai bạn cứng nhất nhóm mâu thuẫn về cách tổ chức bộ regression, một bạn muốn tự động hoá tối đa, bạn kia cho rằng vùng nghiệp vụ phức tạp phải giữ test tay. Em không chọn phe — em cho hai bạn cùng làm một phân tích chi phí trên 1 module thật: đo công viết + công bảo trì test tự động so với công chạy tay lặp lại trong 6 tháng. Kết quả ra lưng chừng: API tự động hoá lời rõ, luồng UI hay đổi thì lỗ. Hai bạn tự đi đến thoả thuận phân vùng, và nhóm có luôn tiêu chí "khi nào tự động hoá" thành văn bản. Mâu thuẫn chuyên môn xử bằng thí nghiệm chung tốt hơn xử bằng quyền ạ.

**Khoa:** Câu cuối: điều gì khiến em chưa nhận mình là Specialist?

**Trâm:** Dạ em vững trong phạm vi các dự án em phụ trách, nhưng xây chiến lược kiểm thử cho **toàn đơn vị** — chuẩn hoá cho cả những dự án em không trực tiếp làm, chọn công nghệ kiểm thử cho 3 năm tới — thì em mới tham gia góp ý chứ chưa chủ trì. Đó là phần em muốn được thử ở vai trò mới ạ.

**Khoa:** Câu trả lời tự định vị chính xác. Cảm ơn Trâm.

**Góc nhìn người chấm (Senior·V3):** ba tín hiệu của đỉnh Senior: **dự báo được rủi ro trước khi thành sự cố** (③ — có bộ chỉ số theo quý, dự báo đúng khiến bên phát triển chủ động tìm đến), **gỡ được ca khách hàng nóng bằng số liệu** thay vì đổ lỗi qua lại, và **xử mâu thuẫn chuyên môn trong nhóm bằng thí nghiệm chung**. Câu tự định vị "chưa chủ trì tầm đơn vị" cho thấy hiểu đúng ranh giới Senior/Specialist.

---

## Specialist · Vùng 1

> Bước vào Specialist — trọng tâm chuyển từ "làm giỏi trong dự án" sang **tầm đơn vị**: chiến lược kiểm thử, tư vấn công cụ, phản biện kiến trúc (các kỹ năng mới đều ở mức khởi đầu; kiểm thử chuyên sâu 1 mảng giữ ③). Ứng viên **Việt** (~8 năm) phỏng vấn vào vai trò Specialist. Người phỏng vấn: **chị Mai**, Phó Giám đốc Trung tâm.

### Lab 1 — Vòng kỹ thuật & chiến lược kiểm thử

**Mai:** Chào Việt. Vai trò này sẽ tham gia định hình chiến lược kiểm thử cho cả trung tâm. Em hình dung một "chiến lược kiểm thử cấp đơn vị" gồm những gì?

**Việt:** Dạ, em hình dung nó trả lời 4 câu hỏi chung cho mọi dự án: chuẩn tối thiểu — dự án nào cũng phải có gì (smoke tự động, tiêu chí release, bộ chỉ số chất lượng thống nhất để so sánh được giữa các dự án); phân bổ — loại kiểm thử nào tự động hoá, loại nào giữ test tay, mảng chuyên sâu nào cần đội dùng chung thay vì mỗi dự án tự lo; công cụ — danh mục công cụ chuẩn để không mỗi dự án một kiểu, khó luân chuyển người; và lộ trình năng lực — đội tester cần học gì trong 1–2 năm tới. Em nói thật là em mới ở điểm bắt đầu của việc này — em từng viết chiến lược cho cụm 3 dự án em phụ trách, còn tầm cả trung tâm thì đây là bước em đang vươn tới ạ.

**Mai:** Cụm 3 dự án đó, em rút ra gì đáng giá nhất?

**Việt:** Dạ, rằng chuẩn chung phải **ít và bắt buộc được** — bản đầu em viết 30 quy định, không ai theo nổi; bản sau em rút còn 8 điều bắt buộc kèm lý do, và tự động kiểm được 5 điều qua pipeline. Chuẩn không tự kiểm được thì chỉ nằm trên giấy ạ.

**Mai:** Bài học đắt giá đấy. Cảm ơn em.

### Lab 2 — Vòng case tư vấn & phản biện kiến trúc

**Mai:** Case: một dự án mới trình thiết kế — hệ thống thu thập log từ 2.000 thiết bị, xử lý tập trung một cụm, dev lead khẳng định "chịu tải tốt". Em ở vai phản biện chất lượng, em hỏi gì?

**Việt:** Dạ em hỏi bằng kịch bản sự cố: khi 2.000 thiết bị cùng đẩy dồn log sau một đợt mất mạng diện rộng — hệ thống xử lý kiểu gì, hàng đợi chịu được bao lâu, tràn thì mất log hay chặn nguồn? Log bị trùng hoặc đến sai thứ tự thì luật phát hiện có bắn cảnh báo giả không? Một điểm xử lý tập trung — cụm đó chết thì mất khả năng giám sát toàn bộ trong bao lâu? Em không tranh luận kiến trúc thay kiến trúc sư — em ép thiết kế phải trả lời được các kịch bản xấu, và đề nghị con số "chịu tải tốt" phải kèm điều kiện đo: bao nhiêu bản tin/giây, độ trễ bao nhiêu, đo ở cấu hình nào. Em mới tham gia phản biện thiết kế ở 2 dự án gần đây, và nhận ra sức mạnh của tester cấp cao ở bàn thiết kế là **bộ sưu tập các cách hệ thống từng chết thật** ạ.

**Mai:** Nếu dev lead phản ứng "tester thì biết gì kiến trúc"?

**Việt:** Dạ em không đấu khẩu — em đưa 1 ví dụ cũ: sự cố mất log 4 giờ năm ngoái ở dự án X đúng kịch bản dồn tải sau mất mạng, thiệt hại ghi nhận rõ. Câu hỏi của em xuất phát từ sự cố thật, trả lời được thì thiết kế mạnh lên, không trả lời được thì tốt hơn là biết trước khi go-live. Thường sau 1–2 lần như vậy thì thái độ đổi ạ.

**Mai:** Cảm ơn em.

### Lab 3 — Vòng đào tạo, đánh giá & R&D

**Mai:** Vai trò này phải đào tạo và đánh giá năng lực tester toàn trung tâm. Em bắt đầu từ đâu?

**Việt:** Dạ từ khung năng lực trước — không có thước thì không đánh giá được. Em dựng ma trận kỹ năng theo nhóm: lõi kiểm thử, SQL/API, chuyên sâu theo mảng, nghiệp vụ ATTT — mỗi kỹ năng 4 mức có mô tả hành vi quan sát được, tránh kiểu tự chấm cảm tính. Đánh giá đợt đầu em làm cùng các test lead để hiệu chỉnh thước đo, rồi mới mở rộng. Từ khoảng trống lộ ra em mới thiết kế đào tạo — ưu tiên dạng thực hành trên sản phẩm thật của trung tâm thay vì lý thuyết. Em từng làm bản thu nhỏ cho nhóm 8 người: lộ ra cả nhóm yếu kiểm thử bảo mật, em mời đội pentest nội bộ dạy 4 buổi thực hành, sau 1 quý nhóm tự bắt được 3 lỗi phân quyền trước khi release ạ.

**Mai:** R&D công nghệ kiểm thử mới — em đang theo dõi gì?

**Việt:** Dạ em đang thử nghiệm 2 hướng ở mức khảo sát: sinh test case tự động có hỗ trợ AI cho phần API — kết quả sơ bộ là nhanh ở case khung nhưng vẫn phải người rà nghiệp vụ; và contract testing giữa các service để giảm bộ integration test đang phình. Cả 2 em đều làm dạng pilot nhỏ có tiêu chí đánh giá trước khi đề xuất rộng, tránh chạy theo trend ạ.

**Mai:** Cảm ơn Việt.

**Góc nhìn người chấm (Spec·V1):** điểm vào Specialist không đòi "đã làm chủ tầm đơn vị" mà đòi **đã thử ở quy mô thu nhỏ + phương pháp đúng**: chiến lược cho cụm 3 dự án với bài học "chuẩn phải ít và tự kiểm được", khung năng lực làm trước đào tạo sau, phản biện kiến trúc bằng kịch bản sự cố thật thay vì tranh luận suông. Mọi kỹ năng mới đều thành thật ở mức "bước đầu, đang vươn tới" — đúng thang ①.

---

## Specialist · Vùng 2

> Giữa thang Specialist — các năng lực tầm đơn vị đã vận hành thật. Ứng viên **Hằng** phỏng vấn chuyển sang trung tâm lớn hơn ở vùng Spec·V2. Người phỏng vấn: **anh Đức**, Giám đốc Trung tâm.

### Lab 1 — Vòng kỹ thuật & chiến lược kiểm thử

**Đức:** Chào Hằng. Chiến lược kiểm thử em xây ở đơn vị cũ — kết quả đo được là gì?

**Hằng:** Dạ em chủ trì chiến lược cho trung tâm 6 dự án, 25 tester, chạy được 1,5 năm ạ. Kết quả đo được: 6/6 dự án có smoke tự động chạy mỗi build — trước đó là 2/6; thời gian regression trung bình giảm 40% nhờ chuẩn hoá 3 lớp test; và quan trọng nhất là bộ chỉ số chất lượng thống nhất nên ban giám đốc so sánh được sức khoẻ các dự án trên cùng một bảng — trước đó mỗi dự án báo cáo một kiểu, không ai đối chiếu được. Cái chưa đạt em cũng nói luôn: mục tiêu 50% API test tự động hoá mới tới 35%, do 2 dự án cũ nợ tài liệu API quá nặng, em phải điều chỉnh lộ trình thay vì ép ạ.

**Đức:** Báo cả phần hụt — được. Tư vấn công cụ cho nhiều dự án, em làm theo nguyên tắc nào?

**Hằng:** Dạ theo bài toán chứ không theo công cụ ạ. Em duy trì một bảng đánh giá: mỗi công cụ chấm theo chi phí bản quyền, năng lực đội hiện có, độ khớp với stack sản phẩm, và chi phí thoát nếu sau này đổi. Ví dụ thật: một dự án đòi mua công cụ tự động hoá thương mại khá đắt, em phân tích thì 80% nhu cầu của họ là API test — Postman/Newman sẵn có phủ được, chỉ 20% UI test cần thêm; em tư vấn dùng bộ sẵn có + Playwright mã nguồn mở cho phần UI, tiết kiệm khoản bản quyền mà đội học được trong 1 tháng ạ.

**Đức:** Cảm ơn em.

### Lab 2 — Vòng case phản biện & review kiến trúc

**Đức:** Case thật bên anh: sản phẩm giám sát đang tách từ một khối lớn thành các service nhỏ. Đội kiến trúc mời QA vào review. Em review kiểu gì cho ra giá trị, không phải ngồi cho có?

**Hằng:** Dạ em review theo góc "kiến trúc này có kiểm thử được không" — góc mà chỉ QA nhìn ra ạ. Cụ thể: tách service thì bài toán test integration phình bao nhiêu, đã có chiến lược contract test giữa các service chưa hay định test tay hết các cặp ghép; môi trường test có dựng được từng service độc lập không hay phải dựng cả cụm mới test được một thay đổi nhỏ; dữ liệu test đồng bộ giữa các service kiểu gì; và khi lỗi xảy ra ở môi trường thật, log có đủ để truy ngược qua nhiều service không. Lần review gần nhất theo đúng khung này, em chỉ ra thiết kế thiếu correlation ID xuyên suốt — dev bổ sung trước khi code, tiết kiệm không biết bao nhiêu giờ debug về sau ạ.

**Đức:** Đúng góc độc quyền của QA. Nếu em phát hiện điểm yếu mà đội kiến trúc không muốn sửa vì tiến độ?

**Hằng:** Dạ em định lượng rủi ro rồi đẩy lên đúng cấp quyết: điểm yếu này nếu xảy ra thì ảnh hưởng gì, xác suất ước tính bao nhiêu dựa trên căn cứ nào, chi phí sửa bây giờ so với sửa sau go-live chênh bao nhiêu. Quyết chấp nhận rủi ro là quyền của giám đốc dự án — nhưng phải là quyết định có hồ sơ, em lưu lại đánh giá và quyết định. Đã 2 lần hồ sơ kiểu đó giúp đơn vị rút kinh nghiệm nghiêm túc thay vì đổ lỗi cá nhân ạ.

**Đức:** Cảm ơn em.

### Lab 3 — Vòng đào tạo & lan toả

**Đức:** Em đào tạo và đánh giá năng lực ở đơn vị cũ đến mức nào rồi?

**Hằng:** Dạ khung năng lực em xây đã dùng cho 2 kỳ đánh giá chính thức, gắn với lộ trình phát triển từng người ạ. Chương trình đào tạo chạy đều: mỗi quý 1 chuyên đề thực hành — kiểm thử bảo mật cơ bản, hiệu năng với JMeter, SQL cho tester — giảng viên là chính các bạn giỏi nhất từng mảng, em đứng vai thiết kế chương trình và bảo đảm chất lượng. Số đo em theo dõi: tỷ lệ tester chạy được kiểm thử API tự động từ 30% lên 70% sau 1 năm; và 3 bạn được nâng vùng trong kỳ đánh giá gần nhất có lộ trình học đúng từ khoảng trống khung năng lực chỉ ra. Em cũng bắt đầu lan toả ra ngoài trung tâm — 2 chuyên đề em dạy được đơn vị bạn mượn giáo trình ạ.

**Đức:** Cảm ơn Hằng.

**Góc nhìn người chấm (Spec·V2):** giữa thang Specialist, mọi năng lực tầm đơn vị phải **có số vận hành thật**: chiến lược 6 dự án với số trước–sau (và dám báo phần hụt 35%/50%), tư vấn công cụ có khung đánh giá + ca tiết kiệm cụ thể, review kiến trúc ra giá trị độc quyền của QA (correlation ID, contract test), đào tạo có số chuyển hoá (30% → 70%). Khác V1 ở chỗ không còn "bản thu nhỏ" — tất cả đã là chính thức, đều đặn.

---

## Specialist · Vùng 3

> Vùng cuối toàn thang — mức ④: chuyên gia được đơn vị và công ty công nhận, định hình cách kiểm thử của cả tổ chức. Ứng viên **Toàn** (~12 năm) phỏng vấn vai trò Chuyên gia Kiểm thử cấp công ty. Người phỏng vấn: **chị Lan**, Phó Tổng Giám đốc phụ trách Công nghệ, cùng **anh Đức**, Giám đốc Trung tâm.

### Lab 1 — Vòng chuyên môn đỉnh (chuyên gia 1 mảng)

**Lan:** Chào anh Toàn. Anh được giới thiệu là chuyên gia hiệu năng. Điều gì chứng minh mức "chuyên gia" đó?

**Toàn:** Dạ chị, em nghĩ bằng chứng thật nằm ở các ca khó mà người khác không gỡ được thì tìm đến em ạ. Ca tiêu biểu: hệ thống giám sát của một khách hàng lớn cứ 3–4 tuần lại nghẽn một lần không theo quy luật, đội dự án đo mãi không tái hiện được. Em thiết kế bài soak test 2 tuần liên tục với mô hình tải dao động theo nhịp ngày–đêm thật của khách, kết hợp theo dõi tài nguyên ở mức chi tiết — tái hiện được: kết nối DB rò rỉ rất chậm, chỉ lộ sau 10 ngày chạy liên tục. Đội dev vá xong, hệ thống chạy ổn 8 tháng nay. Sau ca đó em viết lại phương pháp soak test dao động thành tài liệu chuẩn, giờ là bài bắt buộc trước go-live các hợp đồng lớn của công ty ạ. Ngoài ra em duy trì vai trò thẩm định độc lập: mọi báo cáo hiệu năng cam kết với khách hàng cấp bộ/tập đoàn đều qua em ký nháy trước khi gửi.

**Lan:** "Phương pháp thành tài liệu chuẩn của công ty" — đó đúng là thước của mức chuyên gia. Cảm ơn anh.

### Lab 2 — Vòng chiến lược kiểm thử cấp công ty

**Lan:** Nếu nhận vai trò này, anh chịu trách nhiệm chiến lược kiểm thử cho nhiều trung tâm với đặc thù khác nhau — sản phẩm ATTT, hạ tầng viễn thông, phần mềm doanh nghiệp. Anh tiếp cận thế nào?

**Toàn:** Dạ, em không áp một khuôn cho tất cả — em tách 2 tầng. Tầng công ty: những thứ bắt buộc thống nhất vì có giá trị liên thông — bộ chỉ số chất lượng chung để lãnh đạo so sánh được, chuẩn hồ sơ kiểm thử cho các hợp đồng lớn, khung năng lực tester dùng chung để luân chuyển người giữa các trung tâm, và danh mục công cụ lõi được đầu tư tập trung. Tầng trung tâm: chiến lược riêng theo đặc thù — sản phẩm ATTT nặng kiểm thử bảo mật và dữ liệu thật, viễn thông nặng hiệu năng và tương thích thiết bị — do chính trung tâm chủ trì, em thẩm định và bảo đảm không lệch chuẩn tầng trên. Em từng vận hành mô hình 2 tầng này ở quy mô 3 trung tâm trong vai trò kiêm nhiệm 2 năm qua — bài học lớn nhất là tầng công ty phải đủ mỏng để không bóp nghẹt đặc thù, em đã một lần phải rút một quy định khỏi tầng chung sau khi 2 trung tâm chứng minh nó phản tác dụng với loại sản phẩm của họ ạ.

**Lan:** Dám rút quy định của chính mình — điểm đó đáng giá. Cảm ơn anh.

### Lab 3 — Vòng ảnh hưởng tổ chức & phát triển đội ngũ

**Đức:** Anh Toàn này, ở tầm này thì câu hỏi không còn là "anh giỏi gì" mà là "anh nhân bản cái giỏi đó ra tổ chức thế nào". Anh kể một minh chứng.

**Toàn:** Dạ, minh chứng em tự hào nhất không phải ca kỹ thuật nào mà là **lứa kế cận**: 4 bạn em trực tiếp dẫn dắt theo lộ trình cá nhân hoá trong 3 năm — giờ 2 bạn là test lead trung tâm, 1 bạn thành chuyên gia bảo mật được cấp chứng chỉ quốc tế, 1 bạn chuyển hướng thành công sang kiểm thử hiệu năng và đang nhận các ca khó thay em. Phương pháp của em: mỗi bạn một mảng mũi nhọn khớp thiên hướng, giao ca thật vượt tầm một chút kèm lưới an toàn là em rà lại phía sau, và đẩy các bạn đứng lớp dạy lại — dạy được người khác mới là nắm chắc. Ngoài ra em chủ trì cộng đồng kiểm thử nội bộ toàn công ty, sinh hoạt tháng, 150 thành viên — nơi các trung tâm chia sẻ sự cố thật và cách gỡ, tri thức không còn nằm trong từng ốc đảo ạ.

**Đức:** Câu cuối cùng: anh đánh giá năng lực chuyên môn của một tester khác bằng cách nào — khi anh chỉ có 1 giờ?

**Toàn:** Dạ em không hỏi định nghĩa — em đưa một ca thật đã xảy ra, cắt làm 3 khúc: cho xem hiện tượng và hỏi "anh/chị nghi gì, cần thêm dữ liệu nào"; đưa thêm dữ liệu và xem cách khoanh vùng; cuối cùng hỏi "nếu là người phụ trách, quyết gì với release đang chờ". Một giờ đó lộ ra đủ: tư duy điều tra, kỷ luật bằng chứng, và bản lĩnh quyết định dưới áp lực — ba thứ mà bằng cấp với số năm kinh nghiệm không nói thay được ạ.

**Lan:** Cảm ơn anh Toàn. Chúng tôi sẽ liên hệ sớm.

**Góc nhìn người chấm (Spec·V3):** mức ④ nhận diện qua ba tầng bằng chứng: **ca khó người khác bó tay thì tìm đến mình** (soak test bắt rò rỉ 10-ngày), **phương pháp cá nhân trở thành chuẩn tổ chức** (tài liệu bắt buộc trước go-live, mô hình chiến lược 2 tầng), và **lứa kế cận trưởng thành đo đếm được** (2 test lead, 1 chuyên gia bảo mật, 1 người nhận ca khó thay mình). Ở vùng cuối thang, câu hỏi phỏng vấn chuyển hẳn từ "làm được gì" sang "tổ chức thay đổi gì nhờ anh/chị" — và ứng viên đạt ④ trả lời bằng những thay đổi còn chạy tốt khi mình không có mặt.
