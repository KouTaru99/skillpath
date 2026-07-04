# Lab phỏng vấn — Giải pháp nghiệp vụ (BA)

> Đây không phải đề cương ôn tập — là **kịch bản thoại thật** của các buổi phỏng vấn, viết theo đúng vùng năng lực bạn đang ở. Thang BA **không có level Entry/Junior** (điểm vào nghề đã là Experienced). Vùng Ex·V1 mô phỏng **1 buổi phỏng vấn trọn vẹn**; từ Ex·V2 trở lên, mỗi vùng có 3 lab tương ứng 3 vòng riêng: **chuyên môn sâu**, **case thực chiến**, **hành vi & lãnh đạo**. Bối cảnh xuyên suốt: tuyển BA cho các sản phẩm **giám sát an ninh mạng nội bộ** — khớp với các trang kỹ năng.

---

## Experienced · Vùng 1

### Lab — Phỏng vấn BA vào nghề (đã có nền phân tích cơ bản)

**Bối cảnh:** ứng viên **Chi** (~2 năm làm dự án phần mềm, chuyển từ vị trí hỗ trợ nghiệp vụ sang BA) phỏng vấn vị trí BA cho sản phẩm giám sát an ninh mạng nội bộ. Người phỏng vấn: **anh Hùng**, BA Lead. 45 phút, một buổi trọn.

**Hùng:** Chào Chi. Em mô tả nhanh vai trò BA trong một dự án phần mềm theo cách em hiểu?

**Chi:** Dạ, BA là người đứng giữa khách hàng và đội phát triển ạ: khảo sát để hiểu khách thật sự cần gì, phân tích và viết thành tài liệu yêu cầu mà dev/tester làm theo được, rồi trong suốt dự án giải đáp thắc mắc nghiệp vụ và quản lý khi yêu cầu thay đổi. Em hay tự nhắc: khách nói cái họ **muốn**, BA phải đào ra cái họ **cần** — hai cái không phải lúc nào cũng trùng nhau.

**Hùng:** Câu cuối được đấy. Em biết những kỹ thuật mô hình hoá nào?

**Chi:** Dạ em dùng được use case diagram để mô tả ai làm gì với hệ thống, activity/BPMN cơ bản để vẽ luồng quy trình, và mô hình dữ liệu quan hệ mức khái niệm — thực thể nào, quan hệ gì. Em vẽ chủ yếu bằng draw.io ạ.

**Hùng:** Vậy làm bài nhỏ nhé. Nghiệp vụ: cán bộ an ninh nhận cảnh báo từ hệ thống, xem chi tiết, xử lý hoặc chuyển cho người khác, xong thì đóng cảnh báo. Em phác use case chính.

**Chi:** Dạ, actor chính là **Cán bộ an ninh**. Các use case: Xem danh sách cảnh báo · Xem chi tiết cảnh báo · Xử lý cảnh báo · Chuyển cảnh báo cho cán bộ khác · Đóng cảnh báo. Em sẽ hỏi thêm để làm rõ: có actor **Trưởng ca** với quyền khác không — ví dụ chỉ trưởng ca được đóng cảnh báo mức cao? Và hệ thống nguồn sinh cảnh báo có được coi là actor phụ không ạ?

**Hùng:** Hỏi ngược đúng chỗ — đúng là có trưởng ca. Giờ giả sử em phỏng vấn khách để khảo sát chức năng "chuyển cảnh báo", em chuẩn bị những câu hỏi gì?

**Chi:** Dạ em chuẩn bị theo khung: Ai được chuyển, chuyển cho ai — có giới hạn theo đơn vị, ca trực không? Khi nào chuyển — cảnh báo đang xử lý dở có chuyển được không? Chuyển thì kèm gì — ghi chú bắt buộc không, lịch sử xử lý có đi theo không? Người nhận từ chối được không? Và số lượng — một cảnh báo chuyển tối đa mấy lần, có cần cảnh báo khi bị chuyển lòng vòng không ạ? Em ghi biên bản sau buổi họp và gửi lại khách xác nhận để chốt, tránh mỗi bên nhớ một kiểu.

**Hùng:** Đủ ý cho mức bắt đầu. Tài liệu PTYC em viết gồm những phần nào?

**Chi:** Dạ theo mẫu team em đang dùng: mô tả tổng quan và phạm vi, danh sách chức năng với mô tả từng chức năng — luồng chính, luồng phụ, quy tắc nghiệp vụ, thông báo lỗi — yêu cầu phi chức năng cơ bản, mô hình dữ liệu, và phụ lục màn hình. Mỗi yêu cầu em đánh mã để tester tham chiếu khi viết test case ạ.

**Hùng:** Prototype thì sao — em làm đến đâu?

**Chi:** Dạ em vẽ wireframe bằng Figma ở mức khung — bố cục màn hình, các trường, nút bấm — đủ để khách hình dung và phản hồi trước khi dev code. Em chưa làm prototype có tương tác click qua lại nhiều màn ạ, cái đó em đang học thêm.

**Hùng:** Ok. Tình huống cuối: dev hỏi em "trường ghi chú khi đóng cảnh báo bắt buộc hay không", mà tài liệu em viết không ghi. Em xử lý sao?

**Chi:** Dạ em nhận là tài liệu thiếu trước ạ. Em hỏi lại khách — vì đây là quy tắc nghiệp vụ, em không tự quyết — rồi cập nhật tài liệu, thông báo cho cả dev lẫn tester biết chỗ vừa bổ sung, và ghi vào nhật ký thay đổi của tài liệu. Em cũng tự rút kinh nghiệm bổ sung mục "quy tắc bắt buộc nhập" vào checklist tự rà của em để lần sau đỡ sót ạ.

**Hùng:** Tốt. Em có câu hỏi gì cho anh không?

**Chi:** Dạ có ạ — nghiệp vụ an ninh mạng khá đặc thù, bên mình BA mới có được tài liệu nghiệp vụ nền hoặc người kèm trong thời gian đầu không ạ?

**Hùng:** Có tài liệu nghiệp vụ nền và em sẽ ngồi cùng 1 BA cứng trong 2 tháng đầu. Chào em.

**Góc nhìn người chấm (Ex·V1):** với BA điểm vào nghề, tín hiệu cần thấy: hiểu đúng vai trò ("khách nói cái muốn, BA đào cái cần"), dùng được use case/BPMN/mô hình dữ liệu ở mức cơ bản, chuẩn bị khảo sát **có khung câu hỏi** chứ không đi họp tay không, và phản xạ đúng khi tài liệu thiếu: nhận lỗi → hỏi khách → cập nhật + thông báo + rút kinh nghiệm vào checklist. Thành thật về giới hạn (prototype mới ở mức wireframe) là điểm cộng, không phải trừ.

---

## Experienced · Vùng 2

> Từ vùng này phỏng vấn tách 3 vòng. Ứng viên **Thảo** (~3 năm BA) phỏng vấn vùng Ex·V2 — giai đoạn phải **độc lập viết tài liệu và chốt yêu cầu với khách**. Người phỏng vấn: **chị Hương**, BA Lead.

### Lab 1 — Vòng chuyên môn sâu (~25 phút)

**Hương:** Chào Thảo. Em kể chị nghe một tài liệu PTYC em viết độc lập gần đây — phạm vi và cái khó nhất của nó.

**Thảo:** Dạ, gần nhất em viết trọn tài liệu cho phân hệ "quản lý ca trực" của hệ thống giám sát — 12 chức năng, từ phân ca, đổi ca đến bàn giao cảnh báo giữa ca. Cái khó nhất là quy tắc bàn giao: cảnh báo đang xử lý dở khi hết ca thì ai chịu trách nhiệm. Khách nói miệng mỗi buổi một kiểu, em phải kẻ bảng quyết định các trường hợp — cảnh báo mức cao/thấp × đã tiếp nhận/chưa × ca sau có người cùng chuyên môn/không — họp chốt từng ô một. Bảng đó về sau thành phụ lục được cả dev lẫn khách mở ra mỗi lần tranh luận ạ.

