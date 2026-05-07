import { chromium } from 'playwright';

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Start the dev server (assuming it's running on port 5173)
  // In a real setup, you'd start it programmatically or ensure it's running

  // Navigate to the app
  await page.goto('http://localhost:5173');

  // Capture default (English) state
  await page.screenshot({ path: 'docs/static/img/screenshots/language-switching-en.png', fullPage: true });

  // Switch to Hindi
  await page.click('text=HI');
  await page.waitForTimeout(500); // Wait for language change
  await page.screenshot({ path: 'docs/static/img/screenshots/language-switching-hi.png', fullPage: true });

  // Switch to French
  await page.click('text=FR');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'docs/static/img/screenshots/language-switching-fr.png', fullPage: true });

  await browser.close();

  console.log('Screenshots captured successfully!');
}

captureScreenshots().catch(console.error);