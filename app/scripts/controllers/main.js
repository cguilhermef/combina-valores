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
      $scope.cheques = [687.34, 648, 440, 408.58, 200, 581];
      $scope.model = {
        cheque: null
      };
      $scope.clearResults();
    };

    $scope.removeAllCheques = function() {
      if (window.confirm("Apagar todos os cheques digitados. Deseja continuar?")) {
        $scope.clearResults();
        $scope.cheques = [];
      }
    };

    $scope.clearResults = function() {
      $scope.menorTroco = _.sum($scope.valores) - $scope.valor;
      $scope.menorTrocoComMaisCheques = _.sum($scope.valores) - $scope.valor;
      $scope.menorTrocoComMenosCheques = _.sum($scope.valores) - $scope.valor;

      $scope.menorDiferenca = $scope.valor;
      $scope.menorDiferencaMaisCheques = $scope.valor;
      $scope.menorDiferencaMenosCheques = $scope.valor;

      $scope.combinacaoMenorTroco = [];
      $scope.combinacaoMenorTrocoMaisCheques = [];
      $scope.combinacaoMenorTrocoMenosCheques = [];
      $scope.combinacaoMenorDiferenca = [];
      $scope.combinacaoMenorDiferencaMaisCheques = [];
      $scope.combinacaoMenorDiferencaMenosCheques = [];
    };

    $scope.addCheque = function() {
      $scope.cheques.push(Number($scope.model.cheque));
      $scope.model.cheque = null;
      $('#novo-cheque').focus();
    };
    $scope.removeCheque = function($index) {
      $scope.cheques = _.without($scope.cheques, $scope.cheques[$index]);
    }

    $scope.execute = function() {
      $scope.clearResults();
      var ln = $scope.valores.length;
      var cp = Math.pow(2, ln);
      var tmpVetor = [];
      var tmpValoresCombinados = [];
      var tmpNum = null;
      var i = 1;
      var c = 0;
      var valor = 0;
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

    }

    $scope.init();

    $scope.$watch('cheques', function(nV, oV){
      if (nV) {
        $scope.clearResults();
      }
    }, true);
  });
