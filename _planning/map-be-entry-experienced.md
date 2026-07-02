# MAP năng lực — Dev Back-end · Entry → Experienced (BẢN NHÁP)

> Nguồn: career-path BE (Viettel/VCS, `dev-be-carrer-path.pdf`) — cùng khuôn đã chạy với FE.
> **Ngôn ngữ minh hoạ: Java/Spring Boot** (PO đã chốt) — PDF liệt kê chung "C/C++, Python, Go" nhưng chọn Java để nhất quán với các trang FE đã viết (RESTful API, CSDL đều giả định BE là Java/Spring).
> Logic phân vùng: HYBRID — như FE, PDF chỉ tả 2 mốc (Entry, Experienced); tự nội suy 3 vùng Ex·V1-V3 tăng dần tới đúng năng lực "Experienced" mà PDF mô tả.
> Trạng thái: chờ PO duyệt/chỉnh.

## Thang cấp độ (giữ nguyên, dùng chung toàn SkillPath)
① Nhập môn · ② Biết làm · ③ Thành thạo · ④ Chuyên sâu · `–` = chưa bắt buộc ở vùng này

## Bảng map

| Kỹ năng | Entry | Ex·V1 | Ex·V2 | Ex·V3 |
|---|:--:|:--:|:--:|:--:|
| **Quy trình & tư duy hệ thống** | | | | |
| Quy trình PTPM (Agile/Scrum) | ① | ② | ② | ③ |
| Đọc hiểu & soi lỗi tài liệu giải pháp | ① | ② | ② | ③ |
| Lập trình an toàn (secure coding) | ① | ② | ② | ③ |
| **Lõi Back-end** | | | | |
| Java (ngôn ngữ lập trình) | ② | ③ | ③ | ④ |
| OOP / Design Pattern / Algorithm / Data Structure | ① | ② | ② | ③ |
| Cơ sở dữ liệu (SQL & NoSQL) — thiết kế & tối ưu | ① | ② | ③ | ④ |
| **Kỹ thuật nâng cao BE** | | | | |
| Lập trình đa luồng (multithreading/concurrency) | ① | ② | ③ | ③ |
| Unit test | ① | ② | ② | ② |
| Hệ điều hành & I/O | ① | ② | ② | ② |
| **Nền tảng mạng & hệ thống** | | | | |
| Mạng máy tính (giao thức, mã hoá, đa kết nối) | – | ① | ② | ② |
| Web server / microservices cơ bản | – | ① | ① | ② |
| **Công cụ & vận hành** | | | | |
| Git/SVN | ① | ② | ② | ② |
| IDE & debug code | ① | ① | ② | ② |
| Phân tích log / debug | – | ① | ① | ② |
| Docker (đóng gói ứng dụng) | – | ① | ② | ② |
| CI/CD | – | ① | ② | ② |

## Số kỹ năng mỗi trang
- Entry: 10 (nền cơ bản — trùng nhiều với FE ở nhóm "Quy trình", khác hẳn ở "Lõi Back-end")
- Ex·V1: +5 = Mạng, Web server/microservices, Phân tích log, Docker, CI/CD
- Ex·V2: nâng cấp độ hàng loạt (CSDL →③, đa luồng →③, Git/debug/log →②)
- Ex·V3: đỉnh Entry→Experienced — Java + CSDL chạm ④ (2 kỹ năng lõi nhất của BE), phần lớn còn lại ③

## Điểm khác biệt so với FE (đáng chú ý)
1. **CSDL đạt ④ ngay ở Ex·V3** (FE chỉ ②) — đúng bản chất BE: PDF liệt kê "thiết kế index, partition, tối ưu SQL, view/stored procedure/trigger, phân biệt clustered/non-clustered index" đã ở mức Experienced, sâu hơn hẳn CSDL của FE.
2. **Đa luồng/concurrency là kỹ năng mới hoàn toàn** — FE không có, BE có ngay từ Entry (PDF nhấn mạnh Thread/Lock/Async-sync xuyên suốt mọi level).
3. **Hệ điều hành & I/O** — cũng là kỹ năng mới, BE cần hiểu sâu hơn tầng dưới so với FE.
4. **KHÔNG có "UX/UI"** — BE không chạm giao diện, nhóm "Lõi Front-end" của FE không áp dụng.
5. Framework/ngôn ngữ: FE có 1 dòng "Framework FE" tách biệt "HTML/CSS/JS"; BE gộp thành 1 dòng "Java" duy nhất (PDF không tách ngôn ngữ core vs framework như FE).

## Cần PO chốt
1. Đồng ý cấu trúc 5 nhóm + 16 kỹ năng như trên chứ?
2. Ví dụ code sẽ dùng Java/Spring Boot thuần (Controller/Service/Repository/JPA) — có cần Spring Cloud/microservices ví dụ phức tạp hơn không, hay giữ đơn giản cho Entry→Experienced?