**Hương:** Xử lý đúng kiểu BA đấy. Khi khách và người dùng cuối nói ngược nhau — quản lý muốn quy trình chặt, cán bộ trực muốn thao tác nhanh — em chốt kiểu gì?

**Thảo:** Dạ em không để hai bên tranh luận tay đôi qua em làm trung gian truyền lời ạ — em tổ chức 1 buổi ngồi chung, em chuẩn bị trước 2 phương án vẽ thành luồng cụ thể kèm ưu nhược từng bên: phương án chặt thì thêm 2 bước xác nhận, an toàn hơn nhưng mỗi cảnh báo chậm thêm ước tính 30–45 giây; phương án nhanh thì bỏ xác nhận nhưng thêm log truy vết để vẫn quy được trách nhiệm. Có hình và có con số thì buổi họp chốt được trong 1 tiếng — chốt phương án nhanh + log, và người ký chốt là quản lý phía khách, em ghi rõ vào biên bản ạ.

**Hương:** Mô hình dữ liệu — em tự vẽ được đến mức nào?

**Thảo:** Dạ em vẽ mô hình quan hệ mức logic: thực thể, thuộc tính chính, quan hệ 1-n/n-n ạ. Ví dụ phân hệ ca trực: `CaTruc` — `CanBo` là n-n qua bảng phân công vì một ca nhiều người trực, một người trực nhiều ca; `CanhBao` có khoá ngoại trỏ `CaTruc` tiếp nhận nó. Thiết kế vật lý index hay kiểu dữ liệu chi tiết thì em để dev/DBA quyết, em chỉ bảo đảm mô hình phản ánh đúng nghiệp vụ ạ.

**Hương:** Phân vai đúng. Cảm ơn em.

### Lab 2 — Vòng case thực chiến (~25 phút)

**Hương:** Case: khách yêu cầu thêm chức năng "xuất báo cáo cảnh báo hằng tuần gửi lãnh đạo". Nghe đơn giản, em triển khai khảo sát và phân tích thế nào?

**Thảo:** Dạ kinh nghiệm của em là chữ "báo cáo" nguy hiểm nhất trong nghề BA ạ [cười]. Em sẽ hỏi: lãnh đạo nào nhận — cấp phòng hay cấp trung tâm, vì mức tổng hợp khác nhau; nội dung gồm chỉ số gì, so sánh với kỳ trước không; định dạng — xem trên hệ thống, xuất file, hay gửi email tự động; "hằng tuần" là sáng thứ hai hay chủ nhật, ai bấm hay hệ thống tự chạy; và câu quan trọng nhất: lãnh đạo dùng báo cáo này để **quyết định gì** — vì câu đó quyết định chỉ số nào là chính, chỉ số nào là trang trí. Em từng gặp đúng ca này: hỏi ra mới biết lãnh đạo chỉ cần 3 con số để quyết phân bổ người trực, còn bảng chi tiết 5 trang phía sau không ai đọc — thế là phạm vi từ "hệ thống báo cáo động" co lại còn 1 email tự động 3 chỉ số, dev làm trong 3 ngày thay vì 3 tuần ạ.

**Hương:** Ví dụ đúng "đào cái cần". Giờ nếu giữa sprint, khách đòi đổi cách tính một chỉ số đã chốt trong tài liệu — em xử theo quy trình nào?

**Thảo:** Dạ em ghi nhận thành yêu cầu thay đổi chứ không sửa miệng ạ: mô tả thay đổi, lý do khách đưa, rồi em đánh giá tác động cùng dev/tester — sửa công thức thì ảnh hưởng màn hình nào, dữ liệu lịch sử tính lại không, tốn bao nhiêu công. Có bảng tác động rồi em trình PM và khách quyết: làm ngay trong sprint (đổi cái khác ra) hay để sprint sau. Chốt xong em mới cập nhật tài liệu, có đánh phiên bản. Em giữ nguyên tắc: thay đổi nhỏ mấy cũng đi qua quy trình, vì cái "sửa nhanh 5 phút" không ghi lại chính là cái gây cãi nhau ở buổi nghiệm thu ạ.

**Hương:** Chuẩn. Cảm ơn em.

### Lab 3 — Vòng hành vi (~15 phút)

**Hương:** Kể chị một lần em thuyết trình giải pháp mà bên nghe phản ứng không tốt.

**Thảo:** Dạ có — lần đầu em trình phương án phân quyền mới cho phòng vận hành của khách, em nói 20 phút toàn thuật ngữ role/permission, mọi người im lặng rồi một chị nói thẳng "em nói gì chị không hiểu". Em xin lỗi và đổi cách ngay tại chỗ: bỏ slide, lấy ví dụ ba người thật trong phòng — "anh A trưởng ca thì bấm được nút này, chị B mới vào thì chỉ xem" — mọi người gật đầu ngay và còn góp thêm 2 trường hợp em thiếu. Từ đó em có nguyên tắc: trình cho người nghiệp vụ thì đi từ tình huống người thật của họ, thuật ngữ hệ thống giữ lại cho tài liệu kỹ thuật ạ.

**Hương:** Còn với đội dev — có lần nào em bị phản ứng "tài liệu BA viết không code được" chưa?

**Thảo:** Dạ có, hồi mới độc lập viết. Một bạn dev chỉ ra mô tả của em kiểu "hệ thống hiển thị thông báo phù hợp" — phù hợp là gì thì không nói. Em nhận lỗi và nhờ chính bạn đó review nháp tài liệu 30 phút trước khi phát hành trong 2 sprint liền — vừa vá được lỗ hổng của em, vừa làm bạn ấy thấy được lắng nghe. Giờ tài liệu của em có quy ước riêng: chỗ nào là thông báo thì ghi đúng nguyên văn hiển thị, chỗ nào là quy tắc thì viết dạng điều kiện đo được ạ.

**Hương:** Cảm ơn Thảo.

**Góc nhìn người chấm (Ex·V2):** vùng này đòi **độc lập thật sự**: viết trọn tài liệu phân hệ có phần hóc (bảng quyết định bàn giao ca), chốt được yêu cầu khi các bên ngược nhau bằng **phương án + con số + người ký rõ ràng**, và quản lý thay đổi có kỷ luật ("thay đổi nhỏ mấy cũng đi qua quy trình"). Hai câu chuyện hành vi đều theo khuôn nhận-lỗi-thật → đổi-cách → thành-nguyên-tắc — đúng đường trưởng thành của BA giai đoạn giữa Experienced.

---

## Experienced · Vùng 3

> Đỉnh Experienced — mọi kỹ năng nền chạm ②, chuẩn bị bước sang Senior. Ứng viên **Nam** (~4 năm BA) phỏng vấn vùng Ex·V3. Người phỏng vấn: **anh Phong**, Trưởng nhóm Giải pháp.

### Lab 1 — Vòng chuyên môn sâu (~25 phút)

**Phong:** Chào Nam. Ở mức của em, anh muốn nghe em mô hình hoá một nghiệp vụ phức tạp thật sự. Chọn một ca em từng làm.

**Nam:** Dạ em chọn luồng "tiếp nhận và xử lý sự cố an ninh" — phức tạp vì chạy qua 3 bộ phận và có nhánh leo thang ạ. Em vẽ BPMN chia 3 lane: Hệ thống giám sát → Cán bộ trực → Đội ứng cứu. Điểm khó là các gateway: cảnh báo mức cao mà 15 phút không ai tiếp nhận thì tự leo thang lên trưởng ca — đây là timer event chứ không phải bước thao tác, hồi đầu em vẽ sai thành bước thủ công, dev làm theo và khách phát hiện khi nghiệm thu là hệ thống không tự leo thang. Sau lần đó em học kỹ phân biệt sự kiện tự động với thao tác người dùng trong BPMN, và mọi luồng có yếu tố thời gian em đều rà riêng một lượt ạ.

**Phong:** Lỗi thật và học thật — được. Prototype giờ em làm đến mức nào?

