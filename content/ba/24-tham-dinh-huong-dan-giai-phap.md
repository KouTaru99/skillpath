# Thẩm định & hướng dẫn giải pháp cho thành viên trong nhóm

**Định nghĩa.** Specialist BA **chịu trách nhiệm thẩm định** giải pháp của các BA khác — khác review của Senior (góp ý để tốt lên), thẩm định là **ra kết luận đạt/không đạt và chịu trách nhiệm về kết luận đó**: nếu giải pháp đã thẩm định "đạt" mà ra sự cố, người thẩm định cùng chịu. Đi kèm là **hướng dẫn**: khi thành viên bí, dạy cách tư duy để họ tự giải — không làm hộ.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Thẩm định giải pháp của một BA khác cho một dự án cụ thể — kết luận rõ ràng, tiêu chí minh bạch, không "góp ý chung chung rồi ai hiểu sao thì hiểu".

**Tình huống thực tế — thẩm định giải pháp "tích hợp nguồn log mới" của một Senior BA.** Trước khi giải pháp được duyệt triển khai, bạn thẩm định theo biên bản có cấu trúc:

```
BIÊN BẢN THẨM ĐỊNH — GP-031 Tích hợp nguồn log thiết bị mạng mới
Người thẩm định: [bạn] · Kết luận: ❌ CHƯA ĐẠT — 2 điểm chặn

TIÊU CHÍ RÀ (công khai trước với người viết):
  ✅ Nghiệp vụ: luồng chính đúng, các vai rõ
  ✅ Dữ liệu: mô hình khớp chuẩn chung, có xử lý trùng
  ❌ CHẶN 1: chưa có phương án khi nguồn log mới đẩy SAI ĐỊNH DẠNG
     (thiết bị hãng khác firmware khác — xác suất cao). Log lỗi
     âm thầm bị bỏ = điểm mù giám sát mà không ai biết.
  ❌ CHẶN 2: ước tính dung lượng thiếu — nguồn mới +40% log/ngày,
     chưa đối chiếu với chỉ tiêu lưu trữ 12 tháng đã cam kết.
  ⚠️ Khuyến nghị (không chặn): nên thêm màn theo dõi "sức khoẻ
     nguồn log" — làm sau được.

HẸN THẨM ĐỊNH LẠI: sau khi bổ sung 2 điểm chặn (ước 3 ngày).
```

Hai điều làm biên bản này "chuẩn thẩm định": **phân biệt điểm chặn với khuyến nghị** (không đạt vì 2 điểm, không phải vì mọi thứ chưa hoàn hảo), và tiêu chí công khai trước — người bị thẩm định tâm phục vì luật chơi rõ từ đầu.

**Vì sao là mức ①:** thẩm định chắc một giải pháp cụ thể với kết luận và tiêu chí rõ; chưa phải người xây cách-hướng-dẫn cho nhiều người hay chuẩn thẩm định cho đơn vị.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** **hướng dẫn cách tự giải** cho nhiều thành viên — khi ai đó bí, bạn dạy khung tư duy chứ không đưa đáp án; mục tiêu là lần sau họ không cần bạn.

**Tình huống thực tế — gỡ bí cho Senior BA đang tắc ở bài toán tương quan đa nguồn.** Bạn ấy ôm bài toán "quy tắc gộp cảnh báo từ 4 nguồn log" ba ngày không ra, đến xin bạn "anh làm mẫu giúp em". Bạn từ chối làm hộ — và hướng dẫn bằng câu hỏi:

```
CÁCH BẠN GỠ (45 phút, bảng trắng — bạn chỉ HỎI, không vẽ hộ):
  H1: "Bài này to vì cái gì?" → "4 nguồn × nhiều loại cảnh báo
      × cửa sổ thời gian — tổ hợp nổ."
  H2: "Thử cố định 1 chiều xem? Nếu chỉ có 1 nguồn thì em giải
      thế nào?" → bạn ấy vẽ được ngay quy tắc cho 1 nguồn.
  H3: "Giờ thêm nguồn thứ 2 — cái gì GÃY trong quy tắc cũ?"
      → "à, chỉ gãy chỗ khớp danh tính thiết bị… còn lại giữ nguyên!"
  H4: "Vậy bài toán thật là gì?" → "không phải 'gộp 4 nguồn' mà là
      'chuẩn hoá danh tính thiết bị' + quy tắc gộp 1 nguồn áp chung."
  CHỐT: bạn ấy tự viết lại đề bài, giải xong trong 1 ngày.

SAU BUỔI GỠ: bạn ghi lại khung 4 câu hỏi trên vào sổ tay nhóm
("bí vì tổ hợp → cố định bớt chiều → tìm chỗ gãy → định lại đề").
```

Ba tháng sau, chính bạn ấy dùng đúng khung này gỡ bí cho một BA khác — dấu hiệu hướng dẫn đã "nhân bản" được.

**Vì sao là mức ②:** dạy được cách tư duy khiến người khác tự giải và tự truyền tiếp — giá trị nhân lên qua người; không chỉ thẩm định kết quả cuối hay làm hộ cho nhanh.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** trở thành **chuẩn thẩm định chính thức của đơn vị** — có quy chế: giải pháp loại nào bắt buộc qua bạn, kết luận của bạn là cửa cuối, và bạn xây hệ thống để chính vai trò này không thành nút cổ chai.

**Tình huống thực tế — vận hành "cổng thẩm định" cấp đơn vị.** Sau vài sự cố do giải pháp yếu lọt lưới, đơn vị ra quy chế: mọi giải pháp chạm 1 trong 3 vùng (dữ liệu nhạy cảm / tích hợp ngoài / thay đổi mô hình dữ liệu lõi) phải qua thẩm định của bạn trước khi triển khai. Bạn thiết kế để cổng này chạy được lâu dài:

```
CƠ CHẾ CỔNG THẨM ĐỊNH (để không thành nút cổ chai):
- CÔNG KHAI BỘ TIÊU CHÍ 15 điểm — ai cũng tự soi trước khi nộp;
  60% hồ sơ tự sửa đạt trước khi tới bạn.
- SLA rõ: kết luận trong 3 ngày làm việc — dự án lên lịch được.
- PHÂN CẤP: 3 vùng đỏ bạn thẩm trực tiếp; vùng vàng uỷ quyền
  2 Senior BA bạn đã đào tạo (dùng chung biên bản chuẩn),
  bạn hậu kiểm xác suất 1/5 hồ sơ.
- CHỊU TRÁCH NHIỆM THẬT: sự cố lọt qua cổng → mổ xẻ công khai
  bắt đầu từ chính biên bản thẩm định của bạn — có lần bạn đứng
  ra nhận "tiêu chí 15 điểm thiếu mục kiểm tra vòng đời dữ liệu",
  bổ sung thành điểm 16. Uy tín cổng tăng chứ không giảm sau vụ đó.
```

**Vì sao là mức ④:** kết luận thẩm định của bạn là cửa cuối cấp đơn vị, có quy chế - SLA - phân cấp - trách nhiệm đi kèm; và bạn xây nó thành hệ thống sống được không phụ thuộc một mình bạn. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
