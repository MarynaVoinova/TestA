import { LoginPage } from './page-objects/login.po';
import { AddStudentPage } from './page-objects/add-student.po';
import { StudentList } from './page-objects/students-list.po';
import { SideBar } from './page-objects/side-bar.po';

fdescribe('side bar menu', () => {
  let loginPage: LoginPage;
  let addStudentPage: AddStudentPage;
  let sideBar: SideBar;

  beforeAll(async () => {
    loginPage = new LoginPage();
    sideBar = new SideBar();
    loginPage.navigateTo();
    await loginPage.login('admin@yopmail.com', 'admin123');
  });

  it('should navigate to student registration', async () => {
    await sideBar.clickAddNewUserMenu();
    addStudentPage = new AddStudentPage();
    // check if add student page is shown
    expect(addStudentPage.isPresent()).toBeTruthy();
    // check that menu item is selected
    expect(sideBar.isAddNewUserMenuSelected()).toBeTruthy();
  });

  it('should navigate to student list', async () => {
    await sideBar.clickUserListMenu();
    sideBar.isUserListMenuSelected();
    const studentList = new StudentList();
    // check if add student page is shown
    expect(studentList.isPresent()).toBeTruthy();
    // check that menu item is selected
    expect(sideBar.isUserListMenuSelected()).toBeTruthy();
  });

  it('should navigate to login page', async () => {
    await sideBar.clickLogoutMenu();
    //check if login page is shown
    expect(loginPage.isPresent()).toBeTruthy();
  });
});
