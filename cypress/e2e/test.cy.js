/// <reference types="Cypress" />

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
    mobileReplenishment.checkComission()
    mobileReplenishment.checkCurrensy('UAH')

  })


  it('Example sending GET request', () => {
    cy.request('https://next.privat24.ua/')
      .then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
      });
  });

  it("Example sending the POST request", () => {

    const requestBody = {
      action: "info",
      phone: "+380686979712",
      amount: 50,
      currency: "UAH",
      cardCvv: "111",
      card: "4552331448138217",
      cardExp: "0526",
      xref: "30da59f3836a783ca4115e0c66c50e47",
      _: 1609157575732
    };
  
    const headersData = {
      'Content-Type': 'application/json',
      'cookie': '_ga=GA1.2.957777321.1609142789; _gid=GA1.2.1882919372.1609142789; pubkey=a5cfd1b1e8e8082568965a627a5f9170; _gat_gtag_UA_29683426_11=1; fp=11; lfp=12/28/2020, 10:06:39 AM; pa=1609157568076.50150.1882585496550282next.privat24.ua0.49014387143519356+1'
    };
  
    cy.request({
      method: "POST",
      url: "https://next.privat24.ua/api/p24/pub/mobipay",
      headers: headersData,
      body: requestBody,
      failOnStatusCode: false // важно для отладки
    }).then((response) => {
      cy.log(`Status: ${response.status}`);
      cy.log(JSON.stringify(response.body));
    });
  
  });

  
  
  
  
