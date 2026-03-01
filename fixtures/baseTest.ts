import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
  adminPage: LoginPage;
  userPage: LoginPage;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  adminPage: async ({ browser }, use) => {

    const context = await browser.newContext({
      storageState: 'auth/admin.json'
    });

    const page = await context.newPage();

    await use(new LoginPage(page));

    await context.close();
  },

  userPage: async ({ browser }, use) => {

    const context = await browser.newContext({
      storageState: 'auth/user.json'
    });

    const page = await context.newPage();

    await use(new LoginPage(page));

    await context.close();
  }

});

export { expect };