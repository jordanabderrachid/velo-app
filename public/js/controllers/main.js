'use strict';

angular.module('velo-app').controller('MainCtrl', ['$scope', 'apiService', 'mapService', function ($scope, apiService, mapService) {
    $scope.sidePanel = {};

    $scope.onStationClick = function (station) {
        $scope.sidePanel.station = station;
        $scope.$apply();
        $scope.openSidePanel();
    };

    $scope.openSidePanel = function () {
        angular.element('#side_panel').css('width', '25%');
    };

    $scope.closeSidePanel = function () {
        angular.element('#side_panel').css('width', '0%');
    };

    $scope.initialize = function () {
        mapService.buildMap($scope.closeSidePanel).on('load', function () {
            apiService.getStations().then(
                function (response) {
                    $scope.stations = response.data;
                    mapService.drawStations($scope.stations, $scope.onStationClick);
                },
                function (error) {
                    // TODO handle this error properly.
                    console.error(error);
                }
            );
        });
    };
    
    $scope.initialize();
}]);
