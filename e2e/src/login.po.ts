import { browser, by, element } from "protractor";

export class LoginPage {
  navigateTo() {
    return browser.get("/login");
  }

  login(email: string, password: string) {
    element(by.css("input[formControlName=email]")).sendKeys(email);
    element(by.css("input[formControlName=password]")).sendKeys(password);
    const submitButton = element(by.css("app-login button[type=submit"));
    submitButton.getAttribute("disabled");
    element(by.css("app-login button[type=submit")).click();
  }

  isLoginButtonEnabled() {
    const submitButton = element(by.css("app-login button[type=submit"));
    return submitButton.isEnabled;
  }
}
