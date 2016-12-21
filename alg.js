var _ = require('lodash');
var valores = [687.34, 648, 440, 408.58, 200, 581];
var ln = valores.length;
var cp = Math.pow(2, ln);

var tmpVetor = [];
var tmpValoresCombinados = [];
var tmpNum = null;
var i = 1;
var c = 0;
var valor = 994.50;

var menorTroco = _.sum(valores) - valor;
var menorTrocoComMaisCheques = _.sum(valores) - valor;
var menorTrocoComMenosCheques = _.sum(valores) - valor;

var menorDiferenca = valor;
var menorDiferencaMaisCheques = valor;
var menorDiferencaMenosCheques = valor;

var combinacaoMenorTroco = [];
var combinacaoMenorTrocoMaisCheques = [];
var combinacaoMenorTrocoMenosCheques = [];
var combinacaoMenorDiferenca = [];
var combinacaoMenorDiferencaMaisCheques = [];
var combinacaoMenorDiferencaMenosCheques = [];

var tmpSoma = 0;
var menorDiferenca = valor;

while (i < cp) {
  tmpValoresCombinados = [];
  tmpVetor = _.map(_.padStart(Number(i).toString(2), ln, '0').split(''), Number);
  
  for(c = 0; c < ln; c++ ){
    if (tmpVetor[c]) {
      tmpValoresCombinados.push(valores[c]);
    }
  }
  tmpSoma = _.sum(tmpValoresCombinados);
  if (tmpSoma <= valor ){
    if (valor - tmpSoma <= menorDiferenca) {
      menorDiferenca = valor - tmpSoma;
      combinacaoMenorDiferenca = [].concat(tmpValoresCombinados);
    }
  } else {
    if (tmpSoma - valor < menorTroco) {
      menorTroco = tmpSoma-valor;
      combinacaoMenorTroco = [].concat(tmpValoresCombinados);
      if (tmpValoresCombinados.length < combinacaoMenorDiferencaMenosCheques.length) {
        menorTrocoComMenosCheques = tmpSoma-valor;
        combinacaoMenorTrocoMenosCheques = [].concat(tmpValoresCombinados);
      }
      if (tmpValoresCombinados.length > combinacaoMenorDiferencaMaisCheques.length) {
        menorTrocoComMaisCheques = tmpSoma-valor;
        combinacaoMenorTrocoMaisCheques = [].concat(tmpValoresCombinados);
      }
    }
  }
  i++;
}

console.log('Menor troco: ' + menorTroco, combinacaoMenorTroco);
console.log('Menor diferença: ' + menorDiferenca, combinacaoMenorDiferenca);
