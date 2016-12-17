(function (define) {
    "use strict";

    define(["jquery"], function () {

        messageBar.$inject = ['$log'];
        function messageBar($log) {

            $log = $log.getInstance("messageBar");

            var messageBarDirectiveDefinition = {
                restrict: "E",
                replace: true,
                templateUrl: "App/Modules/Common/Views/messageBar.html",
                scope: {
                    message: "=",
                    secondaryMessage: "=",
                    method: "&",
                    buttonText: "="
                },
                link: linkMessageBar
            }

            function linkMessageBar(scope, element, attrs) {
                scope.displayMessage = "";
                scope.displaySecondaryMessage = "";
                scope.isError = false;
                scope.isSuccess = false;
                scope.hasMethod = false;
                scope.hasSecondaryMessage = false;
                scope.showMoreInfo = false;
                scope.bText = "";

                var regEx = /^(\+|-)/i;
                var successRegEx = /^\+/i;

                if (attrs.method) {
                    scope.hasMethod = true;
                    scope.bText = scope.buttonText;
                }

                scope.$watch("message", function (newValue) {
                    if (newValue) {
                        scope.showMoreInfo = false;
                        scope.hasSecondaryMessage = false;
                        scope.displaySecondaryMessage = "";
                        newValue = newValue.trim();

                        if (regEx.test(newValue)) {
                            scope.isSuccess = successRegEx.test(newValue);
                            scope.isError = !scope.isSuccess;
                            scope.displayMessage = newValue.slice(1);
                        }
                        else {
                            scope.isSuccess = false;
                            scope.isError = false;
                            scope.displayMessage = newValue;
                        }

                        angular.element(element).show();
                        // This approximate calculation will try to bring the message bar into the center of the viewport.
                        // If the message bar happens to be at the top, the document will scroll to the top.
                        var messageBarScrollIntoView = angular.element(element).offset().top - angular.element(window).height() / 2;
                        angular.element("body, html").scrollTop(messageBarScrollIntoView);
                        scope.message = "";
                    }
                });
                scope.$watch("secondaryMessage", function (newValue) {
                    if (newValue) {
                        scope.showMoreInfo = true;
                        scope.hasSecondaryMessage = false;
                        newValue = newValue.trim();

                        if (regEx.test(newValue)) {
                            scope.isSuccess = successRegEx.test(newValue);
                            scope.isError = !scope.isSuccess;
                            scope.displaySecondaryMessage = newValue.slice(1);
                        }
                        else {
                            scope.isSuccess = false;
                            scope.isError = false;
                            scope.displaySecondaryMessage = newValue;
                        }

                        angular.element(element).show();
                        // This approximate calculation will try to bring the message bar into the center of the viewport.
                        // If the message bar happens to be at the top, the document will scroll to the top.
                        var messageBarScrollIntoView = angular.element(element).offset().top - angular.element(window).height() / 2;
                        angular.element("body, html").scrollTop(messageBarScrollIntoView);
                        scope.secondaryMessage = "";
                    }
                });

                scope.$onWithAutoUnbind("closeMessageBar", function () {
                    scope.closeMessageBar();
                });

                scope.closeMessageBar = function () {
                    angular.element(element).fadeOut();
                    scope.displayMessage = "";
                    scope.displaySecondaryMessage = "";
                };

                scope.$onWithAutoUnbind("moreInfo", function () {
                    scope.moreInfo();
                });

                scope.moreInfo = function () {
                    scope.hasSecondaryMessage = true;
                    scope.showMoreInfo = false;
                };

                scope.callMethod = function () {
                    scope.method();
                };
            }
            return messageBarDirectiveDefinition;
        }

        return ["$log", messageBar];
    });


})(define);