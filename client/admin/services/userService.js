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
            query:{
                method: 'GET',
                isArray: false
            }
            
        });
        userService.delete = $resource('api/user/:userId/delete',{
             userId: '@id'
        },{
            delete :{
                method: 'POST'
            }
        }).delete;
        userService.count = $resource('api/user').get;
        userService.exist = $resource('api/user/exist').get;

        return userService;
    }
]);