'use strict';
angular.module('myApp.paypal', ['ngRoute', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/paypal', {
            templateUrl: 'paypal/paypal.html',
            controller: 'PayPalCtrl',
            controllerAs: 'ppCtrl'
        });
    }])

    .controller('PayPalCtrl', ['$http', '$rootScope', function ($http, $rootScope) {

        ctrl = this;
        this.customer = {};
        this.response = {};
        this.update = false;
        this.lastUser = false;

        var checkout;
        http = $http;

        this.loadLast = function () {
            if(ctrl.lastUser){
                ctrl.customer.ccId = localStorage.getItem('id');
                ctrl.customer.paymentToken = localStorage.getItem('token');
            } else {
                ctrl.customer.ccId = '';
                ctrl.customer.paymentToken = '';
            }
        };

        this.edit = function () {
            ctrl.update = !ctrl.update;
        };

        var createCustomer = function (payload) {
            ctrl.response = {};
            ctrl.customer.payment_method_nonce = payload.nonce;
            ctrl.billingAddress = payload.details.billingAddress;
            if (ctrl.update) {
                ctrl.customer.type = 'PAYPAL';
                http.post(server + 'customer/updateCustomer', ctrl.customer).success(function (response) {
                    ctrl.response = response;
                    localStorage.setItem('id', response.ccId);
                    localStorage.setItem('token', response.paymentToken);
                }).error(function (error) {
                    ctrl.response = error;
                });
            } else {
                http.post(server + 'customer/addPayPalCustomer', ctrl.customer).success(function (response) {
                    ctrl.response = response;
                    localStorage.setItem('id', response.ccId);
                    localStorage.setItem('token', response.paymentToken);
                }).error(function (error) {
                    ctrl.response = error;
                });
            }

        };

        $http.get(server + 'gateway/generateClientToken').success(function (response) {
            require.config({
                paths: {
                    braintree: 'https://js.braintreegateway.com/v2/braintree'
                }
            });

            require(['braintree'], function (braintree) {
                braintree.setup(response.clientToken, 'custom', {
                    onReady: function (integration) {
                        checkout = integration;
                    },
                    onPaymentMethodReceived: function (payload) {
                        createCustomer(payload);
                    },
                    onError: function (error) {
                        alert(error.message);
                    },
                    paypal: {
                        container: "paypal-container",
                        displayName : "Parcmate",
                        enableBillingAddress : true
                        //,headless: lets see
                    }

                });
            });
        });

    }]);