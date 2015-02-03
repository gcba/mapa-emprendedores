<?php
include 'config.php';

// Master script!
system("python {$conexion_luminarias_url}", $retval);
echo("Se actualizaron las fallas de luminarias de Philips \n");

include('luminarias_apagadas.php');
echo("Se actualizo el estado de las luminarias en base a las fallas de Philips \n");

include('luminarias_viejas.php');
echo("Se actualizaron las luminarias que estan apagadas hace mas de 720 horas \n");
echo("Se escribieron las luminarias a Dropbox \n");

include('luminarias_aisladas.php');
echo("Se actualizaron las luminarias que estan aisladas \n");
echo("Se escribieron las luminarias a Dropbox \n");

include('fracciones_estadistica.php');
echo("Se actualizaron las estadisticas de las fracciones en base a los cambios anteriores \n");

include('luminarias_historico.php');
echo("Se guardo el numero de luminarias apagadas a esta hora \n");

include('informantes_historico.php');
echo("Se guardo el numero de informantes apagados a esta hora \n");

?>