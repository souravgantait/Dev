(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', dashboard]);

    function dashboard(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Dashboard';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated dashboard'); });
        }
    }
})();