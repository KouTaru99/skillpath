# Năng lực lãnh đạo & ảnh hưởng ở tầm tổ chức

**Định nghĩa.** Bộ năng lực mềm cao nhất của career-path BA: **giải quyết vấn đề** ở độ phức tạp tổ chức, **ảnh hưởng đến người khác dù không có quyền quản lý trực tiếp** (influence without authority), **chủ động phản hồi** khi thấy điều đe doạ thành công chung (không đợi được hỏi), và **thuyết trình giải pháp với cấp lãnh đạo** đủ sức nặng để đổi quyết định. Ở tầng này, "vốn" của bạn không phải chức vụ mà là **uy tín tích luỹ**: chuỗi lần nói đúng, dám nói sớm, và nói có căn cứ.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Chủ động lên tiếng khi phát hiện vấn đề ảnh hưởng dự án — dù không thuộc "phận sự", không ai hỏi, và nói theo cách người nghe tiếp nhận được.

**Tình huống thực tế — lên tiếng về một quyết định kiến trúc không ai hỏi mình.** Trong buổi họp kỹ thuật bạn ngồi dự thính, team quyết dùng chung một CSDL cho cả log nhạy cảm lẫn log thường "cho nhanh". Không ai hỏi BA. Bạn xin 2 phút:

```
CÁCH LÊN TIẾNG (đúng vai, không lấn sân):
  "Em không có ý kiến về mặt kỹ thuật — nhưng có 1 dữ kiện nghiệp
   vụ mọi người cần trước khi chốt: log nhạy cảm theo quy định
   lưu vết QĐ-047 phải kiểm soát truy cập RIÊNG và ghi vết người
   đọc. Nếu chung CSDL, đến đợt audit mình phải chứng minh cách
   ly truy cập ở tầng ứng dụng — kinh nghiệm đợt audit trước là
   họ không chấp nhận cách ly mềm. Đề nghị mình cân nhắc dữ kiện
   này trước khi chốt — quyết thế nào em theo."

VÌ SAO CÁCH NÓI NÀY LỌT TAI:
  - Đứng đúng vai: đưa DỮ KIỆN nghiệp vụ, không phán kỹ thuật
  - Có căn cứ trích được (QĐ-047, kinh nghiệm audit trước)
  - Chừa quyền quyết cho đúng người ("quyết thế nào em theo")
```

Team tách CSDL ngay hôm đó. Sáu tháng sau đợt audit soi đúng chỗ này — và từ đó bạn được mời họp kiến trúc *chính thức*, không còn dự thính.

**Vì sao là mức ①:** dám và biết cách lên tiếng đúng lúc-đúng vai khi không ai hỏi; ảnh hưởng còn ở phạm vi từng vấn đề cụ thể.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** **thay đổi được quyết định của nhóm mình không quản lý** — bằng dữ liệu, ví dụ cụ thể và cách trình bày đặt mình vào lợi ích của người nghe, không phải bằng cãi thắng.

**Tình huống thực tế — thuyết phục team kỹ thuật đảo một quyết định đã chốt.** Team kỹ thuật đã chốt phương án đồng bộ dữ liệu sang hệ thống báo cáo bằng cách cho hệ thống báo cáo **đọc thẳng CSDL** của hệ thống giám sát ("nhanh, đỡ viết API"). Bạn thấy rủi ro dài hạn nhưng bạn không có quyền phủ quyết. Cách bạn tạo ảnh hưởng:

```
BƯỚC 1 — HIỂU VÌ SAO HỌ CHỌN VẬY (không mở màn bằng phản đối)
  Nói chuyện riêng với trưởng nhóm kỹ thuật: hoá ra sức ép chính
  là deadline — API "xịn" tốn 2 tuần họ không có.

BƯỚC 2 — ĐÓNG KHUNG THEO NỖI ĐAU CỦA HỌ (không phải của mình)
  Không nói "sai nguyên tắc kiến trúc" (nỗi đau của bạn) mà đưa
  kịch bản chạm họ: "Lần tới mình đổi cấu trúc bảng cảnh báo —
  việc anh đang định làm quý sau — hệ thống báo cáo bên kia vỡ
  theo, và người bị gọi lúc nửa đêm là team anh, vì bên đó có
  biết gì về schema mình đâu."

BƯỚC 3 — HẠ GIÁ CHI PHÍ CỦA PHƯƠNG ÁN ĐÚNG
  Đề xuất API RÚT GỌN: chỉ 2 endpoint đúng nhu cầu báo cáo hiện
  tại (không phải bộ API đầy đủ 2 tuần) — bạn tự viết trước phần
  đặc tả dữ liệu, Dev chỉ còn ~3 ngày công.

KẾT QUẢ: trưởng nhóm tự trình bày lại phương án API rút gọn trong
họp như thể đồng thiết kế — bạn để họ đứng tên chung. Quyết định
đảo mà không ai "thua".
```

