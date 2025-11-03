describe("Página de login", () => {
  let usuariosCargados = null

  before(() => {
    cy.fixture("usuarios.json")
      .then(datos => {
        usuariosCargados = datos
        console.log({usuariosCargados})
      })
  })

  beforeEach(() => {
    cy.visit("http://localhost:3000/login")
  })

  it("si usas un usuario correcto vas a la página de bienvenida", () => {

    // cy.fixture("usuarios.json")
    //   .then(datos => {
    //     console.log(datos)
    //     const usuario = datos.UsuarioBien
        const usuario = usuariosCargados.UsuarioBien

        // Con está solución no debemos de modificar los datos de los fixtures
        // usuariosCargados.UsuarioMal.password = "cfalco"

        cy.get("#email")
          .type(usuario.email)

        cy.get("#password")
          .type(usuario.password)

        // cy.get("button[type='submit']")
        //   .click()
        cy.get("form")
          .submit()

        cy.get('h1')
          .should('have.text', "Bienvenido a la página")
    //  })

    })

    it("si usas un usuario incorrecto vas a la página de login", () => {

      // cy.fixture("usuarios.json")
      // .then(datos => {
      //   console.log(datos)
      //   const usuario = datos.UsuarioMal
        const usuario = usuariosCargados.UsuarioMal

        cy.get("#email")
          .type(usuario.email)

        cy.get("#password")
          .type(usuario.password)

        // cy.get("button[type='submit']")
        //   .click()
        cy.get("form")
          .submit()

        cy.url()
          .should("include", "/login")
      // })

  })
})