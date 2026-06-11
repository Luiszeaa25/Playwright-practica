import { LoginPage } from "../page/LoginPage";
import { ValidUser } from "../utils/testdata";
import { test } from "../fixtures/customFixtures";


test ('Login test', async ({loggedPage}) => {
});
test('Login no exitoso', async ({ invalidLoginPage }) => {
});
test('Hipervinculos', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLinkedin();
    await loginPage.validateFacebook();
    await loginPage.validateTwitter();
    await loginPage.validateYoutube();
    await loginPage.validateOrangeHRM();
    await loginPage.validateForgotPassword();
} );