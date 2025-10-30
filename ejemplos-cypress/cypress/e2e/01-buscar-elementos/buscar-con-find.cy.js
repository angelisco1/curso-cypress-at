describe("Busquedas con find", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/busquedas.html")
  })

  it("el texto de item 2 es 'Item 2'", () => {
    cy.get('ul')
      .first()
      .find('li:eq(1)')
      .should("have.text", "Item 2")
  })

  it("el enlace de Netflix tiene como href '#Netflix'", () => {
    cy.contains("a", "Netflix")
      .should("have.attr", "href")
      .and("have.value", "#Netflix")
  })
})