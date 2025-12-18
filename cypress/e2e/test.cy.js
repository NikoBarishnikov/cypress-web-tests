import { mobileReplenishment } from "../support/pages/mobileReplenishment"
import { basePage } from "../support/pages/basePage"



it('Replenishment of Ukraine mobile phone number', () => {
    basePage.open('https://next.privat24.ua/mobile?lang=en')

    mobileReplenishment.typePhoneNumber('686979712')
    basePage.typeAmout('1')
    basePage.typeDeditData('4552331448138217','0529','111')
    basePage.submitPayment()
    // wait for backend recalculation
    cy.wait(3000)
    mobileReplenishment.checkDebitCard('4552 **** **** 8217')
    mobileReplenishment.checkAmount('1')
    // commission (НЕ фиксированное число!)
    mobileReplenishment.checkComission()
    mobileReplenishment.checkCurrensy('UAH')

  })
  
  
