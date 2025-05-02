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

  test("login without input", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(500);

    const heading = page.getByRole("heading", { name: "Welcome back" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Login to your Acme Inc account");
    await expect(description).toBeVisible();

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const emailRequired = page.getByText("Email is required");
    const passwordRequired = page.getByText("Password is required");

    await expect(emailRequired).toBeVisible();
    await expect(passwordRequired).toBeVisible();

    await page.waitForTimeout(1000);
  });

  test("login invalid email", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(500);

    const heading = page.getByRole("heading", { name: "Welcome back" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Login to your Acme Inc account");
    await expect(description).toBeVisible();

    const emailInput = page.getByRole("textbox", { name: "Email" });
    await expect(emailInput).toBeVisible();
    await emailInput.pressSequentially("iqbal@example.comm", { delay: 100 });
    await page.waitForTimeout(100);

    const passwordInput = page.getByRole("textbox", { name: "Password" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.pressSequentially("password", { delay: 100 });
    await page.waitForTimeout(100);

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const isLoading = page.getByRole("button", { name: "Logging in..." });
    await expect(isLoading).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(isLoading).toBeHidden();

    const invalidText = page.getByText(
      "Credentials provided are invalid, please check your credentials and try again.",
    );
    await expect(invalidText).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test("login invalid password", async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);

    await page.goto("http://localhost:3000/login");
    await page.waitForTimeout(500);

    const heading = page.getByRole("heading", { name: "Welcome back" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Login to your Acme Inc account");
    await expect(description).toBeVisible();

    const emailInput = page.getByRole("textbox", { name: "Email" });
    await expect(emailInput).toBeVisible();
    await emailInput.pressSequentially("iqbal@example.com", { delay: 100 });
    await page.waitForTimeout(100);

    const passwordInput = page.getByRole("textbox", { name: "Password" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.pressSequentially("passwordd", { delay: 100 });
    await page.waitForTimeout(100);

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const isLoading = page.getByRole("button", { name: "Logging in..." });
    await expect(isLoading).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(isLoading).toBeHidden();

    const invalidText = page.getByText(
      "Credentials provided are invalid, please check your credentials and try again.",
    );
    await expect(invalidText).toBeVisible();
    await page.waitForTimeout(2000);
  });
});
