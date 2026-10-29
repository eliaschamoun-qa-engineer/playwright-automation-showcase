import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MenuContainer } from '../pages/_shared/MenuContainer';
import { FooterContainer } from '../pages/_shared/FooterContainer';

type FrameworkFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  menuContainer: MenuContainer;
  footerContainer: FooterContainer;
  loggedInPage: InventoryPage;
  seededInventoryPage: InventoryPage;
};

export const test = baseTest.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  menuContainer: async ({ page }, use) => {
    const menuContainer = new MenuContainer(page);
    await use(menuContainer);
  },

  footerContainer: async ({ page }, use) => {
    const footerContainer = new FooterContainer(page);
    await use(footerContainer);
  },

  loggedInPage: async ({ page, context }, use) => {
    // Fast state injection: set cookie directly to bypass UI login
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        url: 'https://www.saucedemo.com',
      },
    ]);
    await page.goto('/inventory.html');
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  seededInventoryPage: async ({ page, context }, use) => {
    // Inject auth cookie and cart contents (item ids 4 and 0) directly
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        url: 'https://www.saucedemo.com',
      },
    ]);
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.setItem('cart-contents', '[4, 0]');
    });
    await page.goto('/inventory.html');
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';