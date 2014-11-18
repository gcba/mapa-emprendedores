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
select gnnc.calle_id, cl.status from centreon.host as ch 
inner join centreonstorage.log as cl on ch.host_name = cl.host_name 
inner join geolocacion_nuevo.nagios_calles as gnnc on ch.host_id = gnnc.host_id
group by gnnc.calle_id
order by cl.status desc
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

	//echo "http://apagones.cartodb.com/api/v2/sql?q=UPDATE calles_apagones SET status = ".$status." WHERE id=".$da[0]." &api_key=d748899fa2f59842f227a4c55c15494336c82096\n";

}
echo "-> FINALIZO EL INSERT EN TABLA DE XYNAGIOS ....\n";
///////
//		Actualizo la tabla de xyluminarias

echo "->  SETEO EL STATUS EN 1 EN XYLUMINARIAS....\n";
//primero seteo todos los estados en 1
mysql_query("update xys.luminarias set status = 1");



require_once("xyluminarias.php");












$local_conn = 	mysql_connect("localhost","root","password");
$local_db = 	mysql_select_db($base,$local_conn);

///////////// hago la union entre xynagiso y xyluminarias con los unicos valores en status order by 1 desc y id_calle unicas

echo "-> HAGO LA UNION ENTRE xynagios y xyluminarias con los unicos valores en status order by 1 y id_calles unicas ....\n";
$query = mysql_query("
select distinct(uln.id_calle), uln.status  from 
    (SELECT * FROM xys.`xyluminarias` as l
    union
    select * from xys.xynagios as x) 					as uln
    
group by uln.id_calle
order by uln.id_calle, uln.`status` desc
");

// vacio la tabla de recopilacion
echo "-> VACIO LA TABLA DE RECOPILACION ....\n";
mysql_query("truncate table xys.recopilacion");
//echo "id;status"; echo "\n";
echo "->  COMIENZO LOS INSERT DE LA UNION ....\n";
while($da = mysql_fetch_array($query))
{
	
	//echo $da[0].";".$da[1].";\n";
	mysql_query("insert into xys.recopilacion (id_calle, status) values ('".$da[0]."','".$da[1]."')");

	//echo "http://apagones.cartodb.com/api/v2/sql?q=UPDATE calles_apagones SET status = ".$status." WHERE id=".$da[0]." &api_key=d748899fa2f59842f227a4c55c15494336c82096\n";

}
echo "-> FINALIZO INSERT DE LA UNION ....\n";




/*
//resultado final
*/
echo "-> HAGO LA DISTINCION FINAL  ....\n";



///////////////////////////////////////////
				$base = "centreon"; 
				$base = "centreonstorage"; 

		$tabla = "`log`";

//$filas = "";
///////////////////////////////////////////
$local_conn = mysql_connect("localhost","root","password");
$local_db = mysql_select_db($base,$local_conn);



$query = mysql_query("SELECT * FROM xys.`recopilacion` as rec union select id, (select `status` from `xys`.`recopilacion` as r where `gnssc`.`calle_refiere` = r.id_calle) from `geolocacion_nuevo`.segmentos_sin_centroide as gnssc");
$status_luminarias = "id_calle;status\n";
while($da = mysql_fetch_array($query))
{
	echo $da[0].";".$da[1]."\n"; //status_luminarias.csv
	$status_luminarias .= $da[0].";".$da[1]."\n"; //status_luminarias.csv
	//echo "http://apagones.cartodb.com/api/v2/sql?q=UPDATE calles_apagones SET status = ".$da[1]." WHERE id=".$da[0]." &api_key=d748899fa2f59842f227a4c55c15494336c82096\n";
	//$file = file_get_contents( "http://apagones.cartodb.com/api/v2/sql?q=UPDATE calles_apagones SET status = ".$da[1]." WHERE id=".$da[0]." &api_key=d748899fa2f59842f227a4c55c15494336c82096");
	//echo $file;

	
	
}
/// cron
///			*/55 * * * * php /var/www/html/script.php
///			*/20 * * * *    grive /var/www/html/repositorio

$fp=fopen("repositorio/status_luminarias.csv","w");
	fwrite($fp,$status_luminarias);
	fclose($fp);


$fp=fopen("prueba_de_escritura_en_archivo.csv","w");
	fwrite($fp,$status_luminarias);
	fclose($fp);

echo "-> FIN DE PROCESO ....\n";


?>
