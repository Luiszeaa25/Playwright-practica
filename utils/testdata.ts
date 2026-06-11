import  data from "../test-data.json";
import { faker } from "@faker-js/faker";

export interface loginData{

    username: string;
    password: string;
}

export const ValidUser: loginData = data.validUser;

export const InvalidUser = (): loginData => ({
    username: faker.internet.username(),
    password: faker.internet.password({length: 12}),

});

export interface FooterLinksData{
    
    linkedin: string;
    facebook: string; 
    twitter: string; 
    youtube: string; 
    orangehrm: string;
}

export const FooterLinks: FooterLinksData = data.footerLinks;