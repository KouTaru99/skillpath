# Kiến thức chuyên sâu nghiệp vụ theo lĩnh vực

**Định nghĩa.** Specialist BA có kiến thức chuyên sâu về **một lĩnh vực nghiệp vụ cụ thể** (tài chính, tài sản, nhân sự — hoặc với bối cảnh của chúng ta: **ATTT**, an toàn thông tin) — không chỉ hiểu một sản phẩm mà hiểu cả bức tranh ngành: chuẩn mực, quy định, cách các tổ chức khác giải cùng bài toán. Khác biệt căn bản với "nắm nghiệp vụ sản phẩm" (kỹ năng Experienced): một bên hiểu *sản phẩm mình*, một bên hiểu *cả ngành* — đủ để biết sản phẩm mình đang đứng đâu và nên đi đâu.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Chủ động học có hệ thống các khung chuẩn của ngành, vượt ra ngoài phạm vi sản phẩm đang làm — và bắt đầu nối được "chuẩn ngành" với "việc hằng ngày".

**Tình huống thực tế — tự học MITRE ATT&CK và ISO 27001 có mục đích.** Bạn không đọc lan man mà học theo bản đồ tự vạch:

```
KẾ HOẠCH TỰ HỌC LĨNH VỰC ATTT (quý này)

  Khung           | Nó là gì                       | Nối vào việc của mình
  ----------------|--------------------------------|------------------------
  MITRE ATT&CK    | Bảng tra cứu chuẩn toàn cầu về | Mỗi loại cảnh báo của
  (khung mô tả    | các KỸ THUẬT tấn công thật     | hệ thống mình đang phát
  kỹ thuật tấn    | (vd: T1110 dò mật khẩu,        | hiện ứng với kỹ thuật
  công)           | T1046 quét dịch vụ mạng)       | nào trong ATT&CK?
  ISO 27001       | Chuẩn quốc tế về QUẢN LÝ an    | Khách hàng lớn sẽ đòi
  (chuẩn hệ thống | toàn thông tin trong tổ chức   | báo cáo theo chuẩn này
  quản lý ATTT)   | (quy trình, kiểm soát, audit)  | khi mua sản phẩm giám sát
```

Bài tập tự giao: lấy 20 loại cảnh báo hệ thống mình đang có, gắn mã ATT&CK cho từng loại. Kết quả phụ bất ngờ: 20 cảnh báo chỉ phủ 12 kỹ thuật — lần đầu bạn *nhìn thấy* vùng mù của sản phẩm bằng ngôn ngữ chuẩn ngành.

**Vì sao là mức ①:** học có hệ thống và bắt đầu nối chuẩn ngành vào sản phẩm; kiến thức chưa đủ dày để tư vấn định hướng.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** **dùng kiến thức ngành để tư vấn quyết định thực tế** — thay câu "em nghĩ nên làm X" bằng "dữ liệu ngành cho thấy nên làm X".

**Tình huống thực tế — dùng ATT&CK chấm dứt cuộc tranh luận "làm tính năng phát hiện gì trước".** Team sản phẩm tranh luận cảm tính suốt 2 buổi họp: người muốn phát hiện mã độc, người muốn phát hiện leo thang đặc quyền. Bạn mang khung ngành vào:

```
PHÂN TÍCH ƯU TIÊN THEO DỮ LIỆU NGÀNH (trích)

  Kỹ thuật ATT&CK       | Tần suất gặp     | Mình đã     | Khoảng trống
                        | (báo cáo ngành + | phát hiện   |
                        | log nội bộ 6th)  | được chưa?  |
  ----------------------|------------------|-------------|--------------
  T1110 Dò mật khẩu     | RẤT CAO (cả 2)   | ✅ tốt      | —
  T1566 Phishing        | RẤT CAO ngành,   | ❌          | 🔴 LỚN NHẤT
                        | CAO nội bộ       |             |
  T1068 Leo thang đặc   | TRUNG BÌNH       | ❌          | 🟡 làm sau
  quyền                 |                  |             |
  T1486 Mã hoá tống     | THẤP nội bộ      | ❌          | 🟡 (nặng nếu
  tiền (ransomware)     | (chưa từng gặp)  |             | dính, nhưng
                        |                  |             | xác suất thấp)

KHUYẾN NGHỊ: ưu tiên phát hiện dấu hiệu Phishing — tần suất cao
nhất trong cả dữ liệu ngành lẫn log nội bộ mà mình đang mù hoàn toàn.
```

Cuộc tranh luận 2 buổi kết thúc trong 15 phút — không phải vì bạn nói to hơn, mà vì bạn đổi mặt bằng tranh luận từ "tôi nghĩ" sang "dữ liệu ngành nói".

**Vì sao là mức ②:** kiến thức ngành được chuyển hoá thành tư vấn quyết định cụ thể có căn cứ; phạm vi ảnh hưởng là quyết định của team sản phẩm.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** trở thành **người được cả đơn vị tìm tới tham vấn** về lĩnh vực — ý kiến của bạn ảnh hưởng trực tiếp quyết định đầu tư cấp đơn vị, và bạn đủ sâu để nói "chưa nên làm" trước một cơ hội hấp dẫn.

**Tình huống thực tế — tham vấn quyết định đầu tư hướng "giám sát bảo mật cloud".** Đơn vị cân nhắc mở dòng sản phẩm giám sát bảo mật hạ tầng cloud — thị trường đang nóng, lãnh đạo hào hứng. Bạn là người được mời tham vấn đầu tiên, và bản tham vấn của bạn có sức nặng vì nó **không chỉ nói về công nghệ**:

```
BẢN THAM VẤN (tóm tắt 1 trang trình lãnh đạo)

GÓC NGÀNH      Giám sát cloud khác giám sát mạng nội bộ ở GỐC dữ liệu:
               không còn "log firewall của mình" mà là API của nhà cung
               cấp cloud (mỗi nhà một kiểu, đổi liên tục). Năng lực lõi
               phải xây lại ~60%, không phải "mở rộng sản phẩm cũ" như
               tư vấn bán hàng mô tả.
GÓC QUY ĐỊNH   Khách hàng khối nhà nước (70% doanh thu đơn vị) còn bị
               ràng buộc quy định dữ liệu đặt tại chỗ → nhu cầu cloud
               THẬT của tệp khách này ít nhất 2-3 năm nữa mới chín.
GÓC NĂNG LỰC   Đơn vị chưa có ai vận hành cloud ở quy mô sản xuất —
               bán sản phẩm giám sát cloud khi chính mình chưa vận hành
               cloud là rủi ro uy tín.
KHUYẾN NGHỊ    CHƯA đầu tư dòng sản phẩm riêng. Bước đệm 2 quý: (1) đưa
               1-2 nguồn log cloud phổ biến vào sản phẩm hiện có như
               connector mới; (2) cử 2 người học vận hành cloud thật.
               Đo nhu cầu qua connector — có số thật rồi mới quyết dòng
               sản phẩm.
```

Sáu tháng sau, một đơn vị bạn cạnh tranh lao vào hướng này và sa lầy đúng chỗ "xây lại 60%" — còn đơn vị bạn có 2 connector cloud chạy ổn và số liệu nhu cầu thật để quyết bước tiếp. Uy tín "người tham vấn" của bạn được xây bằng những lần **dám khuyên chậm lại có căn cứ** như vậy.

**Vì sao là mức ④:** kiến thức lĩnh vực đủ sâu và đủ rộng (công nghệ + quy định + năng lực tổ chức) để định hình quyết định đầu tư cấp đơn vị — kể cả quyết định "không làm", vốn khó nói và đắt giá nhất. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
