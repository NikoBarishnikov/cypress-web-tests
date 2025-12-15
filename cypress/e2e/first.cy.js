describe('Selectors demo', () => {
  beforeEach(() => {
    cy.visit('https://docs.cypress.io/api/table-of-contents')
  })

  it('By ID', () => {
    cy.get('#navbar').should('be.visible')
  })

  it('By Class', () => {
    cy.get('.navbar').should('exist')
  })
// Test
  it.only('using Get with Find end Eq', () => {
    cy.viewport(1800,700)
    cy.contains('button', 'Accept All').click()
    cy.get('aside').find('div').find('ul').find('li').find('a').eq(0).click()
    cy.get('h1').should('have.text', 'Table of Contents');
    

  })
})

  