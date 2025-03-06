import { Locator, Page, expect } from '@playwright/test';

export class NavigationPage {
  // readonly
  readonly page: Page;
  readonly formLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenuItem = page.getByText('Form Layouts');
    this.datePickerMenuItem = page.getByText('Datepicker');
  }

  //   private async selectGroupMenuItem(groupItemTitle: string) {
  //     const groupMenuItem = this.page.getByTitle(groupItemTitle);
  //     const expandedState = await groupMenuItem.getAttribute("aria-expanded");
  //     if (expandedState == "false") await groupMenuItem.click();
  //   }

  // ? Forms Section

  // Usage example 1 - locator in the constructor

  async formLayoutsPage() {
    await this.page.getByText('Forms').click();
    await this.formLayoutsMenuItem.click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/forms/layouts');
  }

  async datePickerPage() {
    await this.page.getByText('Forms').click();
    await this.datePickerMenuItem.click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/forms/datepicker');
  }

  // ? Modal & Overlays Section

  // Usage example 2 - locator in the method

  async dialogPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Dialog').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/modal-overlays/dialog');
  }

  async windowPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Window').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/modal-overlays/window');
  }

  async popoverPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Popover').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/modal-overlays/popover');
  }

  async toastrPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Toastr').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/modal-overlays/toastr');
  }

  async tooltipPage() {
    await this.page.getByText('Modal & Overlays').click();
    await this.page.getByText('Tooltip').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/modal-overlays/tooltip');
  }

  // ? Extra Components Section

  async calendarPage() {
    await this.page.getByText('Extra Components').click();
    await this.page.getByText('Calendar').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/extra-components/calendar');
  }

  // ? Charts Section

  async echartsPage() {
    await this.page.getByText('Charts', { exact: true }).click();
    await this.page.getByText('Echarts', { exact: true }).click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/charts/echarts');
  }

  // ? Tables & Data Section

  async smartTablePage() {
    await this.page.getByText('Tables & Data').click();
    await this.page.getByText('Smart Table').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/tables/smart-table');
  }

  async treeGridPage() {
    await this.page.getByText('Tables & Data').click();
    await this.page.getByText('Tree Grid').click();
    await expect(this.page).toHaveURL('http://localhost:4200/pages/tables/tree-grid');
  }

  // ? Auth Section

  async loginPage() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Login').click();
    await expect(this.page).toHaveURL('http://localhost:4200/auth/login');
  }

  async registerPage() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Register').click();
    await expect(this.page).toHaveURL('http://localhost:4200/auth/register');
  }

  async requestPasswordPage() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Request Password').click();
    await expect(this.page).toHaveURL('http://localhost:4200/auth/request-password');
  }

  async resetPasswordPage() {
    await this.page.getByText('Auth').click();
    await this.page.getByText('Reset Password').click();
    await expect(this.page).toHaveURL('http://localhost:4200/auth/reset-password');
  }
}
