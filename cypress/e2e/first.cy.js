/// <reference types="Cypress" />

describe('Selectors demo', () => {
  beforeEach(() => {
    cy.visit('https://docs.cypress.io/api/table-of-contents')
  })

  it('By ID', () => {
    cy.get('#__docusaurus_skipToContent_fallback').should('be.visible')
  })

  it('By Class', () => {
    cy.get('.navbar').should('exist')
  })
// Test commit
  it('using Get with Find end Eq', () => {
    cy.viewport(1800,700)
    cy.contains('button', 'Accept All').click()
    cy.get('aside').find('div').find('ul').find('li').find('a').eq(0).click()
    cy.get('h1').should('have.text', 'Table of Contents');
    

  })

  it('contains', () => {
    cy.visit('https://next.privat24.ua/mobile?lang=en')
    cy.viewport(1800,700)
    cy.contains('div','SIGN IN', {matchCase: false})
   
    

  })

  it('contains', () => {
    cy.visit('https://next.privat24.ua/mobile?lang=en')
    cy.viewport(1800,700)
    cy.get('footer').contains('Regulations and tariffs')

  })

  it('should', ()=> {
    cy.visit('https://next.privat24.ua/mobile?lang=en')
    cy.get('[data-qa-node="amount"]')
          .clear()
          .type(100)
          .should('have.value',100)
          .and('be.visible')
  })

  it('expect', ()=> {
    cy.visit('https://next.privat24.ua/mobile?lang=en')
    cy.get('[data-qa-node="amount"]')
          .clear()
          .type(100).then( input=> {
            expect(input).to.have.value(100)
          })
          
  })

  it('check default value for Deposit', ()=> {
    cy.visit('https://next.privat24.ua/deposit/open?lang=en')
    cy.get('[data-qa-value="UAH"]')
          .should('be.checked')
          })
          
  
it('check is visible Archive link', ()=> {
    cy.visit('https://next.privat24.ua/deposit/open?lang=en')
    cy.contains('My deposits')
    .trigger('mouseover')
    .get('#archiveDeposits')
    .should('be.visible')
       
})

it('check is visible Archive link', ()=> {
  cy.visit('https://next.privat24.ua/deposit/open?lang=en')
  cy.contains('My deposits')
  .trigger('mouseover')
  .get('#archiveDeposits')
  .should('be.visible')
     
})

it('check is correct URL', ()=> {
  cy.visit('https://next.privat24.ua/?lang=en')
  cy.url()
  .should('eq','https://next.privat24.ua/?lang=en')
})

})
