

<?php session_start();
/**
 * Post de datos a la base de datos
 *
 * @author      Nicolas Lound <nicolas.lound@gmail.com>, Vladimir Martemianov <vmartemianov@gmail.com>
 * @license     MIT
 * @link        https://github.com/gcba/mapa-emprendedores
 * @version     0.1
 *
 */



/**
* @abstract     Clase de creada por CartoDB para establecer comunicación su API.
* @package      https://github.com/Vizzuality/cartodbclient-php
*/
require_once 'libs/cartodb.class.php';

/**
* @abstract     Setup de credenciales de autenticación contra la API de CartoDB para tablas privadas.
*/
require_once 'libs/cartodb.config.php';



$config = getConfig();
$cartodb = new CartoDBClient($config);

if (!$cartodb->authorized) {
  error_log("uauth");
}


/**
* @abstract     Agarro las variables del formulario HTML y las encodeo en URL
*/

$api_key = "&api_key=f2d531bee1002c47a2bcc52f2262c3c28d6ef311";
$acti_frm = urlencode($_POST['acti_frm']);
$desc_frm = urlencode($_POST['desc_frm']);
$direccion_frm = urlencode($_POST['direccion_frm']);
$latlon_frm = $_POST['latlon_frm'];
$mailIns_frm =	 urlencode($_POST['mailIns_frm']);
$mailRes_frm =	 urlencode($_POST['mailRes_frm']);
$nombre_frm = urlencode($_POST['nombre_frm']);
$piso_frm =	 urlencode($_POST['piso_frm']);
$resp_frm =	 urlencode($_POST['resp_frm']);
$sector_frm = urlencode($_POST['sector_frm']);
// $serv_frm = urlencode($_POST['serv_frm']);
$tags_frm =  urlencode($_POST['tags_frm']);
$tele_frm = 	urlencode($_POST['tele_frm']);
$tipo_frm = urlencode($_POST['tipo_frm']);
$web_frm =	 urlencode($_POST['web_frm']);
$pendiente_revision = "FALSE";
$sector_sigla = urlencode($_POST['sector_sigla_frm']);
$tipo_sigla = urlencode($_POST['tipo_sigla_frm']);
$lat_frm = urlencode($_POST['lat_frm']);
$lon_frm = urlencode($_POST['lon_frm']);

$geom = "ST_SetSRID(ST_MakePoint(" . $latlon_frm . "),4326)";


/**
* @abstract     Valido Captcha y escribo en base mediante cURL
*/

if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        echo "M";
    }else{
        echo "B";
        $columnas_db = "nombre,descripcion,inicio_de_actividades,tags,pendiente_revision,tipo,sector,calle,piso_dpto,lat,lon,mail_institucional,telefono,web,responsable_proyecto,mail_responsable,sector_sigla,tipo_sigla";
        $campos_post = $nombre_frm . "','" . $desc_frm . "','" . $acti_frm . "','" . $tags_frm . "','" . $pendiente_revision . "','" . $tipo_frm . "','" . $sector_frm . "','" . $direccion_frm . "','" . $piso_frm . "','" . $lat_frm . "','" . $lon_frm . "','" . $mailIns_frm . "','" . $tele_frm . "','" . $web_frm . "','" . $resp_frm . "','" . $mailRes_frm . "','" . $sector_sigla . "','" . $tipo_sigla . "'";  
        $SQLQ = "INSERT%20INTO%20mapa_emprendedor%20(". $columnas_db .")%20VALUES%20('" . $campos_post .  ")" . $api_key;
        $url = "http://gcba.cartodb.com/api/v2/sql?q=" . $SQLQ ;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch);   
        curl_close($ch);

    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha_txt']);
    unset($_SESSION['captcha']);
}

?>




