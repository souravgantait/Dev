(function () {
    var controllerId = 'available';
    angular.module('app').controller(controllerId, ['$scope', available]);
    function available($scope) {
        var vm = this;
        vm.locations = [
            { name: 'Dum Dum', code: 'dd' },
            { name: 'Garia',code:'ga' },
            { name: 'Jadavpur', code: 'jd' }];


        vm.everyweek = "every";
        vm.everymonth = "everym";
        vm.weeksunchecked = function () {
            vm.yes = false;
        };
        vm.monthsunchecked = function () {
            vm.yes = false;
        };
    
    
        vm.cloneweekly = function () {
            var weeklycon = angular.element('#weekly');
            var weeklydiv = angular.element('#container');
            weeklycon.append(weeklydiv.clone());
        };

        vm.dateObject = new Date();
    
        vm.dateList = [];
        vm.addDate = function () {
            var tempDate = {
                date: vm.dateObject
            };
            vm.dateList.push(tempDate);
        };
        vm.removeDate = function (date) {
            var index = vm.dateList.indexOf(date);
            vm.dateList.splice(index, 1);
        };
        vm.fromtimeList = [];
        vm.addTime = function () {
            var tempTimeforEveryday={
                fromTimeEveryday: vm.fromTime,
                toTimeEveryday: vm.toTime
            };
            vm.fromtimeList.push(tempTimeforEveryday);
        };
        vm.timeForWeekly = [];
        vm.addTimeforWeekly = function () {
            var tempTime = {
                fromTimeWeekly: vm.weeklyFromTime,
                toTimeWeekly: vm.weeklyToTime
            };
            vm.timeForWeekly.push(tempTime);
        };
        
        vm.timeforMonthly = [];
        vm.addTimeForMonthly = function () {
            var tempTimeforMonthly = {
                fromTimeMonthly: vm.monthlyFromTime,
                toTimeMonthly: vm.monthlyToTime
            };
            vm.timeforMonthly.push(tempTimeforMonthly);
        };
        vm.removeEverydayTime = function (fromtime) {
            var index = vm.fromtimeList.indexOf(fromtime);
            vm.fromtimeList.splice(index, 1);
        };
        vm.removeWeeklyTime = function (weeklytime) {
            var index = vm.timeForWeekly.indexOf(weeklytime);
            vm.timeForWeekly.splice(index, 1);
        };
        vm.removeMonthlyTime = function (monthlytime) {
            var index = vm.timeforMonthly.indexOf(monthlytime);
            vm.timeforMonthly.splice(index, 1);
        };
    }
})();
