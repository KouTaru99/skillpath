# Đề xuất cách tiếp cận & kỹ thuật phân tích phù hợp dự án

**Định nghĩa.** Không phải dự án nào cũng cần cùng một kỹ thuật phân tích — Senior BA biết **chọn đúng công cụ cho đúng bài toán**: khi nào dùng BPMN, khi nào chỉ cần use case đơn giản, khi nào cần mô hình dữ liệu chi tiết, và quan trọng không kém — khi nào **không cần** vẽ gì cả. Chọn sai hai chiều đều đắt: tài liệu quá nặng cho dự án nhỏ làm chậm tiến độ; tài liệu quá nhẹ cho bài toán phức tạp làm Dev code sai.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Khi được hỏi, đề xuất được cách tiếp cận phù hợp cho một dự án cụ thể — kèm lý do vì sao chọn nhẹ/nặng.

**Tình huống thực tế — chặn đứng bộ tài liệu quá nặng cho việc nhỏ.** BA junior trong nhóm chuẩn bị làm tính năng "thêm bộ lọc theo loại tấn công vào màn danh sách" — và định viết đủ bộ: BPMN, use case diagram, mô hình dữ liệu. Bạn được hỏi ý kiến và đề xuất:

```
BÀI TOÁN: thêm 1 dropdown lọc vào màn có sẵn — không luồng mới,
          không dữ liệu mới, không vai người dùng mới.

ĐỀ XUẤT CÁCH TIẾP CẬN
  ✅ CẦN:   PTYC ngắn 1 trang — danh sách giá trị lọc, hành vi khi
            kết hợp với các bộ lọc có sẵn, giá trị mặc định.
  ❌ KHÔNG: BPMN (không có quy trình mới), use case diagram (không
            actor mới), mô hình dữ liệu (không bảng mới).
  LÝ DO:    2 ngày công tài liệu cho 1 ngày công code là tỉ lệ ngược.
            Rủi ro của tính năng nằm ở CHI TIẾT HÀNH VI (lọc kết hợp),
            không nằm ở LUỒNG — nên đầu tư vào bảng hành vi, không
            phải sơ đồ.
```

**Vì sao là mức ①:** chọn đúng độ nặng-nhẹ tài liệu cho một dự án cụ thể khi được hỏi, có lý do rõ; chưa tự thiết kế tổ hợp kỹ thuật cho bài toán phức tạp.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** với dự án phức tạp, **tự quyết định tổ hợp nhiều kỹ thuật** — kỹ thuật nào cho tầng nào của bài toán, và trình tự làm cái nào trước.

**Tình huống thực tế — thiết kế bộ công cụ phân tích cho module "Tương quan cảnh báo đa nguồn".** Module mới toanh: nhiều nguồn log, nhiều quy tắc gộp, nhiều vai người dùng. Bạn tự quyết định "bản đồ kỹ thuật":

```
TẦNG BÀI TOÁN                    → KỸ THUẬT CHỌN         → VÌ SAO
  Luồng xử lý tổng thể            BPMN (1 sơ đồ chính)     nhiều rẽ nhánh,
  (log vào → chuẩn hoá → tương                             khách cần duyệt
  quan → sinh sự cố → cảnh báo)                            được bằng mắt
  Quy tắc gộp cảnh báo            BẢNG QUYẾT ĐỊNH          logic dạng "nếu-thì"
  (cùng IP? cùng loại? cửa sổ     (decision table)         nhiều tổ hợp — bảng
  thời gian?)                                              đủ, sơ đồ sẽ rối
  Cấu trúc lưu tương quan         Mô hình dữ liệu quan hệ  Dev cần chốt quan hệ
                                                           alert–incident sớm
  Ai làm gì trên module           Use case theo VAI        3 vai khác hẳn nhau
                                  (vận hành/quản trị/xem)
TRÌNH TỰ: BPMN duyệt với khách TRƯỚC (chốt nghiệp vụ) → bảng quyết
định + mô hình dữ liệu làm SONG SONG với thiết kế kỹ thuật của Dev.
```

Điểm trưởng thành nhất: chọn **bảng quyết định** cho quy tắc gộp thay vì cố nhét mọi thứ vào BPMN — biết mỗi kỹ thuật mạnh ở đâu và giới hạn ở đâu.

**Vì sao là mức ②:** tự tin phối hợp nhiều kỹ thuật đúng tầng bài toán và sắp trình tự hợp lý; phạm vi vẫn trong dự án mình phụ trách.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** cách tiếp cận bạn chọn trở thành **khuôn mẫu cho nhóm BA** — bạn chuẩn hoá "bài toán dạng nào dùng bộ công cụ nào" để cả nhóm chọn đúng mà không cần hỏi bạn từng lần.

**Tình huống thực tế — chuẩn hoá khung chọn kỹ thuật cho cả nhóm BA.** Sau vài dự án, bạn nhận ra nhóm BA 5 người mỗi người chọn kỹ thuật theo thói quen riêng — người nghiện BPMN vẽ cả cho việc 1 ngày công, người chỉ viết chữ kể cả luồng phức tạp. Bạn đúc kết thành khung chọn nhanh, đưa vào tài liệu onboarding của nhóm:

```
KHUNG CHỌN KỸ THUẬT PHÂN TÍCH (nhóm BA — v1)

Trả lời 3 câu hỏi trước khi mở công cụ vẽ:
  Q1. Có QUY TRÌNH mới/đổi không?     → Có: BPMN. Không: bỏ qua.
  Q2. Logic có dạng NHIỀU TỔ HỢP      → Có: bảng quyết định.
      điều kiện không?                  (đừng nhét vào BPMN)
  Q3. Có DỮ LIỆU mới/quan hệ đổi?     → Có: mô hình quan hệ TRƯỚC
                                        khi Dev thiết kế bảng.
Quy tắc chung:
  - Tính năng ≤3 ngày công Dev → chỉ PTYC 1 trang, miễn sơ đồ.
  - Mọi sơ đồ phải có NGƯỜI ĐỌC cụ thể (khách duyệt? Dev code?
    Tester viết case?). Sơ đồ không ai đọc = xoá.
```

Một quý sau, review chéo trong nhóm cho thấy tài liệu đồng đều hẳn — và BA junior mới vào tự chọn đúng công cụ ngay dự án đầu nhờ khung này.

**Vì sao là mức ③:** nâng từ "mình chọn đúng" lên "cả nhóm chọn đúng" — chuẩn hoá được phương pháp, ảnh hưởng chất lượng phân tích của tổ chức, không chỉ của dự án mình làm.
