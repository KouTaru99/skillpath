# Đảm bảo yêu cầu phi chức năng hệ thống (NFR)

**Định nghĩa.** **NFR** (Non-Functional Requirements) là các yêu cầu về **cách hệ thống vận hành**, khác với yêu cầu nghiệp vụ (hệ thống *làm gì*): Scalability (chịu tải tăng), Security (an toàn), Adaptability (dễ thích nghi thay đổi), Compatibility (tương thích), Manageability (dễ vận hành/giám sát), Availability (luôn sẵn sàng). Một tính năng "đúng chức năng" vẫn có thể thất bại nếu không đạt NFR — ví dụ tìm kiếm ra đúng kết quả nhưng mất 10 giây thì vẫn coi là hỏng.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Xác định và viết ra được yêu cầu NFR **cụ thể, đo được** cho một tính năng/module, thay vì chỉ nói chung chung "phải nhanh, phải an toàn".

**Ví dụ thực tế — viết NFR cụ thể cho tính năng tìm kiếm sản phẩm, thay vì mô tả mơ hồ.**
```
❌ Mơ hồ: "Tìm kiếm phải nhanh và ổn định."

✅ Cụ thể, đo được:
- Performance: p95 thời gian phản hồi < 500ms với tập dữ liệu 1 triệu sản phẩm.
- Scalability: chịu được 200 request/giây đồng thời mà không tăng latency quá 20%.
- Availability: nếu service tìm kiếm lỗi, trang vẫn tải được (không sập cả trang),
  hiển thị thông báo "Tìm kiếm tạm thời không khả dụng" thay vì màn trắng.
```
Yêu cầu đo được giúp team biết CHÍNH XÁC khi nào tính năng "đạt" — không tranh cãi cảm tính "nhanh" là bao nhiêu; và đội kiểm thử có tiêu chí rõ để test (load test đạt 200 req/s hay chưa).

**Vì sao là mức ①:** bạn viết được NFR cụ thể, đo được cho một tính năng — chưa tự chịu trách nhiệm đảm bảo NFR cho cả một hệ thống lớn nhiều tính năng liên quan.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** chịu trách nhiệm đảm bảo NFR cho **cả một hệ thống** (nhiều tính năng liên quan tới nhau), xử lý khi NFR của các tính năng khác nhau **mâu thuẫn nhau**.

**Ví dụ thực tế — NFR của 2 tính năng mâu thuẫn nhau, phải cân bằng.** Tính năng "Lịch sử giao dịch" cần NFR Compatibility cao (giữ đầy đủ dữ liệu cũ, không xoá gì, phục vụ đối soát/kiểm toán). Tính năng "Tìm kiếm nhanh" cần NFR Performance cao (query phải nhanh, dữ liệu càng gọn càng tốt). Hai yêu cầu này kéo hệ thống về hai hướng khác nhau — càng giữ nhiều dữ liệu lịch sử, tìm kiếm càng chậm dần. Bạn cân bằng bằng cách tách trách nhiệm:
```
- Dữ liệu đầy đủ (phục vụ Compatibility) lưu ở kho lưu trữ riêng, không tối ưu tốc độ.
- Dữ liệu phục vụ tìm kiếm (phục vụ Performance) chỉ giữ bản tóm tắt gần đây,
  đồng bộ định kỳ từ kho đầy đủ.
```
Bạn không chọn một NFR và hy sinh NFR còn lại — mà thiết kế để cả hai cùng đạt được, mỗi phần dữ liệu phục vụ đúng mục đích của nó.

**Vì sao là mức ②:** bạn cân bằng được NFR mâu thuẫn giữa nhiều tính năng trong cùng một hệ thống — không chỉ đảm bảo NFR cho một tính năng đơn lẻ.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** đặt ra được **bộ chuẩn NFR mặc định cho mọi hệ thống mới** của đơn vị (không chỉ cân bằng NFR trong một hệ thống cụ thể) — để không hệ thống nào "quên" NFR quan trọng ngay từ đầu.

**Ví dụ thực tế — bộ chuẩn NFR tối thiểu bắt buộc cho mọi hệ thống mới, không cần bàn lại từ đầu mỗi lần.**
```
Chuẩn NFR tối thiểu (mọi hệ thống mới của đơn vị phải đạt trước khi ra mắt):
- Availability: 99.5% (tối đa ~3.6 giờ downtime/tháng), có kế hoạch backup rõ ràng.
- Security: qua review bảo mật cơ bản (theo checklist đã có), không lộ secret,
  kiểm quyền ở backend (không chỉ ẩn UI).
- Manageability: có log có cấu trúc + tích hợp APM, có ít nhất 1 dashboard giám sát.

Hệ thống có nhu cầu đặc biệt (ví dụ Availability 99.99% cho hệ thống thanh toán)
thì NÂNG chuẩn lên, không bao giờ THẤP hơn mức tối thiểu này.
```
Nhờ có chuẩn tối thiểu này, đội phát triển hệ thống mới không phải tự nghĩ lại "hệ thống này cần NFR gì" từ đầu — họ bắt đầu từ chuẩn chung rồi điều chỉnh theo đặc thù, thay vì có nguy cơ bỏ sót một khía cạnh quan trọng.

**Vì sao là mức ④:** bạn đặt ra được chuẩn NFR nền tảng cho toàn đơn vị — mức cao nhất, đảm bảo yêu cầu phi chức năng không phụ thuộc vào việc từng đội có nhớ nghĩ tới hay không.
