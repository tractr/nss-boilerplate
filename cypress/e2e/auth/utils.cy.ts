export const getIframeBody = () => {
  return cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
};
export const login = (params: { email?: string; password?: string; basUrl?: string } = {}) => {
  const testEmail = Cypress.env('USER');
  const testPassword = Cypress.env('PASS');
  const appUrl = Cypress.env('APP_URL') ?? ('localhost:3000' as string);
  cy.visit(`${appUrl}/auth/login`);
  cy.get('iframe').should('be.visible');
  getIframeBody().within(() => {
    cy.get('input[type="email"]').type(params.email ?? testEmail);
    cy.get('input[type="password"]').type(params.password ?? testPassword);
    cy.get('button[type="submit"]').click();
  });
};
