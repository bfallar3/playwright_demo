import { test, expect } from "@playwright/test";
import  assert from 'assert';

test("prompt your name", async ({ page }) => {

  await page.goto('https://letcode.in/alert');

  page.on("dialog", async (dialog) => {
    assert.strictEqual(dialog.type(), "prompt");
    assert.strictEqual(dialog.message(), "Enter your name");

    await dialog.accept("hello Benjamin!");
  });

  const ele = await page.getByRole('button', { name: 'Prompt Alert' });
  await ele?.click();

  await expect(page.locator("p#myName")).toHaveText("Your name is: hello Benjamin!");    
});