class EbayPage {
  visit() {
      cy.visit('https://www.ebay.com/'); // Adjust the URL path as needed
  }

  searchTextField(keywords) {
      cy.get('[placeholder="Search for anything"]').type(keywords);
      cy.get('[id="gh-btn"]').click()
  }

  productItem() {
      return cy.get('ul > li.s-item .s-item__info')
  }

  sortByDropdown(sortValue = 'Price + Shipping: lowest first') {
    cy.get('button').contains('Sort: Best Match').click()
    cy.get('span').contains(sortValue).click({ force:true })
  }
}

export default EbayPage;
