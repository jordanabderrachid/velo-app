'use strict';

angular.module('velo-app').factory('stationService', function () {
    return {
        getPopupHTML: function (station) {
            var html = [];
            html.push('<p>');
            html.push('Vélos disponibles: ' + station.available_bikes + '<br />');
            html.push('Bornes disponibles: ' + station.available_bike_stands + '<br />');
            html.push('</p>');
            return html.join('');
        }
    };
});
