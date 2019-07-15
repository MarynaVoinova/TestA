import { LoginPage } from './page-objects/login.po';
import { StudentRegistrationForm } from './page-objects/student-registration-form.po';
import { Toast } from './page-objects/toast.po';
import { StudentList } from './page-objects/students-list.po';
import { clearStorage } from './utils/browser-utils';

describe('student registration', () => {
  let loginPage: LoginPage;
  let addStudentPage: StudentRegistrationForm;

  beforeAll(async () => {
    loginPage = new LoginPage();
    loginPage.navigateTo();
    await loginPage.login('admin@yopmail.com', 'admin123');
    addStudentPage = new StudentRegistrationForm();
  });

  afterAll(async () => {
    await clearStorage();
  });

  beforeEach(async () => {
    await addStudentPage.navigateTo();
  });

  it('should show validation message for first name field if data is not valid', async () => {
    await addStudentPage.typeFirstName('f');
    const message = await addStudentPage.getFirstNameValidationMessage();
    expect(message).toBe('Please enter 3 to 50 characters');
  });

  it('should show validation message for last name field if data is not valid', async () => {
    await addStudentPage.typeLastName('l');
    const message = await addStudentPage.getLastNameValidationMessage();
    expect(message).toBe('Please enter 3 to 50 characters');
  });

  it('should show validation message for email field if data is not valid', async () => {
    await addStudentPage.typeEmail('e');
    const message = await addStudentPage.getEmailValidationMessage();
    expect(message).toBe('Please enter valid email address');
  });

  it('should show validation message for phone field if data is not valid', async () => {
    await addStudentPage.typePhone('911');
    const message = await addStudentPage.getPhoneValidationMessage();
    expect(message).toBe('Please enter valid phone number');
  });

  it('should show successfull message when form filled correctly and register button clicked', async () => {
    await addStudentPage.typePhone('911');
    const student = {
      firstName: 'Mopa',
      lastName: 'PolaL',
      email: 'asd12@dm.nl',
      phone: '9121333333'
    };
    await addStudentPage.fillUserData(student.firstName, student.lastName, student.email, student.phone);
    await addStudentPage.clickRegisterButton();

    const toastMessage = await new Toast().getMessage();
    expect(new StudentList().isPresent()).toBeTruthy();
    expect(toastMessage.title).toBe('Success');
    expect(toastMessage.message).toBe('Student Successfully Added');
  });

  it('should show failed message when form filled with existing email and register button clicked', async () => {
    await addStudentPage.typePhone('911');
    const student = {
      firstName: 'Mopa',
      lastName: 'PolaL',
      email: 'sangwin@yopmail.com',
      phone: '9121333333'
    };
    await addStudentPage.fillUserData(student.firstName, student.lastName, student.email, student.phone);
    await addStudentPage.clickRegisterButton();

    const toastMessage = await new Toast().getMessage();
    expect(new StudentList().isPresent()).toBeFalsy();
    expect(toastMessage.title).toBe('Failed');
    expect(toastMessage.message).toBe('Email Address Already In Use');
  });
});
