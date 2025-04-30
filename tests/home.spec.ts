import { test, expect } from "@playwright/test";

test("home page has expected title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/gugu-gaga/);
});

test("home page has expected heading", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
});
