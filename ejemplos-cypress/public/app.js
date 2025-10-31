const display = document.getElementById('pantalla-codigo');

function checkCodigoSecreto(codigo) {
  if (codigo.length < 4) {
    return [false, false];
  }
  const codigoSecreto = 6710;
  return [codigoSecreto == codigo, codigo.length == 5];
}
function borrarCodigo() {
  display.innerText = '';
}

function borrarUltimoNum() {
  const codigoActual = display.innerText;
  display.innerText = codigoActual.slice(0, codigoActual.length-1);
}

function introducirNum(num) {
  const codigoActual = display.innerText;
  const codigoNuevo = codigoActual + num;
  const [esCorrecto, longitudMaxima] = checkCodigoSecreto(codigoNuevo);
  if (esCorrecto) {
    display.innerText = 'CODE OK';
  } else {
    display.innerText = longitudMaxima ? codigoActual : codigoNuevo;
  }
}

document.getElementById('teclado').addEventListener('click', (event) => {
  const num = event.target.innerText;
  switch (num) {
    case 'DEL':
      borrarUltimoNum();
      break;
    case 'CLD':
      borrarCodigo();
      break;
    default:
      introducirNum(num);
  }
})