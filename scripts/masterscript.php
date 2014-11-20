<?php

// Master script!
system('python /Users/pilimayora/Sites/datos-luminarias/scripts/conexionluminarias.py', $retval);
echo("Se actualizaron las fallas de luminarias de Philips \n");

include('luminarias_apagadas.php');
echo("Se actualizo el estado de las luminarias en base a las fallas de Philips \n");

include('fracciones_estadistica.php');
echo("Se actualizaron las estadisticas de las fracciones en base a los cambios anteriores \n");

?>