**Nam:** Dạ giờ em làm prototype click-through bằng Figma: các màn nối với nhau đúng luồng, khách bấm thử được từ danh sách cảnh báo → chi tiết → xử lý → đóng. Trước buổi demo với khách, em cho 2 cán bộ trực bấm thử trước — họ vướng ở đâu em sửa luôn ở prototype, rẻ hơn nhiều so với sửa khi đã code. Phân hệ ca trực vừa rồi khách chốt yêu cầu trên prototype nhanh hơn hẳn so với đọc tài liệu chữ ạ.

**Phong:** Hỗ trợ nghiệm thu — em từng làm đến vai trò gì?

**Nam:** Dạ em là đầu mối nghiệm thu phía dự án cho 2 đợt gần nhất ạ: chuẩn bị kịch bản nghiệm thu từ chính tài liệu yêu cầu — mỗi yêu cầu có mã thì kịch bản trỏ đúng mã đó, khách tick từng dòng; tổ chức buổi nghiệm thu, ghi biên bản các điểm đạt/chưa đạt/phát sinh; và phân loại phát sinh — cái nào là lỗi phải sửa, cái nào là yêu cầu mới phải đi quy trình thay đổi. Ranh giới đó nếu BA không giữ chắc thì dự án bị nghiệm thu kéo dài vô hạn ạ.

**Phong:** Cảm ơn em.

### Lab 2 — Vòng case thực chiến (~30 phút)

**Phong:** Case tổng hợp: khách là một tổng công ty muốn "nâng cấp hệ thống giám sát an ninh hiện có vì dùng bất tiện". Đề bài mơ hồ vậy thôi. Em là BA chính — 2 tuần đầu em làm gì?

**Nam:** Dạ tuần một em xác định "bất tiện" là gì và của ai ạ. Em xin danh sách các nhóm người dùng — cán bộ trực, trưởng ca, lãnh đạo xem báo cáo — và phỏng vấn mỗi nhóm 2–3 người theo khung: việc anh/chị làm hằng ngày trên hệ thống, chỗ nào mất thời gian nhất, chỗ nào phải làm ngoài hệ thống (Excel, giấy). Song song em xin số liệu sử dụng thật nếu có — chức năng nào dùng nhiều, chức năng nào gần như không ai vào. Tuần hai em tổng hợp thành danh sách vấn đề có phân loại và tần suất — kinh nghiệm em là "bất tiện" của 3 nhóm sẽ khác hẳn nhau, và vấn đề khách **nói** to nhất chưa chắc là vấn đề **nặng** nhất theo số liệu. Kết thúc 2 tuần em trình bảng vấn đề xếp hạng kèm đề xuất phạm vi giai đoạn 1 — những cái sửa được nhanh mà giảm đau nhiều nhất — để khách chốt trước khi đi sâu phân tích chi tiết ạ.

**Phong:** Khách đòi làm hết trong giai đoạn 1 thì em đàm phán thế nào?

**Nam:** Dạ em đưa bảng 3 cột: vấn đề — tác động nếu chưa sửa — công ước tính, rồi em đề xuất cắt theo nguyên tắc luồng làm việc trọn vẹn: giai đoạn 1 phải làm cho một ca trực chạy mượt từ đầu đến cuối, hơn là sửa lắt nhắt mỗi chỗ một tí không ai cảm nhận được. Em cũng nói thật với khách chi phí của "làm hết": tiến độ dài gấp đôi, rủi ro đổi yêu cầu giữa chừng cao hơn, và 6 tháng sau những cái xếp cuối bảng có khi khách không còn cần nữa. Thường khách nghe được khi mình cho họ thấy cắt phạm vi là **vì lợi ích của họ**, không phải vì đội dự án lười ạ.

**Phong:** Cảm ơn em.

### Lab 3 — Vòng hành vi (~20 phút)

**Phong:** Tình huống thật của bên anh: giữa dự án, dev lead và BA cãi nhau vì dev bảo "yêu cầu đổi liên tục", BA bảo "khách đổi chứ tôi đâu muốn". Em nhìn thế nào?

**Nam:** Dạ em từng ở đúng vị trí BA đó ạ. Em nhận ra phần lỗi của mình: em truyền thay đổi cho dev qua tin nhắn miệng, không có nhật ký, nên dev cảm giác "đổi liên tục" dù thực tế 1 sprint chỉ 2–3 thay đổi. Em sửa bằng cách công khai hoá: một bảng yêu cầu thay đổi duy nhất, ai cũng xem được, mỗi thay đổi có trạng thái và ngày hiệu lực; đầu sprint em điểm lại 5 phút trong họp planning. Số thay đổi không giảm ngay, nhưng cãi nhau hết — vì mọi người cãi với **bảng**, không cãi với nhau nữa ạ. Về gốc rễ, em cũng ngồi lại với khách về việc chốt yêu cầu kỹ hơn trước sprint thay vì chốt vội rồi đổi.

**Phong:** Em tổ chức một cuộc họp chốt yêu cầu với 5 bên tham gia — kinh nghiệm điều phối của em?

**Nam:** Dạ, em gửi trước tài liệu và **câu hỏi cần chốt** — họp để quyết, không phải để đọc tài liệu lần đầu ạ. Trong họp em giữ 3 vai: dẫn theo agenda từng điểm cần chốt, cắt đúng lúc khi thảo luận trôi sang chuyện ngoài phạm vi — em ghi vào "bãi đỗ" xử lý sau — và chốt lại thành lời từng quyết định ngay tại chỗ: "vậy thống nhất là X, anh A xác nhận nhé". Sau họp trong ngày em gửi biên bản: quyết định gì, ai chịu trách nhiệm gì, câu hỏi nào còn treo và hẹn chốt khi nào. Cuộc họp không có biên bản gửi lại thì coi như chưa họp ạ.

**Phong:** Cảm ơn Nam.

**Góc nhìn người chấm (Ex·V3):** đỉnh Experienced nhận diện qua: mô hình hoá xử lý được **nghiệp vụ nhiều bên + yếu tố thời gian** (kể được cả lỗi timer event và cách phòng lại), prototype thành công cụ chốt yêu cầu thật (test với người dùng trước khi demo), làm đầu mối nghiệm thu và **giữ chắc ranh giới lỗi/yêu-cầu-mới**, đàm phán phạm vi bằng lợi-ích-của-khách. Câu "mọi người cãi với bảng, không cãi với nhau" là tư duy hệ thống hoá — tín hiệu sẵn sàng lên Senior.

---

## Senior · Vùng 1

> Bắt đầu Senior — xuất hiện các nhóm mới: **Trải nghiệm người dùng**, **Kiến trúc & thiết kế giải pháp** (DFD, review tài liệu, tư vấn cải tiến) và phân tích thị trường/đối thủ — đều ở mức khởi đầu. Ứng viên **Linh** (~5 năm BA) phỏng vấn lên Senior. Người phỏng vấn: **chị Oanh**, Trưởng phòng Giải pháp. 3 vòng riêng.

### Lab 1 — Vòng chuyên môn sâu

**Oanh:** Chào Linh. Lên Senior thì BA phải nhìn được cả luồng dữ liệu hệ thống, không chỉ luồng nghiệp vụ. Em phân biệt hai cái đó thế nào?

**Linh:** Dạ, luồng nghiệp vụ (BPMN) trả lời "ai làm gì theo thứ tự nào" — góc nhìn con người và quy trình; còn luồng dữ liệu (DFD) trả lời "dữ liệu đi từ đâu, qua xử lý gì, lưu ở đâu" — góc nhìn thông tin ạ. Em mới bắt đầu vẽ DFD khoảng nửa năm nay: gần nhất em vẽ DFD mức ngữ cảnh và mức 1 cho phân hệ tiếp nhận cảnh báo — nguồn dữ liệu là các thiết bị giám sát, qua tiến trình chuẩn hoá rồi rẽ hai nhánh: lưu kho log và đưa vào tiến trình đối chiếu luật để sinh cảnh báo. Vẽ DFD xong em mới nhận ra một điều tài liệu nghiệp vụ không lộ: dữ liệu thô lưu 6 tháng theo quy định nhưng chưa ai chốt dung lượng — em nêu ra và kiến trúc sư phải bổ sung phương án lưu trữ ạ.

**Oanh:** Đúng giá trị của DFD đấy. UX thì sao — em áp dụng gì rồi?

