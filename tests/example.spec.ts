import { test, expect } from '@playwright/test';

let context;
let page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  await context.tracing.start({
    snapshots: true,
    screenshots: true
  });
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.tracing.stop({path: 'tracing_demo1.zip'});

  await context.close();
  await page.close();
});

test('has title', async () => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async () => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('mock api test', async ({ page }) => {

  await expect.poll(async() => {
    const response = await page.request.get("https://run.mocky.io/v3/8b0ec157-e8eb-4bab-83a3-e723baceca6f");
    return response.status();
  }, {
    message: 'Status code is not 200',
    intervals: [1000, 1500, 2000],
    timeout: 10000
  }).toBe(200);


});