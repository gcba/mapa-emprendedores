app.controller('infoCtrl', function($scope, $http, socket) {
 	
 	var lacalledelolo = "42978";

    $http.get('/api/'+lacalledelolo)
        .success(function(data, status, headers, config) {
            console.log(data)
        }).error(function(data) {
            // console.log(data)
        });

	$scope.today = function() {
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};

	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	console.log($scope.dt)

});