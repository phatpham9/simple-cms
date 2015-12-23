'use strict';

angular.module('simple-cms.setting', [
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
                $http.get('api/auth/login')
                .success(function(res) {
                    if(res.code == 2 || res.code == 1){
                        $rootScope.isLoggedin = true;
                        $timeout(deferred.resolve);
                    }else{
                        $timeout(deferred.reject);
                        $state.go('login');
                    }
                })
                // .error(function(error) {
                //     $timeout(deferred.reject);
                //     $state.go('login');
                // });
                return deferred.promise;
            }
        ];
        var files = ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
                'public/admin/controllers/settingController.js',
                'public/admin/services/settingService.js',
                'public/admin/services/postService.js'
            ])
        }];

        $stateProvider
            .state('settingGeneral', {
                url: '/setting/general',
                templateUrl: 'public/admin/views/setting/general.html',
                resolve: {
                     isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('settingNavigation', {
                url: '/setting/navigation',
                templateUrl: 'public/admin/views/setting/navigation.html',
                resolve: {
                     isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
])