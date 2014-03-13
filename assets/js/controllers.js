function AppCtrl($scope, $interval, JSON, $rootScope) {
	
	$scope.on = true;
	$scope.data = [];
	$scope.filter = '';
	
	var initialFetch = true;
	
	$scope.getData = function() {
		//console.log($scope.search);
		if (!$scope.on) return;
		JSON.getJSON().then(function(response) {
			if (initialFetch) {
				$scope.data = response.data.data.children;
				$rootScope.initialAnimationItems = $scope.data.length;
				initialFetch = false;
			} else {
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
					if (!found) $scope.data.unshift(response.data.data.children[i]);
				}
			}
			while($scope.data.length > 500) {
				$scope.data.pop();
			}
		});
	}
	
	$scope.getData();
	
	$interval($scope.getData, 2000);	
	
}