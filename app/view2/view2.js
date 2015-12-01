'use strict';
var server = "http://localhost:9010/";
angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl',
            controllerAs: 'v2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$http', '$rootScope', function ($http, $rootScope) {

        this.sale = {};
        var ctrl = this;

        this.loadCustomer = function () {
            ctrl.sale.customerId = localStorage.getItem("id");
        };

        this.performSale = function () {

            $http.post(server + 'transaction/processPayment', ctrl.sale).success(function (response) {
                ctrl.response = response;
            }).error(function (error) {
                ctrl.response = error;
            });

        };

    }]);