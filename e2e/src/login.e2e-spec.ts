import { LoginPage } from "./page-objects/login.po";

fdescribe('login page', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    loginPage.navigateTo();
  });

  it('should show validation message for email when email format is invalid', async () => {
    await loginPage.typeEmail('admin');
    const message = await loginPage.getEmailControlValidationMessage();
    expect(message).toBe('Please enter valid email address');
    expect(loginPage.isLoginButtonEnabled()).toBeFalsy();
  });

  it('should show validation message for password when password format is invalid', async () => {
    await loginPage.typePassword('123');
    const message = await loginPage.getPasswordControlValidationMessage();
    expect(message).toBe('Password must be at least 6 characters long, and contain a number');
    expect(loginPage.isLoginButtonEnabled()).toBeFalsy();
  });

  it("should show failed validation message when login credentials are invalid", async () => {
    await loginPage.login("admin@yopmail.com", "admin12355");
    const toastMessage = await loginPage.getToastMessage();
    expect(loginPage.isPresent()).toBeTruthy();
    expect(toastMessage.title).toBe("Invalid Credentials");
    expect(toastMessage.message).toBe("Failed");
  });
});
