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

date_default_timezone_set('Europe/Amsterdam');    
$now = new DateTime();

// Actualizar historico de luminarias
$rows = mysql_query("SELECT COUNT(*) AS luminarias_apagadas FROM luminarias WHERE status = '0'");

while ($row = mysql_fetch_array($rows)) {    
    $fecha = $now->format('Y-m-d H:00:00');

    $select_query = "SELECT * FROM luminarias_historico WHERE fecha = '{$fecha}'";
    $select_result = mysql_query($select_query) or die(mysql_error());

    if (mysql_num_rows($select_result) == 0) {
        $insert_query = "INSERT INTO luminarias_historico (fecha, luminarias_apagadas) VALUES ('{$fecha}', '{$row[0]}')";
        mysql_query($insert_query) or die(mysql_error());
    }
}

// Cerrar conexion a MySQL
mysql_close($link);
?>