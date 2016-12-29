(function () {
    'use strict';
    
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions
        'kendo.directives',
        // 3rd Party Modules
        'ui.bootstrap', 'LocalStorageModule', 'angular-loading-bar'     // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);

    app.constant('serviceEndpoints', {
       // userServiceUrl: 'http://localhost:50414/',
        userServiceUrl: 'http://medwebusers.azurewebsites.net/',        
        //authenticationServiceUrl: 'http://localhost:63675/',
        authenticationServiceUrl: 'http://medweb-authentication.azurewebsites.net/',
        appServiceUrl: 'http://medweb-common.azurewebsites.net/',
       // appServiceUrl: 'http://localhost:51351/',

        clientId: 'MedClientApp'
    });       
})();