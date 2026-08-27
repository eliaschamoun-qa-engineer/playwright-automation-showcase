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

    })

});
