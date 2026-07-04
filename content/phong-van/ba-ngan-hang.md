# Lab phỏng vấn — BA nghiệp vụ Ngân hàng

> Bộ lab **theo domain** đầu tiên của SkillPath: cùng thang năng lực BA (Experienced → Senior → Specialist, 9 vùng), nhưng toàn bộ bối cảnh là **nghiệp vụ ngân hàng bán lẻ** — hành trình khởi tạo khoản vay trên hệ thống LOS: tiếp nhận hồ sơ → tra cứu CIC → thẩm định → phê duyệt theo cấp thẩm quyền → giải ngân; vùng cao mở rộng sang bài toán liên thông LOS – core banking – thẻ – ebanking. Ứng viên không chỉ cần kỹ năng BA đúng vùng mà còn phải **nói chuyện được bằng ngôn ngữ tín dụng**: CIC, nhóm nợ, DTI, TSBĐ, cấp phán quyết, giải ngân. Từ Ex·V2 trở lên mỗi vùng có 3 lab tương ứng 3 vòng riêng.

---

## Experienced · Vùng 1

### Lab — Phỏng vấn BA vào mảng ngân hàng

**Bối cảnh:** ứng viên **Tú** (~2 năm BA dự án phần mềm doanh nghiệp, 6 tháng gần nhất chạm một dự án ngân hàng) phỏng vấn vị trí BA cho đội dự án LOS của một ngân hàng TMCP. Người phỏng vấn: **anh Quang**, BA Lead. 45 phút, một buổi trọn.

**Quang:** Chào Tú. Em nói anh nghe theo cách em hiểu: một khoản vay tiêu dùng đi từ lúc khách bước vào quầy đến lúc nhận tiền, qua những bước nào?

**Tú:** Dạ theo em nắm được: cán bộ tín dụng tiếp nhận hồ sơ — giấy tờ nhân thân, chứng minh thu nhập, mục đích vay; ngân hàng tra cứu **CIC** để xem lịch sử tín dụng của khách ở các tổ chức khác; rồi đến bước **thẩm định** — đánh giá khả năng trả nợ và tài sản bảo đảm nếu có; hồ sơ đạt thì trình **phê duyệt** theo cấp thẩm quyền tuỳ quy mô khoản vay; duyệt xong ký hợp đồng và **giải ngân** — chuyển tiền cho khách hoặc chuyển thẳng cho bên bán nếu vay mua hàng ạ. Em mới nắm ở mức luồng chính như vậy, các nhánh ngoại lệ em chưa thuộc hết ạ.

**Quang:** Mức đó là đủ cho điểm vào. CIC là gì, em nói rõ hơn được không?

**Tú:** Dạ là Trung tâm Thông tin tín dụng Quốc gia ạ — nơi tập trung lịch sử vay và trả nợ của khách hàng trên toàn hệ thống ngân hàng. Kết quả tra CIC cho biết khách đang có dư nợ ở đâu và **nhóm nợ** — em hiểu nhóm 1 là nợ đủ tiêu chuẩn, nhóm cao hơn là đã có quá hạn, và khách dính nhóm nợ xấu thì gần như không vay được nữa ạ.

**Quang:** Được. Giờ bài nhỏ: màn hình "tiếp nhận hồ sơ vay" trên LOS — cán bộ nhập thông tin khách, chọn sản phẩm vay, đính kèm giấy tờ, bấm gửi đi. Em phác use case cho anh.

**Tú:** Dạ, actor chính là **Cán bộ tín dụng**. Use case: Tạo hồ sơ vay mới · Nhập/sửa thông tin khách hàng · Chọn sản phẩm vay · Đính kèm chứng từ · Gửi hồ sơ sang bước tra cứu CIC. Em sẽ hỏi thêm để làm rõ: khách đã có sẵn trong hệ thống thì có luồng "chọn khách hiện hữu" thay vì nhập mới không — để tránh trùng khách; và hồ sơ lưu nháp được không, vì khách hay thiếu giấy tờ phải bổ sung sau ạ?

**Quang:** Hai câu hỏi ngược đều trúng vấn đề thật — trùng khách hàng là bệnh kinh niên đấy. Vậy nếu anh giao em khảo sát chức năng "tra cứu trạng thái hồ sơ" cho cán bộ chi nhánh, em chuẩn bị khung câu hỏi thế nào?

**Tú:** Dạ: Ai cần tra — chỉ cán bộ tạo hồ sơ hay cả trưởng phòng xem của cả đơn vị? Tra theo gì — tên khách, số hồ sơ, hay số điện thoại? Trạng thái nào cần hiển thị — em sẽ xin danh sách trạng thái chuẩn của quy trình thay vì tự đặt tên; khách hàng có được tự tra trên app không hay chỉ nội bộ; và có cần thông báo chủ động khi hồ sơ đổi trạng thái không, hay chỉ tra thụ động ạ. Em ghi biên bản và gửi lại xác nhận sau buổi khảo sát.

**Quang:** Ổn. Tài liệu PTYC em viết theo cấu trúc nào?

**Tú:** Dạ theo mẫu dự án hiện tại của em: tổng quan và phạm vi, mô tả chức năng — mỗi chức năng có luồng chính, luồng phụ, quy tắc nghiệp vụ và thông báo lỗi, yêu cầu phi chức năng, mô hình dữ liệu mức khái niệm, phụ lục màn hình. Mỗi yêu cầu có mã để dev và tester tham chiếu ạ. Riêng dự án ngân hàng em thấy có thêm phần em đang phải học: mục **tham chiếu quy định** — chức năng nào chịu ràng buộc của quy chế, quy định nào thì phải dẫn ra, không được viết chay ạ.

**Quang:** Đúng, đó là khác biệt lớn nhất khi làm BA ngân hàng. Tình huống cuối: dev hỏi "trường thu nhập hàng tháng bắt buộc nhập hay không" mà tài liệu em không ghi. Em làm gì?

**Tú:** Dạ em nhận thiếu sót trước ạ. Vì đây là dữ liệu đầu vào của thẩm định nên em không tự quyết — em hỏi lại phòng nghiệp vụ, đoán của em là bắt buộc với vay tín chấp vì không có thu nhập thì không tính được khả năng trả nợ, nhưng em cần câu trả lời chính thức cả cho trường hợp vay có tài sản bảo đảm. Chốt xong em cập nhật tài liệu, báo cả dev lẫn tester, và bổ sung mục "quy tắc bắt buộc nhập theo loại sản phẩm vay" vào checklist tự rà của em ạ.

**Quang:** Tốt. Em có câu hỏi gì cho anh không?

**Tú:** Dạ, em muốn hỏi bên mình BA mới có được đào tạo nghiệp vụ tín dụng bài bản không ạ — em tự học qua dự án thì được luồng chính, nhưng em biết mình hổng phần quy định gốc.

**Quang:** Có khoá nghiệp vụ nội bộ 2 tuần và tài liệu quy chế cho vay — hỏi đúng chỗ hổng của mình là điểm cộng. Chào em.

**Góc nhìn người chấm (Ex·V1):** điểm vào BA ngân hàng không đòi thuộc quy định — đòi **luồng vay nắm đúng thứ tự, thuật ngữ nền hiểu bản chất** (CIC để làm gì, nhóm nợ nghĩa là gì), câu hỏi khảo sát chạm được vấn đề thật của ngành (trùng khách hàng, lưu nháp hồ sơ), và **biết chỗ nào mình không được tự quyết** (trường dữ liệu phục vụ thẩm định → hỏi phòng nghiệp vụ). Tự nhận "hổng phần quy định gốc" và hỏi về đào tạo là tín hiệu tốt, không phải điểm trừ.

---

## Experienced · Vùng 2

> Ứng viên **Hà** (~3 năm BA, trong đó 1,5 năm mảng tín dụng bán lẻ) phỏng vấn vị trí BA cho dự án nâng cấp hệ thống LOS của một ngân hàng TMCP. Người phỏng vấn: **chị Thu**, BA Lead khối Công nghệ mảng Bán lẻ.

### Lab 1 — Vòng chuyên môn sâu (~25 phút)

**Thu:** Chào Hà. Em kể chị nghe tài liệu PTYC gần nhất em viết độc lập trong mảng tín dụng — phạm vi và chỗ khó nhất?

**Hà:** Dạ, em viết trọn tài liệu cho phân hệ "khởi tạo hồ sơ vay tiêu dùng" trên LOS ạ — từ tiếp nhận hồ sơ hai kênh quầy và app, tự động tra cứu CIC, tính tỷ lệ trả nợ trên thu nhập (DTI), đến đẩy hồ sơ vào luồng thẩm định. Chỗ khó nhất là **quy tắc phân luồng phê duyệt**: hồ sơ nào chuyên viên phê duyệt được, hồ sơ nào phải lên cấp cao hơn. Cán bộ tín dụng nói miệng thì nghe đơn giản — "khoản to thì lên sếp" — nhưng ngồi bóc ra mới thấy phụ thuộc ít nhất 3 biến: số tiền vay, có tài sản bảo đảm hay không, và kết quả CIC. Em kẻ bảng quyết định để chốt từng ô với phòng chính sách tín dụng:

