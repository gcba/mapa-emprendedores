function main() {
var map = L.map('map', { 
zoomControl: false,
center: [-34.59682955724048, -58.45533370971679],
zoom: 13
});

// add a nice baselayer from Stamen 
L.tileLayer('https://a.tiles.mapbox.com/v3/gcbadata.map-0ub2e509/{z}/{x}/{y}.png', {
attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
}).addTo(map);

cartodb.createLayer(map, 'http://gcba.cartodb.com/api/v2/viz/196d1632-d0ad-11e3-bbd2-0e230854a1cb/viz.json')
.addTo(map)
.on('done', function(layer) {
 // get sublayer 0 and set the infowindow template
 var sublayer = layer.getSubLayer(0);

 sublayer.infowindow.set('template', $('#infowindow_template').html());
}).on('error', function() {
  console.log("some error occurred");
});
}

window.onload = main;