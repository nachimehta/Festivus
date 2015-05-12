var app = angular.module('festivus', []);

app.controller('MainCtrl', [
        '$scope',
        function($scope) {
            $scope.test = 'Hello World';
            $scope.artists = ['artist 1',
                              'artist 2',
                              'artist 3',
                              'artist 4'];
        }]);
