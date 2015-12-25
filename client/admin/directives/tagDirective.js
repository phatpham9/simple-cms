'use strict';

angular.module('simple-cms.tag')

.directive('uniquename', ['tagService',
    function(tagService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attributes, ngModel) {
                element.bind('blur', function(e) {
                    if (!ngModel || !element.val()) return;

                    var query = {
                        name: element.val()
                    };

                    tagService.exist({
                        query: JSON.stringify(query)
                    }, function(res) {
                        ngModel.$setValidity('uniquename', !res.code);
                    }, function(err) {
                        alert(err.message);
                        ngModel.$setValidity('uniquename', false);
                    });
                });
            }
        };
    }
]);
