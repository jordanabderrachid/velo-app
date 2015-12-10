'use strict';

angular.module('velo-app').controller('MainCtrl', function ($scope) {
    $scope.initialize = function () {
        var map = L.mapbox.map('map', 'mapbox.streets');

        var apiRequest = new XMLHttpRequest();

        apiRequest.open('GET', '/api/cities/lyon/stations');

        apiRequest.addEventListener('load', function () {
            var stations = JSON.parse(this.response);

            var stationMarkers = [];

            stations.forEach(function (station) {
                var stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng));

                stationMarkers.push(stationMarker);
            });

            var group = L.featureGroup(stationMarkers);
            group.addTo(map);
            
            map.fitBounds(group.getBounds());
        });

        apiRequest.send();
    };

    $scope.initialize();
});
