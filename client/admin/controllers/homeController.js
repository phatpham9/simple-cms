'use strict';

angular.module('simple-cms')

.controller('homeController', ['$scope','$state','authService',
    function($scope,$state,authService) {
    	$scope.logout = function(){
    		authService.logout(
    			function(res){
    				alert(res.message);
    				 $state.go('login');
    			},function(res){
    				alert('Logout fail .Please try again !');
    			});
    	};
    }
]);
