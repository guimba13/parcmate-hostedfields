'use strict';

var server = "http://localhost:9010/";
var ctrl;
var http;

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            controllerAs: 'v1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$http', '$rootScope', function ($http, $rootScope) {

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
            if (ctrl.update) {
                http.post(server + 'customer/updateCustomer', ctrl.customer).success(function (response) {
                    ctrl.response = response;
                    localStorage.setItem('id', response.ccId);
                    localStorage.setItem('token', response.paymentToken);
                }).error(function (error) {
                    ctrl.response = error;
                });
            } else {
                http.post(server + 'customer/addCustomer', ctrl.customer).success(function (response) {
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
                    id: 'f1',
                    hostedFields: {
                        styles: {
                            // Style all elements
                            "input": {
                                'font-size': '14px',
                                'border': '1px solid #aaa',
                                'border-radius': '2px',
                                'height': '20px',
                                'width': '220px'
                            },

                            // Styling a specific field
                            '.number': {
                                'height': '20px',
                                'width': '220px'
                            },
                            '.cvv': {
                                'height': '20px',
                                'width': '220px'
                            },
                            '.expiration-date': {
                                'height': '20px',
                                'width': '220px'
                            }

                            // Styling element state

                        },
                        number: {
                            selector: '#card-number'
                        },
                        cvv: {
                            selector: '#cvv'
                        },
                        expirationDate: {
                            selector: '#expiration-date'
                        }
                    }

                });
            });
        });

    }]);