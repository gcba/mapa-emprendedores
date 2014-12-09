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

// Actualizar historico de luminarias
$rows = mysql_query("SELECT * FROM luminarias");

while ($row = mysql_fetch_array($rows)) {
	$hora = $now->format('H');
	$insert_query = "IF NOT EXISTS (SELECT * FROM luminarias_historico WHERE hora = {hora} AND external_id = '{$row[4]}') BEGIN INSERT INTO luminarias_historico (hora, external_id, status) VALUES ({$hora}, '{$row[4]}', '{$row[1]}') END";
    mysql_query($insert_query) or die(mysql_error());
}

// Cerrar conexion a MySQL
mysql_close($link);
?>