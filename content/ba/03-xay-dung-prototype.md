# Xây dựng prototype sản phẩm/ứng dụng

**Định nghĩa.** **Prototype** (bản mẫu) là bản mô phỏng giao diện/luồng tương tác — từ **wireframe** (khung dây: chỉ bố cục, chưa màu sắc) đến **clickable prototype** (bấm được, mô phỏng luồng thật) — thường dựng bằng Figma hoặc công cụ tương đương. Giá trị cốt lõi: khách hàng phản hồi trên một thứ *nhìn thấy được* chính xác hơn nhiều so với phản hồi trên văn bản; và sửa một wireframe mất 10 phút, sửa code đã viết xong mất nhiều ngày.

## ▸ Ex·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dựng được wireframe cho 1 màn hình, thể hiện đúng bố cục và các thành phần chính — đủ để khách hàng và Dev cùng hình dung một kiểu.

**Tình huống thực tế — wireframe màn "Danh sách cảnh báo".** Trước buổi review với đội An ninh mạng, bạn phác nhanh khung màn hình:

```
┌──────────────────────────────────────────────────────────┐
│  Bộ lọc: [Mức độ ▾] [Khoảng thời gian ▾] [IP nguồn ____] │
├──────────────────────────────────────────────────────────┤
│  Mức độ │ IP nguồn      │ Loại tấn công   │ Thời điểm    │
│  🔴 Cao  │ 10.0.3.15    │ Quét cổng       │ 09:12 hôm nay│
│  🟡 TB   │ 10.0.7.201   │ Đăng nhập lạ    │ 08:55 hôm nay│
│  ...                                                      │
├──────────────────────────────────────────────────────────┤
│  [Export Excel]                    Phân trang ‹ 1 2 3 ›  │
└──────────────────────────────────────────────────────────┘
```

Nhìn vào khung này, khách hàng lập tức góp ý: "cột Loại tấn công quan trọng hơn IP, đưa lên trước" và "thiếu số đếm cảnh báo chưa xử lý" — hai góp ý mà nếu chỉ đọc PTYC dạng chữ họ đã không nhận ra.

**Vì sao là mức ①:** dựng đúng bố cục cơ bản cho 1 màn hình để lấy phản hồi sớm; chưa cần thể hiện luồng tương tác nhiều bước.

## ▸ Ex·V3 — ② Biết làm
**Khác V1:** dựng prototype **clickable có luồng tương tác nhiều màn hình**, và biết dùng nó như công cụ *phát hiện vấn đề nghiệp vụ* chứ không chỉ minh hoạ giao diện.

**Tình huống thực tế 1 — prototype clickable cho luồng "Xử lý 1 cảnh báo".** Bạn nối các màn trong Figma thành luồng bấm được:

```
[Danh sách] ─bấm 1 dòng→ [Chi tiết cảnh báo]
    ↑                        │ bấm "Đánh dấu đã xử lý"
    │                        ▼
    │                   [Popup bắt buộc nhập ghi chú xử lý]
    └──────── quay về ──────── (lưu xong, dòng đổi trạng thái ✓)
```

Khi khách hàng tự tay bấm thử, họ phát hiện điều không ai nghĩ tới khi đọc tài liệu: "trực ca xử lý 50 cảnh báo/ngày mà mỗi lần phải nhập ghi chú qua popup thì quá chậm — cho phép chọn nhanh lý do từ danh sách có sẵn". Yêu cầu "ghi chú chọn nhanh" ra đời từ **trải nghiệm thử**, không phải từ phỏng vấn.

**Tình huống thực tế 2 — dùng prototype để chốt tranh cãi.** Đội An ninh muốn dashboard hiển thị "mọi thứ trên 1 màn", ban lãnh đạo muốn "chỉ 3 con số to". Thay vì tranh luận bằng lời, bạn dựng 2 prototype nhanh (mỗi bản 30 phút), cho 2 bên bấm thử chéo — kết quả: chốt dashboard 2 tầng, mặc định 3 con số + nút mở rộng bảng chi tiết. Prototype rẻ hơn một cuộc họp kéo dài 3 tuần.

**Vì sao là mức ②:** prototype thể hiện được cả luồng trải nghiệm nhiều bước và được dùng đúng vai trò công cụ ra quyết định/phát hiện vấn đề — không chỉ là hình tĩnh minh hoạ.
