package com.poly.sof309.ui.tests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import com.poly.sof309.ui.pages.LoginPage;

public class LoginTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    public void testLoginFunction() {
        driver.get("http://localhost:8080/CINEGO_ASM2_letrungbaolong/CINEGO/dang-nhap.html");
        loginPage = new LoginPage(driver);
        loginPage.login("test@cinego.com", "123456");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}