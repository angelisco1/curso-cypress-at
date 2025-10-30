const assert = require('assert')
const { sumar, dividir } = require('./operaciones.js')

describe("La función sumar ", () => {

  it("recibe dos números y devuelve su suma", () => {
    const resultado = sumar(1, 2)
    assert.ok(resultado === 3)
  })

})

describe("La función dividir ", () => {

  it("debería de devolver un 5 al dividir 10 y 2", () => {
    const resultado = dividir(10, 2)
    assert.equal(resultado, 5)
  })

  it("debería devolver un error al dividir por 0", () => {
    dividir(10, 0)

    assert.throws(() => {
      dividir(10, 0)
    }, Error("No se puede dividir por 0"))
  })

})