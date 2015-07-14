var angular = require('angular');
var Q = require('q');

module.exports = moduleName = 'maps.services.procedures';

angular.module(moduleName, [])
.factory('Procedures', function ($http, $httpParamSerializer) {
    return {
        getStars: function (params) {
            var defer = Q.defer();
            $http.get('/stars', {params: params})
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function () {

            });

            return defer.promise;
        },
        getDps: function (params) {
            var defer = Q.defer();
            $http.get('/dps', {params: params})
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function () {

            });

            return defer.promise;
        }
    };
});
