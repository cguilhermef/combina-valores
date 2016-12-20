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
      $scope.addCheque = function() {
        $scope.cheques.push(Number($scope.model.cheque));
        $scope.model.cheque = null;
        $('#novo-cheque').focus();
      };


    };

    $scope.init();
  });
