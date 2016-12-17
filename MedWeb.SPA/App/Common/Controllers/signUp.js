(function () {
    'use strict';
    var controllerId = 'signUp';
    angular.module('app').controller(controllerId, ['$scope', '$location', '$timeout', 'authService','fileReader', signUp]);

    function signUp($scope, $location, $timeout, authService, fileReader) {
        var vm = this;
        vm.title = 'Sign Up';
        vm.savedSuccessfully = false;
        vm.message = "";
        vm.toggleStep1 = true;
        vm.toggleStep2 = false;
        vm.toggleStep3 = false;
        vm.toggleStep4 = false;
        vm.toggleStep5 = false;

        vm.showStep1 = showStep1;
        vm.showStep2 = showStep2;
        vm.showStep3 = showStep3;
        vm.showStep4 = showStep4;
        vm.showStep5 = showStep5;

        vm.registration = {

            LoginId: "",
            Password: "",
            Role: "User",

            UId: "",
            Location: "",
            IssueDate: "",
            ExpiryDate: "",

            FirstName: "",
            MiddleName: "",
            LastName: "",
            AdharId: "",
            PanId: "",
            VoterId: "",
            DOB: "",
            Photo: "",

            Mobile1: "",
            Mobile2: "",
            Landline: "",
            PrimaryEmail: "",
            SecondaryEmail: "",
            Linkedin: "",
            Facebook: "",
            Twitter: "",

            Country: "",
            State: "",
            Zip: "",
            Area: "",
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            Landmark: ""
        };
       
        vm.countries = {
            'USA':
                {
                    'name': 'USA',
                    'states':
                  [
                  'Alabama',
                  'California',
                  'Illinois'
                  ]
                },

            'India':
                {
                    'name': 'India',
                    'states': ['Andhra Pradesh',
                'Arunachal Pradesh',
                    'Assam',
                    'Bihar',
                    'Chhattisgarh',
                    'Goa',
                    'Gujarat',
                    'Haryana',
                    'Himachal Pradesh',
                    'Jammu & Kashmir',
                    'Jharkhand',
                    'Karnataka',
                    'Kerala',
                    'Madhya Pradesh',
                    'Maharashtra',
                    'Manipur',
                    'Meghalaya',
                    'Mizoram',
                    'Nagaland',
                    'Odisha',
                    'Punjab',
                    'Rajasthan',
                    'Sikkim',
                    'Tamil Nadu',
                    'Telangana',
                    'Tripura',
                    'Uttar Pradesh',
                    'Uttarakhand',
                    'West Bengal']},

            'Australia': {
                'name': 'Australia',
                'states': [
                'New South Wales',
                'Victoria'
            ]}
        };

        vm.PhotoVisible = false;
        $scope.getFile = function () {
            vm.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope)
                          .then(function (result) {
                              vm.Picture = result;
                              vm.PhotoVisible = true;
                              imageToDataUri(result);
                          });
        };

        function imageToDataUri(img) {

            // create an off-screen canvas
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            // set its dimension to target size
            canvas.width = 200;
            canvas.height = 200;

            // draw source image into the off-screen canvas:
            var image = new Image();
            image.onload = function () {
                ctx.drawImage(image, 0, 0, 200, 200);
                vm.Picture = canvas.toDataURL();
                return canvas.toDataURL();
            };
            image.src = img;
        }

        function showStep1() {

            vm.toggleStep1 = true;
            vm.toggleStep2 = false;
            vm.toggleStep3 = false;
            vm.toggleStep4 = false;
            vm.toggleStep5 = false;
        }

        function showStep2() {

            vm.toggleStep1 = false;
            vm.toggleStep2 = true;
            vm.toggleStep3 = false;
            vm.toggleStep4 = false;
            vm.toggleStep5 = false;
        }

        function showStep3() {

            vm.toggleStep1 = false;
            vm.toggleStep2 = false;
            vm.toggleStep3 = true;
            vm.toggleStep4 = false;
            vm.toggleStep5 = false;
        }

        function showStep4() {

            vm.toggleStep1 = false;
            vm.toggleStep2 = false;
            vm.toggleStep3 = false;
            vm.toggleStep4 = true;
            vm.toggleStep5 = false;
        }

        function showStep5() {

            vm.toggleStep1 = false;
            vm.toggleStep2 = false;
            vm.toggleStep3 = false;
            vm.toggleStep4 = false;
            vm.toggleStep5 = true;
        }

        vm.comfirmPassword = "";

        vm.signUp = function () {
            vm.registration.Country = vm.registration.Country.name;
            authService.saveRegistration(vm.registration, vm.Picture).then(function (response) {

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