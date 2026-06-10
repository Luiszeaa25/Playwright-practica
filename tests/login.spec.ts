import { test } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { fakerEN_US } from "@faker-js/faker";

test ('Login test', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.validLogin('Admin','admin123');
    await loginPage.loginSuccess();

});

test ('Login no exitoso', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validLogin(fakerEN_US.person.firstName(), fakerEN_US.string.alphanumeric(6));
    await loginPage.loginUnsuccesful();
});

test ('Hipervinculos',async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLinkedin();
    await loginPage.validateFacebook();
    await loginPage.validateTwitter();
    await loginPage.validateYoutube();
    await loginPage.validateOrangeHRM();

} );