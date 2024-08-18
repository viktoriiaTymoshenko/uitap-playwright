import { test } from '@playwright/test';
import { DynamicTablePage } from './pages/DynamicTablePage';

test('Compare CPU load for Chrome with the value in the yellow label', async ({ page }) => {
    const dynamicTablePage = new DynamicTablePage(page);

    await dynamicTablePage.navigateTo();
    await dynamicTablePage.assertCPUValuesMatch();
});
