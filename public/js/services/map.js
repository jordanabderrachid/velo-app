'use strict';

angular.module('velo-app').factory('mapService', ['stationService', function (stationService) {
    var map;
    
    return {
        buildMap: function () {
            map = L.mapbox.map('map', 'mapbox.streets');
            return map;
        },
        drawStations: function (stations) {
            var stationMarkers = [];

            stations.forEach(function (station) {
                var stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng));
                var popup = L.popup().setContent(stationService.getPopupHTML(station));
                stationMarker.bindPopup(popup);

                stationMarkers.push(stationMarker);
            });

            var group = L.featureGroup(stationMarkers);
            group.addTo(map);
            
            map.fitBounds(group.getBounds());
        }
    };
}]);
