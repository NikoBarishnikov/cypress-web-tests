export class BasePage {

    open(url){
        cy.visit(url)
    }


    typeAmout(amount){
    // amount
    cy.get('[data-qa-node="amount"]')
    .first()
    .clear()
    .type(amount)
    }

    typeDeditData(cardNumber,expiry,cvv){
    // card number
    cy.get('[data-qa-node="numberdebitSource"]')
    .type(cardNumber)
    // expiry
    cy.get('[data-qa-node="expiredebitSource"]')
    .type(expiry)
    // cvv
    cy.get('[data-qa-node="cvvdebitSource"]')
    .type(cvv)
    }

    submitPayment(){
    // submit
    cy.get('[data-qa-node="submit"]')
    .should('be.enabled')
    .click()
    }

 

}

export const basePage = new BasePage ()
