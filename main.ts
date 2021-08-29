import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.104.0/testing/asserts.ts";
import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";
import {
  DOMParser,
  HTMLDocument,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const TRACKERS: string[] = ["ThePirateBay", "YggTorrent"];

enum TRACKERS_URL {
  thepiratebay = "https://thepiratebay.org",
  yggtorrent = "https://www4.yggtorrent.li",
}

interface Torrent {
  category: string | null;
  name: string | null;
  date: string | null;
  magnet: string | null;
  torrent: string | null;
  size: string | null;
  seeders: number | null;
  leechers: number | null;
  user: string | null;
  downloads: number | null;
  comments: number | null;
}

async function fetchThePirateBay(search: string): Promise<string> {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  const response = await page.goto(
    `${TRACKERS_URL.thepiratebay}/search.php?q=${search}`,
  );
  assertEquals(response.status(), 200);
  await page.click('label[title="Order by Seeders"]');
  const HTML: string = await page.content();
  browser.close();
  return HTML;
}

async function fetchYggTorrent(search: string): Promise<string> {
  const response = await fetch(
    `${TRACKERS_URL.yggtorrent}/engine/search?name=${search}&do=search&sort=seeders`,
  );
  assertEquals(response.status, 200);
  return await response.text();
}

async function fetchTracker(
  tracker: string,
  search: string,
): Promise<HTMLDocument> {
  let HTML: string | null = null;
  switch (tracker) {
    case TRACKERS[0]: {
      HTML = await fetchThePirateBay(search);
      break;
    }
    case TRACKERS[1]: {
      HTML = await fetchYggTorrent(search);
      break;
    }
    default: {
      console.error("ERROR");
      Deno.exit(1);
    }
  }
  assertExists(HTML);
  const result: HTMLDocument | null = new DOMParser().parseFromString(
    HTML,
    "text/html",
  );
  assertExists(result);
  return result;
}

function scrapThePirateBay(HTML: HTMLDocument): Torrent[] {
  const row = HTML.querySelectorAll("li.list-entry");
  const results: Torrent[] = [];
  for (const element of row) {
    const torrent: Torrent = {
      category: element.children[0]?.textContent,
      name: element.children[1]?.textContent,
      date: element.children[2]?.textContent,
      magnet: element.children[3]?.children[0]?.getAttribute("href"),
      torrent: null,
      size: element.children[4]?.textContent,
      seeders: parseInt(element.children[5]?.textContent),
      leechers: parseInt(element.children[6]?.textContent),
      user: element.children[7]?.textContent,
      downloads: null,
      comments: null,
    };
    results.push(torrent);
  }
  return results;
}

function scrapYggTorrent(HTML: HTMLDocument): Torrent[] {
  const row = HTML.querySelectorAll("table.table tr");
  const torrentLink = "https://www3.yggtorrent.nz/engine/download_torrent?id=";
  const results: Torrent[] = [];
  for (const element of row) {
    const torrent: Torrent = {
      category: element.children[0]?.textContent,
      name: element.children[1]?.textContent.replace(/[\n\r]/g, ""), // remove \n
      comments: parseInt(element.children[3].textContent),
      date: element.children[4]?.textContent.split(" ")[0],
      size: element.children[5]?.textContent,
      downloads: parseInt(element.children[6]?.textContent),
      seeders: parseInt(element.children[7]?.textContent),
      leechers: parseInt(element.children[8]?.textContent),
      magnet: null,
      torrent: torrentLink +
        element.children[2]?.children[0]?.getAttribute("target"),
      user: null,
    };
    results.push(torrent);
  }
  results.splice(0, 1);
  return results;
}

function scrapTorrent(tracker: string, HTML: HTMLDocument): Torrent[] {
  let results: Torrent[] = [];
  switch (tracker) {
    case TRACKERS[0]: {
      results = scrapThePirateBay(HTML);
      break;
    }
    case TRACKERS[1]: {
      results = scrapYggTorrent(HTML);
      break;
    }
    default: {
      console.error("ERROR");
      Deno.exit(1);
    }
  }
  assertExists(results);
  return results;
}

import yargs from "https://deno.land/x/yargs@v16.2.0-deno/deno.ts";

const argv = yargs(Deno.args)
  .option("search", {
    alias: "s",
    demandOption: true,
    describe: "Input your search string",
    type: "string",
  })
  .option("tracker", {
    alias: "t",
    demandOption: true,
    describe: "Choose a tracker to fetch",
    choices: TRACKERS,
    type: "string",
  })
  .help()
  .argv;

const HTML: HTMLDocument = await fetchTracker(argv.tracker, argv.search);
const results: Torrent[] = await scrapTorrent(argv.tracker, HTML);
console.log(JSON.stringify(results, null, 2))
