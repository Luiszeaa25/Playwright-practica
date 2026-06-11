import {  Page, Locator, expect } from "@playwright/test";

export class ViewSystemUsers {


    private readonly page: Page; 
    private readonly AdminLink: Locator;

    constructor (page:Page){

        this.page = page;
        this.AdminLink = page.getByRole('link', {name: "Admin"});

    }


    async clickAdminLink(){
    
        await this.AdminLink.click();
        await expect(this.page).toHaveURL('/web/index.php/admin/viewSystemUsers');
    }
}