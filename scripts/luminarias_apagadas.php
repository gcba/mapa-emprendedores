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
$query = "SELECT * FROM fallas_philips";
$result = mysql_query($query) or die(mysql_error());

while ($row = mysql_fetch_array($result)) {
    // Actualizar las luminarias - setear estado a 0 si esa luminaria tiene falla
    $update_query = "UPDATE luminarias SET status = 0 WHERE external_id = '{$row[1]}";
    mysql_query($update_query) or die(mysql_error());
}

// Cerrar conexion a MySQL
mysql_close($link);
?>