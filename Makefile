barrios.json:
	curl -o barrios.json 'https://davo.cartodb.com/api/v2/sql?filename=barrios&q=SELECT+*+FROM+barrios&format=geojson'

calles.json:
	curl -o calles.json 'https://davo.cartodb.com/api/v2/sql?filename=calles_segmentadas&q=SELECT+*+FROM+calles_segmentadas&format=geojson'

caba.json: barrios.json calles.json
	topojson -p -o caba.json barrios.json calles.json
	mv caba.json data