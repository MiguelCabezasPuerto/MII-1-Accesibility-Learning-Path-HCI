function pregunta(){ 
    if (confirm('¿Quiere realmente realizar este pedido?')){ 
    	var formulario = document.form1;
    	for (var i=0; i<formulario.length; i++) {
			formulario[i].style.borderColor = "#FFFFFF";
			formulario[i].style.borderWidth = "thin"
    	}
		for (var i=0; i<formulario.length; i++) {
                if(formulario[i].type =='text') {
                               if (formulario[i].value == null || formulario[i].value.length == 0 || /^\s*$/.test(formulario[i].value)){
                               	if(i == 2){
                               		alert ('El nombre no puede estar vacío o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 3){
                               		alert ('Los apellidos no pueden estar vacíos o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 4){
                               		alert ('El email no puede estar vacío o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 5){
                               		alert ('El teléfono de contacto no puede estar vacío o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 7){
                               		alert ('La dirección de envío no puede estar vacía o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 8){
                               		alert ('La localidad del envío no puede estar vacía o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 9){
                               		alert ('La provincia del envío no puede estar vacía o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor = "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               	if(i == 10){
                               		alert ('El código postal del envío no puede estar vacío o contener sólo espacios en blanco');
                               		todoCorrecto=false;
                               		formulario[i].style.borderColor= "#FF0000";
                               		formulario[i].style.borderWidth = "thick"
                               	}
                               }
                }
        }
	if (todoCorrecto ==true) {formulario.submit();}
    } 
} 