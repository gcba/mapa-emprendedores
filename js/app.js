var urlViz = "http://gcba.cartodb.com/api/v2/viz/e043bc9c-c0eb-11e3-b175-0e73339ffa50/viz.json";

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
