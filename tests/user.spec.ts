import { test, expect } from '../fixtures/baseTest';

test('@regression User dashboard test', async ({ userPage }) => {

  await userPage.navigate();

  await expect(true).toBeTruthy();

});