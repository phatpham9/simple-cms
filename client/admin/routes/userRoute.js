'use strict';

angular.module('simple-cms.user', [
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
                'public/admin/controllers/userController.js',
                'public/admin/services/userService.js',
                'public/admin/services/utils.js',
                'public/admin/directives/userDirective.js'
            ])
        }];

        $stateProvider
            .state('users', {
                url: '/users?key&page&num&role&status',
                templateUrl: 'public/admin/views/user/list.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('userCreate', {
                url: '/user/create',
                templateUrl: 'public/admin/views/user/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('userDetails', {
                url: '/user/:userId',
                templateUrl: 'public/admin/views/user/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);