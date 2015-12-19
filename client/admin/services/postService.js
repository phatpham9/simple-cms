'use strict';

angular.module('phatpham.post')

.factory('postService', ['$resource',
    function($resource) {
        var postService =  $resource('../api/post/:postId', {
            postId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
        postService.count = $resource('../api/post/count').get;
        postService.exist = $resource('../api/post/exist').get;

        return postService;
    }
]);