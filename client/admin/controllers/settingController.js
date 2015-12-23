'use strict';

angular.module('simple-cms.setting')

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
                // $scope.setting.$update(function() {
                //     alert('Settings saved!');
                // }, function(res) {
                //     alert(res.data.message);
                // });
    
                var data = $scope.setting;
                data.value = JSON.stringify(data.value);


                settingService.update(data,
                    function(setting) {
                        setting.value = JSON.parse(setting.value); // Must parse string to json from db
                        $scope.setting = setting;
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
                setting.data.value = JSON.parse(setting.data.value); // Must parse string to json from db
                $scope.setting = setting.data;
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

                var data = $scope.setting;
                data.value = JSON.stringify(data.value);

                settingService.update(data,
                    function(setting) {
                        alert('Settings saved!');
                }, function(res) {
                        alert(res.data.message);
                });

            }
        };
        $scope.addItem = function(item) {
            if (item.url && item.url.trim() && item.text && item.text.trim()) {
                $scope.setting.value.push(angular.copy(item));
                initNewItem();
            } else {
                alert('Url and display text can\'t be empty.');
            }
        };
        $scope.removeItem = function(item) {
            if (confirm('Confirm delete ' + item.text + '?')) {
                $scope.setting.value.forEach(function(_item, index) {
                    if (_item.text == item.text && _item.slug == item.slug) {
                        $scope.setting.value.splice(index, 1);
                    }
                });
            }
        };
        // Another functions
        function loadSetting() {
            settingService.get({
                settingId: 'navigation'
            }, function(setting) {
                setting.data.value = JSON.parse(setting.data.value);
                $scope.setting = setting.data;
            }, function(res) {
                alert(res.data.message);
            });
        }
        function loadStaticPages() {
            var query = {
                query: JSON.stringify({
                    isStaticPage: 1
                }),
                limit: 0
            }
            postService.query(query, function(pages) {
                var page = [];
                var page_l = pages.data.length;
                for(var i = 0 ; i< page_l; i++){
                    var check = pages.data[i].isStaticPage;
                    if(check == 1 || check == '1'){
                         page.push(pages.data[i]);
                    }
                }
                $scope.staticPages = page;
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
