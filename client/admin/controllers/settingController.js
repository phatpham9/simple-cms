'use strict';

angular.module('phatpham.setting')

.controller('generalSettingController', ['$scope', 'settingService',
    function($scope, settingService) {
        $scope.setting = {};

        // Main functions
        $scope.init = function() {
            loadSetting();
        };
        $scope.save = function(form) {
            form.$submitted = true;

            if (form.$valid) {
                $scope.setting.$update(function() {
                    alert('Settings saved!');
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        // Another functions
        function loadSetting() {
            settingService.get({
                settingId: 'general'
            }, function(setting) {
                $scope.setting = setting;
            }, function(res) {
                alert(res.data.message);
            });
        }
    }
])

.controller('navigationSettingController', ['$scope', 'settingService', 'postService',
    function($scope, settingService, postService) {
        $scope.setting = {};
        $scope.staticPages = [];
        $scope.newItem = {
            type: 'page',
            url: null,
            text: null
        };

        $scope.$watch('newItem.type', function() {
            $scope.newItem.url = null;
        });

        // Main functions
        $scope.init = function() {
            loadSetting();
            loadStaticPages();
        };
        $scope.save = function(form) {
            form.$submitted = true;

            if (form.$valid) {
                $scope.setting.$update(function() {
                    alert('Settings saved!');
                }, function(res) {
                    alert(res.data.message);
                });
            }
        };
        $scope.addItem = function(item) {
            if (item.url && item.url.trim() && item.text && item.text.trim()) {
                $scope.setting.data.push(angular.copy(item));
                initNewItem();
            } else {
                alert('Url and display text can\'t be empty.');
            }
        };
        $scope.removeItem = function(item) {
            if (confirm('Confirm delete ' + item.text + '?')) {
                $scope.setting.data.forEach(function(_item, index) {
                    if (_item.text == item.text && _item.slug == item.slug) {
                        $scope.setting.data.splice(index, 1);
                    }
                });
            }
        };
        // Another functions
        function loadSetting() {
            settingService.get({
                settingId: 'navigation'
            }, function(setting) {
                $scope.setting = setting;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function loadStaticPages() {
            var query = {
                query: JSON.stringify({
                    isStaticPage: true
                }),
                limit: 0
            }
            postService.query(query, function(pages) {
                $scope.staticPages = pages;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function initNewItem() {
            $scope.newItem.url = null;
            $scope.newItem.text = null;
        }
    }
]);
