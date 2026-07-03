# Phân tích sản phẩm/ứng dụng thị trường & đối thủ cạnh tranh

**Định nghĩa.** Kỹ năng mới ở Senior — thay vì chỉ ghi nhận yêu cầu từ khách hàng nội bộ, BA chủ động **nghiên cứu sản phẩm tương đương trên thị trường** (competitor analysis — phân tích đối thủ cạnh tranh) để đề xuất tính năng đón đầu, định vị sản phẩm, và tránh xây lại thứ thị trường đã giải xong. Với sản phẩm giám sát an ninh, "thị trường" nghĩa là các hệ thống **SIEM** (Security Information and Event Management — quản lý sự kiện và thông tin an ninh) như Splunk, ELK Security, QRadar, Wazuh.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Khi được giao, tìm hiểu và so sánh có cấu trúc với 1–2 sản phẩm tương đương — ra được bảng so sánh dùng được, không chỉ cảm nhận chung chung.

**Tình huống thực tế — được giao khảo sát Splunk và Wazuh trong 1 tuần.** Trưởng sản phẩm hỏi: "hệ thống mình đang thiếu gì so với ngoài kia?" Bạn không trả về một bài văn, mà một bảng so sánh theo nhóm tính năng:

```
SO SÁNH NHANH — hệ thống nội bộ vs Splunk vs Wazuh (06/2026)

  Nhóm tính năng       | Nội bộ | Splunk | Wazuh | Ghi chú
  ---------------------|--------|--------|-------|------------------------
  Thu thập log đa nguồn| ✅ 3   | ✅ 100+| ✅ 50+| mình chỉ server/firewall
                       | nguồn  | connector      | /app — thiếu cloud
  Tương quan sự kiện   | ✅ theo| ✅ rule| ✅    | ngang tầm nhu cầu nội bộ
                       | ngưỡng | engine mạnh    |
  Threat Intelligence  | ❌     | ✅     | ✅    | đối chiếu IP với danh
  (tình báo mối đe doạ)|        |        |       | sách đen công khai
  Báo cáo tuân thủ     | ❌     | ✅     | ✅    | mẫu báo cáo ISO/PCI sẵn
  Chi phí              | nội bộ | $$$ đắt| mã    |
                       |        | theo GB| nguồn |
                       |        | log    | mở    |
```

Kèm một kết luận 3 dòng: khoảng cách lớn nhất là Threat Intelligence và nguồn log cloud; báo cáo tuân thủ chưa gấp vì công ty chưa audit theo chuẩn đó.

**Vì sao là mức ①:** so sánh có cấu trúc, đúng trọng tâm khi **được giao đề bài**; chưa tự đề xuất hành động từ phân tích.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** **tự phát hiện** khoảng trống không cần ai giao, và chuyển phân tích thành **khuyến nghị cụ thể** kèm chi phí/lợi ích để sản phẩm quyết được.

**Tình huống thực tế — tự đề xuất tính năng Threat Intelligence vào roadmap.** Từ bảng so sánh quý trước, bạn tự đào sâu tính năng có khoảng cách lớn nhất và trình bản đề xuất:

```
ĐỀ XUẤT — Bổ sung đối chiếu Threat Intelligence (TI)

VẤN ĐỀ      70% cảnh báo hiện tại là cảnh báo giả; trực ca mất ~2h/ngày
            lọc tay. Các SIEM thị trường đều giảm giả bằng TI: IP xuất
            hiện trong danh sách đen công khai → tự nâng độ tin cậy.
GIẢI PHÁP   Tích hợp 2 nguồn TI miễn phí (AbuseIPDB, AlienVault OTX);
            cảnh báo có IP khớp danh sách đen → gắn nhãn "TI xác nhận".
LỢI ÍCH     Ước tính giảm 30-40% thời gian lọc tay (dựa trên tỉ lệ IP
            tấn công cũ có mặt trong danh sách đen ~60%, đo thử 1 tuần
            log thật).
CHI PHÍ     ~3 tuần công Dev BE; nguồn TI miễn phí có giới hạn 1.000
            truy vấn/ngày → đủ cho quy mô hiện tại, vượt thì trả phí.
RỦI RO      Phụ thuộc dịch vụ ngoài → cần cơ chế cache + chạy tiếp
            được khi nguồn TI sập.
```

Điểm khác biệt so với V1: con số "60% IP khớp danh sách đen" là bạn **đo thử trên log thật một tuần**, không chép từ tài liệu marketing của đối thủ.

**Vì sao là mức ②:** chủ động phát hiện + khuyến nghị được hành động cụ thể có số liệu tự kiểm chứng; chưa phải là hoạt động định kỳ ảnh hưởng chiến lược dài hạn.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** phân tích thị trường thành **nhịp định kỳ có phương pháp**, là đầu vào chính thức cho roadmap hằng năm — và bạn biết phân biệt "xu hướng thật" với "mốt marketing".

**Tình huống thực tế — báo cáo xu hướng quý trở thành đầu vào roadmap.** Bạn duy trì nhịp mỗi quý: rà release notes của 4 SIEM lớn, đọc 2 báo cáo ngành (Gartner, SANS), phỏng vấn nhanh đội vận hành về nỗi đau mới. Báo cáo quý III của bạn có một nhận định "ngược dòng" đáng giá:

```
TRÍCH BÁO CÁO XU HƯỚNG QUÝ III

XU HƯỚNG THẬT (khuyến nghị theo):
  - SOAR mini (tự động hoá phản ứng đơn giản: tự chặn IP sau khi
    người duyệt 1 chạm) — cả 4 đối thủ đều đã có, đội vận hành
    mình cũng đang xin. Đề xuất: đưa vào roadmap năm sau, phạm vi
    "duyệt 1 chạm", KHÔNG tự động hoàn toàn.

MỐT MARKETING (khuyến nghị CHƯA theo):
  - "AI tự phân tích sự cố" — mọi đối thủ đều quảng cáo, nhưng khảo
    sát người dùng thực tế (diễn đàn SOC, 2 hội thảo) cho thấy tỉ lệ
    tin dùng thấp vì hay suy đoán sai; chi phí xây rất lớn.
    Đề xuất: theo dõi thêm 2 quý, chưa đầu tư.
```

Ban lãnh đạo dùng đúng khung này để chốt roadmap — và việc bạn dám ghi "chưa nên làm AI" (đi ngược trào lưu) với căn cứ khảo sát thật là thứ khiến báo cáo được tin.

**Vì sao là mức ③:** phân tích thị trường trở thành quy trình định kỳ ảnh hưởng quyết định chiến lược, có chính kiến được kiểm chứng — không còn là việc làm một lần khi được giao.
