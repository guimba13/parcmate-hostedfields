'use strict';
//var server = "http://localhost:9010/";
var server = "http://server.localhostsro.sk:9010/";


(function () {
    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'myApp.customer',
        'myApp.sale',
        'myApp.logs',
        'myApp.paypal',
        'myApp.version',
        'ng-currency',
        'ngLoadingSpinner'
    ]).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/customer'});
        }]);

}());

