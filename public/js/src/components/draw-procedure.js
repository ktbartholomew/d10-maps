var symbols = require('../dicts/symbols');

var xhr = new XMLHttpRequest();
xhr.open('GET', '/stars?name=yeagr', true);
xhr.onload = function () {
    var procedures = JSON.parse(this.responseText);

    procedures.forEach(function (procedure, index, scope) {
        procedure.legs.forEach(function (leg, index, scope) {
            var path = [];

            leg.points.forEach(function (point, index, scope) {
                if(point.type === 'AA') {
                    return;
                }

                path.push(new google.maps.LatLng(point.lat, point.lon));

                if(['ND','NW','P','R'].indexOf(point.type) === -1) {
                    return;
                }

                new google.maps.Marker({
                    position: new google.maps.LatLng(point.lat, point.lon),
                    icon: symbols[point.type],
                    map: map,
                    title: point.name || point.identifier
                });
            });

            var line = new google.maps.Polyline({
              path: path,
              geodesic: true,
              strokeColor: 'rgb(200,0,200)',
              strokeOpacity: 1,
              strokeWeight: 2
            });

            line.setMap(map);
        });
    });
};

xhr.send();
