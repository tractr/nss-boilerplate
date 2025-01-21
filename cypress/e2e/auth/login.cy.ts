import { getIframeBody, login } from './utils.cy';
import 'dotenv/config';
describe('Login Page', () => {
  //const appUrl = Cypress.env("APP_URL") as string;
  const appUrl = 'http://localhost:3000';

  // Helper function to get iframe body
  beforeEach(() => {
    cy.visit(`${appUrl}/auth/login`);
    cy.get('iframe').should('be.visible');
  });
  it('should display login form', () => {
    getIframeBody().within(() => {
      cy.get('form').should('exist');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button[type="submit"]').should('contain.text', 'Login');
    });
  });

  it('should be able to login', () => {
    login();
  });
});
