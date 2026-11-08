# Nhật ký AI · Thiết kế kiểm thử CineGo

SOF309 · Lê Trung Bảo Long · TD01606 · 08/11/2026

## Ngữ cảnh
Đưa đặc tả dự án CineGo vào ngữ cảnh của AI. Đối chiếu với RegisterServlet, LoginServlet, MovieServlet, BookingServlet, AuthFilter, SecurityFilter, DAO và biểu mẫu JSP.

## Prompt
Bạn là QA Lead. Dựa trên đặc tả CineGo được cung cấp, thiết kế Test Plan và Test Case cho đăng ký, đăng nhập, phân quyền và quản lý phim/đặt vé. Áp dụng phân vùng tương đương và phân tích giá trị biên. Tách yêu cầu HTTP của Controller khỏi thao tác giao diện. Ghi rõ tên trường, URL, CSRF, vai trò, kết quả mong đợi, chuyển hướng và cách kiểm tra dữ liệu sau khi thêm, sửa hoặc xóa. Phân biệt ca đã thực hiện với ca được thiết kế.

## Đối chiếu đầu ra
* Đã ghi kế hoạch và ca kiểm thử theo route thật của dự án.
* Bổ sung biên mật khẩu, định dạng email và kiểm tra ràng buộc giá vé, thời lượng phim.
* Dùng thao tác ngừng chiếu/xóa logic cho phim. Kiểm tra phân quyền Admin và User thông thường.