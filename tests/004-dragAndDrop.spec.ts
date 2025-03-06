import { expect } from '@playwright/test';
import { test } from '../test-options';

// globalsQaURL - variable desctibed in '../test-options' and used in 'playwright.config.ts

// here I work with iframe

test('drag and drop', async ({ page, globalsQaURL }) => {
  await page.goto(globalsQaURL);

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
  await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'));

  // more precise control

  await frame.locator('li', { hasText: 'High Tatras 4' }).hover();
  await page.mouse.down();
  await frame.locator('#trash').hover();
  await page.mouse.up();

  // Assertion
  await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
});
