import { test as base } from '@playwright/test';

export type TestOptions = {
  globalsQaURL: string;
  formLayoutPageFixture: string;
  goToWinndowsPage: string;
  fillOutTheWindowForm: string;
};

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', { option: true }],

  formLayoutPageFixture: async ({ page }, use) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await use('');
  },
});
