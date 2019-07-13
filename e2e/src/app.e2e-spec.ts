import { LoginPage } from "./login.po";
import { AddStudentPage } from "./add-student.po";
import { Utils } from "./utils";
import { StudentList } from "./students-list.po";

describe("workspace-project App", () => {
  let loginPage: LoginPage;
  let addStudentPage: AddStudentPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it("should login", async () => {
    loginPage.navigateTo();
    expect(loginPage.isLoginButtonEnabled()).toBe(true);
    loginPage.login("admin@yopmail.com", "admin123");
  });

  it("should add a new student and check that the student exists in the  student list", async () => {
    addStudentPage = new AddStudentPage();
    //go to adding Student via URL:
    addStudentPage.navigateTo();
    const student = {
      firstName: "Mopa",
      lastName: "PolaL",
      email: "asd12@dm.nl",
      phone: "+9121333333"
    };
    addStudentPage.addUser(
      student.firstName,
      student.lastName,
      student.email,
      student.phone
    );
    addStudentPage.clickRegisterButton();
    //the page with student list is shown
    const studentList = new StudentList();
    const studentInfo = await studentList.findStudentByEmail(student.email);
    //expect that added information is the same as entered:
    expect(studentInfo[1]).toEqual(student.firstName);
    expect(studentInfo[2].toEqual(student.lastName));
    expect(studentInfo[3].toEqual(student.phone));
  });
  //const enabled = await addStudentPage.isRegisterButtonEnabled();
  //expect(addStudentPage.isRegisterButtonEnabled()).toBe(true);
});
