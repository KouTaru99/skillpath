# MAP năng lực — Tester (Kiểm thử) · Junior → Specialist (BẢN NHÁP)

> Nguồn CHÍNH: `Data_JD` (sheet trong `bieu-mau-de-suat-chuyen-vung-1-len-vung-2.xlsx`), lọc theo **Trung tâm Sản phẩm Telco** — JD thật, có mức độ yêu cầu tường minh (Nhập môn/Biết làm/Thành thạo/Chuyên gia) cho từng kỹ năng ở từng level. Đối chiếu bổ trợ phần nhiệm vụ/chứng chỉ với `tester-carrer-path.pdf`.
> Khác Dev: JD chỉ có 1 mức yêu cầu/kỹ năng cho MỖI LEVEL (không có sẵn dữ liệu theo vùng) — 3 vùng trong mỗi level (Ex-V1/V2/V3, Senior-V1/V2/V3, Specialist-V1/V2/V3) là **nội suy** của SkillPath (chia đều tiến trình từ mốc-vào-level tới mốc-JD-quy-định), giữ đúng khuôn đã làm với Dev FE/BE.
> Trạng thái: chờ PO duyệt/chỉnh.

## Thang cấp độ (dùng chung toàn SkillPath, JD Specialist thêm khái niệm "Chuyên gia" ≈ ④)
① Nhập môn · ② Biết làm · ③ Thành thạo · ④ Chuyên sâu/Chuyên gia · `–` = chưa bắt buộc

## Cấu trúc vùng — xác nhận qua `Data_VCS` (nhân sự thật, ưu tiên Telco)
Telco: Experienced có đủ V1/V2/V3 · Senior có V1/V2 (đối chiếu toàn VCS thấy cả V3). Toàn VCS còn có Junior V1/V2/V3 và Specialist V3 (người thật). → **10 vùng, y khuôn Dev:** Junior (1 trang, không tách vùng — theo tiền lệ Entry Dev) + Experienced (V1-V3) + Senior (V1-V3) + Specialist (V1-V3).

## Bảng map — 5 nhóm nền (Junior → Experienced)

| Kỹ năng | Junior | Ex·V1 | Ex·V2 | Ex·V3 | Nguồn JD (level) |
|---|:--:|:--:|:--:|:--:|---|
| **Quy trình & tư duy nghiệp vụ** | | | | | |
| Quy trình PTPM (Agile/Scrum) | ① | ① | ② | ② | Junior①, Ex②(nắm vững) |
| Đọc hiểu, phân tích & phản biện yêu cầu nghiệp vụ | ① | ① | ② | ② | Junior①(đơn giản), Ex②(phản biện đặc tả) |
| **Lõi Kiểm thử** | | | | | |
| Khái niệm & nguyên lý kiểm thử (test case/suite/data, Bug Life Cycle) | ① | ① | ① | ① | Junior①, không tăng thêm ở Ex (JD không nhắc lại — đã nền tảng) |
| Các loại kiểm thử (chức năng/hồi quy/smoke → phi chức năng/thăm dò/đoán lỗi) | ① | ① | ② | ② | Junior①(cơ bản), Ex②(mở rộng loại) |
| Các mức độ kiểm thử (component/integration/system/acceptance) | – | ① | ① | ① | Mới ở Ex①(JD Junior không nhắc) |
| Kỹ thuật thiết kế kiểm thử (hộp đen, dựa kinh nghiệm) | ① | ① | ② | ② | Junior①(phổ biến), Ex②(áp dụng thành thạo + dựa kinh nghiệm) |
| Xây dựng tài liệu kiểm thử (test design, kịch bản) | ① | ① | ② | ② | Junior①, Ex②(độc lập) |
| **Kỹ thuật nâng cao Kiểm thử** | | | | | |
| SQL & cơ sở dữ liệu sản phẩm | ① | ① | ② | ② | Junior①(bảng đơn), Ex②(nâng cao) |
| Giao thức mạng (HTTP/HTTPS) | – | ① | ① | ① | Mới ở Ex①(JD Junior không nhắc) |
| Kiểm thử API & công cụ tự động hoá (web/mobile/api) | – | – | ① | ② | Ex Nice-to-have①→②(bắt đầu dùng công cụ có sẵn) |
| Ước lượng nỗ lực & rủi ro kiểm thử | – | ① | ① | ② | Mới ở Ex①(task được giao), lên②(cho dự án) ở V3 |
| Nghiệp vụ hệ thống của sản phẩm tham gia kiểm thử | – | ① | ② | ② | Mới ở Ex①(JD: "nắm vững nghiệp vụ hệ thống") |
| **Công cụ & vận hành** | | | | | |
| Công cụ quản lý lỗi & yêu cầu thay đổi | ① | ① | ① | ① | Junior①, flat (JD không nhắc lại ở Ex) |
| Tin học văn phòng | ① | ① | ① | ① | Junior①, flat |

