'use strict';

/**
 * @ngdoc function
 * @name combinaValores.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the combinaValores
 */
angular.module('combinaValores')
  .controller('MainCtrl', function ($scope) {
    $scope.init = function() {
      $scope.running = false;
      $scope.valores = [];
      $scope.model = {
        cheque: null
      };
      $scope.clearResults();
    };

    $scope.removeAllValores = function() {
      if (window.confirm("Apagar todos os valores digitados. Deseja continuar?")) {
        $scope.clearResults();
        $scope.valores = [];
      }
    };

    $scope.clearResults = function() {
      $scope.menorTroco = _.sum($scope.valores) - $scope.valor;
      $scope.menorTrocoComMaisValores = _.sum($scope.valores) - $scope.valor;
      $scope.menorTrocoComMenosValores = _.sum($scope.valores) - $scope.valor;

      $scope.menorDiferenca = $scope.valor;
      $scope.menorDiferencaMaisValores = $scope.valor;
      $scope.menorDiferencaMenosValores = $scope.valor;

      $scope.combinacaoMenorTroco = [];
      $scope.combinacaoMenorTrocoMaisValores = [];
      $scope.combinacaoMenorTrocoMenosValores = [];
      $scope.combinacaoMenorDiferenca = [];
      $scope.combinacaoMenorDiferencaMaisValores = [];
      $scope.combinacaoMenorDiferencaMenosValores = [];
    };

    $scope.addValor = function() {
      $scope.valores.push(Number($scope.model.valor));
      $scope.model.valor = null;
      $('#novo-valor').focus();
    };
    $scope.removeValor = function($index) {
      $scope.valores = _.without($scope.valores, $scope.valores[$index]);
    };

    $scope.execute = function() {
      $scope.running = true;
      $scope.clearResults();
      var valores = $scope.valores;
      var ln = $scope.valores.length;
      $scope.cp = Math.pow(2, ln);
      var tmpVetor = [];
      var tmpValoresCombinados = [];
      var i = 1;
      var c = 0;
      var valor = $scope.valor;
      var tmpSoma = 0;
      $scope.menorTroco = _.sum(valores) - valor;
      $scope.menorTrocoComMaisValores = _.sum(valores) - valor;
      $scope.menorTrocoComMenosValores = _.sum(valores) - valor;

      $scope.menorDiferenca = valor;
      $scope.menorDiferencaMaisValores = valor;
      $scope.menorDiferencaMenosValores = valor;

      $scope.combinacaoMenorTroco = [];
      $scope.combinacaoMenorTrocoMaisValores = [];
      $scope.combinacaoMenorTrocoMenosValores = _.times(ln, _.constant(0));
      $scope.combinacaoMenorDiferenca = [];
      $scope.combinacaoMenorDiferencaMaisValores = [];
      $scope.combinacaoMenorDiferencaMenosValores = _.times(ln, _.constant(0));


      while (i < $scope.cp) {
        tmpValoresCombinados = [];
        tmpVetor = _.map(_.padStart(Number(i).toString(2), ln, '0').split(''), Number);
        
        for(c = 0; c < ln; c++ ){
          if (tmpVetor[c]) {
            tmpValoresCombinados.push(valores[c]);
          }
        }
        tmpSoma = _.sum(tmpValoresCombinados);
        if (tmpSoma <= valor ){
          if ((valor - tmpSoma) <= $scope.menorDiferenca) {
            $scope.menorDiferenca = valor - tmpSoma;
            $scope.combinacaoMenorDiferenca = [].concat(tmpValoresCombinados);
            if (tmpValoresCombinados.length < $scope.combinacaoMenorDiferenca.length ) {
              $scope.menorDiferencaComMenosValores = valor - tmpSoma;
              $scope.combinacaoMenorDiferencaMenosValores = [].concat(tmpValoresCombinados);
            }
            if (tmpValoresCombinados.length > $scope.combinacaoMenorDiferencaMaisValores.length) {
              $scope.menorDiferencaComMaisValores = valor - tmpSoma;
              $scope.combinacaoMenorDiferencaMaisValores = [].concat(tmpValoresCombinados);
            }
          }
        } else {
          if ((tmpSoma - valor) < $scope.menorTroco) {
            $scope.menorTroco = tmpSoma-valor;
            $scope.combinacaoMenorTroco = [].concat(tmpValoresCombinados);
            if (tmpValoresCombinados.length < $scope.combinacaoMenorTrocoMenosValores.length) {
              $scope.menorTrocoComMenosValores = tmpSoma-valor;
              $scope.combinacaoMenorTrocoMenosValores = [].concat(tmpValoresCombinados);
            }
            if (tmpValoresCombinados.length > $scope.combinacaoMenorTrocoMaisValores.length) {
              $scope.menorTrocoComMaisValores = tmpSoma-valor;
              $scope.combinacaoMenorTrocoMaisValores = [].concat(tmpValoresCombinados);
            }
          }
        }
        i++;
      }
      if (_.sum($scope.combinacaoMenorTrocoMenosValores) === 0) {
         $scope.combinacaoMenorTrocoMenosValores = [];
      }
      if (_.sum($scope.combinacaoMenorTrocoMaisValores) === 0) {
         $scope.combinacaoMenorTrocoMaisValores = [];
      }
      if (_.sum($scope.combinacaoMenorDiferencaMenosValores) === 0) {
         $scope.combinacaoMenorDiferencaMenosValores = [];
      }
      if (_.sum($scope.combinacaoMenorDiferencaMaisValores) === 0) {
         $scope.combinacaoMenorDiferencaMaisValores = [];
      }
      $scope.running = false;
    };

    $scope.init();

    $scope.$watch('valores', function(nV){
      if (nV) {
        $scope.clearResults();
        $scope.cp = Math.pow(2, $scope.valores.length);
      }
    }, true);
  });
