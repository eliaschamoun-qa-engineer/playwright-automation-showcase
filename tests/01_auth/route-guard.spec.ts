import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';

test.describe('Authentication - Route Protection & Security Guards', () => {
  test('AUTH-08: Unauthenticated access to /inventory.html is blocked @security @regression', async ({
    page,
    loginPage,
  }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.access_message);
  });

  test('AUTH-09: Unauthenticated access to /cart.html is blocked @security @regression', async ({
    page,
    loginPage,
  }) => {
    await page.goto('/cart.html');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: You can only access '/cart.html' when you are logged in."
    );
  });

  test('AUTH-10: Unauthenticated access to /checkout-step-one.html is blocked @security @regression', async ({
    page,
    loginPage,
  }) => {
    await page.goto('/checkout-step-one.html');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in."
    );
  });
});
