describe("Formulario", () => {
  it("Buscamos Cypress JS en la wikipedia", () => {
    cy.visit("https://es.wikipedia.org/wiki/Wikipedia:Portada")

    cy.get('#p-search > a')
      .click()

    cy.get('form#searchform input[name="search"]')
      .type("Cypress JS")

    cy.get('form#searchform')
      .submit()

    cy.get('#firstHeading')
      .should("have.text", "Resultados de la búsqueda")
  })
})