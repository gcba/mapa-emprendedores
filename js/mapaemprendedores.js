jQuery(document).ready(function($) {

  var myLayer;
  var miMap;

  var ac = new usig.AutoCompleter('input-dir');
  
  miMap = L.map('map', { 
    zoomControl: true,
    center: [-34.618234674892, -58.404178619384766],
    zoom: 12
  });

  // add a nice baselayer from mapbox
  L.tileLayer('http://a.tiles.mapbox.com/v3/pixelbeat.map-pet5vndu/{z}/{x}/{y}.png', {
    attribution: 'MapBox'
  }).addTo(miMap);


var mapaEmprendedores = "http://gcba.cartodb.com/api/v1/viz/mapa_emprendedores/viz.json";

  cartodb.createLayer(miMap, mapaEmprendedores, {
    query: 'select * from {{table_name}}'

  }).on('done', function(layer) {

    miMap.addLayer(layer);
    myLayer = layer;
    layer.on('error', function(err) {
      cartodb.log.log('error: ' + err);
    });

  }).on('error', function() {
    cartodb.log.log("some error occurred");
  });
        
});
