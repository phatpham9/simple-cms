'use strict';

angular.module('phatpham')

.directive('sidebar', function() {
    return {
        templateUrl: '/admin/views/directives/sidebar.html',
        restrict: 'E',
        replace: true,
        controller: ['$scope', '$state',
            function($scope, $state) {
                $scope.state = $state;
            }
        ]
    }
});
