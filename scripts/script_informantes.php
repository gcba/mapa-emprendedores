<?php 
	// Configuracion de MySQL Database y source del JSON 
	$host = 'localhost';
	$db = 'xys';
	$username = 'root';
	$password = 'password';
//	$json_link = "http://reporte.hml.gcba.gob.ar/query/consulta.php?query=1&key=GODZILLACATASTROFEEXPLOTATODO314159267";
        $json_link = "https://reporte.buenosaires.gob.ar/query/consulta.php?query=1&key=GODZILLACATASTROFEEXPLOTATODO314159267";

	// Abrir conexion a MySQL y seleccionar base de datos
	$link = mysql_connect($host, $username, $password);
	if (!$link) {
	    die('Could not connect: ' . mysql_error());
	}
	$db_selected = mysql_select_db($db, $link);
	if (!$db_selected) {
	    die ('Can\'t use database : ' . mysql_error());
	}

	// Bajar JSON y parsear
	$json = file_get_contents($json_link);	
	$json_parsed = json_decode($json, true);
/* Asimo que la tabla ya existe en esta etapa del proceso
	// Chequear si exista la tabla de personas. Si no existe, crear tabla
	$table_exists = mysql_query('select 1 from informantes');
	$script_path = "./create_table_informantes.sql";
	if ($table_exists == FALSE) {
		$command = "mysql -u{$username} -p{$password} " . "-D {$db} < {$script_path}";
		$output = shell_exec($command);

		if (!$output) {
			die ('Cant create table: ' . mysql_error());
		}
	}


	*/

$postdata = http_build_query(
    array(
        'var1' => 'contenido',
        'var2' => 'doh'
    )
);

