import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.AJAX_URL);
  await page.getByText('Button Triggering AJAX Request').click();
});

test('auto waiting', async ({ page }) => {
  const successButton = page.locator('.bg-success');

  // await successButton.click();

  // const text = await successButton.textContent();
  // await successButton.waitFor({ state: "attached" });
  // const text = await successButton.allTextContents();

  // expect(text).toContain("Data loaded with AJAX get request.");

  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {
    timeout: 17000,
  });
});

test('alternative way', async ({ page }) => {
  const successButton = page.locator('.bg-success');

  /// ____ wait for element
  // await page.waitForSelector(".bg-success");

  /// ____ wait for particular response json
  await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

  // ____ wait for network API calls to be completed ('NOT RECOMMENDED')
  // await page.waitForLoadState('networkidle');

  const text = await successButton.allTextContents();
  expect(text).toContain('Data loaded with AJAX get request.');
});

test('timeout', async ({ page }) => {
  test.slow();
  const successButton = page.locator('.bg-success');
  await successButton.click();
});
