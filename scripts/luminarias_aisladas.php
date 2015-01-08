<?php
include 'config.php';

// Abrir conexion a MySQL y seleccionar base de datos
$link = mysql_connect($host, $username, $password);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
$db_selected = mysql_select_db('emergencias', $link);
if (!$db_selected) {
    die ('Can\'t use database : ' . mysql_error());
}	

// Seleccionar luminarias apagadas
$query = "SELECT * FROM luminarias WHERE status = '0'";
$result = mysql_query($query) or die(mysql_error());

// Radio de la tierra en km
$R = 6371;
// Radio a tomar en cuenta para luminarias aisladas (también en km)
$rad = 0.3;

// Loopear estas luminarias y ver si están aisladas 
// (si no hay otras luminarias apagadas cerca)
while ($row = mysql_fetch_array($result)) {
	// Sacar lat y long de la luminaria en cuestion
	$lat = $row[2];
	$long = $row[3];
	$external_id = $row[4];

	// Funcion para calcular la distancia de un punto con respecto a la lat y long
	$radio_query = "SELECT external_id, status, (
				    	6371 * acos (
				      	cos ( radians({$lat}) )
				      	* cos( radians( `lat` ) )
				      	* cos( radians( `long` ) - radians({$long}) )
				      	+ sin ( radians({$lat}) )
				      	* sin( radians( `lat` ) )
				    	)
				  	) AS distance
					FROM luminarias
					WHERE status = '0'
					HAVING distance < {$rad}";

	$radio_result = mysql_query($radio_query) or die(mysql_error());
	
	// Es 1 porque uno de los resultados va a ser la misma luminaria que estamos analizando
	// (que tiene distancia 0 a si misma)
	if (mysql_num_rows($radio_result) <= 1) {
		// Si no hay luminarias apagadas en el radio, cambiar estado de la luminaria a aislada
		$update_query = "UPDATE luminarias SET status = 'a' WHERE external_id = '{$external_id}'";
		mysql_query($update_query) or die(mysql_error());
	}
}

$file_luminarias = fopen($file_luminarias_url, "w");
fseek($file_luminarias, 0);

$columnas = array("id_fraccion","status","lat","long","external_id","tiempo_sin_luz");
fputcsv($file_luminarias, $columnas);

// Escribir a archivo CSV para el drive
$rows = mysql_query("SELECT * FROM luminarias");

while ($row = mysql_fetch_assoc($rows)) {
	fputcsv($file_luminarias, $row);
}

// Cerrar conexion a MySQL
mysql_close($link);
?>