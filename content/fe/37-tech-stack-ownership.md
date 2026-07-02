# Sở hữu Technology Stack của đơn vị

**Định nghĩa.** Chịu trách nhiệm về toàn bộ công nghệ/framework/nền tảng mà đơn vị dùng để tạo ra sản phẩm — không chỉ dùng thành thạo, mà **hiểu rõ vì sao** mỗi công nghệ được chọn, và có tiếng nói quyết định khi thêm/bớt/nâng cấp công nghệ trong tech stack đó.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm rõ và giải thích được toàn bộ tech stack hiện tại của đơn vị (không chỉ phần mình trực tiếp code) — vì sao mỗi công nghệ được chọn, không chỉ "nó đang được dùng".

**Ví dụ thực tế — giải thích tech stack cho một Senior mới chuyển sang đơn vị.**
```
Front-end: Angular (không phải React) — vì team có sẵn kinh nghiệm Angular từ 2019,
           chi phí chuyển đổi toàn bộ codebase cũ không đáng so với lợi ích React mang lại.
Back-end: Java/Spring Boot — chuẩn chung của tập đoàn, dễ luân chuyển nhân sự giữa các đơn vị.
CSDL: PostgreSQL — hỗ trợ tốt cả quan hệ lẫn JSON (jsonb), đủ dùng mà không cần thêm NoSQL riêng.
CI/CD: GitHub Actions — đơn vị đã dùng GitHub cho toàn bộ code, không cần thêm công cụ CI riêng.
```
Bạn giải thích được **lý do lịch sử/thực tế** đằng sau mỗi lựa chọn (không phải "vì nó tốt nhất") — giúp người mới hiểu bối cảnh thay vì thắc mắc "sao không dùng X mới hơn" mà không biết đã có cân nhắc từ trước.

**Vì sao là mức ①:** bạn nắm và truyền đạt được bức tranh tech stack hiện tại — chưa tự ra quyết định thay đổi tech stack hay chịu trách nhiệm hậu quả của quyết định đó.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự ra quyết định **thêm một công nghệ mới** vào tech stack chính thức của đơn vị, chịu trách nhiệm về hệ quả lâu dài của quyết định đó.

**Ví dụ thực tế — quyết định thêm Redis vào tech stack chính thức, không chỉ dùng thử một dự án.**
```
Đề xuất: thêm Redis vào tech stack chính thức cho mọi dự án cần cache.

Trách nhiệm đi kèm quyết định (không chỉ "chọn công nghệ hay"):
- Viết hướng dẫn dùng Redis đúng cách cho các team (cache-aside pattern, TTL hợp lý).
- Đảm bảo có ai đó chịu trách nhiệm vận hành Redis lâu dài (backup, giám sát,
  nâng cấp version) — không phải "thêm vào rồi bỏ đó".
- Cân nhắc: thêm 1 công nghệ mới = thêm 1 thứ mọi dev phải học, thêm 1 thứ vận
  hành phải theo dõi — CHỈ thêm khi lợi ích rõ ràng vượt chi phí duy trì lâu dài.
```
Bạn không chỉ "chọn công nghệ tốt" mà chịu trách nhiệm về **toàn bộ vòng đời** của quyết định đó trong tech stack — bao gồm cả phần ít hào hứng (vận hành, đào tạo) chứ không chỉ phần chọn công nghệ mới.

**Vì sao là mức ②:** bạn tự ra quyết định và chịu trách nhiệm thêm công nghệ mới vào tech stack chính thức — không chỉ giải thích tech stack đã có sẵn.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** chịu trách nhiệm về **lộ trình dài hạn** của cả tech stack (3-5 năm tới), không chỉ quyết định thêm/bớt một công nghệ đơn lẻ.

**Ví dụ thực tế — lộ trình dài hạn khi một công nghệ cốt lõi sắp hết hỗ trợ.** Framework FE hiện tại (một phiên bản Angular cũ) sẽ hết hỗ trợ bảo mật chính thức trong 2 năm tới. Bạn không đợi tới lúc hết hỗ trợ mới xử lý — mà lập lộ trình dài hạn:
```
Năm 1: nâng cấp dần các dự án còn dùng version cũ nhất lên version gần nhất được hỗ trợ,
       ưu tiên dự án có rủi ro bảo mật cao nhất trước (dự án chạm dữ liệu nhạy cảm).
Năm 2: mọi dự án đạt version tối thiểu được hỗ trợ; đánh giá lại liệu có nên tiếp
       tục theo Angular hay cân nhắc hướng khác cho dự án mới, dựa trên xu hướng
       thị trường và năng lực đội ngũ lúc đó.
```
Bạn chịu trách nhiệm về sức khoẻ tech stack không chỉ hôm nay mà cả **những năm tới** — tránh tình trạng cả đơn vị dùng công nghệ đã hết hỗ trợ mà không ai lường trước.

**Vì sao là mức ④:** bạn sở hữu và định hướng được tech stack ở tầm chiến lược dài hạn — mức cao nhất, đúng bản chất "chịu trách nhiệm về Technology Stack của đơn vị" mà career-path Specialist nhấn mạnh.
