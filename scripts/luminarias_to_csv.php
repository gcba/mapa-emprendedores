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

$file_luminarias = fopen("/home/luis/Dropbox/status_luminarias.csv", "w");
fseek($file_luminarias, 0);

$columnas = array("id_fraccion","status","lat","long","external_id","tiempo_sin_luz");
fputcsv($file_luminarias, $columnas);

// Escribir a archivo CSV para Dropbox
$rows = mysql_query("SELECT * FROM luminarias");

while ($row = mysql_fetch_assoc($rows)) {
    fputcsv($file_luminarias, $row);
}
?>