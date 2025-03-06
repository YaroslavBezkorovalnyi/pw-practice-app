import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    // viewport: { width: 1280, height: 720 },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    //video: {mode: 'on', size: { width: 1920, height: 1080 },}
  },

  projects: [
    // {
    //   name: 'dev',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4201',
    //   },
    // },

    // { name: 'mobile', testMatch: 'testMobile.spec.ts', use: { ...devices['iPhone 13 Pro'] } }, // ! doesn't work correctly

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'chromiumFullSize',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },

    {
      name: 'mobileIPhone13',
      testMatch: '007-testMobile.spec.ts',
      use: { viewport: { width: 390, height: 844 } },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
