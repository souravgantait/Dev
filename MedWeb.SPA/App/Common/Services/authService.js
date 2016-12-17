'use strict';
angular.module('app').factory('authService', ['$rootScope', '$http', '$q', 'localStorageService', 'serviceEndpoints', function ($rootScope, $http, $q, localStorageService, serviceEndpoints) {

    var serviceBase = serviceEndpoints.authenticationServiceUrl;
    var authServiceFactory = {};

    var authenticatedUser = {
        isAuthenticated: false,
        userName: "",
        useRefreshTokens: false,
        userPhoto :""
    };

    authServiceFactory.saveRegistration = saveRegistration;
    authServiceFactory.login = login;
    authServiceFactory.logOut = logOut;
    authServiceFactory.getUser = getUser;
    authServiceFactory.exists = exists;
    authServiceFactory.getToken = getToken;
    authServiceFactory.setToken = setToken;
    authServiceFactory.removeToken = removeToken;
    authServiceFactory.refreshToken = refreshToken;
    authServiceFactory.refresh = refresh;
    authServiceFactory.becomeDoctor = becomeDoctor;
    authServiceFactory.hasPermission = hasPermission;

    return authServiceFactory;

    function getUser() {
        return authenticatedUser;
    }

    function exists() {
        return (sessionStorage.getItem('token') !== null && authenticatedUser !== null);
    }

    function getToken() {
        return sessionStorage.getItem('token');
    }

    function setToken(type, value) {
        sessionStorage.setItem(type, value);
    }

    function removeToken() {
        sessionStorage.removeItem('refresh_token');
        return sessionStorage.removeItem('token');
    }

    function hasPermission(routeAccessRole) {
        return (this.exists() && (routeAccessRole === '*' || routeAccessRole.indexOf(authenticatedUser.role) > -1));
    }

    function CreateRegistrationInput(registrationParam)
    {
        var registrationInputObject = {
            Account:
            {
                LoginId: registrationParam.LoginId,
                Password: registrationParam.Password,
                Role: registrationParam.Role
            },
            Citizen:
            {
                Passport:
                {
                    UId: registrationParam.UId,
                    Location: registrationParam.Location,
                    IssueDate: registrationParam.IssueDate,
                    ExpiryDate: registrationParam.ExpiryDate
                },
                FirstName: registrationParam.FirstName,
                MiddleName: registrationParam.MiddleName,
                LastName: registrationParam.LastName,
                AdharId: registrationParam.AdharId,
                PanId: registrationParam.PanId,
                VoterId: registrationParam.VoterId,
                DOB: registrationParam.DOB,
                Photo: registrationParam.Photo
            },
            DigitalProfile: {
                Mobile1: registrationParam.Mobile1,
                Mobile2: registrationParam.Mobile2,
                Landline: registrationParam.Landline,
                PrimaryEmail: registrationParam.PrimaryEmail,
                SecondaryEmail: registrationParam.SecondaryEmail,
                Linkedin: registrationParam.Linkedin,
                Facebook: registrationParam.Facebook,
                Twitter: registrationParam.Twitter,
            },
            Location: {
                Country: registrationParam.Country,
                State: registrationParam.State,
                Zip: registrationParam.Zip,
                Area: registrationParam.Area,
                AddressLine1: registrationParam.AddressLine1,
                AddressLine2: registrationParam.AddressLine2,
                AddressLine3: registrationParam.AddressLine3,
                Landmark: registrationParam.Landmark
            }
        };
        return registrationInputObject;
    };

  function saveRegistration(registration, picture) {
        logOut();
        var inData = JSON.stringify({ CitizenLocationDigitalMaster: CreateRegistrationInput(registration), Photo: picture });
        return $http.post(serviceEndpoints.userServiceUrl + 'api/CitizenLocationDigitalMasters/SignUp',
            inData,
            {
                headers:
                  { 'Content-Type': 'application/json' }
            }).then(function (response) {
        }).then(function (response) {
            return response;
        });
    };

    function login(loginData) {

        var data = "grant_type=password&client_secret=secret&username=" + loginData.userName + "&password=" + loginData.password;

        data = data + "&client_id=" + serviceEndpoints.clientId;

        var deferred = $q.defer();

        $http.post(serviceEndpoints.authenticationServiceUrl + 'oauth2/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
          ////  authentication.isAuthenticated = true;
           // authentication.userName = loginData.userName;
         //   authentication.useRefreshTokens = loginData.useRefreshTokens;
          
            if (response !== null && response !== undefined) {

                setToken("token", response.access_token);
                if (!refresh()) {
                   // $log.info('Deleted invalid token.');
                    deferred.reject('Token deleted. Go back to login page');
                } else {
                    setToken('refresh_token', data.refresh_token);
                    //  $log.info('login Sucessfull!!! ');
                    $rootScope.$broadcast("loginSuccess");
                    refresh();
                    deferred.resolve(data);
                }

            } else {
                deferred.reject('Given credentials are incorrect');
            }
        }).error(function (error) {
           // $log.error("Login Failed", error);
            deferred.reject(error);
        });
        return deferred.promise;

    };

    function becomeDoctor(doctorData) {

       // var inData = JSON.stringify({ CitizenLocationDigitalMaster: CreateRegistrationInput(registration), Photo: picture });
        return $http.post(serviceEndpoints.userServiceUrl + 'api/Doctors/InsertDoctor',
            doctorData,
            {
                headers:
                  { 'Content-Type': 'application/json' }
            }).then(function (response) {
                return response;
            });
    }

    function refresh() {
        var decodedToken = processJWT(getToken());
        /*Start-this section checks whether the token is valid or not*/
        /*
        if (!checkTokenValidity(epochtoDate(decodedToken.Claims.nbf), epochtoDate(decodedToken.Claims.exp))) {
            decodedToken = null;
        }
        */
        /*End-this section checks whether the token is valid or not*/
      /*  if (decodedToken !== null) {
            email = decodedToken.Claims.upn;
            tenantId = decodedToken.Claims.TenantId;
            type = decodedToken.Claims.role;
            expiryOn = epochtoDate(decodedToken.Claims.exp);
            notBefore = epochtoDate(decodedToken.Claims.nbf);
            var currentdate = new Date();
            lifetimeInMillSec = epochtoDate(decodedToken.Claims.exp).getTime() - currentdate.getTime();
            //Decreasing some time from the lifetime of the token as we need to get the token  before it expires.
            if (lifetimeInMillSec > 2 * 60 * 1000) {
                lifetimeInMillSec = lifetimeInMillSec - 2 * 60 * 1000;

            }
            else {
                lifetimeInMillSec = 0;
            }

        } else {
            //Token invalid hence removing it from local storage.
            removeToken();
            $log.error('token invalid back to login');
            return false;
        }*/
        if (decodedToken !== null) {
            authenticatedUser = {
                'isAuthenticated': true,
                'userName': decodedToken.Claims.sub,
                'role': decodedToken.Claims.role,
                'citizenLocationDigitalMasterid': decodedToken.Claims.citizenLocationDigitalMasterid,
                'data': getToken(),
                'refreshFlag': true,
                'expiry': decodedToken.Claims.exp,
                'notBefore': decodedToken.Claims.nbf//,
                //'lifetimeInMillSec': lifetimeInMillSec
            };
        }
        return true;
    }

    //This function decodes the token
    function processJWT(token) {
        if (token==null) {
            return null;
        }
        var jwtInput = token.split('.');
        if (!jwtInput || jwtInput.length !== 3) {
            return null;
        }
        var jwtHeader = { data: jwtInput[0], id: 'header' };
        var jwtClaims = { data: jwtInput[1], id: 'claims' };
        var jwtDecode = [jwtHeader, jwtClaims];
        var decodedToken = {};
        for (var i = 0; i < jwtDecode.length; i++) {
            (function () {
                if (jwtDecode[i].id === 'claims') {
                    decodedToken.Claims = JSON.parse(window.atob(jwtDecode[i].data));
                } else if (jwtDecode[i].id === 'header') {
                    decodedToken.headers = JSON.parse(window.atob(jwtDecode[i].data));
                }
            })();
        }
        return decodedToken;
    }


    //function getProfileImage() {
    //    var param1 = "'"+authentication.userName+"'";
    //    return $http.post("http://localhost:50414/" + 'api/CitizenLocationDigitalMasters/UserProfilePhoto', param1, { headers: { 'Content-Type': 'application/json' } }).then(function (responseReturn) {
    //        authentication.userPhoto = responseReturn;
    //        $rootScope.$broadcast("loginSuccess");
    //    });
    //};

    function logOut() {
        authenticatedUser.isAuthenticated = false;
        authenticatedUser.userName = "";
        authenticatedUser.useRefreshTokens = false;
        logOutClient();
      //  logoutServer(getToken()).then(logOutClient, logOutClient);

    }

    //logs out client
    function logOutClient() {
        removeToken();
        window.location.reload();
    }

    //Api Needs to be called to logout from API.
    function logoutServer(token) {
        var deferred = $q.defer();
        $http({
            url: serviceEndpoints.serviceBaseAddress + '/api/Login/Logout',
            method: 'POST',
            data: '"' + token + '"',
            headers: { 'Authorization': 'Bearer ' + token }
        }).success(function (data) {

            $log.info('Logout Api Called and sucessfull');
            deferred.resolve(data);
        }).error(function (error) {
            $log.error('Logout API Failed', error);
            deferred.reject(error);
        });
        return deferred.promise;
    }

    var refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&client_secret=secret&refresh_token=" + authData.refreshToken + "&client_id=" + serviceEndpoints.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'oauth2/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

}]);