import { core } from '@angular/compiler';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('Radio', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();

  const theGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
  await theGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true });

  const radioButtonStatus = await theGridForm.getByRole('radio', { name: 'Option 1' }).isChecked();
  await expect(theGridForm).toHaveScreenshot();
  await expect(page).toHaveScreenshot();
  // expect(radioButtonStatus).toBeTruthy();
  // await expect(theGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();
});

// .isChecked() - returns boolean
