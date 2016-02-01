'use strict';

angular.module('velo-app').factory('mapService', ['stationService', function (stationService) {
    var map;
    
    return {
        buildMap: function (onClick) {
            map = L.mapbox.map('map', 'mapbox.streets');
            map.on('click', onClick);
            return map;
        },
        drawStations: function (stations, onClick) {
            var stationMarkers = [];

            stations.forEach(function (station) {
                var stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng), {icon: stationService.getIcon(station)});
                stationMarker.on('click', function () { onClick(station) });

                stationMarkers.push(stationMarker);
            });

            var group = L.featureGroup(stationMarkers);
            group.addTo(map);
            map.fitBounds(group.getBounds());
        }
    };
}]);