**Linh:** Dạ em ở mức bắt đầu có ý thức UX ạ: trước khi vẽ màn hình em tự đặt mình vào vai người dùng — cán bộ trực đêm mắt mỏi thì cỡ chữ, độ tương phản của cảnh báo mức cao có nhìn nổi không; thao tác lặp 50 lần một ca thì tiết kiệm được click nào. Em cũng bắt đầu ngồi quan sát người dùng thật thao tác — 30 phút quan sát em học được nhiều hơn 3 buổi họp, ví dụ thấy cán bộ toàn dán mã cảnh báo ra Notepad để tra chéo, tức là hệ thống thiếu chức năng so sánh 2 cảnh báo. Nhưng em chưa được đào tạo bài bản về UX research hay usability test — đó là phần em định học thêm khi lên Senior ạ.

**Oanh:** Nhận thức đúng chỗ đứng. Cảm ơn em.

### Lab 2 — Vòng case thiết kế giải pháp

**Oanh:** Case: khách muốn thêm "phê duyệt 2 cấp khi đóng cảnh báo mức cao". Dev đề xuất làm popup xác nhận cho nhanh. Em ở vai người review giải pháp — ý kiến?

**Linh:** Dạ em sẽ chỉ ra popup xác nhận **không phải** phê duyệt 2 cấp ạ — popup vẫn là 1 người quyết, chỉ thêm 1 cú click; còn yêu cầu của khách là người thứ hai có thẩm quyền phải duyệt. Em phân tích lại nghiệp vụ: trưởng ca có luôn trực cùng không — nếu không thì cảnh báo chờ duyệt bao lâu, có cơ chế duyệt từ xa hay uỷ quyền không; và luồng bị từ chối duyệt thì cảnh báo quay về trạng thái nào. Sau đó em mới cùng dev chọn thiết kế — có thể là hàng đợi chờ duyệt kèm thông báo cho trưởng ca. Em cũng thẳng thắn với khách về chi phí: 2 cấp nghĩa là chậm hơn, nếu mục tiêu thật của họ chỉ là "tránh đóng nhầm" thì có phương án rẻ hơn — cho phép mở lại trong 24 giờ kèm log — để khách chọn giữa kiểm soát chặt và vận hành nhanh ạ.

**Oanh:** Phản biện được cả đề bài của khách — tốt. Em từng review tài liệu giải pháp của BA khác chưa?

**Linh:** Dạ mới bắt đầu ạ — em review chéo trong nhóm được vài tháng. Em rà theo 3 lớp: khớp nghiệp vụ không (luồng có đủ nhánh ngoại lệ chưa), khớp nội bộ không (mô hình dữ liệu có khớp mô tả chức năng không — lỗi hay gặp nhất), và viết cho dev làm được không. Em chưa dám nhận review sắc — có lần em bỏ lọt một mâu thuẫn giữa 2 chương mà anh BA cứng bắt được. Em đang gom các lỗi hay gặp thành checklist review cho cả nhóm dùng ạ.

**Oanh:** Cảm ơn em.

### Lab 3 — Vòng hành vi & phân tích thị trường

**Oanh:** Sản phẩm giám sát của mình có 2 đối thủ trên thị trường. Em đã bao giờ phân tích đối thủ chưa?

**Linh:** Dạ ở mức bắt đầu ạ. Quý trước em làm một bản so sánh 3 sản phẩm cùng loại: em lập bảng theo nhóm tính năng — thu thập, phát hiện, xử lý, báo cáo — đánh dấu có/không và ghi chú cách làm khác nhau, nguồn từ tài liệu công bố, video demo và bản dùng thử của 1 đối thủ. Phát hiện đáng giá nhất: cả 2 đối thủ đều có mobile app cho trưởng ca duyệt từ xa còn mình chưa có — đúng cái khách vừa than phiền ở case ban nãy. Bản đó em trình nội bộ, được dùng làm một căn cứ ưu tiên roadmap ạ. Em biết bản của em còn ở mức tính năng, chưa phân tích được định vị hay giá — mảng đó em cần học thêm.

**Oanh:** Câu cuối: điểm khác lớn nhất giữa BA Experienced và BA Senior theo em là gì?

**Linh:** Dạ theo em, Experienced trả lời tốt câu "khách cần gì và viết thành tài liệu đúng"; Senior phải trả lời thêm câu "giải pháp này có **đáng làm** không và có **đúng hướng sản phẩm** không" — tức là từ người ghi nhận và phân tích yêu cầu thành người có chính kiến về giải pháp, dám phản biện cả đề bài của khách như ca phê duyệt 2 cấp ban nãy ạ.

**Oanh:** Cảm ơn Linh.

**Góc nhìn người chấm (Senior·V1):** điểm vào Senior chấm theo khuôn "kỹ năng mới ở mức khởi đầu nhưng **đã làm thật + biết ranh giới**": DFD vẽ được 2 mức và ra giá trị thật (lộ vấn đề lưu trữ), UX từ quan sát người dùng thật, phân tích đối thủ bản đầu tiên có phát hiện dùng được (mobile app), review chéo có phương pháp và thành thật về lần bỏ lọt. Câu phân biệt Ex/Senior ("có chính kiến về giải pháp, dám phản biện đề bài") cho thấy hiểu đúng bước chuyển vai.

---

## Senior · Vùng 2

> Giữa Senior — các kỹ năng giải pháp phải vận hành đều tay. Ứng viên **Đạt** phỏng vấn chuyển công ty ở vùng Senior·V2. Người phỏng vấn: **anh Kiên**, Giám đốc Sản phẩm.

### Lab 1 — Vòng chuyên môn sâu

**Kiên:** Chào Đạt. Anh hỏi thẳng: em đề xuất cách tiếp cận phân tích cho một dự án mới như thế nào? Cho ví dụ thật.

**Đạt:** Dạ em chọn cách tiếp cận theo đặc điểm dự án chứ không dùng một khuôn ạ. Ví dụ thật: dự án A là nâng cấp hệ thống đang chạy, nghiệp vụ đã rõ — em đi theo hướng phân tích tài liệu cũ + số liệu sử dụng + phỏng vấn bổ sung, nặng về mô hình hoá as-is/to-be để lộ ra chỗ thay đổi. Dự án B ngược lại — sản phẩm mới cho nghiệp vụ khách còn mơ hồ — em đề xuất làm theo vòng lặp: workshop khám phá, prototype sớm, demo 2 tuần một lần cho khách phản hồi, tài liệu chi tiết viết cuốn chiếu theo phần đã chốt thay vì viết trọn bộ trước. Em trình bày lựa chọn này với PM ngay đầu dự án kèm lý do và rủi ro từng hướng — chọn sai cách tiếp cận thì BA chạy theo sửa tài liệu cả dự án ạ.

**Kiên:** Review tài liệu giải pháp — giờ em ở vai trò gì?

**Đạt:** Dạ em là người review chính cho nhóm 4 BA ạ, có checklist review nhóm em cùng xây từ các lỗi thật — 18 mục, chia 3 lớp nghiệp vụ/nhất quán/khả thi. Em review khoảng 2 tài liệu mỗi sprint. Lỗi em bắt được nhiều nhất là mâu thuẫn giữa quy tắc nghiệp vụ và mô hình dữ liệu — ví dụ gần nhất: tài liệu ghi "một cảnh báo có thể thuộc nhiều chiến dịch tấn công" nhưng mô hình dữ liệu vẽ quan hệ 1-n, dev mà code theo thì sau này sửa rất đắt. Em cũng đổi cách review từ "sửa hộ" sang "hỏi ngược" — comment dạng câu hỏi để bạn BA tự nhìn ra, chậm hơn chút nhưng các bạn tiến bộ thật ạ.

**Kiên:** Cảm ơn em.

### Lab 2 — Vòng case tư vấn giải pháp

**Kiên:** Case: khách vận hành trung tâm giám sát 24/7 than "mỗi ca trực ngập trong cảnh báo, xử không xuể". Họ đề nghị mua thêm màn hình to và tuyển thêm người. Em tư vấn thế nào?

