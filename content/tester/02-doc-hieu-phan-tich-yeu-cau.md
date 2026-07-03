# Đọc hiểu, phân tích & phản biện yêu cầu nghiệp vụ

**Định nghĩa.** Trước khi viết được một kịch bản kiểm thử tốt, Tester phải đọc hiểu đúng **tài liệu yêu cầu nghiệp vụ** (spec, user story, tài liệu giải pháp) — chức năng để làm gì, ai dùng, ràng buộc nào áp dụng. Ở mức cao hơn, Tester không chỉ đọc mà còn **phản biện**: chỉ ra chỗ mơ hồ, case bị bỏ sót, mâu thuẫn logic **trước khi** bắt tay viết test. Lý do nghề nghiệp sâu xa: bug rẻ nhất là bug bị giết từ trong tài liệu — Tester giỏi diệt lỗi trước cả khi nó được code ra.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đọc hiểu đúng tài liệu một chức năng đơn lẻ — nói lại được chức năng làm gì, input/output là gì, và tự dựng "bản đồ hiểu" để không sót ý.

**Tình huống thực tế — đọc spec "Xem danh sách cảnh báo" và tóm tắt kiểm chứng lại.** Thay vì đọc trôi rồi nhớ mang máng, bạn tóm tắt theo khung 4 câu hỏi và gửi lại BA xác nhận mình hiểu đúng:

```
BẢN TÓM TẮT HIỂU (gửi BA confirm trước khi viết test case)

  LÀM GÌ?     Hiển thị danh sách cảnh báo, mới nhất trên cùng
  AI DÙNG?    Quản trị viên an ninh (full) + tài khoản chỉ-xem
              (không có nút "Đánh dấu đã xử lý")
  DỮ LIỆU?    Mỗi dòng: mức độ (Thấp/TB/Cao), IP nguồn, loại
              tấn công, thời điểm; phân trang 50 dòng
  RÀNG BUỘC?  Lọc theo mức độ + khoảng thời gian; không có xoá
              (dữ liệu cảnh báo phải lưu vết)

  ❓ 2 chỗ em đọc chưa chắc: (1) "mới nhất" theo giờ phát hiện
  hay giờ ghi nhận vào hệ thống? (2) tài khoản chỉ-xem có thấy
  bộ lọc không?
```

Hai dấu ❓ đó là dấu hiệu Junior tốt: **biết mình chưa hiểu chỗ nào** và hỏi trước, thay vì test theo phỏng đoán.

**Vì sao là mức ①:** đọc hiểu chính xác và biết tự kiểm chứng cách hiểu; chưa cần phát hiện lỗi logic nằm sâu trong tài liệu.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** **phân tích và phản biện đặc tả** — soi ra case bỏ sót, định nghĩa mơ hồ và mâu thuẫn giữa các phần của tài liệu; câu hỏi của bạn làm tài liệu tốt lên trước khi dòng code đầu tiên được viết.

**Tình huống thực tế 1 — mổ xẻ spec "Cảnh báo đăng nhập bất thường" trước buổi refinement.** Spec ghi một câu: "5 lần đăng nhập sai liên tiếp từ cùng 1 IP thì cảnh báo". Bạn đọc bằng con mắt "kẻ tấn công sẽ lách thế nào":

```
CÂU HỎI PHẢN BIỆN GỬI BA (trước khi viết test):
  1. 5 lần sai từ CÙNG IP — vậy kẻ tấn công đổi IP mỗi 4 lần thử
     (dò phân tán) thì KHÔNG BAO GIỜ bị cảnh báo? Có cần thêm
     ngưỡng theo TÀI KHOẢN (nhiều IP cùng thử 1 tài khoản)?
  2. "Liên tiếp" = trong bao lâu? Sai 3 lần hôm nay + 2 lần tuần
     sau có tính không? (spec thiếu cửa sổ thời gian)
  3. Đăng nhập sai lần 5 rồi ĐÚNG ở lần 6 — cảnh báo đã sinh có
     tự đóng không, hay người trực vẫn phải xử lý?
```

Câu 1 làm BA sửa hẳn thiết kế (thêm ngưỡng theo tài khoản) — một lỗ hổng phát hiện bằng việc *đọc*, chi phí bằng 0, so với việc phát hiện sau go-live khi bị tấn công thật.

**Tình huống thực tế 2 — bắt mâu thuẫn giữa 2 mục trong cùng tài liệu.** Mục 3.2 ghi "cảnh báo mức Cao gửi email + SMS", mục 5.1 (bảng phân quyền) lại ghi "chỉ trưởng ca nhận SMS". Vậy cảnh báo Cao lúc trưởng ca nghỉ phép thì SMS đi đâu? Bạn ghi nhận thành câu hỏi chặn (blocker) — vì hai đội dev khác nhau đang code 2 mục này, mỗi đội theo một câu, và họ sẽ chỉ phát hiện vênh nhau khi tích hợp.

**Vì sao là mức ②:** phản biện có hệ thống (góc kẻ tấn công, cửa sổ thời gian, vòng đời trạng thái, đối chiếu chéo các mục) — biến việc đọc tài liệu thành lớp kiểm thử sớm nhất và rẻ nhất.
