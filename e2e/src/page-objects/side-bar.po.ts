import { browser, by, element, ExpectedConditions } from "protractor";
import { BasePageObject } from "./base.po";

export class SideBar extends BasePageObject {
  protected containerLocator = element(by.id("#mySidebar"));
  private allMenuItems = element(by.css("#mySidebar a"));

  async clickUserListMenu() {
    const addUserMenu = element(by.css("#mySidebar > a:nth-child(2)"));
    await this.waitUntilVisible(addUserMenu);
    await addUserMenu.click();
  }

  async clickAddNewUserMenu() {
    const clickAddNewUserMenu = element(by.css("#mySidebar > a:nth-child(3)"));
    await browser.wait(
      ExpectedConditions.visibilityOf(clickAddNewUserMenu),
      5000,
      `Element ${clickAddNewUserMenu} taking too long to be visible`
    );
    await browser.wait(
      ExpectedConditions.elementToBeClickable(clickAddNewUserMenu),
      5000,
      `Element ${clickAddNewUserMenu} taking too long to be visible`
    );
    // await this.waitUntilVisible(clickAddNewUserMenu);
    //const getMenuName = await clickAddNewUserMenu.getText();
    await clickAddNewUserMenu.click();
  }

  async clickLogoutMenu() {
    const LogoutMenu = element(by.css("#mySidebar > a:nth-child(4)"));
    await this.waitUntilVisible(LogoutMenu);
    await LogoutMenu.click();
  }
}
