describe("Introducción:", () => {
  it("Abrir google", () => {
    cy.visit("https://google.com")

    cy.get("#S3BnEe")
      .should("have.text", "Antes de ir a Google")
  })
})