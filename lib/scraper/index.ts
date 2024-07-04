"use server";

import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

export async function scrapeDomainPrices(name: string) {
  //www.domain.com

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://www.domain.com/");

  // Type into search box
  await page.type(".domainSearch__input", name, {
    delay: 100,
  });

  // Click on search button
  await page.click(".domainSearch__submit");

  // Wait for the search result to load
  await page.waitForSelector(".domain-dev");

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector("text//yr");

  const text = await textSelector?.evaluate((el) => el.textContent);

  // Log the text content
  console.log(text);

  // Close the browser
  await browser.close();
}

export async function scrapePorkbunPrices(name: string) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );

  // Navigate the page to a URL
  await page.goto("https://porkbun.com/");

  // Type into search box
  await page.type("#domainSearchInput", name, {
    delay: 100,
  });

  // Click on search button
  await page.click(".domainSearchButton");

  // Wait for the search result to load
  const price = await page.waitForSelector(
    ".childContent > div > div"
  );

  // Get all text from childContent
  const textSelector = await page.waitForSelector("text/ / year");

  const text = await price?.evaluate((el) => el.textContent);
  const newText = text?.split(" ");

  // Log the text content
  console.log(text?.split(" ")[1]);

  // Close the browser
  await browser.close();
}

export async function scrapeNameCheapDomainPrices(name: string) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://www.namecheap.com/");

  // Type into search box
  await page.type("#static-domain-search-domain-search-input", name, {
    delay: 100,
  });

  // Click on search button
  await page.click(".search-domain-btn");

  // Wait for the search result to load
  await page.waitForSelector(".domain-dev");

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector("text//yr");

  const text = await textSelector?.evaluate((el) => el.textContent);

  // Log the text content
  console.log(text);

  // Close the browser
  await browser.close();
}
