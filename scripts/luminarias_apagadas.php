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

// Resetear todas las luminarias a prendidas antes de actualizar de acuerdo a las fallas
$reset_query = "UPDATE luminarias SET status = '1', tiempo_sin_luz = 0";
mysql_query($reset_query) or die(mysql_error());

while ($row = mysql_fetch_array($result)) {
    // Actualizar las luminarias - setear estado a 0 si esa luminaria tiene falla
    $external_id = $row[1];

    $creation_timestamp = strtotime($row[2]);

    date_default_timezone_set('Europe/Amsterdam');    
    $now = new DateTime();
    $current_date = $now->getTimestamp();

    // Tiempo sin luz en minutos
    $tiempo_sin_luz = ($current_date - $creation_timestamp) / 60; 

    $update_query = "UPDATE luminarias SET status = '0', tiempo_sin_luz = {$tiempo_sin_luz} WHERE external_id = '{$row[1]}'";
    mysql_query($update_query) or die(mysql_error());
}

// Cerrar conexion a MySQL
mysql_close($link);
?>
