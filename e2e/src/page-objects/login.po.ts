import { browser, by, element } from "protractor";
import { BasePageObject } from "./base.po";

export class LoginPage extends BasePageObject {
  protected containerLocator = element(by.tagName("app-login"));

  navigateTo() {
    return browser.get("/login");
  }

  async login(email: string, password: string) {
    const emailFormControlFinder = element(by.css("input[formControlName=email]"));
    await this.waitUntilVisibleAndClickable(emailFormControlFinder);
    emailFormControlFinder.sendKeys(email);
    element(by.css("input[formControlName=password]")).sendKeys(password);
    const submitButton = element(by.css("app-login button[type=submit"));
    submitButton.getAttribute("disabled");
    const loginButtonFinder = element(by.css("app-login button[type=submit"));
    await this.waitUntilVisibleAndClickable(loginButtonFinder);
    await loginButtonFinder.click();
  }

  isLoginButtonEnabled() {
    const submitButton = element(by.css("app-login button[type=submit"));
    return submitButton.isEnabled;
  }
}
