'use strict';

angular.module('simple-cms.tag')

.controller('tagController', ['$scope', '$state', '$stateParams','$location','utils', 'tagService',
    function($scope, $state, $stateParams,$location,utils, tagService) {
        $scope.tags = [];
        $scope.filteredResults = [];
        $scope.search = {
            key: $stateParams.key || null,
            page: $stateParams.page || 0,
            num: $stateParams.num || 0
        };
         $scope.count = {
            fetched: 0,
            total: 0
        };

        // Main functions
        $scope.init = function() {
            loadTags();
        };
       
        $scope.onChangeSearchKey = function() {
            $location.search('key', $scope.search.key || null);
        };

        $scope.delete = function(tag){
            if (tag && confirm('Delete "' + tag.name + '"?')) {
                tagService.delete(tag,
                    function() {
                        $scope.tags.forEach(function(_tag, index) {
                            if (_tag.id == tag.id) {
                                $scope.tags.splice(index, 1);
                            }
                        });
                        $scope.filteredResults.forEach(function(_tag, index) {
                            if (_tag.id == tag.id) {
                                $scope.filteredResults.splice(index, 1);
                            }
                        });
                }, function(res) {
                    alert(res.data.message);
                });

            }
        }
        // Another functions
        function loadTags() {
            var query = {
                search: $scope.search.key || null,
                skip: $scope.search.num * $scope.search.page,
                limit: $scope.search.num
            }

            tagService.query(query, function(tags) {
                $scope.count.fetched = tags.data.length;
                $scope.tags = tags.data;
            }, function(res) {
                alert(res.data.message);
            });
        };


    }
])
.controller('tagDetailsController', ['$scope', '$state', '$stateParams', '$modal', '$filter', 'utils', 'tagService',
    function($scope, $state, $stateParams, $modal, $filter, utils, tagService) {
        $scope.state = $state;
        $scope.tag = {};

        // Main functions
        $scope.init = function() {
            if ($state.is('tagCreate')) {
                $scope.tag = {
                    name: null,
                    slug: null
                };
            } else {
                loadTag();
            }
        };
        $scope.generateSlug = function() {
            $scope.tag.slug = utils.slugify($scope.tag.name);
        };
        $scope.delete = function() {
            if ($scope.tag && confirm('Delete "' + $scope.tag.name + '"?')) {
                 tagService.delete($scope.tag,
                    function() {
                    $state.go('tags');
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        $scope.save = function(form) {
            form.$submitted = true;

            if (form.$valid) {
                var query = {
                    name: $scope.tag.name,
                    slug : $scope.tag.slug
                };
                
                tagService.exist({
                    query: JSON.stringify(query)
                }, function(res) {
                    if (!res.code) {
                        form.name.$setValidity('uniquename', true);
                        saveTag();
                    } else {
                        form.name.$setValidity('uniquename', false);
                    }
                }, function(err) {
                    alert(err.message);
                    form.name.$setValidity('uniquename', false);
                });
            }
        };
        // Another functions
        function loadTag() {
            tagService.get({
                tagId: $stateParams.tagId
            }, function(tag) {
                $scope.tag = tag.data;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function saveTag() {
            if ($state.is('tagCreate')) {
                var tag = new tagService($scope.tag);
                tag.$save(function() {
                    $state.go('tagDetails', {tagId: tag.data.id});
                }, function(res) {
                    alert(res.data.message);
                });
            } else {
                tagService.update($scope.tag,
                    function(setting) {
                         $state.go('tags');
                }, function(res) {
                        alert(res.data.message);
                });
            }
        }
    }
])
;
