# BỘ KỊCH BẢN KIỂM THỬ (TEST CASES)

**Dự án:** Website bán vé xem phim CineGo  
**Sinh viên:** Lê Trung Bảo Long  
**MSSV:** TD01606

| Test Case ID | Chức năng | Mô tả ca kiểm thử | Loại test | Các bước thực hiện | Dữ liệu kiểm thử | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|---|---|---|
| TC_AUTH_01 | Login | Đăng nhập thành công | Positive | 1. Mở trang Login. 2. Nhập username. 3. Nhập password. 4. Bấm Đăng nhập. | Tài khoản hợp lệ | Đăng nhập thành công và chuyển đến trang chủ. | Not Run |
| TC_AUTH_02 | Login | Đăng nhập thất bại khi bỏ trống mật khẩu | Negative | 1. Mở trang Login. 2. Nhập username. 3. Để trống password. 4. Bấm Đăng nhập. | Username hợp lệ, password trống | Hiển thị thông báo lỗi. | Not Run |
| TC_AUTH_03 | Register | Đăng ký tài khoản thành công | Positive | 1. Mở trang đăng ký. 2. Nhập thông tin hợp lệ. 3. Bấm Đăng ký. | Thông tin tài khoản mới | Tạo tài khoản thành công. | Not Run |
| TC_AUTH_04 | Register | Đăng ký thất bại khi bỏ trống thông tin | Negative | 1. Mở trang đăng ký. 2. Bỏ trống trường bắt buộc. 3. Bấm Đăng ký. | Thông tin thiếu | Hiển thị thông báo yêu cầu nhập đầy đủ thông tin. | Not Run |
| TC_MOVIE_01 | Movie | Xem danh sách phim | Positive | 1. Mở trang chủ CineGo. 2. Quan sát danh sách phim. | Không cần | Danh sách phim được hiển thị. | Not Run |
| TC_BOOKING_01 | Booking | Đặt vé xem phim thành công | Positive | 1. Chọn phim. 2. Chọn suất chiếu. 3. Chọn ghế. 4. Xác nhận đặt vé. | Phim và suất chiếu hợp lệ | Đặt vé thành công. | Not Run |
| TC_CRUD_01 | Movie Management | Thêm phim mới | Positive | 1. Đăng nhập Admin. 2. Mở quản lý phim. 3. Nhập thông tin phim. 4. Bấm Lưu. | Thông tin phim hợp lệ | Phim mới được thêm vào danh sách. | Not Run |
| TC_CRUD_02 | Movie Management | Thêm phim thất bại khi thiếu thông tin | Negative | 1. Đăng nhập Admin. 2. Mở form thêm phim. 3. Bỏ trống trường bắt buộc. 4. Bấm Lưu. | Thông tin thiếu | Hiển thị lỗi validation. | Not Run |