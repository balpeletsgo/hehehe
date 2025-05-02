import { test as setup, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.waitForTimeout(500);

  const emailInput = page.getByRole("textbox", { name: "Email" });
  await expect(emailInput).toBeVisible();
  await emailInput.pressSequentially("johndoe@example.com", { delay: 100 });
  await page.waitForTimeout(100);

  const passwordInput = page.getByRole("textbox", { name: "Password" });
  await expect(passwordInput).toBeVisible();
  await passwordInput.pressSequentially("password", { delay: 100 });
  await page.waitForTimeout(100);

  await page.getByRole("button", { name: "Login" }).click();

  const isLoading = page.getByRole("button", { name: "Logging in..." });
  await expect(isLoading).toBeVisible();
  await page.waitForTimeout(2000);

  await page.waitForURL("http://localhost:3000/");
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
