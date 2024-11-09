import angular from "angular";
import angularTouch from "angular-touch";
import angularInputMasks from "angular-input-masks";
import jquery from "jquery";
import * as angularResource from "angular-resource"
import * as angularRoute from 'angular-route';
import * as angularSanitize from 'angular-sanitize';
import * as _ from 'lodash';

window.$ = jquery;
window._ = _;

/**
 * @ngdoc overview
 * @name combinaValores
 * @description
 * # combinaValores
 *
 * Main module of the application.
 */
angular
  .module('combinaValores', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.utils.masks'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
