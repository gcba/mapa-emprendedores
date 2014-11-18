Mapa de apagones para CUCC
==========================

(Inserte una breve descripción del proyecto)

#### Notas para desarolladores
Para regenerar el TopoJSON de barrios y calles de la ciudad segmentadas:

    make caba.json

#### Mapas
* [GDAL](http://www.gdal.org/)
* [TopoJSON](http://www.gdal.org/)

Requiere instalar GDAL y TopoJSON (con `brew` y `npm`):

    brew update
    brew install gdal
    npm install -g topojson

#### Archivos
*puntos_nagios.csv*
 Status de todos los puntos de la red Nagios
    - id_nagio: String
	- status: Int [0,1]
    - lat: Float
	- long: Float
	- id_fraccion: String

 *puntos_luminarias.csv*
 Status de todos los puntos de la red de Phillips
    - id_nagio: String
	- status: Int [0,1]
	- lat: Float
	- long: Float
	- id_fraccion: String
