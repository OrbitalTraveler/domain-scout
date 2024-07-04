"use server";

import { scrapeDomainPrices } from "../scraper";

export async function scrapeAndStoreDomain(domain: string) {
  if (!domain) return;

  try {
    const scrapedDomain = await scrapeDomainPrices(domain);
  } catch (error: any) {
    throw new Error(
      `Failed to scrape domain price: ${error.message}`
    );
  }
}
