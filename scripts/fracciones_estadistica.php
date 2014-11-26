<?php
include 'config.php';

function calcularPorcentajeSinLuz($fraccion_id, $cantidad_luminarias) {
	$count_query = "SELECT COUNT(*) FROM luminarias WHERE fraccion_id = '{$fraccion_id}' AND status = 0";
	$count_result = mysql_query($count_query) or die(mysql_error());
	$count = mysql_fetch_array($count_result);
	$luminarias_apagadas = $count[0];

	if ($cantidad_luminarias) {
		$porcentaje = round($luminarias_apagadas * 100 / $cantidad_luminarias);
		return $porcentaje;
	} 
	else {
		return 0;
	}
}

function calcularTiempoSinLuz($fraccion_id) {
	$tiempos_array = array();
	$tiempo_query = "SELECT tiempo_sin_luz FROM luminarias WHERE fraccion_id = '{$fraccion_id}' AND status = 0";
	$tiempo_result = mysql_query($tiempo_query) or die(mysql_error());
	while ($row_tiempo = mysql_fetch_array($tiempo_result)) {
		array_push($tiempos_array, $row_tiempo[0]);
	}
	$mediana = 0;
	if (sizeof($tiempos_array)) {
		rsort($tiempos_array); 
	    $middle = round(count($tiempos_array) / 2); 
	    $mediana = $tiempos_array[$middle-1]; 		
	}
	return round($mediana / 60);
}

function calcularRanking($percentil_edad, $percentil_pisos, $porcentaje_apagados, $tiempo_horas) {
    // Ponderación en base a hace cuánto tiempo la fracción no tiene luz
    if ($tiempo_horas < 5) {
    	$rk_tiempo_luz = 0;
    }
    else {
    	$rk_tiempo_luz = ((log10($tiempo_horas)*70)-50)/100;
    }

    // Ponderación en base al porcentaje de la fracción sin luz
    $rk_porcentaje_luz = -0.0059*($porcentaje_apagados)^2 + 1.562*($porcentaje_apagados) + 2.278;

    // Ranking de criticidad:
    // ((EDAD * 0.35) + (PISOS * 0.25) + (%SIN LUZ * 0.4)) * (TIEMPO SIN LUZ) 
	$puntaje_ranking = (($percentil_edad*0.35)+($percentil_pisos*0.25)+($rk_porcentaje_luz*0.4))*$rk_tiempo_luz;
	return $puntaje_ranking;
}

// Abrir conexion a MySQL y seleccionar base de datos
$link = mysql_connect($host, $username, $password);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
$db_selected = mysql_select_db('emergencias', $link);
if (!$db_selected) {
    die ('Can\'t use database : ' . mysql_error());
}	

// Seleccionar las fracciones
$query = "SELECT * FROM fracciones_estadistica";
$result = mysql_query($query) or die(mysql_error());

while ($row = mysql_fetch_array($result)) {
    $fraccion_id = $row[0];
    $cantidad_luminarias = $row[1];
    
    $percentil_edad = $row[2];
    $percentil_pisos = $row[3];
    $porcentaje_apagados = calcularPorcentajeSinLuz($fraccion_id, $cantidad_luminarias);
    $tiempo_horas = calcularTiempoSinLuz($fraccion_id);
    
    $puntaje_ranking = calcularRanking($percentil_edad, $percentil_pisos, $porcentaje_apagados, $tiempo_horas);

    // Update estadisticas de la fracción
	$update_query = "UPDATE fracciones_estadistica SET porcentaje_sin_luz = {$porcentaje_apagados}, tiempo_sin_luz = {$tiempo_horas}, puntaje_ranking = {$puntaje_ranking} WHERE fraccion_id = '{$fraccion_id}'";
	mysql_query($update_query) or die(mysql_error());
}

$file_fracciones = fopen("/var/www/html/repositorio/fracciones_estadistica.csv", "w");
fseek($file_fracciones, 0);

$columnas = array("fraccion_id","cantidad_luminarias","percentil_edad","percentil_pisos","porcentaje_sin_luz","tiempo_sin_luz", "puntaje_ranking");
fputcsv($file_fracciones, $columnas);

// Escribir a archivo CSV para el drive
$rows = mysql_query("SELECT * FROM fracciones_estadistica");

while ($row = mysql_fetch_assoc($rows)) {
	fputcsv($file_fracciones, $row);
}

// Cerrar conexion a MySQL
mysql_close($link);
?>