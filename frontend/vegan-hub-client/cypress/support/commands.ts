// cypress/support/commands.ts
/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST', 
    url: 'https://localhost:7777/api/auth/register',
    body: {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'  
    },
    failOnStatusCode: false
  }).then(() => {
    cy.request({
      method: 'POST',
      url: 'https://localhost:7777/api/auth/login', 
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    }).then((response) => {
      localStorage.setItem('token', response.body.token);
    });
  });
});

export {};