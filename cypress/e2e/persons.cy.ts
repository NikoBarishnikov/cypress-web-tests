/// <reference types="cypress" />

import { Person } from "../types/person";
import { CreatePersonDto } from "../types/person.dto";

describe("Persons page", () => {
  const apiUrl = "/api/persons/";

  // --- Generate a unique test user ---
  function generateTestPerson(): CreatePersonDto {
    const randomId = Date.now();
    return {
      name: "Jan Test",
      email: `jan.test+${randomId}@example.com`,
      birth_date: "1990-01-01",
    };
  }

  // --- Clean up all users before tests ---
  before(() => {
    cy.request<Person[]>({
      method: "GET",
      url: apiUrl,
    }).then((res) => {
      const persons: Person[] = Array.isArray(res.body) ? res.body : [];
      persons.forEach((person) => {
        cy.request({
          method: "DELETE",
          url: `${apiUrl}${person.id}/`,
          failOnStatusCode: false,
        });
      });
    });
  });

  // --- Visit the main page before each test ---
  beforeEach(() => {
    cy.visit("/");
  });

  // --- Add a person via the form ---
  it("adds person via form and displays in table", () => {
    const testPerson = generateTestPerson();

    cy.get("#name").type(testPerson.name);
    cy.get("#email").type(testPerson.email);
    cy.get("#birth_date").type(testPerson.birth_date!);

    cy.get("#person-form").submit();

    cy.contains("td", testPerson.email, { timeout: 5000 })
      .parent("tr")
      .within(() => {
        cy.get(".name").should("have.text", testPerson.name);
        cy.get(".email").should("have.text", testPerson.email);
        cy.get(".birth_date").should("have.text", testPerson.birth_date);
      });
  });

  // --- Verify that persons are loaded from API on page load ---
  it("loads persons from API on page load", () => {
    const testPerson = generateTestPerson();

    cy.request<Person>("POST", apiUrl, testPerson).then(() => {
      cy.reload();

      cy.contains("td", testPerson.email, { timeout: 5000 }).should("be.visible");
      cy.get("#person-table tbody tr").should("have.length.at.least", 1);
    });
  });

  // --- Edit a person in the table via modal ---
  it("edits person from table via modal", () => {
    const testPerson = generateTestPerson();
    const updatedName = "Jan Update";
  
    // Create person via API
    cy.request<Person>("POST", apiUrl, testPerson).then((res) => {
      cy.visit("/");

      // Open modal
      cy.contains("td", res.body.email)
        .parent("tr")
        .within(() => {
          cy.get(".edit").click();
        });

      // Wait until modal has class 'show' (Bootstrap 5 fade animation)
      cy.get("[data-cy=edit-modal]", { timeout: 10000 }).should("have.class", "show");

      // Fill modal form
      cy.get("[data-cy=edit-name]").clear().type(updatedName);
      cy.get("[data-cy=edit-email]").clear().type(res.body.email);
      cy.get("[data-cy=edit-birth-date]").clear().type(res.body.birth_date);

     // Click Save
     cy.get("[data-cy=save-person]").click();

// Wait for modal to close and table to update
     cy.get("[data-cy=edit-modal]").should("not.have.class", "show");

// Wait a bit to ensure JS updated the table
     cy.wait(100);

// Verify updated name in table
     cy.contains("td", res.body.email)
      .parent("tr")
      .find(".name")
      .should("have.text", updatedName);
    });
  });

  // --- Delete a person from the table ---
  it("deletes person from table", () => {
    const testPerson = generateTestPerson();

    cy.request<Person>("POST", apiUrl, testPerson).then((res) => {
      cy.visit("/");

      cy.contains("td", res.body.email, { timeout: 5000 }).should("exist");

      // Stub confirm() to always click OK
      cy.window().then((win) => {
        cy.stub(win, "confirm").returns(true);
      });

      cy.contains("td", res.body.email)
        .parent("tr")
        .within(() => {
          cy.get(".delete").click();
        });

      // Verify the person is deleted
      cy.contains("td", res.body.email).should("not.exist");
    });
  });
});
