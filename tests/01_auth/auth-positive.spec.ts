import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';
import inventoryData from '../../data/InventoryData.json';

test.describe('Authentication - Positive Flows', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('AUTH-01: Verify successful login with standard_user routes to Inventory @smoke @p0', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await expect(loginPage.pageTitle).toContainText(inventoryData.labels.swag_labs_label);
    await expect(loginPage.loginCredentialsContainer).toBeVisible();

    await loginPage.login(
      loginData.users.standard_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );

    // Verify routing to inventory
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText(inventoryData.labels.products_title);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);

    // Verify session cookie is set
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === 'session-username');
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie?.value).toBe(loginData.users.standard_user);
  });
});
