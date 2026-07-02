# Sở hữu Technology Stack của đơn vị

**Định nghĩa.** Chịu trách nhiệm về toàn bộ công nghệ/framework mà đơn vị dùng để tạo ra sản phẩm — hiểu rõ vì sao mỗi công nghệ được chọn, có tiếng nói quyết định khi thêm/bớt/nâng cấp.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Nắm rõ và giải thích được toàn bộ tech stack hiện tại của đơn vị, vì sao mỗi công nghệ được chọn.

**Ví dụ thực tế — giải thích tech stack cho một Senior mới chuyển sang đơn vị.**
```
Back-end: Java/Spring Boot — chuẩn chung tập đoàn, dễ luân chuyển nhân sự.
CSDL: PostgreSQL — hỗ trợ tốt cả quan hệ lẫn JSON (jsonb), đủ dùng không cần thêm NoSQL riêng.
Container: Docker + Kubernetes — chuẩn hoá triển khai giữa các đội.
```
Bạn giải thích được lý do thực tế đằng sau mỗi lựa chọn, giúp người mới hiểu bối cảnh thay vì thắc mắc "sao không dùng X mới hơn".

**Vì sao là mức ①:** nắm và truyền đạt được bức tranh tech stack hiện tại — chưa tự ra quyết định thay đổi tech stack.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** tự ra quyết định thêm một công nghệ mới vào tech stack chính thức, chịu trách nhiệm hệ quả lâu dài.

**Ví dụ thực tế — quyết định thêm Redis vào tech stack chính thức.** Không chỉ chọn công nghệ tốt — bạn viết hướng dẫn dùng đúng cách (cache-aside pattern, TTL hợp lý), đảm bảo có người chịu trách nhiệm vận hành lâu dài, cân nhắc thêm 1 công nghệ = thêm 1 thứ mọi dev phải học và vận hành phải theo dõi.

**Vì sao là mức ②:** bạn tự ra quyết định và chịu trách nhiệm thêm công nghệ mới vào tech stack chính thức.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** chịu trách nhiệm về lộ trình dài hạn (3-5 năm) của cả tech stack, không chỉ quyết định thêm/bớt một công nghệ đơn lẻ.

**Ví dụ thực tế — lộ trình khi một phiên bản Java sắp hết hỗ trợ bảo mật chính thức.** Bạn không đợi tới lúc hết hỗ trợ — lập lộ trình: Năm 1 nâng cấp dần các service dùng version cũ nhất, ưu tiên service chạm dữ liệu nhạy cảm; Năm 2 mọi service đạt version tối thiểu được hỗ trợ, đánh giá lại hướng đi cho dự án mới.

**Vì sao là mức ④:** bạn sở hữu và định hướng tech stack ở tầm chiến lược dài hạn.
