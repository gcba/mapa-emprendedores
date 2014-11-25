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

// Selecionar todas las fallas de Philips
$query = "SELECT falla_id, asset_external_id, creation_timestamp FROM fallas_philips";
$result = mysql_query($query) or die(mysql_error());

while ($row = mysql_fetch_array($result)) {
    // Actualizar las luminarias - setear estado a 0 si esa luminaria tiene falla
    $external_id = $row[1];

    $creation_timestamp = strtotime($row[2]);
	$current_timestamp = time(); 

	// Tiempo sin luz en minutos
    $tiempo_sin_luz = ($current_timestamp - $creation_timestamp) / 60; 

    $update_query = "UPDATE luminarias SET status = 0, tiempo_sin_luz = {$tiempo_sin_luz} WHERE external_id = '{$row[1]}'";
    mysql_query($update_query) or die(mysql_error());
}

$file_luminarias = fopen("/Users/pilimayora/Sites/datos-luminarias/data/luminarias.csv", "w");
fseek($file_luminarias, 0);

$columnas = array("external_id","long","lat","status","tiempo_sin_luz","fraccion_id");
fputcsv($file_luminarias, $columnas);

// Escribir a archivo CSV para el drive
$rows = mysql_query("SELECT * FROM luminarias");

while ($row = mysql_fetch_assoc($rows)) {
	fputcsv($file_luminarias, $row);
}

// Cerrar conexion a MySQL
mysql_close($link);
?>