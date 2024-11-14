// cypress/support/e2e.ts
import './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(): Chainable<Subject>
    }
  }
}

export {}