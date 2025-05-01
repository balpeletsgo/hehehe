import { test, expect } from "@playwright/test";

test.describe("authentication", () => {
  test.slow();

  test("login success", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(500);

    const heading = page.getByRole("heading", { name: "Welcome back!" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Login to your Acme Inc account");
    await expect(description).toBeVisible();

    const emailInput = page.getByRole("textbox", { name: "Email" });
    await expect(emailInput).toBeVisible();
    await emailInput.pressSequentially("iqbal@example.com", { delay: 100 });
    await page.waitForTimeout(100);

    const passwordInput = page.getByRole("textbox", { name: "********" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.pressSequentially("password", { delay: 100 });
    await page.waitForTimeout(100);

    const navigationPromise = page.waitForURL("http://localhost:3000/");

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const isLoading = page.getByRole("button", { name: "Logging in..." });
    await expect(isLoading).toBeVisible();
    await page.waitForTimeout(2000);

    await navigationPromise;

    await expect(page).toHaveURL("http://localhost:3000/");

    const toast = page.getByRole("listitem");
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Welcome back!");

    const logoutButton = page.getByRole("button", { name: "Logout" });
    await expect(logoutButton).toBeVisible();
    await page.waitForTimeout(3000);
  });

  test("has session redirect to home page", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(500);

    const heading = page.getByRole("heading", { name: "Welcome back!" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Login to your Acme Inc account");
    await expect(description).toBeVisible();

    const emailInput = page.getByRole("textbox", { name: "Email" });
    await expect(emailInput).toBeVisible();
    await emailInput.pressSequentially("iqbal@example.com", { delay: 100 });
    await page.waitForTimeout(100);

    const passwordInput = page.getByRole("textbox", { name: "********" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.pressSequentially("password", { delay: 100 });
    await page.waitForTimeout(100);

    const navigationPromise = page.waitForURL("http://localhost:3000/");

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const isLoading = page.getByRole("button", { name: "Logging in..." });
    await expect(isLoading).toBeVisible();
    await page.waitForTimeout(2000);

    await navigationPromise;

    await expect(page).toHaveURL("http://localhost:3000/");

    const toast = page.getByRole("listitem");
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Welcome back!");

    await page.waitForTimeout(1000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("http://localhost:3000/");

    const logoutButton = page.getByRole("button", { name: "Logout" });
    await expect(logoutButton).toBeVisible();
  });

  test("logout success", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(500);

    const heading = page.getByRole("heading", { name: "Welcome back!" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Login to your Acme Inc account");
    await expect(description).toBeVisible();

    const emailInput = page.getByRole("textbox", { name: "Email" });
    await expect(emailInput).toBeVisible();
    await emailInput.pressSequentially("iqbal@example.com", { delay: 100 });
    await page.waitForTimeout(100);

    const passwordInput = page.getByRole("textbox", { name: "********" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.pressSequentially("password", { delay: 100 });
    await page.waitForTimeout(100);

    const navigationPromise = page.waitForURL("http://localhost:3000/");

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const isLoading = page.getByRole("button", { name: "Logging in..." });
    await expect(isLoading).toBeVisible();
    await page.waitForTimeout(2000);

    await navigationPromise;

    await expect(page).toHaveURL("http://localhost:3000/");

    const toast = page.getByRole("listitem");
    await expect(toast).toBeVisible();

    await expect(toast).toContainText("Welcome back!");

    const logoutButton = page.getByRole("button", { name: "Logout" });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    const logoutLoading = page.getByRole("button", { name: "Logging out..." });
    await expect(logoutLoading).toBeVisible();
    await page.waitForTimeout(6000);

    const logoutPromise = page.waitForURL("http://localhost:3000/login");
    await page.waitForTimeout(2000);

    await logoutPromise;

    await expect(page).toHaveURL("http://localhost:3000/login");
    await expect(heading).toBeVisible();
    await expect(description).toBeVisible();

    await page.waitForTimeout(2000);
  });
});
