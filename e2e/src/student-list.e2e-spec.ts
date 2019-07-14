import { LoginPage } from './page-objects/login.po';
import { StudentRegistrationForm } from './page-objects/student-registration-form.po';
import { StudentList } from './page-objects/students-list.po';
import { browser } from 'protractor';

fdescribe('student list', () => {
  let loginPage: LoginPage;
  let addStudentPage: StudentRegistrationForm;
  let studentListPage: StudentList;

  beforeAll(async () => {
    loginPage = new LoginPage();
    loginPage.navigateTo();
    await loginPage.login('admin@yopmail.com', 'admin123');
    addStudentPage = new StudentRegistrationForm();
    studentListPage = new StudentList();
  });

  fit('should register and delete a new student', async () => {
    const student = {
      firstName: 'Mopa',
      lastName: 'PolaL',
      email: 'mopapola@dm.nl',
      phone: '9121333333'
    };

    await studentListPage.navigateTo();

    // check that new student is not registered yet
    const studentExists = !!(await studentListPage.findStudentByEmail(student.email));
    expect(studentExists).toBeFalsy();

    // go to registration form
    await studentListPage.clickAddNewStudentButton();
    expect(addStudentPage.isPresent()).toBeTruthy();

    // register student
    await addStudentPage.fillUserData(student.firstName, student.lastName, student.email, student.phone);
    await addStudentPage.clickRegisterButton();
    expect(studentListPage.isPresent()).toBeTruthy();

    // check that newly registered student is in the list
    await browser.sleep(1000);
    const studentInfo = await studentListPage.findStudent(student.email);

    //expect that the list of students contains a student with entered data:
    expect(studentInfo[1]).toEqual(student.firstName);
    expect(studentInfo[2]).toEqual(student.lastName);
    expect(studentInfo[4]).toEqual('+91-' + student.phone);
  });
});
