var CartoDB = require('cartodb');
var secret = require('./secrets.js');

var client = new CartoDB({
	user:secret.user,
	api_key:secret.api_key
});

var change = function(rows){
	var len = rows.length;
	var prendidos = [];
	for(var i=0;i<len;i++){
		if (rows[i].status == 1){
			prendidos.push(rows[i])
		}
	}
	return prendidos;
}

module.exports = function(io) {

	io.sockets.on('connection', function(socket){
		socket.emit('connected');
		setInterval(function(){
			client.on('connect', function(){
				client.query("SELECT * FROM puntos_nagio WHERE current_timestamp-interval'1 minute' < updated_at", function(err, data){
					console.log("emit update...");
	//				socket.emit('update', data.rows);
					socket.emit("update", change(data.rows));
					console.log("updated emited");
				});
			});
			client.connect()
			//client.pipe(file)
		}, 5000);
	});

}