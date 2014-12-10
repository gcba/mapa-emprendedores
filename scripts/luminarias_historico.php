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
$rows = mysql_query("SELECT * FROM luminarias");

while ($row = mysql_fetch_array($rows)) {
    $hora = (int) $now->format('H');
    $select_query = "SELECT * FROM luminarias_historico WHERE hora = {$hora} AND external_id = '{$row[4]}'";
    $select_result = mysql_query($select_query);

    if (mysql_num_rows($select_result)==0) {
        $fecha = $now->format('Y-m-d H:i:s');
        $insert_query = "INSERT INTO luminarias_historico (fecha, hora, external_id, status) VALUES ('{$fecha}', {$hora}, '{$row[4]}', '{$row[1]}')";
        mysql_query($insert_query) or die(mysql_error());
    }
}

// Cerrar conexion a MySQL
mysql_close($link);
?>