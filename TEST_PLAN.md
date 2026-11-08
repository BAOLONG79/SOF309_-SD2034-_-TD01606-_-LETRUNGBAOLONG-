# KẾ HOẠCH KIỂM THỬ (TEST PLAN)

**Dự án:** Website bán vé xem phim CineGo  
**Sinh viên:** Lê Trung Bảo Long  
**MSSV:** TD01606  
**Môn học:** SOF309 – AI Driven Test Automation

---

## 1. MỤC TIÊU KIỂM THỬ

- Kiểm thử logic Backend bằng JUnit 5 cho Controller.
- Kiểm thử giao diện tự động bằng Selenium WebDriver.
- Kiểm tra các chức năng chính của Website CineGo.
- Tích hợp kiểm thử tự động với GitHub Actions CI/CD.
- Phát hiện lỗi và đảm bảo các chức năng hoạt động đúng yêu cầu.

## 2. PHẠM VI KIỂM THỬ

**In-Scope:**
- Đăng ký tài khoản.
- Đăng nhập.
- Quản lý thông tin tài khoản.
- Xem danh sách phim.
- Đặt vé xem phim.
- Quản lý phim và tài khoản.
- Kiểm thử Controller bằng JUnit.
- Kiểm thử giao diện bằng Selenium.

**Out-of-Scope:**
- Kiểm thử hiệu năng chuyên sâu.
- Kiểm thử bảo mật chuyên sâu.
- Kiểm thử tải hệ thống với số lượng người dùng lớn.

## 3. PHƯƠNG PHÁP KIỂM THỬ

- Unit Testing: Sử dụng JUnit 5.
- UI Automation Testing: Sử dụng Selenium WebDriver.
- Continuous Integration: Sử dụng GitHub Actions.
- Kiểm thử chức năng theo các Test Case đã xây dựng.

## 4. TIÊU CHÍ HOÀN THÀNH

- Các Test Case được thực thi và ghi nhận kết quả.
- Không có lỗi nghiêm trọng chưa được xử lý.
- JUnit Test chạy thành công.
- Selenium UI Test được thực thi và ghi nhận kết quả.
- GitHub Actions chạy thành công.

## 5. MÔI TRƯỜNG KIỂM THỬ

- Hệ điều hành: Windows.
- IDE: Eclipse.
- Ngôn ngữ lập trình: Java.
- Công cụ kiểm thử: JUnit 5, Selenium WebDriver.
- Công cụ quản lý mã nguồn: Git, GitHub.
- Công cụ tự động hóa: Maven, GitHub Actions.

## 6. KẾT LUẬN

Kế hoạch kiểm thử được xây dựng nhằm kiểm tra các chức năng chính của Website CineGo, đảm bảo chất lượng phần mềm thông qua kiểm thử tự động và tích hợp CI/CD.