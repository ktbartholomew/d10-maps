var angular = require('angular');

var moduleName = 'maps.services.map';
module.exports = moduleName;

angular.module(moduleName, [])
.factory('Map', function () {
    var storage = {
        read: function () {
            if(!localStorage.getItem(moduleName)) {
                localStorage.setItem(moduleName, JSON.stringify({
                    center: {
                        lat: 32.876904,
                        lon: -97.01486
                    },
                    zoom: 7
                }));
            }

            return JSON.parse(localStorage.getItem(moduleName));
        },
        write: function (data) {
            localStorage.setItem(moduleName, JSON.stringify(data));
        }
    };

    var mapState = storage.read();

    var map = new google.maps.Map(document.getElementById('canvas'), {
        backgroundColor: '#333',
        center: new google.maps.LatLng(mapState.center.lat, mapState.center.lon),
        mapTypeControl: false,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
        zoom: mapState.zoom,
    });

    google.maps.event.addListener(map, 'center_changed', function () {
        var center = map.getCenter();

        mapState.center.lat = center.A;
        mapState.center.lon = center.F;

        storage.write(mapState);
    });

    google.maps.event.addListener(map, 'zoom_changed', function () {
        mapState.zoom = map.getZoom();
        storage.write(mapState);
    });

    return map;
});
