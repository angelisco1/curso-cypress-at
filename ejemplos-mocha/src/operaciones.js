const sumar = (n1, n2) => {
  return n1 + n2
}

const dividir = (n1, n2) => {
  if (n2 == 0) {
    throw new Error('No se puede dividir por 0')
  }

  return n1 / n2
}

module.exports = {
  sumar,
  dividir,
}