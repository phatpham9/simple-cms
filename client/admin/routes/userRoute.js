'use strict';

angular.module('phatpham.user', [
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
                    if (res.user && res.user.email) {
                        $rootScope.isLoggedin = true;
                        $timeout(deferred.resolve);
                    } else {
                        $timeout(deferred.reject);
                        $state.go('login');
                    }
                })
                .error(function(error) {
                    $timeout(deferred.reject);
                    $state.go('login');
                });
                return deferred.promise;
            }
        ];
        var files = ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
                '/admin/controllers/userController.js',
                '/admin/services/userService.js',
                '/admin/directives/userDirective.js'
            ])
        }];

        $stateProvider
            .state('users', {
                url: '/users?key&page&num&role&status',
                templateUrl: '/admin/views/user/list.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('userCreate', {
                url: '/user/create',
                templateUrl: '/admin/views/user/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('userDetails', {
                url: '/user/:userId',
                templateUrl: '/admin/views/user/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);