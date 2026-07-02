# MAP năng lực — Dev Back-end · Senior + Specialist (BẢN NHÁP)

> Nguồn: career-path BE (`dev-be-carrer-path.pdf`, phần Senior + Specialist).
> **Chiến lược tái dùng:** so PDF BE với PDF FE ở tầng Senior/Specialist — phần "Quản lý & lãnh đạo kỹ thuật" và "Chiến lược & quản trị công nghệ" gần như **giống hệt nhau giữa 2 role** (Viettel chủ đích để Senior/Specialist hội tụ về trách nhiệm kiến trúc + lãnh đạo, bất kể FE hay BE). Vì vậy: **tái dùng nguyên khuôn 2 nhóm mới đã duyệt ở FE**, chỉ đổi ví dụ sang Java/Spring; chỉ thêm đúng **2 kỹ năng BE-riêng** mà FE không có.
> Trạng thái: chờ PO duyệt/chỉnh.

## Cấu trúc nhóm (Senior)
Tái dùng 7 nhóm y hệt FE (đổi "Lõi Front-end"→"Lõi Back-end", "Kỹ thuật nâng cao FE"→"BE" — đã có sẵn từ Entry→Experienced):
1. Quy trình & tư duy hệ thống (carry-over)
2. Lõi Back-end (carry-over: Java, OOP/DP/Algo/DS, CSDL)
3. Kỹ thuật nâng cao BE (carry-over: đa luồng, unit test, HĐH&I/O)
4. **Kiến trúc & thiết kế giải pháp** 🆕 nhóm — tái dùng 3 kỹ năng FE: Phân tích & thiết kế hệ thống · UML/ER · Tư vấn & phản biện
5. Nền tảng mạng & hệ thống (carry-over + 2 kỹ năng BE-riêng)
6. Công cụ & vận hành (carry-over)
7. **Quản lý & lãnh đạo kỹ thuật** 🆕 nhóm — tái dùng 5 kỹ năng FE: Phân task · Review code · Mentor · Seminar · Phỏng vấn tuyển dụng

## 2 kỹ năng BE-riêng (FE không có)
- **Remote debug** — PDF Senior: "Có khả năng remote debug" (nhóm Nền tảng mạng & hệ thống)
- **Container Orchestration & Cloud Native** — PDF Senior: "Nắm vững công nghệ và kiến trúc: Docker Container, Container Orchestration, Microservices" + "Hiểu về các kiến trúc Cloud: IaaS, PaaS, SaaS và mô hình Cloud Native App" (nhóm Nền tảng mạng & hệ thống)

## Carry-over — kỹ năng nào FLAT (đã trần, không viết thêm mốc Senior)
- **Java, CSDL** — đã ④ (đỉnh) từ Ex·V3 → giữ nguyên, không thêm mốc (giống HTML/CSS/JS của FE)
- **Git/SVN, Docker** — PDF để dành phần nâng cao (rebase/cherry-pick; dockerfile phức tạp/compose) cho **Specialist**, nên FLAT suốt Senior
- **Hệ điều hành & I/O** — PDF để "kiểm soát bộ nhớ nâng cao" cho Specialist, FLAT suốt Senior

## Carry-over — kỹ năng CÓ tăng mức ở Senior
Đa luồng/concurrency (deadlock, tối ưu multithread) · Unit test (functional/load/performance/UI test) · Mạng máy tính · Web server/Microservices (Docker orchestration, Cloud) · IDE&debug (remote debug) · Phân tích log/debug (multithread) · CI/CD · Quy trình PTPM · Đọc hiểu tài liệu · Lập trình an toàn · OOP/DP/Algo/DS (Design Pattern nâng cao Builder/Bridge/Decorator..., Graph/DivideConquer algorithm)

## Specialist — tái dùng NGUYÊN 8 kỹ năng mới đã duyệt ở FE
Design pattern kiến trúc nâng cao (GoF/EIP) · Giám sát & chẩn đoán hiệu năng (APM) · Xây quy trình đào tạo & đánh giá đội ngũ · Nghiên cứu & phát triển công nghệ mới (R&D) · Quản lý dự án · Sở hữu Technology Stack đơn vị · Xây dựng framework/nền tảng dùng chung · Đảm bảo NFR — **PDF BE Specialist khớp gần như nguyên văn với FE** ở các mục này (bảo mật/chống tấn công, đa nền tảng, tối ưu hệ thống theo định cỡ/giám sát, xây quy trình đào tạo).
Cùng thang **①→②→④** như FE (bỏ qua ③, vì là vùng cuối toàn thang).

Carry-over Specialist (nâng nốt phần PDF để dành): Git/SVN (rebase/reflog/cherry-pick/patch) · Docker (dockerfile phức tạp/compose/mount volume) · Hệ điều hành & I/O (kiểm soát bộ nhớ, tối ưu tham số HĐH/DB/webserver) · Đa luồng (monitor/trace multithread nâng cao) · Phân tích log/debug (multithread/bộ nhớ/treo chậm).

## Cần PO chốt
1. Đồng ý chiến lược **tái dùng khuôn Senior/Specialist đã duyệt ở FE** (2 nhóm mới + hầu hết kỹ năng), chỉ thêm 2 kỹ năng BE-riêng (remote debug, container orchestration/cloud)?
2. Đồng ý cách "để dành" phần nâng cao của Git/Docker/HĐH cho Specialist thay vì Senior (đúng theo PDF phân bổ)?
