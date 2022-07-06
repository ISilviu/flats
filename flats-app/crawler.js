const puppeteer = require('puppeteer');

const pageUrl = 'https://www.sreality.cz/en/search/for-sale/apartments';

async function startCrawling() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    });

    const page = await browser.newPage();
    await page.goto(pageUrl);

    let texts = await page.evaluate(() => {
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

    console.log(texts);
    console.log(texts.length);
}

startCrawling();