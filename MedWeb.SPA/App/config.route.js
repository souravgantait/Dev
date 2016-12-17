/// <reference path="admin/dashboard.js" />
(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({
            templateUrl: 'App/Common/Views/home.html',
            title: 'Home',
            url: '/'
        });
    }

    // Define the routes 
    function getRoutes() {
        return [
        {
            url: '/home',
            config: {
                templateUrl: 'App/Common/Views/home.html',
                url: '/home',
                title: 'Home'
            }
        },
        {
            url: '/login',
            config: {
                templateUrl: 'App/Common/Views/login.html',
                url: '/login',
                title: 'login'              
            }
        },
        {
            url: '/signup',
            config: {
                templateUrl: 'App/Common/Views/signup.html',
                url: '/signup',
                title: 'signup'
            }
        },
           {
               url: '/dashboard',
               config: {
                   title: 'dashboard',
                   templateUrl: 'App/admin/dashboard.html',
                   url: '/dashboard',
                   nav: 2,
                   parentId: 3,
                   level: 2,
                   navIndex: 21,
                   content: '<i class="fa fa-lock"></i> Dashboard'
               }
           },
           {
               url: '/settings',
               config: {
                   title: 'Settings',
                   templateUrl: 'App/admin/admin.html',
                   url: '/settings',
                   nav: 2,
                   parentId: 3,
                   level: 2,
                   navIndex: 29,
                   content: '<i class="fa fa-lock"></i> Setting'
               }
           },
            {
                url: '/appointment',
                config: {
                    title: 'Appointment',
                    templateUrl: 'App/Modules/Appointment/Views/appointment.html',
                    url: '/appointment',
                    nav: 4,
                    parentId: 3,
                    level: 2,
                    navIndex: 22,
                    requiredPermissions: ['doctor'],
                    content: '<i class="fa fa-lock"></i> Appointment'
                }
            }
            , {
                url: '/scheduling',
                config: {
                    title: 'Scheduling',
                    templateUrl: 'App/Modules/Schedule/Views/schedule.html',
                    url: '/scheduling',
                    nav: 3,
                    parentId: 3,
                    level: 2,
                    navIndex: 23,
                    content: '<i class="fa fa-lock"></i> Scheduling'
                }
            }, {
                url: '/Availability',
                config: {
                    title: 'Availability',
                    templateUrl: 'App/Modules/Schedule/Views/availability.html',
                    url: '/Availability',
                    nav: 3,
                    parentId: 3,
                    level: 3,
                    navIndex: 24,
                    requiredPermissions: ['doctor'],
                    content: '<i class="fa fa-lock"></i> Availability'
                }
            }, {
                url: '/Unavailability',
                config: {
                    title: 'Unavailability',
                    templateUrl: 'App/Modules/Schedule/Views/unavailability.html',
                    url: '/Unavailability',
                    nav: 3,
                    parentId: 3,
                    level: 3,
                    navIndex: 25,
                    requiredPermissions: ['doctor'],
                    content: '<i class="fa fa-lock"></i> Unavailability'
                }
            }, {
                url: '/doctorRegistration',
                config: {
                    title: 'Become a doctor',
                    templateUrl: 'App/Common/Views/doctorRegistration.html',
                    url: '/doctorRegistration'
                }
            }
        ];
    }
})();