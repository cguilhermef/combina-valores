'use strict';

/**
 * @ngdoc function
 * @name chequesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chequesApp
 */
angular.module('chequesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.init = function() {
      $scope.cheques = [
        142.75300732942,
        1992.2281988627,
        762.59871167717,
        2672.7218359815,
        593.75581408094,
        2016.807615695,
        1830.2684736346,
        928.29185208692,
        1562.3968399653,
        1778.9732755995,
        77.315295826325,
        511.72777379943,
        1391.2501540926,
        2153.8754689758,
        2646.5870890052,
        1866.98667175,
        95.096584733155,
        2962.5126132334,
        1852.2217330766,
        2001.5792618047];
      $scope.model = {
        cheque: null
      };
    };

    $scope.clearResults = function() {
      $scope.troco = 0;
      $scope.menorDiferenca = 0;
      $scope.diferencaMaiorCombinacao = 0;
      $scope.maiorCombinacaoComDiferenca = [];
      $scope.menorCombinacaoComDiferenca = [];
    };

    $scope.addCheque = function() {
      $scope.cheques.push(Number($scope.model.cheque));
      $scope.model.cheque = null;
      $('#novo-cheque').focus();
    };
    $scope.removeCheque = function($index) {
      $scope.cheques = _.omit($scope.cheques, $index);
    }

    $scope.execute = function() {
      var valor = $scope.valor;
      var i = 0;
      var j = 0;
      var ln = $scope.cheques.length;
      var asc = _.sortBy($scope.cheques);
      var matriz = [];
      var valorA = 0;
      var valorB = _.sum(asc)-valor;
      var somaTmp = 0;
      var combinacaoBaixo = null;
      var combinacaoAcima = null;
      var menorNumeroChequesComDiferenca = _.times(ln, _.constant(0));
      var maiorNumeroChequesComDiferenca = [];
      for(i = 0; i < ln; i++ ) {
        matriz.push([]);
        for(j = 0; j < ln; j++) {
          matriz[i][j] = asc[(i+j)%ln];
          somaTmp = _.sum(matriz[i]);
          if (somaTmp <= valor && somaTmp > valorA) {
            valorA = somaTmp;
            combinacaoBaixo = [].concat(matriz[i]);
            /**
             * o menor numero esta bugando, não apresenta o melhor resultado.
             */
            if (matriz[i].length < menorNumeroChequesComDiferenca.length) {
              menorNumeroChequesComDiferenca = [].concat(matriz[i]);
            }
            if (matriz[i].length > maiorNumeroChequesComDiferenca.length) {
              maiorNumeroChequesComDiferenca = [].concat(matriz[i]);
            }
          }
          if (somaTmp > valor && ((somaTmp - valor) > 0) && somaTmp - valor < valorB && (somaTmp - valor < valor)) {
            valorB = somaTmp-valor;
            combinacaoAcima = [].concat(matriz[i]);
          }
        }
      }
      $scope.melhorCombinacaoComTroco = combinacaoAcima;
      $scope.troco = valorB;
      $scope.melhorCombinacaoComDiferenca = combinacaoBaixo;
      $scope.menorDiferenca = valor - valorA;
      $scope.maiorCombinacaoComDiferenca = maiorNumeroChequesComDiferenca;
      $scope.diferencaMaiorCombinacao = valor - _.sum(maiorNumeroChequesComDiferenca);
      $scope.menorCombinacaoComDiferenca = menorNumeroChequesComDiferenca;
      $scope.diferencaMenorCombinacao = valor - _.sum(menorNumeroChequesComDiferenca);
      // console.log('com menos cheques:', valorA, menorNumeroChequesComDiferenca);
      // console.log('com mais cheques:', valorA, maiorNumeroChequesComDiferenca);
      // console.log('Melhor combinação sem troco:', valorA, combinacaoBaixo);
      // console.log('Menor troco:', valorB, 'usando o(s) cheque(s):',combinacaoAcima);
    }

    $scope.init();

    $scope.$watch('cheques', function(nV, oV){

    }, true);
  });
