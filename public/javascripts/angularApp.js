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

app.controller('MainCtrl', [
        '$scope',
        'festivals',
        function($scope, festivals) {
            $scope.test = 'Hello World';
            $scope.festivals = festivals.festivals;
        }]);
