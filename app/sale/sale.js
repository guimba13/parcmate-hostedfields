'use strict';
angular.module('myApp.sale', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sale', {
            templateUrl: 'sale/sale.html',
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