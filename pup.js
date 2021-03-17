const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'http://localhost:3000'

if (!url) {
  throw "Please provide URL as a first argument";
}
async function run () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'screenshot.png'});
  const html = await page.content();
  browser.close();
  fs.mkdirSync('build', {'recursive': true});
  fs.writeFile('build/index.html', html, error => {
    if (error) {
      console.error(error);
      return;
    }
  });
};
run();
