import * as Chai from 'chai'
import { sumar, dividir } from './operaciones.mjs'

const expect = Chai.expect
Chai.should()

describe("La función sumar ", () => {

  it("recibe dos números y devuelve su suma", () => {
    const tres = sumar(1, 2)
    // assert.ok(tres === 3)
    // expect(tres === 3).to.be.true
    const resultado = tres === 3
    resultado.should.be.true
  })

})

describe("La función dividir ", () => {

  it("debería de devolver un 5 al dividir 10 y 2", () => {
    const resultado = dividir(10, 2)
    // assert.equal(resultado, 5)
    // expect(resultado).to.be.equal(5)
    resultado.should.equal(5)
  })

  it("debería devolver un error al dividir por 0", () => {
    // assert.throws(() => {
    //   dividir(10, 0)
    // }, Error("No se puede dividir por 0"))
    // expect(() => dividir(10, 0)).to.throws(Error, "No se puede dividir por 0");
    (() => dividir(10, 0)).should.throw(Error, "No se puede dividir por 0")
  })

})