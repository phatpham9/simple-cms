'use strict';

angular.module('phatpham.post', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngResource',
    'ngCookies',
    'ngSanitize',
    'textAngular'
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
                '/admin/controllers/postController.js',
                '/admin/services/postService.js',
                '/admin/services/tagService.js',
                '/admin/directives/postDirective.js'
            ])
        }];

        $stateProvider
            .state('posts', {
                url: '/posts?key&page&num&tag&type',
                templateUrl: '/admin/views/post/list.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('postCreate', {
                url: '/post/create',
                templateUrl: '/admin/views/post/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('postDetails', {
                url: '/post/:postId',
                templateUrl: '/admin/views/post/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);