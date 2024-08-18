import { test, expect } from "@playwright/test";
import { OverlappedPage } from "./pages/OverlappedPage";

test('Test for overlapped element', async ({ page }) => {
    const overlappedPage = new OverlappedPage(page);

    const name = "test";

    await overlappedPage.navigateTo();
    await overlappedPage.enterName(name);
    await overlappedPage.checkEnteredName(name);

});