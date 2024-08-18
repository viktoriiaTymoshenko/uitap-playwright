import { expect, Locator, Page } from '@playwright/test';

export class VisibilityPage {
    private page: Page;
    private hideButton: Locator;
    private buttons: { name: string; locator: Locator }[];

    constructor(page: Page) {
        this.page = page;
        this.hideButton = page.locator('button#hideButton');
        this.buttons = [
            { name: 'Removed button', locator: page.locator('button#removedButton') },
            { name: 'Zero width button', locator: page.locator('button#zeroWidthButton') },
            { name: 'Overlapped button', locator: page.locator('button#overlappedButton') },
            { name: 'Opacity 0 button', locator: page.locator('button#transparentButton') },
            { name: 'Visibility Hidden button', locator: page.locator('button#invisibleButton') },
            { name: 'Display None button', locator: page.locator('button#notdisplayedButton') },
            { name: 'Offscreen button', locator: page.locator('button#offscreenButton') }
        ];
    }

    async navigate() {
        await this.page.goto('/visibility');
    }

    async hideAllButtons() {
        await this.hideButton.click();
    }

    async checkAllButtonsHidden(): Promise<void> {
        for (const button of this.buttons) {
            const isHidden = await this.isElementHidden(button.locator);
            console.log(`${button.name} hidden: ${isHidden}`);
            expect.soft(isHidden).toBe(true);
        }
    }

    async isElementHidden(locator: Locator): Promise<boolean> {
        const isVisibleInDOM = await locator.isVisible();

        if (isVisibleInDOM) {
            const styles = await locator.evaluate(el => {
                const style = window.getComputedStyle(el);
                return {
                    display: style.display,
                    visibility: style.visibility,
                    opacity: style.opacity,
                    ariaHidden: el.getAttribute('aria-hidden'),
                    boundingBox: el.getBoundingClientRect()
                };
            });

            const boundingBox = styles.boundingBox;
            const viewport = await this.page.viewportSize();

            const isOffscreen = boundingBox.bottom < 0 ||
                boundingBox.right < 0 ||
                boundingBox.top > (viewport?.height ?? 0) ||
                boundingBox.left > (viewport?.width ?? 0);

            const isHiddenByStyles =
                styles.display === 'none' ||
                styles.visibility === 'hidden' ||
                styles.opacity === '0' ||
                styles.ariaHidden === 'true';

            const isHidden = isHiddenByStyles || isOffscreen || await this.isElementCovered(locator);

            return isHidden;
        }

        return true;
    }

    private async isElementCovered(locator: Locator): Promise<boolean> {
        try {
            await locator.click({ trial: true, timeout: 500 });
            return false;
        } catch (error) {
            return true;
        }
    }
}