| Số tiền | TSBĐ | Kết quả CIC | Cấp phán quyết |
|---|---|---|---|
| ≤ 100tr | Không | Nợ nhóm 1 | Chuyên viên phê duyệt |
| ≤ 100tr | Không | Từng có nợ nhóm 2 | Trưởng phòng |
| 100tr–1 tỷ | Có | Nợ nhóm 1 | Trưởng phòng |
| 100tr–1 tỷ | Không | Bất kỳ | Giám đốc chi nhánh |
| > 1 tỷ | Bất kỳ | Bất kỳ | Hội đồng tín dụng |
| Bất kỳ | Bất kỳ | Nợ nhóm 3 trở lên | Từ chối tự động |

Bảng thật của em khoảng 20 dòng ạ — đây em rút gọn minh hoạ. Nhờ bảng này mà lộ ra 2 ô phòng chính sách chưa từng quy định thành văn, họ phải họp chốt bổ sung.

**Thu:** Đúng bài — bảng quyết định lộ lỗ hổng chính sách. Thế mô hình dữ liệu của phân hệ đó, em vẽ thế nào?

**Hà:** Dạ mức logic ạ: `KhachHang` 1-n `HoSoVay` — một khách nhiều hồ sơ theo thời gian; `HoSoVay` n-n `TaiSanBaoDam` qua bảng liên kết — vì một tài sản có thể bảo đảm cho nhiều khoản vay và một khoản vay có thể có nhiều tài sản; `HoSoVay` 1-n `LichSuPheDuyet` — mỗi bước trình/duyệt/trả về là một bản ghi để truy vết được ai quyết gì lúc nào. Riêng kết quả tra CIC em tách bảng `KetQuaCIC` gắn với hồ sơ kèm thời điểm tra — vì kết quả CIC có tính thời điểm, thẩm định lại sau 3 tháng là phải tra lại, không dùng kết quả cũ ạ.

**Thu:** Chi tiết "CIC có tính thời điểm" là điểm cộng nghiệp vụ đấy. Câu cuối vòng này: vì sao trên LOS, người thẩm định và người bấm phê duyệt bắt buộc là hai người khác nhau — em giải thích được không?

**Hà:** Dạ đây là quy định của Thông tư 39 về hoạt động cho vay ạ: khâu thẩm định và khâu quyết định cho vay phải **phân định trách nhiệm rõ ràng** — người đánh giá rủi ro và người quyết không được là một, để tránh vừa đá bóng vừa thổi còi. Nên trên hệ thống, em đặc tả thành quy tắc cứng: user đã thao tác ở bước thẩm định thì hệ thống chặn không cho xuất hiện trong danh sách người phê duyệt của chính hồ sơ đó, kể cả khi user đó có đủ thẩm quyền theo bảng phân cấp ạ.

**Thu:** Tốt, hiểu cả quy định gốc lẫn cách nó thành rule hệ thống. Cảm ơn em.

### Lab 2 — Vòng case thực chiến (~25 phút)

**Thu:** Case thật của bên chị: Khối Bán lẻ yêu cầu "LOS phải **phê duyệt tự động** khoản vay tiêu dùng dưới 100 triệu, trả kết quả trong 15 phút — không thì thua app fintech". Em nhận đề bài này, em làm gì?

**Hà:** Dạ trước hết em tách cái **muốn** và cái **cần** ạ. Cái khối Bán lẻ cần thật sự là *thời gian trả kết quả* cạnh tranh được — phê duyệt tự động chỉ là một cách đạt nó. Em sẽ khảo sát ra con số hiện trạng trước: 15 phút đang tắc ở đâu — tra CIC chờ bao lâu, hồ sơ nằm chờ thẩm định bao lâu, hay chờ cấp phê duyệt rảnh tay. Vì nếu 80% thời gian là hồ sơ nằm chờ trong hàng đợi thì tự động hoá **luồng chuyển bước** đã giảm mạnh mà chưa cần đụng đến quyền phán quyết.

**Thu:** Giả sử số liệu ra là vẫn cần phê duyệt tự động thật. Em phân tích tiếp thế nào?

**Hà:** Dạ lúc đó câu hỏi trung tâm là: **máy được quyết trong biên nào, và ai chịu trách nhiệm về quyết định của máy** ạ. Em làm rõ với phòng chính sách bộ điều kiện lọt luồng tự động — kiểu: khách đã định danh eKYC, kết quả CIC nợ nhóm 1 và không có nợ từng cơ cấu, DTI dưới ngưỡng, điểm chấm nội bộ từ mức quy định trở lên, và tổng dư nợ tự động trong ngày của toàn hệ thống không vượt hạn mức — hồ sơ trượt bất kỳ điều kiện nào thì **rơi về luồng tay**, không phải từ chối thẳng. Còn về trách nhiệm: phê duyệt tự động thực chất là cấp có thẩm quyền **phê duyệt trước cả một lớp hồ sơ** qua việc ký ban hành bộ tiêu chí — nên tài liệu của em phải ghi rõ bộ tiêu chí này là một văn bản chính sách có người ký, có phiên bản, và hệ thống lưu lại hồ sơ nào được duyệt bởi phiên bản tiêu chí nào. Sau này kiểm toán nội bộ hỏi "hồ sơ X vì sao máy cho qua" là truy ngược được đúng bộ điều kiện tại thời điểm đó ạ.

**Thu:** Câu "phê duyệt tự động = phê duyệt trước một lớp hồ sơ" — em tự nghĩ hay học ở đâu?

**Hà:** Dạ em học từ chị phụ trách chính sách ở dự án trước, khi em hỏi đúng câu "máy sai thì ai chịu" ạ [cười]. Từ đó em hiểu là với ngân hàng, mọi tự động hoá đều phải quy về được một người có thẩm quyền đã quyết — hệ thống chỉ thực thi nhanh cái đã được quyết, không tự quyết ạ.

**Thu:** Giữa dự án, phòng chính sách hạ ngưỡng DTI xuống — mà rule này đã code cứng rồi. Em rút gì từ tình huống kiểu này?

**Hà:** Dạ em gặp thật rồi ạ. Lần đó em xử lý đúng quy trình thay đổi — ghi nhận, đánh giá tác động, trình duyệt — nhưng cái em rút ra nằm ở tầng khác: chính sách tín dụng **đổi thường xuyên theo thị trường**, mà cứ mỗi lần đổi ngưỡng lại thành một yêu cầu sửa code thì cả hai bên cùng khổ. Nên ở tài liệu bản nâng cấp, em đề xuất tách các ngưỡng chính sách — DTI, hạn mức tự động, điểm sàn — thành **bảng tham số có màn hình quản trị riêng**, phòng chính sách tự đổi có phê duyệt và có hiệu lực theo ngày, không cần release phần mềm. Dev lead ủng hộ ngay vì họ cũng chán sửa hằng số ạ. Em nghĩ BA ở mức của em bắt đầu phải nhìn được **pattern của thay đổi**, không chỉ xử lý từng thay đổi một.

**Thu:** Tốt. Cảm ơn em.

### Lab 3 — Vòng hành vi (~15 phút)

**Thu:** Kể chị một lần em trình bày cho người nghiệp vụ ngân hàng mà không thành công, và em đổi thế nào.

**Hà:** Dạ có — buổi đào tạo luồng mới cho cán bộ tín dụng 3 chi nhánh, em trình bằng sơ đồ màn hình và trạng thái hồ sơ trên hệ thống, được 10 phút thì một anh chi nhánh nói thẳng: "em ơi, anh chỉ cần biết hồ sơ anh Tuấn vay 200 triệu mua xe thì anh bấm gì tiếp". Em nhận ra mình trình theo **cấu trúc hệ thống** trong khi người nghe tư duy theo **hồ sơ cụ thể**. Em đổi tại chỗ: lấy đúng một bộ hồ sơ vay mua xe làm ví dụ, đi từ lúc khách ngồi ở quầy đến lúc giải ngân, mỗi bước chỉ đúng nút bấm — buổi đó kéo lại được, và từ đấy tài liệu hướng dẫn của em luôn có một "hồ sơ mẫu xuyên suốt" đi kèm ạ.

**Thu:** Còn phía dev — họ hay hỏi em những câu "vì sao" kiểu gì, và em trả lời sao?

**Hà:** Dạ nhiều nhất là các câu dạng "sao phải phức tạp thế" ạ. Ví dụ dev hỏi: "sao không cho sửa số tiền vay sau khi hồ sơ đã phê duyệt, bắt trình lại làm gì cho lâu?" Em giải thích bằng nghiệp vụ: phê duyệt là quyết định trên **toàn bộ hồ sơ thẩm định** — số tiền đổi thì DTI đổi, cấp phán quyết có khi cũng đổi theo bảng phân cấp; cho sửa tự do sau phê duyệt tức là mở đường lách thẩm quyền, kiểm toán chắc chắn bắt. Nghe xong bạn dev còn tự đề xuất thêm ràng buộc chặn ở tầng API chứ không chỉ ẩn nút trên màn hình ạ. Em thấy khi dev hiểu **vì sao**, họ code đúng hơn cả những chỗ mình chưa kịp đặc tả — nên em không bao giờ trả lời "cứ làm theo tài liệu đi" ạ.

**Thu:** Câu cuối: em học nghiệp vụ tín dụng bằng cách nào — hồi mới vào mảng này em có nền đâu?

