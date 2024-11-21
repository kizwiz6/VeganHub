// cypress/support/e2e.ts
/* eslint-disable @typescript-eslint/no-namespace */
import './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(): Chainable<Subject>
    }
  }
}

export {}