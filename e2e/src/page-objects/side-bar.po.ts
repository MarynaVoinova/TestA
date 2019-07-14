import { browser, by, element, ExpectedConditions } from "protractor";
import { BasePageObject } from "./base.po";

export class SideBar extends BasePageObject {
  protected containerLocator = element(by.id("#mySidebar"));
  private allMenuItems = element(by.css("#mySidebar a"));

  async clickUserListMenu() {
    const addUserMenu = element(by.css("#mySidebar > a:nth-child(2)"));
    await this.waitUntilVisibleAndClickable(addUserMenu);
    await addUserMenu.click();
  }

  async clickAddNewUserMenu() {
    const clickAddNewUserMenu = element(by.css("#mySidebar > a:nth-child(3)"));
    await this.waitUntilVisibleAndClickable(clickAddNewUserMenu);
    // await this.waitUntilVisible(clickAddNewUserMenu);
    //const getMenuName = await clickAddNewUserMenu.getText();
    await clickAddNewUserMenu.click();
  }

  async clickLogoutMenu() {
    const LogoutMenu = element(by.css("#mySidebar > a:nth-child(4)"));
    await this.waitUntilVisibleAndClickable(LogoutMenu);
    await LogoutMenu.click();
  }
}
