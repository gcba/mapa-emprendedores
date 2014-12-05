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

// Update las luminarias cuando estan apagadas hace mas de 720 horas
$query = "UPDATE luminarias SET status = 'inactiva' WHERE tiempo_sin_luz > 720";
$result = mysql_query($query) or die(mysql_error());

$file_luminarias = fopen("/var/www/html/repositorio/status_luminarias.csv", "w");
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