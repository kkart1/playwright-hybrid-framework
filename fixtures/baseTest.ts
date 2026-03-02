import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';

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

    if (!fs.existsSync('auth/admin.json')) {
      throw new Error("auth/admin.json not found. global.setup failed.");
    }

    const context = await browser.newContext({
      storageState: 'auth/admin.json'
    });

    const page = await context.newPage();

    await use(new LoginPage(page));

    await context.close();
  },

  userPage: async ({ browser }, use) => {

    if (!fs.existsSync('auth/user.json')) {
      throw new Error("auth/user.json not found. global.setup failed.");
    }

    const context = await browser.newContext({
      storageState: 'auth/user.json'
    });

    const page = await context.newPage();

    await use(new LoginPage(page));

    await context.close();
  }

});

export { expect };