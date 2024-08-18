import { test, expect } from '@playwright/test';
import { AjaxPage } from './pages/AjaxPage';


test('Wait for AJAX-loaded data and click on the label', async ({ page }) => {
    const ajaxPage = new AjaxPage(page);

    await ajaxPage.navigateTo();
    await ajaxPage.clickAjaxButton();
    await ajaxPage.waitForLoadedLabel();
    await ajaxPage.clickLoadedLabel();
    await ajaxPage.assertLoadedLabelText('Data loaded with AJAX get request.');
});
