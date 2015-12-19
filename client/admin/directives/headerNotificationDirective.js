'use strict';

angular.module('phatpham')

.directive('headerNotification', function() {
    return {
        templateUrl: '/admin/views/directives/header-notification.html',
        restrict: 'E',
        replace: true,
        controller: ['$rootScope', '$scope', '$http', '$state',
            function($rootScope, $scope, $http, $state) {
                $scope.logout = function() {
                    $http.get('/api/logout')
                    .success(function(res) {
                        $rootScope.isLoggedin = false;
                        $state.go('login');
                    })
                    .error(function(error) {
                        alert(error.message);
                    });
                }
            }
        ]
    }
});