import { test } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";

test ('Login test', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('Admin','admin123');
    await loginPage.LoginSuccess();

});