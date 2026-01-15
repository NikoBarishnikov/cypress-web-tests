/// <reference types="cypress" />

import { Person } from "../types/person";
import { CreatePersonDto } from "../types/person.dto";

describe("Persons page", () => {
  const apiUrl = "/api/persons/";

  // --- Generate a unique test user ---
  function generateTestPerson(): CreatePersonDto {
    const randomId = Date.now();
    return {
      name: "JanBalan Test",
      email: `janbalan.test+${randomId}@example.com`,
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

  // --- Edit a person in the table ---
  it("edits person from table", () => {
    const testPerson = generateTestPerson();

    cy.request<Person>("POST", apiUrl, testPerson).then((res) => {
      const updatedName = "JanBaly Updated";

      cy.visit("/");

      // Stub prompt() for editing
      cy.window().then((win) => {
        cy.stub(win, "prompt")
          .onFirstCall().returns(updatedName)
          .onSecondCall().returns(res.body.email)
          .onThirdCall().returns(res.body.birth_date);
      });

      cy.contains("td", res.body.email, { timeout: 5000 })
        .parent("tr")
        .within(() => {
          cy.get(".edit").click();
        });

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
