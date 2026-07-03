# Quy trình phát triển phần mềm (Agile/Scrum)

**Định nghĩa.** **Agile** là triết lý phát triển phần mềm theo từng đợt ngắn (**sprint**), làm xong một phần nhỏ thì demo và điều chỉnh ngay, thay vì làm xong hết mới cho xem. **Scrum** là khuôn khổ (framework) phổ biến nhất để áp dụng Agile: chia công việc thành sprint 1-2 tuần, có các buổi *daily* (đồng bộ tiến độ), *planning* (lên kế hoạch sprint), *review/demo* (cho xem kết quả), *retro* (rút kinh nghiệm). Với Tester, hiểu quy trình này quyết định **khi nào kiểm thử cái gì** — không phải đợi hết dự án mới test.

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Biết được dự án đang chạy theo sprint nào, tham gia daily để báo cáo tiến độ kiểm thử của mình, hiểu khái niệm *user story* và *acceptance criteria* (tiêu chí chấp nhận) là thứ mình sẽ đối chiếu khi test.

**Ví dụ thực tế.** Dự án xây **hệ thống giám sát an ninh mạng nội bộ** chạy sprint 2 tuần. Bạn được giao test tính năng "Cảnh báo đăng nhập bất thường" — bạn đọc user story, thấy acceptance criteria ghi: "Hệ thống phải gửi cảnh báo trong vòng 5 giây nếu phát hiện 5 lần đăng nhập sai liên tiếp từ cùng 1 IP". Đây chính là thứ bạn sẽ kiểm tra, không phải đoán thêm yêu cầu ngoài đó.

**Vì sao là mức ①:** biết đọc và bám theo quy trình có sẵn, chưa cần tự tổ chức hay đề xuất cải tiến gì.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** nắm vững quy trình đủ để **chủ động lên kế hoạch kiểm thử khớp với nhịp sprint**, không chỉ chạy theo — biết ước lượng việc test của mình có kịp trong sprint không và báo sớm nếu không kịp, thay vì im lặng tới hạn mới báo.

**Ví dụ thực tế.** Sprint có 3 tính năng mới cho hệ thống giám sát: cảnh báo đăng nhập bất thường, dashboard thống kê, và export báo cáo PDF. Bạn nhận ra tính năng export PDF được giao code chậm (còn 2 ngày cuối sprint mới xong), nên chủ động báo với Scrum Master từ giữa sprint: "Nếu code xong đúng kế hoạch, em chỉ có nửa ngày để test — không đủ cho một tính năng liên quan tới dữ liệu nhạy cảm, cần dời sang sprint sau hoặc ưu tiên code sớm hơn."

**Vì sao là mức ②:** không chỉ theo quy trình mà chủ động quản lý rủi ro tiến độ liên quan tới kiểm thử.
