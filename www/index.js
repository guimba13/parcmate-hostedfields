var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
        window.open = cordova.InAppBrowser.open;
        //angular.element(document).ready(function() {
        //    angular.bootstrap(document);
        //});
    }
};

app.initialize();