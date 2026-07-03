# Xây dựng tài liệu chỉ tiêu kỹ thuật dự án/sản phẩm

**Định nghĩa.** **Chỉ tiêu kỹ thuật** là tài liệu tổng hợp các yêu cầu **phi chức năng** (non-functional requirements — hệ thống phải *nhanh/chịu tải/an toàn* cỡ nào, khác với yêu cầu chức năng *làm được gì*) ở tầm dự án/sản phẩm. Khác PTYC (mô tả một tính năng), tài liệu này bao quát cả sản phẩm. Vai của BA: **dịch nhu cầu nghiệp vụ thành con số kiểm chứng được** — "cảnh báo phải nhanh" là mong muốn; "cảnh báo mức Cao tới tay người trực trong 30 giây, đo từ lúc IDS phát hiện" mới là chỉ tiêu.

## ▸ Senior·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Đóng góp phần chỉ tiêu thuộc mảng nghiệp vụ mình nắm, dưới sự dẫn dắt của người chủ trì — và mỗi con số đưa ra đều có **căn cứ nghiệp vụ**, không bốc thuốc.

**Tình huống thực tế — đóng góp mục "thời gian phản hồi" cho tài liệu chỉ tiêu.** Kiến trúc sư chủ trì tài liệu hỏi bạn: "nghiệp vụ cần nhanh cỡ nào?" Bạn không trả lời "càng nhanh càng tốt" mà đưa bảng có căn cứ:

```
CHỈ TIÊU THỜI GIAN (phần đóng góp của BA — kèm căn cứ)

  Chỉ tiêu                       | Con số  | Căn cứ nghiệp vụ
  -------------------------------|---------|---------------------------
  Cảnh báo Cao tới người trực    | ≤ 30s   | Cam kết nội bộ phản ứng
  (từ lúc IDS phát hiện)         |         | 15 phút; 30s chỉ chiếm 3%
                                 |         | ngân sách thời gian đó
  Dashboard tải lần đầu          | ≤ 3s    | Người trực mở khi có chuông
                                 |         | — đang gấp
  Tra cứu lịch sử 12 tháng       | ≤ 15s   | Dùng khi điều tra (không
                                 |         | gấp như phản ứng) — đổi lấy
                                 |         | chi phí lưu trữ rẻ hơn
```

Dòng 3 thể hiện đúng vai BA: bạn **chấp nhận chậm ở chỗ nghiệp vụ không cần nhanh** — giúp kiến trúc sư khỏi tối ưu (tốn tiền) nhầm chỗ.

**Vì sao là mức ①:** đóng góp phần của mình với căn cứ nghiệp vụ rõ; chưa chủ trì cả mảng chỉ tiêu nghiệp vụ của sản phẩm.

## ▸ Senior·V2 — ② Biết làm
**Khác V1:** **chủ trì toàn bộ phần chỉ tiêu gắn với nghiệp vụ** của sản phẩm — tự xác định danh mục chỉ tiêu nào cần có, lấy số từ đâu, và bảo vệ được từng con số trước cả khách hàng lẫn Dev.

**Tình huống thực tế — chủ trì phần chỉ tiêu nghiệp vụ cho tài liệu kỹ thuật tổng thể.** Sản phẩm giám sát chuẩn bị mở rộng cho công ty thành viên dùng chung — cần bộ chỉ tiêu chính thức. Bạn chủ trì phần nghiệp vụ với cách lấy số bài bản:

```
KHUNG CHỈ TIÊU NGHIỆP VỤ (bạn chủ trì — trích)

1. NĂNG LỰC XỬ LÝ (lấy số từ dữ liệu thật + hệ số tăng trưởng)
   - Nguồn log đồng thời: hiện 45 → chỉ tiêu 120 (kế hoạch mở rộng
     2 công ty thành viên năm tới ×2, thêm dự phòng 30%)
   - Đỉnh cảnh báo: đo được 87 sự cố/ngày đợt tấn công 12/05
     → chỉ tiêu chịu được 300/ngày không nghẽn (kịch bản 2 công ty
     cùng bị chiến dịch quét diện rộng)
2. LƯU TRỮ & TRUY VẾT (lấy số từ quy định)
   - Log gốc giữ 12 tháng ONLINE + 24 tháng lưu kho — theo quy định
     lưu vết điều tra nội bộ (văn bản QĐ-047)
3. AN TOÀN DỮ LIỆU (lấy số từ phân loại nhạy cảm)
   - Dữ liệu nhạy cảm (bản đầy đủ) chỉ vai An ninh; mọi truy cập
     được ghi vết — phục vụ chính audit của sản phẩm audit này

MỖI CHỈ TIÊU CÓ 3 CỘT BẮT BUỘC: con số | căn cứ | CÁCH ĐO khi nghiệm thu
```

Cột "cách đo khi nghiệm thu" là đóng góp khôn nhất: chỉ tiêu không có cách đo là mầm tranh cãi lúc nghiệm thu ("thế nào là *chịu được* 300/ngày?"). Bạn chốt luôn kịch bản đo — Tester dùng lại được nguyên văn.

**Vì sao là mức ②:** chủ trì cả mảng chỉ tiêu nghiệp vụ với phương pháp lấy số minh bạch (dữ liệu thật/quy định/kế hoạch) và cách đo đi kèm — chỉ tiêu thành hợp đồng kiểm chứng được, không phải danh sách ước muốn.
