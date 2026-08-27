import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuContainer } from '../pages/_shared/MenuContainer';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type FrameworkFixtures = { 
    loginPage: LoginPage;
    menuContainer: MenuContainer;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
    seededInventoryPage: InventoryPage;
};

export const test = baseTest.extend<FrameworkFixtures>({
    loginPage: async({ page }, use) =>{
        const loginPage = new LoginPage(page);
        
        await use(loginPage);
    },
    menuContainer: async({ page }, use) =>{
        const menuContainer = new MenuContainer(page);
        
        await use(menuContainer);
    },
    inventoryPage: async({ page }, use) =>{
        const inventoryPage = new InventoryPage(page);
        
        await use(inventoryPage);
    },
    checkoutPage: async({ page }, use) =>{
        const checkoutPage = new CheckoutPage(page);
        
        await use(checkoutPage);
    },
    seededInventoryPage: async({ page }, use) => {
        await page.goto('/');
        
        await page.evaluate(() => {
            document.cookie = "session-username=standard_user; path=/";
            window.localStorage.setItem('cart-contents', '[4, 0]');
        });

        await page.goto('/inventory.html');
        
        const inventoryPage = new InventoryPage(page);
        
        await use(inventoryPage);
    }
})

export { expect } from '@playwright/test';