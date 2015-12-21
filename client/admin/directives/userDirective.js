'use strict';

angular.module('simple-cms.user')

.directive('uniqueemail', ['userService',
    function(userService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attributes, ngModel) {
                element.bind('blur', function(e) {
                    if (!ngModel || !element.val()) return;

                    var query = {
                        email: element.val()
                    };
                    if (attributes.uniqueemail) {
                        query._id = {
                            $ne: attributes.uniqueemail
                        }
                    }
                    userService.exist({
                        query: JSON.stringify(query)
                    }, function(res) {
                        ngModel.$setValidity('uniqueemail', !res.exist);
                    }, function(err) {
                        alert(err.message);
                        ngModel.$setValidity('uniqueemail', false);
                    });
                });
            }
        };
    }
]);
