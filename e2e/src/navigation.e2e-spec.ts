import { LoginPage } from "./page-objects/login.po";
import { AddStudentPage } from "./page-objects/add-student.po";
import { Utils } from "./utils";
import { StudentList } from "./page-objects/students-list.po";
import { SideBar } from "./page-objects/side-bar.po";
import { browser } from "protractor";

fdescribe("test side menu", () => {
  let loginPage: LoginPage;
  let addStudentPage: AddStudentPage;
  let sideBar: SideBar;

  beforeEach(async () => {});

  it("should navigate to add student page from side bar menu", async () => {
    loginPage = new LoginPage();
    loginPage.navigateTo();
    await loginPage.login("admin@yopmail.com", "admin123");
    // await browser.driver.sleep(1000);

    sideBar = new SideBar();
    await sideBar.clickAddNewUserMenu();
    //check if add student page is shown
    addStudentPage = new AddStudentPage();
    expect(addStudentPage.isPresent()).toBeTruthy();
  });
  /*

  it("should navigate to logout from side bar menu", async () => {
    sideBar = new SideBar();
    await sideBar.clickLogoutMenu();
    //check if login page is shown
    expect(loginPage.isPresent()).toBeTruthy();
  });

  it("should navigate to add student page, user list and logout from side bar menu", async () => {
    sideBar = new SideBar();
    await sideBar.clickAddNewUserMenu();
    addStudentPage = new AddStudentPage();
    await sideBar.clickAddNewUserMenu();
    expect(addStudentPage.isPresent()).toBeTruthy();
    await sideBar.clickUserListMenu();
    const studentList = new StudentList();
    expect(studentList.isPresent()).toBeTruthy();
    await sideBar.clickLogoutMenu();
    //check if login page is shown
    expect(loginPage.isPresent()).toBeTruthy();
  });
  */
});
