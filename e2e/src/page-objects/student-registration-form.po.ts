import { browser, by, element } from "protractor";
import { BasePageObject } from "./base.po";

export class StudentRegistrationForm extends BasePageObject {
  protected containerFinder = element(by.tagName("app-student-add"));

  private readonly firstNameFinder = element(by.css("input[formcontrolname=first_name]"));
  private readonly lastNameFinder = element(by.css("input[formcontrolname=last_name]"));
  private readonly emailFinder = element(by.css("input[formcontrolname=email]"));
  private readonly phoneFinder = element(by.css("input[formcontrolname=phone]"));
  private readonly registerButtonFinder = element(by.css("button[type=submit]"));

  navigateTo() {
    return browser.get("/add");
  }

  getFirstNameValidationMessage(): Promise<string> {
    const finder = element(by.css('input[formControlName=first_name]+div'));
    return this.getText(finder);
  }

  typeFirstName(text: string): Promise<void> {
    return this.typeText(this.firstNameFinder, text);
  }

  getLastNameValidationMessage(): Promise<string> {
    const finder = element(by.css('input[formControlName=last_name]+div'));
    return this.getText(finder);
  }

  typeLastName(text: string): Promise<void> {
    return this.typeText(this.lastNameFinder, text);
  }

  getEmailValidationMessage(): Promise<string> {
    const finder = element(by.css('input[formControlName=email]+div'));
    return this.getText(finder);
  }

  typeEmail(text: string): Promise<void> {
    return this.typeText(this.emailFinder, text);
  }

  getPhoneValidationMessage(): Promise<string> {
    const finder = element(by.css('input[formControlName=phone]+div'));
    return this.getText(finder);
  }

  typePhone(text: string): Promise<void> {
    return this.typeText(this.phoneFinder, text);
  }

  async fillUserData(firstName: string, lastName: string, email: string, phone: string) {
    await this.typeText(this.firstNameFinder, firstName);
    await this.typeText(this.lastNameFinder, lastName);
    await this.typeText(this.emailFinder, email);
    return await this.typeText(this.phoneFinder, phone);
  }

  isRegisterButtonEnabled() {
    return this.isEnabled(this.registerButtonFinder);
  }

  clickRegisterButton() {
    this.click(this.registerButtonFinder);
  }
}
