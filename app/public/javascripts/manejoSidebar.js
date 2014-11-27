//manejo los checkboxes de las capas.

$('input:checkbox').change(
    function(){
    	var checkbox = this.id; 
    	var sl = 9;
        switch (checkbox){
            case "luminarias": sl = 1; //layer
                break;
            case "nagios": sl = 2; //layer
                break;
            case "voluntarios": sl = 3; //layer
                break;
        }

        checkbox = "#"+checkbox;

        if ($(checkbox).is(':checked')) {
            capas[1].getSubLayer(sl).show();
        }else{
            capas[1].getSubLayer(sl).hide();
        }

    });



$(document).keyup(function(e) {
  if (e.keyCode == 83) { 
    console.log('message');
    
  }    
});


/* Query a correr
SELECT fp.the_geom_webmercator, fp.id_fraccion, fe.puntaje_ranking FROM fracciones_poligonos as fp
inner join fracciones_estadistica as fe on fp.id_fraccion = fe.fraccion_id
inner join tercera on fp.campo = tercera.campo
*/
