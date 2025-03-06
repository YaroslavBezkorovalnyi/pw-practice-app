import { Page, expect } from '@playwright/test';

export class DialogsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ? Open Dialog Form
  // 1st dialog open
  async openTheDialogWithComponents() {
    const dialogWithComponentButton = this.page
      .locator('nb-card', { hasText: 'Open Dialog' })
      .getByRole('button', { name: 'Open Dialog with component' });
    await dialogWithComponentButton.click();

    const dialogBox = this.page.locator('nb-dialog-container').filter({
      has: this.page.locator('nb-card-header', { hasText: 'This is a title passed to the dialog component' }),
    });
    await expect(dialogBox).toBeVisible();
    await expect(dialogBox.locator('nb-card-body')).toContainText(/.*Lorem ipsum dolor sit amet.*/);
  }

  // 2nd disalog open
  async openTheDialogWithTemplate() {
    const dialogWithTemplateButton = this.page
      .locator('nb-card', { hasText: 'Open Dialog' })
      .getByRole('button', { name: 'Open Dialog with template' });
    await dialogWithTemplateButton.click();

    const dialogBox = this.page.locator('nb-dialog-container').filter({
      has: this.page.locator('nb-card-header', { hasText: 'Template Dialog' }),
    });
    await expect(dialogBox).toBeVisible();
  }

  // 2nd dialog close
  async closeTheDialogWithTemplate() {
    const dialogBox = this.page.locator('nb-dialog-container').filter({
      has: this.page.locator('nb-card-header', { hasText: 'Template Dialog' }),
    });

    if (await dialogBox.isVisible()) {
      await dialogBox.getByRole('button', { name: 'Close Dialog' }).click();
      await expect(dialogBox).not.toBeVisible();
    }
  }
}
