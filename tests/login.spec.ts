import { LoginPage } from "../page/LoginPage";
import { ValidUser } from "../utils/testdata";
import { test } from "../fixtures/customFixtures";


test ('Validar login exitoso', async ({loggedPage}) => {
});
test('Validar login no exitoso', async ({ invalidLoginPage }) => {
});
test('Validación de hipervinculos de la pagina de login', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLinkedin();
    await loginPage.validateFacebook();
    await loginPage.validateTwitter();
    await loginPage.validateYoutube();
    await loginPage.validateOrangeHRM();
    await loginPage.validateForgotPassword();
} );