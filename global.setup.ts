import { chromium, FullConfig } from '@playwright/test';
import config from './utils/configReader';
import fs from 'fs';
import path from 'path';

async function globalSetup(_: FullConfig) {

  const authDir = path.resolve('./auth');

  // ensure auth folder exists
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: process.env.CI ? true : false
  });

  console.log("Creating authentication state...");

  // ---------- ADMIN ----------
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  await adminPage.goto(`${config.baseURL}/login`);

  await adminPage.fill('#username', config.username);
  await adminPage.fill('#password', config.password);

  await adminPage.click('button[type="submit"]');

  // VERY IMPORTANT → verify login success
  await adminPage.waitForURL('**/secure');

  await adminContext.storageState({
    path: path.join(authDir, 'admin.json'),
  });

  await adminContext.close();


  // ---------- USER ----------
  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();

  await userPage.goto(`${config.baseURL}/login`);

  await userPage.fill('#username', config.username);
  await userPage.fill('#password', config.password);

  await userPage.click('button[type="submit"]');

  await userPage.waitForURL('**/secure');

  await userContext.storageState({
    path: path.join(authDir, 'user.json'),
  });

  await userContext.close();

  await browser.close();

  console.log("Auth files created successfully.");

}

export default globalSetup;