'use strict';

angular.module('velo-app').factory('mapService', ['stationService', '$q', function (stationService, $q) {
    var map;
    
    return {
        buildMap: function () {
            map = L.mapbox.map('map', 'mapbox.streets');
            return map;
        },
        drawStations: function (stations) {
            var stationMarkers = [];

            var promises = [];
            stations.forEach(function (station) {
                var stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng), {icon: stationService.getIcon(station)});
                var deferred = $q.defer();
                promises.push(deferred.promise);
                stationService.getPopupHTML(station, function (element) {
                    // Little hack to convert this to a Node.
                    var popup = L.popup().setContent(element[0]);

                    stationMarker.bindPopup(popup);
                    stationMarkers.push(stationMarker);
                    deferred.resolve();
                });
            });

            // Once all popups are build.
            $q.all(promises).then(function () {
                var group = L.featureGroup(stationMarkers);
                group.addTo(map);

                map.fitBounds(group.getBounds());
            });
        }
    };
}]);