**Hà:** Dạ ba nguồn ạ: đọc quy định — quy chế cho vay nội bộ và Thông tư 39, đọc chậm nhưng là khung xương; hỏi người làm thật — em xin ngồi 2 buổi ở quầy chi nhánh xem cán bộ tiếp khách và nhập hồ sơ, học được nhiều thứ không giấy tờ nào ghi, ví dụ khách hay thiếu giấy tờ gì nhất; và tự lần theo dữ liệu — em xin quyền đọc môi trường test, lần một bộ hồ sơ qua các bảng để hiểu hệ thống thật đang chạy thế nào. Cái thứ ba giúp em nhất khi viết tài liệu nâng cấp, vì mình biết hiện trạng thật chứ không chỉ hiện trạng trên tài liệu cũ ạ.

**Thu:** Cảm ơn Hà, có kết quả chị báo sớm.

**Góc nhìn người chấm (Ex·V2):** vẫn là khung năng lực Ex·V2 (độc lập viết tài liệu, chốt yêu cầu, quản lý thay đổi có kỷ luật), nhưng người chấm ở ngân hàng soi thêm **lớp domain**: thuật ngữ tín dụng dùng tự nhiên và đúng (CIC, nhóm nợ, DTI, TSBĐ, cấp phán quyết, giải ngân — không phải học thuộc); hiểu **quy định gốc chi phối thiết kế** (tách thẩm định/quyết định của TT39 → thành rule chặn trên hệ thống; "máy không tự quyết — máy thực thi cái người có thẩm quyền đã quyết"); và nhìn ra **pattern ngành**: chính sách tín dụng đổi liên tục → tham số hoá thay vì code cứng. Ứng viên BA giỏi kỹ năng nhưng nói sai nhóm nợ hay không trả lời được "máy sai ai chịu" sẽ lộ ngay là chưa từng làm ngân hàng thật.

---

## Experienced · Vùng 3

> Đỉnh Experienced. Ứng viên **Vinh** (~4 năm BA, 2,5 năm mảng ngân hàng) phỏng vấn vùng Ex·V3. Người phỏng vấn: **chị Diệp**, Trưởng nhóm Giải pháp khối CNTT Bán lẻ.

### Lab 1 — Vòng chuyên môn sâu (~25 phút)

**Diệp:** Chào Vinh. Ở mức của em, chị muốn nghe em mô hình hoá một nghiệp vụ tín dụng thật sự phức tạp. Chọn ca em từng làm.

**Vinh:** Dạ em chọn luồng **giải ngân từng phần cho vay xây sửa nhà** ạ — phức tạp vì tiền không ra một lần mà theo tiến độ công trình, chạy qua 3 bên. Em vẽ BPMN 3 lane: Khách hàng → Cán bộ tín dụng → Bộ phận vận hành giải ngân. Điểm khó nhất là các sự kiện: mỗi đợt giải ngân sau đợt đầu phải có biên bản kiểm tra tiến độ, và có **timer** — quá 6 tháng khách không rút đợt tiếp thì hệ thống tự cảnh báo rà soát lại phương án vay, đây là sự kiện thời gian chứ không phải bước thao tác. Hồi mới làm em từng vẽ nhầm loại sự kiện kiểu này thành bước thủ công ở một luồng khác, dev làm theo và nghiệm thu mới lộ — từ đó luồng nào dính yếu tố thời gian là em rà riêng một lượt: hạn hiệu lực phê duyệt, hạn bổ sung chứng từ, hạn tái định giá tài sản bảo đảm ạ.

**Diệp:** Danh sách "các thứ có hạn" trong tín dụng em vừa kể là đúng nghề đấy. Prototype giờ em làm đến mức nào?

**Vinh:** Dạ click-through bằng Figma ạ. Phân hệ gần nhất là màn thẩm định tập trung — trước buổi demo với phòng thẩm định hội sở, em mời 2 chuyên viên thẩm định bấm thử trước. Họ vướng ngay một chỗ em không tự nhìn ra: em thiết kế thông tin theo tab — nhân thân, thu nhập, CIC, TSBĐ — còn họ thẩm định theo kiểu **đối chiếu chéo**, cần nhìn thu nhập cạnh nghĩa vụ trả nợ trên cùng một màn. Em sửa lại bố cục trên prototype trong 2 ngày, rẻ hơn rất nhiều so với sửa khi đã code. Từ đó em có nguyên tắc: prototype cho nghiệp vụ chuyên sâu phải được **người làm nghề đó** bấm thử, BA tự thấy hợp lý chưa đủ ạ.

**Diệp:** Hỗ trợ nghiệm thu — vai trò của em đến đâu rồi?

**Vinh:** Dạ em là đầu mối UAT phía dự án 2 đợt gần nhất ạ: dựng kịch bản nghiệm thu từ tài liệu yêu cầu — mỗi yêu cầu có mã, kịch bản trỏ đúng mã; điều phối cán bộ 4 chi nhánh thí điểm test theo kịch bản trên môi trường UAT với dữ liệu giả lập đủ các dạng hồ sơ; ghi biên bản đạt/chưa đạt/phát sinh. Phần em phải giữ chặt nhất là **ranh giới lỗi và yêu cầu mới**: chi nhánh test hay đề xuất kiểu "màn này nên thêm nút in" — cái đó em ghi nhận thành yêu cầu mới đi quy trình thay đổi, không cho lẫn vào danh sách lỗi phải sửa trước go-live, nếu không UAT kéo dài vô hạn ạ.

**Diệp:** Cảm ơn em.

### Lab 2 — Vòng case thực chiến (~30 phút)

**Diệp:** Case tổng hợp: giám đốc khối Bán lẻ nói "quy trình vay **thế chấp** đang thủ công quá, số hoá đi". Đề bài chỉ có vậy. Em là BA chính — 2 tuần đầu làm gì?

**Vinh:** Dạ vay thế chấp khác vay tín chấp ở chỗ có cả một cụm bước xoay quanh **tài sản bảo đảm**: định giá, công chứng thế chấp, đăng ký giao dịch bảo đảm — mà mấy bước này dính bên **ngoài** ngân hàng: phòng công chứng, văn phòng đăng ký đất đai. Nên tuần một em đi vẽ luồng as-is đầy đủ và đo từng chặng: chặng nào trong ngân hàng, chặng nào phụ thuộc bên ngoài, mỗi chặng mất bao lâu, giấy tờ gì đi lại mấy vòng. Em phỏng vấn cả 3 vai: cán bộ tín dụng, cán bộ định giá, và bộ phận hỗ trợ tín dụng làm hồ sơ công chứng. Tuần hai em phân loại: cái gì số hoá được ngay trong nội bộ — luân chuyển hồ sơ, checklist chứng từ, tích hợp kết quả định giá; cái gì chỉ số hoá được một nửa vì phụ thuộc bên ngoài — lịch công chứng, kết quả đăng ký thế chấp vẫn phải chờ giấy; và cái gì là **nghẽn thật theo số liệu**. Kinh nghiệm em đo ở dự án trước: mọi người kêu "định giá chậm" nhưng số ra nghẽn nhất là hồ sơ **chờ khách bổ sung giấy tờ pháp lý của tài sản** — nghĩa là giải pháp nằm ở checklist chuẩn theo loại tài sản đưa cho khách ngay từ đầu, chứ không phải ép phòng định giá chạy nhanh hơn ạ.

**Diệp:** Nếu giám đốc khối muốn "làm hết trong một giai đoạn" thì em đàm phán thế nào?

**Vinh:** Dạ em đưa bảng vấn đề — tác động — công sức, và đề xuất cắt giai đoạn theo nguyên tắc **luồng trọn vẹn cho một loại tài sản phổ biến nhất**: giai đoạn 1 làm mượt từ đầu đến cuối cho vay thế chấp sổ đỏ nhà đất — chiếm phần lớn hồ sơ — thay vì làm nửa vời cho mọi loại tài sản. Người dùng chi nhánh cảm nhận được thay đổi rõ trên loại hồ sơ họ gặp hằng ngày, và bài học từ loại tài sản đầu sẽ làm giai đoạn 2 rẻ hơn. Em cũng nói thẳng chi phí của "làm hết một lần": các loại tài sản đặc thù — xe, máy móc, hàng tồn kho — mỗi loại một quy trình định giá riêng, gộp hết vào là tiến độ dài gấp đôi và rủi ro đổi yêu cầu giữa chừng rất cao ạ.

**Diệp:** Cảm ơn em.

### Lab 3 — Vòng hành vi (~20 phút)

**Diệp:** Dự án đông bên — bán lẻ, quản lý rủi ro, vận hành, pháp chế, CNTT. Em điều phối một cuộc họp chốt yêu cầu với đủ 5 bên đó thế nào?

**Vinh:** Dạ em gửi trước tài liệu kèm **danh sách câu hỏi cần chốt, ghi rõ câu nào cần bên nào quyết** — họp để quyết chứ không phải đọc tài liệu lần đầu ạ. Trong họp em giữ nhịp theo agenda, và với đặc thù ngân hàng em học được một mẹo: câu nào dính quản lý rủi ro hoặc pháp chế thì chốt **thành văn ngay tại chỗ** và đọc lại nguyên văn cho hai bên đó xác nhận — vì chỉ cần lệch một chữ kiểu "được phép" thành "nên" là sau này diễn giải khác nhau. Chuyện ngoài phạm vi em ghi bãi đỗ xử lý sau. Trong ngày em gửi biên bản: quyết định, người chịu trách nhiệm, câu còn treo và hẹn chốt ạ.

**Diệp:** Kể chị một lần em bị kẹt giữa hai bên trong nội bộ ngân hàng.

