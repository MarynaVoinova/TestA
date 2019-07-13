import { browser, by, element } from "protractor";
import { all } from "q";

export interface UserInfoModel {
  firstName: string;
  lastName: string;
}

export class StudentList {
  private readonly usersList = element.all(by.css("tr[apphighlightstudent]"));

  navigateTo() {
    return browser.get("/");
  }

  getStudents() {
    return element
      .all(by.tagName("tr"))
      .map(x => x.all(by.tagName("td")).map(x => x.getText()));
  }

  async findStudentByEmail(email: string) {
    const allStudents = await this.getStudents();
    return allStudents.find(x => x[3] == email);
  }
}
