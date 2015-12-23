'use strict';

angular.module('simple-cms.tag')

.factory('tagService', ['$resource',
    function($resource) {
        return $resource('api/category/:tagId', {
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
    }
]);