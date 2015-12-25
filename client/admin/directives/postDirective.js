'use strict';

angular.module('simple-cms.post')

.directive('uniquepost', ['postService',
    function(postService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attributes, ngModel) {
                element.bind('blur', function(e) {
                    if (!ngModel || !element.val()) return;

                    var query = {
                        slug: element.val()
                    };
                    // if (attributes.uniquepost) {
                    //     query._id = {
                    //         $ne: attributes.uniquepost
                    //     }
                    // }
                    postService.exist({
                        query: JSON.stringify(query)
                    }, function(res) {
                        ngModel.$setValidity('uniquepost', !res.exist);
                    }, function(err) {
                        alert(err.message);
                        ngModel.$setValidity('uniquepost', false);
                    });
                });
            }
        };
    }
]);
