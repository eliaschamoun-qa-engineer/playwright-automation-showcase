import { test, expect } from '../../fixtures/baseFixture';
import inventoryData from '../../data/InventoryData.json';

test.describe('Navigation - Menu Drawer & App Controls', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Authenticated on /inventory.html
  });

  test('NAV-01: Open and close navigation menu drawer @ui', async ({ menuContainer }) => {
    await menuContainer.openMenu();
    await expect(menuContainer.bmMenuWrap).toBeVisible();
    await expect(menuContainer.allItemsLink).toBeVisible();
    await expect(menuContainer.logoutLink).toBeVisible();

    await menuContainer.closeMenu();
    await expect(menuContainer.bmMenuWrap).toBeHidden();
  });

  test('NAV-02: All Items link navigates back to inventory from Cart @regression', async ({
    page,
    inventoryPage,
    menuContainer,
  }) => {
    await inventoryPage.clickShoppingCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    await menuContainer.openMenu();
    await menuContainer.clickAllItems();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('NAV-03: About link points to Sauce Labs corporate site @regression', async ({
    menuContainer,
  }) => {
    await menuContainer.openMenu();
    await expect(menuContainer.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
  });

  test('NAV-04: Logout link invalidates session and redirects to Login page @smoke @p0', async ({
    page,
    loginPage,
    menuContainer,
  }) => {
    await menuContainer.openMenu();
    await menuContainer.logout();

    await expect(page).toHaveURL('/');
    await expect(loginPage.usernameInput).toBeVisible();

    // Verify session cookie was cleared
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === 'session-username');
    expect(sessionCookie).toBeUndefined();
  });

  test('NAV-05: Reset App State clears shopping cart badge and selections @regression', async ({
    inventoryPage,
    menuContainer,
  }) => {
    // Add items first
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_backpack);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // Trigger reset app state
    await menuContainer.openMenu();
    await menuContainer.resetAppState();

    // Verify cart badge disappears
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });
});
