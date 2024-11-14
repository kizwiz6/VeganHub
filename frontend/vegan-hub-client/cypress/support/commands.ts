// cypress/support/commands.ts

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://localhost:7777/api/auth/login',
    body: {
      email: 'test@example.com',
      password: 'password123'
    }
  }).then((response) => {
    // Set the token in localStorage
    localStorage.setItem('token', response.body.token);
    return; // Ensure the command returns void
  });
});
