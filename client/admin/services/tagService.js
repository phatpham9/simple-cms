'use strict';

angular.module('phatpham.tag')

.factory('tagService', ['$resource',
    function($resource) {
        return $resource('../api/tag/:tagId', {
            tagId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);