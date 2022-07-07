const { range } = require('lodash');
const { PrismaClient } = require('@prisma/client');
const puppeteer = require('puppeteer');

const mainPageUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';
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

            let apartmentIndex = 0;
            for (const apartmentElement of flatCards) {
                flats.push({
                    title: flatTitles[apartmentIndex].textContent,
                    image_url: apartmentElement.firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute('src'),
                });
                ++apartmentIndex;
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
}

startCrawling();