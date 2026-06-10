import { Page, Locator, expect } from "@playwright/test";


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




    constructor(page:Page){
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginError = page.getByRole('alert', { name: "" });
        this.linkedinLink = this.page.locator('a[href*="linkedin.com/company/orangehrm/mycompany/"]');
        this.facebookLink = this.page.locator('a[href*="facebook.com/OrangeHRM/"]')
        this.twitterLink = this.page.locator('a[href*="twitter.com/orangehrm?lang=en"]')
        this.youtubeLink = this.page.locator('a[href*="youtube.com/c/OrangeHRMInc"]')
        this.oragehrmLink = this.page.locator('a[href*="orangehrm.com"]')


    } 
    async gotoLoginPage (){

        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
    } 

    async validLogin(user: string, pass: string){

        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async loginSuccess(){

        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    }


    async loginUnsuccesful(){

        await expect(this.loginError).toBeVisible();
    }

    async validateLinkedin (){

        const pagePromise = this.page.context().waitForEvent('page');
        await this.linkedinLink.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/linkedin\.com/);
    }

    async validateFacebook() {

        const pagePromise = this.page.context().waitForEvent('page');
        await this.facebookLink.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/facebook\.com/);
    }

    async validateTwitter() {

        const url = await this.twitterLink.getAttribute('href');
        if (!url) throw new Error("No se pudo obtener el href de Twitter");
        
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/(twitter\.com|x\.com)/);
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateYoutube() {

        const pagePromise = this.page.context().waitForEvent('page');
        await this.youtubeLink.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/youtube\.com/);
    }

    async validateOrangeHRM() {

        const pagePromise = this.page.context().waitForEvent('page');
        await this.oragehrmLink.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/orangehrm\.com/);
    }

}
