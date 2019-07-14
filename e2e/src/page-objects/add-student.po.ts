import { browser, by, element } from "protractor";
import { BasePageObject } from "./base.po";

export class AddStudentPage extends BasePageObject {
  protected get containerFinder() {
    return element(by.tagName("app-student-add"));
  }

  private readonly firstNameControl = element(
    by.css("input[formcontrolname=first_name]")
  );
  private readonly lastNameControl = element(
    by.css("input[formcontrolname=last_name]")
  );
  private readonly emailControl = element(
    by.css("input[formcontrolname=email]")
  );
  private readonly phoneControl = element(
    by.css("input[formcontrolname=phone]")
  );
  private readonly registerButton = element(by.css("button[type=submit]"));

  navigateTo() {
    return browser.get("/add");
  }

  addUser(firstName: string, lastName: string, email: string, phone: string) {
    this.firstNameControl.sendKeys(firstName);
    this.lastNameControl.sendKeys(lastName);
    this.emailControl.sendKeys(email);
    this.phoneControl.sendKeys(phone);
  }

  isRegisterButtonEnabled() {
    return this.registerButton.isEnabled();
  }

  clickRegisterButton() {
    this.registerButton.click();
  }
}
