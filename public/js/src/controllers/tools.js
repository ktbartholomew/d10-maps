var angular = require('angular');
var _ = require('lodash');

module.exports = moduleName = 'maps.controllers.tools';

angular.module(moduleName, [])
.controller('ToolsCtrl', function ($scope, ActiveProcedures, Procedures) {
    $scope.activeProcedures = ActiveProcedures.get();
    $scope.searchResults = {
        stars: [],
        dps: []
    };
    $scope.searchInProgress = false;
    $scope.filter = {
        name: '',
        airport: ''
    };

    $scope.selectProcedure = function (star) {
        ActiveProcedures.push(star);
        $scope.activeProcedures = ActiveProcedures.get();
    };

    $scope.removeProcedure = function (star) {
        ActiveProcedures.set(_.reject(ActiveProcedures.get(), {name: star.name}));
        $scope.activeProcedures = ActiveProcedures.get();
    };

    $scope.isActive = function (procedure) {
        return (typeof _.find($scope.activeProcedures, {name: procedure.name}) !== 'undefined');
    };

    $scope.toggleProcedure = function (procedure) {
        if($scope.isActive(procedure)) {
            return $scope.removeProcedure(procedure);
        }

        return $scope.selectProcedure(procedure);
    };

    $scope.$watch('filter', function (newVal, oldVal) {
        if($scope.searchInProgress) {
            return;
        }

        $scope.searchResults = {
            stars: [],
            dps: []
        };

        if(typeof newVal === 'undefined' || (newVal.name === '' &&  newVal.airport === '')) {
            return;
        }

        $scope.searchInProgress = true;

        Procedures.getStars(newVal)
        .then(function (data) {
            $scope.searchInProgress = false;
            $scope.$apply(function () {
                _.forEach(data, function (item) {
                    $scope.searchResults.stars.push(item);
                });
            });
        });

        Procedures.getDps(newVal)
        .then(function (data) {
            $scope.searchInProgress = false;
            $scope.$apply(function () {
                _.forEach(data, function (item) {
                    $scope.searchResults.dps.push(item);
                });
            });
        });
    }, true);
});
