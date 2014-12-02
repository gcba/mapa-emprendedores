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

// Si hay resultados, vaciar tabla antes de agregar fallas
// if ($faultItems) {
// 	$truncate_query = "TRUNCATE TABLE fallas_philips";
// 	mysql_query($truncate_query) or die(mysql_error());
// }

// foreach ($faultItems as $faultItem) {
// 	foreach ($faultItem[1] as $fault) {
//         if ($fault->CategoryKey == 'Unreachable' && $fault->IsActive) {
//             // Agregar fallas
//             $insert_query = "INSERT INTO fallas_philips (falla_id, asset_external_id, creation_timestamp) 
//             				 VALUES ({$fault->FaultId}, {$fault->AssetExternalId}, {$fault->CreationTimestamp})"; 
// 			mysql_query($insert_query) or die(mysql_error());
//         }
//     }
// }

// fclose($fileFaults);
?>