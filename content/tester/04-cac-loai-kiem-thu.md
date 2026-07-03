# Các loại kiểm thử

**Định nghĩa.** Phân loại kiểm thử theo **mục đích**: **kiểm thử chức năng** (functional — chạy đúng nghiệp vụ không), **kiểm thử liên quan tới thay đổi** gồm **kiểm thử xác nhận** (verification — bug vừa fix đã hết chưa) và **kiểm thử hồi quy** (regression — sửa chỗ này có làm vỡ chỗ khác không), **kiểm thử smoke** (test nhanh các luồng chính để xác nhận bản build "chạy được", trước khi test sâu). Ở mức cao hơn: **kiểm thử phi chức năng** (hiệu năng, bảo mật...), **kiểm thử thăm dò** (exploratory — không theo kịch bản có sẵn, chủ động khám phá) và **kiểm thử đoán lỗi** (error guessing — dựa kinh nghiệm đoán chỗ hay lỗi).

## ▸ Junior — ① Nhập môn
**Ở mức này bạn làm chủ được gì.** Phân biệt và thực hiện được kiểm thử chức năng, xác nhận/hồi quy, và smoke test.

**Ví dụ thực tế.** Bản build mới của hệ thống giám sát an ninh mạng vừa deploy lên môi trường test. Trước khi test sâu, bạn chạy **smoke test**: đăng nhập được, dashboard load được, danh sách cảnh báo hiện ra — nếu 1 trong số này fail thì báo ngay, không mất công test sâu trên 1 bản build hỏng. Sau đó dev báo đã fix bug "cảnh báo không gửi email", bạn làm **kiểm thử xác nhận** đúng case đó, rồi chạy thêm vài case liên quan (**hồi quy**) để chắc chắn fix không làm vỡ chức năng gửi email khác.

**Vì sao là mức ①:** phân biệt và áp dụng đúng loại kiểm thử cơ bản theo tình huống được giao.

## ▸ Ex·V2 — ② Biết làm
**Khác Junior:** biết thêm kiểm thử phi chức năng, thăm dò, đoán lỗi — và quan trọng hơn là biết **khi nào dùng loại nào**.

**Ví dụ thực tế.** Ngoài kịch bản có sẵn, bạn chủ động làm **kiểm thử thăm dò**: thử đăng nhập cùng lúc từ 2 trình duyệt khác nhau — phát hiện hệ thống cho phép 2 phiên đăng nhập song song dù tài liệu không nói rõ có nên chặn không. Đây là ví dụ **đoán lỗi** dựa kinh nghiệm: "hệ thống bảo mật thường hay quên chặn multi-session" — bạn thử trước khi ai yêu cầu, và phát hiện đúng 1 lỗ hổng thật.

**Vì sao là mức ②:** chủ động tìm lỗi ngoài kịch bản viết sẵn, không chỉ chạy đúng những gì được giao.
