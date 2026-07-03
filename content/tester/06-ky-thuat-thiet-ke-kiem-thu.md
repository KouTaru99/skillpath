# Kỹ thuật thiết kế kiểm thử

**Định nghĩa.** Cách **chọn ra bộ test case đủ tốt** mà không cần test hết mọi khả năng (bất khả thi). **Kiểm thử hộp đen** (black-box) thiết kế test dựa trên input/output, không cần biết code bên trong: **phân vùng tương đương** (equivalence partitioning — chia input thành các nhóm hành vi giống nhau, chỉ test đại diện mỗi nhóm) và **phân tích giá trị biên** (boundary value analysis — lỗi hay xảy ra ở giá trị biên, tập trung test quanh ngưỡng). **Kiểm thử dựa kinh nghiệm** dùng trực giác nghề để nhắm chỗ dễ lỗi. Bản chất của kỹ năng này là **tiết kiệm có kỷ luật**: ít test case nhất mà vẫn phủ hết rủi ro.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Áp dụng đúng các kỹ thuật hộp đen phổ biến khi có hướng dẫn — biết vì sao test tại biên thay vì test tràn lan.

**Tình huống thực tế — thiết kế test cho "Khoá tài khoản sau N=5 lần sai".** Test hết từ 1 đến 20 lần là lãng phí và vẫn có thể sót. Bạn dùng **phân tích giá trị biên** — lỗi nấp ở ngưỡng:

```
NGƯỠNG N = 5 → các mốc BIÊN cần test (không test 1..20):

  Lần sai thứ 4  → CHƯA khoá   (biên dưới — sát ngưỡng, chưa chạm)
  Lần sai thứ 5  → PHẢI khoá   (đúng ngưỡng — điểm dễ lỗi nhất:
                                code hay nhầm "> 5" với ">= 5")
  Lần sai thứ 6  → ĐÃ khoá,    (trên ngưỡng — không cho thử tiếp)
                   chặn tiếp

  + biên đặc biệt: sai 4 lần → ĐÚNG lần 5 → reset về 0 chưa?
                   (kiểm tra bộ đếm reset đúng)
```

3 mốc biên + 1 case reset bắt được gần như mọi bug logic ngưỡng, thay cho 20 lần thử vô nghĩa. Đó là tinh thần "test ít mà trúng".

**Vì sao là mức ①:** áp dụng đúng kỹ thuật khi được hướng dẫn cụ thể; chưa tự chọn kỹ thuật cho ca lạ hoặc kết hợp nhiều kỹ thuật.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** áp dụng **thành thạo cả hộp đen lẫn kinh nghiệm**, tự chọn kỹ thuật đúng với từng loại input, và kết hợp chúng để phủ rủi ro tối đa với số case tối thiểu.

**Tình huống thực tế — thiết kế test cho form "Tạo quy tắc cảnh báo" nhiều trường.** Form có: tên quy tắc (chuỗi), ngưỡng số lần (số), mức độ (enum Thấp/TB/Cao), cửa sổ thời gian (phút). Bạn chọn kỹ thuật *khác nhau cho từng trường* — đây là chỗ Junior chưa làm được:

```
CHỌN KỸ THUẬT THEO KIỂU TRƯỜNG:

  Trường            | Kỹ thuật              | Case đại diện
  ------------------|----------------------|------------------------
  Mức độ (enum)     | Phân vùng tương đương| 1 case mỗi giá trị hợp lệ
                    |                      | + 1 giá trị lạ (gửi API
                    |                      | thẳng "Critical") → phải
                    |                      | bị từ chối
  Ngưỡng số lần     | Giá trị biên         | 0, 1, giá trị max cho phép,
                    |                      | max+1, số âm, chữ, để trống
  Cửa sổ thời gian  | Biên + tương đương   | 1 phút, 1440 phút (1 ngày),
                    |                      | 0, cực lớn (tràn số?)
  Tên quy tắc       | Kinh nghiệm          | rỗng, 500 ký tự, ký tự đặc
                    |                      | biệt/emoji, chuỗi có dấu
                    |                      | nháy (thử SQL injection nhẹ)

  + KẾT HỢP (đoán lỗi): ngưỡng=1 & cửa sổ=1 phút → cảnh báo bắn
    liên tục mỗi lần sai? (biên "nhạy nhất" — dễ gây spam)
```

Dòng "tên quy tắc → thử nháy đơn" đến từ kinh nghiệm bảo mật: form nào nhận chuỗi tự do cũng nên thử injection nhẹ — dù spec không yêu cầu, vì đây là sản phẩm an ninh.

**Vì sao là mức ②:** không chỉ áp công thức mà biết chọn đúng công thức cho từng trường và kết hợp với trực giác nghề — phủ rủi ro rộng mà bộ case vẫn gọn.
