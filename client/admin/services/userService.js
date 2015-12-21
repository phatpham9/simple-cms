'use strict';

angular.module('simple-cms.user')

.factory('userService', ['$resource',
    function($resource) {
        var userService =  $resource('api/user/:userId', {
            userId: '@id'
        }, {
            update: {
                method: 'POST'
            },
            delete : {
                method: 'POST'  
            }
            
        });
        userService.count = $resource('api/user/count').get;
        userService.exist = $resource('api/user/exist').get;

        return userService;
    }
]);