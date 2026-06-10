import { Page, Locator, expect } from "@playwright/test";

export class LoginPage { 

    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
   


    constructor(page:Page){
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
   

    }

    async gotoLoginPage (){

        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
    } 

    async login(user: String, pass: String){

        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async LoginSuccess(){

        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    }

}

