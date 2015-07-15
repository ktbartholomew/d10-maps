var angular = require('angular');
var _ = require('lodash');
var symbols = require('../dicts/symbols');

module.exports = moduleName = 'maps.services.procedure-renderer';

angular.module(moduleName, [])
.factory('ProcedureRenderer', function (Map) {
    var colorize = function (symbol, color) {
        symbol.strokeColor = color;
        return symbol;
    };

    var drawnItems = [];

    var clearLines = function () {
        _.forEach(drawnItems, function (item){
            item.setMap(null);
        });
    };

    return {
        draw: function (procedures) {
            clearLines();
            procedures.forEach(function (procedure, index, scope) {
                var procedureColor = (procedure.type === 'STAR') ? 'rgb(200,0,200)' : 'rgb(0,200,200)';

                procedure.legs.forEach(function (leg, index, scope) {
                    var path = [];

                    leg.points.forEach(function (point, index, scope) {
                        if(['AA','NA','ND','NW','P','R'].indexOf(point.type) !== -1) {
                            var waypoint = new google.maps.Marker({
                                position: new google.maps.LatLng(point.lat, point.lon),
                                icon: colorize(symbols[point.type], procedureColor),
                                map: Map,
                                title: point.name || point.identifier
                            });
                            drawnItems.push(waypoint);
                        }

                        if(['NA','AA'].indexOf(point.type) !== -1) {
                            return;
                        }

                        path.push(new google.maps.LatLng(point.lat, point.lon));
                    });

                    var line = new google.maps.Polyline({
                      path: path,
                      geodesic: true,
                      strokeColor: procedureColor,
                      strokeOpacity: 1,
                      strokeWeight: 2
                    });

                    line.setMap(Map);
                    drawnItems.push(line);
                });
            });
        }
    };
});
