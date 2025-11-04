describe("Mocks", () => {

  describe("Ubicación (spy y stub)", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/mocks", {
        onBeforeLoad: (win) => {
          cy.spy(win, 'fetch').as("spyFetch")
        }
      })
    })

    it("Al pulsar el botón debería llamarse al fetch", () => {
      cy.get('#btn-ubicacion')
        .click()

      cy.get("@spyFetch")
        .should("be.calledOnce")
    })

    it("Debería devolver Albuquerque cuando se le pasan las coordeanadas de allí", () => {
      cy.visit("http://localhost:3000/mocks", {
        onBeforeLoad: (win) => {
          const coords = {
            latitude: '35.110816',
            longitude: '-106.668173',
          }
          const position = {coords: coords}
          cy.stub(win.navigator.geolocation, 'getCurrentPosition')
            .callsFake((cb) => {
              return cb(position)
            }).as('stubCoords')
        }
      })

      cy.get('#btn-ubicacion')
        .click()

      cy.get('#ciudad')
        .should("have.text", "Albuquerque")

      cy.get("@stubCoords")
        .should("be.calledOnce")
    })

    it("Devuelve Una ciudad cualquiera cuando se le pasan unas coordenadas que no conoce", () => {
      cy.visit("http://localhost:3000/mocks", {
        onBeforeLoad: (win) => {
          const coords = {
            latitude: '',
            longitude: '',
          }
          const position = {coords: coords}
          cy.stub(win.navigator.geolocation, 'getCurrentPosition')
            .callsFake((cb) => {
              return cb(position)
            }).as('stubCoords')
        }
      })

      cy.get('#btn-ubicacion')
        .click()

      cy.get('#ciudad')
        .should("have.text", "Una ciudad cualquiera...")
    })
  })

  describe("Tiempo (intercept)", () => {

    it("Debería mostrar el emoji de la nube si esta nublado", () => {
      cy.intercept("/get-weather", { weather: "nublado" })
      cy.visit("http://localhost:3000/tiempo")

      cy.get('#tiempo')
        .should("have.text", "☁️")
    })

    it("Debería mostrar el 3 si esta tormentoso", () => {
      cy.intercept("/get-weather", { weather: "tormenta" })
      cy.visit("http://localhost:3000/tiempo")

      cy.get('#tiempo')
        .should("have.text", "3")
    })

  })

  describe("Descansos (tick y clock)", () => {

    it("Al crear un descanso de 5 min, aparece 5:00 en la cuenta atrás", () => {
      cy.visit("https://resting.onrender.com/")

      cy.get('input.css-qzovtw')
        .type("Descanso")

      cy.get('.css-1bi8ut6 > button')
        .first()
        .click()

      cy.contains("button", "Start")
        .click()

      cy.clock()

      cy.get('p.css-6368fc')
        .should("have.text", "05 : 00")

      // ℹ️ Hay que hacer el wait de la imagen porque en el código tengo puesto que no empiece el setInterval hasta que se descarga la imagen, por lo que hasta que no ocurre eso, no podemos avanzar con el tick
      // cy.wait(5000)
      cy.intercept('https://images.unsplash.com/photo-*').as('imagenFondo')

      cy.wait("@imagenFondo")

      cy.tick(1000 * 60)

      cy.get('p.css-6368fc')
        .should("have.text", "04 : 00")

      cy.tick(1000 * 60 * 4)

      cy.get('p.css-6368fc')
        .should("have.text", "00 : 00")



    })

  })

})