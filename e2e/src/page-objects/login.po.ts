import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';

export class LoginPage extends BasePageObject {
  protected containerFinder = element(by.tagName('app-login'));
  
  private readonly emailFormControlFinder = element(by.css('app-login input[formControlName=email]'));
  private readonly passwordFormControlFinder = element(by.css('app-login input[formControlName=password]'));
  private readonly loginButtonFinder = element(by.css('app-login button[type=submit]'));
  private readonly toastComponentFinder = element(by.css('div[toast-component]'));
  private readonly toastTitleBy = by.className('toast-title');
  private readonly toastMessageBy = by.className('toast-message');

  navigateTo() {
    return browser.get('/login');
  }

  typeEmail(email: string): Promise<void> {
    return this.typeText(this.emailFormControlFinder, email);
  }

  typePassword(password: string): Promise<void> {
    return this.typeText(this.passwordFormControlFinder, password);
  }

  clickLogin(): Promise<void> {
    return this.click(this.loginButtonFinder);
  }

  async getEmailControlValidationMessage(): Promise<string> {
    const finder = element(by.css('input[formControlName=email]+div'));
    return await this.getText(finder);
  }

  async getPasswordControlValidationMessage(): Promise<string> {
    const finder = element(by.css('input[formControlName=password]+div'));
    return await this.getText(finder);
  }

  async login(email: string, password: string) {
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickLogin();
  }

  async getToastMessage(): Promise<{ title: string, message: string }> {
    const toastTitleFinder = this.toastComponentFinder.element(this.toastTitleBy);
    const title = await this.getText(toastTitleFinder);
    const toastMessageFinder = this.toastComponentFinder.element(this.toastMessageBy);
    const message = await this.getText(toastMessageFinder);
    return {title: title, message: message};
  }

  isLoginButtonEnabled(): Promise<boolean> {
    return this.isEnabled(this.loginButtonFinder);
  }
}
