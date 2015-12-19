'use strict';

angular.module('phatpham.user')

.factory('userService', ['$resource',
    function($resource) {
        var userService =  $resource('../api/user/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
        userService.count = $resource('../api/user/count').get;
        userService.exist = $resource('../api/user/exist').get;

        return userService;
    }
]);