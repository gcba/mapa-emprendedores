// funcion que se autoejecuta cuando carga el dom el script init-app.js

!(function(){

	var socket = io.connect('http://localhost:3001');

	socket.on('connected', function(){
		console.log("conectado");
	});

	socket.on('update', function(data){
		console.log(data);
	});

	socket.on('disconnect', function () {
		// console.log('Desconectado!');
	});


}());