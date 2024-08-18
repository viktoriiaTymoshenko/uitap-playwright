import { expect, Locator, Page } from '@playwright/test';

export class ProgressBarPage {
    private page: Page;
    private startButton: Locator;
    private stopButton: Locator;
    private progressBar: Locator;
    private result: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startButton = page.locator('button#startButton');
        this.stopButton = page.locator('button#stopButton');
        this.progressBar = page.getByRole('progressbar');
        this.result = page.locator('p#result');
    }

    async navigate() {
        await this.page.goto('/progressbar');
    }

    async startProgressBar() {
        await this.startButton.click();
    }

    async waitForProgressBar(targetValue: number): Promise<void> {
        const targetValueStr = targetValue.toString();

        await new Promise<void>((resolve, reject) => {
            const checkProgress = async () => {
                try {
                    const progressBarValue = await this.progressBar.getAttribute('aria-valuenow');
                    if (progressBarValue != null && progressBarValue >= targetValueStr) {
                        resolve();
                    } else {
                        setTimeout(checkProgress, 25);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            checkProgress();
        });
    }

    async stopProgressBarAt(targetValue: number): Promise<void> {
        await this.waitForProgressBar(targetValue);
        await this.stopButton.click();
    }

    async checkResult() {
        await expect(this.result).toContainText('Result: 0');
    }
}
