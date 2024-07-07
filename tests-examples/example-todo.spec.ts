import { test, expect } from '@playwright/test';

test('todo simple test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/all');

  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await expect(page.locator('div').filter({ hasText: 'Buy milk' }).getByRole('checkbox')).not.toBeChecked();
  
  await page.locator('div').filter({ hasText: 'Buy milk' }).getByRole('checkbox').check();
  
  await expect(page.locator('app-todo')).toContainText('Finish service functionality');
  await expect(page.locator('app-todo')).toContainText('Buy milk');
});

