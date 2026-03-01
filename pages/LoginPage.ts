import { Page } from '@playwright/test';
import logger from '../utils/logger';
import config from '../utils/configReader';

export class LoginPage {

  constructor(private page: Page) {}

  async navigate() {

    logger.info('Navigating to login page');

    await this.page.goto(`${config.baseURL}/login`);

  }

  async loginWithData(username: string, password: string) {

    logger.info(`Logging in with user: ${username}`);

    await this.page.fill('#username', username);

    await this.page.fill('#password', password);

    await this.page.click('button[type="submit"]');

  }

}