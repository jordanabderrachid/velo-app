'use strict';

angular.module('velo-app').controller('MainCtrl', ['$scope', 'apiService', function ($scope, apiService) {
    $scope.initialize = function () {
        var map = L.mapbox.map('map', 'mapbox.streets');

        apiService.getStations().then(
            function (response) {
                var stations = response.data;

                var stationMarkers = [];

                stations.forEach(function (station) {
                    var stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng));

                    stationMarkers.push(stationMarker);
                });

                var group = L.featureGroup(stationMarkers);
                group.addTo(map);
                
                map.fitBounds(group.getBounds());
            },
            function (error) {
                // TODO handle this error properly.
                console.error(error);
            }
        );
    };
    
    $scope.initialize();
}]);
