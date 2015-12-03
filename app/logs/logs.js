'use strict';
angular.module('myApp.logs', ['ngRoute', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logs', {
            templateUrl: 'logs/logs.html',
            controller: 'View3Ctrl',
            controllerAs: 'v3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$http', '$rootScope', function ($http, $rootScope) {

        this.log = "<p>Loading...</p>";
        var ctrl = this;

        $http.get(server + "gateway/getLogs").then(function (response) {
            ctrl.log = response.data.message;
        })

    }]);