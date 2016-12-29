(function () {
    'use strict';
    var controllerId = 'doctorRegistrationViewModel';
    angular.module('app').controller(controllerId, ['$scope', '$location', '$timeout', 'authService', doctorRegistration]);

    function doctorRegistration($scope, $location, $timeout, authService) {
        var vm = this;
        vm.title = 'Become a doctor';
        vm.savedSuccessfully = false;
        vm.message = "";
        vm.years = [];
        vm.doctorInfo = {
            fatherName: "",
            regNo: "",
            dateReg: "",
            medicalCouncil: "",
            qualificationName: "",
            qualificationYear: "",
            qualificationUniversity: "",
            permanentAddress: ""
        };

        for (var i = 1950; i < 2050; i++) {
            vm.years.push(i);
        }

        vm.becomeDoctor = function () {
           var accountId = authService.getUser().citizenLocationDigitalMasterid;
           authService.becomeDoctor(vm.doctorInfo, accountId).then(function (response) {
                vm.savedSuccessfully = true;
                vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();

            },
             function (response) {
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }
                 vm.message = "Failed to register user due to:" + errors.join(' ');
             });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        }

    };
})();