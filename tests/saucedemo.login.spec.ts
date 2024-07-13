import { test, expect } from '@playwright/test';
import { LoginPage } from './saucedemo.login.pom';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Add your assertions here
  await expect(page.locator('[data-test=title]')).toHaveText('Products');
});

test('locked out login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('locked_out_user', 'secret_sauce');

  // Assert that an error message is displayed
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
});
