app.controller('infoCtrl', function($scope, $http, socket) {
	
 	var lacalledelolo = "42978";
 
	$scope.traeCalle = function(id_calle){
	    $http.get('/api/'+id_calle)
	        .success(function(data, status, headers, config) {
	            console.log(data)
	        }).error(function(data) {
	            // console.log(data)
	        });
	}
 	
	$scope.rangoFechas = function(){
		console.log($scope.dt)
		console.log($scope.hr)
	    $http.get('/api/'+start+"/"+end)
	        .success(function(data, status, headers, config) {
	            console.log(data)
	        }).error(function(data) {
	            // console.log(data)
	        });
	}

	$scope.show = function(){
		console.log($scope.dt);
	}

});