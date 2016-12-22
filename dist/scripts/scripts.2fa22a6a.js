"use strict";angular.module("combinaValores",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.utils.masks"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("combinaValores").controller("MainCtrl",["$scope",function(a){a.init=function(){a.running=!1,a.valores=[],a.model={cheque:null},a.clearResults()},a.removeAllValores=function(){window.confirm("Apagar todos os valores digitados. Deseja continuar?")&&(a.clearResults(),a.valores=[])},a.clearResults=function(){a.menorTroco=_.sum(a.valores)-a.valor,a.menorTrocoComMaisValores=_.sum(a.valores)-a.valor,a.menorTrocoComMenosValores=_.sum(a.valores)-a.valor,a.menorDiferenca=a.valor,a.menorDiferencaMaisValores=a.valor,a.menorDiferencaMenosValores=a.valor,a.combinacaoMenorTroco=[],a.combinacaoMenorTrocoMaisValores=[],a.combinacaoMenorTrocoMenosValores=[],a.combinacaoMenorDiferenca=[],a.combinacaoMenorDiferencaMaisValores=[],a.combinacaoMenorDiferencaMenosValores=[]},a.addValor=function(){a.valores.push(Number(a.model.valor)),a.model.valor=null,$("#novo-valor").focus()},a.removeValor=function(b){a.valores=_.without(a.valores,a.valores[b])},a.execute=function(){a.running=!0,a.clearResults();var b=a.valores,c=a.valores.length;a.cp=Math.pow(2,c);var d=[],e=[],f=1,g=0,h=a.valor,i=0;for(a.menorTroco=_.sum(b)-h,a.menorTrocoComMaisValores=_.sum(b)-h,a.menorTrocoComMenosValores=_.sum(b)-h,a.menorDiferenca=h,a.menorDiferencaMaisValores=h,a.menorDiferencaMenosValores=h,a.combinacaoMenorTroco=[],a.combinacaoMenorTrocoMaisValores=[],a.combinacaoMenorTrocoMenosValores=_.times(c,_.constant(0)),a.combinacaoMenorDiferenca=[],a.combinacaoMenorDiferencaMaisValores=[],a.combinacaoMenorDiferencaMenosValores=_.times(c,_.constant(0));f<a.cp;){for(e=[],d=_.map(_.padStart(Number(f).toString(2),c,"0").split(""),Number),g=0;c>g;g++)d[g]&&e.push(b[g]);i=_.sum(e),h>=i?h-i<=a.menorDiferenca&&(a.menorDiferenca=h-i,a.combinacaoMenorDiferenca=[].concat(e),e.length<a.combinacaoMenorDiferenca.length&&(a.menorDiferencaComMenosValores=h-i,a.combinacaoMenorDiferencaMenosValores=[].concat(e)),e.length>a.combinacaoMenorDiferencaMaisValores.length&&(a.menorDiferencaComMaisValores=h-i,a.combinacaoMenorDiferencaMaisValores=[].concat(e))):i-h<a.menorTroco&&(a.menorTroco=i-h,a.combinacaoMenorTroco=[].concat(e),e.length<a.combinacaoMenorTrocoMenosValores.length&&(a.menorTrocoComMenosValores=i-h,a.combinacaoMenorTrocoMenosValores=[].concat(e)),e.length>a.combinacaoMenorTrocoMaisValores.length&&(a.menorTrocoComMaisValores=i-h,a.combinacaoMenorTrocoMaisValores=[].concat(e))),f++}0===_.sum(a.combinacaoMenorTrocoMenosValores)&&(a.combinacaoMenorTrocoMenosValores=[]),0===_.sum(a.combinacaoMenorTrocoMaisValores)&&(a.combinacaoMenorTrocoMaisValores=[]),0===_.sum(a.combinacaoMenorDiferencaMenosValores)&&(a.combinacaoMenorDiferencaMenosValores=[]),0===_.sum(a.combinacaoMenorDiferencaMaisValores)&&(a.combinacaoMenorDiferencaMaisValores=[]),a.running=!1},a.init(),a.$watch("valores",function(b){b&&(a.clearResults(),a.cp=Math.pow(2,a.valores.length))},!0)}]),angular.module("combinaValores").run(["$templateCache",function(a){a.put("views/main.html",'<div class="row"> <div class="col-xs-12 col-md-4"> <ul class="list-group"> <li class="list-group-item"> <h4> Lista de valores <button title="remover todos os valores" ng-show="valores.length > 1" ng-click="removeAllValores()" class="btn btn-warning btn-xs pull-right"> <span class="fa fa-trash-o"></span> </button> </h4> </li> <li class="list-group-item"> <div class="form-group" style="margin-bottom: 0"> <div class="input-group"> <input type="number" id="novo-valor" ui-number-mask ui-hide-group-sep ng-model="model.valor" class="form-control"> <span class="input-group-btn"> <button ng-click="addValor()" class="btn btn-success"> Incluir </button> </span> </div> </div> </li> <li ng-show="valores.length === 0" class="list-group-item"> <div class="alert alert-info text-center" style="margin-bottom: 0"> Para começar, informe dois ou mais valores. </div> </li> <li ng-repeat="valor in valores track by $index" class="list-group-item"> {{ valor | currency:"R$ "}} <button ng-click="removeValor($index)" class="btn btn-danger btn-xs pull-right"> <span class="fa fa-remove fa-xs"></span> </button> </li> </ul> </div> <div class="col-xs-12 col-md-8"> <div class="row"> <div class="col-xs-12"> <div class="panel panel-default"> <div class="panel-body"> <div class="row"> <div class="col-xs-12 col-md-6"> <div class="form-group"> <label for="" class="form-control-label">Valor a ser pago:</label> <div class="input-group"> <span class="input-group-addon">R$</span> <input ui-number-mask ui-hide-group-sep type="number" class="form-control" ng-model="valor"> <span class="input-group-btn"> <button ng-click="execute()" ng-disabled="running || !valor || valores.length < 2" class="btn btn-primary"> <span ng-class="{\'fa-spin\': running}" class="fa fa-refresh"></span> <span class="hidden-xs hidden-sm">Executar</span> </button> </span> </div> </div> </div> <div class="col-xs-12 col-md-6"> <div ng-show="valores.length >= 2 && !valor" class="alert alert-info text-center" style="margin: 17px 0 0"> Antes de executar, informe o valor desejado. </div> <div ng-show="valores.length >= 2 && valor && (!menorTroco || !menorDiferenca) " class="alert alert-success text-center" style="margin: 6px 0 0"> Clique em <a ng-click="execute()">executar</a>, para obter as melhores combinações de valores. </div> <strong ng-show="menorTroco || menorDiferenca"><span class="fa fa-trophy"></span> Melhor opção</strong> <div ng-show="menorTroco < menorDiferenca"> <strong>Menor troco: </strong> {{ ( menorTroco || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorTroco track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> <hr> </div> <div ng-show="menorDiferenca < menorTroco"> <strong>Menor diferença: </strong> {{ ( menorDiferenca || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorDiferenca track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> </div> </div> </div> </div> </div> </div> <div class="row"> <div ng-show="menorTroco" class="col-xs-12 col-md-6"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Menor troco</h3> </div> <div class="panel-body"> <div ng-show="combinacaoMenorTroco.length > 0"> <strong>Menor troco: </strong> {{ ( menorTroco || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorTroco track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> <div ng-show="combinacaoMenorTrocoMaisValores.length > 0"> <hr> <strong>Menor troco, com mais valores:</strong> {{ ( menorTrocoComMaisValores || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorTrocoMaisValores track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> <div ng-show="combinacaoMenorTrocoMenosValores.length > 0"> <hr> <strong>Menor troco, menos valores: </strong> {{ ( menorTrocoComMenosValores || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorTrocoMenosValores track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> </div> </div> </div> <div ng-show="menorDiferenca" class="col-xs-12 col-md-6"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Menor diferença</h3> </div> <div class="panel-body"> <div ng-show="combinacaoMenorDiferenca.length > 0"> <strong>Menor diferença: </strong> {{ ( menorDiferenca || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorDiferenca track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> <div ng-show="combinacaoMenorDiferencaMaisValores.length > 0"> <hr> <strong>Menor diferença, com mais valores:</strong> {{ ( menorDiferencaComMaisValores || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorDiferencaMaisValores track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> <div ng-show="combinacaoMenorDiferencaMenosValores.length > 0"> <hr> <strong>Menor diferença, menos valores: </strong> {{ ( menorDiferencaComMenosValores || 0 ) | currency:"R$ " }} <div> <strong>Valores: </strong> <span ng-repeat="valor in combinacaoMenorDiferencaMenosValores track by $index"> <span ng-if="$index > 0" style="margin-left: 4px">+</span> <span class="label label-primary"> {{ valor | currency:"R$ " }} </span> </span> </div> </div> </div> </div> </div> </div> </div> </div>')}]);