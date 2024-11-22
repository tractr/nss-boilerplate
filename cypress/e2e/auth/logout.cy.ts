describe("Logout", () => {
    const appUrl = Cypress.env("APP_URL") as string;

    beforeEach(() => {
        cy.visit(`${appUrl}/auth/login`);
        cy.get('input[type="email"]').type(Cypress.env("SUPABASE_USER_EMAIL"));
        cy.get('input[type="password"]').type(
            Cypress.env("SUPABASE_USER_PASSWORD"),
        );
        cy.get('button[type="submit"]').click();
    });

    it("should be able to logout", () => {
        // Open sidebar if on mobile
        // cy.get('[data-sidebar="trigger"]').click();

        cy.get('[data-testid="user-button"]').click();

        // Find and click the logout button in the sidebar
        // You'll need to add a data-testid or similar to your logout button
        cy.get('[data-testid="logout-button"]').click();

        // Verify we're redirected to login page
        cy.url().should("include", "/auth/login");

        // Verify we can't access protected routes anymore
        cy.visit(`${appUrl}/`);

        cy.url().should("include", "/auth/login");
    });
});
