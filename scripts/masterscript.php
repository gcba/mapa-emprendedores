<?php

// Master script!
system('python /home/pili/datos-luminarias/scripts/conexionluminarias.py', $retval);
echo("Se actualizaron las fallas de luminarias de Philips \n");

include('luminarias_apagadas.php');
echo("Se actualizo el estado de las luminarias en base a las fallas de Philips \n");

include('luminarias_viejas.php');
echo("Se eliminaron las luminarias que estan apagadas hace mas de 720 horas \n");
echo("Se escribieron las luminarias a Dropbox \n");

include('fracciones_estadistica.php');
echo("Se actualizaron las estadisticas de las fracciones en base a los cambios anteriores \n");

include('luminarias_historico.php');
echo("Se guardo el numero de luminarias apagadas a esta hora \n");

?>