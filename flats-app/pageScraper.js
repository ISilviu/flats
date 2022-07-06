const scraperObject = {
	url: 'https://www.sreality.cz/en/search/for-sale/apartments',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		
	}
}

module.exports = scraperObject;