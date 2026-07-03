# Kiểm thử API & công cụ tự động hoá

**Định nghĩa.** Thay vì test qua giao diện (chậm, dễ sót), Tester dùng công cụ gọi thẳng API (như **Postman**) để kiểm chứng logic backend độc lập với UI, và dùng **công cụ/framework tự động hoá có sẵn** (Selenium/Playwright cho web, Appium cho mobile, JMeter cho tải) để chạy lại hàng loạt test case không cần thao tác tay. Với Tester ở mức này, trọng tâm là **dùng công cụ có sẵn cho hiệu quả** — chưa cần tự xây framework từ đầu (việc của cấp cao hơn).

## ▸ Ex·V2 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dùng công cụ gọi API có sẵn (Postman) để test một endpoint theo mẫu — kiểm chứng cả luồng đúng lẫn luồng lỗi.

**Tình huống thực tế — test API tạo cảnh báo bằng Postman.** API `POST /api/alerts` (tạo cảnh báo thủ công, dùng khi diễn tập). Bạn test cả hai mặt:

```
POSTMAN — POST /api/alerts

  CA THUẬN (dữ liệu hợp lệ):
    Body: { "severity": "high", "source_ip": "192.168.1.1" }
    → Mong đợi: 201 Created + response có "id" mới sinh
      + "created_at" gần thời điểm hiện tại

  CA LỖI (thiếu trường bắt buộc):
    Body: { "source_ip": "192.168.1.1" }   ← thiếu severity
    → Mong đợi: 400 Bad Request + message rõ "severity is required"
      (KHÔNG phải 500 — thiếu input là lỗi lường trước được)

  CA LỖI (giá trị lạ):
    Body: { "severity": "SUPER_CRITICAL", ... }  ← enum không hợp lệ
    → Mong đợi: 400 + báo giá trị không thuộc {low, medium, high}
```

Test thẳng API bắt được điều test qua UI khó thấy: giao diện thường chỉ cho chọn enum từ dropdown (không bao giờ gửi được giá trị lạ), nhưng kẻ tấn công gọi thẳng API thì gửi được — nên ca "giá trị lạ" là bắt buộc với sản phẩm an ninh.

**Vì sao là mức ①:** dùng đúng công cụ có sẵn cho ca đơn theo mẫu; chưa tự dựng bộ test chạy lặp tự động.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** dùng công cụ/framework để **tự động hoá** — gom test rời thành bộ chạy lại được nhiều lần, gắn assertion (kiểm tra tự động) để không phải mắt người soi từng response.

**Tình huống thực tế 1 — Postman Collection có assertion, chạy mỗi build.** Bạn gom các API test thủ công thành một collection có kiểm tra tự động bằng script:

```javascript
// Postman — tab "Tests" của request POST /api/alerts (ca thuận)
pm.test("Status 201", () => pm.response.to.have.status(201));
pm.test("Có id mới", () => {
  const body = pm.response.json();
  pm.expect(body.id).to.be.a("number");
  pm.expect(body.severity).to.eql("high");
});
pm.test("Phản hồi < 500ms", () => pm.expect(pm.response.responseTime).to.below(500));
```

Chạy cả collection (20 request) mỗi khi có build mới — 30 giây thay cho 30 phút test tay, và không bao giờ "quên" case nào.

**Tình huống thực tế 2 — kịch bản Selenium cho luồng UI lặp lại.** Với phần giao diện, bạn viết kịch bản tự động cho luồng smoke hay phải chạy đi chạy lại:

```
Kịch bản Selenium "smoke đăng nhập + xem cảnh báo":
  1. Mở /login → điền tài khoản qa_auto → submit
  2. Chờ dashboard load → khẳng định URL = /dashboard
  3. Vào /alerts → khẳng định bảng có ≥1 dòng
  4. Khẳng định cột "mức độ" của dòng đầu hiển thị đúng badge màu
→ Chạy tự động mỗi sáng trước khi Tester bắt đầu test tay:
  build "sống" thì mới đáng test sâu.
```

**Vì sao là mức ②:** dùng công cụ tự động hoá có sẵn để tăng tốc kiểm thử lặp lại và biến "test tay tốn công" thành "chạy một nút"; chưa cần tự thiết kế framework tự động hoá từ nền.