**Vinh:** Dạ, khối Bán lẻ muốn rút bớt chứng từ bắt buộc lúc tiếp nhận cho nhanh, còn Quản lý rủi ro đòi giữ đủ. Em không đứng ra phân xử thay ạ — em làm bảng phân tích cho từng loại chứng từ: chứng từ này phục vụ quyết định gì ở bước nào, thiếu nó thì rủi ro cụ thể gì, và ngân hàng bạn đang yêu cầu ở mức nào. Ra bảng mới thấy có 2 loại giấy tờ thực chất chỉ dùng ở bước giải ngân — vậy chuyển sang thu ở bước sau thay vì bắt nộp từ đầu, khách đỡ nản mà rủi ro không đổi vì trước giải ngân vẫn phải đủ. Hai bên đồng ý phương án "thu đúng lúc cần" — không bên nào phải thua ạ.

**Diệp:** Cảm ơn Vinh.

**Góc nhìn người chấm (Ex·V3):** đỉnh Experienced trong ngân hàng nhận diện qua: mô hình hoá xử lý được **nghiệp vụ nhiều bên + nhiều mốc thời hạn** (giải ngân từng phần, hạn hiệu lực phê duyệt, tái định giá TSBĐ); prototype được người-làm-nghề bấm thử và lộ ra tư duy đối-chiếu-chéo của thẩm định; UAT giữ chắc ranh giới lỗi/yêu-cầu-mới; case thế chấp phân biệt được **số-hoá-được / số-hoá-một-nửa / nghẽn-thật-theo-số-liệu** (chờ khách bổ sung giấy tờ chứ không phải định giá chậm). Mẹo "chốt thành văn ngay tại chỗ với QLRR và pháp chế" là phản xạ chỉ có ở người từng ngồi họp ngân hàng thật.

---

## Senior · Vùng 1

> Bắt đầu Senior — xuất hiện các nhóm mới: **luồng dữ liệu (DFD)**, **UX**, **phân tích đối thủ**, **review giải pháp** — đều ở mức khởi đầu. Ứng viên **Trà** (~5,5 năm BA ngân hàng) phỏng vấn lên Senior. Người phỏng vấn: **anh Lâm**, Trưởng phòng Giải pháp khối CNTT. 3 vòng riêng.

### Lab 1 — Vòng chuyên môn sâu

**Lâm:** Chào Trà. Lên Senior thì phải nhìn được luồng dữ liệu giữa các hệ thống, không chỉ luồng nghiệp vụ trong một hệ thống. Em vẽ DFD cho mảng nào rồi?

**Trà:** Dạ em mới vẽ được khoảng nửa năm ạ — mức ngữ cảnh và mức 1 cho cụm khởi tạo khoản vay: LOS ở giữa, dữ liệu vào từ kênh quầy và app, gọi ra **CIC** lấy lịch sử tín dụng, gọi hệ thống **định giá tài sản**, và sau phê duyệt thì đẩy sang **core banking** để mở tài khoản vay và hạch toán giải ngân. Vẽ xong em mới nhìn ra một thứ luồng nghiệp vụ không lộ: **thu nhập của khách được nhập ở hai chỗ** — cán bộ nhập trên LOS lúc tiếp nhận, và bộ phận thẩm định nhập lại bản đã xác minh vào một file tính riêng ngoài hệ thống — hai con số này không ai đối chiếu tự động. Em nêu ra, và bản nâng cấp bổ sung yêu cầu: trường thu nhập xác minh phải nằm trên LOS và khoá theo phiên bản thẩm định, bỏ file ngoài ạ.

**Lâm:** DFD ra đúng giá trị của nó — lộ dữ liệu nhập đôi. Còn UX, em áp dụng gì rồi?

**Trà:** Dạ mức bắt đầu có ý thức ạ. Em xin ngồi quan sát 2 buổi ở phòng thẩm định hội sở — và thấy chuyên viên mở **4 cửa sổ cùng lúc**: LOS, màn tra CIC, bảng tính DTI riêng, và ảnh chụp chứng từ — mắt đảo liên tục, chép số tay giữa các màn. Từ quan sát đó em đề xuất màn "thẩm định 360": một màn tổng hợp đủ nhân thân – thu nhập – kết quả CIC – nghĩa vụ nợ hiện có – đề xuất của cán bộ, số liệu tự đổ không phải chép. Em chưa được đào tạo UX bài bản — usability test có phương pháp thì em mới đọc chứ chưa tự chạy — nhưng em tin quan sát người dùng thật 2 buổi đáng giá hơn 5 buổi họp nghe kể lại ạ.

**Lâm:** Đề xuất "thẩm định 360" từ quan sát thật — được. Cảm ơn em.

### Lab 2 — Vòng case thiết kế giải pháp

**Lâm:** Case: Quản lý rủi ro yêu cầu "hệ thống phải **cảnh báo sớm** khách có dấu hiệu khó trả nợ". Dev lead đề xuất: chạy báo cáo cuối ngày, sáng hôm sau gửi danh sách qua email. Em ở vai review giải pháp — ý kiến?

**Trà:** Dạ em sẽ hỏi ngược về **nghiệp vụ của chữ "sớm"** trước ạ: cảnh báo để ai làm gì trong bao lâu? Nếu mục đích là cán bộ quản lý khoản vay gọi nhắc khách trước kỳ trả nợ vài ngày thì báo cáo cuối ngày là đủ — email sáng hôm sau không làm hỏng nghiệp vụ. Nhưng nếu QLRR muốn bắt các dấu hiệu kiểu khách vừa phát sinh nợ quá hạn ở ngân hàng khác hay tài khoản lương ngừng nhận tiền — thì độ trễ một ngày làm mất giá trị của một số tín hiệu, và quan trọng hơn là danh sách cảnh báo phải đi vào **hàng việc phải xử lý có người nhận, có hạn xử lý** trên hệ thống, chứ email thì trôi, không truy vết được ai đã xử lý gì. Em sẽ đề nghị chốt danh mục tín hiệu cảnh báo với QLRR trước — mỗi tín hiệu ghi rõ độ trễ chấp nhận được và hành động kèm theo — rồi mới chọn thiết kế; có khi ra lời giải lai: phần lớn tín hiệu chạy batch cuối ngày, vài tín hiệu nóng đi đường riêng ạ.

**Lâm:** Review tài liệu của BA khác thì sao — em bắt đầu chưa?

**Trà:** Dạ mới vài tháng, review chéo trong nhóm ạ. Em rà 3 lớp: đủ nhánh nghiệp vụ chưa — riêng tín dụng em thêm thói quen rà **các nhánh từ chối và trả về**, vì BA hay viết kỹ luồng đạt mà bỏ mỏng luồng trượt; nhất quán nội bộ — quy tắc với mô hình dữ liệu có khớp không; và viết cho dev làm được không. Em thành thật là có lần em bỏ lọt một mâu thuẫn về hạn hiệu lực phê duyệt giữa 2 chương mà anh BA cứng hơn bắt được — em đang gom lỗi thành checklist chung cho nhóm ạ.

**Lâm:** Cảm ơn em.

### Lab 3 — Vòng hành vi & phân tích thị trường

**Lâm:** Em từng phân tích sản phẩm vay của đối thủ chưa?

**Trà:** Dạ bản đầu tiên em làm quý trước ạ: so hành trình vay tiêu dùng trên app của 3 ngân hàng và 1 công ty tài chính — em tự đi hết hành trình đến bước cuối cùng được phép, chụp và đếm: số bước, số giấy tờ phải tải lên, thời gian trả kết quả công bố. Phát hiện đáng giá nhất: 2 trong 4 đối thủ cho khách **tự theo dõi trạng thái hồ sơ trên app** — còn khách của mình muốn biết thì phải gọi cán bộ, và chính cán bộ tín dụng cũng than mất thời gian trả lời "hồ sơ em đến đâu rồi". Em trình bản so sánh nội bộ, tính năng theo dõi trạng thái được đưa vào backlog quý sau ạ. Em biết bản của em mới ở mức hành trình và tính năng — chưa phân tích được cấu trúc giá hay phân khúc, phần đó em cần học thêm.

**Lâm:** Câu cuối: khác biệt lớn nhất giữa BA Experienced và Senior trong môi trường ngân hàng, theo em?

**Trà:** Dạ theo em, Experienced trả lời tốt câu "yêu cầu này đặc tả thế nào cho đúng quy định và làm được"; Senior phải trả lời thêm "**giải pháp này có đáng làm không, và có đúng hướng của khối không**" — dám phản biện cả đề bài, như ca cảnh báo sớm ban nãy: câu hỏi đầu tiên không phải batch hay realtime, mà là cảnh báo để ai làm gì ạ.

**Lâm:** Cảm ơn Trà.

**Góc nhìn người chấm (Senior·V1):** điểm vào Senior chấm theo khuôn "kỹ năng mới ở mức khởi đầu nhưng đã làm thật + biết ranh giới": DFD 2 mức lộ ra dữ liệu nhập đôi (bệnh kinh niên của ngân hàng nhiều hệ thống), UX từ quan sát thật ra đề xuất "thẩm định 360", phân tích đối thủ bằng cách **tự đi hết hành trình vay của họ** và ra phát hiện dùng được, review biết mảng yếu của BA tín dụng (viết mỏng luồng trượt/trả về). Câu hỏi ngược "cảnh báo để ai làm gì trong bao lâu" là tư duy đúng tầm — chốt nghiệp vụ trước, chọn kiến trúc sau.

