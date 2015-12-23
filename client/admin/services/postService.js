'use strict';

angular.module('simple-cms.post')

.factory('postService', ['$resource',
    function($resource) {
        var postService =  $resource('api/post/:postId', {
            postId: '@id'
        }, {
            update :{
                method: 'POST'
            },
            query:{
                method: 'GET',
                isArray: false
            }
        });
        postService.delete = $resource('api/post/:postId/delete',{
             postId: '@id'
        },{
            delete :{
                method: 'POST'
            }
        }).delete;
        postService.count = $resource('api/post').get;
        postService.exist = $resource('api/post/exist').get;

        return postService;
    }
]);