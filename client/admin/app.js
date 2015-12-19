'use strict';

angular.module('phatpham', [
    // sub-modules
    'phatpham.auth',
    'phatpham.post',
    'phatpham.tag',
    'phatpham.setting',
    'phatpham.user',
    // vendors
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngResource',
    'ngCookies'
])

.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
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
            return $ocLazyLoad.load('/admin/controllers/homeController.js')
        }];

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/admin/views/home/index.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);