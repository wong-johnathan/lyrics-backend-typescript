import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import UserAgentPlugin from "puppeteer-extra-plugin-anonymize-ua";
import fs from "fs";

puppeteer.use(StealthPlugin());
puppeteer.use(UserAgentPlugin());

export const puppeteerClient = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}) => {
  const browser = await puppeteer.launch({
    defaultViewport: null, // Disable default viewport size for better emulation
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(url, { timeout: 30000 });

  const elements = await page.$$(".Lyrics__Container-sc-1ynbvzw-1.kUgSbL");
  const lyrics = await Promise.all(
    elements.map(async container => {
      return await container.evaluate(el => el.innerHTML);
    }),
  );

  fs.writeFileSync(
    `./lyrics/${id}.txt`,
    lyrics
      .map(row => {
        const formatted = row.replace(/<br>/gi, "\n");
        return formatted.replace(/<[^>]*>/g, "");
      })
      .join("\n"),
    "utf-8",
  );
  await browser.close();
  console.log("browser closed");
};
