# Mô hình hoá bằng sơ đồ tư duy (Mind mapping)

**Định nghĩa.** Kỹ năng mới ở Specialist — dùng **sơ đồ tư duy** (mind map) để mô hình hoá ý tưởng/mối quan hệ phức tạp một cách trực quan: một chủ đề trung tâm toả nhánh ra các khía cạnh, mỗi nhánh lại toả tiếp. Chỗ đứng của nó trong hộp đồ nghề BA: **dùng khi bài toán còn mù mờ** — chưa biết có những khía cạnh nào — khác BPMN/UML vốn dùng khi luồng đã tương đối rõ. Mind map là công cụ *khám phá*, BPMN là công cụ *đặc tả*; dùng nhầm chỗ (đặc tả bằng mind map, khám phá bằng BPMN) đều khổ.

## ▸ Specialist·V1 — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dùng mind map để hệ thống hoá toàn cảnh một bài toán mới trước khi phân tích chi tiết — chống bỏ sót khía cạnh.

**Tình huống thực tế — mở bài toán "Threat Intelligence" bằng mind map.** Tính năng hoàn toàn mới, chưa ai trong team biết nó gồm những gì. Trước khi viết bất kỳ PTYC nào, bạn dành 1 giờ vẽ:

```
                        ┌─ Nguồn feed: AbuseIPDB? OTX? trả phí?
          ┌─ DỮ LIỆU ───┼─ Tần suất cập nhật? (giờ/ngày)
          │             └─ Độ tin cậy nguồn — ai thẩm định?
          │             ┌─ Đối chiếu lúc nào: real-time hay batch?
THREAT ───┼─ XỬ LÝ ─────┼─ IP khớp danh sách đen → làm gì?
INTEL     │             └─ Cache — nguồn ngoài sập thì sao?
          │             ┌─ Hiện nhãn "TI xác nhận" ở đâu?
          ├─ NGƯỜI DÙNG ┼─ Ai được cấu hình nguồn feed?
          │             └─ Có cần giải thích "vì sao IP này đen"?
          └─ VẬN HÀNH ──┬─ Hiệu năng: +1 lượt tra/cảnh báo?
                        ├─ Giới hạn 1.000 truy vấn/ngày của bản free
                        └─ Chi phí license khi vượt
```

Nhánh "VẬN HÀNH" là thứ suýt bị bỏ sót nếu đi thẳng vào viết tài liệu — và về sau chính giới hạn 1.000 truy vấn/ngày quyết định kiến trúc phải có cache.

**Vì sao là mức ①:** dùng mind map cá nhân để khám phá đủ khía cạnh một bài toán cụ thể; chưa dùng để dẫn dắt nhóm đông người.

## ▸ Specialist·V2 — ② Biết làm
**Khác V1:** dùng mind map **dẫn dắt buổi brainstorm nhiều bên** — vẽ real-time trên màn chia sẻ, gom ý kiến tản mạn vào cấu trúc, và biết "lái" khi các nhánh mọc lệch trọng tâm.

**Tình huống thực tế — điều phối buổi brainstorm định hướng sản phẩm 2 năm với 3 nhóm.** Đội An ninh, đội IT và ban lãnh đạo cùng ngồi — mỗi nhóm một mối quan tâm, nói chuyện dễ dẫm chân nhau. Bạn mở mind map trên màn hình chung và điều phối theo kỹ thuật:

```
KỸ THUẬT DẪN DẮT BẠN DÙNG:
1. KHUNG TRƯỚC, Ý SAU   Vẽ sẵn 4 nhánh trống: Phát hiện / Phản ứng /
                        Tuân thủ / Vận hành — ý kiến nào ném ra cũng
                        có chỗ treo, không trôi mất.
2. GHI NGAY, CÃI SAU    Mọi ý đều lên map trước (kể cả ý "dở") —
                        người góp ý thấy mình được ghi nhận, không
                        phòng thủ; lọc để vòng sau.
3. NHÁNH PHÌNH = TÍN HIỆU  Nhánh "Phản ứng" phình gấp 3 nhánh khác
                        sau 30 phút → bạn chỉ vào map: "cả phòng đang
                        dồn quan tâm vào đây — mình đào tiếp chỗ này?"
                        Cả 3 nhóm gật — sự đồng thuận NHÌN THẤY ĐƯỢC.
4. ĐÁNH DẤU NÓNG        ⭐ = nhiều bên cùng nêu · ⚡ = có xung đột
                        (IT muốn tự động, An ninh muốn người duyệt)
                        → danh sách ⚡ thành agenda buổi làm việc sau.
```

Kết thúc 2 tiếng: một bức map 60 nút thay cho biên bản 5 trang không ai đọc — và quan trọng hơn, 3 nhóm lần đầu **nhìn thấy mối quan tâm của nhau** trên cùng một hình.

**Vì sao là mức ②:** mind map thành công cụ điều phối tập thể — cấu trúc hoá buổi họp nhiều bên, làm lộ đồng thuận/xung đột; không chỉ là sơ đồ cá nhân.

## ▸ Specialist·V3 — ④ Chuyên sâu
**Khác V2:** sản phẩm mind map trở thành **tài liệu chiến lược chính thức** — được cấp lãnh đạo dùng để ra quyết định ngân sách/lộ trình, có phiên bản, có chủ sở hữu, được cập nhật theo nhịp.

**Tình huống thực tế — bản đồ chiến lược sản phẩm 3 năm sống bằng mind map.** Sau chuỗi brainstorm, bạn chưng cất thành "bản đồ chiến lược" một trang — mind map 3 vòng: vòng trong (năm 1 — cam kết), vòng giữa (năm 2 — định hướng), vòng ngoài (năm 3 — thăm dò):

```
CÁCH BẠN VẬN HÀNH BẢN ĐỒ NHƯ MỘT TÀI LIỆU SỐNG:
- Mỗi nút năm-1 gắn: chủ trì + quý dự kiến + trạng thái màu
  (xanh đang chạy / vàng lệch / đỏ tắc)
- Họp quý với lãnh đạo: chỉ rà CÁC NÚT ĐỔI MÀU — 30 phút thay vì
  2 tiếng đọc báo cáo; quyết định "đẩy nút vòng ngoài vào trong"
  (thăng cấp đầu tư) hay ngược lại đều đánh dấu ngay trên map.
- Phiên bản hoá: map v3.2 được đính kèm tờ trình ngân sách năm —
  hội đồng duyệt ngân sách đọc bản đồ này TRƯỚC KHI đọc bảng số.
```

Có lần hội đồng cắt 20% ngân sách — thay vì làm lại tờ trình 2 tuần, bạn mở map ngay trong phòng họp, kéo 2 nút từ vòng trong ra vòng giữa trước mặt mọi người, cả hội đồng thấy ngay "cắt 20% nghĩa là mất cái gì". Quyết định chốt trong buổi đó. Đấy là lúc mind map vượt vai công cụ vẽ: nó là **ngôn ngữ ra quyết định chung** giữa bạn và cấp cao nhất.

**Vì sao là mức ④:** sản phẩm mind map có vòng đời, chủ sở hữu và vai trò chính thức trong quyết định ngân sách/chiến lược của đơn vị — đỉnh của kỹ năng là khi công cụ cá nhân trở thành hạ tầng ra quyết định của tổ chức. (Thang vùng này ①→②→④ — không có mốc ③ vì đây là vùng cuối của toàn thang.)