## Kỹ năng mới xuất hiện từ Senior (nhóm "ATTT & chuyên sâu" — đặc thù VCS An ninh mạng)

| Kỹ năng | Senior·V1 | Senior·V2 | Senior·V3 | Nguồn JD |
|---|:--:|:--:|:--:|---|
| CI/CD cơ bản 🆕 | ① | ① | ① | JD Senior: "nắm được kiến thức cơ bản về CI/CD" (muộn hơn Dev nhiều — Tester không cần CI/CD sớm) |
| Kiến thức chuyên ngành ATTT (web attacks, malware, log, giao thức mạng, viễn thông) 🆕 | ① | ① | ① | JD Senior duy nhất, không tăng nữa trong Senior (để dành Specialist) |
| Am hiểu dòng sản phẩm ATTT (so với đối thủ) 🆕 | ② | ② | ② | JD Senior "Biết làm", flat trong Senior |
| Kiểm thử chuyên sâu theo mảng (hiệu năng/bảo mật/thiết bị) 🆕 | ③ | ③ | ③ | JD Senior "kiến thức tốt", flat (Specialist mới lên "chuyên gia") |
| Phân tích, đánh giá, dự báo rủi ro chất lượng sản phẩm 🆕 | ① | ② | ③ | JD Senior duy nhất — nội suy 3 mốc |

## Kỹ năng mới xuất hiện từ Senior (nhóm "Kiến trúc & thiết kế giải pháp" — tái dùng tên nhóm khuôn Dev)

| Kỹ năng | Senior·V1 | Senior·V2 | Senior·V3 | Nguồn JD |
|---|:--:|:--:|:--:|---|
| Phân tích & đề xuất cải tiến luồng nghiệp vụ, tối ưu quy trình 🆕 | ① | ② | ③ | JD Senior "phân tích làm rõ yêu cầu, đề xuất cải tiến" |

## Kỹ năng mới xuất hiện từ Senior (nhóm "Quản lý & lãnh đạo kỹ thuật")

| Kỹ năng | Senior·V1 | Senior·V2 | Senior·V3 | Nguồn JD |
|---|:--:|:--:|:--:|---|
| Hướng dẫn & review kịch bản kiểm thử cho level thấp hơn/tương đương 🆕 | ① | ② | ③ | JD Ex "should have" → JD Senior "dẫn dắt chuyên môn" |
| Quản lý nhóm kiểm thử (4-8 người) 🆕 | ① | ② | ② | JD Senior "should have: quản lý chuyên môn nhóm 4-8 người" |

## Specialist — 3 vùng cuối (nhóm "Chiến lược & quản trị kiểm thử" — thay "quản trị công nghệ" của Dev cho khớp bản chất Tester)

