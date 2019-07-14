import { ElementFinder, browser, ExpectedConditions } from "protractor";

/**
 * Base class for page object
 */
export abstract class BasePageObject {
  /**
   * page object container
   */
  protected abstract get containerLocator(): ElementFinder;
  /**
   * Checks that page object is present
   */
  public async isPresent(): Promise<boolean> {
    return await browser.isElementPresent(this.containerLocator);
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
}
