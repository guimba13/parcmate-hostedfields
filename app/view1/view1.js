'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            controllerAs: "v1Ctrl"
        });
    }])

    .controller('View1Ctrl', ['$http', function ($http) {
        this.amount = 0;
        var ctrl = this;

        var clientToken = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJlNzVjMmVhMmExMTdmYjk2YjQ4NmE4YWYyOWY0OGI5YzE0Njg3MjdiZTQxN2M5YmI0NThjYWQ5NWNmNzViZDIxfGNyZWF0ZWRfYXQ9MjAxNS0xMS0xOFQxMTowOToyNi44ODQ2NDc1NjkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=';
        require.config({
            paths: {
                braintree: "https://js.braintreegateway.com/v2/braintree"
            }
        });

        var checkout;

        require(["braintree"], function (braintree) {
            braintree.setup(clientToken, 'custom', {
                onReady: function (integration) {
                    checkout = integration;
                },
                onPaymentMethodReceived: function (payload) {
                    debugger;
                },
                onError: function (error) {
                    debugger;
                },
                id: 'f1',
                hostedFields: {
                    styles: {
                        // Style all elements
                        "input": {
                            "font-size": "16pt",
                            "color": "#3A3A3A"
                        },

                        // Styling a specific field
                        ".number": {
                            "height": "25px",
                            "width": "200px"
                        },
                        ".cvv": {
                            "height": "25px",
                            "width": "200px"
                        },
                        ".expiration-date": {
                            "height": "25px",
                            "width": "200px"
                        },

                        // Styling element state
                        ".valid": {
                            "color": "green"
                        },
                        ".invalid": {
                            "color": "red"
                        },

                        // Media queries
                        // Note that these apply to the iframe, not the root window.
                        "@media screen and (max-width: 700px)": {
                            "input": {
                                "font-size": "14pt"
                            }
                        }
                    },
                    number: {
                        selector: '#card-number',
                        placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: '311'
                    },
                    expirationDate: {
                        selector: '#expiration-date',
                        placeholder: '10/17'
                    }
                },
                paypal : {
                    container: 'paypal',
                    singleUse: true,
                    amount: 10,
                    currency: 'USD',
                    locale: 'en_us',
                    enableShippingAddress: 'true'
                }

            });
        });


    }]);