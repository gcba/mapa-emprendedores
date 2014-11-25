Mapa de apagones para CUCC
==========================

(Inserte una breve descripción del proyecto)

#### Notas para desarolladores
Para regenerar el TopoJSON de barrios y calles de la ciudad segmentadas:

    make caba.json

Datos de origen

Reporte por hora del servicio CityTouch de Luminarias
Reporte del sistema Nagios de ASI

#### Archivos
*puntos_nagios.csv*
 Status de todos los puntos de la red Nagios
    - id_nagio: Number [0-9999]
	- status: Number [0,1]

*puntos_luminarias.csv*
 Status de todos los puntos de la red de Phillips
    - extenal_id: String
    - lat: Float
	- long: Float
	- status: Number [0,1]
	- tiempo_sin_luz: Number
	- id_fraccion: String

*fracciones_estadistica.csv*
	- fraccion_id: String
	- cantidad_luminarias: Number [0-999]
	- percentil_edad: Number [0-100]
	- percentil_pisos:  Number [0-100]
	- porcentaje_sin_luz:  Float [0-100]
	- tiempo_sin_luz:  Number [0-maxInt]
	- puntaje_ranking: Number [0-9]

*fracciones_wgs84.csv*
	- the_geom: Polygon
	- id_fraccion: String

#### Responsables desde el Ministerio de Justicia y Seguridad

    brew update
    brew install gdal
    npm install -g topojson

Centro Único de Coordinación y Control (CUCC)

Rodrigo Silvosa (Subsecretario de Mantenimiento - Mtrio. de Ambiente y Espacio Público en Gobierno de la Ciudad de Buenos Aires)
Nestor Nicolás (Subsecretario de Emergencias  - Mtrio. de Justicia y Seguridad)
Daniel Molteni (Subgerente de Sistemas, CUCC)
Carlos Álvarez (Subgerente Operativo de Coordinación y Control de Operaciones de la línea 103)


1. Revisión de datos
2. Revisión de herramienta
3. Definir metodología de trabajo

Revisión de la herramienta generada por DGGOBE.

- Broadcast de datos via push a cualquier cliente suscrbipto via WEB.
- Canales disponibles:
	RSS
	JSON
	Mail
- Geocodifica basandose en strings.
- Categorización basada en el contenido.


# Instalación

Grunt
Bower

#### Unit Testing

Jasmine (Revisar version)