---

## Senior · Vùng 2

> Giữa Senior — các kỹ năng giải pháp vận hành đều tay. Ứng viên **Khang** phỏng vấn chuyển ngân hàng ở vùng Senior·V2. Người phỏng vấn: **chị Loan**, Giám đốc Sản phẩm số khối Bán lẻ.

### Lab 1 — Vòng chuyên môn sâu

**Loan:** Chào Khang. Em đề xuất cách tiếp cận phân tích cho dự án mới thế nào — cho ví dụ thật trong mảng tín dụng.

**Khang:** Dạ em chọn theo đặc điểm dự án ạ. Hai ca thật gần nhau: dự án **nâng cấp LOS** — nghiệp vụ đã chạy nhiều năm, tri thức nằm trong hệ thống cũ và trong đầu người vận hành — em đi hướng as-is/to-be: bóc luồng hiện trạng từ hệ thống thật và số liệu vận hành, mô hình hoá chỗ thay đổi, nặng về tài liệu đối chiếu để không rơi mất quy tắc cũ nào còn hiệu lực. Ngược lại, dự án **vay online cho khách hàng mới hoàn toàn** — nghiệp vụ chưa có tiền lệ trong ngân hàng mình — em đề xuất vòng lặp: workshop với bán lẻ + QLRR + pháp chế ngay từ đầu, prototype sớm, chốt cuốn chiếu. Điểm đặc thù ngân hàng em rút ra: dự án kiểu mới thì **pháp chế và QLRR phải vào từ vòng đầu**, vì một ràng buộc pháp lý phát hiện muộn — như quy định về định danh điện tử hay chứng từ điện tử — có thể lật cả thiết kế, không như dự án thương mại thường chỉ cần họ duyệt cuối ạ.

**Loan:** Review tài liệu — vai trò hiện tại của em?

**Khang:** Dạ em là người review chính cho nhóm 4 BA, có checklist 20 mục nhóm em đúc từ lỗi thật ạ. Lỗi em bắt nhiều nhất trong mảng này là **quy tắc nghiệp vụ mâu thuẫn với mô hình dữ liệu**: gần nhất, tài liệu ghi "khách hàng có thể có nhiều hồ sơ vay đang xử lý đồng thời ở các chi nhánh khác nhau" nhưng mô hình lại ràng một khách chỉ một hồ sơ trạng thái mở — dev code theo mô hình là chặn nhầm khách vay song song hợp lệ, mà lỗi này chỉ bùng ra ở vận hành thật khi khách kêu. Em cũng đổi cách review từ sửa hộ sang **hỏi ngược** — comment dạng câu hỏi cho bạn BA tự nhìn ra, chậm hơn nhưng các bạn lên tay thật ạ.

**Loan:** Cảm ơn em.

### Lab 2 — Vòng case tư vấn giải pháp

**Loan:** Case: giám đốc 5 chi nhánh cùng phàn nàn "hồ sơ vay duyệt chậm quá, khách bỏ sang ngân hàng khác" và đề nghị "tuyển thêm chuyên viên thẩm định". Em tư vấn thế nào?

**Khang:** Dạ "tuyển thêm người" là giải pháp cho triệu chứng — em đo trước khi bàn ạ. Em xin dữ liệu 3 tháng từ LOS: thời gian từng chặng của mọi hồ sơ — tiếp nhận, chờ CIC, thẩm định, chờ phê duyệt, giải ngân — cắt theo chi nhánh và loại sản phẩm. Ca thật em làm năm ngoái ra số rất điển hình: thời gian **thẩm định thực làm** chỉ chiếm khoảng một phần tư; nghẽn lớn nhất là **hồ sơ chờ khách bổ sung chứng từ** và hồ sơ bị **trả về do nhập thiếu ngay từ quầy**. Nghĩa là tuyển thêm thẩm định gần như không đổi được thời gian tổng. Giải pháp em tư vấn 3 lớp chi phí tăng dần: lớp một — checklist chứng từ theo sản phẩm ngay tại bước tiếp nhận, chặn gửi hồ sơ thiếu, gần như miễn phí; lớp hai — thông báo tự động cho khách qua app khi cần bổ sung, kèm hạn; lớp ba mới là tăng năng lực thẩm định, và lúc đó có số để tính cần đúng mấy người. Sau lớp một và hai, tỷ lệ hồ sơ bị trả về giảm gần một nửa, chi nhánh rút lại đề nghị tuyển ạ.

**Loan:** Tư vấn ngược ý cả 5 giám đốc chi nhánh mà không mất lòng — làm sao?

**Khang:** Dạ em không nói "các anh chị sai" — em nói "đề nghị tuyển làm được, nhưng cho em 2 tuần đo để chắc mình mua đúng cái đang thiếu" ạ. Số liệu ra thì để số tự nói, và em trình theo cách **mỗi chi nhánh thấy số của chính mình** — giám đốc chi nhánh tin số chi nhánh mình hơn mọi bài thuyết trình. Quyết định cuối vẫn của khối, công vẫn của các anh chị vận hành — BA tư vấn mà tranh công thì lần sau không được mời vào phòng họp nữa ạ.

**Loan:** Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Loan:** Tài liệu chỉ tiêu kỹ thuật — em chủ trì phần nào?

**Khang:** Dạ phần chỉ tiêu nghiệp vụ ạ, phối hợp kiến trúc sư phần hạ tầng. Ví dụ hợp đồng triển khai LOS giai đoạn 2: yêu cầu mơ hồ "duyệt hồ sơ nhanh" em chuyển thành chỉ tiêu đo được — với hồ sơ tín chấp đủ điều kiện chuẩn, thời gian từ gửi hồ sơ đến có kết quả phê duyệt ≤ 4 giờ làm việc cho 90% hồ sơ, đo trên báo cáo LOS theo tháng; kèm định nghĩa rõ "đủ điều kiện chuẩn" để không cãi nhau lúc nghiệm thu. Nguyên tắc của em: chỉ tiêu nào không trả lời được "nghiệm thu bằng báo cáo nào" thì chưa được đưa vào hợp đồng ạ.

**Loan:** Khi mọi yêu cầu từ các khối đều "gấp" — em sắp ưu tiên kiểu gì?

**Khang:** Dạ em tách 2 trục: giá trị — ai hưởng, tần suất, hậu quả nếu chưa có, và riêng ngân hàng thêm một hạng đặc biệt: **yêu cầu tuân thủ có thời hạn hiệu lực** từ quy định mới của Ngân hàng Nhà nước thì mặc định lên đầu, không đem cân với tính năng thương mại vì trễ là rủi ro tuân thủ chứ không phải rủi ro doanh số; trục kia là chi phí và rủi ro thực hiện. Còn lại em ép bằng câu "nếu quý này chỉ làm được 3 việc thì khối chọn gì" — câu đó phá được mọi danh sách toàn-hạng-A. Kết quả trình 1 trang: 3 việc, lý do, cái bị đẩy và rủi ro của việc đẩy ạ.

**Loan:** Cảm ơn Khang.

**Góc nhìn người chấm (Senior·V2):** giữa Senior, mọi thứ phải **vận hành đều và có số**: chọn cách tiếp cận theo loại dự án và biết luật riêng của ngành (pháp chế/QLRR vào từ vòng đầu với sản phẩm mới); review chính bắt được lỗi mâu-thuẫn-quy-tắc-với-mô-hình loại chỉ bùng ở vận hành thật; tư vấn ngược 5 giám đốc chi nhánh bằng số đo từng chặng (nghẽn ở chờ-bổ-sung-chứng-từ, không phải thẩm định); chỉ tiêu gắn báo cáo nghiệm thu; và biết **yêu cầu tuân thủ NHNN là hạng ưu tiên riêng** không đem cân với tính năng thương mại — chi tiết nhỏ nhưng phân biệt người làm ngân hàng thật.

---

## Senior · Vùng 3

> Đỉnh Senior — phân tích thị trường, tư vấn cải tiến, review đạt ③. Ứng viên **Yến** (~7 năm BA ngân hàng) phỏng vấn ở vùng cao nhất Senior. Người phỏng vấn: **anh Triều**, Phó Giám đốc khối CNTT.

### Lab 1 — Vòng chuyên môn sâu

**Triều:** Chào Yến. Phân tích thị trường ở mức của em khác gì bảng so sánh tính năng app vay?

**Yến:** Dạ khác ở chỗ trả lời được "mình nên đặt cược vào đâu" ạ. Bảng tính năng là đầu vào; em làm thêm 3 lớp. **Định vị**: ngân hàng A đánh phân khúc trẻ đô thị bằng vay online 100% duyệt nhanh; công ty tài chính B ăn phân khúc thu nhập thấp bằng mạng lưới điểm bán trả góp; ngân hàng C giữ khách lương qua tài khoản bằng ưu đãi lãi suất tự động. **Xu hướng**: các bản cập nhật gần đây của cả ba đều dồn vào vay online định danh điện tử và quyết định tự động — chuẩn kỳ vọng của thị trường bán lẻ đang dịch hẳn sang "có kết quả trong phiên sử dụng app". **Khoảng trống**: vay **thế chấp** thì cả thị trường vẫn số hoá nửa vời vì vướng các bước ngoài ngân hàng — ai làm mượt được trải nghiệm đầu-cuối cho vay mua nhà, kể cả chỉ phần trong ngân hàng, là khác biệt thật. Bản phân tích quý trước của em kết bằng 3 khuyến nghị, ban điều hành khối duyệt 2 — em đo giá trị của phân tích bằng **quyết định sinh ra từ nó**, không phải độ dày ạ.

