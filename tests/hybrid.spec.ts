import { test, expect } from '@playwright/test';
import { UserAPI } from '../api/UserAPI';

test('@hybrid @regression Verify users via API and UI', async ({ page }) => {

  // Step 1: Call API
  const api = new UserAPI();
  await api.init();

  const response = await api.getUsers();

  expect(response.status()).toBe(200);

  const users = await response.json();

  const firstUser = users[0];

  console.log("User from API:", firstUser.name);

  // Step 2: Open UI
  await page.goto('https://jsonplaceholder.typicode.com/users');

  // Step 3: Verify same user exists in UI
  await expect(
    page.locator('body')
  ).toContainText(firstUser.name);

});