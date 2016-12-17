
(function () {
    'use strict';

    angular.module('app').directive("spinner", function () {

        return {
            restrict: 'E',
            template: '<div class="loading-absolute">Loading&#8230;</div>',
            scope:
                {
                    show:'='
                }
        }


    })
}());