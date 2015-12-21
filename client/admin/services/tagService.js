'use strict';

angular.module('simple-cms.tag')

.factory('tagService', ['$resource',
    function($resource) {
        return $resource('api/tag/:tagId', {
            tagId: '@_id'
        }, {
            update: {
                method: 'POST'
            },
            delete : {
            	method: 'POST'	
            }
        });
    }
]);