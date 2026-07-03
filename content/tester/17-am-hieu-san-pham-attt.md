# Am hiểu dòng sản phẩm ATTT

**Định nghĩa.** Ngoài hiểu khái niệm ATTT chung, Senior Tester cần **am hiểu các sản phẩm ATTT tương đương trên thị trường/của đối thủ** — biết sản phẩm mình test đang ở đâu so với chuẩn ngành, tính năng nào là "phải có" mà đối thủ đã làm. Góc nhìn này biến Tester từ "người kiểm tra sản phẩm đúng tài liệu" thành "người mang tiêu chuẩn ngành vào bàn cân chất lượng".

## ▸ Senior·V1 — ② Biết làm
**Ở mức này bạn làm chủ được gì.** So sánh được sản phẩm mình test với 1–2 sản phẩm tương đương, nhận ra khoảng cách tính năng và chuyển nó thành đề xuất kiểm thử/sản phẩm cụ thể.

**Tình huống thực tế — phát hiện khoảng trống "Threat Intelligence" so với SIEM thị trường.** Trong lúc test, bạn không chỉ chạy case mà đối chiếu sản phẩm với các **SIEM** (Security Information and Event Management — hệ quản lý sự kiện & thông tin an ninh) phổ biến:

```
SO SÁNH NHANH — sản phẩm giám sát nội bộ vs SIEM thị trường

  Năng lực                  | Sản phẩm mình | Splunk | Wazuh | Nhận định
  --------------------------|---------------|--------|-------|-----------
  Thu thập log đa nguồn     | ✅            | ✅     | ✅    | ngang
  Tương quan sự kiện        | ✅            | ✅     | ✅    | ngang
  Threat Intelligence       | ❌            | ✅     | ✅    | THIẾU —
  (đối chiếu IP với danh                                     gần như
   sách đen công khai)                                        chuẩn ngành

ĐỀ XUẤT (mang góc thị trường vào kế hoạch test):
  "Threat Intelligence gần như là tính năng 'phải có' của SIEM
   hiện đại. Dù tài liệu hiện chưa yêu cầu, đề xuất PM: (1) đưa vào
   roadmap; (2) khi làm, cần chuẩn bị sẵn kịch bản test tích hợp
   TI feed (IP khớp danh sách đen → cảnh báo tăng độ tin cậy;
   nguồn feed sập → hệ thống vẫn chạy). Em phác trước bộ case này."
```

Khác biệt với Tester thường: bạn không đợi tài liệu yêu cầu mới test — bạn dùng hiểu biết thị trường để **chỉ ra thiếu sót chiến lược** và chuẩn bị sẵn năng lực kiểm thử cho nó.

**Vì sao là mức ②:** mang góc nhìn thị trường/đối thủ vào công việc kiểm thử để phát hiện khoảng cách và đề xuất chủ động; đây là mức "Biết làm" ngay từ Senior·V1 (JD Senior yêu cầu, giữ phẳng trong Senior — chuyên sâu hơn để dành cho Specialist).
