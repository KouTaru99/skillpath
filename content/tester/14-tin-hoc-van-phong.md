# Tin học văn phòng

**Định nghĩa.** Kỹ năng dùng thành thạo Excel/Sheets, Word/Docs để tổng hợp kết quả kiểm thử, làm báo cáo, quản lý danh sách test case — công việc nền tảng nhưng chiếm nhiều thời gian thực tế của Tester, đặc biệt lúc báo cáo tiến độ. Nghe "phổ thông" nhưng dùng khéo (công thức tự động, biểu đồ) thì tiết kiệm hàng giờ và làm báo cáo đáng tin hơn hẳn đếm tay.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Dùng Excel lập bảng test case, theo dõi trạng thái Pass/Fail, và làm báo cáo tổng hợp bằng công thức tự động thay vì đếm tay (đếm tay dễ sai và không cập nhật kịp).

**Tình huống thực tế — bảng theo dõi test sprint tự tính, tự cảnh báo.** Bạn dựng bảng dùng công thức để con số luôn đúng khi cập nhật trạng thái:

```
BẢNG THEO DÕI KIỂM THỬ — Sprint 12 (hệ thống giám sát ANM)

  Tính năng                    | Tổng | Pass | Fail | Blocked | % Pass
  -----------------------------|------|------|------|---------|-------
  Cảnh báo đăng nhập bất thường| 12   | 10   | 2    | 0       | 83%
  Export báo cáo PDF           | 8    | 8    | 0    | 0       | 100%
  Tương quan cảnh báo          | 15   | 9    | 1    | 5       | 60%
  -----------------------------|------|------|------|---------|-------
  TỔNG                         | 35   | 27   | 3    | 5       | 77%

  Công thức dùng (không đếm tay):
    Pass  = COUNTIF(dải_trạng_thái, "Pass")
    %Pass = Pass / Tổng   (định dạng %)
    Tô đỏ tự động dòng có Blocked > 0  (Conditional Formatting)
```

Cột "Blocked" tô đỏ tự động là chi tiết đáng giá: 5 case của "Tương quan cảnh báo" bị chặn (chưa test được vì phụ thuộc chưa xong) nổi bật ngay trong báo cáo — Scrum Master nhìn phát thấy điểm tắc, không bị con số %Pass che mất.

**Vì sao là mức ①:** dùng thành thạo công cụ văn phòng để tổng hợp và báo cáo rõ ràng, tự động — nền tảng phục vụ mọi việc báo cáo của Tester ở mọi level.
