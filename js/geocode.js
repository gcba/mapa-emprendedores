var geocoder;
var map;

function init() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(-34.609879, -58.391900);
	var mapOptions = {
		zoom : 15,
		mapTypeControl : false,
		streetViewControl : false,
		center : latlng
	};
	map = new google.maps.Map(document.getElementById('minimapa'), mapOptions);
}

function buscarDireccion() {
	var direccion = document.getElementById('direccion_frm').value;
	geocoder.geocode({
		'address' : direccion + ",ciudad autonoma de buenos aires"
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map : map,
				position : results[0].geometry.location				
			});
			console.log();
			$("#latLong_frm").val(marker.position.A  + "," + marker.position.k);
		} else {
			alert('Geocode fallo por: ' + status);
		}
	});
}

google.maps.event.addDomListener(window, 'load', init);