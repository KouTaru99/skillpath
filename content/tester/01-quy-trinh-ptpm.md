# Quy trình phát triển phần mềm (Agile/Scrum)

**Định nghĩa.** **Agile** là triết lý phát triển phần mềm theo từng đợt ngắn (**sprint**), làm xong một phần nhỏ thì demo và điều chỉnh ngay, thay vì làm xong hết mới cho xem. **Scrum** là khuôn khổ (framework) phổ biến nhất để áp dụng Agile: sprint 1-2 tuần, có *daily* (đồng bộ tiến độ), *planning* (lên kế hoạch sprint), *review/demo* (cho xem kết quả), *retro* (rút kinh nghiệm). Với Tester, hiểu quy trình này quyết định **khi nào kiểm thử cái gì** — không phải đợi hết dự án mới test, và tiếng nói chất lượng phải có mặt ngay từ planning chứ không phải cuối sprint.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Biết dự án đang ở sprint nào, tham gia daily báo cáo tiến độ test của mình, hiểu **user story** (mô tả yêu cầu từ góc người dùng) và **acceptance criteria** (tiêu chí chấp nhận) là thứ mình đối chiếu khi test.

**Tình huống thực tế — tuần đầu vào dự án hệ thống giám sát an ninh mạng nội bộ.** Sprint 2 tuần, bạn được giao test tính năng "Cảnh báo đăng nhập bất thường". Việc đầu tiên không phải là bấm loạn lên màn hình — mà là đọc user story:

```
USER STORY US-042
  Là quản trị viên an ninh, tôi muốn nhận cảnh báo khi có đăng nhập
  bất thường, để phát hiện sớm tấn công dò mật khẩu.

ACCEPTANCE CRITERIA (đây là "đề bài" của Tester):
  AC1. 5 lần đăng nhập sai liên tiếp cùng 1 IP → sinh cảnh báo ≤5 giây
  AC2. Cảnh báo hiển thị: IP, tài khoản bị thử, số lần, thời điểm
  AC3. Đăng nhập thành công → reset bộ đếm

CÁCH BẠN DÙNG NÓ TRONG NHỊP SCRUM:
  - Daily: "Em test xong AC1-AC2, AC3 đang chờ dev fix bug #113"
    (báo theo AC — cả team hiểu ngay còn thiếu gì)
  - Sprint review: demo đúng theo 3 AC — khách nghiệm dựa trên đó
```

Điều Junior hay nhầm mà bạn tránh được: AC là **ranh giới cam kết của sprint** — thấy thiếu sót ngoài AC (ví dụ "nên có thêm SMS") thì ghi nhận đề xuất cho sprint sau, không tự ý coi là bug làm vỡ tiến độ.

**Vì sao là mức ①:** đọc và bám đúng quy trình + tài liệu có sẵn, báo cáo đúng nhịp; chưa cần tự quản lý rủi ro tiến độ kiểm thử.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** nắm quy trình đủ vững để **chủ động lên kế hoạch test khớp nhịp sprint** — ước lượng được việc test có kịp không, báo sớm khi rủi ro, và dùng đúng các "nghi lễ" Scrum làm đòn bẩy cho chất lượng.

**Tình huống thực tế — phát hiện rủi ro "dồn test cuối sprint" từ giữa sprint.** Sprint có 3 tính năng: cảnh báo bất thường, dashboard thống kê, export báo cáo PDF. Ngày thứ 4 của sprint 10 ngày, nhìn board bạn thấy mùi rủi ro:

```
BOARD NGÀY 4/10:
  Cảnh báo bất thường   [Code xong] → bạn đang test ✓
  Dashboard thống kê    [Đang code — dự kiến xong ngày 7]
  Export báo cáo PDF    [Chưa bắt đầu — dev kẹt, dự kiến ngày 8-9]

TÍNH NHANH CỦA BẠN:
  PDF xong ngày 9 → bạn còn 1 ngày test một tính năng đụng dữ liệu
  nhạy cảm (báo cáo chứa log an ninh) + 3 định dạng trang in.
  Kinh nghiệm: export + phân quyền dữ liệu cần tối thiểu 2 ngày.

BẠN NÓI GÌ Ở DAILY NGÀY 4 (không đợi ngày 9):
  "Theo tiến độ này, export PDF chỉ còn 1 ngày để test — không đủ
   cho tính năng chạm dữ liệu nhạy cảm. Đề xuất 1 trong 2: đẩy PDF
   code trước dashboard, hoặc dời PDF sang sprint sau ngay bây giờ
   để planning sau còn chủ động."
```

Scrum Master đảo thứ tự code — PDF xong ngày 6, test đủ 2.5 ngày, phát hiện 1 bug phân quyền thật (user thường export được báo cáo chứa log mức Cao). Nếu im lặng tới ngày 9, bug đó go-live.

**Vì sao là mức ②:** dùng hiểu biết quy trình để quản trị rủi ro tiến độ-chất lượng một cách chủ động — tiếng nói của Tester có mặt lúc còn xoay được, không phải lúc chỉ còn cách chấp nhận.
