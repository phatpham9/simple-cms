'use strict';

angular.module('simple-cms.post')

.factory('postService', ['$resource',
    function($resource) {
        var postService =  $resource('api/post/:postId', {
            postId: '@id'
        }, {
            update :{
                method: 'POST'
            }
        });
        postService.count = $resource('api/post/count').get;
        postService.exist = $resource('api/post/exist').get;

        return postService;
    }
]);