| Kỹ năng | Spec·V1 | Spec·V2 | Spec·V3 | Nguồn JD |
|---|:--:|:--:|:--:|---|
| Nghiên cứu độc lập công nghệ/kỹ thuật kiểm thử mới (R&D) 🆕 | ① | ② | ④ | JD Specialist |
| Xây dựng, đề xuất & tối ưu chiến lược kiểm thử cho toàn đơn vị 🆕 | ① | ② | ④ | JD Specialist |
| Tư vấn lựa chọn công nghệ/kỹ thuật/công cụ kiểm thử cho nhiều dự án 🆕 | ① | ② | ④ | JD Specialist |
| Đào tạo, lan toả kiến thức chuyên sâu cho toàn công ty 🆕 | ① | ② | ④ | JD Specialist ("đào tạo, lan tỏa... cho các thành viên khác trong công ty") |
| Đánh giá năng lực CM kiểm thử viên khác, định hướng phát triển cá nhân/đơn vị 🆕 | ① | ② | ④ | JD Specialist |
| Phản biện về giải pháp nghiệp vụ & kiến trúc hệ thống 🆕 | ① | ② | ④ | JD Specialist → gắn nhóm "Kiến trúc & thiết kế giải pháp" |
| Review kiến trúc sản phẩm, phát hiện điểm yếu/rủi ro hệ thống 🆕 | ① | ② | ④ | JD Specialist → gắn nhóm "Kiến trúc & thiết kế giải pháp" |
| Kiểm thử chuyên sâu 1 mảng ở mức chuyên gia (hiệu năng/bảo mật/thiết bị) | ③(carry) | ③ | ④ | JD Specialist: "chuyên gia trong 1 mảng" — đẩy nốt từ ③ Senior lên ④ |

Cùng thang **①→②→④** (bỏ qua ③) như Dev Specialist — vùng cuối cùng toàn thang, không để dành mức nào.

## Tổng số kỹ năng
- Junior→Experienced (nền): 14 kỹ năng
- Senior mới: 8 kỹ năng (2 nhóm: ATTT&chuyên sâu 5 + Kiến trúc 1 + Lãnh đạo 2)
- Specialist mới: 8 kỹ năng (Chiến lược & quản trị kiểm thử 6 + Kiến trúc 2, trong đó 2 kiến trúc carry-tên-nhóm với Senior)
- **Tổng: 30 kỹ năng** (ít hơn Dev FE/BE vì miền Tester hẹp hơn — không có mảng "ngôn ngữ lập trình/framework" riêng)

## Khác biệt đáng chú ý so với Dev (để PO lưu ý khi duyệt)
1. **Không có level Entry riêng** — JD/PDF dùng "Junior" (không phải "Entry"), giữ nguyên tên gọi này thay vì đổi thành Entry cho khớp Dev.
2. **CI/CD xuất hiện RẤT MUỘN** (Senior, mức Nhập môn) — ngược hẳn Dev (CI/CD từ Ex·V1). Đúng bản chất: Tester không cần vận hành pipeline, chỉ cần hiểu để phối hợp khi lên Senior.
3. **Không có "ngôn ngữ lập trình"/"framework"** — Tester Junior-Ex không code, chỉ SQL cơ bản + công cụ có sẵn. Kỹ năng "code" chỉ xuất hiện gián tiếp qua "framework/công cụ hỗ trợ kiểm thử tự động" (Nice-to-have, không Must).
4. **Đậm màu ATTT** (An ninh mạng) — do JD lấy từ Trung tâm Sản phẩm Telco/công ty An ninh mạng Viettel. Đề xuất giữ nguyên vì đây là dữ liệu THẬT của đúng đơn vị anh, không phải generic hoá.
5. **Specialist không có Junior-style code**, mà là chuyên gia hoá 1 mảng kiểm thử (hiệu năng/bảo mật/thiết bị) — nội dung ví dụ sẽ theo kiểu "case thực chiến kiểm thử" (kịch bản test, phát hiện lỗi) thay vì code như Dev.

## Cần PO chốt
1. Đồng ý cấu trúc 5 nhóm nền + 3 nhóm mới (ATTT&chuyên sâu, Kiến trúc, Lãnh đạo) + Specialist (Chiến lược & quản trị kiểm thử)?
2. Đồng ý giữ tên "Junior" (không đổi "Entry") vì đúng theo JD/PDF gốc?
3. Nội dung ví dụ: dùng case kiểm thử thực tế nào làm "dự án xuyên suốt" — ví dụ 1 sản phẩm ATTT giả định (vd "hệ thống giám sát an ninh mạng nội bộ") để tất cả case đều xoay quanh 1 bức tranh, giống cách Dev FE/BE dùng "hệ thống quản lý đơn hàng"?
