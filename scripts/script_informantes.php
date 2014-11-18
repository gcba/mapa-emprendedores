<?php 
	// Configuracion de MySQL Database y source del JSON 
	$host = 'localhost';
	$db = 'xys';
	$username = 'root';
	$password = 'password';
	$json_link = "http://reporte.hml.gcba.gob.ar/query/consulta.php?query=1&key=GODZILLACATASTROFEEXPLOTATODO314159267";

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
//seteo los campos para armar el csv
$voluntarios = "id_ubicacion;titulo;descripcion;user_id;fecha_alta;fecha_actualizacion;ubicacion;lat;long;ultimo_estado\n";

$query = mysql_query("delete from informantes");
	// Realizar insert en la tabla a partir del contenido del JSON
	$array_length = sizeof($json_parsed);
	for ($i = 0; $i < $array_length; $i++ ) {

		$latlong = file_get_contents("http://ws.usig.buenosaires.gob.ar/rest/convertir_coordenadas?x=".$json_parsed[$i]['posx']."&y=".$json_parsed[$i]['posy']."&output=lonlat");
		$latlong_json = json_decode($latlong, true);
		//echo $latlong_json['resultado']['x'];
		//die(print_r($latlong_json));
$voluntarios .= $json_parsed[$i]['id_ubicacion'].";".$json_parsed[$i]['titulo'].";".$json_parsed[$i]['descripcion'].";".$json_parsed[$i]['user_id'].";".$json_parsed[$i]['fecha_alta'].";".$json_parsed[$i]['fecha_actualizacion'].";".$json_parsed[$i]['ubicacion'].";".$latlong_json['resultado']['x'].";".$latlong_json['resultado']['y'].";".$json_parsed[$i]['ultimo_estado']."\n"; 
		//die($latlong);
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
				'{$json_parsed[$i]['id_ubicacion']}',
				'{$json_parsed[$i]['titulo']}',
				'{$json_parsed[$i]['descripcion']}',
				'{$json_parsed[$i]['user_id']}',
				'{$json_parsed[$i]['fecha_alta']}',
				'{$json_parsed[$i]['fecha_actualizacion']}',
				'{$json_parsed[$i]['ubicacion']}',
				'{$latlong_json['resultado']['x']}',
				'{$latlong_json['resultado']['y']}',
				'{$json_parsed[$i]['ultimo_estado']}'
				)");
		
		
		if (!$result) 
		{
			die ('Cant insert: ' . mysql_error());
		}
	}
	
	// Cerrar conexion a MySQL
	mysql_close($link);


	$fp=fopen("/var/www/html/repositorio/status_informantes.csv","w");
	fwrite($fp,$voluntarios);
	fclose($fp);
?>
