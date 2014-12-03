// Manejo los checkboxes de las capas.

$('input:checkbox').change(
    function() {
        var checkbox = this.id;
        var sl = 9;
        switch (checkbox) {
            case "luminarias":
                sl = 1; //layer
                break;
            case "nagios":
                sl = 2; //layer
                break;
            case "voluntarios":
                sl = 3; //layer
                break;
        }

        checkbox = "#" + checkbox;
        if ($(checkbox).is(':checked')) {
            capas[1].getSubLayer(sl).show();
        } else {
            capas[1].getSubLayer(sl).hide();
        }

    });




$(document).ready(function() {
    $("#barrios").chosen({
        allow_single_deselect: true,
        no_results_text: "No existen barrios con el criterio: "
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 83 && !$("#barrios_chosen").hasClass("chosen-with-drop") ) { // letra "s"
            $('#toggleNav').click();
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode === 27 ) { // "Esc" || "Enter"
          console.log("hago foco en el body")
          $("button").focus();
        }
    });

    $(document).keyup(function(e) {
      if (e.keyCode === 90 && !$("#barrios_chosen").hasClass("chosen-with-drop")) { // letra "z"
          $("#barrios_chosen").toggleClass("chosen-with-drop");
          $("#barrios_chosen input").focus();
      }
    });

});
