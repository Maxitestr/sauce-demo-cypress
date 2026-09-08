// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
// ***********************************************************

// Allure plugin
import '@shelex/cypress-allure-plugin'

// Suppress noise from XHR/Fetch network logs before each test.
// Must be beforeEach — Cypress resets intercepts between tests.
beforeEach(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})
