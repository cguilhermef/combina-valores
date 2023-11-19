'use strict';

/**
 * @ngdoc directive
 * @name combinaValores.directive:onEnter
 * @description
 * # onEnter
 */
angular.module('combinaValores')
  .directive('onEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.myEnter);
              });
              event.preventDefault();
          }
      });
    };
  });
