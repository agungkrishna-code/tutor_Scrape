const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto("https://www.traversymedia.com");

  // Wait for the courses to be loaded
  await page.waitForSelector("#courses .card");

  const courses = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#courses .card"), (e) => ({
      title: e.querySelector(".card-body h3").innerText,
    }))
  );

  console.log(courses);

  await browser.close();
}

run();
