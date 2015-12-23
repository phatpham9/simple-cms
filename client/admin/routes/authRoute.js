'use strict';

angular.module('simple-cms.auth', [
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
                        $timeout(deferred.reject);
                        $state.go('home');
                    }else{
                        $timeout(deferred.resolve);
                    }
                });
                // .error(function(error) {
                //     $timeout(deferred.resolve);
                // });
                return deferred.promise;
            }
        ];
        var files = ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
                'public/admin/controllers/authController.js',
                'public/admin/services/authService.js'
            ])
        }];

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'public/admin/views/auth/login.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);