# Review tài liệu giải pháp nghiệp vụ

**Định nghĩa.** Senior BA bắt đầu **review tài liệu của BA khác** — đảm bảo chất lượng đồng đều, phát hiện thiếu sót trước khi Dev bắt tay code (sửa ở giai đoạn tài liệu luôn rẻ hơn hàng chục lần so với sửa sau khi đã code). Review tốt không phải soi lỗi chính tả — mà là soi **case thiếu, logic mâu thuẫn, và giả định ngầm chưa được viết ra**.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review tài liệu của đồng nghiệp theo checklist có phương pháp — chỉ ra được case thiếu cụ thể, góp ý để người viết giỏi lên chứ không chỉ "bới lỗi".

**Tình huống thực tế — review tài liệu "Export báo cáo cảnh báo" của BA junior.** Bạn đọc theo bộ câu hỏi ruột thay vì đọc trôi:

```
CHECKLIST REVIEW (bộ câu hỏi ruột của bạn)
  1. Dữ liệu RỖNG thì sao?  → ❌ thiếu: khoảng thời gian chọn không
     có cảnh báo nào — file export ra gì? (file rỗng có header? báo lỗi?)
  2. Dữ liệu QUÁ LỚN thì sao? → ❌ thiếu: chọn cả năm = 500.000 dòng
     — có giới hạn không, hay để trình duyệt treo?
  3. Ai KHÔNG được làm việc này? → ⚠️ mơ hồ: "người dùng có quyền"
     — quyền nào? tài khoản chỉ-xem có export được không?
  4. Đơn vị/định dạng rõ chưa? → ❌ thiếu: cột thời gian theo múi giờ
     nào (log server ghi UTC, người đọc ở VN).

CÁCH GÓP Ý (gửi kèm):
  "3 case thiếu đều thuộc nhóm 'giá trị biên' — em thử áp câu hỏi
   'rỗng thì sao, quá lớn thì sao, ai bị cấm' vào mọi tài liệu sau,
   sẽ tự bắt được trước khi anh review."
```

Điểm đáng giá: câu hỏi số 4 (múi giờ) đến từ kinh nghiệm bug thật trước đây — review giỏi là *chuyển sẹo của mình thành checklist cho người khác*.

**Vì sao là mức ①:** bắt được case thiếu trong phạm vi một tài liệu bằng phương pháp rõ ràng; chưa soi được mâu thuẫn giữa nhiều tài liệu liên quan.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** review được **tính nhất quán logic xuyên nhiều tài liệu** — loại lỗi không nằm trong bất kỳ tài liệu đơn lẻ nào mà nằm ở *khoảng hở giữa chúng*.

**Tình huống thực tế — bắt lỗ hổng phân quyền nằm giữa 2 tài liệu.** Bạn review đồng thời "Phân quyền xem cảnh báo" (BA A viết) và "Export báo cáo" (BA B viết). Đọc riêng, cả hai đều ổn. Đọc chéo, bạn phát hiện:

```
Tài liệu PHÂN QUYỀN (của A):  user thường KHÔNG xem được cảnh báo
                              mức Cao trên màn hình.
Tài liệu EXPORT (của B):      export "toàn bộ cảnh báo trong khoảng
                              thời gian đã chọn" — KHÔNG nhắc lọc quyền.

→ LỖ HỔNG GHÉP: user thường không XEM được mức Cao trên màn,
  nhưng bấm EXPORT là có toàn bộ trong file Excel.
  Phân quyền màn hình thành vô nghĩa — dữ liệu lộ qua cửa sau.

XỬ LÝ: lập bảng "ma trận quyền × mọi ngõ ra dữ liệu" (màn hình,
export, API, email) — quy tắc mới cho cả nhóm: thêm ngõ ra nào
phải rà ma trận này, quyền áp ở TẦNG DỮ LIỆU, không áp riêng
từng màn hình.
```

Loại lỗi này Tester khó bắt (mỗi tính năng test riêng đều "pass"), Dev không bắt (mỗi người code đúng tài liệu của mình) — chỉ người review chéo với tư duy nghiệp vụ toàn cục mới thấy.

**Vì sao là mức ②:** phát hiện mâu thuẫn ở khoảng hở giữa các tài liệu và nâng thành quy tắc phòng ngừa; không chỉ soát lỗi trong phạm vi một tài liệu.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** review của bạn trở thành **cổng chất lượng chính thức của nhóm** — bạn thiết kế quy trình review (khi nào, ai review ai, theo chuẩn gì) và đào tạo người khác review được như mình.

**Tình huống thực tế — dựng quy trình review cho nhóm BA 6 người.** Sản phẩm phình to, mình bạn review không xuể và thành nút cổ chai. Thay vì cố review nhiều hơn, bạn thiết kế lại hệ thống:

```
QUY TRÌNH REVIEW TÀI LIỆU GIẢI PHÁP (nhóm BA — v2)

TẦNG 1 TỰ REVIEW    Người viết tự chạy checklist 12 câu (đúc từ 2 năm
                    lỗi thật của nhóm: rỗng/quá lớn/quyền/múi giờ/
                    trạng thái đồng thời/ngoại lệ tích hợp...)
                    trước khi gửi — nộp kèm checklist đã tick.
TẦNG 2 REVIEW CHÉO  BA cùng cấp review, tập trung logic nghiệp vụ.
                    Ma trận phân công xoay vòng — ai cũng được review
                    và bị review, không ai review bài mình quen tay.
TẦNG 3 SENIOR       Chỉ tài liệu chạm 1 trong 3 vùng đỏ mới lên bạn:
                    (a) phân quyền/dữ liệu nhạy cảm, (b) tích hợp
                    hệ thống ngoài, (c) thay đổi mô hình dữ liệu lõi.
ĐO LƯỜNG            Đếm "bug do tài liệu" mỗi quý làm thước: quý trước
                    11 bug, mục tiêu <5.
```

Sau một quý: bug-do-tài-liệu giảm còn 4, thời gian bạn ngồi review giảm nửa — vì 80% lỗi bị chặn từ tầng 1–2. Bạn không còn là người review giỏi nhất làm mãi một việc; bạn là người làm cho **cả nhóm review giỏi lên**.

**Vì sao là mức ③:** thiết kế được cơ chế review có tầng, có chuẩn, có số đo — chất lượng tài liệu của cả nhóm tăng mà không phụ thuộc một cá nhân; đó là bước nhảy từ "làm giỏi" sang "tổ chức để mọi người làm giỏi".
