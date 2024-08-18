import { test, expect } from '@playwright/test';
import { ProgressBarPage } from './pages/ProgressBarPage';

test('Stop progress bar at 75%', async ({ page }) => {
    const progressBarPage = new ProgressBarPage(page);

    await progressBarPage.navigate();
    await progressBarPage.startProgressBar();
    await progressBarPage.stopProgressBarAt(75);
    
    await progressBarPage.checkResult();
});
