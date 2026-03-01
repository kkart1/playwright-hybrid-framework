import { test, expect } from '@playwright/test';
import { UserAPI } from '../api/UserAPI';

test('@api Get users API test', async () => {

  const userAPI = new UserAPI();

  await userAPI.init();

  const response = await userAPI.getUsers();

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);

});