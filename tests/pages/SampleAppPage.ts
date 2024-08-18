import { faker } from '@faker-js/faker';
import { expect, Locator, Page } from '@playwright/test';

export class SampleAppPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly loggedInUserLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('input[name="UserName"]');
        this.passwordField = page.locator('input[name="Password"]');
        this.loginButton = page.locator('button#login');
        this.loggedInUserLabel = page.locator('label#loginstatus.text-success');
    }

    async navigate() {
        await this.page.goto('/sampleapp');
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async assertLoggedIn(username: string) {
        await expect(this.loggedInUserLabel).toHaveText(`Welcome, ${username}!`);
    }

    generateRandomUsername(): string {
        return faker.internet.userName();
    }
}