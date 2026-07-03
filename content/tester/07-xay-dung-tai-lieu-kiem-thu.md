# Xây dựng tài liệu kiểm thử

**Định nghĩa.** Tài liệu kiểm thử gồm 2 tầng: **thiết kế kiểm thử** (test design — chiến lược: test cái gì, kỹ thuật nào, phạm vi tới đâu) và **kịch bản kiểm thử** (test case/script — chi tiết từng bước, dữ liệu, kết quả mong đợi). Tài liệu tốt phục vụ 3 mục đích: (1) người khác chạy lại được đúng như bạn, (2) không sót case quan trọng, (3) làm bằng chứng khi báo cáo/nghiệm thu/audit. Với sản phẩm an ninh, tài liệu test còn là hồ sơ chứng minh "đã kiểm chứng đủ" khi có sự cố.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Viết kịch bản kiểm thử cho một chức năng đơn lẻ theo mẫu của team — đủ rõ để người khác chạy lại y hệt.

**Tình huống thực tế — kịch bản test "Xem chi tiết một cảnh báo".** Bạn viết theo mẫu bảng chuẩn, chú trọng "kết quả mong đợi" đủ cụ thể để không ai chạy ra kết quả mơ hồ:

```
KỊCH BẢN TC-DETAIL-01 · Xem chi tiết cảnh báo
Điều kiện đầu: đã đăng nhập vai quản trị an ninh; có ≥1 cảnh báo

  Bước | Thao tác                     | Kết quả mong đợi
  -----|------------------------------|---------------------------------
   1   | Vào danh sách, bấm 1 dòng    | Mở màn chi tiết trong ≤2 giây
   2   | Kiểm tra thông tin hiển thị  | Đủ 4 trường: IP nguồn, thời điểm,
       |                              | mức độ, log liên quan (≥1 dòng)
   3   | Bấm "Đánh dấu đã xử lý"       | Bắt buộc nhập ghi chú; sau khi
       |                              | lưu: trạng thái = "Đã xử lý",
       |                              | ghi log ai xử lý + lúc nào
   4   | Đăng nhập vai CHỈ-XEM, lặp B1| Xem được chi tiết nhưng KHÔNG
       |                              | thấy nút "Đánh dấu đã xử lý"
```

Bước 4 (kiểm tra vai chỉ-xem) là chi tiết Junior tốt hay thêm — test cả "ai KHÔNG được làm gì", không chỉ luồng thuận.

**Vì sao là mức ①:** viết đúng mẫu, rõ và chạy lại được cho ca đơn giản; chưa tự thiết kế bộ kịch bản cho ca phức tạp nhiều luồng.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** viết tài liệu kiểm thử **độc lập cho ca mới hoàn toàn** — không có mẫu để chép, tự áp kỹ thuật thiết kế, phủ cả các nhánh biên và trường hợp "không được xảy ra".

**Tình huống thực tế — thiết kế bộ kịch bản cho "Tự động tương quan cảnh báo thành sự cố".** Quy tắc: 3 cảnh báo liên quan trong 5 phút → gộp thành 1 sự cố (chống spam). Không có mẫu sẵn — bạn tự dựng bộ case phủ cả gộp-đúng lẫn gộp-nhầm:

```
BỘ KỊCH BẢN — Tương quan cảnh báo (tự thiết kế, phủ 2 mặt)

  # | Kịch bản dữ liệu                        | Kết quả mong đợi
  --|-----------------------------------------|--------------------
  1 | 3 cảnh báo liên quan trong 5 phút       | GỘP thành 1 sự cố
  2 | 2 cảnh báo liên quan trong 5 phút       | KHÔNG gộp (chưa đủ 3)
  3 | 3 cảnh báo liên quan nhưng cách 6 phút  | KHÔNG gộp (quá cửa sổ)
  4 | 3 cảnh báo KHÔNG liên quan, cùng lúc    | KHÔNG gộp nhầm ⚠️
    | (khác loại tấn công, khác IP)           | (chống gộp ẩu)
  5 | Biên: cảnh báo thứ 3 tới đúng giây 300  | Gộp (biên trong)
  6 | Biên: cảnh báo thứ 3 tới giây 301       | Không gộp (biên ngoài)
  7 | 6 cảnh báo liên quan trong 5 phút       | 1 sự cố gồm 6 (không
    |                                         | tạo 2 sự cố chồng nhau)

  Chú thích thiết kế: case 4 quan trọng nhất — gộp NHẦM 2 sự cố
  khác nhau còn nguy hiểm hơn không gộp (che mất 1 cuộc tấn công).
```

Case 4 và cặp biên 5–6 là thứ chỉ có khi Tester *hiểu rủi ro nghiệp vụ*, không phải khi chép mẫu: tính năng tự động hoá luôn phải test cả "làm đúng" lẫn "làm bậy".

**Vì sao là mức ②:** tự xây tài liệu cho ca mới không có khuôn, áp kỹ thuật biên + phủ mặt trái của tự động hoá — tài liệu vừa là kịch bản chạy vừa là bằng chứng đã lường hết rủi ro.
