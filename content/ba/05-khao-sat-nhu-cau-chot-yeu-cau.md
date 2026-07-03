# Khảo sát nhu cầu & chốt thống nhất yêu cầu với khách hàng

**Định nghĩa.** Trước khi viết PTYC, BA phải **khảo sát đúng nhu cầu thật** của khách hàng (thường khác với điều họ nói ban đầu), rồi **chốt thống nhất bằng văn bản** để tránh tranh cãi "tôi không yêu cầu vậy" về sau. Hai kỹ thuật lõi: đặt câu hỏi mở để đào nhu cầu gốc ("anh cần nó để giải quyết việc gì?"), và xác nhận lại bằng văn bản có chữ ký/email đồng ý — lời nói trong họp không phải là cam kết.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Khảo sát nhu cầu cho 1 yêu cầu cụ thể: biết hỏi đào sâu thay vì ghi nguyên văn, và xác nhận lại bằng văn bản trước khi viết PTYC.

**Tình huống thực tế — từ "muốn xem lịch sử cảnh báo" đến yêu cầu chốt được.** Đội An ninh mạng nói một câu: "muốn xem được lịch sử cảnh báo". Bạn không ghi nguyên văn rồi đi viết PTYC, mà hỏi đào:

```
HỎI ĐÀO NHU CẦU GỐC
  "Anh cần xem lịch sử để làm gì?"   → "Điều tra sự cố: khi phát hiện máy
                                        nhiễm mã độc, cần tra ngược xem IP
                                        đó từng bị cảnh báo gì 3 tháng qua."
HỎI CHỐT PHẠM VI
  Xem lùi bao lâu?                   → 12 tháng (quy định lưu vết nội bộ)
  Cần lọc theo gì?                   → theo IP là chính, thêm loại tấn công
  Có cần export không?               → Có — đính kèm báo cáo điều tra

EMAIL XÁC NHẬN (gửi ngay sau buổi trao đổi)
  "Em tóm tắt yêu cầu đã thống nhất sáng nay: tra cứu cảnh báo theo IP
   trong 12 tháng, lọc theo loại tấn công, export Excel. Ngoài phạm vi:
   chưa làm tìm kiếm toàn văn trong log. Anh xác nhận giúp em trước thứ 5."
```

Câu hỏi "để làm gì" đổi hẳn thiết kế: nhu cầu thật là **tra ngược theo IP phục vụ điều tra**, không phải "xem danh sách cũ" — màn hình đúng phải là ô tìm kiếm IP, không phải bảng phân trang 10.000 dòng.

**Vì sao là mức ①:** khảo sát và chốt được yêu cầu với 1 nhóm khách hàng cho 1 tính năng cụ thể; chưa phải dàn xếp nhiều bên có kỳ vọng xung đột.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** khảo sát và chốt yêu cầu cho **tính năng lớn có nhiều bên liên quan** (stakeholder) với kỳ vọng khác nhau — biết tách vòng khảo sát, tổng hợp mâu thuẫn và đưa các bên về một phương án chốt.

**Tình huống thực tế — chốt yêu cầu "Phân quyền xem cảnh báo theo phòng ban" giữa 3 bên.** Tính năng đụng tới đội An ninh mạng, đội IT hạ tầng và ban lãnh đạo — khảo sát chung 1 buổi sẽ thành cãi nhau. Bạn tách 3 vòng phỏng vấn riêng rồi tổng hợp:

```
BẢNG TỔNG HỢP KỲ VỌNG (gửi cả 3 bên trước buổi chốt)

  Bên          | Muốn gì                        | Lo ngại gì
  -------------|--------------------------------|---------------------------
  An ninh mạng | Thấy TOÀN BỘ cảnh báo mọi      | Phân quyền chặt quá làm
               | phòng ban (để tương quan)      | chậm điều tra
  IT hạ tầng   | Chỉ thấy cảnh báo server do    | Không muốn chịu trách nhiệm
               | mình quản                      | cảnh báo ngoài phạm vi
  Lãnh đạo     | Chỉ số tổng hợp, KHÔNG cần     | Sợ dữ liệu nhạy cảm lộ
               | chi tiết log                   | ra ngoài đội chuyên trách

  ĐIỂM CHUNG   Ai cũng đồng ý: log chi tiết chỉ đội An ninh xem.
  ĐIỂM VÊNH    IT muốn "chỉ của mình" vs An ninh muốn "thấy tất cả".

  PHƯƠNG ÁN ĐỀ XUẤT ĐỂ CHỐT
  3 vai: An ninh = thấy tất cả · IT = cảnh báo thuộc nhóm tài sản mình
  quản · Lãnh đạo = dashboard tổng hợp không log. Buổi chốt chỉ còn
  quyết 1 câu: nhóm tài sản do ai gán? → chốt: đội An ninh gán.
```

Nhờ tách vòng + tổng hợp trước, buổi chốt chung chỉ mất 45 phút thay vì 3 tiếng tranh cãi, và biên bản chốt có đủ 3 chữ ký.

**Vì sao là mức ②:** xử lý được khảo sát nhiều bên có kỳ vọng mâu thuẫn — biết cấu trúc quá trình (tách vòng → tổng hợp → đề xuất → chốt), không chỉ nghe 1 khách hàng đơn lẻ rồi ghi lại.
