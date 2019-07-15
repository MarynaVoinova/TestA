import { LoginPage } from './page-objects/login.po';
import { StudentRegistrationForm } from './page-objects/student-registration-form.po';
import { StudentList } from './page-objects/students-list.po';
import { browser } from 'protractor';
import { clearStorage } from './utils/browser-utils';

describe('student list', () => {
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

  afterAll(async () => {
    await clearStorage();
  });

  it('should search for student', async () => {
    await studentListPage.navigateTo();
    let students = await studentListPage.getStudents();
    expect(students.length).toBe(5);

    // search for Peter
    await studentListPage.typeSearch('Peter');
    students = await studentListPage.getStudents();
    expect(students.length).toBe(1);
    expect(students[0][1]).toBe('Peter');
  });

  it('should register and delete a new student', async () => {
    const student = {
      firstName: 'Mopa',
      lastName: 'PolaL',
      email: 'mopapola@dm.nl',
      phone: '9121333333'
    };

    await studentListPage.navigateTo();

    // check that new student is not registered yet
    let studentExists = !!(await studentListPage.findStudentByEmail(student.email));
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
    // country code is added automatically, so we take it into account
    expect(studentInfo[4]).toEqual('+91-' + student.phone);

    // delete newly registered student
    await studentListPage.deleteStudent(student.email);
    await studentListPage.confirm();

    // check that new student is not in the list anymore
    studentExists = !!(await studentListPage.findStudentByEmail(student.email));
    expect(studentExists).toBeFalsy();
  });
});
