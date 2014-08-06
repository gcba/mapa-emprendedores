<?php
/**
 * Setup de credenciales para CartoDB y queries a la API
 *
 * @author  	Nicolas Lound <nicolas.lound@gmail.com>, Vladimir Martemianov <vmartemianov@gmail.com>
 * @license 	MIT
 * @link    	https://github.com/gcba/mapa-emprendedores
 * @version 	0.1
 *
 */

	/**
	* @abstract		Clase de creada por CartoDB para establecer comunicación su API.
	* @package 		https://github.com/Vizzuality/cartodbclient-php
	*/
	require_once 'libs/cartodb.class.php';

	/**
	* @abstract		Setup de credenciales de autenticación contra la API de CartoDB.
	*/

	require_once 'libs/cartodb.config.php';

	/**
	* @var 	type: function, traigo credenciales en un array para inicializarlas en el objeto $cartodb.
	*/

	$config = getConfig();

	/**
	* @var 	type: object, instancia de la clase CartoDBClient.
	*/

	$cartodb =  new CartoDBClient($config);
	
	/**
	* @var 	type: object, captura la accion que le pido por php [buscaRegistro | agregaRegistro | listarRegistro | filtro]
	*/

	$action = $_REQUEST["action"];

	if (!$cartodb->authorized) {
		error_log("uauth");
		print 'No se pudo autenticar.';
		exit();
	}

	if($action == "buscaRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$result = $cartodb->runSql("SELECT * FROM mapa_emprendedor",true); //definir que busco y en donde. nombre, descripción o tag
		echo json_encode($result);
	}

	if($action == "agregaRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$arg2 = $_REQUEST["arg2"];
		$result = $cartodb->runSql( "INSERT INTO mapa_emprendedor ( name , description ) VALUES (' " . $arg1 . "','" . $arg2 . "')",true);
	}

	if($action == "listarRegistro") {
		$result = $cartodb->runSql("SELECT cartodb_id , the_geom , nombre , descripcion , calle, direccion_normalizada, inicio de actividades , web FROM mapa_emprendedor",true);
		echo json_encode($result);
	}

	if($action == "filtro"){
		$result = $cartodb->runSql("SELECT * FROM mapa_emprendedor WHERE tipo = 'Aceleradora'",true);
	}

?>