# ĐẶC TẢ NGHIỆP VỤ WEB CÁ NHÂN (SPECIFICATIONS)
> *Dùng làm ngữ cảnh (Context) gửi cho AI để sinh Test Plan & Test Case chính xác theo dự án riêng của bạn.*

---

## 1. THÔNG TIN DỰ ÁN
* **Tên đề tài:** [Ví dụ: Website Bán Hàng Trực Tuyến]
* **Công nghệ:** Java 17, Spring Boot, MySQL / H2
* **URL chạy local:** `http://localhost:8080`

## 2. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)
* **Chức năng Đăng ký:** Form gồm `username` (5-20 ký tự), `email`, `password` (tối thiểu 8 ký tự, có ký tự đặc biệt), `confirmPassword`.
* **Chức năng Đăng nhập:** Kiểm tra đúng tài khoản/mật khẩu $\rightarrow$ chuyển hướng về trang chủ; sai $\rightarrow$ báo lỗi.
* **Chức năng CRUD kiểm thử (Ví dụ: Sản phẩm):**
  * Thêm mới: Tên sản phẩm (bắt buộc, không trùng), Giá bán (> 0), Số lượng (>= 0).
  * Sửa / Xóa: Có xác nhận trước khi xóa, cập nhật dữ liệu vào DB.

## 1. Danh sách các màn hình và URL
* **Trang Đăng nhập (/login):** Cho phép người dùng nhập Email/Username và Mật khẩu để truy cập hệ thống.
* **Trang Đăng ký (/register):** Cho phép người dùng tạo tài khoản mới với các thông tin cá nhân.
* **Trang Quản lý sản phẩm (/products):** Hiển thị danh sách sản phẩm, cho phép Thêm, Sửa, Xóa sản phẩm.

## 2. Ràng buộc dữ liệu & Validation
* **Form Đăng nhập:**
  * Email: Phải đúng định dạng email (có chứa `@`, kết thúc bằng đuôi hợp lệ), không được để trống, tối đa 50 ký tự.
  * Mật khẩu: Từ 6 đến 30 ký tự, không chứa khoảng trắng.
* **Form Quản lý sản phẩm (Thêm/Sửa):**
  * Tên sản phẩm: Không được để trống, từ 3 đến 100 ký tự.
  * Giá sản phẩm (Price): Phải là số thực lớn hơn 0 ($Price > 0$).
  * Số lượng tồn kho (Stock): Phải là số nguyên lớn hơn hoặc bằng 0 ($Stock \ge 0$).