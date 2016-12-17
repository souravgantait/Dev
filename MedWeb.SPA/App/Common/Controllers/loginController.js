'use strict';
angular.module('app').controller('loginController', ['$scope', '$rootScope', '$q', '$location', 'authService',
    function ($scope, $rootScope, $q, $location, authService) {

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.message = "";

    $scope.login = function () {

    var deferred = $q.defer();
        authService.login($scope.loginData).then(function (response) {

            $location.path('/dashboard');

            $rootScope.$broadcast("navigationReload");
           
        },
         function (err) {
             // $scope.message = err.error_description;
             $scope.message = "Invalid Login.";
         });


        return deferred.promise;
    };

}]);
