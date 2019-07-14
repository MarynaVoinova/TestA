import { ElementFinder, browser, ExpectedConditions } from "protractor";

/**
 * Base class for page object
 */
export abstract class BasePageObject {
  /**
   * page object container
   */
  protected abstract get containerFinder(): ElementFinder;
  /**
   * Checks that page object is present
   */
  public async isPresent(): Promise<boolean> {
    return await browser.isElementPresent(this.containerFinder);
  }

  protected waitUntilVisible(finder: ElementFinder) {
    return browser.wait(
      ExpectedConditions.visibilityOf(finder),
      5000,
      `Element ${finder} taking too long to be visible`
    );
  }

  protected waitUntilClickable(finder: ElementFinder) {
    return browser.wait(
      ExpectedConditions.elementToBeClickable(finder),
      5000,
      `Element ${finder} taking too long to be visible`
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
    await this.waitUntilVisibleAndClickable(finder);
    await finder.click();
  }
}
