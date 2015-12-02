'use strict';
var server = "http://localhost:9010/";
//var server = "http://server.localhostsro.sk:9010/";


(function () {
    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.view3',
        'myApp.version',
        'ng-currency',
        'ngLoadingSpinner'
    ]).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/view1'});
        }]);

}());

