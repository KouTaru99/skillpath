# Nghiệp vụ hệ thống của sản phẩm

**Định nghĩa.** Ngoài kỹ thuật kiểm thử, Tester giỏi phải **hiểu nghiệp vụ thật** của sản phẩm — tại sao tính năng tồn tại, ai dùng, dùng để làm gì. Hiểu nghiệp vụ giúp bắt được lỗi logic mà kiểm thử máy móc theo tài liệu bỏ lỡ — loại bug "chạy đúng spec nhưng sai bản chất". Đây là điều phân biệt Tester "bấm theo checklist" với Tester "bảo vệ được chất lượng thật".

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm nghiệp vụ cơ bản của các chức năng mình test — đủ để đặt trọng tâm test đúng chỗ nghiệp vụ coi trọng.

**Tình huống thực tế — hiểu "vì sao" để ưu tiên test đúng chỗ.** Bạn hiểu hệ thống giám sát an ninh mạng tồn tại để đội An ninh **phát hiện sớm tấn công** — từ đó suy ra thứ tự ưu tiên test khác hẳn một sản phẩm thương mại:

```
CÙNG MỘT MÀN "danh sách cảnh báo", ƯU TIÊN TEST KHÁC NHAU:

  Nếu là web thương mại điện tử    Nếu là hệ thống AN NINH (thật)
  ---------------------------      ------------------------------
  1. Giao diện đẹp, mượt           1. ĐỘ TRỄ cảnh báo (vài giây
  2. Load nhanh                       cũng là vấn đề nghiêm trọng)
  3. Độ trễ vài giây → OK          2. KHÔNG SÓT cảnh báo (miss 1
                                      cảnh báo = có thể miss 1 tấn công)
                                   3. Giao diện đẹp → thứ yếu

  → Bạn dồn công test độ trễ + độ tin cậy (không mất cảnh báo),
    không dồn công vào chỉnh pixel giao diện.
```

Cùng một chức năng, hiểu nghiệp vụ quyết định bạn tiêu thời gian test vào đâu — với sản phẩm an ninh, "sót một cảnh báo" là loại lỗi đắt nhất.

**Vì sao là mức ①:** hiểu bối cảnh nghiệp vụ đủ để test có trọng tâm; chưa sâu tới mức tự phát hiện bất cập nghiệp vụ trong thiết kế.

## ▸ Ex·V2 — ② Biết làm
**Khác V1:** **nắm vững** nghiệp vụ đủ để nhận ra khi hệ thống "đúng kỹ thuật nhưng sai nghiệp vụ" — loại lỗi nguy hiểm nhất vì mọi test theo tài liệu đều pass.

**Tình huống thực tế — bắt lỗ hổng an ninh trong một tính năng "chạy đúng spec".** Tính năng "Tự động đóng cảnh báo sau 24 giờ nếu không ai xử lý" — chạy đúng y như tài liệu mô tả, mọi test case theo spec đều pass. Nhưng bạn dừng lại vì hiểu nghiệp vụ:

```
TÍNH NĂNG: cảnh báo không xử lý trong 24h → tự động đóng.
KIỂM THỬ THEO SPEC: ✓ pass hết (đóng đúng sau 24h)

NHƯNG — SOI BẰNG MẮT NGHIỆP VỤ AN NINH:
  Cảnh báo mức CAO = nghi ngờ tấn công THẬT đang diễn ra.
  Tự động đóng nó sau 24h vì "không ai xử lý" nghĩa là:
  → một cuộc tấn công có thể bị hệ thống tự XOÁ khỏi tầm mắt
    chỉ vì cuối tuần không ai trực → LỖ HỔNG AN NINH nghiêm trọng,
    không phải "tính năng chạy đúng".

BÁO CÁO (không phải bug kỹ thuật — bug NGHIỆP VỤ):
  "Quy tắc tự đóng chỉ nên áp cho mức Thấp/Trung bình. Mức Cao
   KHÔNG được tự đóng — thay vào đó ESCALATE (leo thang) cho quản
   lý nếu quá 24h chưa xử lý. Đề nghị sửa thiết kế, không phải sửa code."
```

Đây là loại phát hiện chỉ Tester hiểu nghiệp vụ mới có: tài liệu sai từ gốc, code làm đúng tài liệu, mọi test case pass — nhưng sản phẩm có lỗ hổng thật. Bạn không "test đúng cái sai", bạn phản biện cả thiết kế.

**Vì sao là mức ②:** hiểu nghiệp vụ đủ sâu để bắt bug ở tầng thiết kế/logic nghiệp vụ mà kiểm thử theo tài liệu không thể phát hiện — bảo vệ chất lượng thật, không chỉ sự tuân thủ tài liệu.
