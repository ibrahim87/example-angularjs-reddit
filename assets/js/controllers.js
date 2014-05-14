//$scope is the glue between the controller and the view
//$interval is angular's wrapper for window.setInterval
//JSON is a factory for fetching Reddit stories
//$rootScope is used only for getting information for the initial animation
function AppCtrl($scope, $interval, JSON, $rootScope) {
	
	$scope.on = true; //on/off toggle button
	$scope.data = []; //array of reddit stories
	$scope.filter = ''; //term from the search box
	
	var initialFetch = true; //becomes false after the initial load of reddit stories
	
	$scope.getData = function() {
		if (!$scope.on) return; //cancel the fetch if the user has set the toggle switch to off
		JSON.getJSON().then(function(response) {
			if (initialFetch) {
				$scope.data = response.data.data.children; //if initial add all the reddit stories
				$rootScope.initialAnimationItems = $scope.data.length; //used in the 'enter' animation so all stories initially fade in at once
				initialFetch = false;
			} else {
                //loop through the reddit stories, only add to data if it's new
				for (var i = 0; i < response.data.data.children.length; i++) {
					//get identifier for new story
					var id = response.data.data.children[i].data.id;
					var found = false;
					//loop through current data
					for (var j = 0; j < $scope.data.length; j++) {
						//if not found continue looking in the existing new data
						if (id === $scope.data[j].data.id) {
							found = true;
						} 
					}
					if (!found) $scope.data.unshift(response.data.data.children[i]); //add reddit story to beginning of data array
				}
			}
			while($scope.data.length > 500) { //only keep the 500 newest stories
				$scope.data.pop();
			}
		});
	}
	
	$scope.getData(); //call getData initially
	
	$interval($scope.getData, 2000); //gall getData every 2 seconds
	
}