import { test, expect } from '../../fixtures/baseFixture';
import loginData from '../../data/LoginData.json';

test.describe('Automation: Seeding The Cart Test Suite', () => {

    test('Test Case SC-1: Verify cart badge displays correct number of seeded items @cart', async ({ page, seededInventoryPage }) => {

        const cartItems = await seededInventoryPage.returnCartItemsNumber();

        await expect(seededInventoryPage.cartLocator).toHaveText(cartItems);

        // Verify the URL to ensure the routing worked
        await expect(page).toHaveURL(/.*inventory\.html/);
    });

    test('Test Case: SC-2: Verify cart badge displays correct number of items @cart even when logging out and then logging in', async ({ page, loginPage, seededInventoryPage, menuContainer }) => {

        await menuContainer.openMenu();

        await menuContainer.logout();

        await expect(page).toHaveURL('/');

        await loginPage.login(loginData.users.standard_user, process.env.TEST_USER_PASSWORD || loginData.users.valid_password);

        const cartItems = await seededInventoryPage.returnCartItemsNumber();

        await expect(seededInventoryPage.cartLocator).toHaveText(cartItems);

        // Verify the URL to ensure the routing worked
        await expect(page).toHaveURL(/.*inventory\.html/);

    });

    test('SC-3: Verify static labels and elements on the Cart page @cart @ui', async ({ page, seededInventoryPage, checkoutPage }) => {
        // Route to cart after seeded state
        await page.locator('.shopping_cart_link').click();
        
        await expect(checkoutPage.yourCartLabel).toBeVisible();
        await expect(checkoutPage.qtyLabel).toBeVisible();
        await expect(checkoutPage.cartDescLabel).toBeVisible();
        await expect(checkoutPage.continueShoppingButton).toBeVisible();
        await expect(checkoutPage.checkoutButton).toBeVisible();
        await expect(checkoutPage.removeFromCartButton).toBeVisible();
        await expect(checkoutPage.items).toHaveCount(2);
    });

    test('SC-4: Verify empty shipping form triggers validation error @checkout @negative', async ({ page, seededInventoryPage, checkoutPage }) => {
        // Route directly to checkout step one
        await page.locator('.shopping_cart_link').click();
        await checkoutPage.initiateCheckout();
        
        // Assert fields are initially empty
        await expect(checkoutPage.firstNameInput).toBeEmpty();
        await expect(checkoutPage.lastNameInput).toBeEmpty();
        await expect(checkoutPage.postalCodeInput).toBeEmpty();
        
        // Attempt to continue without data
        await checkoutPage.continueButton.click();
        
        // Validate the error state
        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
    });

    test('SC-5: Full End-to-End Checkout Flow with Aria Validation @checkout @e2e @p0', async ({ page, seededInventoryPage, checkoutPage }) => {
        // Start from cart
        await page.locator('.shopping_cart_link').click();
        await checkoutPage.initiateCheckout();
        
        // Step 1: Shipping Form
        await checkoutPage.fillShippingInformation('Elias', 'Chamoun', '1100');
        
        // Step 2: Overview Validation
        await expect(checkoutPage.titleLabel).toContainText('Checkout: Overview');
        await expect(checkoutPage.paymentInfoLabel).toBeVisible();
        await expect(checkoutPage.shippingInfoLabel).toBeVisible();
        await expect(checkoutPage.totalInfoLabel).toBeVisible();
        
        // Advanced Accessibility Snapshot Validation
        await expect(checkoutPage.cartList).toMatchAriaSnapshot(`
         - text: "1"
         - link "Sauce Labs Backpack":
           - /url: "#"/
         - text: /carry\\.allTheThings\\(\\) with the sleek/
        `);
        
        // Step 3: Finish Order
        await checkoutPage.finishButton.click();
        
        // Step 4: Completion Validation
        await expect(checkoutPage.titleLabel).toContainText('Checkout: Complete!');
        await expect(checkoutPage.ponyExpressImage).toBeVisible();
        await expect(checkoutPage.completeHeader).toContainText('Thank you for your order!');
        await expect(checkoutPage.completeText).toContainText('Your order has been dispatched');
        
        // Route back to home
        await checkoutPage.backHomeButton.click();
        await expect(page).toHaveURL(/.*inventory\.html/);
    });

});
