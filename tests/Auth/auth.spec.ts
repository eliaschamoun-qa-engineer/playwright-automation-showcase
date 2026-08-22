// Import the custom test instead of @playwright/test
import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';
import InventoryData from '../../data/InventoryData.json'
test.describe('Full Authentication Testing Suite', () => {

  test('Test Case 1: Verify a successful login routes to the Inventory feed', async ({ page, loginPage, menuContainer, inventoryPage }) => {
    await page.goto('/');

    await expect(loginPage.pageTitle).toContainText('Swag Labs');

    await expect(page.locator('[data-test="login-credentials-container"]'))
      .toMatchAriaSnapshot(`
        - heading "Accepted usernames are:" [level=4]
        - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
        - heading "Password for all users:" [level=4]
        - text: secret_sauce
    `);

    await loginPage.login(loginData.users.standard_user, process.env.TEST_USER_PASSWORD || '');

    //Assertions on the inventory Page after successful login
    await expect(page).toHaveURL(/.*inventory/);

    await menuContainer.openMenu();
    
    await expect(menuContainer.menuButtonContainer).toMatchAriaSnapshot(`
      - navigation:
        - link "All Items"
        - link "About":
          - /url: https://saucelabs.com/
        - link "Logout"
        - link "Reset App State"
    `);

    await menuContainer.closeMenu();
    
    await expect(inventoryPage.itemList).toMatchAriaSnapshot(`
        - link "${InventoryData.items_names.sauce_labs_backpack}":
          - /url: "#"
          - img "Sauce Labs Backpack"
        - link "Sauce Labs Backpack":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_backpack}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_bike_light}":
          - /url: "#"
          - img "Sauce Labs Bike Light"
        - link "Sauce Labs Bike Light":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_bike_light}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_bolt_tshirt}":
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt"
        - link "Sauce Labs Bolt T-Shirt":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_bolt_tshirt}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_fleece_jacket}":
          - /url: "#"
          - img "Sauce Labs Fleece Jacket"
        - link "Sauce Labs Fleece Jacket":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_fleece_jacket}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_onesie}":
          - /url: "#"
          - img "Sauce Labs Onesie"
        - link "Sauce Labs Onesie":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_onesie}.*/
        - button "Add to cart"
        - link "Test.allTheThings() T-Shirt (Red)":
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)"
        - link "${InventoryData.items_names.test_all_things_red}":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.test_all_things_red}.*/
        - button "Add to cart"
        `);

  });

  test('Test Case 2: Verify user cannot proceed when the user is locked out', async ({ page, loginPage }) => {
    await page.goto('/');

    await loginPage.login('locked_out_user', 'secret');

    await loginPage.login(loginData.users.locked_out_user, process.env.TEST_USER_PASSWORD);

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.locked_out_user);

    await expect(page).toHaveURL('/');

  });

  test('Test Case 3: Verify user cannot access the website unless is logged in', async ({ page, context, loginPage, menuContainer, baseURL}) => {
    await context.addCookies([
      {
          name: process.env.TEST_USERNAME_COOKIE, // Change this to your app's actual cookie name
          value: process.env.TEST_VALUE_COOKIE,
          url: baseURL,
      }
    ]);
    //Notice the login without actually runnig the login everytime.
    await page.goto('/inventory.html');

    await menuContainer.openMenu();
    
    await menuContainer.logout();

    await page.goto('/inventory.html'); 

    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.access_message);

    await expect(page).toHaveURL('/');
  });

  test('Test Case 4: Verify adequate input error handling on the login page', async({page, loginPage })=>{
    await page.goto('/');

    await loginPage.login('', process.env.TEST_USER_PASSWORD);

    await expect(page).toHaveURL('/');

    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.username_required);

    await loginPage.clearUsername();

    await loginPage.login(loginData.users.standard_user, '');

    await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.password_required);

    await expect(page).toHaveURL('/');
  });

});