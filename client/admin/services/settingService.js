'use strict';

angular.module('simple-cms.setting')

.factory('settingService', ['$resource',
    function($resource) {
        var settingService = $resource('api/setting/:settingId', {
            settingId: '@id'
        }, {
            update: {
                method: 'POST'
            }
        });
        return settingService;

    }
]);