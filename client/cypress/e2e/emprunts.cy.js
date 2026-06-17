describe("Page Emprunts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/emprunts");
  });

  it("affiche le formulaire de recherche d'emprunts", () => {
    cy.get('input[type="email"]').should("be.visible");
    cy.contains("button", "Voir mes emprunts").should("be.visible");
  });

  it("soumet le formulaire et affiche les emprunts pour un email valide", () => {
    cy.get('input[type="email"]').type("jean.dupont@biblio.com");
    cy.contains("button", "Voir mes emprunts").click();

    cy.get(".emprunt-card", { timeout: 5000 }).should("exist");
    cy.get(".titre").first().should("not.be.empty");
    cy.get(".auteur").first().should("not.be.empty");
    cy.get(".date-emprunt").first().should("not.be.empty");
    cy.get(".date-retour").first().should("not.be.empty");
  });

  it("affiche un message si aucun emprunt trouvé", () => {
    cy.get('input[type="email"]').type("inconnu@example.com");
    cy.contains("button", "Voir mes emprunts").click();
    cy.contains("Aucun emprunt trouvé").should("be.visible");
  });
});