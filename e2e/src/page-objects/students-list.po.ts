import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';

export interface UserInfoModel {
  firstName: string;
  lastName: string;
}

export class StudentList extends BasePageObject {
  protected containerFinder = element(by.tagName('app-student-list'));

  private readonly addNewStudentButtonFinder = element(by.css('button[routerLink="/add"]'));
  private readonly searchInputFinder = element(by.css('app-student-list > div > span > input'));

  navigateTo() {
    return browser.get('/');
  }

  async getStudents() {
    const data = await element
      .all(by.tagName('tr'))
      .map(x => x.all(by.tagName('td')).map(x => x.getText()));
    return data.slice(1);
  }

  typeSearch(text: string) {
    return this.typeText(this.searchInputFinder, text);
  }

  async findStudentByEmail(email: string) {
    const allStudents = await this.getStudents();
    return allStudents.find(x => x[3] == email);
  }

  async studentExists(email: string): Promise<any> {
    return await this.isElementPresent(element(by.xpath(`//td[4][contains(text(),"${email}")]`)));
  }

  async findStudent(email: string): Promise<any> {
    try {
      return await element(by.xpath(`//td[4][contains(text(),"${email}")]/ancestor::tr`)).all(by.tagName('td')).map(x => x.getText());
    }
    catch(error) {
      return null;
    }
  }

  async findStudentOrTimeout(email: string): Promise<any> {
    await browser.wait(async x => {
      const s = await this.findStudent(email);
      if (!s || s[1] === '' || s[2] === '' ) {
        return false;
      }
      return true;
    }, this.defaultTimeout);

    return await this.findStudent(email);
  }

  async deleteStudent(email: string): Promise<any> {
    const deleteButton = await element(by.xpath(`//td[4][contains(text(),"${email}")]/ancestor::tr/td/button[contains(text(),"Delete")]`));
    return await this.click(deleteButton);
  }

  clickAddNewStudentButton(): Promise<void> {
    return this.click(this.addNewStudentButtonFinder);
  }
}
