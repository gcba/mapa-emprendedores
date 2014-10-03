// funcion que se autoejecuta cuando carga el dom el script init-app.js

!(function(){

	var socket = io.connect('http://localhost');

	socket.on('connected', function(){
		console.log("conectado");
	});

	socket.on('update', function(data){
		console.log(data);
	});

	socket.on('disconnect', function () {
		console.log('Desconectado!');
	});

	console.log("build mapa")

	var width = 1500,
		height = 1500;

	var projection = d3.geo.mercator()
		.scale(280000);

	var zoom = d3.behavior.zoom()
		.translate([0, 0])
		.scale(1)
		.scaleExtent([1, 8])
		.on("zoom", zoomed);

	var path = d3.geo.path()
		.projection(projection);

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);
    	// .on("click", reset);

	var callesBA = svg.append("g");
	var barriosBA = svg.append("g");


	svg
	.call(zoom) // delete this line to disable free zooming
	.call(zoom.event);

	d3.json("data/caba.json", function(error, topo) {
	console.log(topo.objects.calles)
 	// Traigo caba.json, un archivo topojson con 2 capas, barrios y calles segmentadas. Ver Makefile.

	var calles = topojson.feature(topo, topo.objects.calles),
		callesgeo = calles.features;

	var barrios = topojson.feature(topo, topo.objects.barrios),
		barriosgeo = barrios.features,
		bounds = path.bounds(barrios);

	var tipo = d3.extent(callesgeo, function(d, i) {
		return d.properties.id
	});

	console.log(tipo);

	projection
		.translate([width / 2 - (bounds[0][0] + bounds[1][0]) / 2 + 500, height / 2 - (bounds[0][1] + bounds[1][1]) / 2]);

	callesBA.selectAll("path")
		.data(callesgeo).enter()
		.append("path")
		.attr("class", function(d,i){
			return d.properties.id + " calle";
		})
		.attr("d", path);        
		// .on("mouseover", functionCall) // just a little example of what's available in terms of interaction
		// .on("mouseout", fcuntionCall) // 

		// svg.append("path")
		//     .datum(calles)
		//     .attr("class", "state")
		//     .attr("d", path);

	barriosBA.selectAll("path")
		.data(barriosgeo).enter()
		.append("path")
		.attr("class", "barrio")
		.attr("d", path); 

	});

	var zoomed = function(){

		// Mejorar esto! 
		callesBA.style("stroke-width", 1.5 / d3.event.scale + "px");
		callesBA.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		barriosBA.style("stroke-width", 1.5 / d3.event.scale + "px");
		barriosBA.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

	}

}());