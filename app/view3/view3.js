'use strict';
angular.module('myApp.view3', ['ngRoute', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
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