$opts = array('http' =>
    array(
        'method'  => 'GET',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);

$context = stream_context_create($opts);


$query_chequeo = mysql_query("select * from informantes");
while($informantes_actuales = mysql_fetch_array($query_chequeo))
{
	$iactuales[$informantes_actuales['id_ubicacion']] = $informantes_actuales['ultimo_estado'];
	//echo $iactuales[$informantes_actuales['id_ubicacion']]; echo $informantes_actuales['ultimo_estado']; echo "\n";
}

//die(print_r($iactuales));
//seteo los campos para armar el csv
$voluntarios = '"id_ubicacion";"titulo";"descripcion";"user_id";"fecha_alta";"fecha_actualizacion";"ubicacion";"lat";"long";"ultimo_estado"'; $voluntarios .= "\n";

//$query = mysql_query("delete from informantes");


	// Realizar insert en la tabla a partir del contenido del JSON
	$array_length = sizeof($json_parsed);
	for ($i = 0; $i < $array_length; $i++ ) 
	{

		$latlong = file_get_contents("http://ws.usig.buenosaires.gob.ar/rest/convertir_coordenadas?x=".$json_parsed[$i]['posx']."&y=".$json_parsed[$i]['posy']."&output=lonlat");
		$latlong_json = json_decode($latlong, true);
		//echo $latlong_json['resultado']['x'];
		//die(print_r($latlong_json));
//oluntarios .= "'".$json_parsed[$i]['id_ubicacion']."','".$json_parsed[$i]['titulo']."','".$json_parsed[$i]['descripcion']."','".$json_parsed[$i]['user_id']."','".$json_parsed[$i]['fecha_alta']."','".$json_parsed[$i]['fecha_actualizacion']."','".$json_parsed[$i]['ubicacion']."','".$latlong_json['resultado']['y']."','".$latlong_json['resultado']['x']."','".$json_parsed[$i]['ultimo_estado']."'\n"; 

if(($json_parsed[$i]['fecha_alta'] != "0000-00-00 00:00:00") and ($json_parsed[$i]['fecha_actualizacion'] != "0000-00-00 00:00:00"))
{

$voluntarios .= '"'.$json_parsed[$i]['id_ubicacion'].'";"'.$json_parsed[$i]['titulo'].'";"'.$json_parsed[$i]['descripcion'].'";"'.$json_parsed[$i]['user_id'].'";"'.$json_parsed[$i]['fecha_alta'].'";"'.$json_parsed[$i]['fecha_actualizacion'].'";"'.$json_parsed[$i]['ubicacion'].'";"'.$latlong_json['resultado']['y'].'";"'.$latlong_json['resultado']['x'].'";"'.$json_parsed[$i]['ultimo_estado'].'"'; $voluntarios .= "\n";



if($iactuales[$json_parsed[$i]['id_ubicacion']] == null)
{
		//die($latlong);
	echo "inserto";

$id_ubicacion = 	mysql_real_escape_string($json_parsed[$i]['id_ubicacion']);
$titulo = 		mysql_real_escape_string($json_parsed[$i]['titulo']);
$descripcion = 		mysql_real_escape_string($json_parsed[$i]['descripcion']);

$ubicacion = 		mysql_real_escape_string($json_parsed[$i]['ubicacion']);

$titulo = str_replace("'", "", $titulo);
$descripcion = str_replace("'", "", $descripcion);
$ubicacion = str_replace("'", "", $ubicacion);

$titulo = str_replace('"', "", $titulo);
$descripcion = str_replace('"', "", $descripcion);
$ubicacion = str_replace('"', "", $ubicacion);


$user_id = 		$json_parsed[$i]['user_id'];
$fecha_alta = 		$json_parsed[$i]['fecha_alta'];
$fecha_actualizacion = 	$json_parsed[$i]['fecha_actualizacion'];

$lat = 			$latlong_json['resultado']['x'];
$long = 		$latlong_json['resultado']['y'];
$ultimo_estado = 	$json_parsed[$i]['ultimo_estado'];

		$result = mysql_query("INSERT INTO `informantes` (
				`id_ubicacion`,
				`titulo`,
				`descripcion`,
				`user_id`,
	 		    `fecha_alta`, 
			    `fecha_actualizacion`, 
			    `ubicacion`, 
			    `posx`, 
				`posy`, 
				`ultimo_estado` ) 
			VALUES (
				'{$id_ubicacion}',
				'{$titulo}',
				'{$descripcion}',
				'{$user_id}',
				'{$fecha_alta}',
				'{$fecha_actualizacion}',
				'{$ubicacion}',
				'{$lat}',
				'{$long}',
				'{$ultimo_estado}'
				)");
		if (!$result) 
		{
			die ('Cant insert: ' . mysql_error());
		}
$url = "http://gcba.cartodb.com/api/v2/sql?q=INSERT INTO status_informantes (id_ubicacion,titulo,descripcion,user_id,fecha_alta,fecha_actualizacion,ubicacion,lat,long,ultimo_estado,the_geom) VALUES ('{$json_parsed[$i]['id_ubicacion']}','{$titulo}','{$descripcion}','{$json_parsed[$i]['user_id']}','{$json_parsed[$i]['fecha_alta']}','{$json_parsed[$i]['fecha_actualizacion']}','{$ubicacion}','{$latlong_json['resultado']['y']}','{$latlong_json['resultado']['x']}','{$json_parsed[$i]['ultimo_estado']}',ST_SetSRID(ST_MakePoint({$latlong_json['resultado']['x']}, {$latlong_json['resultado']['y']}), 4326))&api_key=ce2f2314ed406edcbf6e627992531e21e396f062";
$url = preg_replace("/ /", "%20", $url);
file_get_contents($url);
echo $url;
}

	
	if($json_parsed[$i]['ultimo_estado'] != $iactuales[$json_parsed[$i]['id_ubicacion']] and $iactuales[$json_parsed[$i]['id_ubicacion']] != null)
	{
		// hacer update
		echo "updateo";
		$url = "http://gcba.cartodb.com/api/v2/sql?q=update status_informantes set ultimo_estado=".$json_parsed[$i]['ultimo_estado']." where id_ubicacion = ".$json_parsed[$i]['id_ubicacion']."&api_key=ce2f2314ed406edcbf6e627992531e21e396f062";
		$url = preg_replace("/ /", "%20", $url);
		file_get_contents($url);
		
		echo $url;
mysql_query("update informantes set ultimo_estado=".$json_parsed[$i]['ultimo_estado']." where id_ubicacion = ".$json_parsed[$i]['id_ubicacion']);
echo "update informantes set ultimo_estado=".$json_parsed[$i]['ultimo_estado']." where id_ubicacion = ".$json_parsed[$i]['id_ubicacion']; echo "\n";
	}
//die();
}		
		
	}
	
	// Cerrar conexion a MySQL
	mysql_close($link);


	$fp=fopen("/var/www/html/repositorio/status_informantes.csv","w");
	fwrite($fp,$voluntarios);
	fclose($fp);
?>






