export class MobilePhoneReplenishment {
    typePhoneNumber(phoneNumber){
    // phone
    cy.get('[data-qa-node="phone-number"]')
    .should('be.visible')
    .type(phoneNumber)
    }

    checkDebitCard(debitCard){
    // card mask
    cy.get('[data-qa-node="card"]')
    .should('contain.text', debitCard)
    }

    checkAmount(amount){    
    // amount assertion (input → value)
        cy.get('[data-qa-node="amount"]')
        .first()
        .should('have.value', amount)
    }

    checkComission(){ 
    // commission (НЕ фиксированное число!)
        cy.get('[data-qa-node="commission"]')
          .first()
          .invoke('text')
          .then(text => {
        // оставляем только цифры и точку
        const value = Number(text.replace(/[^\d.]/g, '').trim())
        expect(value).to.be.greaterThan(0)
      })} 

    checkCurrensy(currency){
    // commission currency
    cy.get('[data-qa-node="commission-currency"]')
    .should('contain.text', currency)
    }
     

}

export const mobileReplenishment = new MobilePhoneReplenishment ()
