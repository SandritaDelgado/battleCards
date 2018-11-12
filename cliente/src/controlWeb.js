
function limpiar(){
	//inicializa la pagina
	$('#formInicio').remove();
}

function mostrarFormularioNombre(){
	var cadena='<div id="formInicio">';
	cadena=cadena+'<h3>Iniciar sesion</h3>'
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre usuario">';
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Iniciar Usuario</button>';
	cadena=cadena+'</div>';

//hace referencia al inicio del html
	$('#inicio').append(cadena);

//manejador del evento on click del boton
	$('#inicioBtn').on('click',function(){
        var nombre=$('#nombre').val();
        if(nombre==""){
        	nombre="Loli";
        }
        $('#formInicio').remove();
        rest.agregarUsuario(nombre);
    });
}

function mostrarCrearPartida(){
	var cadena='<div id="formCrearPartida">';
	cadena=cadena+'<h3>Iniciar Partida</h3>'
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre partida">';
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Crear Partida</button>';
	cadena=cadena+'</div>';

//hace referencia al inicio del html
	$('#inicio').append(cadena);

//manejador del evento on click del boton
	$('#inicioBtn').on('click',function(){
        var nombrePartida=$('#nombre').val();
        if(nombrePartida==""){
        	nombrePartida="prueba";
        }
        $('#formCrearPartida').remove();
        com.crearPartida(nombrePartida);
    });
}

function mostrarListaPartidas(data){

	var cadena='<div id="formlistaPartidas">';
	cadena=cadena+'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Lista Partidas<span class="caret"></span></button>';
	cadena=cadena+'<ul class="dropdown-menu">';
	for(var i=0;i<data.lenght;i++){
		cadena=cadena+'<li><a href="#">'+data[i].nombre+'</a></li>';
	}
	cadena=cadena+'</ul>';
	cadena=cadena+'</div>';
	$('#listaPartidas').append(cadena);
	$('#mostrarListaBtn').on('click',function(){
		var nombrePartida=$('#formlistaPartidas').val();
	})
  
}
