var angular = require('angular');
var _ = require('lodash');

module.exports = moduleName = 'maps.controllers.tools';

angular.module(moduleName, [])
.controller('ToolsCtrl', function ($scope, ActiveProcedures, Procedures) {
    $scope.activeProcedures = [];
    $scope.searchResults = {
        stars: [],
        dps: []
    };
    $scope.filter = {
        name: '',
        airport: ''
    };

    $scope.selectProcedure = function (star) {
        ActiveProcedures.push(star);
        $scope.filter.airport = '';
        $scope.filter.name = '';
        $scope.searchResults = {
            stars: [],
            dps: []
        };

        $scope.activeProcedures = ActiveProcedures.get();
    };

    $scope.removeProcedure = function (star) {
        ActiveProcedures.set(_.reject(ActiveProcedures.get(), {name: star.name}));
        $scope.activeProcedures = ActiveProcedures.get();
    };

    $scope.$watch('filter', function (newVal, oldVal) {
        $scope.searchResults = {
            stars: [],
            dps: []
        };

        if(typeof newVal === 'undefined' || (newVal.name === '' &&  newVal.airport === '')) {
            return;
        }

        Procedures.getStars(newVal)
        .then(function (data) {
            $scope.$apply(function () {
                _.forEach(data, function (item) {
                    $scope.searchResults.stars.push(item);
                });
            });
        });

        Procedures.getDps(newVal)
        .then(function (data) {
            $scope.$apply(function () {
                _.forEach(data, function (item) {
                    $scope.searchResults.dps.push(item);
                });
            });
        });
    }, true);
});
