'use strict';

angular.module('phatpham.post')

.controller('postController', ['$scope', '$state', '$stateParams', '$location', 'postService', 'tagService',
    function($scope, $state, $stateParams, $location, postService, tagService) {
        $scope.posts = [];
        $scope.tags = [];
        $scope.filteredResults = [];
        $scope.filter = {
            tag: $stateParams.tag || null,
            type: $stateParams.type || null
        };
        $scope.search = {
            key: $stateParams.key || null,
            page: $stateParams.page || 0,
            num: $stateParams.num || 10
        };
        $scope.count = {
            fetched: 0,
            total: 0
        };

        // Watch change filters
        $scope.$watch('filter.tag', function() {
            $location.search('tag', $scope.filter.tag);
        });
        $scope.$watch('filter.type', function() {
            $location.search('type', $scope.filter.type);
        });

        // Main functions
        $scope.init = function() {
            countPosts();
            loadPosts();
            loadTags();
        };
        $scope.delete = function(post) {
            if (post && confirm('Delete "' + post.title + '"?')) {
                post.$remove(function() {
                    $scope.posts.forEach(function(_post, index) {
                        if (_post._id == post._id) {
                            $scope.posts.splice(index, 1);
                        }
                    });
                    $scope.filteredResults.forEach(function(_post, index) {
                        if (_post._id == post._id) {
                            $scope.filteredResults.splice(index, 1);
                        }
                    });
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        $scope.onChangeSearchKey = function() {
            $location.search('key', $scope.search.key || null);
        };
        $scope.cancelSearchKey = function() {
            $scope.search.key = null;
            if ($stateParams.key) {
                $location.search('key', $scope.search.key);
            }
        };
        $scope.loadMore = function() {
            if ($scope.count.fetched < $scope.count.total) {
                var query = {
                    search: $scope.search.key ? JSON.stringify({
                        key: $scope.search.key,
                        attributes: ['title', 'slug', 'content']
                    }) : null,
                    skip: $scope.search.num * ++$scope.search.page,
                    limit: $scope.search.num
                }

                postService.query(query, function(posts) {
                    $scope.count.fetched += posts.length;
                    $scope.posts = $scope.posts.concat(posts);
                    filter();
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        // Another functions
        function countPosts() {
            var query = {
                search: $scope.search.key ? JSON.stringify({
                    key: $scope.search.key,
                    attributes: ['title', 'slug', 'content']
                }) : null,
                skip: $scope.search.num * $scope.search.page,
                limit: $scope.search.num
            }

            postService.count(query, function(count) {
                $scope.count.total = count.total;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function loadPosts() {
            var query = {
                search: $scope.search.key ? JSON.stringify({
                    key: $scope.search.key,
                    attributes: ['title', 'slug', 'content']
                }) : null,
                skip: $scope.search.num * $scope.search.page,
                limit: $scope.search.num
            }

            postService.query(query, function(posts) {
                $scope.count.fetched = posts.length;
                $scope.posts = posts;
                filter();
            }, function(res) {
                alert(res.data.message);
            });
        }
        function loadTags() {
            tagService.query({
                limit: 0
            }, function(tags) {
                $scope.tags = tags;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function filter() {
            $scope.filteredResults = [];

            $scope.posts.forEach(function(post, index) {
                var chkTag = false;
                var chkType = false;

                // filter
                if (!$scope.filter.tag || $scope.filter.tag == post.tag._id) {
                    chkTag = true;
                }
                if (!$scope.filter.type || ($scope.filter.type == 'page' && post.isStaticPage) || ($scope.filter.type == 'post' && !post.isStaticPage)) {
                    chkType = true;
                }

                if (chkTag && chkType) {
                    $scope.filteredResults.push(post);
                }
            });
        }
    }
])

.controller('postDetailsController', ['$scope', '$state', '$stateParams', '$modal', '$filter', 'utils', 'postService', 'tagService',
    function($scope, $state, $stateParams, $modal, $filter, utils, postService, tagService) {
        $scope.state = $state;
        $scope.post = {};
        $scope.tags = [];

        $scope.$watch('post.content', function(value) {
            $scope.post.numWords = $filter('numWords')($filter('htmlToText')(value));
            $scope.post.readingSpeed = $filter('readingSpeed')($scope.post.numWords);

            if ($scope.form.$submitted) {
                $scope.form.content.$setValidity('required', value ? true : false);
            }
        });

        // Main functions
        $scope.init = function() {
            if ($state.is('postCreate')) {
                $scope.post = {
                    title: null,
                    slug: null,
                    briefIntroduction: null,
                    background: {
                        url: null,
                        position: 'center center',
                        source: null
                    },
                    content: null,
                    numWords: 0,
                    readingSpeed: $filter('readingSpeed')(0),
                    isStaticPage: false,
                    tags: [],
                    date: $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                    isPublished: true
                };
            } else {
                loadPost();
            }
            loadTags();
        };
        $scope.generateSlug = function() {
            $scope.post.slug = utils.slugify($scope.post.title);
        };
        $scope.reloadTags = function() {
            loadTags();
        };
        $scope.onChangeSlug = function() {
            $scope.form.content.$setValidity('required', false);
        };
        $scope.delete = function() {
            if ($scope.post && confirm('Delete "' + $scope.post.title + '"?')) {
                $scope.post.$remove(function() {
                    $state.go('posts');
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        $scope.save = function(form) {
            form.$submitted = true;
            form.content.$setValidity('required', $scope.post.content ? true : false);

            if (form.$valid) {
                var query = {
                    slug: $scope.post.slug
                };
                if ($state.is('postDetails')) {
                    query._id = {
                        $ne: $scope.post._id
                    }
                }
                postService.exist({
                    query: JSON.stringify(query)
                }, function(res) {
                    if (!res.exist) {
                        form.slug.$setValidity('uniquepost', true);
                        savePost();
                    } else {
                        form.slug.$setValidity('uniquepost', false);
                    }
                }, function(err) {
                    alert(err.message);
                    form.slug.$setValidity('uniquepost', false);
                });
            }
        };
        $scope.preview = function() {
            var modalPreview = $modal.open({
                animation: true,
                templateUrl: '/admin/views/directives/post-preview.html',
                controller: 'postPreviewController',
                size: 'lg',
                resolve: {
                    post: function() {
                        return $scope.post;
                    }
                }
            });
        };
        // Another functions
        function loadPost() {
            postService.get({
                postId: $stateParams.postId
            }, function(post) {
                $scope.post = post;
                $scope.post.date = $filter('date')($scope.post.date, 'yyyy-MM-dd hh:mm:ss');
            }, function(res) {
                alert(res.data.message);
            });
        }
        function loadTags() {
            tagService.query({
                limit: 0
            }, function(tags) {
                $scope.tags = tags;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function savePost() {
            if ($state.is('postCreate')) {
                var post = new postService($scope.post);
                post.$save(function() {
                    $state.go('postDetails', {postId: post._id});
                }, function(res) {
                    alert(res.data.message);
                });
            } else {
                $scope.post.$update(function() {
                    $state.go('posts');
                }, function(res) {
                    alert(res.data.message);
                });
            }
        }
    }
])

.controller('postPreviewController', ['$scope', '$modalInstance', 'post',
    function($scope, $modalInstance, post) {
        $scope.post = post;

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);