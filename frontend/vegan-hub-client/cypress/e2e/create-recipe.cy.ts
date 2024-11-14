// cypress/e2e/create-recipe.cy.ts
describe('Recipe Creation', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/recipes/new')
    })

    it('creates a basic recipe successfully', () => {
      // Fill in recipe details
      cy.get('input[placeholder*="Creamy Vegan"]').type('Test Recipe')
      cy.get('textarea[placeholder*="delicious"]').type('Test Description')
      cy.get('input[placeholder="15"]').type('15')
      cy.get('input[placeholder="30"]').type('30')
      cy.get('input[placeholder="4"]').type('4')

      // Add ingredient
      cy.contains('button', 'Add Ingredient').click()
      cy.get('input[placeholder="Ingredient name"]').type('Test Ingredient')
      cy.get('input[type="number"][placeholder="Amount"]').type('100')
      cy.get('input[placeholder*="cups"]').type('g')

      // Add instructions
      cy.get('textarea[placeholder*="Begin"]').type('1. Test instruction')

      // Submit form
      cy.contains('button', 'Create Recipe').click()

      // Verify success
      cy.contains('Recipe created!')
      cy.url().should('include', '/recipes')
    })
  })