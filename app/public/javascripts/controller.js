app.controller('infoCtrl', function($scope, socket) {

	socket.on('connected', function(data) {
		console.log(data)
	});
  
});