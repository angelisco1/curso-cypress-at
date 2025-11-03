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

  it("Hay 2 hobbies marcados por defecto", () => {
    cy.get('[data-cy="hobbies"] input:checked')
      .should("have.lengthOf", 2)
  })

  it("Después de marcar el hobbie de cine y de series hay 3 hobbies marcados por defecto", () => {
    // cy.get("#hobbies")
    //   .check()

    cy.get("#hobby1")
      .check()
    cy.get("#hobby3")
      .check()
      // .click()

    cy.get('[data-cy="hobbies"] input:checked')
      .should("have.lengthOf", 3)

    cy.get("#hobby4")
      .uncheck()

    cy.get('[data-cy="hobbies"] input:checked')
      .should("have.lengthOf", 2)
  })

  it("Al seleccionar xpeng se queda seleccionado", () => {
    cy.get('#select-coches-electricos')
      .select('xpeng-p7')

    cy.get('#select-coches-electricos option:selected')
      .should("have.value", 'xpeng-p7')

    cy.get('#select-coches-electricos')
      .select('nio-et7')

    cy.get('#select-coches-electricos option:selected')
      .should("have.text", "Nio eT7")
  })

  it("Al seleccionar dos colores se quedan seleccionados", () => {
    cy.get('#select-colores')
      .should("have.attr", "multiple")

    cy.get('#select-colores')
      .select(["amarillo", "blanco"])

    cy.get("#select-colores")
      .invoke("val")
      .should("have.members", ["amarillo", "blanco"])
      .should("have.lengthOf", 2)

    cy.get('#select-colores option:selected')
      .each($opt => {
        console.log($opt.val())
        expect(["amarillo", "blanco"]).to.include($opt.val())
        expect(["Amarillo", "Blanco"]).to.include($opt.text())
      })
  })

  it("Debería de haber una cookie con el valor 'Cookies, cookies...'", () => {
    cy.getAllCookies()
      .should("have.lengthOf", 1)

    cy.getCookie("miCookie")
      .should("have.property", "value", "Cookies, cookies...")

    cy.clearAllCookies()

    cy.getAllCookies()
      .should("be.empty")

    cy.setCookie("una-cookie", "que rica")

    cy.getAllCookies()
      .then(cookies => {
        expect(cookies[0]).to.have.property("value", "que rica")
      })
  })

  it("Al mostrar el alert, el texto es 'Hola mundo!!!'", () => {
    cy.get('#btn-alert')
      .click()

    cy.on("window:alert", (textoDelAlert) => {
      console.log(textoDelAlert)
      expect(textoDelAlert).to.be.equal("Hola mundo!!!")
    })
  })

  it("Al mostrar el confirm y aceptarlo, el mensaje se tiene que quedar vacío", () => {
    cy.get('#btn-confirm')
      .click()

    cy.on("window:confirm", (textoDelConfirm) => {
      console.log(textoDelConfirm)
      expect(textoDelConfirm).to.be.equal("¿Quieres borrar el mensaje?")
      return true
    })

    cy.get("#confirm-nombre")
      .should("have.text", "")
  })

  it("Al mostrar el confirm y cancelarlo, el mensaje se tiene que quedar como estaba", () => {
    cy.get('#btn-confirm')
      .click()

    cy.on("window:confirm", () => {
      return false
    })

    cy.get("#confirm-nombre")
      .should("have.text", "The Marathon Continues")
  })

  it("Al mostrar el prompt e introducir tu nombre, este se muestra en la web", () => {
    cy.window()
      .then((win) => {
        cy.stub(win, 'prompt').returns('Charly')
      })

    cy.get('#btn-prompt')
      .click()

    cy.get("#prompt-nombre")
      .should("have.text", "Charly")
  })

  it("Al mostrar el prompt y no introducir tu nombre, no se muestra en la web", () => {
    cy.window()
      .then((win) => {
        // Esto sería si le damos a cancelar
        cy.stub(win, 'prompt').returns(null)

        // Esto sería si le damos a aceptar sin introducir ningún valor en el popup
        // cy.stub(win, 'prompt').returns('')
      })

    cy.get('#btn-prompt')
      .click()

    cy.get("#prompt-nombre")
      .should("have.text", "")
  })

  it("Sacar pantallazo de las inversiones", () => {
    cy.get("#dashboard-screenshot")
      .screenshot("dashboard-inversiones", {
        blackout: ["#email", "#dni", "h3"]
      })
  })

})