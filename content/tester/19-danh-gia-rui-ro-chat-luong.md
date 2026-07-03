# Phân tích, đánh giá & dự báo rủi ro chất lượng sản phẩm

**Định nghĩa.** Ở Senior, Tester không chỉ tìm bug mà nhìn **tổng thể chất lượng sản phẩm**: dựa kết quả kiểm thử để dự báo rủi ro nào có thể xảy ra sau release, và đề xuất/quyết định biện pháp giảm thiểu trước khi quá muộn. Đây là bước chuyển từ "người đếm bug" sang "người tư vấn quyết định release" — câu hỏi trung tâm không còn là "còn bug không" mà là "**release bây giờ thì rủi ro gì, đáng không**".

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Tổng hợp kết quả kiểm thử để nhận diện rủi ro cơ bản — khu vực nào còn nhiều bug chưa fix, mức độ ảnh hưởng ra sao.

**Tình huống thực tế — báo cáo rủi ro trước ngày release.** Thay vì báo "còn 3 bug", bạn nối bug với rủi ro nghiệp vụ:

```
BÁO CÁO RỦI RO — trước release hệ thống giám sát (2 ngày nữa)

  Module              | Bug chưa fix        | Rủi ro nếu release
  --------------------|---------------------|-----------------------
  Cảnh báo tự động    | 3 bug HIGH          | 🔴 CAO — cảnh báo có
                      | (gộp sai, trễ email)| thể trễ/sai → hụt chức
                      |                     | năng an ninh CỐT LÕI
  Dashboard thống kê  | 0 bug               | 🟢 THẤP — sạch, ổn định

  KHUYẾN NGHỊ: rủi ro tập trung ở module cốt lõi nhất — cần cân
  nhắc trước khi chốt release đúng hạn.
```

**Vì sao là mức ①:** nhận diện và truyền đạt rủi ro hiện tại gắn với ảnh hưởng nghiệp vụ; chưa dự báo rủi ro phát sinh hay tự ra quyết định release.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** không chỉ báo hiện trạng mà **dự báo rủi ro sẽ phát sinh** và đề xuất phương án xử lý cụ thể — nhìn trước được cả hệ quả của chính hành động "fix gấp".

**Tình huống thực tế — dự báo "fix vội sinh bug mới" và đề xuất tách release.** Ngoài 3 bug hiện tại, bạn dự báo hệ quả bậc hai:

```
DỰ BÁO (dựa kinh nghiệm các đợt release trước):
  Nếu ép fix gấp 3 bug HIGH của module Cảnh báo trong 2 ngày:
  → xác suất cao sinh bug mới do sửa vội (module này phức tạp,
    3 đợt release trước đều có "bug hồi quy sau fix gấp").
  → thời gian test lại không đủ → rủi ro chồng rủi ro.

ĐỀ XUẤT (không phải "cố fix cho kịp"):
  - TÁCH release: launch 2 module đã ổn định (Dashboard, Report)
    đúng hạn → khách có giá trị ngay.
  - Module Cảnh báo dời 1 sprint: fix + test đủ, không vội.
  → Giảm rủi ro dồn tất cả vào 1 lần release lớn.
```

Giá trị của mức này: nhìn được **rủi ro của giải pháp**, không chỉ rủi ro của vấn đề — "fix gấp" bản thân nó là một rủi ro.

**Vì sao là mức ②:** dự báo rủi ro phát sinh và đề xuất phương án có cân nhắc hệ quả; phạm vi ở tầm 1–2 module.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** làm việc này ở quy mô **cả hệ thống nhiều module**, và **tự chủ ra quyết định** (đặt điều kiện chặn release) thay vì chỉ đề xuất.

**Tình huống thực tế — tự chủ xếp hạng rủi ro và đặt "cổng release" cho đợt lớn 6 module.** Trước một đợt release lớn, bạn phân tích toàn bộ dữ liệu bug lịch sử + kết quả test hiện tại, rồi tự quyết cổng chất lượng:

```
BẢNG QUYẾT ĐỊNH RELEASE — 6 module (bạn tự chủ, không chờ duyệt hướng)

  Module          | Rủi ro | Điều kiện CHẶN release (gate)
  ----------------|--------|----------------------------------------
  Cảnh báo tự động| CAO    | 0 bug HIGH + hiệu năng ≥200 cb/s + hồi
                  |        | quy pass 100% → CHƯA đạt: CHẶN
  Xác thực/phân   | CAO    | 0 bug bảo mật + test injection sạch
  quyền           |        | → CHƯA đạt: CHẶN
  Dashboard       | TB     | 0 bug HIGH, cho phép ≤2 bug LOW
  Báo cáo/Export  | TB     | phân quyền dữ liệu nhạy cảm pass 100%
  Cấu hình        | THẤP   | smoke pass
  Giao diện chung | THẤP   | smoke pass

  THỨ TỰ RELEASE: nhóm THẤP/TB trước (đã đạt gate) → 2 module CAO
  release sau khi qua gate, không đánh đồng "cả gói cùng lên".
```

Ở mức này bạn không hỏi "có nên release không" — bạn **định nghĩa điều kiện release** cho từng module và chịu trách nhiệm về bộ tiêu chí đó, đóng vai người gác cổng chất lượng cấp hệ thống.

**Vì sao là mức ③:** phân tích rủi ro toàn hệ thống và tự chủ đặt cổng chất lượng release; từ "đề xuất cho người khác quyết" lên "tự quyết và chịu trách nhiệm".
