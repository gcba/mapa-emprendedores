// Manejo los checkboxes de las capas.

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
    } else {
     capas[1].getSubLayer(sl).hide();
    }

});




$(document).ready(function() {
    $("#barrios").chosen({allow_single_deselect: true});
    $(document).keyup(function(e) {
        if (e.keyCode == 83) { 
            $('#toggleNav').click();
        } else if (e.keyCode == 90) {
            console.log('Zoom?');
            $( "#barrios_chosen" ).click();
        }
    });
    
});