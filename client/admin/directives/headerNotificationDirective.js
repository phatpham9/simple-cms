'use strict';

angular.module('simple-cms')

.directive('headerNotification', function() {
    return {
        templateUrl: 'public/admin/views/directives/header-notification.html',
        restrict: 'E',
        replace: true,
        controller: ['$rootScope', '$scope', '$http', '$state',
            function($rootScope, $scope, $http, $state) {
                $scope.logout = function() {
                    $http.get('api/auth/logout')
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