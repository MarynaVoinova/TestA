import { browser, by, element } from "protractor";

export class Utils {
  getPageUrl() {
    return browser.getCurrentUrl();
  }
}
