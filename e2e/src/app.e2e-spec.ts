import { LoginPage } from "./page-objects/login.po";
import { StudentRegistrationForm } from "./page-objects/student-registration-form.po";
import { Utils } from "./utils";
import { StudentList } from "./page-objects/students-list.po";

describe("workspace-project App", () => {
  let loginPage: LoginPage;
  let addStudentPage: StudentRegistrationForm;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it("should login", async () => {
    loginPage.navigateTo();
    expect(loginPage.isLoginButtonEnabled()).toBe(true);
    loginPage.login("admin@yopmail.com", "admin123");
  });

  it("should add a new student and check that the student exists in the student list", async () => {
    addStudentPage = new StudentRegistrationForm();
    //go to adding Student via URL:
    addStudentPage.navigateTo();
    const student = {
      firstName: "Mopa",
      lastName: "PolaL",
      email: "asd12@dm.nl",
      phone: "+9121333333"
    };
    addStudentPage.fillUserData(
      student.firstName,
      student.lastName,
      student.email,
      student.phone
    );
    addStudentPage.clickRegisterButton();
    //the page with student list is shown
    const studentList = new StudentList();
    const studentInfo = await studentList.findStudentByEmail(student.email);
    //expect that the list of students contains a student with entered data:
    expect(studentInfo[1]).toEqual(student.firstName);
    expect(studentInfo[2].toEqual(student.lastName));
    expect(studentInfo[4].toEqual(student.phone));
  });
  //const enabled = await addStudentPage.isRegisterButtonEnabled();
  //expect(addStudentPage.isRegisterButtonEnabled()).toBe(true);
});
