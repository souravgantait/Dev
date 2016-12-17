
(function () {
    
    var controllerId = 'unAvailable';
    angular.module('app').controller(controllerId, ['$scope', unAvailable]);
    function unAvailable($scope) {
        var vm = this;
        vm.places = [
    {"name" :"Dhakuria", "id": 1, "value":"1"},
    { "name": "Garia", "id": 2, "value": "2" },
    { "name": "Behala", "id": 3, "value": "3" },
    { "name": "Ballygunge", "id": 4, "value": "4" }
        ];

        
    
        vm.locationUnavailableList = [];
        vm.markLocatioUnavailable = function () {
        
            var tempLoc = {
                
                unavDate1Location: vm.fromdateLocation,
                unavDate2Location: vm.todateLocation,
                unavTime1Location: vm.fromTimelocation,
                unavTime2Location: vm.toTimelocation
            };
            if (vm.fromdateLocation < new Date() || vm.fromdateLocation >= vm.todateLocation) {
                tempLoc.unavDate1Location = new Date();
                tempLoc.unavDate2Location = new Date();
                
                alert("ToDate should not be previous date of FromDate !")
            } else {
                vm.locationUnavailableList.push(tempLoc);
            }
        };

        vm.fromdateLocation = new Date();
        vm.todateLocation = new Date();

        vm.setTimeOfLocation = function (time) {
            vm.fromTimelocation = new Date(2016, 0, 1, 00, 00, 00, 00);
            vm.toTimelocation = new Date(2016, 0, 1, 23, 59, 59, 00);
        };


        vm.setTimeOfDate = function (time) {
            vm.fromTimeDate = new Date(2016, 0, 1, 00, 00, 00, 00);
            vm.toTimeDate = new Date(2016, 0, 1, 23, 59, 59, 00);
        };

        vm.dateunavailableList = [];
        vm.markUnavailableForDate = function () {
            var tempDate = {
                unavDateDate: vm.dateObject,
                unavTime1Date: vm.fromTimeDate,
                unavTime2Date: vm.toTimeDate
            };
            vm.dateunavailableList.push(tempDate);
        };
        vm.dateObject = new Date();
        
        
        vm.removeDate = function (dates) {
            var index = vm.dateunavailableList.indexOf(dates);
            vm.dateunavailableList.splice(index, 1);
        };

        vm.removeValueFromLocationList = function (locs) {
            var index = vm.locationUnavailableList.lastIndexOf(locs);
            vm.locationUnavailableList.splice(index, 1);
        };
        
    
        vm.removeTimeForMonthly = function (monthlytime) {
            var index = vm.MonthlytimeList.indexOf(monthlytime);
            vm.MonthlytimeList.splice(index, 1);
        };
    }
    
})();

