'use strict';

angular.module('phatpham.setting', [
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
                '/admin/controllers/settingController.js',
                '/admin/services/settingService.js',
                '/admin/services/postService.js'
            ])
        }];

        $stateProvider
            .state('settingGeneral', {
                url: '/setting/general',
                templateUrl: '/admin/views/setting/general.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('settingNavigation', {
                url: '/setting/navigation',
                templateUrl: '/admin/views/setting/navigation.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
])