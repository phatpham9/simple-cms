'use strict';

angular.module('simple-cms')

.directive('sidebar', function() {
    return {
        templateUrl: 'public/admin/views/directives/sidebar.html',
        restrict: 'E',
        replace: true,
        controller: ['$scope', '$state',
            function($scope, $state) {
                $scope.state = $state;
            }
        ]
    }
});
