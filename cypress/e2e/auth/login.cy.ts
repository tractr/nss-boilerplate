describe("Login Page", () => {
    const appUrl = Cypress.env("APP_URL") as string;

    beforeEach(() => {
        cy.visit(`${appUrl}/auth/login`);
    });

    it("should display login form", () => {
        cy.get("form").should("exist");
        cy.get('input[type="email"]').should("exist");
        cy.get('input[type="password"]').should("exist");
        cy.get('button[type="submit"]').should("contain.text", "Sign in");
    });

    it("should show validation errors for empty fields", () => {
        cy.get('button[type="submit"]').click();
        cy.get("p.text-destructive").should("have.length", 2);
        cy.get("p.text-destructive").first().should(
            "contain.text",
            "Email is required",
        );
        cy.get("p.text-destructive").last().should(
            "contain.text",
            "Password is required",
        );
    });

    it("should show validation error for short password", () => {
        cy.get('input[type="email"]').type("test@example.com");
        cy.get('input[type="password"]').type("12345");
        cy.get('button[type="submit"]').click();
        cy.get("p.text-destructive").should(
            "contain.text",
            "Password must be at least 6 characters",
        );
    });

    it("should show loading state while submitting", () => {
        cy.get('input[type="email"]').type("test@example.com");
        cy.get('input[type="password"]').type("password123");
        cy.get('button[type="submit"]').click();
        cy.get(".animate-spin").should("exist");
        cy.get('button[type="submit"]').should("contain.text", "Signing in...");
    });

    it("should handle successful login", () => {
        cy.url().should("include", "/auth/login");

        cy.get('input[type="email"]').type("hello@pierrecabriere.fr");
        cy.get('input[type="password"]').type("test123");
        cy.get('button[type="submit"]').click();

        cy.url().should("not.include", "/auth/login");
    });

    it("should handle failed login", () => {
        cy.get('input[type="email"]').type("test@example.com");
        cy.get('input[type="password"]').type("wrongpassword");
        cy.get('button[type="submit"]').click();

        cy.get('[role="alert"]').should(
            "contain.text",
            "Invalid login credentials",
        );
    });
});
