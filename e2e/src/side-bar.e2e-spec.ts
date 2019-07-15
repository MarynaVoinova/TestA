import { LoginPage } from './page-objects/login.po';
import { StudentRegistrationForm } from './page-objects/student-registration-form.po';
import { StudentList } from './page-objects/students-list.po';
import { SideBar } from './page-objects/side-bar.po';
import { clearStorage } from './utils/browser-utils';
import { browser } from 'protractor';

describe('side bar menu', () => {
  let loginPage: LoginPage;
  let addStudentPage: StudentRegistrationForm;
  let sideBar: SideBar;

  beforeEach(() => {});

  beforeAll(async () => {
    loginPage = new LoginPage();
    sideBar = new SideBar();
    await loginPage.navigateTo();
    await loginPage.login('admin@yopmail.com', 'admin123');
  });

  afterAll(async () => {
    await clearStorage();
  });

  it('should navigate to student registration', async () => {
    await sideBar.clickAddNewUserMenu();
    addStudentPage = new StudentRegistrationForm();
    // check if add student page is shown
    const isPresent = await addStudentPage.isPresent();
    expect(isPresent).toBeTruthy();
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
