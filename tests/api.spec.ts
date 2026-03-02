import { test, expect } from '@playwright/test';
import { UserAPI } from '../api/UserAPI';

test('@api Get users API test', async () => {

  const api = new UserAPI();

  await api.init();

  const response = await api.getUsers();

  expect(response.status()).toBe(200);

});