// cypress/support/pages/PersonsPage.ts

import { PersonRow } from "../../types/person-row";

export class PersonsPage {
  assertRow(row: PersonRow) {
    cy.contains("td", row.email)
      .parent("tr")
      .within(() => {
        cy.get(".name").should("have.text", row.name);
        cy.get(".birth_date").should("have.text", row.birth_date);
      });
  }
}
