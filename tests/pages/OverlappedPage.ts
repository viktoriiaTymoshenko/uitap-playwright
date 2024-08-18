import { expect, Locator, Page } from "@playwright/test";

export class OverlappedPage {
    private page: Page;
    private inputName: Locator; 

    constructor(page: Page){
        this.page = page;
        this.inputName = page.locator('input#name');
    }

    async navigateTo(){
        await this.page.goto('/overlapped');
    }

    async enterName(name: string){
        await this.inputName.hover();
        await this.page.mouse.wheel(0, 10);
        await this.inputName.waitFor({ state: 'visible' });
        await this.inputName.fill(name);
    }

    async checkEnteredName(expectedValue: string){
        const value = await this.inputName.inputValue();
        await expect(value).toBe(expectedValue)
    }
}