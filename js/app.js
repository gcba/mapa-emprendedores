var urlViz = "http://gcba.cartodb.com/api/v2/viz/e043bc9c-c0eb-11e3-b175-0e73339ffa50/viz.json";



/*
 * Inicializacion del mapa
 */
function main() {
	cartodb.createVis('map', urlViz, {
    	tiles_loader: true,
        center_lat: -34.610060,
        center_lon: -58.439307,
        zoom: 11
    })
    .done(function(vis, layers) {
    	layers[1].setInteraction(true);
		layers[1].on('featureOver', function(e, pos, latlng, data) {
		cartodb.log.log(e, pos, latlng, data);
		});

    	map = vis.getNativeMap();
    })
  
    .error(function(err) {
      console.log(err);
	});
}

window.onload = main;

var sql = cartodb.SQL({ user: 'gcba' });  	

/*
 * Query SQL para el listado total.
 */

sql.execute("SELECT * FROM mapa_de_emprendedores_2014")

 .done(function(data) {
	for (var i = 0; i < data.total_rows; i++) {

		$('#contenido').append("<div>Nombre: <span>" + 
        	data.rows[i].nombre + 
            "</span> - <span>Tipo: " + 
            data.rows[i].tipo +
            "<span></div></br>");
	}
 })
 
  .error(function(errors) {
    console.log(errors);
  });
  	