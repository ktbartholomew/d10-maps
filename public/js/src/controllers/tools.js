var angular = require('angular');
var _ = require('lodash');

module.exports = moduleName = 'maps.controllers.tools';

angular.module(moduleName, [])
.controller('ToolsCtrl', function ($scope, ActiveProcedures, Procedures) {
    $scope.ActiveProcedures = ActiveProcedures;

    $scope.searchResults = [];

    $scope.filter = {
        name: '',
        airport: ''
    };

    $scope.selectProcedure = function (star) {
        $scope.ActiveProcedures.push(star);
        $scope.filter.name = '';
        $scope.searchResults = [];
    };

    $scope.removeProcedure = function (star) {
        $scope.ActiveProcedures = _.reject($scope.ActiveProcedures, {name: star.name});
    };

    $scope.$watch('filter', function (newVal, oldVal) {
        $scope.searchResults = [];

        if(typeof newVal === 'undefined' || (newVal.name === '' &&  newVal.airport === '')) {
            return;
        }

        Procedures.getStars(newVal)
        .then(function (data) {
            $scope.$apply(function () {
                _.forEach(data, function (item) {
                    $scope.searchResults.push(item);
                });
            });
        });

        Procedures.getDps(newVal)
        .then(function (data) {
            $scope.$apply(function () {
                _.forEach(data, function (item) {
                    $scope.searchResults.push(item);
                });
            });
        });
    }, true);
});
