# Hướng dẫn & review kịch bản kiểm thử

**Định nghĩa.** Thuộc nhóm **Quản lý & lãnh đạo kỹ thuật** — Senior Tester không chỉ tự viết kịch bản tốt mà **hướng dẫn và review** cho Tester cấp thấp hơn/tương đương, giữ chất lượng kiểm thử đồng đều cả team. Review giỏi không phải "bới lỗi" mà là **dạy người viết tự thấy chỗ thiếu** — mục tiêu cuối là họ không cần bạn review nữa.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review kịch bản của đồng nghiệp, chỉ ra case thiếu/chưa rõ một cách cụ thể, có lý do.

**Tình huống thực tế — review test case "Xuất báo cáo cảnh báo" của một Junior.** Bạn đọc bằng bộ câu hỏi ruột và ghi góp ý cụ thể:

```
REVIEW — Bộ test "Xuất báo cáo cảnh báo" (của bạn Junior)

  Bộ hiện có: 5 case, đều là dữ liệu bình thường (10-50 cảnh báo).

  THIẾU (góp ý bổ sung trước khi chạy):
  ⚠️ Case dữ liệu RỖNG: chọn khoảng thời gian không có cảnh báo
     nào → file export ra gì? (rỗng có header? báo "không có dữ
     liệu"? hay lỗi?)
  ⚠️ Case dữ liệu CỰC LỚN: 10.000 cảnh báo → export có treo/timeout
     không? (đây là sản phẩm an ninh, dữ liệu lớn là bình thường)
  ⚠️ Case PHÂN QUYỀN: user chỉ-xem có export được dữ liệu nhạy
     cảm không? (nếu có → lỗ hổng lộ dữ liệu qua đường export)
```

**Vì sao là mức ①:** chỉ ra case thiếu cụ thể có lý do cho một bộ kịch bản; chưa dạy cách tư duy để người viết tự cải thiện.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** không chỉ review từng case mà **dạy khung tư duy** để người viết tự nghĩ ra case — đầu tư vào năng lực lâu dài, không chỉ sửa bài trước mắt.

**Tình huống thực tế — biến 3 góp ý thành một nguyên tắc học được.** Thay vì chỉ liệt kê "thiếu case rỗng, case lớn, case phân quyền", bạn ngồi cùng bạn Junior và trao khung tư duy:

```
BẠN DẠY (thay vì chỉ sửa):
  "Ba case anh vừa thêm không rời rạc — chúng theo một khung. Mỗi
   khi em test thứ gì có DẠNG DANH SÁCH, luôn hỏi 3 câu:
     (1) RỖNG thì sao? (0 phần tử)
     (2) MỘT thì sao?  (1 phần tử — hay lỗi biên)
     (3) CỰC NHIỀU thì sao? (hiệu năng, phân trang, timeout)
   Và với sản phẩm an ninh, thêm câu thứ 4:
     (4) AI KHÔNG được xem/làm cái này? (phân quyền)

   Lần sau em tự chạy 4 câu này trước khi nhờ anh review — em sẽ
   tự bắt được 80% case thiếu."

KIỂM CHỨNG BÀI DẠY: bộ test tiếp theo của bạn ấy (tính năng khác)
tự có đủ 4 nhánh — không cần bạn nhắc. Đó là lúc "dạy" thành công.
```

Chênh lệch giữa V1 và V2 nằm ở đó: V1 cho con cá (case thiếu), V2 cho cần câu (khung 4 câu hỏi tự áp).

**Vì sao là mức ②:** truyền được cách tư duy giúp người khác tự cải thiện lâu dài; giá trị nhân lên qua người, không chỉ sửa bài trước mắt.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** dẫn dắt chuyên môn ở **phạm vi cả team dự án** (gồm cả Dev), không chỉ kèm 1-1 — biến kinh nghiệm cá nhân thành tài sản chung.

**Tình huống thực tế — tổ chức buổi chia sẻ "lỗi thường gặp khi thiết kế test case" cho cả team.** Bạn nâng việc kèm cặp lên thành đào tạo có hệ thống, dùng chính bài học của dự án:

```
BUỔI CHIA SẺ NỘI BỘ (cả team, gồm Dev) — 1 tiếng
  Chủ đề: "5 case hay bị bỏ sót khi test hệ thống giám sát ANM"

  Cách làm KHÁC bài giảng lý thuyết:
  - Dùng CASE THẬT đã lọt lưới trong dự án (ẩn tên người):
    vd "bug gộp cảnh báo dưới tải cao" — lọt vì bộ test không có
    case tải + biên cửa sổ thời gian.
  - Với mỗi case: cho cả phòng ĐOÁN trước "chỗ này test kiểu gì
    mới bắt được?" → rồi mới lật đáp án.

  GIÁ TRỊ MỞ RỘNG: Dev ngồi nghe hiểu được "Tester nhìn rủi ro
  thế nào" → Dev tự viết unit test tốt hơn, tự tránh các bẫy đó
  → chất lượng tăng từ GỐC, không chỉ ở khâu test.
```

Ở mức này bạn không còn nâng từng người — bạn nâng **mặt bằng chất lượng của cả team**, và kéo cả Dev vào tư duy chất lượng (điều mà kèm 1-1 không làm được).

**Vì sao là mức ③:** dẫn dắt chuyên môn ở tầm cả team, biến bài học dự án thành đào tạo có hệ thống ảnh hưởng cả Dev — từ "dạy 1 người" lên "nâng mặt bằng nhiều người".
