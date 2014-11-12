Listado de lugares donde tienen que responder
Prioridades de respuesta

Datos de origen

Hay luz?
Hora de retorno del suministro

Tipos de edificio

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

=======
Para regenerar el TopoJSON de barrios y calles de la ciudad segmentadas:

```
make caba.json
```

#### Mapas
* [GDAL](http://www.gdal.org/)
* [TopoJSON](http://www.gdal.org/)

Requiere instalar GDAL y TopoJSON (con `brew` y `npm`):

```
brew update
brew install gdal
npm install -g topojson
```