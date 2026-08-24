# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Auth/auth.spec.ts >> Full Authentication Testing Suite >> Test Case 1: Verify a successful login routes to the Inventory feed
- Location: tests/Auth/auth.spec.ts:7:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://www.saucedemo.com/inventory"
Received: "https://www.saucedemo.com/"
Timeout:  20000ms

Call log:
  - Expect "toHaveURL" with timeout 20000ms
    44 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://www.saucedemo.com/"

```

```yaml
- text: Swag Labs
- textbox "Username": standard_user
- textbox "Password"
- 'heading "Epic sadface: Password is required" [level=3]':
  - button
  - text: "Epic sadface: Password is required"
- button "Login"
- heading "Accepted usernames are:" [level=4]
- text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
- heading "Password for all users:" [level=4]
- text: secret_sauce
```

# Test source

```ts
  1   | // Import the custom test instead of @playwright/test
  2   | import { test, expect } from '../../fixtures/baseFixture';
  3   | import loginData from '../../data/LoginData.json';
  4   | import InventoryData from '../../data/InventoryData.json'
  5   | test.describe('Full Authentication Testing Suite', () => {
  6   | 
  7   |   test('Test Case 1: Verify a successful login routes to the Inventory feed', async ({ page, loginPage, menuContainer, inventoryPage }) => {
  8   |     await page.goto('/');
  9   | 
  10  |     await expect(loginPage.pageTitle).toContainText('Swag Labs');
  11  | 
  12  |     await expect(page.locator('[data-test="login-credentials-container"]'))
  13  |       .toMatchAriaSnapshot(`
  14  |         - heading "Accepted usernames are:" [level=4]
  15  |         - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  16  |         - heading "Password for all users:" [level=4]
  17  |         - text: secret_sauce
  18  |     `);
  19  | 
  20  |     await loginPage.login(loginData.users.standard_user, process.env.TEST_USER_PASSWORD || '');
  21  | 
  22  |     //Assertions on the inventory Page after successful login
> 23  |     await expect(page).toHaveURL('/inventory');
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  24  | 
  25  |     await menuContainer.openMenu();
  26  |     
  27  |     await expect(menuContainer.menuButtonContainer).toMatchAriaSnapshot(`
  28  |       - navigation:
  29  |         - link "All Items"
  30  |         - link "About":
  31  |           - /url: https://saucelabs.com/
  32  |         - link "Logout"
  33  |         - link "Reset App State"
  34  |     `);
  35  | 
  36  |     await menuContainer.closeMenu();
  37  |     
  38  |     await expect(inventoryPage.itemList).toMatchAriaSnapshot(`
  39  |         - link "${InventoryData.items_names.sauce_labs_backpack}":
  40  |           - /url: "#"
  41  |           - img "Sauce Labs Backpack"
  42  |         - link "Sauce Labs Backpack":
  43  |           - /url: "#"
  44  |         - text: /.*\\${InventoryData.items_prices.sauce_labs_backpack}.*/
  45  |         - button "Add to cart"
  46  |         - link "${InventoryData.items_names.sauce_labs_bike_light}":
  47  |           - /url: "#"
  48  |           - img "Sauce Labs Bike Light"
  49  |         - link "Sauce Labs Bike Light":
  50  |           - /url: "#"
  51  |         - text: /.*\\${InventoryData.items_prices.sauce_labs_bike_light}.*/
  52  |         - button "Add to cart"
  53  |         - link "${InventoryData.items_names.sauce_labs_bolt_tshirt}":
  54  |           - /url: "#"
  55  |           - img "Sauce Labs Bolt T-Shirt"
  56  |         - link "Sauce Labs Bolt T-Shirt":
  57  |           - /url: "#"
  58  |         - text: /.*\\${InventoryData.items_prices.sauce_labs_bolt_tshirt}.*/
  59  |         - button "Add to cart"
  60  |         - link "${InventoryData.items_names.sauce_labs_fleece_jacket}":
  61  |           - /url: "#"
  62  |           - img "Sauce Labs Fleece Jacket"
  63  |         - link "Sauce Labs Fleece Jacket":
  64  |           - /url: "#"
  65  |         - text: /.*\\${InventoryData.items_prices.sauce_labs_fleece_jacket}.*/
  66  |         - button "Add to cart"
  67  |         - link "${InventoryData.items_names.sauce_labs_onesie}":
  68  |           - /url: "#"
  69  |           - img "Sauce Labs Onesie"
  70  |         - link "Sauce Labs Onesie":
  71  |           - /url: "#"
  72  |         - text: /.*\\${InventoryData.items_prices.sauce_labs_onesie}.*/
  73  |         - button "Add to cart"
  74  |         - link "Test.allTheThings() T-Shirt (Red)":
  75  |           - /url: "#"
  76  |           - img "Test.allTheThings() T-Shirt (Red)"
  77  |         - link "${InventoryData.items_names.test_all_things_red}":
  78  |           - /url: "#"
  79  |         - text: /.*\\${InventoryData.items_prices.test_all_things_red}.*/
  80  |         - button "Add to cart"
  81  |         `);
  82  | 
  83  |   });
  84  | 
  85  |   test('Test Case 2: Verify user cannot proceed when the user is locked out', async ({ page, loginPage }) => {
  86  |     await page.goto('/');
  87  | 
  88  |     await loginPage.login('locked_out_user', 'secret');
  89  | 
  90  |     await loginPage.login(loginData.users.locked_out_user, process.env.TEST_USER_PASSWORD);
  91  | 
  92  |     await expect(loginPage.errorMessage).toBeVisible();
  93  | 
  94  |     await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.locked_out_user);
  95  | 
  96  |     await expect(page).toHaveURL('/');
  97  | 
  98  |   });
  99  | 
  100 |   test('Test Case 3: Verify user cannot access the website unless is logged in', async ({ page, context, loginPage, menuContainer, baseURL}) => {
  101 |     await context.addCookies([
  102 |       {
  103 |           name: process.env.TEST_USERNAME_COOKIE, // Change this to your app's actual cookie name
  104 |           value: process.env.TEST_VALUE_COOKIE,
  105 |           url: baseURL,
  106 |       }
  107 |     ]);
  108 |     //Notice the login without actually runnig the login everytime.
  109 |     await page.goto('/inventory.html');
  110 | 
  111 |     await menuContainer.openMenu();
  112 |     
  113 |     await menuContainer.logout();
  114 | 
  115 |     await page.goto('/inventory.html'); 
  116 | 
  117 |     await expect(loginPage.errorMessage).toHaveText(loginData.error_messages.access_message);
  118 | 
  119 |     await expect(page).toHaveURL('/');
  120 |   });
  121 | 
  122 |   test('Test Case 4: Verify adequate input error handling on the login page', async({page, loginPage })=>{
  123 |     await page.goto('/');
```