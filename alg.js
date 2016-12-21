var _ = require('lodash');
var valores = [150, 275, 300, 420];
var ln = valores.length;
var cp = Math.pow(2, ln);

var tmpVetorCombinacao = [];
var tmpValoresCombinados = [];
var tmpNum = null;
var i = 1;
var c = 0;

while (i < cp) {
  tmpValoresCombinados = [];
  tmpNum = Number(i).toString(2);
  tmpVetorCombincao = _
    .chain(tmpNum)
    .padStart(ln, '0')
    .split('')
    .map(Number)
    .value();

  for(c = 0; c < ln; c++ ){
    if (tmpVetorCombinacao[c]){
      tmpValoresCombinados.push(valores[c]);
    }
    console.log(_.sum(tmpValoresCombinados));
  }
  i++;
}
