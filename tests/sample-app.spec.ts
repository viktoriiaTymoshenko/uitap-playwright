import { test } from '@playwright/test';
import { SampleAppPage } from './pages/SampleAppPage';

test('Successful login to sample app', async ({ page }) => {
    const sampleAppPage = new SampleAppPage(page);
    const password = 'pwd';
    const username = sampleAppPage.generateRandomUsername();

    await sampleAppPage.navigate();
    await sampleAppPage.login(username, password);
    await sampleAppPage.assertLoggedIn(username);
});
