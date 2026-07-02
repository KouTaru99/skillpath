# Review code (cho người khác)

**Định nghĩa.** Đọc code của người khác trước khi merge để tìm bug, vi phạm convention, hoặc chỗ khó bảo trì — phản hồi theo cách người nhận sửa được, không thấy bị công kích.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Review theo checklist có sẵn, tìm lỗi rõ ràng, viết comment mang tính xây dựng.

**Ví dụ thực tế — comment review đúng và đủ lịch sự.**
```java
// Code trong PR:
public Order getOrder(Long id) {
  return orderRepository.findById(id).get();   // .get() ném lỗi khó hiểu nếu rỗng
}
```
```
🔴 .get() trên Optional rỗng ném NoSuchElementException khó hiểu cho caller.
   Gợi ý: orElseThrow(() -> new OrderNotFoundException(id)) — lỗi rõ nghĩa hơn.
🟡 Nit: đặt tên biến rõ hơn — không blocking.
```
Phân loại mức độ (🔴 phải sửa / 🟡 gợi ý) giúp tác giả biết ưu tiên, kèm gợi ý cụ thể thay vì chỉ nói "sai rồi".

**Vì sao là mức ①:** review đúng chuẩn có sẵn và phản hồi xây dựng — chưa tự đặt chuẩn review mới.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** xử lý được khi hai reviewer bất đồng quan điểm, phân biệt được vấn đề thật với sở thích cá nhân.

**Tình huống thực tế — Reviewer A yêu cầu đổi mọi truy vấn sang dùng Stream API "vì hiện đại hơn". Reviewer B phản đối vì đoạn code đó dùng vòng lặp thường lại rõ ràng hơn.** Bạn phân xử: hỏi "vấn đề THẬT ở đây là gì — có bug hay chỉ là gu viết code?" Nếu code hiện tại đúng và dễ đọc, đây là khác biệt phong cách — không đáng chặn merge.

**Vì sao là mức ②:** bạn phân biệt được góp ý nào là vấn đề thật và góp ý nào chỉ là gu cá nhân.

## ▸ Senior·V3 — ③ Thành thạo
**Khác V2:** đặt ra checklist review chuẩn cho cả team, đúc kết từ lỗi hay lặp lại.

**Ví dụ thực tế — checklist rút ra sau khi 3 PR liên tiếp lọt cùng lỗi thiếu kiểm quyền backend.** Bạn viết thành checklist chính thức gắn vào template PR: "[ ] API xoá/sửa dữ liệu có kiểm quyền ở backend, không chỉ dựa vào FE?" — reviewer nào cũng thấy, không phụ thuộc trí nhớ một người.

**Vì sao là mức ③:** bạn biến kinh nghiệm cá nhân thành chuẩn chung cho cả team.

## ▸ Specialist·V2 — ④ Chuyên sâu
**Khác V3:** review ở tầm quyết định kiến trúc xuyên team/sản phẩm, không chỉ code của một PR.

**Ví dụ thực tế — review đề xuất kiến trúc của team khác, phát hiện rủi ro ảnh hưởng nhiều sản phẩm.** Team B đề xuất mỗi sản phẩm tự chọn message queue riêng "cho linh hoạt". Bạn chỉ ra rủi ro: 5 sản phẩm dùng 5 công nghệ queue khác nhau sẽ khiến dev khó chuyển đổi giữa team, không thể xây thư viện dùng chung. Đề xuất thống nhất một công nghệ, linh hoạt về cách tổ chức module.

**Vì sao là mức ④:** bạn review được cả quyết định kiến trúc ảnh hưởng nhiều team — mức cao nhất của kỹ năng này.
