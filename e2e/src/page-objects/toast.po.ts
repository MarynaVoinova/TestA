import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';

export class Toast extends BasePageObject {
  protected containerFinder = element(by.tagName('div[toast-component]'));
  
  private readonly toastTitleBy = by.className('toast-title');
  private readonly toastMessageBy = by.className('toast-message');

  async getMessage(): Promise<{ title: string, message: string }> {
    const toastTitleFinder = this.containerFinder.element(this.toastTitleBy);
    const title = await this.getText(toastTitleFinder);
    const toastMessageFinder = this.containerFinder.element(this.toastMessageBy);
    const message = await this.getText(toastMessageFinder);
    return {title: title, message: message};
  }
}
