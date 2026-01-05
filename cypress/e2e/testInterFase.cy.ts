import { MobipayRequest, MobipayResponse } from "../interfaces/mobipay";

describe("Privat24 API Tests", () => {
    it("Example sending the POST request", () => {
      
      // Применяем интерфейс к объекту запроса
      const requestBody: MobipayRequest = {
        action: "info",
        phone: "+380686979712",
        amount: 50,
        currency: "UAH",
        cardCvv: "111",
        card: "4552331448138217",
        cardExp: "0526",
        xref: "30da59f3836a783ca4115e0c66c50e47",
        _: Date.now()
      };
  
      // Передаем MobipayResponse в generic-параметр cy.request
      cy.request<MobipayResponse>({
        method: "POST",
        url: "https://next.privat24.ua/api/p24/pub/mobipay",
        body: requestBody,
        failOnStatusCode: false
      }).then((response) => {
        // Теперь TypeScript знает структуру response.body
        expect(response.status).to.eq(400);
        
        if (response.body.status === "success") {
          cy.log(`Payment ID: ${response.body.data?.paymentId}`);
        }
      });
    });
  });
