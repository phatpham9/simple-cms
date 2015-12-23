'use strict';

angular.module('simple-cms.post', [
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
                'public/admin/controllers/postController.js',
                'public/admin/services/postService.js',
                'public/admin/services/tagService.js',
                'public/admin/directives/postDirective.js',
                'public/admin/services/utils.js',

            ])
        }];

        $stateProvider
            .state('posts', {
                url: '/posts?key&page&num&tag&type',
                templateUrl: 'public/admin/views/post/list.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('postCreate', {
                url: '/post/create',
                templateUrl: 'public/admin/views/post/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            })
            .state('postDetails', {
                url: '/post/:postId',
                templateUrl: 'public/admin/views/post/details.html',
                resolve: {
                    isLoggedin: isLoggedin,
                    files: files
                }
            });
    }
]);