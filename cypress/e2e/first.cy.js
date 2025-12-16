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

it('type', ()=> {
  cy.visit('https://next.privat24.ua/mobile?lang=en')
  cy.get('[data-qa-node="amount"]')
  .clear()
  .focus()
        
})

  it('submit', ()=> {
    cy.visit('https://next.privat24.ua/mobile?lang=en')
    cy.get('form[method="post"]')
    .submit()
      

})

it('rightclick', ()=> {
  cy.visit('https://example.cypress.io/commands/actions')
  .contains('Right click to edit')
  .rightclick()
    
})

it('dblclick', ()=> {
  cy.visit('https://0cb3cb9c1fc5cc5289d6cbd3a8e78d308741ce80.mdnplay.dev/en-US/docs/Web/API/Element/dblclick_event/runner.html?state=ZZE%2Fb8IwEMW%2Fyum6BAkCCKkSJmRpu7VTVy%2BOfSQG50xtpxJFfPcqTitUdfHw3u%2Be788Vu9Q7FFipaA3VkgGqblO%2FXeBJBVMtu82knetnPzSOQDurT5A8BIr2iyB1NoJvjqRTWS3PteRq%2BZuFc9QxosAswHVMapQ%2BtcEPbAQ8HA5E2%2B0u6z4YCougjB2igDX1WTY2np26CLDsLNOicV6fsnNWxlhu72gKiuPBh15A1MpRsSq3s7%2FOwgfbWhawgtXdscl6FncKVuVjzPYQKSwiOdJJAHumneSbZMmlU6H9mejfv%2BtyM5tAnONxnF97jgm0Cgb2YLweeuJUfgwULu853YdCTluSONZKHuFSGfPySZxebUzENEKmcfkEEudQ0Az29dRF5rVTMY5wmXzbOiok5kan0Nv44BxTRz2hQGfbLuHtGw%3D%3D&code=aaffdbb6-c7a1-4ef6-8844-9086705d5e94')
  .contains('Continue').click()
  cy.url().should('include', 'dblclick_event') 
  cy.contains('My Card')
  .should('be.visible')
  .dblclick()
    
})

it('uncheck', ()=> {
  cy.visit('https://next.privat24.ua/')
    .get('#switchCheckbox_185')
    .check({force: true})
    .wait(2000)
    .get('#switchCheckbox_301')
    .uncheck({force: true})
    
})

it('select', ()=> {
  cy.visit('https://next.privat24.ua/')
  cy.get('[data-qa-node="lang"]').click()
  cy.contains('English').click()

       

    
})


})
