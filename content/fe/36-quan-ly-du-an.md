# Quản lý dự án

**Định nghĩa.** Quản lý một dự án phần mềm trọn vẹn — không chỉ phần kỹ thuật mà cả phạm vi công việc, tiến độ, rủi ro, và giao tiếp với các bên liên quan (stakeholder). Khác [Phân task](/fe/ky-nang/27-phan-task) (chẻ việc kỹ thuật trong một tính năng): đây là quản lý cả **vòng đời dự án**.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Quản lý được một dự án/module quy mô vừa phải (vài người, vài tuần) — theo dõi tiến độ, phát hiện rủi ro trễ hẹn sớm, báo cáo rõ ràng cho stakeholder.

**Ví dụ thực tế — phát hiện dự án có nguy cơ trễ tiến độ, báo cáo sớm kèm phương án thay vì im lặng chờ đến hạn.**
```
Tuần 1/4: đúng kế hoạch (5/5 task đã lên kế hoạch cho tuần này xong)
Tuần 2/4: chậm (3/6 task xong) — nguyên nhân: API bên thứ 3 (cổng thanh toán)
          trả tài liệu không khớp thực tế, team mất 2 ngày dò lại

Báo cáo gửi stakeholder ngay cuối tuần 2 (KHÔNG đợi tới tuần 4 mới báo):
"Dự án đang chậm ~2 ngày do vướng tích hợp thanh toán ngoài kế hoạch.
 Đề xuất: (a) tăng 1 người hỗ trợ tích hợp thanh toán trong tuần 3, hoặc
 (b) lùi ngày ra mắt 3 ngày. Team nghiêng về phương án (a) để giữ deadline."
```
Bạn báo rủi ro **ngay khi phát hiện**, kèm phương án cụ thể để stakeholder ra quyết định — thay vì để tới sát hạn mới báo "chậm rồi", khi đó không còn phương án nào kịp xử lý.

**Vì sao là mức ①:** bạn quản lý tốt một dự án quy mô vừa, chủ động báo cáo rủi ro sớm — chưa tự quản lý được dự án quy mô lớn nhiều bên liên quan phức tạp.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** quản lý được dự án có **nhiều bên liên quan với lợi ích khác nhau** (khách hàng, đối tác, nhiều team nội bộ), không chỉ một team kỹ thuật.

**Ví dụ thực tế — quản lý dự án có khách hàng bên ngoài với yêu cầu thay đổi giữa chừng.** Dự án đang chạy đúng tiến độ thì khách hàng yêu cầu thêm một tính năng ngoài phạm vi ban đầu (scope creep). Bạn xử lý bằng cách tách rõ ràng thay vì âm thầm nhận thêm việc:
```
- Ghi nhận yêu cầu mới là THAY ĐỔI PHẠM VI (không phải "thêm việc nhỏ miễn phí").
- Trình bày rõ với khách hàng: tính năng mới cần thêm 2 tuần + chi phí X,
  hoặc đánh đổi bằng cách bớt 1 tính năng khác trong phạm vi ban đầu.
- Khách hàng chọn phương án, ký xác nhận thay đổi phạm vi trước khi team bắt đầu làm.
```
Bạn bảo vệ được tiến độ/ngân sách dự án bằng cách minh bạch hoá thay đổi phạm vi ngay khi nó xuất hiện — không để nó âm thầm ăn vào thời gian dự phòng rồi mới phát hiện trễ hẹn.

**Vì sao là mức ②:** bạn quản lý được xung đột lợi ích giữa nhiều bên liên quan, không chỉ theo dõi tiến độ nội bộ team kỹ thuật.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** quản lý được **nhiều dự án độc lập cùng lúc** (danh mục dự án), phân bổ nguồn lực giữa các dự án — không chỉ một dự án đơn lẻ dù có nhiều bên liên quan.

**Ví dụ thực tế — phân bổ 8 người cho 3 dự án đang chạy song song, ưu tiên khi có xung đột nguồn lực.**
```
Dự án A (khách hàng lớn, deadline gần): cần 4 người, đang có 3 → thiếu 1
Dự án B (nội bộ, deadline linh hoạt): đang có 3 người, đủ dùng, còn dư năng lực
Dự án C (mới ký, chưa bắt đầu code): cần chuẩn bị nhân sự trong 2 tuần tới

Quyết định: tạm chuyển 1 người từ dự án B (ít gấp hơn) sang hỗ trợ dự án A
trong 3 tuần tới đúng giai đoạn cao điểm; dự án C bắt đầu tuyển/luân chuyển
nhân sự sớm thay vì đợi tới ngày bắt đầu mới tìm người.
```
Bạn nhìn toàn bộ danh mục dự án đang chạy để ra quyết định phân bổ, không chỉ tối ưu cho một dự án đang quản lý — đôi khi phải "hy sinh" một chút tốc độ ở dự án ít gấp hơn để cứu deadline dự án quan trọng hơn.

**Vì sao là mức ④:** bạn quản lý được ở tầm danh mục nhiều dự án, cân đối nguồn lực chung — mức cao nhất của kỹ năng quản lý dự án trong thang này.
