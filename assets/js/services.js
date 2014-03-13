angular.module('JSONService', []).factory('JSON', function($http) {
	
	return {
		getJSON : function() {
			return $http.get("http://www.reddit.com/new/.json?disablecache=" + new Date().getTime());
		}
	}
	
});