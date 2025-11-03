describe("Lab: Navegar por el DOM", () => {

  beforeEach(() => {
    cy.visit("https://www.w3schools.com/html/html_tables.asp")
  })

  it("Encontrar la tabla de la página que tiene la cabecera 'Example' y comprobar que existe", () => {
    cy.get(".w3-example > h3")
      .first()
      .should("have.text", "Example")

    cy.get("#customers")
      .should("exist")
  })

  it("Comprueba que tiene el número de filas correcto", () => {
    cy.get("#customers > tbody > tr")
      .should("have.lengthOf", 7)

    // cy.get("#customers tr")
    //   .should("have.lengthOf", 7)

    // cy.get("#customers > tbody")
    //   .children()
    //   .should("have.lengthOf", 7)
  })

  it("Comprueba que la última fila tiene el número de celdas correcto", () => {
    // cy.get("#customers > tbody > tr")
    //   .last()
    //   .children()
    //   .should("have.lengthOf", 3)

    // cy.get("#customers > tbody > tr")
    //   .last()
    //   .find("td")
    //   .should("have.lengthOf", 3)

    cy.get("#customers > tbody > tr").as('filas-tabla')

    cy.get("@filas-tabla")
      .last()
      .children()
      .should("have.lengthOf", 3)

    cy.get("@filas-tabla")
      .last()
      .find("td")
      .should("have.lengthOf", 3)

    cy.get("#customers > tbody > tr:last() > td")
      .should("have.lengthOf", 3)
  })

  it("Comprueba que después de la quinta fila, hay dos filas más", () => {
    let numFilas = 0

    cy.get("#customers > tbody > tr")
      .each(($fila, pos) => {
        if (pos > 4) {
          numFilas += 1
        }
      })
      .then(() => {
        expect(numFilas).to.be.equal(2)
      })

    cy.get("#customers > tbody > tr:nth-child(5)")
      .nextAll()
      .should("have.lengthOf", 2)

    cy.get("#customers > tbody > tr:nth-child(5) ~ tr")
      .should("have.lengthOf", 2)
  })

  it("Comprueba que todas las celdas tienen contenido", () => {
    cy.get("#customers > tbody > tr > td")
      .each(($celda) => {
        expect($celda.text()).to.be.not.equal("")
        expect($celda.text()).not.to.be.empty
      })
  })

})