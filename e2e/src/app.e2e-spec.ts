import { LoginPage } from "./login.po";
import { AddStudentPage } from "./add-student.po";
import { Utils } from "./utils";
import { StudentList } from "./students-list.po";

describe("workspace-project App", () => {
  let loginPage: LoginPage;
  let addUserPage: AddStudentPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it("should login", async () => {
    loginPage.navigateTo();
    expect(loginPage.isLoginButtonEnabled()).toBe(true);
    loginPage.login("admin@yopmail.com", "admin123");
    const studentList = new StudentList();
    const studentInfo = await studentList.findStudentByEmail(
      "john@yopmail.com"
    );
    const po = "temp";
  });

  it("should add user via navigating to http://localhost:4200/add", async () => {
    addUserPage = new AddStudentPage();
    addUserPage.navigateTo();
    addUserPage.addUser("Mopa11", "Poll21", "asd12@dm.ru", "+9121333333"); //+9133333333
    const enabled = await addUserPage.isRegisterButtonEnabled();
    expect(addUserPage.isRegisterButtonEnabled()).toBe(true);
    addUserPage.clickRegisterButton();
    let utils = new Utils();
    let currentUrl = utils.getPageUrl();
    expect(currentUrl).toEqual("http://localhost:4200/");
  });
});
