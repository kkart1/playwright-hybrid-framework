import { chromium, FullConfig } from '@playwright/test';
import config from './utils/configReader';

async function globalSetup(_: FullConfig) {

  const browser = await chromium.launch({
    headless: process.env.CI ? true : false
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto(`${config.baseURL}/login`);

  await page.fill('#username', config.username);

  await page.fill('#password', config.password);

  await page.click('button[type="submit"]');

  await page.waitForTimeout(2000);

  await context.storageState({
    path: 'auth/storageState.json',
  });

  await browser.close();
}

export default globalSetup;