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
      $scope.showOutputJSON = false;
      $scope.showInputJSON = false;
      $scope.jsonInputError = false;
      $scope.running = false;
      $scope.done = false;
      $scope.valores = [];
      $scope.model = {
        cheque: null
      };
      $scope.clearResults();
      $('#novo-valor').on('keypress', function(e) {
        if (e.keyCode === 13) {
          e.stopPropagation();
          $scope.addValor();
        }
      });
    };
    $scope.toggleInputJSON = function() {
      $scope.showInputJSON = !$scope.showInputJSON;
    };
    $scope.loadJSON = function() {
      var tmp = {};
      $scope.jsonInputError = false;
      try {
        tmp = JSON.parse($scope.inputJSON);
      } catch(error) {
        console.warn('JSON inválido!');
        $scope.jsonInputError = 'Formato inválido de JSON.';
        return;
      }
      if (tmp.valores) { $scope.valores = tmp.valores; }
      if (tmp.valor) { $scope.valor = tmp.valor; }
      $scope.toggleInputJSON();
    };

    $scope.toggleOutputJSON = function() {
      $scope.showOutputJSON = !$scope.showOutputJSON;
    };

    $scope.removeAllValores = function() {
      if (window.confirm("Apagar todos os valores digitados. Deseja continuar?")) {
        $scope.clearResults();
        $scope.valores = [];
      }
    };

    $scope.clearResults = function() {
      $scope.done = false;
      $scope.menorTroco = null;
      $scope.menorTrocoComMaisValores = null;
      $scope.menorTrocoComMenosValores = null;

      $scope.menorDiferenca = null;
      $scope.menorDiferencaMaisValores = null;
      $scope.menorDiferencaMenosValores = null;

      $scope.combinacaoMenorTroco = null;
      $scope.combinacaoMenorTrocoMaisValores = null;
      $scope.combinacaoMenorTrocoMenosValores = null;
      $scope.combinacaoMenorDiferenca = null;
      $scope.combinacaoMenorDiferencaMaisValores = null;
      $scope.combinacaoMenorDiferencaMenosValores = null;
    };

    $scope.addValor = function() {
      if ($scope.model.valor >= 0) {
        $scope.valores.push(Number($scope.model.valor));
        $scope.model.valor = null;
        // $('#novo-valor').focus();
      }
    };
    $scope.removeValor = function($index) {
      $scope.valores = _.reduce($scope.valores, function(result, valor, index) {
        if (index !== $index) {
          result.push(valor);
        }
        return result;
      }, []);
    };

    $scope.execute = function() {
      if ($scope.running) {
        return;
      }
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
      var maxTroco = $scope.valor / 2;
      var maxDiferenca = $scope.valor / 2;

      var tmpSoma = 0;
      var tmpDiferenca = 0;
      var tmpTroco = 0;

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
        if (tmpSoma === valor) {
          $scope.menorDiferenca = 0;
          $scope.combinacaoMenorDiferenca = [].concat(tmpValoresCombinados);
          $scope.menorTroco = 0;
          $scope.combinacaoMenorTroco = [].concat(tmpValoresCombinados);
        } else {
          if (tmpSoma < valor ){
            tmpDiferenca = valor - tmpSoma;
            if (tmpDiferenca <= $scope.menorDiferenca) {
              $scope.menorDiferenca = tmpDiferenca;
              $scope.combinacaoMenorDiferenca = [].concat(tmpValoresCombinados);
            }
            if (tmpValoresCombinados.length < $scope.combinacaoMenorDiferenca.length && 
              tmpDiferenca < $scope.menorDiferencaComMenosValores &&
              tmpDiferenca <= maxDiferenca) {
              $scope.menorDiferencaComMenosValores = tmpDiferenca;
              $scope.combinacaoMenorDiferencaMenosValores = [].concat(tmpValoresCombinados);
            }
            if (tmpValoresCombinados.length > $scope.combinacaoMenorDiferencaMaisValores.length &&
              tmpDiferenca < $scope.menorDiferencaComMaisValores &&
              tmpDiferenca <= maxDiferenca) {
              $scope.menorDiferencaComMaisValores = tmpDiferenca;
              $scope.combinacaoMenorDiferencaMaisValores = [].concat(tmpValoresCombinados);
            }
          } else {
            if ((tmpSoma - valor) < $scope.menorTroco) {
              tmpTroco = tmpSoma - valor;
              $scope.menorTroco = tmpTroco;
              $scope.combinacaoMenorTroco = [].concat(tmpValoresCombinados);
            }
            if (tmpValoresCombinados.length < $scope.combinacaoMenorTrocoMenosValores.length &&
              tmpTroco < $scope.menorTrocoComMenosValores &&
              tmpTroco <= maxTroco) {
              $scope.menorTrocoComMenosValores = tmpTroco;
              $scope.combinacaoMenorTrocoMenosValores = [].concat(tmpValoresCombinados);
            }
            if (tmpValoresCombinados.length > $scope.combinacaoMenorTrocoMaisValores.length &&
              tmpTroco < $scope.menorTrocoComMaisValores &&
              tmpTroco <= maxTroco) {
              $scope.menorTrocoComMaisValores = tmpTroco;
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
      $scope.done = true;
    };

    $scope.init();

    $scope.$watch('valores', function(nV){
      if (nV) {
        $scope.clearResults();
        $scope.cp = Math.pow(2, $scope.valores.length);
        $scope.outputJSON = {
          valores: $scope.valores,
          valor: $scope.valor
        };
      }
    }, true);
    $scope.$watch('valor', function(nV) {
      if (nV) {
        $scope.outputJSON = {
          valores: $scope.valores,
          valor: $scope.valor
        };
      }
    });
  });
