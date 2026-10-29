import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';

test.describe('Personas & Edge Cases - Anomaly & Fault-Tolerance Testing', () => {
  
  test('EDGE-01: performance_glitch_user loads inventory within SLA threshold @performance @p1', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();

    const startTime = Date.now();
    await loginPage.login(
      loginData.users.performance_glitch_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );

    // Assert successful routing despite glitch delay
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);

    const loadDuration = Date.now() - startTime;
    // Glitch user adds ~5s artificial delay; verify it completes within reasonable SLA limit (15s)
    expect(loadDuration).toBeLessThan(15000);
  });

  test('EDGE-02: problem_user exhibits broken images (sl-404) in product catalog @edgeCase @regression', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(
      loginData.users.problem_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );

    await expect(page).toHaveURL(/.*inventory\.html/);

    // Problem user deliberately displays the 404 dog image on inventory items
    const firstImageSrc = await inventoryPage.itemImages.first().getAttribute('src');
    expect(firstImageSrc).toMatch(/sl-404.*\.jpg/);
  });

  test('EDGE-03: error_user fails on checkout finish button and cannot complete order @edgeCase', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(
      loginData.users.error_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );

    await inventoryPage.addProductByName('Sauce Labs Backpak');
    await inventoryPage.clickShoppingCart();
    await cartPage.proceedToCheckout();

    // Fill Step 1 information successfully
    await checkoutPage.fillShippingInformation('Elias', 'Chamoun', '1100');
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // error_user triggers an exception on finish button, preventing order completion
    await checkoutPage.finishOrder();

    // Verify order is NOT completed (does not reach checkout-complete.html)
    await expect(page).not.toHaveURL(/.*checkout-complete\.html/);
  });
});
