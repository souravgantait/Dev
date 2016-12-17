(function () { 
    'use strict';
    
    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', '$rootScope', 'config', 'routes', 'authService', sidebar]);

    function sidebar($route, $rootScope, config, routes, authService) {
        var vm = this;

        vm.isCurrent = isCurrent;
        vm.activate = activate;
        vm.navRoutes = {};
        activate();

        function activate() {
            vm.navRoutes = getNavRoutes();
        }
        
        function navRoutes()
        {
            vm.navRoutes= getNavRoutes();
        }

        function getNavRoutes() {
            var validAccessRoutes = _.filter($route.routes, function (route) {
                if (route && route.requiredPermissions)
                    return authService.hasPermission(route.requiredPermissions);
                return true;
            });

            var orderedRoutes = _.sortBy(
               _.reject((_.where(validAccessRoutes, !{ level: 1, parentId: 0 })), function (route) {
                   return !route.hasOwnProperty("navIndex");}),
                function (route) { return route.navIndex; });

            //for (var i = 0; i < orderedRoutes.length; i++) {
            //    orderedRoutes[i].childRoutes = getChildRoutes(orderedRoutes[i].navIndex);
            //}

            return $.extend(true, [], orderedRoutes);

            //vm.navRoutes = routes.filter(function(r) {
            //    return r.config.settings && r.config.settings.nav;
            //}).sort(function(r1, r2) {
            //    return r1.config.settings.nav - r2.config.settings.nav;
            //});
        }

        $rootScope.$on("navigationReload", function () {
            vm.activate();
        });

        function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    };
})();
