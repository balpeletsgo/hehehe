import { test, expect } from "@playwright/test";

test.describe("authenticated flows", () => {
  test.slow();

  test("has session redirect to home page", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("http://localhost:3000/");
    await page.waitForTimeout(2000);

    const logoutButton = page.getByRole("button", { name: "Logout" });
    await expect(logoutButton).toBeVisible();
  });
});

test.describe("non-authenticated flows", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.slow();

  test("redirects to login page when not authenticated", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("http://localhost:3000/login");
    await page.waitForTimeout(2000);

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
  });
});
