import { Page, Locator, expect } from "@playwright/test";
import { FooterLinks } from "../utils/testdata";


export class LoginPage { 

    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly loginError: Locator;
    private readonly linkedinLink: Locator;
    private readonly facebookLink: Locator;
    private readonly twitterLink: Locator;
    private readonly youtubeLink: Locator;
    private readonly oragehrmLink: Locator;
    private readonly forgotpass: Locator;

    constructor(page:Page){
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginError = page.getByRole('alert', { name: "" });
        this.linkedinLink = this.page.locator('a[href *= "linkedin.com"]');
        this.facebookLink = this.page.locator('a[href*="facebook.com"]');
        this.twitterLink = this.page.locator('a[href*="twitter.com"], a[href*="x.com"]');
        this.youtubeLink = this.page.locator('a[href*="youtube.com"]');
        this.oragehrmLink = this.page.locator('a[href*="orangehrm.com"]');
        this.forgotpass = page.getByText('Forgot your password?');


    } 
    async gotoLoginPage (){

        await this.page.goto('/web/index.php/auth/login');
    } 

    async validLogin(user: string, pass: string){

        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async loginSuccess(){

        await expect (this.page).toHaveURL('/web/index.php/dashboard/index');
    }


    async loginUnsuccesful(){

        await expect(this.loginError).toBeVisible();
    }

    private async VerifyLinkNewTab(locator: Locator, expectedTargetUrl: string){

        await locator.scrollIntoViewIfNeeded();
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            locator.click({ force: true })
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        let escapedUrl = expectedTargetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        escapedUrl = escapedUrl.replace('twitter\\.com', '(twitter\\.com|x\\.com)');
        await expect(newPage).toHaveURL(new RegExp(escapedUrl), { timeout: 30000 });

        await newPage.close();
    }

    async validateLinkedin (){

        await this.VerifyLinkNewTab(this.linkedinLink, FooterLinks.linkedin)
    }

    async validateFacebook() {

        await this.VerifyLinkNewTab(this.facebookLink, FooterLinks.facebook);
    }

    async validateTwitter() {

        await this.VerifyLinkNewTab(this.twitterLink, FooterLinks.twitter)
    }

    async validateYoutube() {

        await this.VerifyLinkNewTab(this.youtubeLink, FooterLinks.youtube)

    }

    async validateOrangeHRM() {

        await this.VerifyLinkNewTab(this.oragehrmLink, FooterLinks.orangehrm)

    }

    async validateForgotPassword(){

        await this.forgotpass.click()
        await expect(this.page).toHaveURL('/web/index.php/auth/requestPasswordResetCode')   
    }

}


