import { Page, Locator } from '@playwright/test';

export class FooterContainer {
  readonly page: Page;
  readonly footer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer.footer');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('[data-test="social-linkedin"]');
    this.copyrightText = page.locator('[data-test="footer-copy"]');
  }

  async getTwitterHref(): Promise<string | null> {
    return await this.twitterLink.getAttribute('href');
  }

  async getFacebookHref(): Promise<string | null> {
    return await this.facebookLink.getAttribute('href');
  }

  async getLinkedinHref(): Promise<string | null> {
    return await this.linkedinLink.getAttribute('href');
  }
}
