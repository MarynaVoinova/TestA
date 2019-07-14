import { by, element, ElementFinder } from 'protractor';
import { BasePageObject } from './base.po';

export class SideBar extends BasePageObject {
  protected containerFinder = element(by.id('#mySidebar'));
  private readonly userListMenuFinder = element(by.css('#mySidebar > a[routerLink="/"]'));
  private readonly addNewUserMenu = element(by.css('#mySidebar > a[routerLink="/add"]'));

  isUserListMenuSelected(): Promise<boolean> {
    return this.isMenuItemSelected(this.userListMenuFinder);
  }

  isAddNewUserMenuSelected(): Promise<boolean> {
    return this.isMenuItemSelected(this.addNewUserMenu);
  }

  clickUserListMenu(): Promise<void> {
    return this.click(this.userListMenuFinder);
  }

  clickAddNewUserMenu(): Promise<void> {
    return this.click(this.addNewUserMenu);
  }

  clickLogoutMenu(): Promise<void> {
    const logoutMenu = element(by.css('#mySidebar > a:nth-child(4)'));
    return this.click(logoutMenu);
  }

  private isMenuItemSelected(finder: ElementFinder): Promise<boolean> {
    return this.hasClass(finder, 'w3-teal');
  }

}
