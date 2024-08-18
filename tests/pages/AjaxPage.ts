import { expect, Locator, Page } from "@playwright/test";

export class AjaxPage {
    private page: Page;
    private ajaxButton: Locator;
    private loadedLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ajaxButton = page.locator('button#ajaxButton');
        this.loadedLabel = page.locator('div#content');
    }

    async navigateTo() {
        await this.page.goto('/ajax');
    }

    async clickAjaxButton() {
        await this.ajaxButton.click();
    }

    async waitForLoadedLabel(timeout = 20000) {
        try {
            await this.loadedLabel.waitFor({ state: 'visible', timeout });
        } catch (error) {
            console.error(`The element did not appear within ${timeout / 1000} seconds. You may want to try increasing the timeout.`);
            throw error;
        }
    }

    async clickLoadedLabel() {
        await this.loadedLabel.click();
    }

    async assertLoadedLabelText(expectedText: string) {
        await expect(this.loadedLabel).toHaveText(expectedText);
    }
}
