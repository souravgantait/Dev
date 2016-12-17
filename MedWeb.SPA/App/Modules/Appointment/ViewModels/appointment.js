(function () {
    'use strict';
    var controllerId = 'appointment';
    angular.module('app').controller(controllerId, ['common', appointment]);

    function appointment(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Appointment';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated appointment'); });
        }
    }
})();