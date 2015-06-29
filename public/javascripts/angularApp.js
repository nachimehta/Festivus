var app = angular.module('festivus', ['ui.router']);

app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl',
                    resolve: {
                        festivalPromise: ['festivals', function(festivals){
                            return festivals.getAvailable();
                        }],

                        artistPromise: ['artists', function(artists){
                            return artists.getAvailable();
                        }]
                    }
                });

            $urlRouterProvider.otherwise('home');
        }]);

app.factory('festivals', ['$http', function($http){
    var o = {
        festivals: []
    };

    o.getAvailable = function() {
        return $http.get('/festivals').success(function(data){
            angular.copy(data, o.festivals);
        });
    };

    return o
}]);

app.factory('artists', ['$http', function($http){
    var o = {
        artists: []
    };

    o.getAvailable = function() {
        return $http.get('/artists').success(function(data){
            angular.copy(data, o.artists);
        });
    };

    return o;
}]);

app.controller('MainCtrl', [
        '$scope',
        'festivals',
        'artists',
        function($scope, festivals, artists) {
            $scope.test = 'Hello World';
            $scope.festivals = festivals.festivals;
            $scope.artists = artists.artists;
        }]);
