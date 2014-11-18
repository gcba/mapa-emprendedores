<?php

///////////////////////////////////////////
				$base = "centreon"; 
				$base = "centreonstorage"; 

		$tabla = "log";

$filas = "";
///////////////////////////////////////////



$conn = mysql_connect("dbm3.gcba.gob.ar:3307","vladimir","nagios2014ASI");
$db = mysql_select_db($base,$conn);






//$db = mysql_select_db("centreon",$conn);

//$query = mysql_query("select * from host");

//$query = mysql_query("select host.host_id, host.host_name, host.host_alias, host.host_address, 
//hostgroup.hg_id, hostgroup.hg_name, hostgroup.hg_alias
//from host  
//left join hostgroup_relation on host.host_id = hostgroup_relation.host_host_id
//left join hostgroup on hostgroup.hg_id = hostgroup_relation.hostgroup_hg_id");


//$query = mysql_query("SELECT `log_id`, `ctime`, `host_name`, `service_description`, `status`, `output` , `notification_cmd`, `notification_contact`, `type`, `retry`, `msg_type`, `instance` FROM `log` group by host_name order by ctime desc ");

//FOR LOG

$query = mysql_query("SELECT * FROM ".$tabla." group by host_name order by ctime desc ");
//$query = mysql_query("SELECT * FROM ".$tabla."  ");

echo "-> REALIZO LECTURA DE LA COLUMNA DE LA BASE DE NAGIOS DE LA TABLA LOG ....\n";
$resultado = mysql_query("SHOW COLUMNS FROM ".$tabla);
if (!$resultado) {
    echo 'No se pudo ejecutar la consulta: ' . mysql_error();
    exit;
}
if (mysql_num_rows($resultado) > 0) {
    while ($fila = mysql_fetch_assoc($resultado)) {
    	$filas .= $fila['Field'].";";
    	$filas_array[] = $fila['Field'];
    }
}

$filas = substr($filas, 0, -1);
//echo $filas;
$cantidad = count($filas_array);
//echo "\n";

//die();

//echo "log_id; ctime; host_name; service_description; status; output ; notification_cmd; notification_contact; type; retry; msg_type; instance \n";

echo "-> REALIZO LECTURA DE LOS DATOS DE LA BASE DE NAGIOS DE LA TABLA LOG ....\n";
while($da = mysql_fetch_array($query))
{
//	echo $da['host_id'].";".$da['host_name'].";".$da['host_alias'].";".$da['host_address'].";";
	//echo $da[0].";".$da[1].";".$da[2].";".$da[3].";".$da[4].";".$da[5].";".$da[6].";".$da[7].";".$da[8].";".$da[9].";".$da[10].";".$da[11]."\n";
	$datos="";
	for($i = 0; $i<$cantidad; $i++)
	{
		$datos .= $da[$i].";"; 
		$datos_array[] = $da[$i];
		
	}
	$datos = substr($datos, 0, -1);
	echo $datos;
	$paquete[] = $datos;
	echo "\n";
}


echo "-> TERMINO LECTURA DE LA TABLA Y GUARDO TODO EN ARRAYS  ....\n";


///////////////////////////////////////////
				$base = "centreon"; 
				$base = "centreonstorage"; 

		$tabla = "`log`";

//$filas = "";
///////////////////////////////////////////
$local_conn = mysql_connect("localhost","root","password");
$local_db = mysql_select_db($base,$local_conn);


echo "-> VACIO LA TABLA DE LOG LOCAL ....\n";
$limpio = mysql_query("truncate table ".$tabla);

echo "-> COMIENZO A REALIZAR EL INSERT EN TABLA LOCAL  ....\n";

foreach($paquete as $pa)
{
	$filas = str_replace(";", ",", $filas);
	$pa = str_replace(";", '","', $pa); $pa = '"'.$pa.'"';
	$lleno = mysql_query("insert into ".$tabla."(".$filas.") values (".$pa.") ");
	echo "insert into ".$tabla."(".$filas.") values (".$pa.") "; echo "\n";
}

echo "-> FINALIZO EL INSERT EN LA TABLA DE LOG LOCAL DE NAGIOS....\n";

// Procedo lectura de datos
///////////////////////////////////////////////////////

$local_conn = 	mysql_connect("localhost","root","password");
$local_db = 	mysql_select_db($base,$local_conn);
echo "-> HAGO LA QUERY PARA LLENAR LOS XYNAGIOS....\n";
$query = mysql_query('
SELECT host.host_id, log.status FROM centreon.host  as host
inner join centreonstorage.log as log on log.host_name = host.host_name 
	');

echo "->  VACIO LA TABLA DE XYS.XYNAGIOS ....\n";
mysql_query("truncate table xys.xynagios");
//echo "id;status"; echo "\n";

echo "-> COMIENZO A LLENAR LA TABLA DE XYNAGIOS  ....\n";
while($da = mysql_fetch_array($query))
{
	

	if($da[1] == "DOWN" or $da[1] == "UNKNOWN")
	{
		$status = 0;
	}
	if($da[1] == "UP" or $da[1] == "OK" or $da[1] == "CRITICAL" or $da[1] == "WARNING")
	{
		$status = 1;
	}
	//echo $da[0].";".$status.";\n";
	mysql_query("insert into xys.xynagios (id_calle, status) values ('".$da[0]."','".$status."')");
	echo $da[0].";".$da[1]."\n"; //status_luminarias.csv
	$status_luminarias .= $da[0].";".$status."\n"; //status_luminarias.csv
	//echo "http://apagones.cartodb.com/api/v2/sql?q=UPDATE calles_apagones SET status = ".$status." WHERE id=".$da[0]." &api_key=d748899fa2f59842f227a4c55c15494336c82096\n";

}
echo "-> FINALIZO EL INSERT EN TABLA DE XYNAGIOS ....\n";
///////
//		Actualizo la tabla de xyluminarias

	
	

/// cron
///			*/55 * * * * php /var/www/html/script.php
///			*/20 * * * *    grive /var/www/html/repositorio


$fp=fopen("repositorio/nagios.csv","w");
	fwrite($fp,$status_luminarias);
	fclose($fp);


$fp=fopen("prueba_de_escritura_en_archivo.csv","w");
	fwrite($fp,$status_luminarias);
	fclose($fp);

echo "-> FIN DE PROCESO ....\n";


?>
