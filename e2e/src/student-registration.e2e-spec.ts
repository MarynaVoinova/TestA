import { LoginPage } from "./page-objects/login.po";
import { StudentRegistrationForm } from "./page-objects/student-registration-form.po";

describe("student registration", () => {
  let loginPage: LoginPage;
  let addStudentPage: StudentRegistrationForm;

  beforeAll(async () => {
    loginPage = new LoginPage();
    loginPage.navigateTo();
    await loginPage.login('admin@yopmail.com', 'admin123');
    addStudentPage = new StudentRegistrationForm();
  });

  beforeEach(async () => {
    await addStudentPage.navigateTo();
  });

  it("should show validation message for first name field if data is not valid", async () => {
    await addStudentPage.typeFirstName('f');
    const message = await addStudentPage.getFirstNameValidationMessage();
    expect(message).toBe('Please enter 3 to 50 characters');
  });

  it("should show validation message for last name field if data is not valid", async () => {
    await addStudentPage.typeLastName('l');
    const message = await addStudentPage.getLastNameValidationMessage();
    expect(message).toBe('Please enter 3 to 50 characters');
  });

  it("should show validation message for email field if data is not valid", async () => {
    await addStudentPage.typeEmail('e');
    const message = await addStudentPage.getEmailValidationMessage();
    expect(message).toBe('Please enter valid email address');
  });

  it("should show validation message for phone field if data is not valid", async () => {
    await addStudentPage.typePhone('911');
    const message = await addStudentPage.getPhoneValidationMessage();
    expect(message).toBe('Please enter valid phone number');
  });
});