**Đạt:** Dạ đề nghị của khách là giải pháp cho triệu chứng ạ — em sẽ tư vấn từ số liệu trước khi bàn giải pháp. Em xin dữ liệu cảnh báo 3 tháng và phân tích: bao nhiêu phần trăm cảnh báo là trùng lặp — cùng một sự việc sinh nhiều cảnh báo; bao nhiêu là cảnh báo giả theo từng luật; và phân bố theo giờ — ngập cả ngày hay chỉ giờ cao điểm. Ca em làm thật năm ngoái ra kết quả điển hình: 60% cảnh báo đến từ 4 luật quá nhạy và các cảnh báo trùng chưa được gom nhóm. Giải pháp em tư vấn theo 3 lớp chi phí tăng dần: hiệu chỉnh 4 luật + bật gom nhóm cảnh báo cùng nguồn — làm ngay, gần như miễn phí; thêm màn hình ưu tiên hiển thị theo mức độ thay vì theo thời gian — 1 sprint; còn tuyển người thì chỉ khi 2 lớp trên xong mà tải vẫn vượt — và lúc đó có số liệu để tính tuyển đúng mấy người thay vì đoán. Khách đi lớp 1 xong giảm 55% lượng cảnh báo hiển thị, không phải tuyển thêm ạ.

**Kiên:** Tư vấn ngược lại đề nghị của khách mà vẫn giữ được quan hệ — bí quyết?

**Đạt:** Dạ em không bao giờ nói "anh chị sai" ạ — em nói "đề xuất của mình làm được, và em muốn chắc là mình mua đúng thứ đang thiếu; cho em 2 tuần đo lại đã". Số liệu ra thì khách tự nhìn thấy, quyết định cuối vẫn là của họ và công của họ luôn — em chỉ là người soi đèn. BA tư vấn mà tranh công với khách thì lần sau không được mời vào phòng họp nữa ạ.

**Kiên:** Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Kiên:** Xây tài liệu chỉ tiêu kỹ thuật — em tham gia đến mức nào?

**Đạt:** Dạ em chủ trì phần chỉ tiêu nghiệp vụ và phối hợp kiến trúc sư phần kỹ thuật ạ. Ví dụ hợp đồng gần nhất: em chuyển yêu cầu mơ hồ "hệ thống phản hồi nhanh" của khách thành chỉ tiêu đo được — thời gian từ lúc sự kiện xảy ra đến lúc cảnh báo hiển thị ≤ 30 giây với 95% trường hợp, đo tại điều kiện tải quy định — và bảo đảm từng chỉ tiêu đều có cách nghiệm thu tương ứng. Bài học của em: chỉ tiêu nào viết ra mà không trả lời được "nghiệm thu bằng cách nào" thì sớm muộn cũng thành tranh chấp hợp đồng ạ.

**Kiên:** Đánh giá độ ưu tiên khi mọi yêu cầu khách đều nói "gấp"?

**Đạt:** Dạ em tách "gấp" thành 2 trục: giá trị nghiệp vụ — ai hưởng lợi, tần suất dùng, hậu quả nếu chưa có — và chi phí/rủi ro thực hiện. Em cho khách tự chấm trục giá trị theo thang có mô tả cụ thể, đội dự án chấm trục chi phí, ra ma trận thì thứ tự tự lộ. Mẹo của em: bắt khách xếp hạng bằng cách "nếu chỉ được 3 cái trong quý này thì chọn gì" — câu đó phá được mọi danh sách toàn-độ-ưu-tiên-cao ạ. Kết quả em trình lãnh đạo dạng 1 trang: 3 việc quý này, lý do, cái gì bị đẩy lại và rủi ro của việc đẩy — đủ để ra quyết định trong 15 phút.

**Kiên:** Cảm ơn Đạt.

**Góc nhìn người chấm (Senior·V2):** giữa Senior, mọi kỹ năng giải pháp phải **vận hành đều và có số**: chọn cách tiếp cận theo đặc điểm dự án (as-is/to-be vs vòng lặp prototype), review chính cho nhóm với checklist từ lỗi thật, tư vấn ngược đề nghị khách bằng dữ liệu (60% từ 4 luật → giảm 55%) mà vẫn giữ quan hệ ("em chỉ là người soi đèn"), chỉ tiêu kỹ thuật gắn chặt cách nghiệm thu. Điểm phân biệt với V1: không còn "mới bắt đầu" — mọi thứ đã là việc làm đều tay có phương pháp riêng.

---

## Senior · Vùng 3

> Đỉnh Senior — phân tích đối thủ, tư vấn cải tiến, review đạt ③, tiệm cận Specialist. Ứng viên **Hoa** phỏng vấn ở vùng cao nhất Senior. Người phỏng vấn: **chị Vy**, Phó Giám đốc Trung tâm Sản phẩm.

### Lab 1 — Vòng chuyên môn sâu

**Vy:** Chào Hoa. Phân tích thị trường ở mức của em thì khác gì một bảng so sánh tính năng?

**Hoa:** Dạ khác ở chỗ trả lời được câu "vậy mình nên làm gì" ạ. Bảng tính năng chỉ là dữ liệu đầu vào — em làm thêm 3 lớp: định vị — từng đối thủ đang nhắm phân khúc nào, đối thủ A mạnh ở khối tài chính nhờ bộ báo cáo tuân thủ, đối thủ B đi giá rẻ cho doanh nghiệp vừa; xu hướng — 3 bản phát hành gần nhất của họ dồn vào đâu, ví dụ cả hai đều đang đổ vào phát hiện bằng học máy, tức là chuẩn kỳ vọng của thị trường đang dịch; và khoảng trống — phân khúc khối nhà nước cần triển khai nội bộ hoàn toàn thì cả hai đều yếu, đó là cửa của mình. Bản phân tích quý trước của em kết bằng 3 khuyến nghị roadmap được ban giám đốc duyệt 2 ạ — em coi thước đo của phân tích là **quyết định được đưa ra từ nó**, không phải độ dày tài liệu.

**Vy:** Review tài liệu giải pháp ở mức ③ — em mô tả vai trò hiện tại?

**Hoa:** Dạ em là chốt chặn cuối về giải pháp nghiệp vụ trước khi tài liệu quan trọng ra khỏi trung tâm ạ — các tài liệu gửi khách hàng lớn hoặc làm căn cứ hợp đồng. Em review khác mức trước ở chỗ nhìn cả **rủi ro thương mại**: điều khoản mô tả mơ hồ nào sau này khách có thể diễn giải bất lợi cho mình, cam kết nào vượt khả năng hệ thống hiện tại. Gần nhất em chặn một tài liệu ghi "hệ thống phát hiện mọi hành vi bất thường" — chữ "mọi" đó trong hợp đồng là quả bom, em sửa thành danh mục hành vi cụ thể kèm phụ lục cập nhật định kỳ ạ.

**Vy:** Bắt đúng quả bom thật. Cảm ơn em.

### Lab 2 — Vòng case cải tiến & tư vấn

**Vy:** Case lớn: tổng công ty khách hàng có 4 hệ thống an ninh rời rạc — giám sát mạng, quản lý tài sản, kiểm soát truy cập, báo cáo tuân thủ — nhập liệu trùng lặp, số liệu vênh nhau. Họ mời mình tư vấn tổng thể. Em dẫn bài toán này thế nào?

**Hoa:** Dạ đây là bài toán cải tiến liên hệ thống — em bắt đầu từ **dòng chảy nghiệp vụ xuyên suốt** chứ không từ từng hệ thống ạ. Em chọn 2–3 luồng đầu-cuối đau nhất, ví dụ "một nhân viên nghỉ việc": khoá truy cập ở hệ thống kiểm soát, thu hồi tài sản ở hệ thống tài sản, cập nhật báo cáo tuân thủ — hiện tại 3 thao tác tay ở 3 nơi, quên một cái là lỗ hổng an ninh thật. Em vẽ luồng as-is xuyên 4 hệ thống, đo điểm gãy: chỗ nào nhập tay lại, chỗ nào số liệu vênh vì cập nhật lệch thời điểm. Từ đó ra kiến nghị theo tầng: ngắn hạn — chuẩn hoá dữ liệu chung, tối thiểu là mã nhân viên và mã tài sản thống nhất; trung hạn — tích hợp 2 luồng đau nhất qua API; dài hạn — lộ trình về một nền tảng chung, kèm điều kiện tiên quyết và chi phí từng bước. Em trình lãnh đạo tổng công ty bằng chính câu chuyện "nhân viên nghỉ việc" đó — một luồng cụ thể mà cả hội trường đều từng gặp thuyết phục hơn mọi sơ đồ kiến trúc ạ.

