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
       "https://www.mvlempyr.com/novel/observation-record-of-a-self-proclaimed-villainess-fiance",
    "https://www.mvlempyr.com/novel/obtaining-10x-rewards-reincarnated-into-a-novel-as-a-side-character",
    "https://www.mvlempyr.com/novel/odyssey-of-survival",
    "https://www.mvlempyr.com/novel/odyssey-of-the-blind-god",
    "https://www.mvlempyr.com/novel/oh-my-god-the-goddess-secretly-gave-birth-to-three-obedient-daughters-for-me",
    "https://www.mvlempyr.com/novel/oh-no-after-i-reincarnated-my-moms-became-son-cons",
    "https://www.mvlempyr.com/novel/okami-wa-nemuranai",
    "https://www.mvlempyr.com/novel/old-world-extra",
    "https://www.mvlempyr.com/novel/omega-summoner",
    "https://www.mvlempyr.com/novel/omnipotent-husband-system",
    "https://www.mvlempyr.com/novel/omniscient-first-persons-viewpoint",
    "https://www.mvlempyr.com/novel/omniscient-readers-viewpoint",
    "https://www.mvlempyr.com/novel/on-the-other-side-i-quit-being-human",
    "https://www.mvlempyr.com/novel/on-the-path-of-cultivation-to-become-god",
    "https://www.mvlempyr.com/novel/once-i-wanted-to-be-a-good-person",
    "https://www.mvlempyr.com/novel/one-last-system",
    "https://www.mvlempyr.com/novel/one-man-army",
    "https://www.mvlempyr.com/novel/one-more-catty-one-more-attribute-point",
    "https://www.mvlempyr.com/novel/one-piece-dont-worry-im-a-doctor",
    "https://www.mvlempyr.com/novel/one-piece-with-sign-in-system",
    "https://www.mvlempyr.com/novel/one-wild-night",
    "https://www.mvlempyr.com/novel/online-blades-of-eternity",
    "https://www.mvlempyr.com/novel/online-game-god-level-assassin-i-am-the-shadow",
    "https://www.mvlempyr.com/novel/online-game-i-started-with-max-charisma-and-caught-the-goddesss-eye",
    "https://www.mvlempyr.com/novel/online-game-starting-with-an-sss-level-plundering-talent",
    "https://www.mvlempyr.com/novel/online-game-starting-with-sss-ranked-summons",
    "https://www.mvlempyr.com/novel/online-in-another-world",
    "https://www.mvlempyr.com/novel/only-sense-online-ln",
    "https://www.mvlempyr.com/novel/only-wisdom-awakened",
    "https://www.mvlempyr.com/novel/only-with-your-heart",
    "https://www.mvlempyr.com/novel/otaku-witch",
    "https://www.mvlempyr.com/novel/other-worlds-monster-breeder",
    "https://www.mvlempyr.com/novel/otherworld-nation-founding-chronicles",
    "https://www.mvlempyr.com/novel/otherworld-trpg-game-master",
    "https://www.mvlempyr.com/novel/otherworldly-desert-dust",
    "https://www.mvlempyr.com/novel/otherworldly-evil-monarch",
    "https://www.mvlempyr.com/novel/otoko-nara-ikkokuichijou-no-aruji-o-mezasa-nakya-ne",
    "https://www.mvlempyr.com/novel/otome-game-no-heroine-de-saikyou-survival-ln",
    "https://www.mvlempyr.com/novel/otome-game-rokkushuume-automode-ga-kiremashita",
    "https://www.mvlempyr.com/novel/otonari-no-tenshi-sama-ni-itsu-no-ma-ni-ka-dame-ningen-ni-sareteita-ken-wn",
    "https://www.mvlempyr.com/novel/oukoku-e-tsuzuku-michi",
    "https://www.mvlempyr.com/novel/our-binding-love-my-gentle-tyrant",
    "https://www.mvlempyr.com/novel/our-second-master",
    "https://www.mvlempyr.com/novel/ouroboros-record-circus-of-oubeniel",
    "https://www.mvlempyr.com/novel/overgeared",
    "https://www.mvlempyr.com/novel/overlimit-skill-holder",
    "https://www.mvlempyr.com/novel/overlord-ln"
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
