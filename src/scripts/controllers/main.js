("use strict");

/**
 * @ngdoc function
 * @name combinaValores.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the combinaValores
 */
angular.module("combinaValores").controller("MainCtrl", function ($scope) {
  $scope.init = function () {
    $scope.showOutputJSON = false;
    $scope.showInputJSON = false;
    $scope.jsonInputError = false;
    $scope.running = false;
    $scope.done = false;
    $scope.valores = [];
    $scope.model = {
      cheque: null,
    };
    $scope.clearResults();
    $("#novo-valor").on("keypress", function (e) {
      if (e.keyCode === 13) {
        e.stopPropagation();
        $scope.addValor();
      }
    });
  };
  $scope.toggleInputJSON = function () {
    $scope.showInputJSON = !$scope.showInputJSON;
  };
  $scope.loadJSON = function () {
    var tmp = {};
    $scope.jsonInputError = false;
    try {
      tmp = JSON.parse($scope.inputJSON);
    } catch (error) {
      console.warn("JSON inválido!");
      $scope.jsonInputError = "Formato inválido de JSON.";
      return;
    }
    if (tmp.valores) {
      $scope.valores = tmp.valores;
    }
    if (tmp.valor) {
      $scope.valor = tmp.valor;
    }
    $scope.toggleInputJSON();
  };

  $scope.toggleOutputJSON = function () {
    $scope.showOutputJSON = !$scope.showOutputJSON;
  };

  $scope.removeAllValores = function () {
    if (
      window.confirm("Apagar todos os valores digitados. Deseja continuar?")
    ) {
      $scope.clearResults();
      $scope.valores = [];
    }
  };

  $scope.clearResults = function () {
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

  $scope.addValor = function () {
    if ($scope.model.valor >= 0) {
      $scope.valores.push(Number($scope.model.valor));
      $scope.model.valor = null;
      // $('#novo-valor').focus();
    }
  };
  $scope.removeValor = function ($index) {
    $scope.valores = _.reduce(
      $scope.valores,
      function (result, valor, index) {
        if (index !== $index) {
          result.push(valor);
        }
        return result;
      },
      []
    );
  };

  /**
   * Dado o vetor values = [1, 2, 3, 4] fará todas as
   * combinações possíveis com slideCombine, para cada
   * valor do vetor.
   * @param {number[]} values
   * @param {number[]} result
   * @returns
   */
  $scope.combineValues = function (values = [], result = []) {
    if (values.length === 0) {
      return result;
    }

    result = result.concat($scope.slideCombine(values));
    return $scope.combineValues(values.slice(1), result);
  };
  /**
   * Dado o vetor de valores values = [1, 2, 3, 4], a função
   * fará combinações do 1 com o 2, 3 e 4. Então,
   * recursivamente fará combinações do [1, 2] com o 3 e o 4,
   * do [1, 3] com o 4 e assim por diante.
   * @param {number[]} values
   * @param {number[]} result
   * @param {number} index
   * @returns
   */
  $scope.slideCombine = function (values = [], result = [], index = 0) {
    const length = values.length;
    if (index === length) {
      return result;
    }

    const base = values.slice(0, index + 1);
    if (index === 0) {
      result.push(base);
    }
    for (let i = index + 1; i < length; i++) {
      const tmp = base.concat(values[i]);
      result = result.concat([tmp]);
    }

    return $scope.slideCombine(values, result, index + 1);
  };

  $scope.mapCombinations = function (combinations = []) {
    return combinations.map((values) => {
      return {
        values,
        sum: values.reduce((r, value) => r + value, 0),
      };
    });
  };

  $scope.smallerChangeFor = function (combinations = [], value = 0) {
    let closestValueCombinations = combinations.reduce(
      (r, combination) => (combination.sum > value ? r : r.concat(combination)),
      []
    );

    let result = [];
    let smallerDiff = value;

    for (let i = 0; i < closestValueCombinations.length; i++) {
      const item = closestValueCombinations[i];
      const diff = value - item.sum;
      if (diff < smallerDiff) {
        result = [item];
        smallerDiff = diff;
        continue;
      }

      if (diff === smallerDiff) {
        result.push(item);
      }
    }

    return result;
  };

  $scope.closestCombinationAbove = function (combinations = [], value = 0) {
    let combinationsGreateThan = combinations.reduce(
      (r, combination) =>
        combination.sum >= value ? r.concat(combination) : r,
      []
    );

    let result = [];
    let smallerDiff = value;

    for (let i = 0; i < combinationsGreateThan.length; i++) {
      const item = combinationsGreateThan[i];
      const diff = item.sum - value;
      if (diff < smallerDiff) {
        result = [item];
        smallerDiff = diff;
        continue;
      }

      if (diff === smallerDiff) {
        result.push(item);
      }
    }

    return result;
  };

  $scope.execute = function () {
    if ($scope.running) {
      return;
    }
    $scope.running = true;
    $scope.clearResults();
    var valores = $scope.valores;
    var ln = $scope.valores.length;
    // $scope.cp = Math.pow(2, ln);
    // var tmpVetor = [];
    // var tmpValoresCombinados = [];
    // var i = 1;
    // var c = 0;
    var valor = $scope.valor;
    // var maxTroco = $scope.valor / 2;
    // var maxDiferenca = $scope.valor / 2;

    // var tmpSoma = 0;
    // var tmpDiferenca = 0;
    // var tmpTroco = 0;

    // $scope.menorTroco = _.sum(valores) - valor;
    // $scope.menorTrocoComMaisValores = _.sum(valores) - valor;
    // $scope.menorTrocoComMenosValores = _.sum(valores) - valor;

    // $scope.menorDiferenca = valor;
    // $scope.menorDiferencaMaisValores = valor;
    // $scope.menorDiferencaMenosValores = valor;

    // $scope.combinacaoMenorTroco = [];
    // $scope.combinacaoMenorTrocoMaisValores = [];
    // $scope.combinacaoMenorTrocoMenosValores = _.times(ln, _.constant(0));
    // $scope.combinacaoMenorDiferenca = [];
    // $scope.combinacaoMenorDiferencaMaisValores = [];
    // $scope.combinacaoMenorDiferencaMenosValores = _.times(ln, _.constant(0));

    // while (i < $scope.cp) {
    //   tmpValoresCombinados = [];
    //   tmpVetor = _.map(_.padStart(Number(i).toString(2), ln, '0').split(''), Number);

    //   for(c = 0; c < ln; c++ ){
    //     if (tmpVetor[c]) {
    //       tmpValoresCombinados.push(valores[c]);
    //     }
    //   }
    //   tmpSoma = _.sum(tmpValoresCombinados);
    //   if (tmpSoma === valor) {
    //     $scope.menorDiferenca = 0;
    //     $scope.combinacaoMenorDiferenca = [].concat(tmpValoresCombinados);
    //     $scope.menorTroco = 0;
    //     $scope.combinacaoMenorTroco = [].concat(tmpValoresCombinados);
    //   } else {
    //     if (tmpSoma < valor ){
    //       tmpDiferenca = valor - tmpSoma;
    //       if (tmpDiferenca <= $scope.menorDiferenca) {
    //         $scope.menorDiferenca = tmpDiferenca;
    //         $scope.combinacaoMenorDiferenca = [].concat(tmpValoresCombinados);
    //       }
    //       if (tmpValoresCombinados.length < $scope.combinacaoMenorDiferenca.length &&
    //         tmpDiferenca < $scope.menorDiferencaComMenosValores &&
    //         tmpDiferenca <= maxDiferenca) {
    //         $scope.menorDiferencaComMenosValores = tmpDiferenca;
    //         $scope.combinacaoMenorDiferencaMenosValores = [].concat(tmpValoresCombinados);
    //       }
    //       if (tmpValoresCombinados.length > $scope.combinacaoMenorDiferencaMaisValores.length &&
    //         tmpDiferenca < $scope.menorDiferencaComMaisValores &&
    //         tmpDiferenca <= maxDiferenca) {
    //         $scope.menorDiferencaComMaisValores = tmpDiferenca;
    //         $scope.combinacaoMenorDiferencaMaisValores = [].concat(tmpValoresCombinados);
    //       }
    //     } else {
    //       if ((tmpSoma - valor) < $scope.menorTroco) {
    //         tmpTroco = tmpSoma - valor;
    //         $scope.menorTroco = tmpTroco;
    //         $scope.combinacaoMenorTroco = [].concat(tmpValoresCombinados);
    //       }
    //       if (tmpValoresCombinados.length < $scope.combinacaoMenorTrocoMenosValores.length &&
    //         tmpTroco < $scope.menorTrocoComMenosValores &&
    //         tmpTroco <= maxTroco) {
    //         $scope.menorTrocoComMenosValores = tmpTroco;
    //         $scope.combinacaoMenorTrocoMenosValores = [].concat(tmpValoresCombinados);
    //       }
    //       if (tmpValoresCombinados.length > $scope.combinacaoMenorTrocoMaisValores.length &&
    //         tmpTroco < $scope.menorTrocoComMaisValores &&
    //         tmpTroco <= maxTroco) {
    //         $scope.menorTrocoComMaisValores = tmpTroco;
    //         $scope.combinacaoMenorTrocoMaisValores = [].concat(tmpValoresCombinados);
    //       }
    //     }
    //   }
    //   i++;
    // }
    let combinations = $scope.mapCombinations($scope.combineValues(valores));

    let combinacoesMenorDiferenca = $scope
      .closestCombinationAbove(combinations, valor)
      .reduce((result, { values }) => result.concat([values]), []);

    $scope.combinacaoMenorDiferencaMaisValores =
      combinacoesMenorDiferenca.length === 1
        ? combinacoesMenorDiferenca[0]
        : combinacoesMenorDiferenca
            .slice()
            .sort((a, b) => b.length - a.length)[0];
    $scope.combinacaoMenorDiferencaMenosValores =
      combinacoesMenorDiferenca.length === 1
        ? combinacoesMenorDiferenca[0]
        : combinacoesMenorDiferenca
            .slice()
            .sort((a, b) => a.length - b.length)[0];
    $scope.combinacaoMenorDiferenca =
      combinacoesMenorDiferenca.length === 1
        ? combinacoesMenorDiferenca[0]
        : $scope.combinacaoMenorDiferencaMenosValores;

    let combinacoesMenorTroco = $scope
      .smallerChangeFor(combinations, valor)
      .reduce((result, { values }) => result.concat([values]), []);

    $scope.combinacaoMenorTrocoMaisValores =
      combinacoesMenorTroco.length === 1
        ? combinacoesMenorTroco[0]
        : combinacoesMenorTroco.slice().sort((a, b) => b.length - a.length)[0];
    $scope.combinacaoMenorTrocoMenosValores =
      combinacoesMenorTroco.length === 1
        ? combinacoesMenorTroco[0]
        : combinacoesMenorTroco.slice().sort((a, b) => a.length - b.length)[0];
    $scope.combinacaoMenorTroco =
      combinacoesMenorTroco.length === 1
        ? combinacoesMenorTroco[0]
        : $scope.combinacaoMenorTrocoMenosValores;

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

  $scope.$watch(
    "valores",
    function (nV) {
      if (nV) {
        $scope.clearResults();
        $scope.cp = Math.pow(2, $scope.valores.length);
        $scope.outputJSON = {
          valores: $scope.valores,
          valor: $scope.valor,
        };
      }
    },
    true
  );
  $scope.$watch("valor", function (nV) {
    if (nV) {
      $scope.outputJSON = {
        valores: $scope.valores,
        valor: $scope.valor,
      };
    }
  });
});
