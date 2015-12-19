'use strict';

angular.module('phatpham.setting')

.factory('settingService', ['$resource',
    function($resource) {
        return $resource('../api/setting/:settingId', {
            settingId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);