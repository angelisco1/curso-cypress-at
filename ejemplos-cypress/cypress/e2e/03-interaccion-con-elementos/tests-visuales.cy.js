describe("Tests visuales", () => {
  it("La caja sale de color oro", () => {
    cy.visit("http://localhost:8080/tests-visuales.html")

    cy.matchImageSnapshot("cuadrado")
  })
})