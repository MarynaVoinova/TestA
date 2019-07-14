import { browser, by, element } from "protractor";
import { BasePageObject } from "./base.po";

export class LoginPage extends BasePageObject {
  protected containerLocator = element(by.tagName("app-login"));

  navigateTo() {
    return browser.get("/login");
  }

  async login(email: string, password: string) {
    element(by.css("input[formControlName=email]")).sendKeys(email);
    element(by.css("input[formControlName=password]")).sendKeys(password);
    const submitButton = element(by.css("app-login button[type=submit"));
    submitButton.getAttribute("disabled");
    await element(by.css("app-login button[type=submit")).click();
  }

  isLoginButtonEnabled() {
    const submitButton = element(by.css("app-login button[type=submit"));
    return submitButton.isEnabled;
  }
}
