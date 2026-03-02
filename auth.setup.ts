import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Perform login
  await page.goto('https://the-internet.herokuapp.com');
  await page.fill('input[type="username"]', 'tomsmith');
  await page.fill('input[type="password"]', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  
  // Wait for navigation and save storage state
  await page.waitForURL('https://the-internet.herokuapp.com/secure');
  await page.context().storageState({ path: 'auth/storageState.json' });
});