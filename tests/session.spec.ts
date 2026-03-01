import { test, expect } from '../fixtures/baseTest';

test('Verify session reused without login', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/secure');

  await expect(page.locator('h2')).toHaveText('Secure Area');

});