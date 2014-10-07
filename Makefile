barrios.json:
	curl -o barrios.json 'https://davo.cartodb.com/api/v2/sql?filename=barrios&q=SELECT+*+FROM+barrios&format=geojson'

luminarias.json:
	curl -o luminarias.json 'https://davo.cartodb.com/api/v2/sql?filename=luminarias&q=SELECT+*+FROM+luminarias&format=geojson'

nagios.json:
	curl -o nagios.json 'https://davo.cartodb.com/api/v2/sql?filename=nagios&q=SELECT+*+FROM+nagios&format=geojson'

calles.json:
	curl -o calles.json 'https://davo.cartodb.com/api/v2/sql?filename=calles_segmentadas&q=SELECT+*+FROM+calles_segmentadas&format=geojson'

caba.json: barrios.json luminarias.json nagios.json calles.json
	topojson -p -o caba.json barrios.json luminarias.json nagios.json calles.json
	mv caba.json data