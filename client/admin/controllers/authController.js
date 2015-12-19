'use strict';

angular.module('phatpham.auth')

.controller('loginController', ['$rootScope', '$scope', '$state', 'authService',
    function($rootScope, $scope, $state, authService) {
        $scope.user = {
            email: null,
            password: null
        };
        $scope.error = null;

        $scope.init = function() {
            $('#page-wrapper').css('margin-left', '0');
        };
        $scope.login = function(form) {
            if (form.$valid) {
                authService.login($scope.user, function(res) {
                    $rootScope.user = res.user.email;
                    $state.go('home');
                }, function(res) {
                    $scope.error = res.data && res.data.message ? res.data.message : 'Email or password incorrect. Try again!';
                });
            }
        };
    }
]);