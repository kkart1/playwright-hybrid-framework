import { test as base, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const authFile = 'auth/storageState.json';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Check if auth file exists before trying to use it
    if (!fs.existsSync(authFile)) {
      console.log(`Note: ${authFile} not found. This test requires prior authentication.`);
      // Create the auth directory if it doesn't exist
      const authDir = path.dirname(authFile);
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
    }
    
    await use(page);
  },
});

export { expect };