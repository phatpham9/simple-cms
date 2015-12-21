'use strict';

angular.module('simple-cms')

.directive('header', function() {
    return {
        templateUrl: 'public/admin/views/directives/header.html',
        restrict: 'E',
        replace: true,
        controller: ['$rootScope', '$scope',
            function($rootScope, $scope) {
                $scope.isLoggedin = $rootScope.isLoggedin;
            }
        ]
    }
});