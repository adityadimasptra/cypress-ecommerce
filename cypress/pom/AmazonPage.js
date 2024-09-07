class AmazonPage {
  visit() {
      cy.visit('https://www.amazon.com/'); // Adjust the URL path as needed
  }

  searchTextField(keywords) {
      cy.get('#twotabsearchtextbox').type(keywords+'{enter}');
  }

  productItem() {
      return cy.get('.puis-list-col-right')
  }

  sortByDropdown(sortValue) {
    cy.get('select#s-result-sort-select').select(sortValue, {force: true});
  }
}

export default AmazonPage;
