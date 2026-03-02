import { chromium, FullConfig } from '@playwright/test';
import config from './utils/configReader';
import fs from 'fs';
import path from 'path';

async function globalSetup(_: FullConfig) {

  // Ensure auth folder exists
  const authDir = path.resolve('./auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir);
  }

  const browser = await chromium.launch({
    headless: process.env.CI ? true : false
  });

  // ADMIN session
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  await adminPage.goto(`${config.baseURL}/login`);
  await adminPage.fill('#username', config.username);
  await adminPage.fill('#password', config.password);
  await adminPage.click('button[type="submit"]');

  await adminPage.waitForLoadState('networkidle');

  await adminContext.storageState({
    path: 'auth/admin.json',
    
  });

  await adminContext.close();


  // USER session (same creds for demo)
  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();

  await userPage.goto(`${config.baseURL}/login`);
  await userPage.fill('#username', config.username);
  await userPage.fill('#password', config.password);
  await userPage.click('button[type="submit"]');

  await userPage.waitForLoadState('networkidle');

  await userContext.storageState({
    path: 'auth/user.json',
  });

  await userContext.close();

  await browser.close();

}

export default globalSetup;