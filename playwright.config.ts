import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout:30*1000,
  testDir: './tests',
 
  fullyParallel: false,
  
  retries:1,
  workers:1,
  
  reporter: [['html',{outputFolder:'../reports/html-report'}],['allure-playwright',{outputFolder:'../reports/allure-results'}]],

  use: {
    // baseURL: 'http://localhost:3000',
    screenshot : 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport:{width:1280,height:720},
    ignoreHTTPSErrors:true,
    permissions:['geolocation'],
    
  },

 
  projects: [
  {name: 'chromium',use: { ...devices['Desktop Chrome'] },},
  {name: 'firefox',use: { ...devices['Desktop Firefox'] },},
  {name: 'webkit',use: { ...devices['Desktop Safari'] }, },
]
});
