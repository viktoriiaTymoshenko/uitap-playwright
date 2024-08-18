import { test } from '@playwright/test';
import { VisibilityPage } from './pages/VisibilityPage';

test('Check all buttons are hidden after clicking "Hide"', async ({ page }) => {
    const visibilityPage = new VisibilityPage(page);

    await visibilityPage.navigate();
    await visibilityPage.hideAllButtons();
    await visibilityPage.checkAllButtonsHidden(); 
});