**Triều:** Vai trò review của em hiện tại?

**Yến:** Dạ em là chốt chặn cuối cho tài liệu giải pháp quan trọng của khối trước khi ra ngoài — gửi đối tác, trình ban điều hành, hoặc làm căn cứ hợp đồng ạ. Khác mức trước ở chỗ em rà thêm **rủi ro cam kết**: gần nhất em chặn một tài liệu gửi đối tác chuỗi bán lẻ có câu "hệ thống phê duyệt tự động **mọi** khoản vay trả góp trong 15 phút" — chữ "mọi" là quả bom, vì hồ sơ trượt điều kiện tự động phải rơi về luồng tay, có hồ sơ mất một ngày. Em sửa thành cam kết theo tỷ lệ kèm điều kiện: "tối thiểu 80% hồ sơ đạt bộ điều kiện tự động có kết quả trong 15 phút, phần còn lại theo SLA luồng thẩm định". Đối tác chấp nhận, và vận hành không bị treo trên một lời hứa bất khả thi ạ.

**Triều:** Bắt đúng chữ chết người. Cảm ơn em.

### Lab 2 — Vòng case cải tiến liên hệ thống

**Triều:** Case lớn: khách trả nợ trễ đang bị **nhắc nợ loạn kênh** — tổng đài gọi, app bắn thông báo, chi nhánh cũng gọi, có khách bị nhắc 3 lần một ngày cho cùng một kỳ trả góp, có khách chẳng ai nhắc. Dữ liệu nợ nằm rải ở core banking, LOS, hệ thống thẻ và phần mềm của đội thu hồi nợ. Em dẫn bài toán này thế nào?

**Yến:** Dạ em bắt đầu từ **dòng chảy một khách hàng cụ thể** chứ không từ các hệ thống ạ: vẽ as-is hành trình "chị Lan trễ kỳ trả góp 5 ngày" — sự kiện trễ hạn phát sinh ở core, nhưng hệ thống thẻ có chu kỳ sao kê riêng, đội thu hồi nợ nhận danh sách xuất file mỗi sáng, còn app bắn nhắc theo lịch của LOS — bốn nơi bốn nhịp, không nơi nào biết nơi kia đã nhắc chưa. Điểm gãy gốc: **không có một nguồn sự thật về trạng thái nợ và lịch sử tương tác nhắc nợ**. Kiến nghị của em theo tầng: ngắn hạn — chuẩn hoá quy tắc "một khách một kỳ nợ chỉ nhận tối đa một lần nhắc mỗi ngày, theo thứ tự kênh ưu tiên", cài bằng bảng điều phối chung dù dữ liệu còn rải; trung hạn — hợp nhất trạng thái nợ về một nguồn (core là nơi hạch toán thì core là sự thật), các hệ thống khác đọc theo và **ghi lại mọi lần tương tác nhắc nợ vào một chỗ**; dài hạn — chiến lược nhắc nợ phân tầng theo mức độ trễ và lịch sử khách, lúc đó mới nói chuyện cá nhân hoá. Em trình bằng chính câu chuyện chị Lan bị gọi 3 cuộc một ngày — cả phòng họp ai cũng từng nghe khách phàn nàn y hệt, thuyết phục hơn mọi sơ đồ ạ.

**Triều:** Nếu đội thu hồi nợ không chịu bỏ phần mềm riêng của họ?

**Yến:** Dạ lộ trình của em không ép ai bỏ hệ thống ở bước đầu ạ — bảng điều phối nhắc nợ và nguồn sự thật trạng thái nợ là thứ phần mềm của họ **đọc và ghi vào**, không phải thứ thay thế họ. Quyết định hợp nhất công cụ hay không để về sau, khi số liệu giai đoạn tích hợp tự nói. Bài toán nội bộ nhiều phe không giải bằng thuyết trình hay hơn, mà bằng lộ trình cho phép các bên **không mất mặt ở bước đầu** ạ.

**Triều:** Cảm ơn em.

### Lab 3 — Vòng hành vi & lãnh đạo

**Triều:** Em đang dẫn dắt nhóm BA thế nào?

**Yến:** Dạ em phụ trách chuyên môn nhóm 5 BA của khối ạ — phân việc theo độ chín, review có lộ trình nới dần, và duy trì sinh hoạt "hội chẩn ca khó" 2 tuần một lần: mỗi bạn mang một ca thật của mình ra mổ, cả nhóm học từ dự án của nhau. Riêng đặc thù ngân hàng, em thêm một buổi mỗi quý mời người **nghiệp vụ thật** — cán bộ thẩm định, thu hồi nợ — sang kể chuyện nghề, vì BA ngân hàng yếu nhất là tưởng mình hiểu nghiệp vụ qua tài liệu. Hai bạn nhóm em vừa lên vùng kỳ rồi theo lộ trình thiết kế riêng ạ.

**Triều:** Câu cuối: em thấy mình còn thiếu gì để nhận vai Specialist?

**Yến:** Dạ hai thứ ạ. Một — bề dày giải pháp **tổng thể toàn hàng**: ca nhắc nợ ban nãy em chủ trì tầng giải pháp nghiệp vụ, nhưng đứng ra điều phối cả chương trình nhiều khối nhiều nhà cung cấp thì em mới làm vai phó một lần. Hai — ảnh hưởng ở tầm ban điều hành: em thuyết phục tốt trong khối, còn bảo vệ một lộ trình đầu tư trước ban điều hành toàn hàng thì em mới ngồi ghế phụ. Em muốn vai trò mới cho em chỗ đó, với người đỡ đầu giai đoạn đầu ạ.

**Triều:** Tự định vị chính xác. Cảm ơn Yến.

**Góc nhìn người chấm (Senior·V3):** đỉnh Senior thể hiện ở **chất lượng phán đoán trên bài toán ngành**: phân tích thị trường ra khoảng trống thật (thế chấp số hoá nửa vời) và đo bằng quyết định được duyệt; review bắt được chữ "mọi" trong cam kết SLA với đối tác — loại rủi ro chỉ người hiểu luồng-tay-luồng-tự-động mới thấy; case nhắc nợ loạn kênh dẫn bằng một khách hàng cụ thể và chốt đúng gốc "không có nguồn sự thật trạng thái nợ". Câu tự định vị thiếu gì để lên Specialist trùng khớp 2 kỹ năng lõi của thang trên — hiểu thang là tín hiệu trưởng thành.

---

## Specialist · Vùng 1

> Bước vào Specialist — trọng tâm mới: **giải pháp tổng thể liên thông hệ thống, thẩm định giải pháp, đánh giá hiệu quả tính năng, đào tạo đội ngũ BA** (đều ở mức khởi đầu). Ứng viên **Bảo** (~9 năm, trong đó 6 năm ngân hàng) phỏng vấn vai trò Chuyên gia Giải pháp nghiệp vụ. Người phỏng vấn: **chị Thanh**, Giám đốc khối Vận hành & Công nghệ.

### Lab 1 — Vòng giải pháp tổng thể

**Thanh:** Chào Bảo. Kể chị ca liên hệ thống lớn nhất em từng chủ trì tầng nghiệp vụ.

**Bảo:** Dạ, ca "ba con số dư nợ" ạ. Ngân hàng em có tình trạng kinh điển: cùng một câu hỏi "dư nợ vay tiêu dùng hiện tại bao nhiêu" mà LOS ra một số, core banking ra một số, báo cáo gửi Quản lý rủi ro ra số thứ ba — lệch nhau đủ để ban điều hành không tin báo cáo nào. Em chủ trì phần nghiệp vụ trong 10 tháng: bước một, truy gốc từng độ lệch — hoá ra không phải lỗi kỹ thuật mà là **ba định nghĩa khác nhau**: LOS đếm cả khoản đã phê duyệt chưa giải ngân, core chỉ đếm đã hạch toán, báo cáo QLRR lại gộp cả lãi dự thu; bước hai, xây **từ điển chỉ tiêu** — mỗi chỉ tiêu một định nghĩa, một công thức, một hệ thống chủ: dư nợ hạch toán thì **core banking là nguồn sự thật** vì đó là sổ cái, các hệ thống khác chỉ được đọc theo, muốn thêm chỉ tiêu phái sinh như "dư nợ cam kết" thì đặt tên khác, không đè lên tên cũ; bước ba, hội đồng quản trị từ điển đó — thêm sửa chỉ tiêu phải qua duyệt. Em nói thật là phần pipeline dữ liệu kỹ thuật em dựa vào anh kiến trúc sư dữ liệu — phần em vững và chủ trì là tầng định nghĩa nghiệp vụ và cơ chế quản trị ạ.

**Thanh:** "Không phải lỗi kỹ thuật mà là ba định nghĩa" — đúng chỗ chỉ BA cấp cao nhìn ra. Cảm ơn em.

### Lab 2 — Vòng thẩm định & đánh giá hiệu quả

**Thanh:** Vai này thẩm định giải pháp của các BA trong khối. Thẩm định khác review chỗ nào, và ca đầu tiên em bác là gì?

