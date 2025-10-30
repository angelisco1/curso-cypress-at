describe("Busquedas con get", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/busquedas.html")
  })

  it("el título debería ser 'Listados'", () => {
    // cy.visit("http://localhost:8080/busquedas.html")

    cy.get("#titulo")
      .should("have.text", "Listados")
  })

  it("el primer elemento de la lista de cosas es 'Cosa 1'", () => {
    // cy.visit("http://localhost:8080/busquedas.html")

    cy.get("#listaCosas > li:first")
      .should("have.text", "Cosa 1")
  })

  it("el primer elemento de la lista de cosas es 'Cosa 1'", () => {
    // cy.visit("http://localhost:8080/busquedas.html")

    cy.get("#listaCosas > li")
      .first()
      .should("have.text", "Cosa 1")
  })

  it("hay 3 elementos en la lista de cosas", () => {
    // cy.visit("http://localhost:8080/busquedas.html")

    cy.get("#listaCosas > li")
      .each((elem, pos) => {
        console.log(elem)
        // console.log(pos + " - " + elem[0].textContent)
        // expect(elem[0].textContent).to.be.equal("Cosa " + (pos + 1))

        console.log("TEXT: ", elem.text())
        expect(elem.text()).to.be.equal("Cosa " + (pos + 1))
      })
  })

  it("el segundo elemento de la lista de items es 'Item 2'", () => {
    // li:eq(2)
    cy.get("li.item:eq(1)")
      .should("have.text", "Item 2")

    cy.get("#listaItems > li:eq(1)")
      .should("have.text", "Item 2")
  })

  it("la lista de cosas tiene 3 cosas", () => {
    cy.get("#listaCosas > li")
      .should("have.lengthOf", 3)
  })
})