barrios.zip:
	curl -o barrios.zip 'https://recursos-data.buenosaires.gob.ar/ckan2/barrios/barrios.zip'

barrios.shp: barrios.zip
	unzip barrios.zip
	touch barrios.shp

barrios.json: barrios.shp
	ogr2ogr -t_srs WGS84 -f GeoJSON barrios.json barrios.shp

calles.json:
	curl -o calles.json 'https://davo.cartodb.com/api/v2/sql?filename=calles_segmentadas&q=SELECT+*+FROM+calles_segmentadas&format=geojson'

caba.json: barrios.json calles.json
	topojson -p -o caba.json barrios.json calles.json
	mv caba.json data