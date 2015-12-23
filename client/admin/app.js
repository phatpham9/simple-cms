'use strict';

angular.module('simple-cms', [
    // sub-modules
    'simple-cms.auth',
    'simple-cms.post',
    'simple-cms.tag',
    'simple-cms.setting',
    'simple-cms.user',
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
            return $ocLazyLoad.load('public/admin/controllers/homeController.js')
        }];

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'public/admin/views/home/index.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);