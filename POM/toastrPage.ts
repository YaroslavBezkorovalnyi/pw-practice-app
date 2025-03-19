import { Page, expect } from '@playwright/test';

export class ToastrPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async showDesiredToastr(bannerPosition: string, bannerTitle: string, bannerContent: string, bannerTimeout: number) {
    // dropdown button
    const notificationDropDown = this.page.locator('nb-select.position-select button.select-button');
    await notificationDropDown.click();

    // dropdown list
    const dropDownList = this.page.locator('ul.option-list');
    await expect(dropDownList).toBeVisible();
    await dropDownList.getByText(bannerPosition).click();
    await expect(notificationDropDown).toHaveText(bannerPosition);

    // title field
    const titleField = this.page.locator('[name="title"]');
    await titleField.clear();
    await titleField.fill(bannerTitle);
    await expect(titleField).toHaveValue(bannerTitle);

    // content field
    const contentField = this.page.locator('input[name="content"]');
    await contentField.clear();
    await contentField.fill(bannerContent);
    await expect(contentField).toHaveValue(bannerContent);

    // banner timeout
    const timeoutField = this.page.locator('input[name="timeout"]');
    await timeoutField.clear();
    await timeoutField.fill(bannerTimeout.toString());
    await expect(timeoutField).toHaveValue(bannerTimeout.toString());

    // Show Toast button click
    const showToastButton = this.page.getByRole('button', { name: 'Show Toast' });
    await showToastButton.click();

    // Banner
    const toastBanner = this.page.locator('nb-toastr-container nb-toast');
    await expect(toastBanner).toBeVisible();
    await expect(toastBanner.locator('.title')).toContainText(bannerTitle);
    await expect(toastBanner.locator('.message')).toHaveText(bannerContent);

    // const boundingBox = await toastBanner.boundingBox();
    // expect(boundingBox).not.toBeNull();
    // expect(boundingBox?.x).toBeLessThan(50); // Should be near the left edge
    // expect(boundingBox?.y).toBeLessThan(50); // Should be near the top edge
    // expect(boundingBox?.width).toBeCloseTo(400, 4); // Allowing small variation
    // expect(boundingBox?.height).toBeCloseTo(33.6, 1); // Allowing small variation

    await this.page.waitForTimeout(bannerTimeout);
    await expect(toastBanner).not.toBeVisible();
  }
}
