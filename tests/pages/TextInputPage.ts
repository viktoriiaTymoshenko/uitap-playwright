import { Locator, Page } from '@playwright/test';

export class TextInputPage {
    private page: Page;
    private inputField: Locator;
    private button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputField = page.locator('input#newButtonName');
        this.button = page.locator('button#updatingButton');
    }

    async navigate() {
        await this.page.goto('/textinput');
    }

    async setButtonName(newButtonName: string) {
        await this.inputField.fill(newButtonName);
    }

    async clickUpdateButton() {
        await this.button.click();
    }

    async getButtonText(): Promise<string> {
        const text = await this.button.textContent();
        return text ?? '';
    }
}
