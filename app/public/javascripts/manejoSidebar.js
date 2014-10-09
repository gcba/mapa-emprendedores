//manejo los checkboxes de las capas.

$('input:checkbox').change(
    function(){
    	var checkbox = this.id; 
    	var sl = 9;

    	switch (checkbox){
    		case "segmentos": sl = 0;
    			break;
    		case "nagios": sl = 1;
    			break;
    		case "luminarias": sl = 2;
    			break;
    		case "voluntarios": console.log("no hay datos");
    			break;
    		case "cuc": console.log("no hay datos");
    			break;
    	}

    	checkbox = "#"+checkbox;

        if ($(checkbox).is(':checked')) {
            sublayer.getSubLayer(sl).show();
        }else{
        	sublayer.getSubLayer(sl).hide();
        }
    });



