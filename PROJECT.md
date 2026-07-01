# SkillPath — hồ sơ dự án

> Cập nhật: 2026-07-01. Đây là dự án thứ 3 (sau Encyclopaedia, Praxis).

## Mục tiêu
Web tra cứu năng lực cho dev **sắp phỏng vấn thăng cấp** vào ôn: mỗi role × level × vùng cần **những kỹ năng gì**, mỗi kỹ năng **định nghĩa ra sao** và **ví dụ thực tế/cách code thế nào**. Không phải kênh lộ trình, không có câu hỏi phỏng vấn — là "bản lời giải có sẵn" để người dùng biết cần gì và làm theo.

## Nguồn tham khảo (ở `~/Work/Carrer_Path/`, KHÔNG bê nguyên, không dùng thông tin cá nhân)
- `dev-fe-carrer-path.pdf`, `dev-be-carrer-path.pdf` — chia LEVEL lớn (Entry/Experienced/Senior/Specialist).
- `bieu-mau-de-suat-chuyen-vung-*.xlsx` — kỹ năng cần cho từng VÙNG trong một level + master data.
- `tu-dien-ky-nang-dev-web-app.xlsx` — 24 năng lực, mỗi năng lực 5 cấp độ thành thạo.

## Quyết định đã chốt (PO)
1. **Người dùng = ứng viên** (người muốn được phỏng vấn thăng cấp), vào ôn kỹ năng.
2. **4 level**: Entry → Experienced → Senior → Specialist. **Entry chỉ 1 vùng**; các level khác có tối đa **3 vùng** (V1/V2/V3, xác minh từ Data_VCS).
3. **Logic phân vùng = HYBRID**: lên vùng cao vừa nâng cấp độ kỹ năng cũ, vừa thêm kỹ năng mới.
4. **Thang cấp độ 4 mức**: ① Nhập môn · ② Biết làm · ③ Thành thạo · ④ Chuyên sâu (ánh xạ thang 5 cấp của từ điển).
5. **Kiến trúc nội dung**: TRANG KỸ NĂNG làm gốc (định nghĩa dùng chung + các mốc theo vùng) + TRANG VÙNG làm checklist tổng hợp. Cả hai sinh từ 1 map.
6. **Content-model 1 trang kỹ năng**: Định nghĩa → mỗi mốc vùng gồm {ở mức này làm chủ gì · ví dụ thực tế chi tiết có code · vì sao là mức đó}.
7. **Phạm vi đợt 1**: role **Dev FE**, **Entry → Experienced** (4 vùng: Entry, Ex·V1, Ex·V2, Ex·V3). Các role khác (BE...) + level cao hơn làm sau nếu demo thành công (PO sẽ cấp thêm tài liệu).

## Trạng thái
- ✅ **Nội dung đợt 1 XONG**: 16 trang kỹ năng (`content/fe/`) + 4 trang vùng checklist (`content/vung-fe/`). ~1.300 dòng. Cross-link 2 chiều kỹ năng ↔ vùng.
- ⏳ **Chưa dựng web** — bước kế: render markdown thành web (đề xuất tái dùng khuôn Encyclopaedia: Next.js đọc md, sidenav role→level→vùng).
- PO sẽ góp ý nội dung khi xem sản phẩm web thật.

## Cấu trúc thư mục
```
skillpath/
├── PROJECT.md              ← file này
├── _planning/
│   ├── map-fe-entry-experienced.md   ← MAP kỹ năng × vùng (nguồn sự thật nội dung)
│   └── khuon-trang-ky-nang.md        ← khuôn mẫu 1 trang kỹ năng (PO đã duyệt)
└── content/
    ├── fe/                 ← 16 trang kỹ năng (01→16)
    └── vung-fe/            ← 4 trang vùng checklist (entry, experienced-v1/2/3)
```

## Map cấp độ (tóm tắt — chi tiết ở _planning/map-fe-entry-experienced.md)
16 kỹ năng FE chia 5 nhóm: Quy trình&tư duy · Lõi FE · Nâng cao FE · Nền CS&dữ liệu · Công cụ&vận hành.
Số kỹ năng mỗi vùng: Entry 8 · Ex·V1 14 · Ex·V2 16 · Ex·V3 16.
