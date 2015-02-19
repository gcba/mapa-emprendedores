'use strict'

/**
 * funciones y variables de inicializacion del mapa
 *
 * @author      Nicolas Lound <nicolas.lound@gmail.com>
 * @license     MIT
 * @link        https://github.com/gcba/mapa-emprendedores
 * @version     0.1
 *
 */



// variables de geocodificacion
var geocoder;
var minimapa;
var capas;
var capaInfowindows;
// var de sql para las busquedas
var sql = cartodb.SQL({
    user: 'baemprende'
});


/**
* @abstract     mueve el mapa a la lat long pasada
*/
function mapToPosition(lat,lon){
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    map.setView(new L.LatLng(lat,lon), 7);
}

/**
* @abstract     Instancia el mapa
*/      
var visualizacion = cartodb.createVis(mapa, 'http://baemprende.cartodb.com/api/v2/viz/af30750a-458e-11e4-bf5b-0e10bcd91c2b/viz.json')
    .done(function(vis,layers) {
        capas = vis.map;
        capaInfowindows = layers[1];
    });

// Bindeo listeners a botones activos top menu sidebar
$("#menuSidebar .btn-default").click(function(e) {
    var nombre = $("#menuSidebar .activo").val();
    if (e.target.value != nombre) {
        // manejo menu
        $("#menuSidebar .activo").removeClass("activo");
        $(e.target).addClass("activo");
        abroSlide($("#menuSidebar .activo").val());
    }
    return false; //para que no recarge chrome (known issue)
});


/**
* @abstract     Bindeo listeners a botones de filtros
*/

$("#filtrar .btn-default").click(function(e) {
    seleccionoMarkers (e.target.value);
    return false; //para que no recarge chrome (known issue)
});

/**
* @abstract     Listener de busqueda por keyword
*/

$("#busquedaEmprendedores").keyup(function () {
    busquedaKeyword($('#busquedaEmprendedores').val());
});

/**
* @abstract     inicializa el minimapa
*/
function init() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.609879, -58.391900);
    var mapOptions = {
        zoom : 15,
        mapTypeControl : false,
        streetViewControl : false,
        center : latlng
    };
    minimapa = new google.maps.Map(document.getElementById('minimapa'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', init);

//init tooltipster
$(document).ready(function() {

    $('.tt').tooltipster({
        theme: 'tooltipster-light'
    });


});