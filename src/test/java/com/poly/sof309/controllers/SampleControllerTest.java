package com.poly.sof309.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * [Y3] UNIT TEST CHO LOGIC XÁC THỰC TRANG CINEGO
 */
public class SampleControllerTest {

    @Test
    @DisplayName("TC_AUTH_01: Kiểm tra đăng nhập với tài khoản Admin hợp lệ")
    public void testLoginAdminSuccess() {
        String email = "admin@cinego.vn";
        String password = "Admin123!";
        
        boolean isValidUser = authenticate(email, password);
        assertTrue(isValidUser, "Đăng nhập phải thành công với tài khoản Admin đúng");
    }

    @Test
    @DisplayName("TC_AUTH_02: Kiểm tra đăng nhập thất bại khi sai mật khẩu")
    public void testLoginWrongPassword() {
        String email = "admin@cinego.vn";
        String password = "sai_mat_khau";

        boolean isValidUser = authenticate(email, password);
        assertFalse(isValidUser, "Đăng nhập phải thất bại khi nhập sai mật khẩu");
    }

    @Test
    @DisplayName("TC_AUTH_03: Kiểm tra đăng nhập thất bại khi để trống mật khẩu")
    public void testLoginEmptyPassword() {
        String email = "admin@cinego.vn";
        String password = "";

        boolean isValidUser = authenticate(email, password);
        assertFalse(isValidUser, "Đăng nhập phải thất bại khi mật khẩu trống");
    }

    // Hàm giả lập kiểm tra tài khoản theo thông tin CINEGO
    private boolean authenticate(String email, String pass) {
        if ("admin@cinego.vn".equals(email) && "Admin123!".equals(pass)) {
            return true;
        }
        if ("longltbtd001606@gmail.com".equals(email) && "baolong792009@".equals(pass)) {
            return true;
        }
        return false;
    }
}