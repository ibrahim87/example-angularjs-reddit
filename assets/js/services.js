//declare JSON as an injectable argument (it's injected into the AppCtrl controller)
//[] is the list of modules JSONService depends on
//factory returns the getJSON function that we can call in the controller
angular.module('JSONService', []).factory('JSON', function($http) {
	
	return {
		getJSON : function() {
			return $http.get("http://www.reddit.com/new/.json?disablecache=" + new Date().getTime());
		}
	}
	
});