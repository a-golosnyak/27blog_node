describe('Authentication and Posts', () => {
  it('should login and display posts', () => {
    cy.visit('/login');
    cy.get('input[type=email]').type('testuser@example.com');
    cy.get('input[type=password]').type('testpassword');
    cy.get('button[type=submit]').click();
    cy.url().should('not.include', '/login');
    cy.contains('Posts');
    cy.get('.v-list-item').should('exist');
  });
});

