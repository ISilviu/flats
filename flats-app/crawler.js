const { range } = require('lodash');
const { PrismaClient } = require('@prisma/client');
const puppeteer = require('puppeteer');

const mainPageUrl = process.env.CRAWL_PAGE_URL;
const urls = [mainPageUrl, ...range(2, 11).map(index => `${mainPageUrl}?page=${index}`)];
const prismaClient = new PrismaClient();

async function startCrawling() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    });

    let flats = [];

    const page = await browser.newPage();

    console.log('Crawling ...');
    for (const url of urls) {
        await page.goto(url);
        await page.waitForTimeout(1000);
        const currentPageFlats = await page.evaluate(() => {
            let flats = [];

            const flatTitles = document.getElementsByClassName('name ng-binding');
            const flatCards = document.getElementsByClassName('property ng-scope');

            for(let flatIndex = 0; flatIndex < flatTitles.length; ++flatIndex) {
                flats.push({
                    title: flatTitles[flatIndex].textContent,
                    image_url: flatCards[flatIndex].firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute('src'),
                });
            }

            return flats;
        });

        flats.push(...currentPageFlats);
    }

    console.log('Inserting in the database ...');
    await prismaClient.flat.createMany({
        data: flats,
    });

    console.log('The apartments were inserted in the database.');

    await browser.close();
}

startCrawling();