**Vy:** Nếu nội bộ khách chia phe — phòng A muốn giữ hệ thống riêng, phòng B muốn hợp nhất?

**Hoa:** Dạ em tách phần **sự thật chung** ra trước: hai phe thường đồng ý với nhau về hiện trạng đau ở đâu, chỉ khác nhau về giải pháp. Em chốt bảng hiện trạng có cả hai phe ký nhận, rồi thiết kế lộ trình sao cho bước đầu **không ép ai bỏ hệ thống** — chuẩn hoá dữ liệu và tích hợp API thì phòng A vẫn giữ được hệ thống của họ. Quyết định hợp nhất hay không đẩy về sau, khi số liệu vận hành của giai đoạn tích hợp tự nói. Kinh nghiệm của em: bài toán chính trị nội bộ khách không giải bằng thuyết trình hay ho hơn, mà bằng lộ trình cho phép các bên **không mất mặt ở bước đầu** ạ.

**Vy:** Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Vy:** Em đang dẫn dắt các BA khác thế nào?

**Hoa:** Dạ em phụ trách chuyên môn nhóm 5 BA — phân việc theo độ chín từng bạn, review có lộ trình nới dần: bạn cứng thì em chỉ review tài liệu ra ngoài trung tâm, bạn mới thì review cả tài liệu nội bộ. Em duy trì sinh hoạt chuyên môn 2 tuần một lần, luân phiên mỗi bạn trình một ca khó của chính mình — văn hoá "mang ca khó ra hội chẩn" giúp cả nhóm giỏi lên từ dự án của nhau. Hai bạn trong nhóm vừa được nâng vùng kỳ rồi theo lộ trình em thiết kế cùng từng bạn ạ.

**Vy:** Câu cuối: điều gì em thấy mình còn thiếu để nhận vai Specialist?

**Hoa:** Dạ hai thứ ạ. Một là bề dày ở tầm giải pháp tổng thể liên hệ thống — ca như tổng công ty ban nãy em mới chủ trì 2 lần, muốn vững phải qua thêm vài ca ở các lĩnh vực khác nhau. Hai là ảnh hưởng ở tầm tổ chức — hiện em thuyết phục tốt trong phạm vi dự án và trung tâm, còn đứng trước ban lãnh đạo tổng công ty khách để bảo vệ một giải pháp chiến lược thì em mới làm với vai phụ. Em muốn vai trò mới cho em cơ hội đó, với sự đỡ đầu giai đoạn đầu ạ.

**Vy:** Tự đánh giá chính xác. Cảm ơn Hoa.

**Góc nhìn người chấm (Senior·V3):** đỉnh Senior thể hiện ở **chất lượng phán đoán**: phân tích đối thủ đo bằng quyết định sinh ra từ nó (2/3 khuyến nghị được duyệt), review bắt được rủi ro thương mại (chữ "mọi" trong hợp đồng), case liên hệ thống dẫn bằng luồng nghiệp vụ cụ thể + lộ trình "không ai mất mặt". Câu tự định vị thiếu gì để lên Specialist (bề dày liên hệ thống + ảnh hưởng tầm tổ chức) trùng khớp chính xác với 2 kỹ năng lõi của thang Specialist — hiểu thang chính là một tín hiệu trưởng thành.

---

## Specialist · Vùng 1

> Bước vào Specialist — trọng tâm mới: **giải pháp tổng thể liên thông hệ thống, thẩm định giải pháp của người khác, đánh giá hiệu quả tính năng, đào tạo đội ngũ BA** (đều ở mức khởi đầu ①). Ứng viên **Quang** (~9 năm) phỏng vấn vào vai trò Chuyên gia Giải pháp nghiệp vụ. Người phỏng vấn: **anh Thắng**, Giám đốc Trung tâm.

### Lab 1 — Vòng giải pháp tổng thể

**Thắng:** Chào Quang. Vai này chịu trách nhiệm giải pháp tổng thể — em phân biệt nó với việc phân tích giỏi từng hệ thống thế nào?

**Quang:** Dạ, phân tích từng hệ thống trả lời "hệ thống này nên như thế nào"; giải pháp tổng thể trả lời "**bức tranh** các hệ thống nên như thế nào để nghiệp vụ chạy xuyên suốt" ạ — đơn vị phân tích là dòng nghiệp vụ đầu-cuối và dòng dữ liệu giữa các hệ thống, không phải chức năng trong một hệ thống. Em mới bước vào tầm này khoảng một năm: ca lớn nhất là quy hoạch lại luồng dữ liệu cảnh báo giữa hệ thống giám sát, hệ thống ticket và hệ thống báo cáo của một khách tổng công ty — trước đó ba hệ thống ba con số "sự cố tháng này" khác nhau, lãnh đạo họ không tin báo cáo nào. Em xác định gốc: mỗi hệ thống tự định nghĩa "sự cố" một kiểu và không có nguồn sự thật duy nhất. Giải pháp em chủ trì là chuẩn hoá từ điển nghiệp vụ chung — sự cố là gì, khi nào được tính — và quy định hệ thống ticket là nguồn sự thật, hai hệ thống kia đối chiếu theo. Em nói thật là ở ca đó em còn dựa nhiều vào anh kiến trúc sư trưởng phần kỹ thuật tích hợp — phần em vững là tầng nghiệp vụ và dữ liệu ạ.

**Thắng:** Phân vai thế là đúng — Specialist BA không cần thay kiến trúc sư. Cảm ơn em.

### Lab 2 — Vòng thẩm định & đánh giá hiệu quả

**Thắng:** Vai này phải thẩm định giải pháp của các BA trong trung tâm. Thẩm định khác review chỗ nào, và em làm thế nào?

**Quang:** Dạ review là góp ý để tài liệu tốt lên; thẩm định là **chịu trách nhiệm gác cổng** — ký thì mình chịu trách nhiệm cùng, nên phải có tiêu chí rõ và dám bác ạ. Em mới nhận vai thẩm định nửa năm nay ở trung tâm hiện tại, em xây tiêu chí 3 cửa: giải pháp giải đúng bài toán gốc chưa — em yêu cầu mọi tài liệu mở đầu bằng phát biểu vấn đề và tiêu chí thành công đo được, thiếu là trả về ngay; phương án đã cân nhắc lựa chọn thay thế chưa — tài liệu chỉ có 1 phương án duy nhất là dấu hiệu đỏ; và rủi ro triển khai đã nêu trung thực chưa. Ca đầu tiên em bác là một giải pháp tự xây module định danh riêng trong khi tổng công ty đã có hệ thống định danh tập trung — bạn BA không sai về kỹ thuật, nhưng tạo thêm một ốc đảo dữ liệu mới, đúng cái bệnh mình đang chữa ạ.

**Thắng:** Đánh giá hiệu quả tính năng sau khi phát hành — em làm gì rồi?

**Quang:** Dạ mức bắt đầu có phương pháp ạ: em đưa quy định mọi yêu cầu lớn phải khai "chỉ số thành công" ngay từ tài liệu phân tích — ví dụ tính năng gom nhóm cảnh báo thì chỉ số là giảm số cảnh báo hiển thị mỗi ca và thời gian xử lý trung bình — rồi 1–3 tháng sau phát hành em tổ chức phiên nhìn lại số thật. Phiên đầu tiên khá đau: 2 trong 5 tính năng của quý gần như không ai dùng — một cái do đặt sai chỗ trong giao diện, một cái do nghiệp vụ đã đổi từ lúc phân tích đến lúc phát hành. Nhưng chính phiên đó thuyết phục được ban giám đốc duy trì cơ chế này — biết mình làm ra thứ không ai dùng còn hơn không biết ạ.

