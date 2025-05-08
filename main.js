// main.js
const { launchBrowser } = require("./browser");
const { scrapeNovelDetails, scrapeChapters } = require("./scraper");
const { 
  insertNovel, 
  insertChapters, 
  checkNovelExists,
  getLatestChapterNumber,
  closeDbConnection
} = require("./DatabaseOperations");

// Main execution function
async function main() {

    const urls = [
          "https://www.mvlempyr.com/novel/d-e-m-o-n-s-getting-summoned-weekly-isnt-so-bad",
  "https://www.mvlempyr.com/novel/da-xuan-martial-saint",
  "https://www.mvlempyr.com/novel/daddy-ceos-beloved-wife",
  "https://www.mvlempyr.com/novel/daddy-i-dont-want-to-marry",
  "https://www.mvlempyr.com/novel/daily-life-of-a-cultivation-judge",
  "https://www.mvlempyr.com/novel/daily-life-of-a-transmigrating-villain",
  "https://www.mvlempyr.com/novel/daily-life-of-a-villains-mother",
  "https://www.mvlempyr.com/novel/daily-life-rpg-system",
  "https://www.mvlempyr.com/novel/damn-i-awakened-with-a-horror-system",
  "https://www.mvlempyr.com/novel/damn-i-have-to-marry-the-strongest-antagonist-at-the-start",
  "https://www.mvlempyr.com/novel/damn-i-recarneted-as-a-judge-in-fantasy-world",
  "https://www.mvlempyr.com/novel/damn-it-im-surrounded-by-childhood-sweethearts",
  "https://www.mvlempyr.com/novel/damn-reincarnation",
  "https://www.mvlempyr.com/novel/dance-with-the-nightingale",
  "https://www.mvlempyr.com/novel/dancing-on-the-golden-ashes",
  "https://www.mvlempyr.com/novel/dao-of-the-bizarre-immortal",
  "https://www.mvlempyr.com/novel/dark-magus-returns",
  "https://www.mvlempyr.com/novel/dark-matter-ascension",
  "https://www.mvlempyr.com/novel/dark-warlock-in-the-apocalypse",
  "https://www.mvlempyr.com/novel/dashing-student",
  "https://www.mvlempyr.com/novel/dead-man-walking-living-by-day-dead-by-night",
  "https://www.mvlempyr.com/novel/dear-immortal-tyrant",
  "https://www.mvlempyr.com/novel/death-and-me",
  "https://www.mvlempyr.com/novel/death-guns-in-another-world",
  "https://www.mvlempyr.com/novel/death-is-the-only-ending-for-the-villain",
  "https://www.mvlempyr.com/novel/death-march-kara-hajimaru-isekai-kyusoukyoku-wn",
  "https://www.mvlempyr.com/novel/debauchery-of-a-soul-eating-wraith",
  "https://www.mvlempyr.com/novel/debut-or-die",
  "https://www.mvlempyr.com/novel/deep-sea-embers",
  "https://www.mvlempyr.com/novel/deep-sea-fish-hunting-specialty-broadcast",
  "https://www.mvlempyr.com/novel/delicate-mother-of-a-villain",
  "https://www.mvlempyr.com/novel/delusion-the-outlander",
  "https://www.mvlempyr.com/novel/delve",
  "https://www.mvlempyr.com/novel/demon-hunters-cooking-manual",
  "https://www.mvlempyr.com/novel/demon-lord-erotic-adventure-in-another-world",
  "https://www.mvlempyr.com/novel/demon-lords-reincarnation",
  "https://www.mvlempyr.com/novel/demon-noble-girl-story-of-a-careless-demon",
  "https://www.mvlempyr.com/novel/demon-slaying-gaining-60-years-of-cultivation-from-the-start",
  "https://www.mvlempyr.com/novel/demon-wangs-golden-favorite-fei",
  "https://www.mvlempyr.com/novel/demonic-dragon-harem-system",
  "https://www.mvlempyr.com/novel/demonic-witches-harem-having-descendants-make-me-overpowered",
  "https://www.mvlempyr.com/novel/demons-diary",
  "https://www.mvlempyr.com/novel/demons-virtue",
  "https://www.mvlempyr.com/novel/depraved-noble-forced-to-live-the-debaucherous-life-of-an-evil-noble",
  "https://www.mvlempyr.com/novel/descent-of-the-phoenix---13-years-old-princess-consort",
  "https://www.mvlempyr.com/novel/destiny-games",
  "https://www.mvlempyr.com/novel/destroying-my-own-novel",
      "https://www.mvlempyr.com/novel/destroying-my-own-world",
  "https://www.mvlempyr.com/novel/detective-ghost-empress",
  "https://www.mvlempyr.com/novel/deus-necros",
  "https://www.mvlempyr.com/novel/deviant-no-longer-human",
  "https://www.mvlempyr.com/novel/devil-slave-satan-system",
  "https://www.mvlempyr.com/novel/devil-venerable-also-wants-to-know",
  "https://www.mvlempyr.com/novel/devils-warmth",
  "https://www.mvlempyr.com/novel/devouring-evolution-i-reborn-as-an-arctic-wolf",
  "https://www.mvlempyr.com/novel/devouring-monarch-rebirth-of-the-profane-phoenix",
  "https://www.mvlempyr.com/novel/devouring-the-heavens",
  "https://www.mvlempyr.com/novel/di-wang-gong-lue",
  "https://www.mvlempyr.com/novel/did-she-already-know-what-i-would-ask-her-for",
  "https://www.mvlempyr.com/novel/dimension-system-sss-rank-talent-awakening",
      ];

    const browser = await launchBrowser();

    try {
        for (let url of urls) {
            console.log(`Scraping novel from URL: ${url}`);
            const page = await browser.newPage();

            try {
                // Set up the page
                await page.setUserAgent(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                );
                await page.goto(url, { waitUntil: "networkidle2" });

                // // Scrape novel details
                // const novelData = await scrapeNovelDetails(page);
                // console.log("Novel information:", novelData);

                // if (!novelData.title || !novelData.author) {
                //     console.log("Missing essential novel data (title or author). Exiting.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Store novel in database or get existing ID
                // const novelId = await insertNovel({
                //     title: novelData.title,
                //     author: novelData.author,
                //     description: novelData.synopsis,
                //     cover_image_url: novelData.imageLink,
                //     tags: novelData.tags,
                //     genres: novelData.genres,
                //     status: novelData.status,
                // });

                // if (!novelId) {
                //     console.log("Failed to process novel data. Skipping.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Get latest chapter from DB to determine how many chapters to scrape
                // const latestChapterNumber = await getLatestChapterNumber(novelId);
                // console.log(`Current chapters in database: ${latestChapterNumber}`);
                // console.log(`Total chapters on site: ${novelData.numOfCh}`);

                // if (latestChapterNumber >= novelData.numOfCh) {
                //     console.log("Novel is already up to date. No new chapters to scrape.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Calculate how many new chapters to scrape
                // const chaptersToScrape = novelData.numOfCh - latestChapterNumber;
                // console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

                // // Scrape chapters (only the new ones)
                // const scrapedChapters = await scrapeChapters(page, novelData.numOfCh, latestChapterNumber);
                // console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Scrape novel details
        const novelData = await scrapeNovelDetails(page);
        console.log("Novel information:", novelData);

        if (!novelData.title || !novelData.author) {
            console.log("Missing essential novel data (title or author). Exiting.");
            continue;  // Skip this novel and move to the next one
        }

        // Store novel in database or get existing ID
        const novelId = await insertNovel({
            title: novelData.title,
            author: novelData.author,
            description: novelData.synopsis,
            cover_image_url: novelData.imageLink,
            tags: novelData.tags,
            genres: novelData.genres,
            status: novelData.status,
        });

        if (!novelId) {
            console.log("Failed to process novel data. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Get latest chapter from DB to determine how many chapters to scrape
        const latestChapterNumber = await getLatestChapterNumber(novelId);
        
        // Use the most reliable chapter count - prefer numOfCh but fall back to chapters
        // if numOfCh is zero
        const totalChapters = novelData.numOfCh || parseInt(novelData.chapters) || 0;
        
        console.log(`Current chapters in database: ${latestChapterNumber}`);
        console.log(`Total chapters on site: ${totalChapters}`);

        if (latestChapterNumber >= totalChapters || totalChapters === 0) {
            console.log("Novel is already up to date or no chapters found. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Calculate how many new chapters to scrape
        const chaptersToScrape = totalChapters - latestChapterNumber;
        console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

        // Scrape chapters (only the new ones)
        const scrapedChapters = await scrapeChapters(page, totalChapters, latestChapterNumber);
        console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Store new chapters in database
                if (scrapedChapters.length > 0) {
                    const newChaptersCount = await insertChapters(novelId, scrapedChapters);
                    console.log(`${newChaptersCount} new chapters stored in database with Novel ID: ${novelId}`);
                } else {
                    console.log("No new chapters to store.");
                }

            } catch (error) {
                console.error(`Error during scraping URL: ${url}`, error);
            } finally {
                // Close the page after scraping
                await page.close();
            }
        }

    } catch (error) {
        console.error("Error during scraping process:", error);
    } finally {
        // Close browser when done
        await browser.close();
        // Close database connection
        await closeDbConnection();
        console.log("Scraping process completed");
    }
}

// Execute the main function
main().catch(console.error);
