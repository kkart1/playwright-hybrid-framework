import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://your-app-url.com/login'); // Replace with your app's login URL
  await page.fill('#username', 'your-username');     // Replace with actual username selector and value
  await page.fill('#password', 'your-password');     // Replace with actual password selector and value
  await page.click('#login');                        // Replace with your login button's selector

  await page.waitForSelector('selector-after-login'); // Update with a selector visible post-login

  await context.storageState({ path: 'auth/storageState.json' });
  await browser.close();
})();