**Bảo:** Dạ review là góp ý cho tài liệu tốt lên; thẩm định là **gác cổng có chịu trách nhiệm** — ký là chịu trách nhiệm cùng, nên phải có tiêu chí công khai và dám bác ạ. Em nhận vai này được nửa năm, tiêu chí 3 cửa: bài toán gốc phát biểu được và có tiêu chí thành công đo được; đã cân nhắc phương án thay thế — tài liệu chỉ một phương án là dấu hiệu đỏ; rủi ro triển khai và **rủi ro tuân thủ** nêu trung thực. Ca đầu tiên em bác: một chi nhánh lớn đề xuất xây công cụ quản lý tài sản bảo đảm riêng cho họ vì "hệ thống tập trung chậm cải tiến" — về kỹ thuật không sai, nhưng TSBĐ mà quản lý phân tán là mở đường cho **một tài sản thế chấp hai nơi không ai biết** — đúng loại rủi ro mà hệ thống tập trung sinh ra để chặn. Em bác kèm hướng sửa: đưa 3 cải tiến họ cần nhất vào backlog hệ thống tập trung có cam kết thời hạn — bác mà không mở đường thì thẩm định thành cửa ải ạ.

**Thanh:** Đánh giá hiệu quả tính năng — em làm đến đâu?

**Bảo:** Dạ mức bắt đầu có phương pháp ạ: em đưa quy định mọi yêu cầu lớn phải khai **chỉ số thành công** từ lúc phân tích, và tổ chức phiên nhìn lại số thật sau phát hành một quý. Phiên đầu tiên soi tính năng phê duyệt tự động: tỷ lệ hồ sơ lọt luồng tự động chỉ đạt 30% so với kỳ vọng 60% — truy ra không phải máy kém mà bộ điều kiện đặt quá chặt ở một tiêu chí phụ; và một số đáng giá hơn: **tỷ lệ chuyển nợ quá hạn của nhóm duyệt tự động không cao hơn nhóm duyệt tay** — con số này thuyết phục Quản lý rủi ro đồng ý nới điều kiện có kiểm soát, nâng dần tỷ lệ tự động lên. Không có phiên nhìn lại số thì tính năng đó mang tiếng "làm rồi mà ít ai được duyệt" và chết yểu ạ.

**Thanh:** Cảm ơn em.

### Lab 3 — Vòng đào tạo & lãnh đạo

**Thanh:** Đào tạo đội BA ngân hàng — em bắt đầu từ đâu?

**Bảo:** Dạ từ khung năng lực, và với BA ngân hàng em thêm hẳn một trục riêng: ngoài 4 nhóm kỹ năng BA chuẩn, có trục **kiến thức nghiệp vụ ngân hàng** — tín dụng, kế toán ngân hàng cơ bản, và khung quy định — vì BA ở đây yếu nhất không phải kỹ thuật phân tích mà là đọc không hiểu quy chế ạ. Em đã chạy bản thu nhỏ ở khối cũ: khoá "đọc quy định cho BA" — học bằng cách bóc một thông tư thật thành bảng ràng buộc hệ thống, và khoá mô hình hoá dùng chính các ca dự án đã xong. Thước em đo: tỷ lệ tài liệu qua thẩm định lần đầu của nhóm tăng từ khoảng một nửa lên hơn 80% sau hai quý ạ. Vai trò mới thì việc đầu tiên vẫn là dựng khung năng lực cùng các lead — thước chung phải có trước, đào tạo là hệ quả của khoảng trống ạ.

**Thanh:** Tình huống quyền lực: giám đốc một khối kinh doanh phản đối kết luận thẩm định của em vì "lỡ cam kết với đối tác rồi". Em xử thế nào?

**Bảo:** Dạ em tách hai chuyện ạ: kết luận chuyên môn không đổi vì áp lực cam kết — đổi một lần là chức năng thẩm định mất giá trị vĩnh viễn. Nhưng em không chặn cứng: em đưa phương án **chấp nhận rủi ro có hồ sơ** — rủi ro gì, ai gánh, điều kiện vá trong bao lâu — và người ký chấp nhận phải là cấp trên cả hai chúng em, ở ngân hàng thường là ban điều hành hoặc uỷ ban rủi ro tuỳ ngưỡng. Dự án vẫn chạy được nếu cấp đó chấp nhận, nhưng là quyết định minh bạch có người chịu trách nhiệm — không phải thẩm định bị bẻ cong trong im lặng ạ.

**Thanh:** Cảm ơn Bảo.

**Góc nhìn người chấm (Spec·V1):** điểm vào Specialist trong ngân hàng nhận diện qua: ca liên hệ thống thật với chẩn đoán đúng tầng ("ba con số dư nợ" = ba định nghĩa, không phải lỗi kỹ thuật; core banking = sổ cái = nguồn sự thật); thẩm định có tiêu chí + ca bác đúng bệnh ngành (TSBĐ phân tán → rủi ro thế chấp hai nơi) + nguyên tắc "bác kèm hướng sửa"; đánh giá hiệu quả ra được con số ngành đắt giá (chất lượng nợ nhóm tự động vs nhóm tay); đào tạo thêm trục "đọc quy định" đúng chỗ yếu của BA ngân hàng. Mọi kỹ năng mới đều thành thật "nửa năm đầu, bản thu nhỏ" — đúng thang ①.

---

## Specialist · Vùng 2

> Giữa thang Specialist — các năng lực tầm tổ chức vận hành đều. Ứng viên **My** phỏng vấn vai trò Chuyên gia cấp cao tại một ngân hàng vừa nhận sáp nhập một công ty tài chính tiêu dùng. Người phỏng vấn: **chị Quyên**, Phó Tổng Giám đốc phụ trách Chuyển đổi số.

### Lab 1 — Vòng giải pháp tổng thể

**Quyên:** Chào My. Đề bài của chị rất thật: ngân hàng vừa nhận về một công ty tài chính tiêu dùng — hai chính sách tín dụng, hai LOS, hai khẩu vị rủi ro. Em từng làm ca hợp nhất nào tương đương chưa?

**My:** Dạ rồi ạ — em chủ trì tầng nghiệp vụ chương trình hợp nhất quy trình tín dụng bán lẻ sau một thương vụ tương tự, chạy 20 tháng. Bài khó nhất không phải hệ thống mà là **hai triết lý cho vay**: bên ngân hàng chặt chẽ, duyệt lâu, nợ xấu thấp; bên tài chính tiêu dùng nhanh, tự động nhiều, chấp nhận rủi ro cao hơn có tính giá vào lãi suất. Ép về một chuẩn là giết chết mô hình kinh doanh của một bên. Em xử bằng dữ liệu: lấy số liệu danh mục 2 năm của cả hai — tỷ lệ duyệt, thời gian duyệt, tỷ lệ chuyển nợ quá hạn theo từng phân khúc — chứng minh mỗi mô hình **thắng ở phân khúc của nó**. Kết quả chốt: một **khung chính sách chung tham số hoá** — cùng bộ trục điều kiện: điểm nội bộ, CIC, DTI, hạn mức tự động — nhưng hai bộ tham số theo phân khúc, quản trị bởi một uỷ ban chung; hai LOS gom dần về một nền tảng có hai cấu hình sản phẩm chạy song song. Không bên nào "thua", và lần đầu ban điều hành nhìn được cả hai danh mục trên cùng một bộ chỉ tiêu ạ.

**Quyên:** "Cùng khung, khác tham số" — đúng lời giải của bài sáp nhập. Cảm ơn em.

### Lab 2 — Vòng thẩm định & chiến lược

**Quyên:** Cơ chế thẩm định em đang vận hành — quy mô và số liệu?

**My:** Dạ em chủ trì hội đồng thẩm định giải pháp nghiệp vụ toàn hàng ạ — mọi giải pháp trên ngưỡng đầu tư quy định hoặc chạm dữ liệu khách hàng, quy trình tín dụng, đều qua hội đồng. Cơ chế 2 vòng: vòng hồ sơ theo bộ tiêu chí công khai — BA biết trước bị chấm gì nên chất lượng đầu vào tự lên; vòng hội đồng cho ca lớn. Số năm rồi: 41 hồ sơ, bác 5, yêu cầu sửa 17. Hai ca bác đáng tiền nhất đều là **chặn cam kết bất khả thi trước khi ký**: một hợp đồng hợp tác trả góp với chuỗi điện máy cam kết "100% hồ sơ có kết quả trong 30 phút tại quầy" — bất khả thi vì hồ sơ trượt điều kiện tự động phải về luồng thẩm định tay; và một đề án mở rộng cho vay online sang phân khúc chưa có dữ liệu hành vi — em yêu cầu chạy thí điểm có trần dư nợ trước khi cam kết quy mô với đối tác. Kỷ luật của hội đồng: mọi kết luận bác đều kèm hướng sửa và hẹn tái trình — thẩm định là đòn bẩy chất lượng, không phải cửa ải ạ.

**Quyên:** Đánh giá hiệu quả tính năng giờ ở mức nào?

**My:** Dạ thành khâu chính thức trong vòng đời sản phẩm ạ: mọi tính năng lớn có hồ sơ chỉ số từ lúc phân tích, phiên nhìn lại số thật theo quý cùng ban sản phẩm, kết quả đưa thẳng vào roadmap quý sau. Hai năm vận hành, tỷ lệ tính năng bị xếp "không đạt kỳ vọng" giảm từ khoảng 40% xuống dưới 15% — không phải đội làm giỏi đột biến, mà yêu cầu mơ hồ bị chặn từ cổng: không khai được chỉ số thành công thì không vào roadmap. Riêng mảng tín dụng em ép thêm một chỉ số bắt buộc cho mọi tính năng chạm quyết định cho vay: **chất lượng nợ của tập khách đi qua tính năng đó** — vì tăng trưởng giải ngân mà không nhìn chất lượng nợ là con số vô nghĩa, thậm chí nguy hiểm ạ.