Ba kỹ thuật ảnh hưởng nằm cả trong đó: hiểu động cơ trước khi phản biện, đóng khung theo lợi ích người nghe, và **chia công trạng** — người ta đổi ý dễ hơn nhiều khi việc đổi ý làm họ đẹp lên chứ không xấu đi.

**Vì sao là mức ②:** đổi được quyết định đã chốt của nhóm ngoài quyền hạn bằng phương pháp ảnh hưởng có ý thức; phạm vi là quyết định cấp team/dự án.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** ảnh hưởng tới **quyết định chiến lược ở cấp lãnh đạo cao nhất** — trình bày trước ban lãnh đạo về vấn đề tầm tổ chức, chịu được phản biện gắt, và đủ uy tín để nói điều lãnh đạo không muốn nghe.

**Tình huống thực tế — thuyết trình ban lãnh đạo về tái cấu trúc chiến lược lưu trữ dữ liệu ATTT.** Bạn phát hiện vấn đề tầm tổ chức: 5 hệ thống đang lưu dữ liệu ATTT theo 5 chính sách khác nhau — có chỗ log nhạy cảm giữ 3 năm không ai đụng (rủi ro lộ + tốn kém), có chỗ 3 tháng đã xoá (vi phạm quy định điều tra). Không ai giao bạn việc này. Bạn xin 20 phút trong họp giao ban lãnh đạo quý:

```
CẤU TRÚC 20 PHÚT (thiết kế cho người nghe là CEO/CFO/CISO):
  Phút 1-3    MỞ BẰNG RỦI RO TIỀN TƯƠI: "Nếu bị yêu cầu cung cấp
              log điều tra giai đoạn X, mình KHÔNG cung cấp được —
              đã xoá. Mức phạt theo quy định: [con số]. Ngược lại
              mình đang trả [con số] mỗi năm để lưu thứ không được
              phép dùng."
  Phút 4-10   Bức tranh 5 hệ thống — 1 hình duy nhất, tô đỏ 2 chỗ
              vi phạm, tô vàng 3 chỗ lãng phí
  Phút 11-15  Đề xuất: 1 chính sách phân loại-lưu trữ thống nhất
              4 bậc + lộ trình 3 quý, chi phí ròng ÂM (tiết kiệm
              lưu trữ > chi phí làm)
  Phút 16-20  Xin đúng 2 quyết định: duyệt chính sách khung + chỉ
              định 1 người chủ trì có quyền xuyên hệ thống

PHẢN BIỆN GẮT NHẤT (CFO): "Sao việc này lại từ BA mà không từ
trưởng CNTT?" — bạn trả lời thẳng: "Vì nó nằm GIỮA các hệ thống —
mỗi trưởng hệ thống đều đúng trong phạm vi mình, không ai sai cả,
nên không ai thấy. Nhìn thấy khoảng giữa là việc của phân tích
nghiệp vụ, và đó là lý do em đứng đây."
```

Ban lãnh đạo duyệt cả 2 đề nghị. Nhưng thứ đáng giá hơn nghị quyết: từ quý đó, các tờ trình chiến lược có mục "ý kiến phân tích nghiệp vụ" — **vai BA được thể chế hoá ở tầng ra quyết định**, bắt đầu từ uy tín một người.

**Vì sao là mức ④:** chủ động đặt được vấn đề tầm tổ chức lên bàn lãnh đạo cao nhất, trình bày bằng ngôn ngữ của họ (rủi ro-tiền-quyết định), chịu được phản biện và đổi được cả vị thế của nghề trong tổ chức — ảnh hưởng ở mức cao nhất mà một cá nhân không chức vụ có thể đạt. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
