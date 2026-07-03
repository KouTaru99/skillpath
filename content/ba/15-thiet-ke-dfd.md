# Thiết kế luồng dữ liệu hệ thống (DFD)

**Định nghĩa.** **DFD** (Data Flow Diagram — sơ đồ luồng dữ liệu) mô tả **dữ liệu di chuyển thế nào** giữa các thành phần hệ thống: từ nguồn nào vào, xử lý ở đâu, lưu ở đâu, đi tới đâu. Khác BPMN (mô tả quy trình *người và hệ thống làm gì theo thứ tự nào*), DFD trả lời câu hỏi *dữ liệu chảy qua đâu* — hai góc nhìn bổ sung nhau. Với BA, DFD là ngôn ngữ chung quý giá khi nói chuyện với Dev/kiến trúc sư về "dữ liệu nhạy cảm nằm ở đâu, ai đọc được, đi qua những trạm nào".

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Vẽ được DFD cho một luồng xử lý dữ liệu cụ thể, đúng ký hiệu 4 thành phần: nguồn/đích ngoài, tiến trình xử lý, kho dữ liệu, và mũi tên luồng.

**Tình huống thực tế — DFD cho luồng "Phát hiện cảnh báo".** Dev mới vào dự án hỏi "log đi từ đâu tới cái email cảnh báo?" — thay vì giải thích miệng 10 phút mỗi lần có người hỏi, bạn vẽ một DFD treo trong tài liệu dự án:

```
(nguồn ngoài)        [tiến trình]           ((kho dữ liệu))

(Server/Firewall) →→ [P1 Thu thập log] →→ ((D1 Log thô))
                                              ↓
                     [P2 Phân tích & đối chiếu ngưỡng]
                          ↓ vượt ngưỡng
                     ((D2 Bảng cảnh báo alerts))
                          ↓
                     [P3 Gửi thông báo] →→ (Email/SMS người trực)
                          ↘ ghi nhận đã gửi →→ ((D3 Log gửi tin))
```

Sơ đồ lộ ra ngay một câu hỏi thiết kế mà văn xuôi che mất: P3 đọc từ D2 theo kiểu nào — quét định kỳ hay được P2 gọi trực tiếp? (Ảnh hưởng độ trễ cảnh báo — đúng loại câu hỏi BA cần đẩy cho kiến trúc sư trả lời **trước** khi code.)

**Vì sao là mức ①:** vẽ đúng và đủ cho một luồng đơn; chưa xử lý hệ thống nhiều nguồn, nhiều tầng và phân rã nhiều mức.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** vẽ DFD cho **hệ thống nhiều nguồn dữ liệu, nhiều tầng xử lý**, biết phân rã theo mức (level 0 tổng thể → level 1 chi tiết) và dùng DFD để soi vấn đề an toàn dữ liệu.

**Tình huống thực tế — DFD toàn hệ thống phục vụ rà soát dữ liệu nhạy cảm.** Trước đợt đánh giá an ninh nội bộ, khách hàng cần trả lời: "log chứa thông tin nhạy cảm đi qua những đâu, ai chạm được?" Bạn vẽ DFD 2 mức:

```
LEVEL 0 (bức tranh tổng):
(3 nguồn log: server / firewall / ứng dụng)
   →→ [Tầng chuẩn hoá] →→ [Tầng tương quan] →→ ((Kho sự cố))
                ↓                                   ↓
        ((Kho log gốc — CÓ dữ liệu nhạy cảm))   [Tầng hiển thị & cảnh báo]
                                                    →→ (Người dùng theo vai)

LEVEL 1 — phân rã [Tầng chuẩn hoá] (nơi quyết định độ nhạy cảm):
  [P1.1 Bóc tách trường] → [P1.2 ĐÁNH DẤU nhạy cảm: tên đăng nhập,
  IP nội bộ, nội dung gói tin] → rẽ 2 nhánh:
     - bản ĐẦY ĐỦ   →→ ((Kho log gốc)) — chỉ vai An ninh đọc
     - bản ĐÃ CHE   →→ ((Kho phân tích)) — các vai khác dùng
```

Chính khi vẽ nhánh rẽ ở P1.2, cả phòng họp phát hiện lỗ hổng: **tầng tương quan đang đọc từ kho log gốc** (bản đầy đủ) thay vì kho đã che — nghĩa là một bug ở tầng đó có thể rò dữ liệu nhạy cảm ra màn hình chung. Dev sửa hướng đọc trước khi audit, thay vì bị audit phát hiện.

**Vì sao là mức ②:** thiết kế DFD nhiều tầng có phân rã mức, và dùng nó như công cụ phát hiện rủi ro dữ liệu thật — không chỉ vẽ một luồng đơn để minh hoạ.
