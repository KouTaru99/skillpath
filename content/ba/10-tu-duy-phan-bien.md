# Tư duy phản biện

**Định nghĩa.** Khả năng **không chấp nhận yêu cầu ở giá trị bề mặt** — luôn hỏi "tại sao cần cái này", "có cách nào tốt hơn không", "điều gì xảy ra nếu giả định này sai" trước khi ghi nhận yêu cầu là đúng. Với BA, phản biện không phải là cãi — mà là **bảo vệ dự án khỏi việc làm đúng một yêu cầu sai**: code đúng 100% một yêu cầu vô lý vẫn là lãng phí 100%.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nhận ra điểm chưa hợp lý trong một yêu cầu cụ thể và đặt câu hỏi làm rõ có căn cứ — thay vì lẳng lặng ghi nhận.

**Tình huống thực tế — phản biện yêu cầu "khoá tài khoản vĩnh viễn sau 3 lần sai".** Khách hàng (đội An ninh) yêu cầu vậy vì vừa trải qua một đợt dò mật khẩu. Bạn không gật ngay mà phân tích hai mặt:

```
YÊU CẦU GỐC: sai mật khẩu 3 lần → khoá VĨNH VIỄN

BẠN PHẢN BIỆN BẰNG 2 KỊCH BẢN:
  Kịch bản A (điều khách nghĩ tới): kẻ tấn công dò mật khẩu
    → khoá vĩnh viễn chặn được. ✓
  Kịch bản B (điều khách chưa nghĩ tới): nhân viên gõ nhầm sau
    kỳ nghỉ lễ — cả phòng 30 người bị khoá vĩnh viễn sáng thứ 2,
    quản trị viên mở khoá tay từng người. ✗
  Kịch bản C (tệ nhất): kẻ tấn công CỐ TÌNH nhập sai 3 lần cho
    toàn bộ danh sách tài khoản → tự tay khoá cả công ty. ✗✗

ĐỀ XUẤT THAY THẾ: khoá tạm 15 phút, tăng dần nếu tái diễn;
chỉ báo động (không tự khoá vĩnh viễn) khi nhiều IP cùng dò 1 tài khoản.
```

Kịch bản C là đòn quyết định — chính tính năng "bảo vệ" trở thành vũ khí tấn công từ chối dịch vụ. Khách hàng đổi yêu cầu ngay.

**Vì sao là mức ①:** phản biện sắc cho một yêu cầu cụ thể bằng kịch bản và logic rõ; phạm vi vẫn là từng yêu cầu đơn lẻ.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** phản biện được ở **tầng giả định của cả bài toán** — soi ra chỗ mà toàn bộ nhóm yêu cầu đang đứng trên một giả định chưa kiểm chứng, không chỉ bắt lỗi từng yêu cầu lẻ.

**Tình huống thực tế — cả cụm yêu cầu đứng trên một giả định sai.** Khách hàng gửi 6 yêu cầu về màn hình dashboard: thêm biểu đồ xu hướng, thêm bộ đếm, thêm bản đồ IP... Từng cái đều hợp lý. Nhưng bạn lùi một bước và soi giả định chung:

```
6 YÊU CẦU ĐỀU GIẢ ĐỊNH: "trực ca NHÌN dashboard thường xuyên
→ thêm thông tin lên dashboard = phát hiện nhanh hơn"

BẠN KIỂM CHỨNG GIẢ ĐỊNH (hỏi 4 người trực ca + xem log đăng nhập):
  - Ca ngày: mở dashboard ~lúc giao ca, sau đó làm việc khác,
    quay lại khi CÓ CHUÔNG cảnh báo.
  - Ca đêm: 1 người trực nhiều hệ thống, gần như không nhìn màn.
  → Giả định SAI: dashboard không phải nơi phát hiện — CHUÔNG mới là.

PHẢN BIỆN TRÌNH KHÁCH:
  "6 yêu cầu này làm dashboard đẹp hơn nhưng không rút ngắn thời
   gian phát hiện — vì không ai nhìn nó liên tục. Nếu mục tiêu là
   phát hiện nhanh (như anh nói buổi trước), ưu tiên đúng phải là
   chất lượng CẢNH BÁO CHỦ ĐỘNG: giảm cảnh báo giả đang chiếm 70%
   khiến mọi người nhờn chuông. Em đề xuất đổi 6 yêu cầu này lấy
   1 yêu cầu: bộ quy tắc lọc cảnh báo giả."
```

Khách hàng im lặng 5 giây rồi đồng ý — vì bạn phản biện bằng **dữ liệu hành vi thật** (log đăng nhập, phỏng vấn ca trực), không phải bằng quan điểm cá nhân.

**Vì sao là mức ②:** phản biện ở tầng giả định của cả cụm yêu cầu, có kiểm chứng bằng dữ liệu — thay đổi được hướng đầu tư của khách hàng, không chỉ chỉnh từng yêu cầu lẻ.
