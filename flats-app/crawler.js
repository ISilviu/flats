const { range } = require('lodash');
const winston = require('winston');
const { PrismaClient } = require('@prisma/client');
const puppeteer = require('puppeteer');

const mainPageUrl = process.env.CRAWL_PAGE_URL;
const urls = [mainPageUrl, ...range(2, 11).map(index => `${mainPageUrl}?page=${index}`)];
const prismaClient = new PrismaClient();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});

async function startCrawling() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        'ignoreHTTPSErrors': true
    });

    let flats = [];

    const page = await browser.newPage();

    logger.info('Started crawling ...');
    for (const url of urls) {
        await page.goto(url);
        logger.info(`Navigated to: ${url}`);

        await page.waitForTimeout(1000);
        const currentPageFlats = await page.evaluate(() => {
            let flats = [];

            const flatTitles = document.getElementsByClassName('name ng-binding');
            const flatCards = document.getElementsByClassName('property ng-scope');

            if (flatTitles.length != flatCards.length) {
                logger.warn(
                    `The flat titles count didn't match the number of flat cards found at url: ${url}\r\nThis page will be skipped to avoid errors.`
                );
                return flats;
            }

            for (let flatIndex = 0; flatIndex < flatTitles.length; ++flatIndex) {
                flats.push({
                    title: flatTitles[flatIndex].textContent,
                    image_url: flatCards[flatIndex].firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute('src'),
                });
            }

            return flats;
        });

        flats.push(...currentPageFlats);
    }

    await browser.close();

    logger.info(`Inserting ${flats.length} flats to the database ...`);

    const { count: insertedCount } = await prismaClient.flat.createMany({
        data: flats,
    });

    logger.info(`${insertedCount} flats were successfully inserted to the database.`);
}

startCrawling();