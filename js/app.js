var urlViz = "http://gcba.cartodb.com/api/v2/viz/6b2c9166-d015-11e3-a1ad-0e73339ffa50/viz.json";
var sql = cartodb.SQL({
	user : 'gcba'
});

/*
 * Inicializacion del mapa
 */

$("button").click(function(d) {
	switch (d.currentTarget.id) {
		case "list-view":
			busquedaListado();
			break;
	}
});

/*
 * Query SQL para el listado total.
 */

function busquedaListado() {

	var contenido = $('#modal-list .modal-body');

	var q = "SELECT * FROM mapa_emprendedores";
	sql.execute(q).done(function(data) {
		for (var i = 0; i < data.total_rows; i++) {
			contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
			contenido.children('.loading').remove();
		}
	}).error(function(errors) {
		console.log("SQL ERR:", errors);
	});
}

function listarTipos() {

	var contenido = $('#modal-list .modal-body');

	var q = "SELECT * FROM mapa_emprendedores";
	sql.execute(q).done(function(data) {
		for (var i = 0; i < data.total_rows; i++) {
			contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
			contenido.children('.loading').remove();
		}
	}).error(function(errors) {
		console.log("SQL ERR:", errors);
	});
}

/*
 * Hace un query a la base de emprendedores con lo que se
 * escriba en el input CASE SENSITIVE
 */
function busquedaKeyword(key) {
	if ( $('#busquedaEmprendedores').val() == ''){
			$('#busquedaList').text("");
			console.log ( $('#busquedaEmprendedores').val() );
	}else{
		key = key.toLowerCase();
		var q = "SELECT * FROM mapa_emprendedores WHERE LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key + "%' OR LOWER(tipo) LIKE '%" + key + "%'";
		sql.execute(q).done(function(data) {
			$('#busquedaList').text("");
			for (var i = 0; i < data.total_rows; i++) {
				$('#busquedaList').append('<a class="list-group-item">' + data.rows[i].nombre + '<span class="badge">' + data.rows[i].tipo + '</span></a>');
			}
			
			
			
		}).error(function(errors) {
			console.log("SQL ERR:", errors);
		});
	}
}

/*
 * Llena el selector de FILTRAR EMPRENDIMIENTOS mediante un query
 * a la base de datos por el campo tipo
 */
function generateTypeList() {
	var queryList = "SELECT distinct tipo FROM mapa_emprendedores";

	var contenido = $('#lista-emprendimientos');
	var tipoForm = $('#tipo_frm');

	sql.execute(queryList).done(function(data) {
	contenido.append("<li><a href='#'> Ver Todos </a></li>");
		for (var i = 0; i < data.total_rows; i++) {

			tipoForm.append("<option>" + data.rows[i].tipo + "</option>");

			contenido.append("<li><a href='#'>" + data.rows[i].tipo + "</a></li>");
		}

	}).error(function(errors) {
		console.log("SQL ERR:", errors);
	});
}

function generateYears() {
	var currentTime = new Date();
	var desde = 1990, hasta = currentTime.getFullYear();

	var contenido = $('#acti_frm');
	for (var i = desde; i <= hasta; i++) {
		contenido.append("<option>" + i + "</option>");
	}
}

generateYears();
generateTypeList();

/*
 * updatea la busqueda por keyword
 */

//si vacio entonces nada
$("#busquedaEmprendedores").keyup(function() {
	busquedaKeyword($('#busquedaEmprendedores').val());
});

