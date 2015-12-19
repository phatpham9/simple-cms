'use strict';

angular.module('phatpham')

.directive('header', function() {
    return {
        templateUrl: '/admin/views/directives/header.html',
        restrict: 'E',
        replace: true,
        controller: ['$rootScope', '$scope',
            function($rootScope, $scope) {
                $scope.isLoggedin = $rootScope.isLoggedin;
            }
        ]
    }
});