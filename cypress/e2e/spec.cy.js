import AmazonPage from "../pom/AmazonPage"
import EbayPage from "../pom/EbayPage"

describe('Search Product', () => {
  let USD_IDR_RATE
  const productsListAmazon = []
  const producstListEbay = []
  const keywords = 'iPhone 15 Pro'
  const splitKeywords = keywords.toLowerCase().split(' ')
  const amazonPage = new AmazonPage();
  const ebayPage = new EbayPage()
  before(() => {
    // to get latest usd to idr rate
    cy.visit('https://www.google.com/search?q=usd+to+id')
    cy.get('span.DFlfde.SwHCTb')
      .invoke('attr', 'data-value')
      .then((dataValue) => {
        USD_IDR_RATE = dataValue
        console.log(USD_IDR_RATE)
      })
  });
  it(`Search Product ${keywords} in Ebay`, () => {
    ebayPage.visit()
    ebayPage.searchTextField(keywords)
    ebayPage.productItem().each(($el) => {
      const name = $el.find('.s-item__title span[role="heading"]').text()
      const price = formatCurrencyIDRToUSD($el.find('.s-item__price', USD_IDR_RATE).text()) || 0
      const link = $el.find('.s-item__link').attr('href');
      const lowerCaseName =  name.toLowerCase()
      const isTextIncluded = splitKeywords.some(keyword => lowerCaseName.includes(keyword.toLowerCase()));
      expect(isTextIncluded).to.be.true;
      producstListEbay.push({ website: 'Ebay', productName: name, price, link })
    })
    cy.task('saveData', { key: 'producstListEbay', value: producstListEbay });

  });

  it(`Search Product ${keywords} in Amazon`, () => {
    amazonPage.visit()
    amazonPage.searchTextField(keywords)
    // amazonPage.sortByDropdown('price-asc-rank')
    // cy.get('.a-spinner.a-spinner-medium').should('not.visible')
    amazonPage.productItem().each(($el) => {
      const name = $el.find('h2 > a > span.a-text-normal').text()
      const whole = parseFloat($el.find('.a-price-whole').text()|| 0)
      const fraction = parseFloat(`0.${$el.find('.a-price-fraction').text()}`|| 0.00)
      const price = whole + fraction
      const link = 'https://www.amazon.com' + $el.find('h2 .a-link-normal').attr('href');
      const lowerCaseName =  name.toLowerCase()
      const isTextIncluded = splitKeywords.some(keyword => lowerCaseName.includes(keyword.toLowerCase()));
      expect(isTextIncluded).to.be.true;
      productsListAmazon.push({ website: 'Amazon', productName: name, price, link })
    })
    cy.task('saveData', { key: 'productsListAmazon', value: productsListAmazon });
  })

  it('Report', () => {
      cy.task('getAllData', {sort: 'desc'}).then((data) => {
      cy.task('saveData', { key: 'productListMerged', value: data });
      console.log(data); // This will correctly log the saved list
    });
  });
})

function formatCurrencyIDRToUSD (idr, rate=15000) {
  let parts
  let price
  if (idr.includes('to')) {
    parts = idr.split('to');
    console.log(parts)
    idr = parts[0].trim();
  }
  price = idr.replace(/[^0-9,.]/g, '').replace(/,/g, '');
  
  return parseFloat((price / rate).toFixed(2))
}