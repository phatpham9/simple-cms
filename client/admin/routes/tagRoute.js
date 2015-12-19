'use strict';

angular.module('phatpham.tag', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngResource',
    'ngCookies',
    'ngTagsInput'
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
                '/admin/controllers/tagController.js',
                '/admin/services/tagService.js'
            ])
        }];

        $stateProvider
            .state('tags', {
                url: '/tags',
                templateUrl: '/admin/views/tag/list.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
])