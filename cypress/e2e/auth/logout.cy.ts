import { login } from './utils.cy';
describe('Logout', () => {
  const appUrl = 'http://localhost:3000';

  beforeEach(() => {
    login();
  });

  it('should be able to logout', () => {
    // Open sidebar if on mobile
    // cy.get('[data-sidebar="trigger"]').click();

    cy.get('[data-testid="user-button"]').click();

    // Find and click the logout button in the sidebar
    // You'll need to add a data-testid or similar to your logout button
    cy.get('[data-testid="logout-button"]').click();

    // Verify we're redirected to login page
    cy.url().should('include', '/auth/login');

    // Verify we can't access protected routes anymore
    cy.visit(`${appUrl}/`);

    cy.url().should('include', '/auth/login');
  });
});
