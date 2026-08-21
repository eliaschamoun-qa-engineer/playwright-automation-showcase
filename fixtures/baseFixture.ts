import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuContainer } from '../pages/_shared/MenuContainer';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
type FrameworkFixtures = { 
    loginPage: LoginPage;
    menuContainer: MenuContainer;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
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
    cartPage: async({ page }, use) =>{
        const cartPage = new CartPage(page);
        
        await use(cartPage);
    }
})

export { expect } from '@playwright/test';