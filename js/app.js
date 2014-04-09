var urlViz = "http://gcba.cartodb.com/api/v2/viz/c8554f80-c021-11e3-8981-0edbca4b5057/viz.json";


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
