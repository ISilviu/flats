const { range } = require('lodash');
const puppeteer = require('puppeteer');

const mainPageUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';
const urls = [mainPageUrl, ...range(2, 11).map(index => `${mainPageUrl}?page=${index}`)];

async function startCrawling() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    });

    let apartments = [];

    const page = await browser.newPage();

    for (const url of urls) {
        await page.goto(url);
        await page.waitForTimeout(1000);
        const currentPageApartments = await page.evaluate(() => {
            let apartments = [];

            const apartmentTitles = document.getElementsByClassName('name ng-binding');
            const apartmentDivElements = document.getElementsByClassName('property ng-scope');

            let apartmentIndex = 0;
            for (const apartmentElement of apartmentDivElements) {
                apartments.push({
                    title: apartmentTitles[apartmentIndex].textContent,
                    image: apartmentElement.firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute('src'),
                });
                ++apartmentIndex;
            }

            return apartments;
        });

        apartments.push(...currentPageApartments);
    }

    console.log(apartments);
    console.log(apartments.length);
}

startCrawling();