(function () {

    L.mapbox.accessToken = 'pk.eyJ1Ijoiam9yZGFuYWJkZXJyYWNoaWQiLCJhIjoiY2loZG56MDlqMDAzOXY0a3FxYW55OXplZSJ9.lEgruWmyCm-E-300PG7XuA';
    var map = L.mapbox.map('map', 'mapbox.streets');

    var apiRequest = new XMLHttpRequest();

    apiRequest.open('GET', '/api/stations');

    apiRequest.addEventListener('load', function () {
        var stations = JSON.parse(this.response);

        var stationMarkers = [];

        stations.forEach(function (station) {
            stationMarker = L.marker(L.latLng(station.position.lat, station.position.lng));

            stationMarkers.push(stationMarker);
        });

        var group = L.featureGroup(stationMarkers);
        group.addTo(map);
        
        map.fitBounds(group.getBounds());
    });

    apiRequest.send();
})();
