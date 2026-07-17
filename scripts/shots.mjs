// Maakt langwerpige screenshots van de portfolio-sites voor /public/cases.
// Eenmalig draaien met: node scripts/shots.mjs
// Puppeteer is bewust geen projectafhankelijkheid: installeer 'm tijdelijk met
//   npm install puppeteer --no-save
import puppeteer from "puppeteer";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Vaste afmeting: alle screenshots even lang, zodat de aspect-ratio in de
// <Image>-tags (1280x3200) altijd klopt en er geen vervorming ontstaat.
const WIDTH = 1280;
const HEIGHT = 3200;

const SITES = [
  { slug: "happy-face", url: "https://website-happy-test.vercel.app/" },
  { slug: "connect-rise", url: "https://connectrise-test.vercel.app/" },
  { slug: "freezo", url: "https://www.freezo.nl" },
  { slug: "groeituin", url: "https://groeituin.vercel.app/" },
];

const OUT_DIR = "public/cases";

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
await mkdir(OUT_DIR, { recursive: true });

for (const site of SITES) {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  try {
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60000 });
    // Even scrollen zodat lazy-loaded afbeeldingen alsnog inladen, daarna terug naar boven.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 2500));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1200));

    const png = await page.screenshot({ type: "png", fullPage: false });
    await sharp(png)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
      .webp({ quality: 78 })
      .toFile(`${OUT_DIR}/${site.slug}.webp`);

    console.log(`ok  ${site.slug}`);
  } catch (err) {
    console.error(`FAIL ${site.slug}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("klaar");
