import { test, expect } from '../../fixtures/baseFixture';

test.describe('Navigation - Footer & Social Links', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Authenticated on /inventory.html
  });

  test('NAV-06: Footer displays social media links and copyright notice @regression', async ({
    footerContainer,
  }) => {
    await expect(footerContainer.footer).toBeVisible();

    const twitterHref = await footerContainer.getTwitterHref();
    const facebookHref = await footerContainer.getFacebookHref();
    const linkedinHref = await footerContainer.getLinkedinHref();

    expect(twitterHref).toContain('twitter.com/saucelabs');
    expect(facebookHref).toContain('facebook.com/saucelabs');
    expect(linkedinHref).toContain('linkedin.com/company/sauce-labs');

    await expect(footerContainer.copyrightText).toContainText('Sauce Labs. All Rights Reserved.');
  });
});
