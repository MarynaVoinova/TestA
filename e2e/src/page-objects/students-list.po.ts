import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';

export interface UserInfoModel {
  firstName: string;
  lastName: string;
}

export class StudentList extends BasePageObject {
  protected containerFinder = element(by.tagName('app-student-list'));

  private readonly usersList = element.all(by.css('tr[apphighlightstudent]'));
  private readonly addNewStudentButtonFinder = element(by.css('button[routerLink="/add"]'));

  navigateTo() {
    return browser.get('/');
  }

  getStudents() {
    return element
      .all(by.tagName('tr'))
      .map(x => x.all(by.tagName('td')).map(x => x.getText()));
  }

  async findStudentByEmail(email: string) {
    const allStudents = await this.getStudents();
    return allStudents.find(x => x[3] == email);
  }

  async studentExists(email: string): Promise<any> {
    return await this.isElementPresent(element(by.xpath(`//td[4][contains(text(),"${email}")]`)));
  }

  async findStudent(email: string): Promise<any> {
    return await element(by.xpath(`//td[4][contains(text(),"${email}")]/ancestor::tr`)).all(by.tagName('td')).map(x => x.getText());
  }

  async deleteStudent(email: string): Promise<any> {
    const deleteButton = await element(by.xpath(`//td[4][contains(text(),"${email}")]/ancestor::tr/td/button[contains(text(),"Delete")]`));
    return await this.click(deleteButton);
  }

  clickAddNewStudentButton(): Promise<void> {
    return this.click(this.addNewStudentButtonFinder);
  }
}
