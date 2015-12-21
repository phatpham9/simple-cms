'use strict';

angular.module('simple-cms.tag')

.controller('tagController', ['$scope', '$state', '$stateParams', 'tagService',
    function($scope, $state, $stateParams, tagService) {
        $scope.tags = [];
        $scope.search = {
            key: $stateParams.key || null,
            page: $stateParams.page || 0,
            num: $stateParams.num || 0
        };

        // Main functions
        $scope.init = function() {
            loadTags();
        };
        // Another functions
        function loadTags() {
            var query = {
                search: $scope.search.key ? JSON.stringify({
                    key: $scope.search.key,
                    attributes: ['name']
                }) : null,
                skip: $scope.search.num * $scope.search.page,
                limit: $scope.search.num
            }

            tagService.query(query, function(tags) {
                $scope.tags = tags;
            }, function(res) {
                alert(res.data.message);
            });
        }
    }
]);