**Thắng:** Cảm ơn em.

### Lab 3 — Vòng đào tạo & lãnh đạo

**Thắng:** Đào tạo đội BA — em hình dung và đã làm gì?

**Quang:** Dạ em đã làm bản thu nhỏ ở trung tâm cũ: khung năng lực BA 4 nhóm — phân tích & mô hình hoá, nghiệp vụ ngành, giải pháp, kỹ năng làm việc với con người — mỗi kỹ năng có mô tả hành vi theo mức để tự soi và lead đối chiếu. Từ khoảng trống chung, em thiết kế 2 khoá thực hành: một khoá mô hình hoá nâng cao dùng chính các ca dự án đã xong của trung tâm làm bài tập, một khoá kỹ năng dẫn workshop với khách — học viên dẫn thật, cả lớp đóng vai khách khó tính. Sau 2 khoá, thước đo em nhìn là tài liệu qua thẩm định lần đầu tăng từ khoảng một nửa lên hơn 80% ạ. Sang vai trò mới, việc đầu tiên em làm vẫn là dựng khung năng lực cùng các lead — thước chung phải có trước, đào tạo là hệ quả của khoảng trống, không phải danh sách khoá học mua sẵn ạ.

**Thắng:** Câu cuối — tình huống quyền lực: một giám đốc dự án phản đối kết luận thẩm định của em, đòi cho qua vì tiến độ. Em xử thế nào?

**Quang:** Dạ em tách 2 chuyện: kết luận chuyên môn của em không đổi vì áp lực tiến độ — đổi một lần là chức năng thẩm định mất giá trị vĩnh viễn ạ. Nhưng em không chặn cứng: em đưa phương án "chấp nhận rủi ro có hồ sơ" — nêu rõ rủi ro gì, ai gánh, kèm điều kiện phải vá trong bao lâu — và người ký chấp nhận là cấp có thẩm quyền trên cả hai chúng em. Dự án vẫn có thể chạy nếu cấp trên chấp nhận, nhưng là quyết định minh bạch có người chịu trách nhiệm, không phải thẩm định bị bẻ cong trong im lặng ạ.

**Thắng:** Cảm ơn Quang.

**Góc nhìn người chấm (Spec·V1):** điểm vào Specialist BA nhận diện qua: **đã chủ trì ca liên hệ thống thật** (từ điển nghiệp vụ chung + nguồn sự thật duy nhất) và thành thật về phần dựa vào kiến trúc sư; phân biệt sắc **thẩm định ≠ review** (gác cổng, có tiêu chí, dám bác — ca bác đầu tiên đúng bệnh ốc-đảo-dữ-liệu); đánh giá hiệu quả tính năng dám công bố kết quả đau (2/5 không ai dùng). Nguyên tắc "kết luận chuyên môn không đổi vì tiến độ, nhưng mở đường chấp-nhận-rủi-ro-có-hồ-sơ" là đúng tư thế của chức năng thẩm định.

---

## Specialist · Vùng 2

> Giữa thang Specialist — các năng lực tầm tổ chức đã vận hành đều. Ứng viên **Ngọc** phỏng vấn vai trò Chuyên gia cấp cao tại tổng công ty. Người phỏng vấn: **chị Bích**, Phó Tổng Giám đốc phụ trách Chuyển đổi số.

### Lab 1 — Vòng giải pháp tổng thể

**Bích:** Chào Ngọc. Kể chị ca giải pháp liên thông lớn nhất em đã chủ trì trọn vẹn.

**Ngọc:** Dạ, chương trình hợp nhất nghiệp vụ giám sát an ninh cho một tập đoàn có 6 công ty thành viên ạ — mỗi công ty một hệ thống, một quy trình, một bộ chỉ số riêng, tập đoàn không có bức tranh an ninh chung. Em chủ trì tầng giải pháp nghiệp vụ trong 18 tháng: chuẩn hoá quy trình xử lý sự cố chung 4 mức cho cả 6 đơn vị — phần khó nhất không phải vẽ quy trình mà là đàm phán, vì mỗi đơn vị đều tin quy trình của mình đúng; em xử bằng cách lấy dữ liệu sự cố 1 năm của cả 6 bên, chứng minh mô hình nào có thời gian xử lý tốt nhất theo từng loại sự cố, lấy cái tốt nhất của mỗi bên ghép lại thành chuẩn chung — không bên nào "thua" cả, và chuẩn chung có số liệu chống lưng. Sau đó mới đến tầng hệ thống: báo cáo hợp nhất theo từ điển chỉ số chung, lộ trình 3 bước để các hệ thống cũ tiếp tục chạy nhưng đẩy dữ liệu chuẩn hoá về nền tảng tập trung. Đến nay 6/6 đơn vị đã lên báo cáo hợp nhất, tập đoàn lần đầu có một con số sự cố duy nhất ạ.

**Bích:** "Lấy cái tốt nhất của mỗi bên có số liệu chống lưng" — cách đàm phán chuẩn. Cảm ơn em.

### Lab 2 — Vòng thẩm định & chiến lược

**Bích:** Vai trò thẩm định của em bây giờ vận hành thế nào — quy mô, cơ chế?

**Ngọc:** Dạ em chủ trì hội đồng thẩm định giải pháp nghiệp vụ của tổng công ty ạ — mọi giải pháp cho hợp đồng trên ngưỡng quy định hoặc chạm dữ liệu nhạy cảm đều qua hội đồng. Cơ chế em thiết kế sau 1 năm vận hành thử: thẩm định 2 vòng — vòng hồ sơ theo bộ tiêu chí công khai, BA biết trước mình bị chấm gì nên chất lượng đầu vào tự lên; vòng hội đồng chỉ dành cho ca lớn, BA trình bày và phản biện trực tiếp. Số liệu năm rồi: 47 hồ sơ, bác 6, yêu cầu sửa 19 — và quan trọng hơn là 2 ca bác đã tránh cho tổng công ty cam kết 2 điều khoản bất khả thi với khách bộ ngành, loại rủi ro mà nếu ký rồi thì thiệt hại tính bằng uy tín chứ không chỉ tiền ạ. Em cũng giữ kỷ luật cho chính hội đồng: mỗi kết luận bác đều kèm hướng sửa cụ thể — thẩm định mà chỉ biết bác thì thành cửa ải, không thành đòn bẩy chất lượng.

**Bích:** Đánh giá hiệu quả tính năng — em nâng nó lên mức nào rồi?

**Ngọc:** Dạ giờ nó là một khâu chính thức trong vòng đời sản phẩm của tổng công ty ạ: mọi tính năng lớn có hồ sơ chỉ số thành công từ lúc phân tích, phiên nhìn-lại-số-thật theo quý với ban sản phẩm, và kết quả đưa thẳng vào quyết định roadmap quý sau. Hai năm vận hành, tỷ lệ tính năng phát hành xong bị xếp "không đạt kỳ vọng" giảm từ khoảng 40% xuống dưới 15% — không phải vì đội làm giỏi lên đột biến, mà vì các yêu cầu mơ hồ bị chặn từ đầu: không khai được chỉ số thành công thì chưa được vào roadmap ạ.

**Bích:** Cảm ơn em.

### Lab 3 — Vòng lãnh đạo & ảnh hưởng tổ chức

**Bích:** Đội ngũ BA của tổng công ty — dấu ấn của em?

**Ngọc:** Dạ em xây và vận hành chương trình phát triển BA toàn tổng công ty 2 năm nay ạ: khung năng lực chuẩn dùng chung cho đánh giá kỳ và lộ trình cá nhân; học viện nội bộ 3 cấp — nền tảng cho người mới, chuyên sâu theo ngành nghiệp vụ, và lớp "giải pháp gia" em trực tiếp đứng cho nhóm tiềm năng lên Specialist; cộng đồng BA sinh hoạt tháng khoảng 60 người. Số em theo dõi: 5 bạn từ lớp giải pháp gia đã chủ trì được giải pháp cấp trung tâm, 2 bạn vào hội đồng thẩm định cùng em. Em cũng đổi được một chính sách: BA giỏi trước đây muốn tăng lương phải chuyển sang quản lý — em thuyết phục ban lãnh đạo mở ngạch chuyên gia song song, giữ được 3 bạn cứng suýt nghỉ vì hết đường phát triển ạ.

