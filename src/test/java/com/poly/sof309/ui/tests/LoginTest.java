package com.poly.sof309.ui.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {

    private WebDriver driver;
    private final String BASE_URL =
        "http://localhost:8080/CINEGO_ASM2_letrungbaolong/CINEGO/dang-nhap.html";
    private By txtEmail = By.id("loginEmail");
    private By txtPassword = By.id("loginPassword");
    private By btnLogin = By.cssSelector("#loginForm button[type='submit']");
    private By lblMessage = By.id("loginMessage");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void enterEmail(String email) {
        driver.findElement(txtEmail).clear();
        driver.findElement(txtEmail).sendKeys(email);
    }

    public void enterPassword(String password) {
        driver.findElement(txtPassword).clear();
        driver.findElement(txtPassword).sendKeys(password);
    }

    public void clickLogin() {
        driver.findElement(btnLogin).click();
    }

    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
    }

    public String getMessage() {
        return driver.findElement(lblMessage).getText();
    }
}