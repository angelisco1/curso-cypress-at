describe("Interacciones con elementos web de páginas web externas", () => {

  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/vue/dist/#/")

    cy.get(".new-todo")
      .type("Tarea 1{enter}")

    cy.get(".new-todo")
      .type("Tarea 2{enter}")

    cy.get(".new-todo")
      .type("Tarea 3{enter}")
  })

  it("Añadir 3 tareas y deberían de mostrarse las 3 además de los botones de activas y completadas", () => {
    // cy.visit("https://todomvc.com/examples/vue/dist/#/")

    // cy.get(".new-todo")
    //   .type("Tarea 1{enter}")

    // cy.get(".new-todo")
    //   .type("Tarea 2{enter}")

    // cy.get(".new-todo")
    //   .type("Tarea 3{enter}")

    cy.get("ul.todo-list > li > div.view > label")
      .should("have.lengthOf", 3)
      .each((li, pos) => {
        cy.expect(li.text()).to.be.equal("Tarea " + (pos + 1))
      })

    cy.contains("a", "Completed")
      .should('exist')

    cy.contains("a", "Active")
      .should('exist')
  })


  it("Añadir 3 tareas y marcar 1 como completada", () => {
    cy.get("div.view > input[type='checkbox']")
      .eq(1)
      .click()
      .parent()
      .parent()
      .should("have.class", "completed")
  })

  it("Añadir 3 tareas, completar todas y eliminar las completadas", () => {
    cy.get("#toggle-all-input")
      .click()

    cy.get("button.clear-completed")
      .click()

    cy.get("ul.todo-list > li")
      .should("have.lengthOf", 0)
  })

  it("Añadir 3 tareas, completar todas y eliminar las completadas (pulsando los botones de la x)", () => {
    cy.get("#toggle-all-input")
      .click()

    // cy.get('button.destroy')
    //   .each($btn => $btn.trigger("click"))
    cy.get("button.destroy")
      .click({multiple: true})

    cy.get("ul.todo-list > li")
      .should("have.lengthOf", 0)
  })

})