import { test as base, Page, expect } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { InvalidUser, ValidUser } from "../utils/testdata"; 



interface Fixtures {
    loggedPage: Page;
    invalidLoginPage: Page;
    loginPageLoggedIn: LoginPage;
}
export const test = base.extend<Fixtures>({

    loggedPage: async ({ page }, use) =>{
        const loginPage = new LoginPage(page);
        
        await page.goto('/web/index.php/auth/login');
        await loginPage.validLogin(ValidUser.username, ValidUser.password);
        await loginPage.loginSuccess();
        await use (page);
    
    },

    invalidLoginPage: async ({ page }, use) =>{
        const loginPage = new LoginPage(page);
        const randomUser = InvalidUser();

        await page.goto('/web/index.php/auth/login');
        await loginPage.validLogin(randomUser.username, randomUser.password);
        await loginPage.loginUnsuccesful();
        await use (page);
    }, 

    loginPageLoggedIn: async ({loggedPage}, use) =>{

        const loginPage = new LoginPage(loggedPage);
        await use (loginPage);
    }


});