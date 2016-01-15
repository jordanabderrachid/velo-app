'use strict';

angular.module('velo-app').factory('stationService', ['$templateRequest', '$compile', '$rootScope', function ($templateRequest, $compile, $rootScope) {
    var icons = {
        red_bicycle: '/images/bicycle-24-red.svg',
        orange_bicycle: '/images/bicycle-24-orange.svg',
        green_bicycle: '/images/bicycle-24-green.svg'
    };

    return {
        getPopupHTML: function (station, cb) {
            $templateRequest('/views/popup-station.html').then(function (html) {
                var $scope = $rootScope.$new(true);
                $scope.station = station;

                cb($compile(html)($scope));
            });
        },
        getIcon: function (station) {
            var iconUrl = '';

            if (station.available_bikes === 0 || station.available_bike_stands === 0) {
                iconUrl = icons.red_bicycle;
            } else if (station.available_bikes <= 2 || station.available_bike_stands <= 2) {
                iconUrl = icons.orange_bicycle;
            } else {
                iconUrl = icons.green_bicycle;
            }

            return L.icon({
                iconUrl: iconUrl,
                iconSize: [32, 32]
            });
        }
    };
}]);
