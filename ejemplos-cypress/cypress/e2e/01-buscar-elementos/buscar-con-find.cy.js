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
      .should("have.attr", "href", "#Netflix")
  })

  it("el elemento div de los listados tiene 2 listados", () => {
    cy.get("[data-cy='listados']")
      .children()
      .should("have.lengthOf", 2)
      .eq(1)
      .children()
      .should("have.lengthOf", 3)
      .parent()
      .parent()
      .children()
      .eq(0)
      .children()
      .should("have.lengthOf", 4)
  })
})