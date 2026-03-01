import { request, APIRequestContext } from '@playwright/test';

export class UserAPI {

  private apiContext!: APIRequestContext;

  async init() {

    this.apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Accept': 'application/json'
      }
    });

  }

  async getUsers() {

    return await this.apiContext.get('/users');

  }

}