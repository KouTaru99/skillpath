# Kiến thức UX & định hướng UX sản phẩm

**Định nghĩa.** **UX** (User Experience — trải nghiệm người dùng) là trải nghiệm tổng thể khi tương tác với sản phẩm: dễ hiểu không, mấy bước xong việc, lúc gấp có thao tác nổi không. Senior BA cần hiểu khái niệm/phương pháp UX và biết **đứng ở vai người dùng thật để trải nghiệm sản phẩm** — vì "đúng yêu cầu trong tài liệu" và "dùng được trong đời thật" là hai chuyện khác nhau. BA không thay được designer, nhưng là người **mang bối cảnh sử dụng thật** (ai dùng, lúc nào, đang căng thẳng cỡ nào) vào thiết kế.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Hiểu các khái niệm UX cơ bản và biết soi sản phẩm từ vai người dùng thật — bắt được vấn đề trải nghiệm mà việc "kiểm tra đúng tài liệu" bỏ sót.

**Tình huống thực tế — review màn hình bằng "kịch bản 2 giờ sáng".** Màn "Danh sách cảnh báo" đã code xong, đúng 100% tài liệu. Trước khi duyệt, bạn tự đặt mình vào kịch bản dùng thật căng nhất — trực ca đêm bị chuông dựng dậy:

```
KỊCH BẢN: 2h sáng, 1 người trực, điện thoại reo vì cảnh báo Cao.
Người này mở màn hình lên và cần trả lời trong 10 giây:
"CÁI GÌ đang bị tấn công, NẶNG cỡ nào, có THẬT không?"

SOI THEO KỊCH BẢN → 3 vấn đề tài liệu không bắt được:
  1. Cột "mức độ" nằm thứ 5 từ trái — mắt phải quét ngang mới thấy
     dòng nào Cao. Lúc gấp, đó là 5 giây bị lãng phí.
     → Đề xuất: mức độ là cột ĐẦU + tô màu cả dòng.
  2. Cảnh báo mới không nổi bật hơn cảnh báo cũ đã xem
     → Đề xuất: dòng chưa xem in đậm (như hộp thư email).
  3. Nút "Đánh dấu đã xử lý" và "Bỏ qua" nằm sát nhau, cùng màu
     → nguy cơ bấm nhầm "Bỏ qua" một cảnh báo thật lúc ngái ngủ.
     → Đề xuất: tách xa + "Bỏ qua" cần xác nhận thêm 1 bước.
```

Cả 3 đề xuất được chấp nhận với tổng chi phí sửa chưa tới 1 ngày công — vì bắt ở giai đoạn review, chưa go-live.

**Vì sao là mức ①:** dùng được góc nhìn người dùng thật để bắt vấn đề trải nghiệm từng màn hình; chưa đặt ra định hướng UX chung cho cả tính năng/sản phẩm.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** **định hướng UX cho cả một luồng/tính năng** — đặt ra nguyên tắc mà mọi màn hình liên quan phải theo, thay vì góp ý từng điểm rời rạc.

**Tình huống thực tế — đặt nguyên tắc UX cho toàn luồng "Xử lý sự cố khẩn cấp".** Luồng này trải qua 5 màn hình do 2 Dev khác nhau làm — nếu không có định hướng chung, mỗi màn một kiểu. Bạn viết một trang nguyên tắc trước khi ai code:

```
NGUYÊN TẮC UX — Luồng xử lý sự cố khẩn cấp (áp cho cả 5 màn)

BỐI CẢNH NGƯỜI DÙNG  Đang căng thẳng, có thể 1 mình, cần tốc độ.
                      Thiết kế cho "não đang hoảng", không phải não thong thả.

N1. TỐI GIẢN BƯỚC     Từ nhận cảnh báo → hành động đầu tiên: tối đa 2 chạm.
                      Mọi bước thêm phải trả lời được "bỏ bước này thì sao?"
N2. MÀU NHẤT QUÁN     Đỏ = Cao, cam = Trung bình, xám = Thấp — Ở MỌI MÀN.
                      Cấm dùng đỏ cho việc khác (nút xoá dùng viền, không nền đỏ).
N3. HÀNH ĐỘNG CHÍNH   Mỗi màn đúng 1 nút to nhất ở góc phải dưới =
                      bước tiếp theo hợp lý nhất. Người hoảng bấm nút to.
N4. KHÔNG MẤT DỮ LIỆU Ghi chú đang gõ dở phải tự lưu nháp — người trực có
                      thể bị gọi đi giữa chừng bất cứ lúc nào.
N5. ĐƯỜNG LUI RÕ      Mọi hành động nguy hiểm (chặn IP, khoá tài khoản)
                      hiện rõ "có thể hoàn tác trong X phút" hoặc cảnh báo
                      "KHÔNG hoàn tác được".
```

Khi Dev A hỏi "popup xác nhận chặn IP nên có mấy nút?", câu trả lời tra được từ N3 + N5 mà không cần hỏi bạn — đó là dấu hiệu định hướng đủ tốt: **nó ra quyết định thay bạn khi bạn vắng mặt**.

**Vì sao là mức ②:** đặt được nguyên tắc UX cấp luồng/tính năng gắn với bối cảnh người dùng thật, cả team thiết kế và Dev dùng chung — không chỉ góp ý từng chi tiết riêng lẻ.
