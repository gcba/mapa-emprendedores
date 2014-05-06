var urlViz = "http://gcba.cartodb.com/api/v2/viz/6b2c9166-d015-11e3-a1ad-0e73339ffa50/viz.json";
var sql = cartodb.SQL({ user: 'gcba' });  	

/*
 * Inicializacion del mapa
 */

$("button").click(function(d){
	console.log("pase por aqui");
	switch (d.currentTarget.id){
		case "listado_btn":
			if ($('#contenidoListado').css('display')  == 'none'){
					$('#contenidoBusqueda').css('display','none');
					$('#formularioAlta').css('display','none');
					$('#contenidoListado').css('display','inline');
					busquedaListado();					
				}else{
					$('#contenidoListado').css('display','none');
					$('#contenidoBusqueda').css('display','none');
					$('#formularioAlta').css('display','none');
			}	
			break;
		case "busqueda_btn":
			if ($('#contenidoBusqueda').css('display')  == 'none'){
					$('#contenidoListado').css('display','none');
					$('#formularioAlta').css('display','none');
					$('#contenidoBusqueda').css('display','inline');
					$('#resultadoBusqueda').html('');
					$('#key').val('');
					$('#key').focus();
				}else{
					$('#contenidoListado').css('display','none');
					$('#contenidoBusqueda').css('display','none');
					$('#formularioAlta').css('display','none');
			}	
			break;
		case "agregar_btn":
			if ($('#formularioAlta').css('display')  == 'none'){
					$('#contenidoBusqueda').css('display','none');
					$('#formularioAlta').css('display','inline');
					$('#contenidoListado').css('display','none');
				}else{
					$('#contenidoListado').css('display','none');
					$('#contenidoBusqueda').css('display','none');
					$('#formularioAlta').css('display','none');
			}	
			break;
		
	}
});

/*
 * Query SQL para el listado total.
 */
function busquedaListado(){
	var q = "SELECT * FROM mapa_emprendedores";
	sql.execute(q)
		.done(function(data) {
			for (var i = 0; i < data.total_rows; i++) {
				$('#contenidoListado').append("<div> <span>" + 
	    	    	data.rows[i].nombre + 
	        	    " (" + 
	            	data.rows[i].tipo +
					")");
			}
	 	})
	 
	 	.error(function(errors) {
	 	   console.log("SQL ERR:",errors);
		});
}

/*
 * Hace un query a la base de emprendedores con lo que se
 * escriba en el input CASE SENSITIVE
 */
function busquedaKeyword(key){
	key = key.toLowerCase();
	var q = "SELECT * FROM mapa_emprendedores WHERE LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key +"%' OR LOWER(tipo) LIKE '%" + key +"%'";
	sql.execute(q)
		.done(function(data) {
			$('#resultadoBusqueda').text("");
			for (var i = 0; i < data.total_rows; i++) {
				$('#resultadoBusqueda').append('<div> <span>' + 
	    	    	data.rows[i].nombre + 
	        	    ' (' + 
	            	data.rows[i].tipo +
					')');
			}
	 	})
	 
	 	.error(function(errors) {
	 	   console.log("SQL ERR:",errors);
		});
}

/*
 * updatea la busqueda por keyword
 */
$("#key").keypress(function(){
	busquedaKeyword($('#key').val());
});


