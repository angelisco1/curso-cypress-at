describe("Interacciones con elementos web", () => {

  beforeEach(() => {
    cy.visit("http://localhost:8080/interacciones.html")
  })


  xit("Retry-ability 3.5", () => {
    cy.get("#btn-lazy-3500")
      .should("have.text", "Soy un botón perezoso")
  })

  xit("Retry-ability 5.5 (cambiado timeout en la config)", () => {
    cy.get("#btn-lazy-5500")
      .should("have.text", "Soy un botón más perezoso todavía")
  })

  xit("Retry-ability 5.5", () => {
    cy.get("#btn-lazy-5500", { timeout: 6000 })
      .should("have.text", "Soy un botón más perezoso todavía")
  })

  it("click", () => {
    cy.get("#p0")
      .click()
  })

  it("Si introducimos el código correcto (6710) nos muestra en el display el mensaje 'CODE OK'.", () => {
    cy.get("#p6")
      .click()
    cy.get("#p7")
      .click()
    cy.get("#p1")
      .click()
    cy.get("#p0")
      .click()

    cy.get("#pantalla-codigo")
      .should("have.text", "CODE OK")
  })

  it("Si pulsamos números y pulsamos el botón de 'CLD' los borra.", () => {
    cy.get("#p6")
      .click()
    cy.get("#p7")
      .click()
    cy.get("#p1")
      .click()
    cy.get("#pantalla-codigo")
      .should("have.text", "671")

    cy.get("#pclear")
      .click()
    cy.get("#pantalla-codigo")
      .should("have.text", "")
  })

  it("Si pulsamos números y pulsamos el botón de 'DEL', elimina el último número introducido.", () => {
    cy.get("#p6")
      .click()
    cy.get("#p7")
      .click()
    cy.get("#p1")
      .click()
    cy.get("#pantalla-codigo")
      .should("have.text", "671")

    cy.get("#pdel")
      .click()
    cy.get("#pantalla-codigo")
      .should("have.text", "67")
  })

  it("No deja introducir un código de más de 4 números.", () => {
    cy.get("#p6")
      .click()
    cy.get("#p7")
      .click()
    cy.get("#p1")
      .click()
    cy.get("#p1")
      .click()
    cy.get("#pantalla-codigo")
      .should("have.text", "6711")
      // .and("have.lengthOf", 4)

    cy.get("#p1")
      .click()
    cy.get("#pantalla-codigo")
      .should("have.text", "6711")
      // .and("have.lengthOf", 4)
  })

})