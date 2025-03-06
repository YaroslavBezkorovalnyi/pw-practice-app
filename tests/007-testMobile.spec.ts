import { test, expect } from '@playwright/test';

// run with 'mobileIPhone13' project

test('input fields', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('.sidebar-toggle').click();
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
  await page.locator('.sidebar-toggle').click();

  const gridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByPlaceholder('Email');

  await gridEmailInput.fill('test@test.com');
  //   await gridEmailInput.clear();
  //   await gridEmailInput.pressSequentially('test@2test.com', { delay: 250 });

  // generic assertion
  const inputValue = await gridEmailInput.inputValue();
  expect(inputValue).toEqual('test@test.com');

  // locator assetion
  await expect(gridEmailInput).toHaveValue('test@test.com');
});