**Quyên:** Cảm ơn em.

### Lab 3 — Vòng lãnh đạo & ảnh hưởng tổ chức

**Quyên:** Dấu ấn của em với đội ngũ BA toàn hàng?

**My:** Dạ ba thứ ạ. **Học viện BA nội bộ** 3 cấp chạy năm thứ ba: nền tảng cho người mới, chuyên sâu nghiệp vụ theo mảng — tín dụng, thanh toán, huy động — và lớp "giải pháp gia" em trực tiếp đứng cho nhóm tiềm năng lên Specialist; 4 bạn từ lớp đó đã chủ trì được giải pháp cấp khối, 2 bạn vào hội đồng thẩm định cùng em. **Cộng đồng BA** khoảng 70 người sinh hoạt tháng, luân phiên các khối trình ca thật. Và cái em coi là ảnh hưởng tổ chức thật: em thuyết phục được ban điều hành **mở ngạch chuyên gia song song ngạch quản lý** cho BA — trước đó BA giỏi muốn tăng thu nhập chỉ có đường làm trưởng phòng, em mất một năm với hồ sơ so sánh thị trường và 2 ca người giỏi suýt nghỉ, giờ giữ được 3 bạn cứng nhất ở đúng vai chuyên môn ạ.

**Quyên:** Câu cuối: nguyên tắc của em khi trình một lộ trình đầu tư trước ban điều hành?

**My:** Dạ ba nguyên tắc ạ: mở đầu bằng **quyết định cần đưa ra hôm nay**, không phải bối cảnh; mọi phương án có giá và rủi ro đặt cạnh nhau — cấp đó dị ứng phương án chỉ có ưu điểm; và với ngân hàng, luôn có sẵn trang trả lời cho hai câu chắc chắn bị hỏi: "rủi ro tuân thủ là gì" và "ai chịu trách nhiệm nếu chất lượng nợ xấu đi". Bài trình 40 trang thì 36 trang là phụ lục — 4 trang đầu phải đủ để quyết ạ.

**Quyên:** Cảm ơn My.

**Góc nhìn người chấm (Spec·V2):** giữa thang Specialist, mọi năng lực ở trạng thái **cơ chế chính thức có số nhiều năm**: chương trình hợp nhất ra lời giải "cùng khung, khác tham số" có dữ liệu danh mục chống lưng; hội đồng thẩm định 2 vòng với số năm (41/5/17) và 2 ca chặn-cam-kết-trước-khi-ký; đánh giá hiệu quả gắn chỉ số ngành bắt buộc (chất lượng nợ của tập khách qua tính năng); ảnh hưởng tổ chức đo bằng **chính sách bị thay đổi** (ngạch chuyên gia). Khác V1: không còn "nửa năm đầu, bản thu nhỏ" — tất cả đã là guồng chạy đều được tổ chức công nhận.

---

## Specialist · Vùng 3

> Vùng cuối toàn thang — mức ④: chuyên gia đầu ngành. Ứng viên **Đăng** (~13 năm, 10 năm ngân hàng) phỏng vấn vai trò Chuyên gia trưởng Giải pháp nghiệp vụ toàn hàng. Người phỏng vấn: **anh Cần**, Tổng Giám đốc, cùng **chị Quyên**, Phó Tổng Giám đốc Chuyển đổi số.

### Lab 1 — Vòng giải pháp tổng thể đỉnh

**Cần:** Chào anh Đăng. Câu tôi hỏi mọi ứng viên cấp này: điều gì chứng minh anh ở mức "chuyên gia đầu ngành" chứ không phải "làm ngân hàng lâu năm"?

**Đăng:** Dạ, em nghĩ ba thứ ạ. Một — **ca mà tổ chức chỉ dám giao cho em**: 3 năm qua em là kiến trúc sư nghiệp vụ trưởng chương trình chuyển đổi số tín dụng toàn hàng — bán lẻ, SME, doanh nghiệp lớn — 5 nhà cung cấp cùng triển khai trên một lộ trình. Bài khó nhất không phải công nghệ mà là **thiết kế luật chơi chung**: em chủ trì xây mô hình dữ liệu nghiệp vụ chuẩn của khoản vay và khách hàng làm hợp đồng chung, kèm **hội đồng quản trị thay đổi** — nhà cung cấp nào muốn đổi cấu trúc dữ liệu giao tiếp đều phải qua hội đồng, chấm dứt cảnh sửa một đầu vỡ ba đầu giữa các nhà thầu. Hai — **phương pháp của em thành chuẩn của tổ chức**: bộ phương pháp phân tích giải pháp tín dụng em đúc kết — từ phát biểu bài toán, bảng quyết định chính sách, đến hồ sơ chỉ số thành công — đã ban hành thành quy trình bắt buộc cho các chương trình lớn. Ba — em được **gọi trước khi có bài toán**: các giám đốc khối mời em ngồi từ vòng định hình chủ trương, trước khi thành dự án — lúc đó em hiểu vai mình đã chuyển từ người giải bài sang người giúp **ra đề đúng** ạ.

**Cần:** "Ra đề đúng" — đúng thứ chúng tôi thiếu. Cảm ơn anh.

### Lab 2 — Vòng chiến lược cấp toàn hàng

**Quyên:** Vai này chịu trách nhiệm chất lượng giải pháp nghiệp vụ mọi khối — tín dụng, huy động, thanh toán, thẻ. Anh không thể giỏi đều các mảng. Anh làm thế nào?

**Đăng:** Dạ chị chạm đúng cốt lõi — ở tầm này em không bán kiến thức mảng nữa, em bán **hệ bảo đảm chất lượng tư duy giải pháp** ạ. Ba việc: **chuẩn phương pháp** — mọi giải pháp bất kể mảng đều qua cùng bộ câu hỏi gốc: bài toán thật là gì, ai khổ, đo thành công bằng gì, phương án thay thế nào đã loại và vì sao, rủi ro tuân thủ nằm ở điều khoản nào — phương pháp đúng thì chuyên gia mảng nào cũng tự tìm ra lỗ hổng của họ; **mạng lưới chuyên gia** — hội đồng thẩm định liên mảng, ca lớn ghép chuyên gia đúng mảng với chuyên gia phương pháp, em chủ trì phần phương pháp; và **lớp kế cận** — mỗi mảng tối thiểu 2 người đạt mức thẩm định độc lập, thước đo của em là **rút khỏi hội đồng mảng nào thì mảng đó vẫn chạy**. Năm rồi em rút được khỏi hội đồng mảng thanh toán — với em đó là thành tích, không phải mất ghế ạ.

**Quyên:** Cảm ơn anh.

### Lab 3 — Vòng di sản & ảnh hưởng tổ chức

**Cần:** Câu cuối: 5 năm nữa nhìn lại, anh muốn cái gì còn chạy mà không cần anh?

**Đăng:** Dạ ba thứ ạ. **Hệ phương pháp tự tiến hoá** — bộ quy trình phân tích và thẩm định đã ban hành được cập nhật bởi chính cộng đồng dùng nó: em thiết kế cơ chế đề xuất cải tiến mở, năm rồi 5 trong 8 thay đổi phương pháp đến từ các BA trẻ, không phải từ em. **Lớp người** — mục tiêu mỗi khối có ít nhất một người ngồi được đúng vai em đang ngồi ở cấp khối; hiện 3 trên 5 khối, còn 2. Và thứ ba, cái em nghiệm từ 10 năm làm ngân hàng: **hai câu hỏi thành văn hoá** — "bài toán thật là gì" trước khi bàn giải pháp, và "**quyết định này quy về người có thẩm quyền nào**" trước khi tự động hoá bất cứ thứ gì. Khi hai câu đó bật ra tự nhiên trong mọi cuộc họp từ phòng giao dịch đến ban điều hành, kể cả khi không có BA nào trong phòng — thì nghề của em đã hoàn thành nhiệm vụ ở tổ chức này. Người ta hay đo chuyên gia bằng những gì họ xây; em muốn được đo bằng những gì **vẫn đứng vững khi em vắng mặt** ạ.

**Cần:** Cảm ơn anh Đăng. Chúng tôi sẽ phản hồi sớm.

**Góc nhìn người chấm (Spec·V3):** mức ④ của BA ngân hàng nhận diện qua ba tầng bằng chứng: **ca chỉ-mình-làm-được** (luật chơi chung cho 5 nhà cung cấp — bài toán quyền lợi và quản trị, không phải kỹ thuật); **phương pháp cá nhân thành chuẩn tổ chức có cơ chế tự tiến hoá** (5/8 thay đổi đến từ người khác); và **di sản đo bằng sự vắng mặt** — rút khỏi hội đồng mà mảng vẫn chạy, hai câu hỏi văn hoá sống không cần mình, trong đó câu "quyết định này quy về người có thẩm quyền nào" chính là tinh thần xuyên suốt của nghề BA trong ngân hàng: mọi tự động hoá, mọi giải pháp, cuối cùng đều phải quy về được một người có thẩm quyền đã quyết.
