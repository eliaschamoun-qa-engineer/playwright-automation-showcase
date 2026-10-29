import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';
import inventoryData from '../../data/InventoryData.json';

test.describe('Cart - State Persistence Across Sessions', () => {
  test('CART-05: Verify cart items persist across logout and subsequent login @cart @regression', async ({
    page,
    loginPage,
    inventoryPage,
    menuContainer,
  }) => {
    // 1. Initial Login
    await loginPage.goto();
    await loginPage.login(
      loginData.users.standard_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );

    // 2. Add product to cart
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_backpack);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // 3. Logout
    await menuContainer.openMenu();
    await menuContainer.logout();
    await expect(page).toHaveURL('/');

    // 4. Re-login
    await loginPage.login(
      loginData.users.standard_user,
      process.env.TEST_USER_PASSWORD || loginData.users.valid_password
    );
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 5. Verify cart items persisted
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });
});
