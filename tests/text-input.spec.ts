import { test, expect } from '@playwright/test';
import { TextInputPage } from './pages/TextInputPage';

test('Set new button name using text input and keyboard emulation', async ({ page }) => {
    const textInputPage = new TextInputPage(page);

    const newButtonName = 'New Button Name';
    
    await textInputPage.navigate();
    await textInputPage.setButtonName(newButtonName);
    await textInputPage.clickUpdateButton();

    const buttonText = await textInputPage.getButtonText();
    await expect(buttonText).toBe(newButtonName);
});
