import { expect, Locator, Page } from "@playwright/test";

export class DynamicTablePage {
    private page: Page;
    private headers: Locator;
    private chromeRow: Locator;
    private cpuLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headers = page.getByRole('columnheader');
        this.chromeRow = page.getByRole('row').filter({ hasText: 'Chrome' });
        this.cpuLabel = page.locator('p.bg-warning');
    }

    async navigateTo() {
        await this.page.goto('/dynamictable');
    }

    async getCPUColumnIndex(): Promise<number> {
        const headers = await this.headers.allTextContents();
        const cpuColumnIndex = headers.indexOf('CPU');

        if (cpuColumnIndex === -1) {
            throw new Error('CPU column not found in the table headers.');
        }

        return cpuColumnIndex;
    }

    async getChromeCPUValue(): Promise<string> {
        const cpuColumnIndex = await this.getCPUColumnIndex();
        const cells = await this.chromeRow.locator('span[role="cell"]').allTextContents();
        return cells[cpuColumnIndex];
    }

    async getCPUValueFromLabel(): Promise<string> {
        const cpuValueInLabel = await this.cpuLabel.textContent();
        if (!cpuValueInLabel) {
            throw new Error('CPU value in the label is not found or is null.');
        }
        
        return cpuValueInLabel;
    }

    async assertCPUValuesMatch() {
        const cpuValueInTable = await this.getChromeCPUValue();
        const cpuValueInLabel = await this.getCPUValueFromLabel();
        
        expect(cpuValueInLabel).toContain(cpuValueInTable);
    }
}
