import { defineConfig } from '@playwright/test';

const PORT = 4331;

export default defineConfig({
  testDir: 'sensors/browser',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: `http://localhost:${PORT}`, channel: process.env.CI ? undefined : 'chrome' },
  webServer: {
    command: `env -u CLAUDECODE npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'phone', use: { viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
  ],
});
