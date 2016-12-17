(function () {
    'use strict';

    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$rootScope', '$location', 'common', 'config', 'authService', 'serviceEndpoints', shell]);

    function shell($rootScope, $location, common, config, authService, serviceEndpoints) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        var events = config.events;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };
        vm.logOut = function () {
            authService.logOut();
            $location.path('/home');
        }

        vm.signUp = function () {
            $location.path('/signup');
        }
        vm.img = "";


        vm.authenticatedUser = authService.getUser();

        activate();

        function activate() {
            logSuccess('Med Web loaded!', null, true);
            common.activateController([], controllerId);
            $location.path('/home');
            authService.refresh();
            vm.authenticatedUser = authService.getUser();

        }

        function toggleSpinner(on) { vm.isBusy = on; }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) { toggleSpinner(true); }
        );

        $rootScope.$on(events.controllerActivateSuccess,
            function (data) { toggleSpinner(false); }
        );

        $rootScope.$on(events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
        );

        $rootScope.$on("loginSuccess", function () {
            //var canvas = document.getElementById('canvas');
            //var context = canvas.getContext('2d');
            //var img = new Image();

            //img.onload = function () {
            //    context.drawImage(this, 0, 0, canvas.width, canvas.height);
            //}
            vm.authenticatedUser = authService.getUser();
            vm.img = serviceEndpoints.userServiceUrl + "/api/CitizenLocationDigitalMasters/UserProfilePhoto?photoName=" + vm.authenticatedUser.userName;
        });
    };
})();