**Bích:** Đổi được chính sách ngạch là ảnh hưởng tổ chức thật. Câu cuối: em thuyết trình giải pháp trước ban lãnh đạo cấp tập đoàn — nguyên tắc của em?

**Ngọc:** Dạ 3 nguyên tắc ạ: mở đầu bằng quyết định cần họ đưa ra hôm nay — không phải bằng bối cảnh dài dòng; mọi phương án đều có giá và rủi ro đặt cạnh nhau — lãnh đạo cấp đó dị ứng với phương án chỉ có ưu điểm; và chuẩn bị sẵn câu trả lời cho "vì sao không làm cách X" — vì trong phòng luôn có người hỏi đúng câu đó. Bài trình 40 slide thì 37 slide là phụ lục ạ — 3 slide đầu phải đủ để quyết.

**Bích:** Cảm ơn Ngọc.

**Góc nhìn người chấm (Spec·V2):** giữa thang Specialist, mọi năng lực phải ở trạng thái **cơ chế chính thức có số vận hành**: chương trình 6 công ty thành viên ra kết quả cuối (một con số sự cố duy nhất), hội đồng thẩm định có cơ chế 2 vòng + số liệu năm (47/6/19) + nguyên tắc "bác kèm hướng sửa", đánh giá hiệu quả thành khâu bắt buộc làm tỷ lệ không-đạt giảm 40% → 15%, và ảnh hưởng tổ chức đo bằng **chính sách bị thay đổi** (mở ngạch chuyên gia). Khác V1: không còn "bản thu nhỏ, nửa năm đầu" — tất cả đã chạy nhiều năm, nhiều đơn vị.

---

## Specialist · Vùng 3

> Vùng cuối toàn thang — mức ④: chuyên gia đầu ngành được tổ chức và khách hàng lớn công nhận. Ứng viên **Sơn** (~13 năm) phỏng vấn vai trò Chuyên gia trưởng Giải pháp nghiệp vụ cấp tập đoàn. Người phỏng vấn: **anh Cường**, Tổng Giám đốc một công ty thành viên, cùng **chị Bích**, Phó Tổng Giám đốc Chuyển đổi số.

### Lab 1 — Vòng giải pháp tổng thể đỉnh

**Cường:** Chào anh Sơn. Ở mức chuyên gia trưởng, câu hỏi của tôi là: điều gì chứng minh anh ở mức "chuyên sâu" chứ không phải "làm lâu năm"?

**Sơn:** Dạ, em nghĩ ba thứ ạ. Một — các ca mà tổ chức chỉ dám giao cho em: 2 năm gần nhất em là kiến trúc sư nghiệp vụ trưởng của chương trình chuyển đổi số an ninh cho một khách hàng cấp bộ — 11 hệ thống, 4 nhà thầu, và bài toán khó nhất không phải kỹ thuật mà là thiết kế **mô hình vận hành nghiệp vụ chung** để 4 nhà thầu với 4 lợi ích khác nhau vẫn phải khớp vào một dòng chảy dữ liệu; em thiết kế cơ chế từ điển dữ liệu chung có hội đồng quản trị thay đổi — nhà thầu nào muốn đổi cấu trúc dữ liệu giao tiếp đều phải qua hội đồng đó, chấm dứt cảnh sửa một đầu vỡ ba đầu. Hai — phương pháp của em thành chuẩn: bộ phương pháp phân tích giải pháp liên hệ thống em đúc kết đã được ban hành thành quy trình cấp tổng công ty, các chương trình lớn bắt buộc dùng. Ba — em được gọi khi chưa có bài toán: các tổng giám đốc công ty thành viên mời em ngồi từ vòng định hình chủ trương, trước khi có dự án — đó là lúc em biết vai trò của mình đã đổi từ người giải bài sang người giúp **ra đề đúng** ạ.

**Cường:** "Từ người giải bài sang người ra đề đúng" — chính xác là thứ chúng tôi tìm. Cảm ơn anh.

### Lab 2 — Vòng chiến lược & thẩm định cấp tập đoàn

**Bích:** Nếu nhận vai này, anh chịu trách nhiệm chất lượng giải pháp nghiệp vụ của cả tập đoàn — nhiều ngành: an ninh, viễn thông, tài chính. Anh không thể giỏi hết các ngành. Anh làm thế nào?

**Sơn:** Dạ chị nói đúng điểm cốt lõi — ở tầm này em không bán kiến thức ngành nữa, em bán **hệ thống bảo đảm chất lượng tư duy giải pháp** ạ. Em làm 3 việc: chuẩn phương pháp — mọi giải pháp bất kể ngành đều phải qua cùng bộ câu hỏi gốc: bài toán thật là gì, ai khổ, đo thành công bằng gì, phương án thay thế nào đã bị loại và vì sao — phương pháp đúng thì người ngành nào cũng tự tìm ra lỗ hổng của họ; mạng lưới chuyên gia ngành — em xây và duy trì hội đồng thẩm định liên ngành, mỗi ca lớn em ghép chuyên gia đúng ngành với chuyên gia phương pháp, em chủ trì phần phương pháp; và đào tạo lớp kế cận — mỗi ngành phải có ít nhất 2 người đạt mức thẩm định độc lập, em đo bằng việc em rút khỏi hội đồng ngành nào thì ngành đó vẫn chạy. Năm rồi em rút được khỏi hội đồng ngành viễn thông — với em đó là thành tích chứ không phải mất quyền ạ.

**Bích:** Cảm ơn anh.

### Lab 3 — Vòng ảnh hưởng tổ chức & di sản

**Cường:** Câu cuối cùng, câu tôi hỏi mọi ứng viên cấp này: 5 năm nữa nhìn lại, anh muốn cái gì còn chạy mà không cần anh?

**Sơn:** Dạ ba thứ ạ. Thứ nhất, **hệ phương pháp** — bộ quy trình phân tích và thẩm định giải pháp đã ban hành, được cập nhật bởi chính cộng đồng dùng nó chứ không phải chờ em sửa; em đã thiết kế cơ chế đề xuất cải tiến mở, năm rồi 6 trong 9 thay đổi phương pháp đến từ các BA trẻ. Thứ hai, **lớp người** — mục tiêu của em là mỗi công ty thành viên có ít nhất một người ngồi được đúng chỗ em đang ngồi ở cấp của họ; hiện được 4 trên 7 công ty, còn 3. Thứ ba — cái này em nghiệm từ chính nghề BA — là **văn hoá hỏi "bài toán thật là gì" trước khi bàn giải pháp**: khi câu hỏi đó bật ra tự nhiên trong mọi cuộc họp từ cấp phòng đến cấp tập đoàn, kể cả khi không có BA nào trong phòng, thì coi như nghề của em đã hoàn thành nhiệm vụ ở tổ chức này. Người ta hay đo chuyên gia bằng những gì họ xây; em muốn được đo bằng những gì vẫn đứng vững khi em vắng mặt ạ.

**Cường:** Cảm ơn anh Sơn. Chúng tôi sẽ trao đổi và phản hồi sớm.

**Góc nhìn người chấm (Spec·V3):** mức ④ của BA nhận diện qua ba tầng: **ca chỉ-mình-làm-được** (mô hình vận hành chung cho 11 hệ thống 4 nhà thầu — bài toán quyền lợi, không phải kỹ thuật), **phương pháp cá nhân thành chuẩn tổ chức có cơ chế tự tiến hoá** (6/9 thay đổi đến từ người khác), và **di sản đo bằng sự vắng mặt** — rút khỏi hội đồng mà ngành vẫn chạy, văn hoá "bài toán thật là gì" sống không cần mình. Ứng viên đạt ④ không kể mình giỏi gì — họ kể tổ chức đã đổi gì, và bằng chứng mạnh nhất luôn là những thứ vận hành tốt khi họ không có mặt.
