'use stict';

angular.module('velo-app').factory('mapService', function () {
    var MapService = function () {};

    MapService.prototype.buildMap = function () {
        this.map = L.mapbox.map('map', 'mapbox.streets');

        return this.map;
    };

    MapService.prototype.drawStations = function (stations) {
        var stationMarkers = [];

        stations.forEach(function (station) {
            var stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng));

            stationMarkers.push(stationMarker);
        });

        var group = L.featureGroup(stationMarkers);
        group.addTo(this.map);
        
        this.map.fitBounds(group.getBounds());
    };

    return new MapService();
});
