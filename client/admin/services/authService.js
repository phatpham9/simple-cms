'use strict';

angular.module('simple-cms.auth')

.factory('authService', ['$resource',
    function($resource) {
        var authService = {
            login: $resource('api/auth/login', {}, {
                login: {
                    method: 'POST'
                }
            }).login,
            isLoggedin: $resource('api/isLoggedin').get,
            me: $resource('api/me').get,
            logout: $resource('api/auth/logout').get
        };

        return authService;
    }
]);