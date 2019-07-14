import { ElementFinder, browser, ExpectedConditions } from "protractor";

/**
 * Base class for page object
 */
export abstract class BasePageObject {
  /**
   * returns page object container finder
   */
  protected abstract get containerFinder(): ElementFinder;
  /**
   * checks that page object is present
   */
  public async isPresent(): Promise<boolean> {
    try {
      await this.waitUntilPresent(this.containerFinder);
    }
    catch {
      return false;
    }
    return await browser.isElementPresent(this.containerFinder);
  }

  protected async hasClass(finder: ElementFinder, cssClass: string): Promise<boolean> {
    const cssClasses = await finder.getAttribute('class');
    if(!cssClasses) {
      return false;
    }
    return !!cssClasses.split(' ').find(x => x === cssClass);
  }

  protected waitUntilPresent(finder: ElementFinder) {
    return browser.wait(
      ExpectedConditions.presenceOf(finder),
      5000,
      `Element ${finder.locator()} taking too long to be visible`
    );
  }

  protected waitUntilVisible(finder: ElementFinder) {
    return browser.wait(
      ExpectedConditions.visibilityOf(finder),
      5000,
      `Element ${finder.locator()} taking too long to be visible`
    );
  }

  protected waitUntilClickable(finder: ElementFinder) {
    return browser.wait(
      ExpectedConditions.elementToBeClickable(finder),
      5000,
      `Element ${finder.locator()} taking too long to be visible`
    );
  }

  protected async waitUntilVisibleAndClickable(finder: ElementFinder) {
    await this.waitUntilVisible(finder);
    return await this.waitUntilClickable(finder);
  }

  protected async getText(finder: ElementFinder): Promise<string> {
    await this.waitUntilVisible(finder);
    return await finder.getText();
  }

  protected async isEnabled(finder: ElementFinder): Promise<boolean> {
    await this.waitUntilVisible(finder);
    return await finder.isEnabled();
  }

  protected async typeText(finder: ElementFinder, text: string): Promise<void> {
    await this.waitUntilVisible(finder);
    await finder.sendKeys(text);
  }

  protected async click(finder: ElementFinder): Promise<void> {
    try {
      await this.waitUntilVisibleAndClickable(finder);
    }
    catch {
      console.log('error');
    }
    await finder.click();
  }
}
