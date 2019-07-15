import { browser } from "protractor";

export const clearStorage = async () => {
  await browser.executeScript("window.sessionStorage.clear();");
  await browser.executeScript("window.localStorage.clear();");
};
