'use strict';

angular.module('phatpham.auth', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngResource',
    'ngCookies'
])

.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        var isLoggedin = ['$rootScope', '$state', '$http', '$q', '$timeout',
            function($rootScope, $state, $http, $q, $timeout) {
                var deferred = $q.defer();
                $http.get('/api/isLoggedin')
                .success(function(res) {
                    $timeout(deferred.reject);
                    $state.go('home');
                })
                .error(function(error) {
                    $timeout(deferred.resolve);
                });
                return deferred.promise;
            }
        ];
        var files = ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
                '/admin/controllers/authController.js',
                '/admin/services/authService.js'
            ])
        }];

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/admin/views/auth/login.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);