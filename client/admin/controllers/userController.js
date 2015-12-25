'use strict';

angular.module('simple-cms.user')

.controller('userController', ['$scope', '$state', '$stateParams', '$location', 'userService',
    function($scope, $state, $stateParams, $location, userService) {
        $scope.users = [];
        $scope.filteredResults = [];
        $scope.filter = {
            role: $stateParams.role || null,
            status: $stateParams.status || null
        };
        $scope.search = {
            key: $stateParams.key || null,
            page: $stateParams.page || 0,
            num: $stateParams.num || 50
        };
        $scope.count = {
            fetched: 0,
            total: 0
        };

        // Watch filter changes
        $scope.$watch('filter.role', function() {
            $location.search('role', $scope.filter.role);
        });
        $scope.$watch('filter.status', function() {
            $location.search('status', $scope.filter.status);
        });

        // Main functions
        $scope.init = function() {
            countUsers();
            loadUsers();
        };
        $scope.delete = function(user) {
            if (user && confirm('Delete "' + user.email + '"?')) {
                userService.delete(user,
                    function() {
                        $scope.users.forEach(function(_user, index) {
                            if (_user.id == user.id) {
                                $scope.users.splice(index, 1);
                            }
                        });
                        $scope.filteredResults.forEach(function(_user, index) {
                            if (_user.id == user.id) {
                                $scope.filteredResults.splice(index, 1);
                            }
                        });
                }, function(res) {
                    alert(res.data.message);
                });

            }
        };
        $scope.onChangeSearchKey = function() {
            $location.search('key', $scope.search.key || null);
        };
        $scope.loadMore = function() {
            if ($scope.count.fetched < $scope.count.total) {
                var query = {
                    search: $scope.search.key || null,
                    skip: $scope.search.num * ++$scope.search.page,
                    limit: $scope.search.num
                }

                userService.query(query, function(users) {
                    $scope.count.fetched += users.data.length;
                    $scope.users = $scope.users.concat(users.data);
                    filter();
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        // Another functions
        function countUsers() {
            var query = {
                search: $scope.search.key  || null,
                skip: $scope.search.num * $scope.search.page,
                limit: $scope.search.num
            }

            userService.count(query, function(count) {
                $scope.count.total = count.data.length;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function loadUsers() {
            var query = {
                search: $scope.search.key || null,
                skip: $scope.search.num * $scope.search.page,
                limit: $scope.search.num
            };

            userService.query(query, function(users) {
                $scope.count.fetched = users.data.length;
                $scope.users = users.data;
                filter();
            }, function(res) {
                alert(res.data.message);
            });
        }
        function filter() {
            $scope.filteredResults = [];

            $scope.users.forEach(function(user, index) {
                var chkRole = false;
                var chkStatus = false;

                // filter
                if (!$scope.filter.role || user.roles.indexOf($scope.filter.role) != -1) {
                    chkRole = true;
                }
                if ($scope.filter.status == null || (user.isEnabled == '1' && $scope.filter.status == 'enabled') || (user.isEnabled == '0' && $scope.filter.status == 'disabled')) {
                    chkStatus = true;
                }

                if (chkRole && chkStatus) {
                    $scope.filteredResults.push(user);
                }
            });
        }
    }
])

.controller('userDetailsController', ['$scope', '$state', '$stateParams', '$modal', '$filter', 'utils', 'userService',
    function($scope, $state, $stateParams, $modal, $filter, utils, userService) {
        $scope.state = $state;
        $scope.user = {};

        // Main functions
        $scope.init = function() {
            if ($state.is('userCreate')) {
                $scope.user = {
                    email: null,
                    password: null,
                    isEnabled: '1'
                };
            } else {
                loadUser();
            }
        };
        $scope.delete = function() {
            if ($scope.user && confirm('Delete "' + $scope.user.email + '"?')) {
                 userService.delete($scope.user,
                    function() {
                    $state.go('users');
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        $scope.save = function(form) {
            form.$submitted = true;

            if ($state.is('userCreate')) {
                if (!$scope.user.password || !$scope.user.password.trim()) {
                    form.password.$setValidity('required', false);
                }
            } else if ($state.is('userDetails')) {
                if (!$scope.user.password || !$scope.user.password.trim()) {
                    delete $scope.user.password;
                }
            }

            if (form.$valid) {
                var query = {
                    email: $scope.user.email
                };

                // if ($state.is('userDetails')) {
                //     userService.get({
                //         userId: $stateParams.userId
                //     }, function(user) {
                //         $scope.user.email == user.data.email ? chkUser = true : ''; 
                //     }, function(res) {
                //         alert(res.data.message);
                //     });    
                // }
                
                userService.exist({
                    query: JSON.stringify(query)
                }, function(res) {
                    if (!res.code) {
                        form.email.$setValidity('uniqueemail', true);
                        saveUser();
                    } else {
                        form.email.$setValidity('uniqueemail', false);
                    }
                }, function(err) {
                    alert(err.message);
                    form.email.$setValidity('uniqueemail', false);
                });
            }
        };
        $scope.onChangePassword = function() {
            if ($scope.form.$submitted && $scope.user.password && $scope.user.password.trim()) {
                $scope.form.password.$setValidity('required', true);
            }
        };
        // Another functions
        function loadUser() {
            userService.get({
                userId: $stateParams.userId
            }, function(user) {
                $scope.user = user.data;
                $state.is('userDetails') ? $scope.user.password = '' : ''; 
            }, function(res) {
                alert(res.data.message);
            });
        }
        function saveUser() {
            if ($state.is('userCreate')) {
                var user = new userService($scope.user);
                user.$save(function() {
                    $state.go('userDetails', {userId: user.data.id});
                }, function(res) {
                    alert(res.data.message);
                });
            } else {
                // $scope.user.$update(function() {
                //     $state.go('users');
                // }, function(res) {
                //     alert(res.data.message);
                // });
                userService.update($scope.user,
                    function(setting) {
                         $state.go('users');
                }, function(res) {
                        alert(res.data.message);
                });
            }
        }
    }
]);