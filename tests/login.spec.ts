import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/test-dataReader';

const loginData = getTestData('loginData.json');

loginData.users.forEach((user: any) => {

  test(`@smoke @regression Login test for user: ${user.username}`, async ({ loginPage, page }) => {

    await loginPage.navigate();

    await loginPage.loginWithData(
      user.username,
      user.password
    );

    if (user.expected === 'success') {

      await expect(
        page.locator('.flash.success')
      ).toBeVisible();

    } else {

      await expect(
        page.locator('.flash.error')
      ).toBeVisible();

    }

  });

});