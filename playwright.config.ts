import { defineConfig, devices } from "@playwright/test";

// @ts-nocheck
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["json", { outputFile: "playwright-report/report.json" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    video: {
      mode: "on",
      size: { width: 1366, height: 768 },
    },
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
        storageState: "./playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
