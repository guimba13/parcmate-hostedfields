'use strict';
//var server = "http://localhost:9010/";
var server = "http://server.localhostsro.sk:9010/";


(function () {
    // Declare www level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'myApp.customer',
        'myApp.sale',
        'myApp.logs',
        'myApp.paypal',
        'myApp.version',
        'ng-currency',
        'ngLoadingSpinner'
    ])
        .config(function ($compileProvider){
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        })
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/customer'});
        }]);

}());

