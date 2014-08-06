Mapa Emprendedor de la Ciudad Autónoma de Buenos Aires
======================================================

:En la Ciudad estamos desarrollando el *Mapa Emprendedor*, una plataforma virtual que agrupa a todos los actores que forman parte del ecosistema. 

:Con esta herramienta nos proponemos fomentar el intercambio y las relaciones entre la comunidad, así como mostrar el alto potencial y desarrollo que está teniendo la actividad emprendedora en Buenos Aires.

---

###Backend

+ Apache 2.22.2 - http://www.apache.org/
+ [PHP >5.2](http://es2.php.net/manual/en/function.json-decode.php) por json_decode
+ [PHP/CURL](http://www.php.net/manual/en/book.curl.php)
+ Api PHP para [CartoDB](http://www.cartodb.com/) - https://github.com/Vizzuality/cartodbclient-php

Testeado usando
+ [WAMP server](http://www.wampserver.com/en/)

---

###FrontEnd
+ Jquery 1.11.1 - http://jquery.com/ (para compatibilidad con IE8)

---

###Instalación

##### Pre-requisitos:
+ [NodeJS](http://nodejs.org/)
+ [npm](http://npmjs.org/) 
+ [Bower](http://bower.io/)

	npm install -g bower

##### Instalación dev:
	
	npm install
	bower install

---

##### Bugs conocidos:

En Firefox no carga el mapa y por consola se observan los siguientes errores:
	ReferenceError: rd is not defined
	ReferenceError: jl is not defined main.js
	ReferenceError: HO is not defined main.js

Fix:
Desactivar Firebug y regargar la página.


Licencia 
--------

MIT



