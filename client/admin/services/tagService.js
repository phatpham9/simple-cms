'use strict';

angular.module('simple-cms.tag')

.factory('tagService', ['$resource',
    function($resource) {
        var tagService = $resource('api/category/:tagId', {
            tagId: '@id'
        }, {
            update: {
                method: 'POST'
            },
            query:{
                method: 'GET',
                isArray: false
            }
        });
        tagService.delete = $resource('api/category/:tagId/delete',{
             tagId: '@id'
        },{
            delete :{
                method: 'POST'
            }
        }).delete;
        tagService.count = $resource('api/category').get;
        tagService.exist = $resource('api/category/exist').get;
        return tagService;
    }
]);