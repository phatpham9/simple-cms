'use strict';

angular.module('simple-cms.auth')

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
            form.$submitted = true;
            var data = JSON.stringify($scope.user);
            if (form.$valid) {
                authService.login(data,
                 function(res) {
                    //$rootScope.user = res.user.email;
                    //$state.go('home');
                    if(res.code == 1){
                        $rootScope.user = $scope.email;
                        $state.go('home');
                    }else{
                        $scope.error = 'Email or password incorrect. Try again!';
                    }
                });
            }
        };
    }
]);